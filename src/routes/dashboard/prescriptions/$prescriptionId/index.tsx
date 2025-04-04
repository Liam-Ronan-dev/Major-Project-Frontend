import { createFileRoute } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  CalendarDays,
  ClipboardList,
  FileText,
  Home,
  Mail,
  Phone,
  User,
  Building2,
  Pill,
  Syringe,
} from 'lucide-react';
import {
  usePrescriptionById,
  useUpdatePrescriptionStatus,
} from '@/hooks/usePrescription';
import { Skeleton } from '@/components/ui/skeleton';
import { deletePrescription } from '@/lib/api';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export const Route = createFileRoute(
  '/dashboard/prescriptions/$prescriptionId/'
)({
  component: PrescriptionDetailPage,
});

function PrescriptionDetailPage() {
  const { user } = useContext(AuthContext);
  const { prescriptionId } = Route.useParams();
  const { data, isLoading, isError } = usePrescriptionById(prescriptionId);
  const updateMutation = useUpdatePrescriptionStatus(prescriptionId);
  const navigate = useNavigate();

  const [formStatus, setFormStatus] = useState('Pending');
  const [formNotes, setFormNotes] = useState('');
  const [itemNotes, setItemNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data) {
      setFormStatus(data.status || 'Pending');
      setFormNotes(data.notes || '');
    }
  }, [data]);

  useEffect(() => {
    if (data?.items) {
      const initialNotes = Object.fromEntries(
        data.items.map((item) => [item._id, item.pharmacistNote || ''])
      );
      setItemNotes(initialNotes);
    }
  }, [data]);

  const isChanged =
    formStatus !== (data?.status || 'Pending') ||
    formNotes !== (data?.notes || '') ||
    (data?.items || []).some(
      (item) => itemNotes[item._id] !== (item.pharmacistNote || '')
    );

  const handlePharmacistUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const filteredItemNotes = Object.entries(itemNotes)
        .filter(([, note]) => note.trim() !== '')
        .map(([itemId, pharmacistNote]) => ({ itemId, pharmacistNote }));

      await updateMutation.mutateAsync({
        status: formStatus,
        notes: formNotes,
        itemNotes: filteredItemNotes, // only non-empty notes sent
      });
      navigate({ to: '/dashboard/prescriptions' });
      toast.success('Updated Prescription successfully');
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async () => {
    try {
      await deletePrescription(prescriptionId);
      toast.success('Prescription deleted successfully');
      navigate({ to: '/dashboard/prescriptions' });
    } catch (err) {
      toast.error('Failed to delete prescription');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load prescription details.
      </div>
    );
  }

  const { patientId, pharmacistId, createdAt, status, notes, items } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Prescription Summary */}
      <div className="rounded-2xl border bg-muted/5 p-5 space-y-4 shadow-sm">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-muted-foreground" />
          Prescription Info
        </h3>
        <p className="flex items-center gap-2 text-sm">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
          Date Prescribed: {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          Pharmacy: {pharmacistId?.email}
        </p>
        <div className="flex items-center gap-2">
          <strong className="font-medium">Status:</strong>
          {user?.role === 'pharmacist' ? (
            <Select value={formStatus} onValueChange={setFormStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {[
                  'Assigned',
                  'Pending',
                  'Processed',
                  'Completed',
                  'Cancelled',
                ].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Badge variant="outline" className="text-sm p-2">
              {status}
            </Badge>
          )}
        </div>
      </div>

      {/* Patient Info */}
      <div className="rounded-2xl border bg-muted/5 p-5 space-y-4 shadow-sm">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <User className="w-5 h-5 text-muted-foreground" />
          Patient Info
        </h3>
        <p className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-muted-foreground" />
          {patientId?.firstName} {patientId?.lastName}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground" />
          {patientId?.email}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          {patientId?.phoneNumber}
        </p>
      </div>

      {/* Notes Section */}
      <div className="rounded-2xl border bg-muted/5 p-5 shadow-sm md:col-span-2">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5 text-muted-foreground" />
          Notes
        </h3>
        {user?.role === 'pharmacist' ? (
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[60px]"
            value={formNotes}
            onChange={(e) => setFormNotes(e.target.value)}
            placeholder="Add your pharmacist notes here..."
          />
        ) : (
          <p className="min-h-[40px]">{notes || 'No notes added.'}</p>
        )}
      </div>

      {/* Medications Table */}
      <div className="rounded-2xl border bg-muted/5 p-5 shadow-sm md:col-span-2">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Pill className="w-5 h-5 text-muted-foreground" />
          Prescription Items
        </h3>

        {items?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Instructions</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Repeats</TableHead>
                {user?.role === 'pharmacist' && (
                  <TableHead>Pharmacist Note</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell className="whitespace-normal break-words">
                    {item.medicationId?.name ?? 'Unnamed Medication'}
                  </TableCell>
                  <TableCell className="whitespace-normal break-words">
                    {item.specificInstructions || 'No instructions'}
                  </TableCell>
                  <TableCell>{item.dosage}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.repeats}</Badge>
                  </TableCell>
                  {user?.role === 'pharmacist' && (
                    <TableCell>
                      <textarea
                        className="w-full border rounded px-2 py-1 text-sm"
                        placeholder="Note..."
                        value={itemNotes[item._id] || ''}
                        onChange={(e) =>
                          setItemNotes((prev) => ({
                            ...prev,
                            [item._id]: e.target.value,
                          }))
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground">No medications found.</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-2 md:col-span-2">
        {user?.role === 'doctor' && (
          <>
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="w-full sm:w-auto"
            >
              Delete Prescription
            </Button>
            <Button
              onClick={() =>
                navigate({
                  to: `/dashboard/prescriptions/${prescriptionId}/edit`,
                })
              }
              className="w-full sm:w-auto"
            >
              Edit Prescription
            </Button>
          </>
        )}

        {isChanged && user?.role === 'pharmacist' && (
          <Button
            onClick={handlePharmacistUpdate}
            disabled={updateMutation.isPending}
            className="ml-auto"
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </div>
    </div>
  );
}
