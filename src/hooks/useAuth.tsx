import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { id: string; email: string; role: string } | null;
  login: (userData: { id: string; email: string; role: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const login = (userData: AuthContextType['user']) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user in local storage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
