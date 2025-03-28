import { useQuery } from '@tanstack/react-query';
import { getPharmacists } from '@/lib/api';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const usePharmacists = () => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['pharmacists'],
    queryFn: getPharmacists,
    enabled: !!user,
  });
};
