import { ColumnDef } from '@tanstack/react-table';

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
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'target', header: 'Repeats' },
  { accessorKey: 'limit', header: 'Date Prescribed' },
  { accessorKey: 'reviewer', header: 'Patient' },
];
