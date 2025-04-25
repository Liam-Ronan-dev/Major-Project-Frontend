import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  api,
  getPatients,
  getPatientById,
  createPatient,
  deletePatient,
  updatePatient,
} from '../../../src/lib/api'; // or '../../src/lib/api' depending on your setup

describe('Patient API calls', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Reset mocks before each test
  });

  it('getPatients returns list of patients', async () => {
    vi.spyOn(api, 'get').mockResolvedValueOnce({
      data: { data: [{ _id: 'p1' }, { _id: 'p2' }] },
    });

    const result = await getPatients();

    expect(api.get).toHaveBeenCalledWith('/patients');
    expect(result).toHaveLength(2);
    expect(result[0]._id).toBe('p1');
  });

  it('getPatientById returns a single patient', async () => {
    const mockPatient = { _id: 'p123', firstName: 'John', lastName: 'Doe' };

    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: { data: mockPatient } });

    const result = await getPatientById('p123');

    expect(api.get).toHaveBeenCalledWith('/patient/p123');
    expect(result._id).toBe('p123');
    expect(result.firstName).toBe('John');
  });

  it('createPatient sends correct data and returns created patient', async () => {
    const newPatient = { firstName: 'Jane', lastName: 'Doe' };
    const mockResponse = { success: true, id: 'p789' };

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: mockResponse });

    const result = await createPatient(newPatient);

    expect(api.post).toHaveBeenCalledWith('/patients', newPatient);
    expect(result).toEqual(mockResponse);
  });

  it('deletePatient deletes patient by ID', async () => {
    const mockResponse = { deleted: true };

    vi.spyOn(api, 'delete').mockResolvedValueOnce({ data: mockResponse });

    const result = await deletePatient('p456');

    expect(api.delete).toHaveBeenCalledWith('/patient/p456');
    expect(result).toEqual(mockResponse);
  });

  it('updatePatient updates patient information', async () => {
    const updates = { firstName: 'Updated' };
    const mockResponse = { updated: true };

    vi.spyOn(api, 'put').mockResolvedValueOnce({ data: mockResponse });

    const result = await updatePatient('p111', updates);

    expect(api.put).toHaveBeenCalledWith('/patient/p111', updates);
    expect(result).toEqual(mockResponse);
  });
});
