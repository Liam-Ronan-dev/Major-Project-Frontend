import * as React from 'react';
import { useContext } from 'react';
import { IconInnerShadowTop } from '@tabler/icons-react';

import {
  Home,
  Users,
  ClipboardList,
  PlusCircleIcon,
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
import { Link } from '@tanstack/react-router';

const commonNav = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Settings', url: '/settings', icon: Settings2 },
];

const doctorNav = [
  {
    title: 'Prescriptions',
    url: '/dashboard/prescriptions',
    icon: ClipboardCheck,
  },
  { title: 'Patients', url: '/dashboard/patients', icon: Users },
  {
    title: 'Appointments',
    url: '/dashboard/appointments',
    icon: ClipboardList,
  },
];

const pharmacistNav = [
  {
    title: 'Prescriptions',
    url: '/dashboard/prescriptions',
    icon: ClipboardCheck,
  },
  { title: 'Patients', url: '/dashboard/patients', icon: Users },
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
              className="data-[slot=sidebar-menu-button]:!p-1.5 mt-3"
            >
              <Link to="/dashboard/">
                <IconInnerShadowTop className="!size-7" />
                <span className="text-2xl font-semibold">PharmaLink</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <p className="p-1.5 text-left mb-10 ml-3 leading-3 [&:not(:first-child)]">
        {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
      </p>
      <SidebarContent>
        {user?.role === 'doctor' && (
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="min-w-4 w-3/4 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground mx-3 cursor-pointer"
              >
                <PlusCircleIcon />
                <Link to="/dashboard/prescriptions/create">
                  {' '}
                  <span className="font-semibold">Quick Prescription</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
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
