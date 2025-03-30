import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/appointments/$appointmentId/edit'
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/appointments/$appointmentId/edit"!</div>;
}
