import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';
import { Checkbox } from '@/components/ui/checkbox';

export type PrescriptionRow = {
  id: string;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
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
  { accessorKey: 'header', header: 'Pharmacy' },
  { accessorKey: 'type', header: 'Pharmacist' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'target', header: 'Repeats' },
  { accessorKey: 'limit', header: 'Date Prescribed' },
  { accessorKey: 'reviewer', header: 'Patient' },
  {
    id: 'details',
    header: 'Details',
    cell: ({ row }) => {
      const prescription = row.original;
      return (
        <Link
          to={`/dashboard/prescriptions/${prescription.id}`}
          className="underline"
        >
          View
        </Link>
      );
    },
  },
];
