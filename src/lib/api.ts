import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_HEALTH_SERVICE_BASE_API;

// Configure Axios with credentials (cookies)
const api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true, // Ensures cookies are sent
});

// ✅ Function to Log Backend Errors
const handleApiError = (error: {
  response?: { data?: { message?: string } };
}) => {
  console.error('API Error:', error.response?.data?.message);
  throw error.response?.data || new Error('Unknown error occurred');
};

// ✅ Fetch Logged-in User
export const fetchUser = async () => {
  try {
    const res = await api.get('/auth/me');
    return res.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// ✅ Register User
export const registerUser = async (data: {
  email: string;
  password: string;
  licenseNumber: string;
  role: 'doctor' | 'pharmacist';
}) => {
  try {
    const res = await api.post('/auth/register', data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ✅ Login API (Step 1)
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ✅ Verify OTP (Step 2)
export const verifyOTP = async (otp: string) => {
  try {
    const res = await api.post('/auth/login/mfa', { totp: otp });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ✅ Logout API
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
};
