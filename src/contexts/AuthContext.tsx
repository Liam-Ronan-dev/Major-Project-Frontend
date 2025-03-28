import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/lib/api';

type User = {
  _id: string;
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
    enabled: false,
    retry: false,
  });

  return (
    <AuthContext.Provider value={{ user, isLoading, refetchUser: refetch }}>
      {children}
    </AuthContext.Provider>
  );
};
