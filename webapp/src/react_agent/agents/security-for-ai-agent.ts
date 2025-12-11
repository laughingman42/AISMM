/**
 * Security for AI Pillar Agent
 * Specializes in analyzing protection of AI systems, models, and data from threats
 */

import { runPillarAgent, parseAgentOutput } from './base-agent.js';
import type { PillarReport } from '../types/index.js';

const PILLAR_ID = 'security_for_ai' as const;
const PILLAR_NAME = 'Security for AI';
const PILLAR_DESCRIPTION = `Protecting AI systems, models, and data from threats and vulnerabilities.

This pillar covers domains including:
- AI Security Standards: Governance frameworks, policies, compliance
- Security Reviews: Regular security assessments and audits
- Development Integration: Secure AI/ML development lifecycle
- Asset Management: AI model and data inventory management
- Team Structure: AI security expertise and organization
- Training Data Privacy: Privacy protection for training data
- Training Data Security: Security controls for training data
- Data Poisoning Protection: Prevention of data poisoning attacks
- AI Red Teaming: Adversarial testing of AI systems
- Prompt Injection Protection: Guarding against prompt injection attacks

Focus on governance, secure development practices, data protection, and proactive security testing.`;

/**
 * Run the Security for AI agent
 */
export async function runSecurityForAIAgent(organizationId: string): Promise<{
  rawOutput: string;
  structuredReport: Partial<PillarReport>;
}> {
  console.log(`\n🔐 Starting ${PILLAR_NAME} analysis for organization: ${organizationId}`);
  
  const rawOutput = await runPillarAgent(
    PILLAR_ID,
    PILLAR_NAME,
    PILLAR_DESCRIPTION,
    organizationId
  );
  
  console.log(`✅ ${PILLAR_NAME} analysis complete`);
  
  const structuredReport = parseAgentOutput(rawOutput, PILLAR_ID, PILLAR_NAME);
  
  return {
    rawOutput,
    structuredReport,
  };
}

export { PILLAR_ID, PILLAR_NAME, PILLAR_DESCRIPTION };
