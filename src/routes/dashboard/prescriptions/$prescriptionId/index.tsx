import { createFileRoute } from '@tanstack/react-router';
import { usePrescriptionById } from '@/hooks/usePrescription';
import { Skeleton } from '@/components/ui/skeleton';
import { deletePrescription } from '@/lib/api';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute(
  '/dashboard/prescriptions/$prescriptionId/'
)({
  component: PrescriptionDetailPage,
});

function PrescriptionDetailPage() {
  const { prescriptionId } = Route.useParams();
  const { data, isLoading, isError } = usePrescriptionById(prescriptionId);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deletePrescription(prescriptionId);
      toast.success('Prescription deleted successfully');
      navigate({ to: '/dashboard/prescriptions' });
    } catch (err) {
      toast.error('Failed to delete prescription');
    }
  };

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
      <div className="p-6 text-red-500">
        Failed to load prescription details.
      </div>
    );
  }

  const {
    patientId,
    pharmacistId,
    createdAt,
    repeats,
    status,
    pharmacyName,
    generalInstructions,
    notes,
    items,
  } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Details */}
      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-2 text-lg">Details</h2>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Prescribed:</strong>{' '}
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Repeats:</strong> {repeats}
        </p>
        <p>
          <strong>Pharmacy:</strong> {pharmacyName}
        </p>
        <p>
          <strong>Pharmacist:</strong> {pharmacistId?.email}
        </p>
      </div>

      {/* Patient Info */}
      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-2 text-lg">Patient Information</h2>
        <p>
          <strong>Name:</strong> {patientId?.firstName} {patientId?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {patientId?.email}
        </p>
        <p>
          <strong>Phone:</strong> {patientId?.phone}
        </p>
      </div>

      {/* General Instructions */}
      <div className="rounded-lg border p-4 md:col-span-1">
        <h2 className="font-semibold mb-2 text-lg">General Instructions</h2>
        <p className="min-h-[40px] text-muted-foreground">
          {generalInstructions || 'None provided.'}
        </p>
      </div>

      {/* Notes */}
      <div className="rounded-lg border p-4 md:col-span-1">
        <h2 className="font-semibold mb-2 text-lg">Prescription Notes</h2>
        <p className="min-h-[40px] text-muted-foreground">
          {notes || 'No notes added.'}
        </p>
      </div>

      <div className="rounded-lg border p-4 md:col-span-2">
        <h2 className="font-semibold mb-4 text-lg">Medications</h2>

        {items && items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item: any, idx: number) => {
              const med = item.medications?.[0];
              const dose = item.dosages?.[0];

              return (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-md p-4 bg-muted/5"
                >
                  {/* Medication Info */}
                  <div>
                    <h3 className="font-semibold text-base mb-2">Medication</h3>
                    <p>
                      <strong>Name:</strong> {med?.name ?? 'Unnamed Medication'}
                    </p>
                    {med?.form && (
                      <p>
                        <strong>Form:</strong> {med.form}
                      </p>
                    )}
                    {item.specificInstructions && (
                      <p className="text-sm  mt-2">
                        {item.specificInstructions}
                      </p>
                    )}
                  </div>

                  {/* Dosage Info */}
                  <div>
                    <h3 className="font-semibold text-base mb-2">Dosage</h3>
                    {dose?.amount && (
                      <p>
                        <strong>Amount:</strong> {dose.amount}
                      </p>
                    )}
                    {dose?.frequency && (
                      <p>
                        <strong>Frequency:</strong> {dose.frequency}
                      </p>
                    )}
                    {dose?.duration && (
                      <p>
                        <strong>Duration:</strong> {dose.duration}
                      </p>
                    )}
                    {dose?.notes && (
                      <p>
                        <strong>Notes:</strong> {dose.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">No medications listed.</p>
        )}
      </div>
      <div className="flex gap-3">
        <Button
          onClick={handleDelete}
          variant="destructive"
          className="mt-4 bg-red-600 hover:bg-red-700 text-white w-50 px-4 py-2 rounded-md text-sm font-medium"
        >
          Delete Prescription
        </Button>
        <Button
          onClick={() =>
            navigate({ to: `/dashboard/prescriptions/${prescriptionId}/edit` })
          }
          variant="outline"
          className="mt-4 text-white w-50 px-4 py-2 rounded-md text-sm font-medium"
        >
          Edit Prescription
        </Button>
      </div>
    </div>
  );
}
