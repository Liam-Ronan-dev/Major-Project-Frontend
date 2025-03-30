import * as z from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

const dosageSchema = z.object({
  medicationId: z
    .string()
    .nonempty({ message: 'Medication ID is required for dosage.' })
    .regex(objectIdRegex, { message: 'Invalid medication ID format.' }),

  amount: z.string().nonempty({ message: 'Dosage amount is required.' }),

  frequency: z.string().nonempty({ message: 'Dosage frequency is required.' }),

  duration: z.string().nonempty({ message: 'Dosage duration is required.' }),

  notes: z
    .string()
    .optional()
    .refine((val) => typeof val === 'string', {
      message: 'Notes must be a string if provided.',
    }),
});

const itemSchema = z.object({
  medications: z
    .array(
      z
        .string()
        .nonempty({ message: 'Medication ID is required.' })
        .regex(objectIdRegex, {
          message: 'Each medication must be a valid ID.',
        })
    )
    .min(1, { message: 'Each item must have at least one medication.' }),

  specificInstructions: z
    .string()
    .nonempty({ message: 'Specific instructions required.' }),

  dosages: z
    .array(dosageSchema)
    .min(1, { message: 'Each item must have at least one dosage.' }),
});

export const prescriptionSchema = z.object({
  patientId: z
    .string()
    .nonempty({ message: 'Patient ID is required.' })
    .regex(objectIdRegex, { message: 'Invalid patient ID format.' }),

  pharmacistId: z
    .string()
    .nonempty({ message: 'Pharmacist ID is required.' })
    .regex(objectIdRegex, { message: 'Invalid pharmacist ID format.' }),

  pharmacyName: z.string().nonempty({ message: 'Pharmacy name is required.' }),

  generalInstructions: z
    .string()
    .nonempty({ message: 'General instructions are required.' }),

  repeats: z.coerce
    .number()
    .int({ message: 'Repeats must be an integer.' })
    .min(1, { message: 'Repeats must be at least 1.' }),

  notes: z.string().optional(),

  items: z
    .array(itemSchema)
    .min(1, { message: 'Prescription must have at least one item.' }),
});

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;
