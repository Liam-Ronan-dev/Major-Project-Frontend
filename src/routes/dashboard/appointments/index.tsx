import { createFileRoute, Link } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useAppointments } from '@/hooks/useAppointments';
import { DataTable } from '@/components/data-table';
import { appointmentColumns } from '@/columns/appointment';
import { AppointmentRow } from '@/columns/appointment';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteAppointment } from '@/lib/api';

export const Route = createFileRoute('/dashboard/appointments/')({
  component: AllAppointments,
});

function AllAppointments() {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError } = useAppointments();

  const appointments = data || [];

  const filtered = appointments.filter((appt) => {
    return appt.doctorId?._id === user?._id;
  });

  const transformedData: AppointmentRow[] = filtered.map((appt) => ({
    id: appt._id,
    header: new Date(appt.date).toLocaleDateString(),
    type: appt.status,
    status: appt.notes || 'No notes',
    target:
      `${appt.patientId?.firstName || ''} ${appt.patientId?.lastName || ''}`.trim(),
    limit: appt.patientId?.email || 'N/A',
    reviewer: appt.patientId?.phoneNumber || 'N/A',
  }));

  if (isLoading) return <p className="text-center">Loading appointments...</p>;

  if (isError) {
    return (
      <p className="text-center text-red-500">Failed to load appointments.</p>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id);
      toast.success('Appointment deleted successfully');
    } catch (err) {
      toast.error('Failed to delete Appointment');
      console.error(err.message);
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 mb-2">
        <h1 className="text-2xl font-bold mb-2 sm:mb-4 ml-0 sm:ml-5">
          Appointments
        </h1>
        <Button
          asChild
          className="w-full sm:w-auto font-semibold mb-4 sm:mb-4 sm:mr-5 px-5"
          size="sm"
        >
          <Link to="/dashboard/appointments/create">Add Appointment</Link>
        </Button>
      </div>
      <DataTable
        columns={appointmentColumns}
        data={transformedData}
        filterColumn="target"
        filterPlaceholder="Search appointments by name..."
        editUrl={(id) => `/dashboard/appointments/${id}/edit`}
        onDelete={(id) => handleDelete(id)}
        userRole={user?.role}
      />
    </div>
  );
}
