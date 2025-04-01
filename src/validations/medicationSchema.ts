import * as z from 'zod';

export const medicationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  form: z.string().min(1, 'Form is required'),
  stock: z
    .number({
      required_error: 'Stock is required',
      invalid_type_error: 'Stock must be a number',
    })
    .int()
    .min(0, 'Stock must be at least 0'),
  supplier: z.string().min(1, 'Supplier is required'),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(0, 'Price must be at least 0'),
});

export type MedicationFormData = z.infer<typeof medicationSchema>;
