import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/lib/api';

export type User = {
  _id: string;
  email: string;
  role: 'doctor' | 'pharmacist';
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
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Block app rendering until we know the user state
  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading user...</p>
      </div>
    );
  }

  // Optional: handle error
  // if (isError) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-red-500">Failed to load user session.</p>
  //     </div>
  //   );
  // }

  return (
    <AuthContext.Provider
      value={{ user, isLoading: false, refetchUser: refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
