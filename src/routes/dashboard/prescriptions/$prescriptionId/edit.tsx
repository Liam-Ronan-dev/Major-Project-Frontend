import { createFileRoute } from '@tanstack/react-router';
import { usePrescriptionById } from '@/hooks/usePrescription';
import { EditPrescriptionForm } from '@/components/forms/prescriptions/EditPrescriptionForm';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createFileRoute(
  '/dashboard/prescriptions/$prescriptionId/edit'
)({
  component: EditPrescriptionRoute,
});

function EditPrescriptionRoute() {
  const { prescriptionId } = Route.useParams();
  const { data, isLoading, isError } = usePrescriptionById(prescriptionId);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500 text-center">
        Failed to load prescription.
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Update Prescription</h1>
      </div>
      <EditPrescriptionForm
        prescriptionId={prescriptionId}
        defaultValues={{
          ...data,
          pharmacistId: data.pharmacistId?._id ?? '',
          patientId: data.patientId?._id ?? '',
          items: data.items.map((item: any) => ({
            ...item,
            medications: item.medications.map((m: any) => m._id),
            dosages: item.dosages.map((d: any) => ({
              medicationId: d.medicationId?._id ?? '',
              amount: d.amount,
              frequency: d.frequency,
              duration: d.duration,
              notes: d.notes,
            })),
          })),
        }}
      />
    </div>
  );
}
