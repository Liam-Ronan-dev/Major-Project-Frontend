import axios from 'axios';

// Base URL from .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register User
export const registerUser = async (userData: {
  email: string;
  password: string;
  licenseNumber: string;
  role: string;
}) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

// Login User
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

// Logout User
export const logoutUser = async () => {
  await api.post('/auth/logout');
};
