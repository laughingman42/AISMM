/**
 * TypeScript types for AISMM Assessments
 */

export interface Organization {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  size?: string;
  created_at: string;
  updated_at: string;
  assessment_count?: number;
  last_assessment?: string;
}

export interface Assessment {
  id: string;
  organization_id: string;
  organization_name?: string;
  name: string;
  description?: string;
  status: 'in_progress' | 'completed' | 'archived';
  model_version: string;
  started_at: string;
  completed_at?: string;
  total_score?: number;
  maturity_level?: number;
  responses?: Response[];
  domain_scores?: DomainScore[];
}

export interface Response {
  id: string;
  assessment_id: string;
  domain_id: string;
  question_id: string;
  response_value?: string;
  response_index?: number;
  response_text?: string;
  score?: number;
  created_at: string;
  updated_at: string;
}

export interface DomainScore {
  id: string;
  assessment_id: string;
  domain_id: string;
  pillar_id: string;
  raw_score: number;
  weighted_score: number;
  maturity_level: number;
  questions_answered: number;
  questions_total: number;
  created_at: string;
}

export interface PillarScore {
  pillar_id: string;
  pillar_name: string;
  raw_score: number;
  weighted_score: number;
  maturity_level: number;
  domain_scores: DomainScore[];
}

export interface AssessmentResult {
  assessment: Assessment;
  total_score: number;
  maturity_level: number;
  pillar_scores: PillarScore[];
  domain_scores: DomainScore[];
}

// API response types
export interface CreateOrganizationRequest {
  name: string;
  description?: string;
  industry?: string;
  size?: string;
}

export interface CreateAssessmentRequest {
  organization_id: string;
  name: string;
  description?: string;
  model_version: string;
}

export interface SaveResponseRequest {
  domain_id: string;
  question_id: string;
  response_value?: string;
  response_index?: number;
  response_text?: string;
  score?: number;
}

export interface SaveDomainScoreRequest {
  domain_id: string;
  pillar_id: string;
  raw_score: number;
  weighted_score: number;
  maturity_level: number;
  questions_answered: number;
  questions_total: number;
}

// Industry options
export const INDUSTRY_OPTIONS = [
  'Technology',
  'Financial Services',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Government',
  'Education',
  'Energy',
  'Telecommunications',
  'Transportation',
  'Other'
];

// Organization size options
export const SIZE_OPTIONS = [
  'Startup (1-50)',
  'Small (51-200)',
  'Medium (201-1000)',
  'Large (1001-5000)',
  'Enterprise (5000+)'
];
