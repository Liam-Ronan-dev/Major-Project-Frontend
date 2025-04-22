import axios from 'axios';

const BASE_API_URL =
  import.meta.env.VITE_HEALTH_SERVICE_BASE_API ||
  'https://health-service-api.click/api';

// Configure Axios with credentials (cookies)
export const api = axios.create({
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

// Login
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Verify OTP
export const verifyOTP = async (otp: string) => {
  try {
    const res = await api.post('/auth/login/mfa', { totp: otp });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Logout
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
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch prescriptions:', error);
    throw error;
  }
};

// Get all pharmacists
export const getPharmacists = async () => {
  try {
    const res = await api.get('/pharmacists');
    return res.data.data; // adjust depending on your API response shape
  } catch (error) {
    handleApiError(error);
  }
};

// Prescriptions
export const createPrescription = async (data: any) => {
  try {
    const res = await api.post('/prescriptions', data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getPrescriptionById = async (id: string) => {
  try {
    const res = await api.get(`/prescription/${id}`);
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deletePrescription = async (id: string) => {
  try {
    const res = await api.delete(`/prescription/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePrescription = async (id: string, data: any) => {
  try {
    const res = await api.put(`/prescription/${id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePrescriptionStatus = async (
  id: string,
  updates: {
    status?: string;
    notes?: string;
    itemNotes?: { itemId: string; pharmacistNote: string }[];
  }
) => {
  try {
    const res = await api.patch(`/prescription/${id}/status`, updates);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Appointments //
export const getAppointments = async () => {
  try {
    const res = await api.get('/appointments');
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAppointmentById = async (id: string) => {
  try {
    const res = await api.get(`/appointment/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createAppointment = async (data: any) => {
  try {
    const res = await api.post('/appointments', data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    const res = await api.delete(`/appointment/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateAppointment = async (id: string, data: any) => {
  try {
    const res = await api.put(`/appointment/${id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Patients //
export const getPatients = async () => {
  try {
    const res = await api.get('/patients');
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getPatientById = async (id: string) => {
  try {
    const res = await api.get(`/patient/${id}`);
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deletePatient = async (id: string) => {
  try {
    const res = await api.delete(`/patient/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createPatient = async (data: any) => {
  try {
    const res = await api.post('/patients', data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePatient = async (id: string, data: any) => {
  try {
    const res = await api.put(`/patient/${id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getLatestPrescriptionForPatient = async (patientId: string) => {
  try {
    const res = await api.get(`/prescriptions/latest?patientId=${patientId}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
