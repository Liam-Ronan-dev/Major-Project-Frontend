import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/lib/api';

// ✅ Define User Type
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

// ✅ Create AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// ✅ Auth Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const shouldFetchUser = document.cookie.includes('accessToken');

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser, // ✅ Uses fetchUser from api.ts
    enabled: shouldFetchUser,
    retry: false, // Don't retry on failure (user not logged in)
  });

  return (
    <AuthContext.Provider value={{ user, isLoading, refetchUser: refetch }}>
      {children}
    </AuthContext.Provider>
  );
};
