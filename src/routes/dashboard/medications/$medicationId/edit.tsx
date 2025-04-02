import { createFileRoute } from '@tanstack/react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMedicationById } from '@/hooks/useMedications';
import { EditMedicationForm } from '@/components/forms/medications/EditMedicationForm';

export const Route = createFileRoute(
  '/dashboard/medications/$medicationId/edit'
)({
  component: EditPatient,
});

function EditPatient() {
  const { medicationId } = Route.useParams();
  const {
    data: medication,
    isLoading,
    isError,
  } = useMedicationById(medicationId);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 ws-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );
  }

  if (isError || !medication) {
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
          <EditMedicationForm medication={medication} />
        </CardContent>
      </Card>
    </div>
  );
}
