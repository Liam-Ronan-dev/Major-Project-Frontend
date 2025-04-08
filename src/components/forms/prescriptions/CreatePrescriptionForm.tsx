'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useEffect } from 'react';
import {
  prescriptionSchema,
  PrescriptionFormData,
} from '@/validations/prescriptionSchema';
import { createPrescription } from '@/lib/api';
import { usePatients } from '@/hooks/usePatients';
import { usePharmacists } from '@/hooks/usePharmacists';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { AsyncMedicationSelect } from '@/components/forms/AsyncMedicationSelect';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type CreatePrescriptionFormProps = {
  prefill?: PrescriptionFormData;
};

export function CreatePrescriptionForm({
  prefill,
}: CreatePrescriptionFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrescriptionFormData>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: prefill || {
      patientId: '',
      pharmacistId: '',
      notes: '',
      items: [
        {
          medicationId: '',
          specificInstructions: '',
          dosage: '',
          amount: '',
          repeats: 1,
        },
      ],
    },
  });

  // if prefill updates after initial render (not likely, but safe)
  useEffect(() => {
    if (prefill) reset(prefill);
  }, [prefill, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const { data: patients = [] } = usePatients();
  const { data: pharmacists = [] } = usePharmacists();

  const createMutation = useMutation({
    mutationFn: createPrescription,
    onSuccess: () => {
      toast.success('Prescription created successfully');
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
      navigate({ to: '/dashboard/prescriptions' });
    },
    onError: () => {
      toast.error('Failed to create prescription');
    },
  });

  const onSubmit = (data: PrescriptionFormData) => {
    createMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <Card>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Patient */}
            <div>
              <Label className="pb-2 font-semibold">Patient</Label>
              <Controller
                control={control}
                name="patientId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((p) => (
                        <SelectItem key={p._id} value={p._id}>
                          {p.firstName} {p.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.patientId?.message} />
            </div>

            {/* Pharmacist */}
            <div>
              <Label className="pb-2 font-semibold">Pharmacist</Label>
              <Controller
                control={control}
                name="pharmacistId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pharmacist" />
                    </SelectTrigger>
                    <SelectContent>
                      {pharmacists.map((p) => (
                        <SelectItem key={p._id} value={p._id}>
                          {p.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.pharmacistId?.message} />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="pb-2 font-semibold">Prescription Notes</Label>
            <Textarea
              {...register('notes')}
              placeholder="E.g. Take as prescribed"
            />
            <FieldError message={errors.notes?.message} />
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Prescription Items</h3>
          <Button
            type="button"
            variant="default"
            onClick={() =>
              append({
                medicationId: '',
                specificInstructions: '',
                dosage: '',
                amount: '',
                repeats: 1,
              })
            }
          >
            Add Item
          </Button>
        </div>

        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader className="flex justify-between">
              <CardTitle>Item {index + 1}</CardTitle>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label className="pb-2 font-semibold">Medication</Label>
                <Controller
                  control={control}
                  name={`items.${index}.medicationId`}
                  render={({ field }) => (
                    <AsyncMedicationSelect
                      field={field}
                      initialValue={
                        prefill?.items?.[index]?.medicationId
                          ? {
                              _id: prefill.items[index].medicationId,
                              name: prefill.items[index].medicationLabel ?? '', // add this to your prefill transform
                            }
                          : undefined
                      }
                    />
                  )}
                />
                <FieldError
                  message={errors.items?.[index]?.medicationId?.message}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Specific Instructions</Label>
                  <Input
                    {...register(`items.${index}.specificInstructions`)}
                    placeholder="e.g. Take after meals"
                  />
                  <FieldError
                    message={
                      errors.items?.[index]?.specificInstructions?.message
                    }
                  />
                </div>

                <div>
                  <Label>Dosage</Label>
                  <Input
                    {...register(`items.${index}.dosage`)}
                    placeholder="e.g. 100mg"
                  />
                  <FieldError
                    message={errors.items?.[index]?.dosage?.message}
                  />
                </div>

                <div>
                  <Label>Amount</Label>
                  <Input
                    {...register(`items.${index}.amount`)}
                    placeholder="e.g. 28x"
                  />
                  <FieldError
                    message={errors.items?.[index]?.amount?.message}
                  />
                </div>

                <div>
                  <Label>Repeats</Label>
                  <Input
                    type="number"
                    {...register(`items.${index}.repeats`, {
                      valueAsNumber: true,
                    })}
                  />
                  <FieldError
                    message={errors.items?.[index]?.repeats?.message}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-red-500 mt-1">{message}</p> : null;
