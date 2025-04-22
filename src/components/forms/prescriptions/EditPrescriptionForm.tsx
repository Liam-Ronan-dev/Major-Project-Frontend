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
import { updatePrescription } from '@/lib/api';
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

export function EditPrescriptionForm({
  prescription,
}: {
  prescription: PrescriptionFormData & { _id: string };
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<PrescriptionFormData>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      patientId: prescription.patientId,
      pharmacistId: prescription.pharmacistId,
      notes: prescription.notes,
      items: prescription.items.map((item) => ({
        medicationId: item.medicationId,
        medicationLabel: item.medicationLabel ?? '',
        specificInstructions: item.specificInstructions,
        dosage: item.dosage,
        amount: item.amount,
        repeats: item.repeats,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const [lockedItems, setLockedItems] = useState<boolean[]>(
    prescription.items.map(() => false)
  );

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { data: patients = [] } = usePatients();
  const { data: pharmacists = [] } = usePharmacists();

  const updateMutation = useMutation({
    mutationFn: (data: PrescriptionFormData) =>
      updatePrescription(prescription._id, data),
    onSuccess: () => {
      toast.success('Prescription updated successfully');
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
      navigate({ to: '/dashboard/prescriptions' });
    },
    onError: () => {
      toast.error('Failed to update prescription');
    },
  });

  const handleFinalSubmit = () => {
    updateMutation.mutate(getValues());
    setShowConfirmModal(false);
  };

  const onSubmit = () => {
    const allLocked = lockedItems.every(Boolean);
    if (!allLocked) {
      toast.error('Please save items before submitting.');
      return;
    }
    setShowConfirmModal(true);
  };

  const toggleLock = (index: number) => {
    setLockedItems((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <Card>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            <div>
              <Label className="pb-2 font-semibold">Prescription Notes</Label>
              <Textarea {...register('notes')} />
              <FieldError message={errors.notes?.message} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Prescription Items</h2>
            <Button
              type="button"
              className="w-full sm:w-auto font-semibold cursor-pointer px-8"
              onClick={() => {
                append({
                  medicationId: '',
                  medicationLabel: '',
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
                <CardTitle>Item {index + 1}</CardTitle>
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
                    className="w-full sm:w-auto font-semibold cursor-pointer px-8"
                    type="button"
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
                      <AsyncMedicationSelect
                        field={field}
                        disabled={lockedItems[index]}
                        initialValue={
                          prescription.items[index]
                            ? {
                                _id: prescription.items[index].medicationId,
                                name:
                                  prescription.items[index].medicationLabel ??
                                  '',
                              }
                            : undefined
                        }
                        onLabelChange={(label) =>
                          setValue(`items.${index}.medicationLabel`, label)
                        }
                      />
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
                    type="number"
                    register={register(`items.${index}.repeats`, {
                      valueAsNumber: true,
                    })}
                    error={errors.items?.[index]?.repeats?.message}
                    disabled={lockedItems[index]}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-end">
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? 'Updating...' : 'Submit'}
          </Button>
        </div>
      </form>

      {/* Review Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Prescription Items</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-80 overflow-y-auto text-sm">
            {watch('items').map((item, idx) => (
              <div key={idx} className="border rounded p-5 text-sm space-y-2">
                <p>
                  <strong>Medication:</strong>{' '}
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
              Confirm & Update
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
        type={type}
        disabled={disabled}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-red-500 mt-1">{message}</p> : null;
