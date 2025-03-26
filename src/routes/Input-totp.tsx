import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { verifyOTP } from '@/lib/api';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const Route = createFileRoute('/Input-totp')({
  component: Inputtotp,
});

const totpSchema = z.object({
  totp: z
    .string()
    .length(6, 'TOTP must be 6 digits')
    .regex(/^\d{6}$/, 'Invalid TOTP format'),
});

export type totpFormData = z.infer<typeof totpSchema>;

function Inputtotp() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext); // ⬅️ use AuthContext

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
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error(
        'OTP Verification Failed:',
        error.response?.data?.message || 'Invalid OTP'
      );
    },
  });

  const onSubmit = async (data: totpFormData) => {
    try {
      await otpMutation.mutateAsync(data); // ⬅️ wait for OTP verification
      await auth?.refetchUser(); // ⬅️ make sure user is loaded
      navigate({ to: '/dashboard/' }); // ⬅️ THEN navigate
    } catch (err) {
      console.error('OTP failed or user fetch failed:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold">Enter MFA Code</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Enter the one-time password from your Authenticator app.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-96 space-y-8">
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
          className="w-full"
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
