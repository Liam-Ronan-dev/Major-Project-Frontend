'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { createPatient } from '@/lib/api';
import { PatientFormData, patientSchema } from '@/validations/patientSchema';
import { useNavigate } from '@tanstack/react-router';

export function CreatePatientForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      medicalHistory: [{ condition: '', diagnosedAt: '', notes: '' }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'medicalHistory',
  });

  const mutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      toast.success('Patient created');
      navigate({ to: '/dashboard/patients' });
    },
    onError: () => {
      toast.error('Failed to create patient');
    },
  });

  const onSubmit = (data: PatientFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input placeholder="First Name" {...register('firstName')} />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Input placeholder="Last Name" {...register('lastName')} />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <Input type="date" {...register('dateOfBirth')} />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>
        <div>
          <Input placeholder="Gender" {...register('gender')} />
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>
        <div>
          <Input placeholder="Phone Number" {...register('phoneNumber')} />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div>
          <Input placeholder="Email" {...register('email')} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <h3 className="font-semibold">Address</h3>
        <Input placeholder="Street" {...register('address.street')} />
        {errors.address?.street && (
          <p className="text-sm text-red-500">
            {errors.address.street.message}
          </p>
        )}
        <Input placeholder="City" {...register('address.city')} />
        {errors.address?.city && (
          <p className="text-sm text-red-500">{errors.address.city.message}</p>
        )}
        <Input placeholder="Postal Code" {...register('address.postalCode')} />
        {errors.address?.postalCode && (
          <p className="text-sm text-red-500">
            {errors.address.postalCode.message}
          </p>
        )}
        <Input placeholder="Country" {...register('address.country')} />
        {errors.address?.country && (
          <p className="text-sm text-red-500">
            {errors.address.country.message}
          </p>
        )}
      </div>

      {/* Emergency Contact */}
      <div className="space-y-2">
        <h3 className="font-semibold">Emergency Contact</h3>
        <Input placeholder="Name" {...register('emergencyContact.name')} />
        {errors.emergencyContact?.name && (
          <p className="text-sm text-red-500">
            {errors.emergencyContact.name.message}
          </p>
        )}
        <Input
          placeholder="Relationship"
          {...register('emergencyContact.relationship')}
        />
        {errors.emergencyContact?.relationship && (
          <p className="text-sm text-red-500">
            {errors.emergencyContact.relationship.message}
          </p>
        )}
        <Input
          placeholder="Phone Number"
          {...register('emergencyContact.phoneNumber')}
        />
        {errors.emergencyContact?.phoneNumber && (
          <p className="text-sm text-red-500">
            {errors.emergencyContact.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Medical History */}
      <div className="space-y-4">
        <h3 className="font-semibold">Medical History</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Input
                placeholder="Condition"
                {...register(`medicalHistory.${index}.condition`)}
              />
              {errors.medicalHistory?.[index]?.condition && (
                <p className="text-sm text-red-500">
                  {errors.medicalHistory[index]?.condition?.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="date"
                {...register(`medicalHistory.${index}.diagnosedAt`)}
              />
              {errors.medicalHistory?.[index]?.diagnosedAt && (
                <p className="text-sm text-red-500">
                  {errors.medicalHistory[index]?.diagnosedAt?.message}
                </p>
              )}
            </div>
            <div>
              <Input
                placeholder="Notes"
                {...register(`medicalHistory.${index}.notes`)}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ condition: '', diagnosedAt: '', notes: '' })}
        >
          Add Condition
        </Button>
      </div>

      <Button
        type="submit"
        className="cursor-pointer font-semibold"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Submitting...' : 'Create Patient'}
      </Button>
    </form>
  );
}
