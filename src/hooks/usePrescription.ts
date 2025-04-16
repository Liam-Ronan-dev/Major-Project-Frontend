import { useQuery } from '@tanstack/react-query';
import {
  getPrescriptions,
  getPrescriptionById,
  updatePrescription,
  updatePrescriptionStatus,
  getLatestPrescriptionForPatient,
} from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';

export const usePrescriptions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['prescriptions'],
    queryFn: getPrescriptions,
    enabled: !!user,
  });
};

export const usePrescriptionById = (id: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['prescription', id],
    queryFn: () => getPrescriptionById(id),
    enabled: !!user && !!id,
  });
};

export function useLatestPrescription(patientId?: string) {
  return useQuery({
    queryKey: ['latestPrescription', patientId],
    queryFn: () => getLatestPrescriptionForPatient(patientId!),
    enabled: !!patientId,
  });
}

export const useUpdatePrescription = (id: string) =>
  useMutation({
    mutationFn: (data) => updatePrescription(id, data),
  });

export const useUpdatePrescriptionStatus = (id: string) =>
  useMutation({
    mutationFn: (data: { status?: string; notes?: string }) =>
      updatePrescriptionStatus(id, data),
  });
