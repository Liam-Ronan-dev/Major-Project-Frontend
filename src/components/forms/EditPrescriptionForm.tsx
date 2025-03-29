'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updatePrescription } from '@/lib/api';
import { usePatients } from '@/hooks/usePatients';
import { useMedications } from '@/hooks/useMedications';
import { usePharmacists } from '@/hooks/usePharmacists';

import {
  PrescriptionFormData,
  prescriptionSchema,
} from '@/validations/prescriptionSchema';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GeneralInfoFields } from './PrescriptionFields';
import { MedicationFields } from './MedicationFields';
import { DosageFields } from './DosageFields';

type Props = {
  defaultValues: PrescriptionFormData;
  prescriptionId: string;
};

export function EditPrescriptionForm({ defaultValues, prescriptionId }: Props) {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrescriptionFormData>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues,
  });

  React.useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const { fields: itemFields } = useFieldArray({
    control,
    name: 'items',
  });

  const dosageFieldArrays = itemFields.map((_, index) =>
    useFieldArray({ control, name: `items.${index}.dosages` as const })
  );

  const { data: patients = [] } = usePatients();
  const { data: medications = [] } = useMedications();
  const { data: pharmacists = [] } = usePharmacists();

  const mutation = useMutation({
    mutationFn: (formData: PrescriptionFormData) =>
      updatePrescription(prescriptionId, formData),
    onSuccess: () => {
      toast.success('Prescription updated successfully');
      navigate({ to: '/dashboard/prescriptions' });
    },
    onError: () => {
      toast.error('Failed to update prescription.');
    },
  });

  const onSubmit = (data: PrescriptionFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <GeneralInfoFields
            register={register}
            control={control}
            errors={errors}
            patients={patients}
            pharmacists={pharmacists}
          />
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h3 className="text-lg font-bold">Prescription Items</h3>

          {itemFields.map((item, index) => {
            const dosageArray = dosageFieldArrays[index];

            return (
              <div key={item.id} className="border p-4 rounded space-y-4">
                <Label>Specific Instructions</Label>
                <Textarea
                  {...register(`items.${index}.specificInstructions`)}
                />
                {errors.items?.[index]?.specificInstructions?.message && (
                  <p className="text-sm text-red-500">
                    {errors.items[index].specificInstructions?.message}
                  </p>
                )}

                <MedicationFields
                  index={index}
                  control={control}
                  errors={errors.items?.[index]}
                  medications={medications}
                />

                <h4 className="font-medium">Dosages</h4>
                {dosageArray.fields.map((_, dIndex) => (
                  <DosageFields
                    key={dIndex}
                    index={index}
                    dIndex={dIndex}
                    control={control}
                    register={register}
                    errors={errors.items?.[index]?.dosages}
                    medications={medications}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Updating...' : 'Update Prescription'}
      </Button>
    </form>
  );
}
