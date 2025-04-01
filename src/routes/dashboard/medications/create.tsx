import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/medications/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/medications/create"!</div>;
}
