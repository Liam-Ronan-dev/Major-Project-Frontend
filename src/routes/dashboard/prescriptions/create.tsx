import { createFileRoute } from '@tanstack/react-router';
import { CreatePrescriptionForm } from '@/components/forms/CreatePrescriptionForm';

export const Route = createFileRoute('/dashboard/prescriptions/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4 ml-5">Add New Prescription</h1>
      </div>
      <CreatePrescriptionForm />
    </div>
  );
}
