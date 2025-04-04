import * as z from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

const itemSchema = z.object({
  medicationId: z
    .string()
    .nonempty({ message: 'Medication is required.' })
    .regex(objectIdRegex, { message: 'Invalid medication format.' }),

  specificInstructions: z
    .string()
    .nonempty({ message: 'Specific instructions are required.' }),

  dosage: z.string().nonempty({ message: 'Dosage is required.' }),

  amount: z.string().nonempty({ message: 'Amount is required.' }),

  repeats: z.number().int().positive().optional(),
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

  notes: z.string().optional(),

  items: z
    .array(itemSchema)
    .min(1, { message: 'Prescription must include at least one item.' }),
});

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;
