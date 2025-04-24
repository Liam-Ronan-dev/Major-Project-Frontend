import { createFileRoute } from '@tanstack/react-router';
import { useAppointmentById } from '@/hooks/useAppointments';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { deleteAppointment } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import {
  Calendar,
  StickyNote,
  CheckCircle,
  User,
  Mail,
  Phone,
} from 'lucide-react';

export const Route = createFileRoute('/dashboard/appointments/$appointmentId/')(
  {
    component: AppointmentDetailPage,
  }
);

function AppointmentDetailPage() {
  const { appointmentId } = Route.useParams();
  const { data, isError, isLoading } = useAppointmentById(appointmentId);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteAppointment(appointmentId);
      toast.success('Appointment deleted successfully');
      navigate({ to: '/dashboard/appointments' });
    } catch (err) {
      toast.error('Failed to delete appointment');
      console.error(err.message);
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
        Failed to load appointment details.
      </div>
    );
  }

  const { patientId, status, date, notes, createdAt } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="rounded-2xl border bg-muted/5 p-5 space-y-5 shadow-sm">
        <h2 className="font-semibold mb-2 text-lg flex items-center gap-2 text-primary">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          Appointment Details
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle className="w-4 h-4" />
          <span className="text-primary">
            <strong>Status:</strong> {status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-primary">
            <strong>Scheduled For:</strong>{' '}
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-primary">
            <strong>Created At:</strong>{' '}
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <StickyNote className="w-4 h-4 mt-0.5" />
          <span className="text-primary">
            <strong>Notes:</strong> {notes || 'No notes provided.'}
          </span>
        </div>
      </div>

      {/* Patient Info */}
      <div className="rounded-2xl border bg-muted/5 p-5 space-y-5 shadow-sm">
        <h2 className="font-semibold mb-2 text-lg flex items-center gap-2 text-primary">
          <User className="w-4 h-4 text-muted-foreground" />
          Patient Information
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <Link to={`/dashboard/patients/${patientId._id}`}>
            <span className="text-primary font-semibold underline">
              {patientId?.firstName} {patientId?.lastName}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span className="text-primary">{patientId?.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4" />
          <span className="text-primary">
            {patientId?.phoneNumber || 'N/A'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-5 mt-2 md:col-span-2">
        <Button
          onClick={handleDelete}
          variant="destructive"
          className="w-full sm:w-auto font-semibold cursor-pointer px-8"
        >
          Delete
        </Button>
        <Button
          onClick={() =>
            navigate({
              to: `/dashboard/appointments/${appointmentId}/edit`,
            })
          }
          className="mw-full sm:w-auto font-semibold cursor-pointer px-8"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
