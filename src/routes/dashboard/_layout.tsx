import { createFileRoute, Outlet } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export const Route = createFileRoute('/dashboard/_layout')({
  component: dashboardLayout,
});

function dashboardLayout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
