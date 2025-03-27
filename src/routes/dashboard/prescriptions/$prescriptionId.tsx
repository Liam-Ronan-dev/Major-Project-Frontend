import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/prescriptions/$prescriptionId'
)({
  component: PrescriptionDetailPage,
});

function PrescriptionDetailPage() {
  const { prescriptionId } = Route.useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prescription Details</h1>
      <p>Viewing details for prescription ID: {prescriptionId}</p>
      {/* You can fetch and display full prescription info here using the ID */}
    </div>
  );
}
