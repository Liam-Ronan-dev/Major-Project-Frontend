import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import {
  RegisterFormData,
  LoginFormData,
  MfaFormData,
} from '@/validations/authSchema';
import { useAuth } from '@/contexts/AuthContext';

const BASE_API_URL = import.meta.env.VITE_HEALTH_SERVICE_BASE_API;

export function useAuthAPI() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
      navigate({
        to: '/Setup-mfa',
        search: { qrCode: encodeURIComponent(data.qrCode) },
      });
    },
  });

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
      navigate({ to: '/Input-totp', search: { tempToken: data.tempToken } });
    },
  });

  const verifyMfaMutation = useMutation({
    mutationFn: async (mfaData: MfaFormData) => {
      const response = await fetch(`${BASE_API_URL}/auth/login/mfa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mfaData),
        credentials: 'include', // Sends cookies
      });

      if (!response.ok) throw new Error('Invalid MFA code');
      return response.json();
    },
    onSuccess: (data) => {
      login(data.accessToken, { email: data.user.email, role: data.user.role });
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
