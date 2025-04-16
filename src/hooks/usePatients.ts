import { useQuery } from '@tanstack/react-query';
import { getPatients, getPatientById } from '@/lib/api';
import { useAuth } from './useAuth';

export const usePatients = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
    enabled: !!user,
  });
};

export const usePatientById = (id: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => getPatientById(id),
    enabled: !!user && !!id,
  });
};
