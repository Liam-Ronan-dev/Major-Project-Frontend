import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/medications/$medicationId/edit'
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/medications/$medicationId/edit"!</div>;
}
