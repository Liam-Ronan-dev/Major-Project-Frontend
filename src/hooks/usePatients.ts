import { useQuery } from '@tanstack/react-query';
import { getPatients, getPatientById } from '@/lib/api';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const usePatients = () => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
    enabled: !!user,
  });
};

export const usePatientById = (id: string) => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => getPatientById(id),
    enabled: !!user && !!id,
  });
};
