'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PrescriptionItem } from './prescriptionItem';
import {
  PrescriptionFormData,
  prescriptionSchema,
} from '@/validations/prescriptionSchema';
import { createPrescription } from '@/lib/api';
import { usePatients } from '@/hooks/usePatients';
import { useMedications } from '@/hooks/useMedications';
import { usePharmacists } from '@/hooks/usePharmacists';
import { GeneralInfoFields } from '../prescriptions/PrescriptionFields';
import { Button } from '@/components/ui/button';

export function CreatePrescriptionForm() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PrescriptionFormData>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      pharmacyName: '',
      generalInstructions: '',
      repeats: 1,
      notes: '',
      items: [
        {
          medications: [''],
          specificInstructions: '',
          dosages: [
            {
              medicationId: '',
              amount: '',
              frequency: '',
              duration: '',
              notes: '',
            },
          ],
        },
      ],
    },
  });

  const { fields: itemFields } = useFieldArray({
    control,
    name: 'items',
  });

  const { data: patients = [] } = usePatients();
  const { data: medications = [] } = useMedications();
  const { data: pharmacists = [] } = usePharmacists();

  const prescriptionMutation = useMutation({
    mutationFn: createPrescription,
    onSuccess: () => {
      toast.success('Prescription created successfully');
      navigate({ to: '/dashboard/prescriptions' });
    },
    onError: () => {
      toast.error('Error creating prescription');
    },
  });

  const onSubmit = (data: PrescriptionFormData) => {
    prescriptionMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* General Info Section */}
        <div className="w-full lg:w-1/2">
          <GeneralInfoFields
            register={register}
            control={control}
            errors={errors}
            patients={patients}
            pharmacists={pharmacists}
          />
        </div>

        {/* Prescription Items Section */}
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
        className="w-full lg:w-fit"
        disabled={prescriptionMutation.isPending}
      >
        {prescriptionMutation.isPending
          ? 'Submitting...'
          : 'Submit Prescription'}
      </Button>
    </form>
  );
}
