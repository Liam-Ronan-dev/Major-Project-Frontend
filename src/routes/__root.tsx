import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
