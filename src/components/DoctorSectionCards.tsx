import { useEffect, useState } from 'react';
import {
  IconCalendarEvent,
  IconStethoscope,
  IconUserHeart,
  IconClock,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchUser, getAppointments, getPrescriptions } from '@/lib/api';

export function DoctorSectionCards() {
  const [metrics, setMetrics] = useState({
    appointments: 0,
    prescriptions: 0,
    patients: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUser();
        const [appointments, prescriptions] = await Promise.all([
          getAppointments(),
          getPrescriptions(),
        ]);

        if (!user || user.role !== 'doctor') return;

        const doctorAppointments = appointments.filter(
          (a) => a.doctorId?._id === user._id && new Date(a.date) > new Date()
        );

        const doctorPrescriptions = prescriptions.filter(
          (p) => p.doctorId?._id === user._id
        );

        const uniquePatients = new Set(
          doctorPrescriptions.map((p) => p.patientId?._id)
        );

        const pendingPrescriptions = doctorPrescriptions.filter(
          (p) => p.status === 'Pending'
        );

        setMetrics({
          appointments: doctorAppointments.length,
          prescriptions: doctorPrescriptions.length,
          patients: uniquePatients.size,
          pending: pendingPrescriptions.length,
        });
      } catch (error) {
        console.error('Failed to fetch doctor dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const cardBase =
    '@container/card flex flex-col justify-between transition-shadow hover:shadow-md';

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-4 lg:px-6">
      <Card className={cardBase}>
        <CardHeader>
          <CardDescription>Upcoming Appointments</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {metrics.appointments}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              <IconCalendarEvent className="h-4 w-4" />
              Booked
            </Badge>
          </CardAction>
        </CardHeader>
        <div className="flex justify-between">
          <CardFooter className="text-sm text-muted-foreground">
            Based on future dates
          </CardFooter>
          <Link to={`/dashboard/appointments/`} className="underline mx-8">
            View
          </Link>
        </div>
      </Card>

      <Card className={cardBase}>
        <CardHeader>
          <CardDescription>Total Prescriptions</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {metrics.prescriptions}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              <IconStethoscope className="h-4 w-4" />
              Written
            </Badge>
          </CardAction>
        </CardHeader>
        <div className="flex justify-between">
          <CardFooter className="text-sm text-muted-foreground">
            Since Account Creation
          </CardFooter>
          <Link to={`/dashboard/prescriptions/`} className="underline mx-8">
            View
          </Link>
        </div>
      </Card>

      <Card className={cardBase}>
        <CardHeader>
          <CardDescription>Unique Patients</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {metrics.patients}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              <IconUserHeart className="h-4 w-4" />
              Cared For
            </Badge>
          </CardAction>
        </CardHeader>
        <div className="flex justify-between">
          <CardFooter className="text-sm text-muted-foreground">
            Based on Prescriptions written
          </CardFooter>
          <Link to={`/dashboard/patients/`} className="underline mx-8">
            View
          </Link>
        </div>
      </Card>

      <Card className={cardBase}>
        <CardHeader>
          <CardDescription>Pending Prescriptions</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {metrics.pending}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              <IconClock className="h-4 w-4" />
              Awaiting Review
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Pharmacist response pending
        </CardFooter>
      </Card>
    </div>
  );
}
