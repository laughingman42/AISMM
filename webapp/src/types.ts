/**
 * TypeScript types for AISMM v1.x YAML structure
 * Supports the flat domains dictionary with pillars, scoring, and embedded questions
 */

// Scoring Configuration
export interface ScoringConfig {
  version: string;
  max_score: number;
  passing_threshold: number;
  pillar_weights: Record<string, number>;
  level_scores: Record<string, number>;
  maturity_thresholds: Record<string, number>;
}

// Pillar Definition
export interface Pillar {
  id: string;
  name: string;
  description: string;
  weight?: number;
}

// Framework references in alignment
export interface FrameworkRefs {
  nist_ai_rmf?: string[];
  iso_27001?: string[];
  iso_42001?: string[];
  eu_ai_act?: string[];
  nist_csf?: string[];
  soc2_security?: string[];
  nist_ssdf?: string[];
  owasp_asvs?: string[];
  mitre_atlas?: string[];
  owasp_genai?: string[];
  [key: string]: string[] | undefined;
}

// Framework alignment entry
export interface FrameworkAlignment {
  indicator: string;
  frameworks: FrameworkRefs;
}

// Maturity Level (v1.x uses level_1, level_2, etc. keys)
export interface MaturityLevel {
  level: string;
  name: string;
  description: string;
  score_value: number;
}

// Indicators section
export interface Indicators {
  indicators: string[];
  definitions: Record<string, string>;
  success_criteria: string[];
}

// Question option
export interface QuestionOption {
  value?: number;
  label?: string;
}

// Question (embedded in domain)
export interface Question {
  id: string;
  text: string;
  question_type: string;
  weight?: number;
  required?: boolean;
  slider_compatible?: boolean;
  options?: (string | QuestionOption)[];
  help_text?: string;
}

// Domain Definition (v1.x structure)
export interface Domain {
  id: string;
  name: string;
  description: string;
  pillar: string;
  weight?: number;
  key_controls?: string[];
  framework_alignment?: FrameworkAlignment[];
  levels: Record<string, MaturityLevel>;
  indicators?: Indicators;
  questions?: Question[];
}

// Root AISMM v1.x Data Structure
export interface AISMMDataV1 {
  version: string;
  name: string;
  description: string;
  created_at?: string;
  scoring_config: ScoringConfig;
  pillars: Record<string, Pillar>;
  domains: Record<string, Domain>;
}

// Helper function to get all unique frameworks from a domain
export function getUniqueFrameworks(domain: Domain): Set<string> {
  const frameworks = new Set<string>();
  domain.framework_alignment?.forEach(fa => {
    Object.keys(fa.frameworks).forEach(f => {
      if (fa.frameworks[f] && fa.frameworks[f]!.length > 0) {
        frameworks.add(f);
      }
    });
  });
  return frameworks;
}

// Helper function to get all framework references for a specific framework
export function getFrameworkRefs(domain: Domain, framework: string): string[] {
  const refs: string[] = [];
  domain.framework_alignment?.forEach(fa => {
    const items = fa.frameworks[framework];
    if (items) {
      refs.push(...items);
    }
  });
  // Deduplicate
  return [...new Set(refs)];
}

// Helper to get domains grouped by pillar
export function getDomainsByPillar(data: AISMMDataV1): Record<string, Domain[]> {
  const grouped: Record<string, Domain[]> = {};
  Object.values(data.domains).forEach(domain => {
    if (!grouped[domain.pillar]) {
      grouped[domain.pillar] = [];
    }
    grouped[domain.pillar].push(domain);
  });
  return grouped;
}

// Framework display names
export const FRAMEWORK_DISPLAY_NAMES: Record<string, string> = {
  nist_ai_rmf: 'NIST AI RMF',
  iso_27001: 'ISO 27001',
  iso_42001: 'ISO 42001',
  eu_ai_act: 'EU AI Act',
  nist_csf: 'NIST CSF',
  soc2_security: 'SOC 2',
  nist_ssdf: 'NIST SSDF',
  owasp_asvs: 'OWASP ASVS',
  mitre_atlas: 'MITRE ATLAS',
  owasp_genai: 'OWASP GenAI',
};

// Framework badge colors
export const FRAMEWORK_COLORS: Record<string, string> = {
  nist_ai_rmf: 'bg-blue-100 text-blue-800',
  iso_27001: 'bg-purple-100 text-purple-800',
  iso_42001: 'bg-indigo-100 text-indigo-800',
  eu_ai_act: 'bg-amber-100 text-amber-800',
  nist_csf: 'bg-cyan-100 text-cyan-800',
  soc2_security: 'bg-emerald-100 text-emerald-800',
  nist_ssdf: 'bg-teal-100 text-teal-800',
  owasp_asvs: 'bg-orange-100 text-orange-800',
  mitre_atlas: 'bg-red-100 text-red-800',
  owasp_genai: 'bg-pink-100 text-pink-800',
};
