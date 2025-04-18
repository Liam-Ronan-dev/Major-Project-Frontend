import { createFileRoute } from '@tanstack/react-router';
import { CreatePatientForm } from '@/components/forms/patients/CreatePatientForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/dashboard/patients/create')({
  component: CreatePatient,
});

function CreatePatient() {
  return (
    <div className="min-h-11/12 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Add New Patient</CardTitle>
        </CardHeader>
        <CardContent>
          <CreatePatientForm />
        </CardContent>
      </Card>
    </div>
  );
}
