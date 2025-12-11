/**
 * Type definitions for AISMM React Agent Application
 */

// Organization types
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
  assessments?: Assessment[];
}

// Assessment types
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

// Response types
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

// Domain Score types
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

// Pillar definitions
export type PillarId = 'security_for_ai' | 'ai_for_security' | 'security_from_ai';

export interface Pillar {
  id: PillarId;
  name: string;
  description: string;
  weight: number;
}

// Domain definitions
export interface Domain {
  id: string;
  name: string;
  description: string;
  pillar: PillarId;
  weight: number;
  key_controls?: string[];
}

// AISMM Model structure
export interface AISMMModel {
  version: string;
  name: string;
  description: string;
  pillars: Record<PillarId, Pillar>;
  domains: Record<string, Domain>;
}

// Agent report types
export interface DomainAnalysis {
  domain_id: string;
  domain_name: string;
  maturity_level: number;
  raw_score: number;
  key_findings: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface PillarReport {
  pillar_id: PillarId;
  pillar_name: string;
  executive_summary: string;
  overall_maturity_level: number;
  average_score: number;
  domain_analyses: DomainAnalysis[];
  key_milestones: string[];
  achievements: string[];
  areas_for_improvement: string[];
  prioritized_recommendations: PrioritizedRecommendation[];
}

export interface PrioritizedRecommendation {
  priority: 'critical' | 'high' | 'medium' | 'low';
  domain: string;
  recommendation: string;
  expected_impact: string;
  effort_estimate: 'low' | 'medium' | 'high';
}

export interface OrganizationSecurityReport {
  organization_id: string;
  organization_name: string;
  report_generated_at: string;
  assessments_analyzed: number;
  executive_summary: string;
  overall_maturity_level: number;
  overall_score: number;
  pillar_reports: PillarReport[];
  cross_pillar_insights: string[];
  strategic_recommendations: PrioritizedRecommendation[];
  maturity_trend?: string;
}

// Agent context
export interface AgentContext {
  organization: Organization;
  assessments: Assessment[];
  domainScores: DomainScore[];
  responses: Response[];
  model: AISMMModel;
}
