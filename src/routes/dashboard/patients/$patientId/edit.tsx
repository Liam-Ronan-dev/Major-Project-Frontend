import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/patients/$patientId/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/patients/$patientId/edit"!</div>;
}
