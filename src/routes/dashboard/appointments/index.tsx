import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/appointments/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/appointments"!</div>;
}
