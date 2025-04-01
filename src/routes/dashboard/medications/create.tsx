import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/dashboard/medications/create')({
  component: CreateMedication,
});

function CreateMedication() {
  return (
    <div className="min-h-6/12 flex items-center justify-center px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Add New Medication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CreateAppointmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
