import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type PrescriptionRow = {
  id: string;
  pharmacy: string;
  status: string;
  date: string;
  patient: string;
  patientId: string;
};

export const prescriptionColumns: ColumnDef<PrescriptionRow>[] = [
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
  { accessorKey: 'pharmacy', header: 'Pharmacy' },
  {
    accessorKey: 'status',
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
  { accessorKey: 'date', header: 'Date Prescribed' },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <Link
          className="underline font-semibold"
          to={`/dashboard/patients/${patient.patientId}`}
        >
          {patient.patient}
        </Link>
      );
    },
  },
  {
    id: 'details',
    header: 'Details',
    cell: ({ row }) => {
      const prescription = row.original;
      return (
        <Link
          to={`/dashboard/prescriptions/${prescription.id}`}
          className="underline font-semibold"
        >
          View
        </Link>
      );
    },
  },
];
