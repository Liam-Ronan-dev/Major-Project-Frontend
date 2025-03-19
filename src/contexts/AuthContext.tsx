// // import { createContext, useContext, useEffect, useState } from 'react';
// // import { useNavigate } from '@tanstack/react-router';

// type AuthContextType = {
//   user: { email: string; role: string } | null;
//   accessToken: string | null;
//   login: (token: string, user: { email: string; role: string }) => void;
//   logout: () => void;
// };

// // const BASE_API_URL = import.meta.env.VITE_HEALTH_SERVICE_BASE_API;

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<{ email: string; role: string } | null>(
//     null
//   );
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   //   const navigate = useNavigate();

//   // ✅ Load user & token from sessionStorage on first render
// //   useEffect(() => {
// //     async function refreshAccessToken() {
// //       try {
// //         const response = await fetch(`${BASE_API_URL}/auth/refresh`, {
// //           method: 'POST',
// //           credentials: 'include', // Sends the refreshToken cookie
// //         });

// //         if (!response.ok) {
// //           //logout();
// //           return;
// //         }

// //         const data = await response.json();
// //         login(data.accessToken, {
// //           email: data.user.email,
// //           role: data.user.role,
// //         });

// //         // ✅ Store the refreshed token in sessionStorage
// //         sessionStorage.setItem('accessToken', data.accessToken);
// //       } catch (error) {
// //         console.error('Token refresh failed:', error);
// //         //logout();
// //       }
// //     }

// //     // if (!accessToken) {
// //     //   refreshAccessToken(); // Fetch a new access token when app loads
// //     // }
// //   }, [accessToken]);

//   // ✅ Login function - store token in memory & sessionStorage
//   const login = (token: string, userData: { email: string; role: string }) => {
//     setUser(userData);
//     setAccessToken(token);
//     sessionStorage.setItem('user', JSON.stringify(userData));
//     sessionStorage.setItem('accessToken', token);
//   };

//   // ✅ Logout function - clear everything
//   //   const logout = async () => {
//   //     try {
//   //       await fetch(`${BASE_API_URL}/auth/logout`, {
//   //         method: 'POST',
//   //         credentials: 'include', // Sends cookies
//   //       });
//   //     } catch (error) {
//   //       console.error('Logout error:', error);
//   //     }

//   //     setUser(null);
//   //     setAccessToken(null);
//   //     sessionStorage.removeItem('user');
//   //     sessionStorage.removeItem('accessToken');

//   //     navigate({ to: 'Login' });
//   //   };

//   return (
//     <AuthContext.Provider value={{ user, accessToken, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // ✅ Custom hook to use Auth Context
// // export function useAuth() {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // }
