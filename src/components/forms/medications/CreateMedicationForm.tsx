import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMedication } from '@/lib/api';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from '@tanstack/react-router';
import {
  MedicationFormData,
  medicationSchema,
} from '@/validations/medicationSchema';

export function CreateMedicationForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
  });

  const createMutation = useMutation({
    mutationFn: createMedication,
    onSuccess: () => {
      toast.success('Medication created!');
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      navigate({ to: '/dashboard/Medications' });
    },
    onError: () => {
      toast.error('Failed to create Medication.');
    },
  });

  const onSubmit = (data: MedicationFormData) => {
    createMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <Input placeholder="e.g. Paracetamol" {...register('name')} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Form</label>
        <Input
          placeholder="e.g. Tablet, Capsule, Syrup"
          {...register('form')}
        />
        {errors.form && (
          <p className="text-sm text-red-500">{errors.form.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Stock</label>
        <Input type="number" placeholder="e.g. 100" {...register('stock')} />
        {errors.stock && (
          <p className="text-sm text-red-500">{errors.stock.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Supplier</label>
        <Input placeholder="e.g. MedsInc" {...register('supplier')} />
        {errors.supplier && (
          <p className="text-sm text-red-500">{errors.supplier.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Price (€)</label>
        <Input
          type="number"
          step="0.01"
          placeholder="e.g. 6.50"
          {...register('price')}
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>

      <Button
        className="font-semibold"
        type="submit"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? 'Submitting...' : 'Create Medication'}
      </Button>
    </form>
  );
}
