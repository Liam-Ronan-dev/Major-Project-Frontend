import { createFileRoute, Link } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { prescriptionColumns } from '@/columns/prescription';
import { DataTable } from '@/components/data-table';
import { usePrescriptions } from '@/hooks/usePrescription';
import { Button } from '@/components/ui/button';
import { deletePrescription } from '@/lib/api';
import { toast } from 'sonner';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const Route = createFileRoute('/dashboard/prescriptions/')({
  component: PrescriptionsPage,
});

function PrescriptionsPage() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { data: prescriptions, isLoading, isError } = usePrescriptions();

  const deleteMutation = useMutation({
    mutationFn: deletePrescription,
    onSuccess: () => {
      toast.success('Prescription deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
    },
    onError: () => toast.error('Failed to delete Prescription'),
  });

  if (isLoading) return <p className="text-center">Loading prescriptions...</p>;

  if (isError) {
    return (
      <p className="text-center text-red-500">Failed to load prescriptions.</p>
    );
  }

  const filteredData = prescriptions.filter((prescription) => {
    const doctorId = prescription.doctorId?._id;
    const pharmacistId = prescription.pharmacistId?._id;

    if (user?.role === 'doctor') return doctorId === user._id;
    if (user?.role === 'pharmacist') return pharmacistId === user._id;

    return false;
  });

  const transformedData = filteredData.map((p) => ({
    id: p._id,
    pharmacy: p.pharmacistId?.email || 'Unknown Pharmacy',
    status: p.status,
    date: new Date(p.createdAt).toLocaleDateString(),
    patient: p.patientId
      ? `${p.patientId.firstName} ${p.patientId.lastName}`
      : 'Unknown Patient',
    patientId: p.patientId?._id,
  }));

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 mb-2">
        <h1 className="text-2xl font-bold mb-2 sm:mb-4 ml-0 sm:ml-5">
          Prescriptions
        </h1>
        {user?.role === 'doctor' && (
          <Button
            asChild
            className="mw-full sm:w-auto font-semibold mb-4 sm:mb-4 sm:mr-5 cursor-pointer px-8"
            size="sm"
          >
            <Link to="/dashboard/prescriptions/create">Add Prescription</Link>
          </Button>
        )}
      </div>
      <DataTable
        data={transformedData}
        columns={prescriptionColumns}
        filterColumn="patient"
        filterPlaceholder="Search prescriptions by patient"
        editUrl={(id) => `/dashboard/prescriptions/${id}/edit`}
        onDelete={(id) => handleDelete(id)}
        userRole={user?.role}
      />
    </div>
  );
}
