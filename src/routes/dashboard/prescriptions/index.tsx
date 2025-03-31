import { createFileRoute, Link } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { prescriptionColumns } from '@/columns/prescription';
import { DataTable } from '@/components/data-table';
import { usePrescriptions } from '@/hooks/usePrescription';
import { Button } from '@/components/ui/button';
import { extractNameFromEmail } from '@/helpers/ExtractEmail';

export const Route = createFileRoute('/dashboard/prescriptions/')({
  component: PrescriptionsPage,
});

function PrescriptionsPage() {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError } = usePrescriptions();

  const prescriptions = data || [];

  const filteredData = prescriptions.filter((prescription) => {
    const doctorId = prescription.doctorId?._id;
    const pharmacistId = prescription.pharmacistId?._id;

    if (user?.role === 'doctor') return doctorId === user._id;
    if (user?.role === 'pharmacist') return pharmacistId === user._id;

    return false;
  });

  const transformedData = filteredData.map((p) => ({
    id: p._id,
    header: p.pharmacyName,
    type: extractNameFromEmail(p.pharmacistId.email),
    status: p.status,
    target: p.repeats.toString(),
    limit: new Date(p.createdAt).toLocaleDateString(),
    reviewer: p.patientId
      ? `${p.patientId.firstName} ${p.patientId.lastName}`
      : 'Unknown Patient',
  }));

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl font-bold mb-2 sm:mb-4 ml-0 sm:ml-5">
          Prescriptions
        </h1>
        {user?.role === 'doctor' && (
          <Button
            asChild
            className="w-full sm:w-auto font-semibold mb-4 sm:mb-4 sm:mr-5"
            size="sm"
          >
            <Link to="/dashboard/prescriptions/create">Add Prescription</Link>
          </Button>
        )}
      </div>
      {isLoading ? (
        <p className="text-center">Loading prescriptions...</p>
      ) : isError ? (
        <p className="text-center text-red-500">
          Failed to load prescriptions.
        </p>
      ) : (
        <DataTable data={transformedData} columns={prescriptionColumns} />
      )}
    </div>
  );
}
