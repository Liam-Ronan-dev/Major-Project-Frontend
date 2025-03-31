import * as z from 'zod';

const isISO8601 = (val: string) =>
  !isNaN(Date.parse(val)) && /^\d{4}-\d{2}-\d{2}$/.test(val);

const objectIdRegex = /^[a-f\d]{24}$/i;

// Medical History
const medicalHistorySchema = z.object({
  condition: z.string().min(1, 'Please enter the medical condition.'),
  diagnosedAt: z.string().refine(isISO8601, {
    message: 'Please enter a valid diagnosis date (YYYY-MM-DD).',
  }),
  notes: z.string().optional(),
});

// Patient Schema
export const patientSchema = z.object({
  firstName: z.string().min(1, 'Please enter the patient’s first name.'),
  lastName: z.string().min(1, 'Please enter the patient’s last name.'),
  dateOfBirth: z.string().refine(isISO8601, {
    message: 'Please enter a valid date of birth (YYYY-MM-DD).',
  }),
  gender: z.string().min(1, 'Please specify the gender.'),
  phoneNumber: z.string().min(1, 'Please enter a phone number.'),
  email: z.string().email('Please enter a valid email address.').optional(),
  address: z.object({
    street: z.string().min(1, 'Street address is required.'),
    city: z.string().min(1, 'City is required.'),
    postalCode: z.string().min(1, 'Postal code is required.'),
    country: z.string().min(1, 'Country is required.'),
  }),
  emergencyContact: z.object({
    name: z.string().min(1, 'Please enter an emergency contact name.'),
    relationship: z
      .string()
      .min(1, 'Please specify their relationship to the patient.'),
    phoneNumber: z
      .string()
      .min(1, 'Please enter an emergency contact phone number.'),
  }),
  medicalHistory: z
    .array(medicalHistorySchema)
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Please provide at least one medical history entry.',
    }),
  doctorId: z.string().regex(objectIdRegex, 'Invalid doctor ID.').optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;
