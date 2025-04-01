import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { verifyOTP } from '@/lib/api';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { totpSchema, totpFormData } from '@/validations/authSchema';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const Route = createFileRoute('/Input-totp')({
  component: Inputtotp,
});

function Inputtotp() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue, // Used to update OTP dynamically
    formState: { errors },
  } = useForm<totpFormData>({
    resolver: zodResolver(totpSchema),
    defaultValues: { totp: '' },
  });

  // Mutation for OTP Verification
  const otpMutation = useMutation({
    mutationFn: (data: totpFormData) => verifyOTP(data.totp),
    onSuccess: () => {
      console.log('Navigating to Dashboard');
      auth?.refetchUser();
      navigate({ to: '/dashboard' });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error(
        'OTP Verification Failed:',
        error.response?.data?.message || 'Invalid OTP'
      );
    },
  });

  const onSubmit = async (data: totpFormData) => {
    otpMutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90lvh] px-4">
      <h1 className="text-2xl font-bold">Enter MFA Code</h1>
      <p className="m-5 text-center leading-7 [&:not(:first-child)]:mt-6">
        Enter the one-time password from your Authenticator app.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 w-96 space-y-8">
        {/* TOTP Input with ShadCN InputOTP */}
        <div className="grid gap-3 flex justify-center">
          <Label htmlFor="totp" className="text-center">
            {' '}
          </Label>
          <InputOTP
            id="totp"
            maxLength={6}
            {...register('totp')} // Connects the field with useForm
            onChange={(value) => setValue('totp', value)} // Updates useForm state
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Display Validation Errors */}
        {errors.totp && (
          <p className="text-red-500 text-center text-sm">
            {errors.totp.message}
          </p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={otpMutation.isPending}
        >
          {otpMutation.isPending ? 'Verifying...' : 'Submit'}
        </Button>

        {/* API Error Message */}
        {otpMutation.isError && (
          <p className="text-red-500 text-center text-sm mt-2">
            {otpMutation.error?.response?.data?.message ||
              'Invalid or expired OTP. Try again.'}
          </p>
        )}
      </form>
    </div>
  );
}
