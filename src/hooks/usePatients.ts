import { useQuery } from '@tanstack/react-query';
import { getPatients } from '@/lib/api';
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
