import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/prescriptions/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/prescriptions/create"!</div>;
}
