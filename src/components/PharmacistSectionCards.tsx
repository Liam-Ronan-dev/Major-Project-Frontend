import { useEffect, useState } from 'react';
import { IconClipboardList, IconCheck, IconClock } from '@tabler/icons-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPrescriptions, fetchUser } from '@/lib/api';

export function SectionCards() {
  const [counts, setCounts] = useState({
    assigned: 0,
    pending: 0,
    processed: 0,
  });

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const user = await fetchUser();
        const prescriptions = await getPrescriptions();

        if (!user || user.role !== 'pharmacist') return;

        const pharmacistPrescriptions = prescriptions.filter(
          (p) => p.pharmacistId?._id === user._id
        );

        const assigned = pharmacistPrescriptions.filter(
          (p) => p.status === 'Assigned'
        ).length;
        const pending = pharmacistPrescriptions.filter(
          (p) => p.status === 'Pending'
        ).length;
        const processed = pharmacistPrescriptions.filter(
          (p) => p.status === 'Processed'
        ).length;

        setCounts({ assigned, pending, processed });
      } catch (error) {
        console.error('Failed to load prescription data:', error);
      }
    };

    fetchAndFilter();
  }, []);

  const cardBase =
    '@container/card flex flex-col justify-between transition-shadow duration-300 hover:shadow-md';

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-3 lg:px-6">
      <Card className={cardBase}>
        <CardHeader>
          <h1 className="font-semibold">Prescriptions</h1>
          <CardDescription className="text-muted-foreground">
            Assigned
          </CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {counts.assigned}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              <IconClipboardList className="h-4 w-4" />
              In Queue
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Awaiting pharmacist action
        </CardFooter>
      </Card>

      <Card className={cardBase}>
        <CardHeader>
          <h1 className="font-semibold">Prescriptions</h1>

          <CardDescription className="text-muted-foreground">
            Pending
          </CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {counts.pending}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              <IconClock className="h-4 w-4" />
              Review Needed
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Requires clarification from doctor
        </CardFooter>
      </Card>

      <Card className={cardBase}>
        <CardHeader>
          <h1 className="font-semibold">Prescriptions</h1>
          <CardDescription className="text-muted-foreground">
            Processed
          </CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {counts.processed}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              <IconCheck className="h-4 w-4" />
              Complete
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Finalized and fulfilled
        </CardFooter>
      </Card>
    </div>
  );
}
