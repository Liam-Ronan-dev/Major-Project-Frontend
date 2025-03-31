import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';

export type AppointmentRow = {
  id: string;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
};

export const appointmentColumns: ColumnDef<AppointmentRow>[] = [
  { accessorKey: 'header', header: 'Appointment Date' },
  { accessorKey: 'type', header: 'Status' },
  { accessorKey: 'status', header: 'Notes' },
  { accessorKey: 'target', header: 'Patient' },
  { accessorKey: 'limit', header: 'Email' },
  { accessorKey: 'reviewer', header: 'Phone Number' },
  {
    id: 'details',
    header: 'Details',
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <Link
          to={`/dashboard/appointments/${appointment.id}`}
          className="underline"
        >
          View
        </Link>
      );
    },
  },
];
