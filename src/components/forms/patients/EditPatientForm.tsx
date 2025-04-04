'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updatePatient } from '@/lib/api';
import { PatientFormData, patientSchema } from '@/validations/patientSchema';

type Props = {
  patient: {
    _id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    email: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    emergencyContact: {
      name: string;
      relationship: string;
      phoneNumber: string;
    };
    medicalHistory: {
      condition: string;
      diagnosedAt: string;
      notes?: string;
    }[];
  };
};

export function EditPatientForm({ patient }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: PatientFormData) => updatePatient(patient._id, data),
    onSuccess: () => {
      toast.success('Patient updated!');
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      navigate({ to: '/dashboard/patients' });
    },
    onError: () => {
      toast.error('Failed to update patient.');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  useEffect(() => {
    if (patient) {
      reset({
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth.slice(0, 10),
        gender: patient.gender,
        phoneNumber: patient.phoneNumber,
        email: patient.email,
        address: patient.address,
        emergencyContact: patient.emergencyContact,
        medicalHistory: patient.medicalHistory ?? [],
      });
    }
  }, [patient, reset]);

  const onSubmit = (data: PatientFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <Input {...register('firstName')} />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <Input {...register('lastName')} />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* DOB + Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <Input type="date" {...register('dateOfBirth')} />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <Input {...register('gender')} />
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>
      </div>

      {/* Contact */}
      <div>
        <label className="block mb-1 font-medium">Phone Number</label>
        <Input {...register('phoneNumber')} />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <Input {...register('email')} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Address</h3>
        <Input placeholder="Street" {...register('address.street')} />
        <Input placeholder="City" {...register('address.city')} />
        <Input placeholder="Postal Code" {...register('address.postalCode')} />
        <Input placeholder="Country" {...register('address.country')} />
      </div>

      {/* Emergency Contact */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Emergency Contact</h3>
        <Input placeholder="Name" {...register('emergencyContact.name')} />
        <Input
          placeholder="Relationship"
          {...register('emergencyContact.relationship')}
        />
        <Input
          placeholder="Phone Number"
          {...register('emergencyContact.phoneNumber')}
        />
      </div>

      {/* Medical History */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Medical History</h3>
        {patient.medicalHistory.map((_, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              placeholder="Condition"
              {...register(`medicalHistory.${index}.condition`)}
            />
            <Input
              type="date"
              {...register(`medicalHistory.${index}.diagnosedAt`)}
            />
            <Input
              placeholder="Notes (optional)"
              {...register(`medicalHistory.${index}.notes`)}
            />
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className="font-semibold cursor-pointer px-5"
        disabled={updateMutation.isPending}
      >
        {updateMutation.isPending ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
}
