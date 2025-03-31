// components/forms/prescriptions/PrescriptionItem.tsx
'use client';

import { useDosageFieldArray } from '@/hooks/useDosageFieldArray';
import { PrescriptionFormData } from '@/validations/prescriptionSchema';
import { Control, UseFormRegister, FieldErrors } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MedicationFields } from './MedicationFields';
import { DosageFields } from './DosageFields';

type Props = {
  index: number;
  control: Control<PrescriptionFormData>;
  register: UseFormRegister<PrescriptionFormData>;
  errors: FieldErrors<PrescriptionFormData>;
  medications: { _id: string; name: string }[];
};

export function PrescriptionItem({
  index,
  control,
  register,
  errors,
  medications,
}: Props) {
  const { fields: dosageFields, append: appendDosage } =
    useDosageFieldArray<PrescriptionFormData>({
      control,
      name: `items.${index}.dosages`,
    });

  return (
    <div className="border p-4 rounded space-y-4">
      <Label>Specific Instructions</Label>
      <Textarea {...register(`items.${index}.specificInstructions`)} />
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
      {dosageFields.map((_, dIndex) => (
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
          appendDosage({
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
}
