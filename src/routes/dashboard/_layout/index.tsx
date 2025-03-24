import { createFileRoute } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const Route = createFileRoute('/dashboard/_layout/')({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not authenticated</div>;

  return (
    <div className="ml-20">
      <h1 className="text-3xl font-bold">
        Welcome back, {user.email.split('@')[0]}
      </h1>

      {/* Common Dashboard Content */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold">Prescriptions</h2>
        <p className="text-muted-foreground">View and manage prescriptions.</p>
        {/* Render prescriptions chart or table here */}
      </section>

      {/* Role-specific Content */}
      {user.role === 'doctor' && (
        <section>
          <h2 className="text-xl font-semibold">Doctor Tools</h2>
          <p className="text-muted-foreground">
            Access patients and appointments.
          </p>
          {/* Add doctor-specific components */}
        </section>
      )}

      {user.role === 'pharmacist' && (
        <section>
          <h2 className="text-xl font-semibold">Pharmacy Tools</h2>
          <p className="text-muted-foreground">
            Manage orders and medications.
          </p>
          {/* Add pharmacist-specific components */}
        </section>
      )}
    </div>
  );
}
