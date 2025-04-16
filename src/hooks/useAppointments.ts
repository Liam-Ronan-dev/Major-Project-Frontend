import { useQuery } from '@tanstack/react-query';
import { getAppointments, getAppointmentById } from '@/lib/api';
import { useAuth } from './useAuth';

export const useAppointments = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
    enabled: !!user,
  });
};

export const useAppointmentById = (id: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['appointment', id],
    queryFn: () => getAppointmentById(id),
    enabled: !!user && !!id,
  });
};
