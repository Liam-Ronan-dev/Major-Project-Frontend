import { createFileRoute } from '@tanstack/react-router';
import { usePatientById } from '@/hooks/usePatients';
import { Skeleton } from '@/components/ui/skeleton';
import { EditPatientForm } from '@/components/forms/patients/EditPatientForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/dashboard/patients/$patientId/edit')({
  component: EditPatient,
});

function EditPatient() {
  const { patientId } = Route.useParams();
  const { data: patient, isLoading, isError } = usePatientById(patientId);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );
  }

  if (isError || !patient) {
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
          <EditPatientForm patient={patient} />
        </CardContent>
      </Card>
    </div>
  );
}
