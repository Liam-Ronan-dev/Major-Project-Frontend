import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';

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
