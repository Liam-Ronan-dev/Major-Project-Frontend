import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@/components/login-form';

export const Route = createFileRoute('/Login')({
  component: Login,
});

function Login() {
  return (
    <div className="flex items-center justify-center min-h-[90lvh] w-full px-4">
      <div className="w-full max-w-md">
        <h1 className="text-center w-full scroll-m-20 text-4xl font-extrabold lg:text-5xl">
          Login in to your account
        </h1>
        <p className="m-5 text-center leading-7 [&:not(:first-child)]:mt-6">
          Enter your email and password below to login to your account
        </p>
        <LoginForm />
        <p className="m-5 text-center leading-7 [&:not(:first-child)]:mt-6">
          By clicking continue, you agree to our{' '}
          <span className="underline">Terms of Service</span> and{' '}
          <span className="underline">Privacy Policy.</span>
        </p>
      </div>
    </div>
  );
}
