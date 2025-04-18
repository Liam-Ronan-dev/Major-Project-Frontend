import * as z from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

const itemSchema = z.object({
  medicationId: z
    .string()
    .nonempty({ message: 'Medication is required.' })
    .regex(objectIdRegex, { message: 'Invalid medication format.' }),
  medicationLabel: z.string().optional(),
  specificInstructions: z
    .string()
    .nonempty({ message: 'Specific instructions are required.' }),

  dosage: z.string().nonempty({ message: 'Dosage is required.' }),

  amount: z.string().nonempty({ message: 'Amount is required.' }),

  repeats: z.number().min(0, 'Repeats cannot be negative'),
});

export const prescriptionSchema = z.object({
  patientId: z
    .string()
    .nonempty({ message: 'Patient is required.' })
    .regex(objectIdRegex, { message: 'Invalid patient ID format.' }),

  pharmacistId: z
    .string()
    .nonempty({ message: 'Pharmacist is required.' })
    .regex(objectIdRegex, { message: 'Invalid pharmacist ID format.' }),

  notes: z.string().optional().nullable().default(''),

  items: z
    .array(itemSchema)
    .min(1, { message: 'Prescription must include at least one item.' }),
});

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;
