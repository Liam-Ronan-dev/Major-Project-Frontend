import { createFileRoute } from '@tanstack/react-router';
import { CreatePrescriptionForm } from '@/components/forms/prescriptions/CreatePrescriptionForm';

export const Route = createFileRoute('/dashboard/prescriptions/create')({
  component: CreatePrescription,
});

function CreatePrescription() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Add New Prescription</h1>
      </div>
      <CreatePrescriptionForm />
    </div>
  );
}
