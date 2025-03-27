/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const BASE_API_URL =
  import.meta.env.VITE_HEALTH_SERVICE_BASE_API ||
  'https://health-service-api.click/api';

// Configure Axios with credentials (cookies)
const api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true, // Ensures cookies are sent
});

// Function to Log Backend Errors
const handleApiError = (error: any) => {
  console.error('API Error:', {
    message: error.message,
    config: error.config,
    response: error.response,
  }); // Log full error

  if (error.response) {
    console.log(error.response);
  } else if (error.request) {
    console.error('No Response Received:', error.request);
  } else {
    console.error('Request Setup Error:', error.message);
  }

  throw error.response?.data || new Error('Unknown error occurred');
};

// Fetch Logged-in User
export const fetchUser = async () => {
  try {
    const res = await api.get('/auth/me');
    console.log(res.data);
    return res.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// Register User
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

// Login API (Step 1)
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Verify OTP (Step 2)
export const verifyOTP = async (otp: string) => {
  try {
    const res = await api.post('/auth/login/mfa', { totp: otp });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Logout API
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    return true;
  } catch (error) {
    handleApiError(error);
    return false;
  }
};

export const getPrescriptions = async () => {
  try {
    const response = await api.get('/prescriptions');
    return response.data.data; // assumes your backend returns an array of prescriptions
  } catch (error) {
    console.error('Failed to fetch prescriptions:', error);
    throw error;
  }
};
