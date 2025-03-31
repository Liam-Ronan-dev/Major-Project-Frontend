import { useQuery } from '@tanstack/react-query';
import { getMedications } from '@/lib/api';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const useMedications = () => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['medications'],
    queryFn: getMedications,
    enabled: !!user,
  });
};
