import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mfaSchema, MfaFormData } from '@/validations/authSchema';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/Input-totp')({
  component: Inputtotp,
});

function Inputtotp() {
  const { verifyMfa, mfaStatus } = useAuth();
  const searchParams = useSearch({ strict: false });
  const tempToken = searchParams?.tempToken || '';

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MfaFormData>({
    resolver: zodResolver(mfaSchema),
    defaultValues: { tempToken, totp: '' },
  });

  const onSubmit = (data: MfaFormData) => {
    verifyMfa(data);
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
            onChange={(value) => setValue('totp', value)}
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
          {errors.totp && (
            <p className="text-red-400 text-center">{errors.totp.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {mfaStatus === 'pending' ? 'Verifying...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
