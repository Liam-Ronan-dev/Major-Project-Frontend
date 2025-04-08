import { createFileRoute } from '@tanstack/react-router';
import { useLatestPrescription } from '@/hooks/usePrescription';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { CreatePrescriptionForm } from '@/components/forms/prescriptions/CreatePrescriptionForm';

export const Route = createFileRoute(
  '/dashboard/prescriptions/quick-prescribe'
)({
  validateSearch: (search) => ({
    patientId: search.patientId ?? null,
  }),
  component: QuickPrescribePage,
});

function QuickPrescribePage() {
  const { patientId } = Route.useSearch();
  const { data, isLoading, isError } = useLatestPrescription(
    patientId || undefined
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.data) return <div>No recent prescription found.</div>;

  const prescription = data.data;

  // Transform latest prescription into CreatePrescriptionForm compatible structure
  const prefilledData = {
    patientId: prescription.patientId._id,
    pharmacistId: prescription.pharmacistId._id,
    notes: prescription.notes || '',
    items: prescription.items.map((item) => ({
      medicationId: item.medicationId._id,
      medicationLabel: item.medicationId.name,
      specificInstructions: item.specificInstructions,
      dosage: item.dosage,
      amount: item.amount,
      repeats: item.repeats,
    })),
  };

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold mb-4">Quick Prescribe</h1>
      <CreatePrescriptionForm prefill={prefilledData} />
    </div>
  );
}
