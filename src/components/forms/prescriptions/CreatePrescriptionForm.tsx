'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  prescriptionSchema,
  PrescriptionFormData,
} from '@/validations/prescriptionSchema';

import { createPrescription } from '@/lib/api';
import { usePatients } from '@/hooks/usePatients';
import { usePharmacists } from '@/hooks/usePharmacists';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
    watch,
    setValue,
    getValues,
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // Local lock state per item
  const [lockedItems, setLockedItems] = useState<boolean[]>([false]);

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { data: patients = [] } = usePatients();
  const { data: pharmacists = [] } = usePharmacists();

  useEffect(() => {
    if (prefill) reset(prefill);
    setLockedItems(prefill?.items.map(() => false) || [false]);
  }, [prefill, reset]);

  const createMutation = useMutation({
    mutationFn: createPrescription,
    onSuccess: () => {
      toast.success('Prescription created successfully');
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
      navigate({ to: '/dashboard/prescriptions' });
    },
    onError: () => toast.error('Failed to create prescription'),
  });

  const handleFinalSubmit = () => {
    createMutation.mutate(getValues());
    setShowConfirmModal(false);
  };

  const onSubmit = () => {
    const allLocked = lockedItems.every(Boolean);
    if (!allLocked) {
      toast.error('Please save all items before submitting.');
      return;
    }
    setShowConfirmModal(true);
  };

  const toggleLock = (index: number) => {
    setLockedItems((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Patient & Pharmacist */}
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
                <Label className="pb-2 font-semibold">Pharmacy</Label>
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-2xl">Prescription Items</h1>
            <Button
              type="button"
              className="w-full sm:w-auto font-semibold cursor-pointer px-8"
              onClick={() => {
                append({
                  medicationId: '',
                  specificInstructions: '',
                  dosage: '',
                  amount: '',
                  repeats: 1,
                });
                setLockedItems((prev) => [...prev, false]);
              }}
            >
              Add Item
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="font-semibold text-xl">
                  Item {index + 1}
                </CardTitle>
                <div className="flex gap-2">
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      className="w-full sm:w-auto font-semibold cursor-pointer px-8"
                      onClick={() => {
                        remove(index);
                        setLockedItems((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      Remove
                    </Button>
                  )}
                  <Button
                    type="button"
                    className="w-full sm:w-auto font-semibold cursor-pointer px-8"
                    onClick={() => toggleLock(index)}
                  >
                    {lockedItems[index] ? 'Unsave' : 'Save'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="pb-2 font-semibold">Medication</Label>
                  <Controller
                    control={control}
                    name={`items.${index}.medicationId`}
                    render={({ field }) => (
                      <>
                        <AsyncMedicationSelect
                          field={field}
                          disabled={lockedItems[index]}
                          initialValue={
                            prefill?.items?.[index]?.medicationId
                              ? {
                                  _id: prefill.items[index].medicationId,
                                  name:
                                    prefill.items[index].medicationLabel ?? '',
                                }
                              : undefined
                          }
                          onLabelChange={(name) =>
                            setValue(`items.${index}.medicationLabel`, name)
                          }
                        />
                        <input
                          type="hidden"
                          {...register(`items.${index}.medicationLabel`)}
                        />
                      </>
                    )}
                  />
                  <FieldError
                    message={errors.items?.[index]?.medicationId?.message}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup
                    label="Specific Instructions"
                    register={register(`items.${index}.specificInstructions`)}
                    error={errors.items?.[index]?.specificInstructions?.message}
                    disabled={lockedItems[index]}
                  />
                  <InputGroup
                    label="Dosage"
                    register={register(`items.${index}.dosage`)}
                    error={errors.items?.[index]?.dosage?.message}
                    disabled={lockedItems[index]}
                  />
                  <InputGroup
                    label="Amount"
                    register={register(`items.${index}.amount`)}
                    error={errors.items?.[index]?.amount?.message}
                    disabled={lockedItems[index]}
                  />
                  <InputGroup
                    label="Repeats"
                    register={register(`items.${index}.repeats`, {
                      valueAsNumber: true,
                    })}
                    error={errors.items?.[index]?.repeats?.message}
                    disabled={lockedItems[index]}
                    type="number"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto font-semibold cursor-pointer px-8"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>

      {/* Review Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader className="mb-3">
            <DialogTitle>Review Prescription Items</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {watch('items').map((item, idx) => (
              <div key={idx} className="border rounded p-5 text-sm space-y-2">
                <p>
                  <strong>Medication: </strong>
                  {item.medicationLabel || item.medicationId}
                </p>
                <p>
                  <strong>Instructions:</strong> {item.specificInstructions}
                </p>
                <p>
                  <strong>Dosage:</strong> {item.dosage}
                </p>
                <p>
                  <strong>Amount:</strong> {item.amount}
                </p>
                <p>
                  <strong>Repeats:</strong> {item.repeats}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-5 pt-4">
            <Button
              variant="destructive"
              className="w-full sm:w-auto font-semibold cursor-pointer px-8"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto font-semibold cursor-pointer px-8"
              onClick={handleFinalSubmit}
            >
              Confirm & Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function InputGroup({ label, register, error, disabled, type = 'text' }: any) {
  return (
    <div>
      <Label className="pb-2 font-semibold">{label}</Label>
      <Input
        {...register}
        disabled={disabled}
        placeholder={`Enter ${label.toLowerCase()}`}
        type={type}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-red-500 mt-1">{message}</p> : null;
