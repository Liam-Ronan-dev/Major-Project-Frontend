import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  api,
  getPrescriptions,
  getPrescriptionById,
  createPrescription,
  deletePrescription,
  updatePrescriptionStatus,
} from '../../../src/lib/api';

// Isolated from the real server so they run fast and consistently.
// Testing API call functions, not the server - independent
describe('getPrescriptions', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Reset mocks before each test to avoid conflicts
  });

  it('returns prescriptions on success', async () => {
    vi.spyOn(api, 'get').mockResolvedValueOnce({
      data: {
        data: [
          { _id: '1', status: 'Assigned' },
          { _id: '2', status: 'Processed' },
        ],
      },
    }); // Mock the GET /prescriptions API call to return 2 fake prescriptions

    const prescriptions = await getPrescriptions();

    expect(api.get).toHaveBeenCalledWith('/prescriptions');
    expect(prescriptions).toHaveLength(2);
    expect(prescriptions[0].status).toBe('Assigned');
  });

  it('returns a prescription when given a valid ID', async () => {
    const mockData = { _id: '123', status: 'Pending' };

    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: { data: mockData } });

    const result = await getPrescriptionById('123');

    expect(api.get).toHaveBeenCalledWith('/prescription/123');
    expect(result._id).toBe('123');
    expect(result.status).toBe('Pending');
  });

  it('sends correct data to the server and returns success response', async () => {
    const mockPayload = { patientId: 'abc', items: [] };
    const mockResponse = { success: true };

    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: mockResponse });

    const result = await createPrescription(mockPayload);

    expect(api.post).toHaveBeenCalledWith('/prescriptions', mockPayload);
    expect(result).toEqual(mockResponse);
  });

  it('deletes a prescription by ID', async () => {
    const mockResponse = { deleted: true };

    vi.spyOn(api, 'delete').mockResolvedValueOnce({ data: mockResponse });

    const result = await deletePrescription('prescription-123');

    expect(api.delete).toHaveBeenCalledWith('/prescription/prescription-123');
    expect(result).toEqual(mockResponse);
  });

  it('updates prescription status and notes', async () => {
    const updates = { status: 'Pending', notes: 'Check dosage' };
    const mockResponse = { updated: true };

    vi.spyOn(api, 'patch').mockResolvedValueOnce({ data: mockResponse });

    const result = await updatePrescriptionStatus('321', updates);

    expect(api.patch).toHaveBeenCalledWith('/prescription/321/status', updates);
    expect(result).toEqual(mockResponse);
  });
});
