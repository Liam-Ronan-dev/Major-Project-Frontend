import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';
import { Checkbox } from '@/components/ui/checkbox';

export type MedicationRow = {
  id: string;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
};

export const medicationColumns: ColumnDef<MedicationRow>[] = [
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
  { accessorKey: 'header', header: 'Name' },
  { accessorKey: 'type', header: 'Form' },
  { accessorKey: 'target', header: 'Stock' },
  { accessorKey: 'limit', header: 'Supplier' },
  { accessorKey: 'reviewer', header: 'Price' },
];
