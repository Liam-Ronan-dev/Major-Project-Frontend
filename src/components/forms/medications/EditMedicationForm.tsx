'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  medicationSchema,
  MedicationFormData,
} from '@/validations/medicationSchema';
import { updateMedication } from '@/lib/api';

type Props = {
  medication: {
    _id: string;
    name: string;
    form: string;
    stock: number;
    supplier: string;
    price: number;
  };
};

export function EditMedicationForm({ medication }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: MedicationFormData) =>
      updateMedication(medication._id, data),
    onSuccess: () => {
      toast.success('Medication updated!');
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      navigate({ to: '/dashboard/medications' });
    },
    onError: () => {
      toast.error('Failed to update medication.');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
  });

  useEffect(() => {
    if (medication) {
      reset({
        name: medication.name,
        form: medication.form,
        stock: medication.stock,
        supplier: medication.supplier,
        price: medication.price,
      });
    }
  }, [medication, reset]);

  const onSubmit = (data: MedicationFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <Input {...register('name')} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Form</label>
        <Input {...register('form')} />
        {errors.form && (
          <p className="text-sm text-red-500">{errors.form.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Stock</label>
        <Input type="number" {...register('stock')} />
        {errors.stock && (
          <p className="text-sm text-red-500">{errors.stock.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Supplier</label>
        <Input {...register('supplier')} />
        {errors.supplier && (
          <p className="text-sm text-red-500">{errors.supplier.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Price (€)</label>
        <Input type="number" step="0.01" {...register('price')} />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="font-semibold"
        disabled={updateMutation.isPending}
      >
        {updateMutation.isPending ? 'Updating...' : 'Update Medication'}
      </Button>
    </form>
  );
}
