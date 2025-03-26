import { AuthContext } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { logout } from '@/lib/api';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { IconLogout } from '@tabler/icons-react';
import { extractNameFromEmail } from '@/helpers/ExtractEmail';

export function SiteHeader() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      // clears the user in context
      navigate({ to: '/login' });
      console.log(user);
    }
  };

  return (
    <header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <h1 className="text-base font-light">
            Welcome Back {extractNameFromEmail(user.email)}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2 p-5">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Log out"
          >
            <IconLogout className="size-6 ml-1" />
          </Button>
        </div>
      </div>
    </header>
  );
}
