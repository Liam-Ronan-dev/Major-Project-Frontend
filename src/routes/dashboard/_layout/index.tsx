import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';

import data from '../../../app/dashboard/data.json';

export const Route = createFileRoute('/dashboard/_layout/')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-8 md:py-6">
          <SectionCards />
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
