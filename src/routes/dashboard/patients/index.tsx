import { createFileRoute, Link } from '@tanstack/react-router';
import { usePatients } from '@/hooks/usePatients';
import { DataTable } from '@/components/data-table';
import { PatientRow } from '@/columns/patient';
import { patientColumns } from '@/columns/patient';
import { Button } from '@/components/ui/button';
import { deletePatient } from '@/lib/api';
import { toast } from 'sonner';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

export const Route = createFileRoute('/dashboard/patients/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: patients, isLoading, isError } = usePatients();

  const deleteMutation = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      toast.success('Patient deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
    onError: () => toast.error('Failed to delete Patient'),
  });

  if (isLoading) return <p className="text-center">Loading patients...</p>;

  if (isError) {
    return <p className="text-center text-red-500">Failed to load patients.</p>;
  }

  const filtered =
    user?.role === 'doctor'
      ? patients.filter(
          (patient) =>
            patient.doctorId === user._id || patient.doctorId?._id === user._id
        )
      : patients;

  const transformedData: PatientRow[] = filtered.map((patient) => ({
    id: patient._id,
    header: `${patient.firstName || ''} ${patient.lastName || ''}`.trim(),
    type: patient.dateOfBirth,
    status: patient.gender,
    target: patient.email || 'N/A',
    limit: `${patient.address.street}, ${patient.address.city}, ${patient.address.country}`,
    reviewer: patient.phoneNumber,
  }));

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 mb-2">
        <h1 className="text-2xl font-bold mb-2 sm:mb-4 ml-0 sm:ml-5">
          Patients
        </h1>
        {user?.role === 'doctor' && (
          <Button
            asChild
            className="mw-full sm:w-auto font-semibold mb-4 sm:mb-4 sm:mr-5 cursor-pointer px-8"
            size="sm"
          >
            <Link to="/dashboard/patients/create">Add Patient</Link>
          </Button>
        )}
      </div>
      <DataTable
        columns={patientColumns}
        data={transformedData}
        filterColumn="header"
        filterPlaceholder="Search patients by name..."
        editUrl={(id) => `/dashboard/patients/${id}/edit`}
        onDelete={(id) => handleDelete(id)}
        userRole={user?.role}
      />
    </div>
  );
}
