import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePatients, usePatientById } from '../../../src/hooks/usePatients';
import { getPatients, getPatientById } from '../../../src/lib/api';
import React from 'react';

// Mock API calls
vi.mock('../../../src/lib/api', () => ({
  getPatients: vi.fn(),
  getPatientById: vi.fn(),
}));

// Mock Auth (simulate user logged in)
vi.mock('../../../src/hooks/useAuth', () => ({
  useAuth: () => ({ user: { _id: 'user123', role: 'doctor' } }),
}));

// Wrapper to provide React Query context
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePatients', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches patients when user is authenticated', async () => {
    (getPatients as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      { _id: '1', name: 'John Doe' },
      { _id: '2', name: 'Jane Doe' },
    ]);

    const { result } = renderHook(() => usePatients(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual([
        { _id: '1', name: 'John Doe' },
        { _id: '2', name: 'Jane Doe' },
      ]);
    });
  });

  it('handles loading state', async () => {
    (getPatients as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const { result } = renderHook(() => usePatients(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('fetches patient by ID', async () => {
    (getPatientById as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      _id: 'patient123',
      name: 'John Smith',
    });

    const { result } = renderHook(() => usePatientById('patient123'), {
      wrapper,
    });

    await waitFor(() => {
      expect(getPatientById).toHaveBeenCalledWith('patient123');
    });

    expect(result.current.data._id).toBe('patient123');
    expect(result.current.data.name).toBe('John Smith');
  });
});
