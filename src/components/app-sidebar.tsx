import * as React from 'react';
import { useContext } from 'react';
import { IconInnerShadowTop } from '@tabler/icons-react';

import {
  Home,
  Users,
  ClipboardList,
  Package,
  Pill,
  Settings2,
  ClipboardCheck,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { AuthContext } from '@/contexts/AuthContext';
import { extractNameFromEmail } from '@/helpers/ExtractEmail';

const commonNav = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Settings', url: '/settings', icon: Settings2 },
];

const doctorNav = [
  { title: 'Prescriptions', url: '/prescriptions', icon: ClipboardCheck },
  { title: 'Patients', url: '/patients', icon: Users },
  { title: 'Appointments', url: '/appointments', icon: ClipboardList },
];

const pharmacistNav = [
  { title: 'Orders', url: '/orders', icon: Package },
  { title: 'Medications', url: '/medications', icon: Pill },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useContext(AuthContext);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">PharmaLink</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={commonNav} />
        {user?.role === 'doctor' && <NavMain items={doctorNav} />}
        {user?.role === 'pharmacist' && <NavMain items={pharmacistNav} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: extractNameFromEmail(user?.email || ''),
            email: user?.email,
            avatar: 'https://github.com/shadcn.png',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
