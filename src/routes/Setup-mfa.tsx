import { createFileRoute, useSearch } from '@tanstack/react-router';

export const Route = createFileRoute('/Setup-mfa')({
  component: SetupMfa,
});

function SetupMfa() {
  // 🔹 Get `qrCode` from the URL query parameters
  const searchParams = useSearch({ strict: false });

  // 🔹 Decode the QR code URL (if it exists)
  const qrCode = searchParams.qrCode
    ? decodeURIComponent(searchParams.qrCode)
    : '';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold">Setup Multi-Factor Authentication</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Scan the QR code below in an authenticator app to complete MFA setup.
      </p>

      {/* ✅ Display QR Code if available */}
      {qrCode ? (
        <img
          src={qrCode}
          alt="MFA QR Code"
          className="mt-4 border rounded-lg shadow-md"
        />
      ) : (
        <p className="text-red-500 mt-4">QR Code not found.</p>
      )}
    </div>
  );
}
