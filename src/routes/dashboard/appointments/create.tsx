import { createFileRoute } from '@tanstack/react-router';
import { CreateAppointmentForm } from '@/components/forms/appointments/CreateAppointmentForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/dashboard/appointments/create')({
  component: CreateAppointment,
});

function CreateAppointment() {
  return (
    <div className="min-h-6/12 flex items-center justify-center px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Add New Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CreateAppointmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
