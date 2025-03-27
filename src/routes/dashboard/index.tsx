// import { createFileRoute } from '@tanstack/react-router';
// // import { DataTable } from '@/components/data-table';
// import { SectionCards } from '@/components/section-cards';
// import { ChartAreaInteractive } from '@/components/chart-area-interactive';
// import { useQuery } from '@tanstack/react-query';
// import { useContext } from 'react';
// import { getPrescriptions } from '@/lib/api';
// import { AuthContext } from '@/contexts/AuthContext';
// import { prescriptionColumns } from '@/columns/prescription';

// export const Route = createFileRoute('/dashboard/')({
//   component: DashboardOverview,
// });

// function DashboardOverview() {
//   const { user } = useContext(AuthContext);
//   console.log(user);
//   const {
//     data: prescriptionsResponse,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ['prescriptions'],
//     queryFn: getPrescriptions,
//     enabled: !!user,
//   });

//   // const prescriptions = prescriptionsResponse || [];

//   // const filteredData = prescriptions.filter((prescription) => {
//   //   const doctorId = prescription.doctorId?._id;
//   //   const pharmacistId = prescription.pharmacistId?._id;

//   //   if (user?.role === 'doctor') return doctorId === user._id;
//   //   if (user?.role === 'pharmacist') return pharmacistId === user._id;

//   //   return false;
//   // });

//   // const transformedData = filteredData.map((p) => ({
//   //   id: p._id,
//   //   header: p.pharmacyName,
//   //   type: 'Prescription',
//   //   status: p.status,
//   //   target: p.repeats.toString(),
//   //   limit: new Date(p.createdAt).toLocaleDateString(),
//   //   reviewer: p.patientId.firstName + ' ' + p.patientId.lastName,
//   // }));

//   return (
//     <div className="flex flex-1 flex-col">
//       <div className="@container/main flex flex-1 flex-col gap-2">
//         <div className="flex flex-col gap-4 py-4 md:gap-8 md:py-6">
//           <SectionCards />
//           <div className="px-4 lg:px-6">
//             <ChartAreaInteractive />
//           </div>
//           {isLoading ? (
//             <p className="text-center">Loading prescriptions...</p>
//           ) : isError ? (
//             <p className="text-center text-red-500">
//               Failed to load prescriptions.
//             </p>
//           ) : (
//             <DataTable data={transformedData} columns={prescriptionColumns} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
