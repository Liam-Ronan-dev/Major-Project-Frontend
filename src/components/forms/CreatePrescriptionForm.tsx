'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';

import {
  PrescriptionFormData,
  prescriptionSchema,
} from '@/validations/prescriptionSchema';

import { createPrescription } from '@/lib/api';
import { usePatients } from '@/hooks/usePatients';
import { useMedications } from '@/hooks/useMedications';
import { usePharmacists } from '@/hooks/usePharmacists';

import { GeneralInfoFields } from './PrescriptionFields';
import { MedicationFields } from '@/components/forms/MedicationFields';
import { DosageFields } from '@/components/forms/DosageFields';
import { toast } from 'sonner';

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

  const dosageFieldArrays = itemFields.map((_, index) =>
    useFieldArray({ control, name: `items.${index}.dosages` as const })
  );

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
      alert('Error creating prescription.');
    },
  });

  const onSubmit = (data: PrescriptionFormData) => {
    console.log('Submitting Prescription:', data);
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

                <Button
                  type="button"
                  onClick={() =>
                    dosageArray.append({
                      medicationId: '',
                      amount: '',
                      frequency: '',
                      duration: '',
                      notes: '',
                    })
                  }
                >
                  Add Dosage
                </Button>
              </div>
            );
          })}
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
