import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ModeToggle } from '@/components/mode-toggle';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      <div className="p-4 flex justify-between items-center">
        <ModeToggle />
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
