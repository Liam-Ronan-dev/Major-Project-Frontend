// components/forms/GeneralInfoFields.tsx
'use client';

import { Controller, UseFormRegister, Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { PrescriptionFormData } from '@/validations/prescriptionSchema';

type Props = {
  register: UseFormRegister<PrescriptionFormData>;
  control: Control<PrescriptionFormData>;
  errors: any;
  pharmacists: { _id: string; email: string }[];
  patients: { _id: string; firstName: string; lastName: string }[];
};

export const GeneralInfoFields = ({
  register,
  control,
  errors,
  pharmacists,
  patients,
}: Props) => {
  return (
    <div className="space-y-4">
      <Label>Pharmacist</Label>
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

      <Label>Patient</Label>
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

      <Label>Pharmacy Name</Label>
      <Input {...register('pharmacyName')} />
      <FieldError message={errors.pharmacyName?.message} />

      <Label>General Instructions</Label>
      <Textarea {...register('generalInstructions')} />
      <FieldError message={errors.generalInstructions?.message} />

      <Label>Repeats</Label>
      <Input type="number" {...register('repeats')} />
      <FieldError message={errors.repeats?.message} />

      <Label>Notes</Label>
      <Textarea {...register('notes')} />
      <FieldError message={errors.notes?.message} />
    </div>
  );
};

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-red-500">{message}</p> : null;
