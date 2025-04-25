import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  usePrescriptions,
  usePrescriptionById,
  useLatestPrescription,
  useUpdatePrescription,
  useUpdatePrescriptionStatus,
} from '../../../src/hooks/usePrescription';
import {
  getPrescriptions,
  getPrescriptionById,
  getLatestPrescriptionForPatient,
  updatePrescription,
  updatePrescriptionStatus,
} from '../../../src/lib/api';
import React from 'react';

// Mock API
vi.mock('../../../src/lib/api', () => ({
  getPrescriptions: vi.fn(),
  getPrescriptionById: vi.fn(),
  getLatestPrescriptionForPatient: vi.fn(),
  updatePrescription: vi.fn(),
  updatePrescriptionStatus: vi.fn(),
}));

// Mock Auth
vi.mock('../../../src/hooks/useAuth', () => ({
  useAuth: () => ({ user: { _id: 'user123', role: 'doctor' } }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePrescriptions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches prescriptions when user is authenticated', async () => {
    (getPrescriptions as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      [
        { _id: '1', status: 'Assigned' },
        { _id: '2', status: 'Pending' },
      ]
    );

    const { result } = renderHook(() => usePrescriptions(), { wrapper });

    expect(getPrescriptions).toHaveBeenCalled();
  });

  it('handles loading state', async () => {
    (getPrescriptions as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      []
    );

    const { result } = renderHook(() => usePrescriptions(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('fetches a prescription by ID', async () => {
    (
      getPrescriptionById as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({
      _id: 'presc123',
      status: 'Pending',
    });

    const { result } = renderHook(() => usePrescriptionById('presc123'), {
      wrapper,
    });

    expect(getPrescriptionById).toHaveBeenCalledWith('presc123');
  });

  it('fetches latest prescription by patient ID', async () => {
    (
      getLatestPrescriptionForPatient as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({
      _id: 'latest123',
      status: 'Processed',
    });

    const { result } = renderHook(() => useLatestPrescription('patient456'), {
      wrapper,
    });

    expect(getLatestPrescriptionForPatient).toHaveBeenCalledWith('patient456');
  });

  it('calls updatePrescription with correct data', async () => {
    (
      updatePrescription as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({ updated: true });

    const { result } = renderHook(() => useUpdatePrescription('presc789'), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutateAsync({ status: 'Updated' });
    });

    expect(updatePrescription).toHaveBeenCalledWith('presc789', {
      status: 'Updated',
    });
  });

  it('calls updatePrescriptionStatus correctly', async () => {
    (
      updatePrescriptionStatus as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({ updated: true });

    const { result } = renderHook(
      () => useUpdatePrescriptionStatus('presc321'),
      { wrapper }
    );

    await act(async () => {
      await result.current.mutateAsync({
        status: 'Pending',
        notes: 'Clarify dose',
      });
    });

    expect(updatePrescriptionStatus).toHaveBeenCalledWith('presc321', {
      status: 'Pending',
      notes: 'Clarify dose',
    });
  });
});
