import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DataTable } from '@/components/data-table';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useMedications } from '@/hooks/useMedications';
import { deleteMedication } from '@/lib/api';
import { medicationColumns, MedicationRow } from '@/columns/medication';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const Route = createFileRoute('/dashboard/medications/')({
  component: AllMedications,
});

function AllMedications() {
  const { user } = useContext(AuthContext);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data: medications, isLoading, isError } = useMedications();

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: deleteMedication,
    onSuccess: () => {
      toast.success('Medication deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
    onError: () => toast.error('Failed to delete Medication'),
  });

  if (isLoading) return <p className="text-center">Loading medications...</p>;

  if (isError) {
    return (
      <p className="text-center text-red-500">Failed to load medications.</p>
    );
  }

  const filtered = medications.filter(
    (medication) => medication.pharmacistId?._id === user?._id
  );
  const transformedData: MedicationRow[] = filtered.map((medication) => ({
    id: medication._id,
    header: medication.name,
    type: medication.form,
    status: medication.dosage,
    target: medication.stock,
    limit: medication.supplier,
    reviewer: `€ ${medication.price}`,
  }));

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 mb-2">
        <h1 className="text-2xl font-bold mb-2 sm:mb-4 ml-0 sm:ml-5">
          Medications
        </h1>
        <Button
          asChild
          className="w-full sm:w-auto font-semibold mb-4 sm:mb-4 sm:mr-5 px-5"
          size="sm"
        >
          <Link to="/dashboard/medications/create">Add Medication</Link>
        </Button>
      </div>
      <DataTable
        columns={medicationColumns}
        data={transformedData}
        filterColumn="header"
        filterPlaceholder="Search medications by name..."
        editUrl={(id) => `/dashboard/medications/${id}/edit`}
        onDelete={(id) => handleDelete(id)}
        userRole={user?.role}
        resourceType="medications"
      />
    </div>
  );
}
