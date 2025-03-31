import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/verified')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full text-center shadow-md">
        <CardHeader>
          <CheckCircle className="mx-auto text-green-600 w-12 h-12" />
          <CardTitle className="text-2xl mt-4">User Verified</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The user has been successfully verified. They can now proceed to set
            up MFA.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
