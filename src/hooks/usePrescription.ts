import { useQuery } from '@tanstack/react-query';
import { getPrescriptions, getPrescriptionById } from '@/lib/api';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const usePrescriptions = () => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['prescriptions'],
    queryFn: getPrescriptions,
    enabled: !!user,
  });
};

export const usePrescriptionById = (id: string) => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['prescription', id],
    queryFn: () => getPrescriptionById(id),
    enabled: !!user && !!id,
  });
};
