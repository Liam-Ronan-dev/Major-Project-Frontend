import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/validations/authSchema';
import { useAuthAPI } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@tanstack/react-router';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { registerUser, registerStatus } = useAuthAPI();

  // ✅ React Hook Form (RHF) Setup
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

  // Handle Form Submission
  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
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
                <Button type="submit" className="w-full font-semibold">
                  {registerStatus === 'pending' ? 'Registering...' : 'Register'}
                </Button>
              </div>
            </div>

            {/* Login Link */}
            <div className="mt-5 text-center text-md">
              Already have an account?{' '}
              <Link
                className="font-semibold underline underline-offset-4"
                to="/Login"
              >
                Login
              </Link>
              {registerStatus === 'error' && (
                <p className="text-red-400 text-sm font-light">
                  Registration failed. Try again.
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
