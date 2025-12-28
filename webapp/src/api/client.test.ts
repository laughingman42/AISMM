/**
 * Tests for AISMM API Client
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

// We need to dynamically import after mocking
describe('API Client', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Organization API', () => {
    it('should fetch organizations successfully', async () => {
      const mockOrgs = [
        { id: '1', name: 'Test Org', created_at: '2025-01-01' },
        { id: '2', name: 'Another Org', created_at: '2025-01-02' },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrgs,
      });

      // Dynamic import to get fresh module with mocked fetch
      const { api } = await import('./client');
      const result = await api.getOrganizations();

      expect(result).toEqual(mockOrgs);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/organizations'),
        expect.any(Object)
      );
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal Server Error' }),
      });

      const { api } = await import('./client');
      
      await expect(api.getOrganizations()).rejects.toThrow('Internal Server Error');
    });

    it('should create organization with correct payload', async () => {
      const newOrg = { name: 'New Org', description: 'A test organization' };
      const createdOrg = { id: '3', ...newOrg, created_at: '2025-01-03' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createdOrg,
      });

      const { api } = await import('./client');
      const result = await api.createOrganization(newOrg);

      expect(result).toEqual(createdOrg);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/organizations'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newOrg),
        })
      );
    });
  });

  describe('Assessment API', () => {
    it('should fetch assessments with organization filter', async () => {
      const mockAssessments = [
        { id: 'a1', organization_id: 'org1', name: 'Assessment 1' },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAssessments,
      });

      const { api } = await import('./client');
      const result = await api.getAssessments('org1');

      expect(result).toEqual(mockAssessments);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/assessments?organization_id=org1'),
        expect.any(Object)
      );
    });

    it('should handle 204 No Content response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const { api } = await import('./client');
      const result = await api.deleteOrganization('1');

      expect(result).toBeUndefined();
    });
  });
});
