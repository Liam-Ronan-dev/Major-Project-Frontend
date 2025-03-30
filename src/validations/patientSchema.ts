import * as z from 'zod';

const medicalHistorySchema = z.object({
  condition: z.string().min(1),
  diagnosedAt: z.string().min(1),
  notes: z.string().optional(),
});

export const patientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.string().min(1),
  gender: z.string().min(1),
  phoneNumber: z.string().min(1),
  email: z.string().email(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
  emergencyContact: z.object({
    name: z.string().min(1),
    relationship: z.string().min(1),
    phoneNumber: z.string().min(1),
  }),
  medicalHistory: z.array(medicalHistorySchema).min(1),
});

export type PatientFormData = z.infer<typeof patientSchema>;
