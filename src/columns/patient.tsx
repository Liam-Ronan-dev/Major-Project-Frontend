import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';

export type PatientRow = {
  id: string;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
};

export const patientColumns: ColumnDef<PatientRow>[] = [
  { accessorKey: 'header', header: 'Patient' },
  { accessorKey: 'type', header: 'DOB' },
  { accessorKey: 'status', header: 'Gender' },
  { accessorKey: 'target', header: 'Email' },
  { accessorKey: 'limit', header: 'Address' },
  { accessorKey: 'reviewer', header: 'Phone Number' },
  {
    id: 'details',
    header: 'Details',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <Link to={`/dashboard/patients/${patient.id}`} className="underline">
          View
        </Link>
      );
    },
  },
];
