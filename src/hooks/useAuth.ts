import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { RegisterFormData } from '@/validations/authSchema';

const BASE_API_URL = import.meta.env.VITE_HEALTH_SERVICE_BASE_API;

export function useAuth() {
  const navigate = useNavigate();

  // ✅ Register a User
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterFormData) => {
      const response = await fetch(`${BASE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      console.log('🌍 BASE_API_URL:', BASE_API_URL);

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      // ✅ Redirect user to MFA setup after successful registration
      navigate({
        to: '/Setup-mfa',
        search: { qrCode: encodeURIComponent(data.qrCode) },
      });
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });

  return {
    registerUser: registerMutation.mutate,
    registerStatus: registerMutation.status,
  };
}
