import { useQuery } from '@tanstack/react-query';
import { getPrescriptions } from '@/lib/api';
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
