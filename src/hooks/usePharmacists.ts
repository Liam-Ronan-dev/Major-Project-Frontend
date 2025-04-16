import { useQuery } from '@tanstack/react-query';
import { getPharmacists } from '@/lib/api';
import { useAuth } from './useAuth';

export const usePharmacists = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['pharmacists'],
    queryFn: getPharmacists,
    enabled: !!user,
  });
};
