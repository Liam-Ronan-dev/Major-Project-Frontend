'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import {
  appointmentSchema,
  AppointmentFormData,
} from '@/validations/appointmentSchema';

import { updateAppointment } from '@/lib/api';
import { useEffect } from 'react';
import { usePatients } from '@/hooks/usePatients';

type Props = {
  appointment: {
    _id: string;
    patientId: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    date: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show';
    notes?: string;
  };
};

export function EditAppointmentForm({ appointment }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: patients = [] } = usePatients();

  const updateMutation = useMutation({
    mutationFn: (formData: AppointmentFormData) =>
      updateAppointment(appointment._id, formData),
    onSuccess: () => {
      toast.success('Appointment updated!');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      navigate({ to: '/dashboard/appointments' });
    },
    onError: () => {
      toast.error('Failed to update appointment.');
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  // Prefill form when loaded
  useEffect(() => {
    if (appointment) {
      reset({
        patientId: appointment.patientId._id,
        status: appointment.status,
        date: appointment.date?.slice(0, 10),
        notes: appointment.notes ?? '',
      });
    }
  }, [appointment, reset]);

  const onSubmit = (data: AppointmentFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      {/* Patient + Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block mb-1 font-medium">Patient</label>
          <Controller
            control={control}
            name="patientId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((p: any) => (
                    <SelectItem key={p._id} value={p._id}>
                      {p.firstName} {p.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.patientId && (
            <p className="text-red-500 text-sm">{errors.patientId.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium">Status</label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {['Scheduled', 'Completed', 'Cancelled', 'No Show'].map(
                    (status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="block mb-1 font-medium">Date</label>
        <Input type="date" {...register('date')} />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1 font-medium">Notes</label>
        <Textarea {...register('notes')} placeholder="Optional notes..." />
      </div>

      <div className="text-end">
        <Button
          type="submit"
          className="w-full sm:w-auto font-semibold cursor-pointer px-8"
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  );
}
