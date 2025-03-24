import { useContext } from 'react';
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
  SidebarRail,
} from '@/components/ui/sidebar';
import { AuthContext } from '@/contexts/AuthContext';

function extractNameFromEmail(email: string) {
  const name = email?.split('@')[0];
  return name?.charAt(0).toUpperCase() + name?.slice(1);
}

export function AppSidebar({ ...props }) {
  const { user } = useContext(AuthContext);

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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="gap-1 p-3">
        <h1 className="text-4xl font-extrabold">PharmaLink</h1>
        <p className="text-sm font-light">{user?.role}</p>
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
            avatar: '/avatars/shadcn.jpg',
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
