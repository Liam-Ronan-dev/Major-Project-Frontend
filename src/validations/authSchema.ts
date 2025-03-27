import * as z from 'zod';

// Registration Schema - Matches Backend Validation
export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password cannot exceed 128 characters')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
  licenseNumber: z
    .string()
    .length(6, 'License number must be exactly 6 digits')
    .regex(/^\d+$/, 'License number must contain only numbers'),
  role: z.enum(['doctor', 'pharmacist']),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const totpSchema = z.object({
  totp: z
    .string()
    .length(6, 'TOTP must be 6 digits')
    .regex(/^\d{6}$/, 'Invalid TOTP format'),
});

// Export inferred TypeScript types
export type totpFormData = z.infer<typeof totpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
