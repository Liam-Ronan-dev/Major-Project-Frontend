// import {
//   Home,
//   Users,
//   ClipboardList,
//   Package,
//   Pill,
//   Settings2,
//   ClipboardCheck,
// } from 'lucide-react';
// import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from '@/components/ui/sidebar';

// // user avatar
// const data = {
//   user: {
//     avatar: '/avatars/shadcn.jpg',
//   },
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   // 🔹 Common links for all users
//   const commonNav = [
//     {
//       title: 'Dashboard',
//       url: '/dashboard',
//       icon: Home,
//       isActive: true,
//     },
//     {
//       title: 'Settings',
//       url: '/settings',
//       icon: Settings2,
//     },
//   ];

//   // 🔹 Doctor-specific links
//   const doctorNav = [
//     {
//       title: 'Prescriptions',
//       url: '/prescriptions',
//       icon: ClipboardCheck,
//     },
//     {
//       title: 'Patients',
//       url: '/patients',
//       icon: Users,
//     },
//     {
//       title: 'Appointments',
//       url: '/appointments',
//       icon: ClipboardList,
//     },
//   ];

//   // 🔹 Pharmacist-specific links
//   const pharmacistNav = [
//     {
//       title: 'Orders',
//       url: '/orders',
//       icon: Package,
//     },
//     {
//       title: 'Medications',
//       url: '/medications',
//       icon: Pill,
//     },
//   ];

//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader className="gap-1 p-3">
//         <h1 className="text-4xl font-extrabold lg:text-4xl">PharmaLink</h1>
//       </SidebarHeader>
//       <SidebarContent>
//         {/* 🔹 Show Common Links */}
//         <NavMain items={commonNav} />

//         {/* 🔹 Show Role-Specific Links */}
//         {/* {user.role === 'doctor' && <NavMain items={doctorNav} />}
//         {user.role === 'pharmacist' && <NavMain items={pharmacistNav} />} */}
//       </SidebarContent>
//       <SidebarFooter>
//         {/* ✅ User Info with Extracted Name */}
//         {/* <NavUser
//           // user={{
//           //   name: user.name,
//           //   email: user.email,
//           //   avatar: data.user.avatar,
//           // }}
//         /> */}
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }
