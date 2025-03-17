import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@tanstack/react-router';

import { loginSchema, LoginFormData } from '@/validations/authSchema';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { loginUser, loginStatus } = useAuth();

  // ✅ React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle Form Submission
  const onSubmit = (data: LoginFormData) => {
    console.log('📤 Submitting Login Data:', data); // Debugging Log
    loginUser(data);
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

              {/* Submit Button */}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full font-semibold">
                  {loginStatus === 'pending' ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-5 text-center text-md">
              Don't have an account?{' '}
              <Link
                className="font-semibold underline underline-offset-4"
                to="/register"
              >
                Register
              </Link>
              {loginStatus === 'error' && (
                <p className="text-red-400 text-sm font-light">
                  Login failed. Try again.
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
