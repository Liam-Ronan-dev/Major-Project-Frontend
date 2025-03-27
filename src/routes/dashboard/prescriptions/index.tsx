import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/prescriptions/')({
  component: PrescriptionsPage,
});

function PrescriptionsPage() {
  return <div>Hello "/dashboard/prescriptions/"!</div>;
}
