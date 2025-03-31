'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from '@tanstack/react-router';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createAppointment, getPatients } from '@/lib/api';
import { toast } from 'sonner';
import {
  AppointmentFormData,
  appointmentSchema,
} from '@/validations/appointmentSchema';

export function CreateAppointmentForm() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      status: 'Scheduled',
    },
  });

  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  });

  const mutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success('Appointment created!');
      navigate({ to: '/dashboard/appointments' });
    },
    onError: () => {
      toast.error('Failed to create appointment.');
    },
  });

  const onSubmit = (data: AppointmentFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      {/* Patient + Status side by side */}
      {/* Patient + Status side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Patient */}
        <div className="w-full">
          <label className="block mb-1 font-medium">Patient</label>
          <Controller
            control={control}
            name="patientId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  {' '}
                  {/* <-- ensure full width */}
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

        {/* Status */}
        <div className="w-full">
          <label className="block mb-1 font-medium">Status</label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  {' '}
                  {/* <-- ensure full width */}
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {['Scheduled', 'Completed', 'Cancelled', 'No Show'].map(
                    (s) => (
                      <SelectItem key={s} value={s}>
                        {s}
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

      <Button
        className="font-semibold cursor-pointer"
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Submitting...' : 'Create Appointment'}
      </Button>
    </form>
  );
}
