/**
 * API Client for fetching data from the AISMM Assessment API
 */

import { config } from '../config/index.js';
import type { 
  Organization, 
  Assessment, 
  DomainScore, 
  Response,
  AISMMModel 
} from '../types/index.js';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';

/**
 * Fetch all organizations
 */
export async function fetchOrganizations(): Promise<Organization[]> {
  const response = await fetch(`${config.api.baseUrl}/api/organizations`);
  if (!response.ok) {
    throw new Error(`Failed to fetch organizations: ${response.statusText}`);
  }
  return response.json() as Promise<Organization[]>;
}

/**
 * Fetch organization by ID with all assessments
 */
export async function fetchOrganization(orgId: string): Promise<Organization> {
  const response = await fetch(`${config.api.baseUrl}/api/organizations/${orgId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch organization: ${response.statusText}`);
  }
  return response.json() as Promise<Organization>;
}

/**
 * Fetch all assessments for an organization
 */
export async function fetchAssessments(orgId: string): Promise<Assessment[]> {
  const response = await fetch(`${config.api.baseUrl}/api/assessments?organization_id=${orgId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch assessments: ${response.statusText}`);
  }
  return response.json() as Promise<Assessment[]>;
}

/**
 * Fetch a single assessment with responses and domain scores
 */
export async function fetchAssessment(assessmentId: string): Promise<Assessment> {
  const response = await fetch(`${config.api.baseUrl}/api/assessments/${assessmentId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch assessment: ${response.statusText}`);
  }
  return response.json() as Promise<Assessment>;
}

/**
 * Fetch responses for an assessment
 */
export async function fetchResponses(assessmentId: string): Promise<Response[]> {
  const response = await fetch(`${config.api.baseUrl}/api/assessments/${assessmentId}/responses`);
  if (!response.ok) {
    throw new Error(`Failed to fetch responses: ${response.statusText}`);
  }
  return response.json() as Promise<Response[]>;
}

/**
 * Fetch domain scores for an assessment
 */
export async function fetchDomainScores(assessmentId: string): Promise<DomainScore[]> {
  const response = await fetch(`${config.api.baseUrl}/api/assessments/${assessmentId}/domain-scores`);
  if (!response.ok) {
    throw new Error(`Failed to fetch domain scores: ${response.statusText}`);
  }
  return response.json() as Promise<DomainScore[]>;
}

/**
 * Cache for the AISMM model to avoid repeated file I/O
 */
let cachedAISMMModel: AISMMModel | null = null;

/**
 * Load the AISMM model definition from YAML
 * Uses in-memory cache to avoid repeated file reads (192KB file)
 */
export async function loadAISMMModel(): Promise<AISMMModel> {
  // Return cached model if already loaded
  if (cachedAISMMModel) {
    return cachedAISMMModel;
  }

  // Get current directory from import.meta.url
  const currentDir = dirname(fileURLToPath(import.meta.url));

  // Try multiple paths for the AISMM definition
  const possiblePaths = [
    join(currentDir, '..', '..', '..', 'public', 'aismm.yaml'),  // From src/react_agent/tools -> public
    join(currentDir, '..', '..', '..', '..', 'aismm_definition', 'aismm.yaml'),  // Project root
    join(currentDir, '..', '..', '..', '..', 'public', 'aismm.yaml'),  // Alternative public path
  ];

  let yamlContent: string | null = null;
  const errors: string[] = [];

  for (const yamlPath of possiblePaths) {
    try {
      yamlContent = await readFile(yamlPath, 'utf-8');
      console.log(`[AISMM] Loaded model from: ${yamlPath}`);
      break;
    } catch (err) {
      errors.push(`${yamlPath}: ${(err as Error).message}`);
      continue;
    }
  }

  if (!yamlContent) {
    throw new Error(`Could not find AISMM definition file. Tried paths:\n${errors.join('\n')}`);
  }

  const parsed = parseYaml(yamlContent);

  // Transform to our model structure and cache it
  cachedAISMMModel = {
    version: parsed.version,
    name: parsed.name,
    description: parsed.description,
    pillars: parsed.pillars,
    domains: parsed.domains,
  };

  return cachedAISMMModel;
}

/**
 * Get all organization data needed for analysis
 * Optimized to fetch assessments in parallel instead of sequentially
 */
export async function getOrganizationData(orgId: string): Promise<{
  organization: Organization;
  assessments: Assessment[];
  allDomainScores: DomainScore[];
  allResponses: Response[];
}> {
  const organization = await fetchOrganization(orgId);
  const assessments = organization.assessments || await fetchAssessments(orgId);

  // Fetch all domain scores and responses for completed assessments
  const completedAssessments = assessments.filter(a => a.status === 'completed');

  // Optimize: Fetch all assessment details in parallel instead of sequentially
  const assessmentDetails = await Promise.all(
    completedAssessments.map(assessment => fetchAssessment(assessment.id))
  );

  const allDomainScores: DomainScore[] = [];
  const allResponses: Response[] = [];

  // Aggregate domain scores and responses from all assessments
  for (const fullAssessment of assessmentDetails) {
    if (fullAssessment.domain_scores) {
      allDomainScores.push(...fullAssessment.domain_scores);
    }

    if (fullAssessment.responses) {
      allResponses.push(...fullAssessment.responses);
    }
  }

  return {
    organization,
    assessments: completedAssessments,
    allDomainScores,
    allResponses,
  };
}
