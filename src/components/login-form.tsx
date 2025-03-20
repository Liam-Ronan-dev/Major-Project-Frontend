import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useNavigate, Link } from '@tanstack/react-router';

import { login } from '@/lib/api';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Mutation for Login API
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginFormData) => login(email, password),
    onSuccess: () => {
      console.log('Navigating to OTP page');
      navigate({ to: '/input-totp' }); // Redirect to OTP page
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error(
        'Login failed:',
        error.response?.data?.message || 'Unknown error'
      );
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
              </div>

              {loginMutation.isError && (
                <p className="text-red-500 text-center text-sm mt-2">
                  Login failed. Please check your credentials.
                </p>
              )}
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
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
