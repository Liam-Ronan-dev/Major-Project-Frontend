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
import { loginSchema, LoginFormData } from '@/validations/authSchema';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

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
      auth?.refetchUser();
      console.log('Navigating to Input-totp');
      navigate({ to: '/input-totp' });
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
    <div
      className={cn(' md:max-w-lg sm:max-w-sm mx-auto px-4', className)}
      {...props}
    >
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8">
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
                  className="w-full font-semibold"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
              </div>

              {loginMutation.isError && (
                <p className="text-red-500 text-center text-sm mt-2">
                  {loginMutation.error?.response?.data?.message ||
                    'Login failed, please check credentials'}
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
