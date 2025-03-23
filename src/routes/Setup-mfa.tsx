import { createFileRoute, useSearch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/Setup-mfa')({
  component: SetupMfa,
});

function SetupMfa() {
  // Get `qrCode` from the URL query parameters
  const searchParams = useSearch({ strict: false });

  // Decode the QR code URL (if it exists)
  const qrCode = searchParams.qrCode
    ? decodeURIComponent(searchParams.qrCode)
    : '';

  return (
    <div className="flex flex-col items-center justify-center min-h-5/6 p-6">
      <h1 className="text-2xl font-bold text-center">
        Setup Multi-Factor Authentication
      </h1>
      <p className="m-5 text-center leading-7 [&:not(:first-child)]:mt-6">
        Scan the QR code below in an authenticator app to complete MFA setup.
      </p>

      {/* Display QR Code if available */}
      {qrCode ? (
        <>
          <img
            src={qrCode}
            alt="MFA QR Code"
            className="border rounded-lg shadow-md mt-5"
          />

          <Button asChild className="mt-5 w-md font-semibold">
            <Link to="/login">Continue</Link>
          </Button>
        </>
      ) : (
        <p className="text-red-400 mt-4 font-semibold">QR Code not found.</p>
      )}
    </div>
  );
}
