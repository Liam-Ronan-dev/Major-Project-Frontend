import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ModeToggle } from '@/components/mode-toggle';

export const Route = createRootRoute({
  component: () => (
    <div className="h-dvh w-full overflow-hidden bg-gray-100 dark:bg-black text-black dark:text-white flex flex-col">
      <div className="flex justify-end p-5">
        <ModeToggle />
      </div>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  ),
});
