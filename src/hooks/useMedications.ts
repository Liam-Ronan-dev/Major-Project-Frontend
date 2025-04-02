import { useQuery } from '@tanstack/react-query';
import { getMedicationById, getMedications } from '@/lib/api';

export const useMedications = () => {
  return useQuery({
    queryKey: ['medications'],
    queryFn: getMedications,
  });
};

export const useMedicationById = (id: string) => {
  return useQuery({
    queryKey: ['medication', id],
    queryFn: () => getMedicationById(id),
    enabled: !!id,
  });
};
