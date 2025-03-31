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
import { GeneralInfoFields } from './PrescriptionFields';
import { PrescriptionItem } from './prescriptionItem';

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
        {/* General Info */}
        <div className="w-full lg:w-1/2">
          <GeneralInfoFields
            register={register}
            control={control}
            errors={errors}
            patients={patients}
            pharmacists={pharmacists}
          />
        </div>

        {/* Prescription Items */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h3 className="text-lg font-bold">Prescription Items</h3>

          {itemFields.map((_, index) => (
            <PrescriptionItem
              key={index}
              index={index}
              control={control}
              register={register}
              errors={errors}
              medications={medications}
            />
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full sm:w-auto font-semibold"
      >
        {mutation.isPending ? 'Updating...' : 'Update Prescription'}
      </Button>
    </form>
  );
}
