'use client';

import { Controller, UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PrescriptionFormData } from '@/validations/prescriptionSchema';

type Props = {
  index: number;
  dIndex: number;
  control: any;
  register: UseFormRegister<PrescriptionFormData>;
  errors: any[] | undefined;
  medications: { _id: string; name: string }[];
};

export const DosageFields = ({
  index,
  dIndex,
  control,
  register,
  errors,
  medications,
}: Props) => {
  const dosagePath = `items.${index}.dosages.${dIndex}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Label>Medication</Label>
      <Controller
        control={control}
        name={`${dosagePath}.medicationId`}
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
      <FieldError message={errors?.[dIndex]?.medicationId?.message} />

      <Input {...register(`${dosagePath}.amount`)} placeholder="Amount" />
      <FieldError message={errors?.[dIndex]?.amount?.message} />

      <Input {...register(`${dosagePath}.frequency`)} placeholder="Frequency" />
      <FieldError message={errors?.[dIndex]?.frequency?.message} />

      <Input {...register(`${dosagePath}.duration`)} placeholder="Duration" />
      <FieldError message={errors?.[dIndex]?.duration?.message} />

      <Input {...register(`${dosagePath}.notes`)} placeholder="Notes" />
      <FieldError message={errors?.[dIndex]?.notes?.message} />
    </div>
  );
};

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-red-500">{message}</p> : null;
