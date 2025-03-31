import { useQuery } from '@tanstack/react-query';
import { getAppointments, getAppointmentById } from '@/lib/api';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const useAppointments = () => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
    enabled: !!user,
  });
};

export const useAppointmentById = (id: string) => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['appointment', id],
    queryFn: () => getAppointmentById(id),
    enabled: !!user && !!id,
  });
};
