import { createContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/lib/api';

type User = {
  id: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => void;
};

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // Optional: 5 minutes caching
  });

  // Optional: Log user + cookie state for debugging
  useEffect(() => {
    console.log('🔐 AuthContext user:', user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, refetchUser: refetch }}>
      {children}
    </AuthContext.Provider>
  );
};
