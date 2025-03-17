import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

// ✅ Define the route as a layout
export const Route = createFileRoute('/dashboard/page')({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* 🔹 This renders sub-routes like `/dashboard/patients` */}
      </div>
    </div>
  );
}
