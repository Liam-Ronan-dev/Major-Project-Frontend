import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from '@tanstack/react-router';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/lib/api';

const registerSchema = z.object({
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
  role: z.enum(['doctor', 'pharmacist']), // Must be exactly "doctor" or "pharmacist"
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      licenseNumber: '',
      role: 'doctor',
    },
  });

  // Mutation for Register API
  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => registerUser(data),
    onSuccess: (data) => {
      if (data.qrCode) {
        navigate({
          to: '/Setup-mfa',
          search: { qrCode: encodeURIComponent(data.qrCode) },
        });
      } else {
        console.error('QR Code missing from response');
      }
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error(
        'Registration failed:',
        error.response?.data?.message || 'Unknown error'
      );
    },
  });

  // ✅ Form Submission
  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="grid gap-3">
                <Label className="font-semibold" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm font-light">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="grid gap-3">
                <Label className="font-semibold" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm font-light">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* License Number Field */}
              <div className="grid gap-3">
                <Label className="font-semibold" htmlFor="licenseNumber">
                  License Number
                </Label>
                <Input id="licenseNumber" {...register('licenseNumber')} />
                {errors.licenseNumber && (
                  <p className="text-red-400 text-sm font-light">
                    {errors.licenseNumber.message}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div className="grid gap-3">
                <Label className="font-semibold">Role</Label>
                <RadioGroup
                  defaultValue="doctor"
                  onValueChange={(value) =>
                    setValue('role', value as 'doctor' | 'pharmacist')
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doctor" id="doctor" />
                    <Label htmlFor="doctor">Doctor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pharmacist" id="pharmacist" />
                    <Label htmlFor="pharmacist">Pharmacist</Label>
                  </div>
                </RadioGroup>
                {errors.role && (
                  <p className="text-red-400 text-sm font-light">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? 'Registering...' : 'Register'}
                </Button>
              </div>

              {registerMutation.isError && (
                <p className="text-red-500 text-center text-sm mt-2">
                  {registerMutation.error?.response?.data?.message ||
                    'Registration failed. Try again.'}
                </p>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center mt-4 text-md">
              Already have an account?{' '}
              <Link
                className="font-semibold underline underline-offset-4"
                to="/login"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
