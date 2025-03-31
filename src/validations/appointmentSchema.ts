import * as z from 'zod';

export const appointmentSchema = z.object({
  patientId: z.string().min(1),
  date: z.string().min(1),
  status: z.enum(['Scheduled', 'Completed', 'Cancelled', 'No Show']),
  notes: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
