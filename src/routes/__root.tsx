import { createRootRoute, Outlet, useMatchRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { ModeToggle } from '@/components/mode-toggle';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const matchRoute = useMatchRoute();

  // Check if the current route starts with /dashboard
  const isDashboardRoute = matchRoute({ to: '/dashboard', fuzzy: true });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      {isDashboardRoute ? (
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <main className="flex-1">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      ) : (
        <>
          <div className="flex justify-end p-5">
            <ModeToggle />
          </div>
          <Outlet />
        </>
      )}
      <TanStackRouterDevtools />
    </div>
  );
}
