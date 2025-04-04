// hooks/useMedicationSearch.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useMedicationSearch(query: string) {
  return useQuery({
    queryKey: ['medications-search', query],
    enabled: query.length >= 2,
    queryFn: async () => {
      console.log('Searching for:', query);
      const res = await api.get('/medications/search', {
        params: { name: query },
      });

      return res.data.data;
    },
  });
}
