import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/Input-totp')({
  component: Inputtotp,
});

function Inputtotp() {
  return <div>Hello "/Input-totp"!</div>;
}
