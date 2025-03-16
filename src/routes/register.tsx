import { RegisterForm } from '@/components/register-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/register')({
  component: Register,
});

function Register() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center md:p-10">
      <div className="w-full max-w-lg">
        <h1 className="text-center w-full scroll-m-20 text-4xl font-extrabold lg:text-5xl">
          Create an account
        </h1>
        <p className="m-5 text-center leading-7 [&:not(:first-child)]:mt-6">
          Enter your email, password, license number, and role below to create
          your account
        </p>
        <RegisterForm />
        <p className="m-5 text-center leading-7 [&:not(:first-child)]:mt-6">
          By clicking continue, you agree to our{' '}
          <span className="underline">Terms of Service</span> and{' '}
          <span className="underline">Privacy Policy.</span>
        </p>
      </div>
    </div>
  );
}
