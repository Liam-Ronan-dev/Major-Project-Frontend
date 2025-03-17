import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import {
  RegisterFormData,
  LoginFormData,
  MfaFormData,
} from '@/validations/authSchema';

const BASE_API_URL = import.meta.env.VITE_HEALTH_SERVICE_BASE_API;

export function useAuth() {
  const navigate = useNavigate();

  // Register a User
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterFormData) => {
      const response = await fetch(`${BASE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Redirect user to MFA setup after successful registration
      navigate({
        to: '/Setup-mfa',
        search: { qrCode: encodeURIComponent(data.qrCode) },
      });
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });

  // 🔹 Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await fetch(`${BASE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (!data.tempToken) {
        console.error('❌ No tempToken received from backend.');
        return;
      }

      navigate({
        to: '/Input-totp',
        search: { tempToken: data.tempToken }, // ✅ Ensure this is passed correctly
      });
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  const verifyMfaMutation = useMutation({
    mutationFn: async (mfaData: MfaFormData) => {
      const response = await fetch(`${BASE_API_URL}/auth/login/mfa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mfaData),
      });

      if (!response.ok) throw new Error('Invalid MFA code');

      return response.json();
    },
    onSuccess: (data) => {
      // ✅ Store JWTs
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // ✅ Redirect to dashboard
      navigate({ to: '/dashboard' });
    },
  });

  return {
    registerUser: registerMutation.mutate,
    registerStatus: registerMutation.status,
    loginUser: loginMutation.mutate,
    loginStatus: loginMutation.status,
    verifyMfa: verifyMfaMutation.mutate,
    mfaStatus: verifyMfaMutation.status,
  };
}
