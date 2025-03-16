import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/Setup-mfa')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/Setup-mfa"!</div>;
}
