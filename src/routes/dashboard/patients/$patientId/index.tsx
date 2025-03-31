import { createFileRoute } from '@tanstack/react-router';
import { usePatientById } from '@/hooks/usePatients';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { deletePatient } from '@/lib/api';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

export const Route = createFileRoute('/dashboard/patients/$patientId/')({
  component: PatientDetailPage,
});

function PatientDetailPage() {
  const { user } = useContext(AuthContext);
  const { patientId } = Route.useParams();
  const { data, isLoading, isError } = usePatientById(patientId);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deletePatient(patientId);
      toast.success('Patient deleted successfully');
      navigate({ to: '/dashboard/patients' });
    } catch (err) {
      toast.error('Failed to delete patient');
      console.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">Failed to load patient details.</div>
    );
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    gender,
    address,
    emergencyContact,
    medicalHistory,
    prescriptions,
    appointments,
    createdAt,
  } = data;

  return (
    <>
      <h2 className="text-2xl font-bold ml-5 p-2 mt-4">
        {firstName} {lastName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* General Info */}
        <div className="rounded-lg border p-4 space-y-2">
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phoneNumber}
          </p>
          <p>
            <strong>DOB:</strong> {new Date(dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
          <p>
            <strong>Registered:</strong>{' '}
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Address */}
        <div className="rounded-lg border p-4 space-y-2">
          <h2 className="font-semibold text-lg mb-2">Address</h2>
          <p>{address.street}</p>
          <p>
            {address.city}, {address.postalCode}
          </p>
          <p>{address.country}</p>
        </div>

        {/* Emergency Contact */}
        <div className="rounded-lg border p-4 space-y-2">
          <h2 className="font-semibold text-lg mb-2">Emergency Contact</h2>
          <p>
            <strong>Name:</strong> {emergencyContact.name}
          </p>
          <p>
            <strong>Relationship:</strong> {emergencyContact.relationship}
          </p>
          <p>
            <strong>Phone:</strong> {emergencyContact.phoneNumber}
          </p>
        </div>

        {/* Medical History */}
        <div className="rounded-lg border p-4 space-y-2 md:col-span-3">
          <h2 className="font-semibold text-lg mb-4">Medical History</h2>

          {medicalHistory?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <strong>Condition</strong>
                  </TableHead>
                  <TableHead>
                    <strong>Diagnosed At</strong>
                  </TableHead>
                  <TableHead>
                    <strong>Notes</strong>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalHistory.map((entry) => (
                  <TableRow key={entry._id}>
                    <TableCell>{entry.condition}</TableCell>
                    <TableCell>
                      {new Date(entry.diagnosedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{entry.notes || 'No notes'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">
              No medical history available.
            </p>
          )}
        </div>

        {/* Prescriptions */}
        <div className="rounded-lg border p-4 space-y-2 md:col-span-3">
          <h2 className="font-semibold text-lg mb-4">Prescriptions</h2>

          {prescriptions?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <strong>Pharmacy</strong>
                  </TableHead>
                  <TableHead>
                    <strong>Pharmacist ID</strong>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptions.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>{p.pharmacyName}</TableCell>
                    <TableCell>{p.pharmacistId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No prescriptions found.</p>
          )}
        </div>

        {/* Appointments */}
        <div className="rounded-lg border p-4 space-y-2 md:col-span-3">
          <h2 className="font-semibold text-lg mb-4">Appointments</h2>

          {appointments?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <strong>Date</strong>
                  </TableHead>
                  <TableHead>
                    <strong>Status</strong>
                  </TableHead>
                  <TableHead>
                    <strong>Notes</strong>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment._id}>
                    <TableCell>
                      {new Date(appointment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{appointment.status}</TableCell>
                    <TableCell>{appointment.notes || 'No notes'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No appointments found.</p>
          )}
        </div>

        {user?.role === 'doctor' && (
          <div className="flex gap-4 md:col-span-2">
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="w-full sm:w-auto font-semibold mb-4 sm:mb-4 sm:mr-5 cursor-pointer"
            >
              Delete Patient
            </Button>
            <Button
              onClick={() =>
                navigate({
                  to: `/dashboard/patients/${patientId}/edit`,
                })
              }
              className="mw-full sm:w-auto font-semibold mb-4 sm:mb-4 sm:mr-5 cursor-pointer"
            >
              Edit Patient
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
