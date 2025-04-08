import { createFileRoute } from '@tanstack/react-router';
import { usePrescriptionById } from '@/hooks/usePrescription';
import { Skeleton } from '@/components/ui/skeleton';
import { EditPrescriptionForm } from '@/components/forms/prescriptions/EditPrescriptionForm';

export const Route = createFileRoute(
  '/dashboard/prescriptions/$prescriptionId/edit'
)({
  component: EditPrescriptionRoute,
});

function EditPrescriptionRoute() {
  const { prescriptionId } = Route.useParams();
  const {
    data: prescription,
    isLoading,
    isError,
  } = usePrescriptionById(prescriptionId);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );
  }

  if (isError || !prescription) {
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
        prescription={{
          _id: prescription._id,
          patientId: prescription.patientId._id,
          pharmacistId: prescription.pharmacistId._id,
          notes: prescription.notes ?? '',
          items: prescription.items.map((item) => ({
            medicationId: item.medicationId._id,
            medicationLabel: item.medicationId.name,
            specificInstructions: item.specificInstructions,
            dosage: item.dosage,
            amount: item.amount,
            repeats: item.repeats,
          })),
        }}
      />
    </div>
  );
}
