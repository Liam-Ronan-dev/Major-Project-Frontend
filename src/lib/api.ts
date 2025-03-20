import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_HEALTH_SERVICE_BASE_API;

// Configure Axios with credentials (cookies)
const api = axios.create({
  baseURL: BASE_API_URL, // Change this if deployed
  withCredentials: true, // Ensures cookies are sent
});

export const fetchUser = async () => {
  try {
    const res = await api.get('/auth/me'); // ✅ Calls backend to get logged-in user
    return res.data; // Returns user object
  } catch (error) {
    console.error(
      'Error fetching user:',
      error.response?.data?.message || error.message
    );
    return null; // Returns null if user is not authenticated
  }
};

// Fetch the authenticated user
export const registerUser = async (data: {
  email: string;
  password: string;
  licenseNumber: string;
  role: 'doctor' | 'pharmacist';
}) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

// ✅ Login API (Step 1)
export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

// ✅ Verify OTP (Step 2)
export const verifyOTP = async (otp: string) => {
  const res = await api.post('/auth/login/mfa', { totp: otp });
  return res.data;
};

// ✅ Logout API
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    return true; // ✅ Indicate success
  } catch (error) {
    console.error(
      'Logout Error:',
      error.response?.data?.message || error.message
    );
    return false; // ✅ Indicate failure
  }
};
