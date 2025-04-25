import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuth } from '../../../src/hooks/useAuth';
import { AuthContext } from '../../../src/contexts/AuthContext';
import React from 'react';

describe('useAuth', () => {
  // Checks that useAuth works correctly when the context is provided
  it('returns context value when inside AuthProvider', () => {
    const mockAuthContext = {
      user: { _id: 'user123', email: 'test@example.com', role: 'doctor' },
      isLoading: false,
      refetchUser: vi.fn(),
    };

    // Create a wrapper that provides the context to anything rendered inside.
    // renderHook needs this wrapper because useAuth expects to find a AuthContext.
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>
        {children}
      </AuthContext.Provider>
    );

    // run the useAuth hook inside the test, using the wrapper.
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user?.email).toBe('test@example.com');
    expect(result.current.user?.role).toBe('doctor');
    expect(result.current.isLoading).toBe(false);
  });

  it('throws an error if used outside AuthProvider', () => {
    const renderWithoutProvider = () => renderHook(() => useAuth());

    expect(renderWithoutProvider).toThrowError(
      'useAuth must be used within an AuthProvider'
    );
  });
});
