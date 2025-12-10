/**
 * API client for AISMM Assessment backend
 */

import type { 
  Organization, 
  Assessment, 
  Response, 
  DomainScore,
  CreateOrganizationRequest,
  CreateAssessmentRequest,
  SaveResponseRequest,
  SaveDomainScoreRequest
} from '../types/assessment';

const API_BASE = 'http://localhost:3001/api';

class ApiClient {
  private async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    
    if (response.status === 204) {
      return undefined as T;
    }
    
    return response.json();
  }

  // ============ Organizations ============
  
  async getOrganizations(): Promise<Organization[]> {
    return this.fetch<Organization[]>('/organizations');
  }

  async getOrganization(id: string): Promise<Organization & { assessments: Assessment[] }> {
    return this.fetch<Organization & { assessments: Assessment[] }>(`/organizations/${id}`);
  }

  async createOrganization(data: CreateOrganizationRequest): Promise<Organization> {
    return this.fetch<Organization>('/organizations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOrganization(id: string, data: Partial<CreateOrganizationRequest>): Promise<Organization> {
    return this.fetch<Organization>(`/organizations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteOrganization(id: string): Promise<void> {
    return this.fetch<void>(`/organizations/${id}`, { method: 'DELETE' });
  }

  // ============ Assessments ============

  async getAssessments(organizationId?: string): Promise<Assessment[]> {
    const query = organizationId ? `?organization_id=${organizationId}` : '';
    return this.fetch<Assessment[]>(`/assessments${query}`);
  }

  async getAssessment(id: string): Promise<Assessment> {
    return this.fetch<Assessment>(`/assessments/${id}`);
  }

  async createAssessment(data: CreateAssessmentRequest): Promise<Assessment> {
    return this.fetch<Assessment>('/assessments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAssessment(id: string, data: Partial<Assessment>): Promise<Assessment> {
    return this.fetch<Assessment>(`/assessments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAssessment(id: string): Promise<void> {
    return this.fetch<void>(`/assessments/${id}`, { method: 'DELETE' });
  }

  // ============ Responses ============

  async getResponses(assessmentId: string): Promise<Response[]> {
    return this.fetch<Response[]>(`/assessments/${assessmentId}/responses`);
  }

  async saveResponse(assessmentId: string, data: SaveResponseRequest): Promise<Response> {
    return this.fetch<Response>(`/assessments/${assessmentId}/responses`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async saveResponses(assessmentId: string, responses: SaveResponseRequest[]): Promise<Response[]> {
    return this.fetch<Response[]>(`/assessments/${assessmentId}/responses/batch`, {
      method: 'POST',
      body: JSON.stringify({ responses }),
    });
  }

  // ============ Domain Scores ============

  async getDomainScores(assessmentId: string): Promise<DomainScore[]> {
    return this.fetch<DomainScore[]>(`/assessments/${assessmentId}/domain-scores`);
  }

  async saveDomainScores(assessmentId: string, domainScores: SaveDomainScoreRequest[]): Promise<DomainScore[]> {
    return this.fetch<DomainScore[]>(`/assessments/${assessmentId}/domain-scores`, {
      method: 'POST',
      body: JSON.stringify({ domain_scores: domainScores }),
    });
  }

  // ============ Comparison ============

  async compareAssessments(id1: string, id2: string): Promise<{ assessment1: Assessment; assessment2: Assessment }> {
    return this.fetch<{ assessment1: Assessment; assessment2: Assessment }>(`/compare/${id1}/${id2}`);
  }
}

export const api = new ApiClient();
export default api;
