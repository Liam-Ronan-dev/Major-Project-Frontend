import { createFileRoute } from '@tanstack/react-router';
import { useAppointmentById } from '@/hooks/useAppointments';
import { Skeleton } from '@/components/ui/skeleton';
import { EditAppointmentForm } from '@/components/forms/appointments/EditAppointmentForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute(
  '/dashboard/appointments/$appointmentId/edit'
)({
  component: EditAppointment,
});

function EditAppointment() {
  const { appointmentId } = Route.useParams();
  const {
    data: appointment,
    isLoading,
    isError,
  } = useAppointmentById(appointmentId);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );
  }

  if (isError || !appointment) {
    return (
      <div className="p-6 text-red-500 text-center">
        Failed to load Appointment.
      </div>
    );
  }

  return (
    <div className="min-h-11/12 flex items-center justify-center px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Edit Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditAppointmentForm appointment={appointment} />
        </CardContent>
      </Card>
    </div>
  );
}
