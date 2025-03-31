import { createFileRoute, Link } from '@tanstack/react-router';
import { usePatients } from '@/hooks/usePatients';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { DataTable } from '@/components/data-table';
import { PatientRow } from '@/columns/patient';
import { patientColumns } from '@/columns/patient';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/dashboard/patients/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError } = usePatients();

  const patients = data || [];

  const filtered =
    user?.role === 'doctor'
      ? patients.filter((patient) => patient.doctorId?._id === user._id)
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

  if (isLoading) return <p className="text-center">Loading patients...</p>;

  if (isError) {
    return <p className="text-center text-red-500">Failed to load patients.</p>;
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl font-bold mb-2 sm:mb-4 ml-0 sm:ml-5">
          Patients
        </h1>
        {user?.role === 'doctor' && (
          <Button
            asChild
            className="w-full sm:w-auto font-semibold mb-4 sm:mb-4 sm:mr-5"
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
      />
    </div>
  );
}
