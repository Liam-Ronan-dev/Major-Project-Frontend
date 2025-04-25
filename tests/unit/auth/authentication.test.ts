import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  api,
  fetchUser,
  registerUser,
  login,
  verifyOTP,
  logout,
} from '../../../src/lib/api';

describe('Auth API calls', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Reset mocks before each test
  });

  it('fetchUser returns user data', async () => {
    const mockUser = { _id: 'user1', email: 'test@example.com' };

    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: mockUser });

    const result = await fetchUser();

    expect(api.get).toHaveBeenCalledWith('/auth/me');
    expect(result).toEqual(mockUser);
  });

  it('registerUser sends correct data and returns response', async () => {
    const payload = {
      email: 'new@example.com',
      password: 'password123',
      licenseNumber: 'ABC123',
      role: 'doctor' as 'doctor',
    };

    const mockResponse = { success: true };

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: mockResponse });

    const result = await registerUser(payload);

    expect(api.post).toHaveBeenCalledWith('/auth/register', payload);
    expect(result).toEqual(mockResponse);
  });

  it('login sends credentials and returns token', async () => {
    const mockResponse = { token: 'fake-jwt-token' };

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: mockResponse });

    const result = await login('test@example.com', 'password123');

    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result).toEqual(mockResponse);
  });

  it('verifyOTP sends OTP code and returns success', async () => {
    const mockResponse = { verified: true };

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: mockResponse });

    const result = await verifyOTP('123456');

    expect(api.post).toHaveBeenCalledWith('/auth/login/mfa', {
      totp: '123456',
    });
    expect(result).toEqual(mockResponse);
  });

  it('logout sends logout request and returns true', async () => {
    vi.spyOn(api, 'post').mockResolvedValueOnce({});

    const result = await logout();

    expect(api.post).toHaveBeenCalledWith('/auth/logout');
    expect(result).toBe(true);
  });
});
