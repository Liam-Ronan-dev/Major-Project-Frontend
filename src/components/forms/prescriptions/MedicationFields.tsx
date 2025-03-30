// components/forms/MedicationFields.tsx
'use client';

import { Controller, UseFormReturn, useFieldArray } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PrescriptionFormData } from '@/validations/prescriptionSchema';

type Props = {
  index: number;
  control: UseFormReturn<PrescriptionFormData>['control'];
  errors: any;
  medications: { _id: string; name: string }[];
};

export const MedicationFields = ({
  index,
  control,
  errors,
  medications,
}: Props) => {
  const medArray = useFieldArray({
    control,
    name: `items.${index}.medications` as const,
  });

  return (
    <div className="space-y-2">
      <Label>Medications</Label>

      {medArray.fields.map((med, medIndex) => (
        <div key={med.id}>
          <Controller
            control={control}
            name={`items.${index}.medications.${medIndex}`}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select medication" />
                </SelectTrigger>
                <SelectContent>
                  {medications.map((m) => (
                    <SelectItem key={m._id} value={m._id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError
            message={errors?.[index]?.medications?.[medIndex]?.message}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => medArray.append('')}
      >
        Add Medication
      </Button>
    </div>
  );
};

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-red-500">{message}</p> : null;
