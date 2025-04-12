import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: 'header', header: 'Appointment Date' },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-semibold"
        >
          Status
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
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
          className="underline font-semibold"
        >
          View
        </Link>
      );
    },
  },
];
