/**
 * AI for Security Pillar Agent
 * Specializes in analyzing how AI enhances organizational security operations
 */

import { runPillarAgent, parseAgentOutput } from './base-agent.js';
import type { PillarReport } from '../types/index.js';

const PILLAR_ID = 'ai_for_security' as const;
const PILLAR_NAME = 'AI for Security';
const PILLAR_DESCRIPTION = `Leveraging AI capabilities to enhance organizational security operations.

This pillar covers domains including:
- AI Security Tools: Specialized tooling for AI-specific security risks
- Threat Detection & Analysis: AI-powered threat detection and hunting
- Incident Response: AI-enhanced incident response automation
- Vulnerability Management: AI-driven vulnerability assessment and prioritization
- Identity & Access Management: AI-enhanced identity governance
- Security Operations: AI-powered SOC capabilities
- Fraud Detection: AI-powered fraud prevention systems

Focus on how effectively the organization uses AI to strengthen their security posture, 
automate security operations, and improve threat detection and response capabilities.`;

/**
 * Run the AI for Security agent
 */
export async function runAIForSecurityAgent(organizationId: string): Promise<{
  rawOutput: string;
  structuredReport: Partial<PillarReport>;
}> {
  console.log(`\n🤖 Starting ${PILLAR_NAME} analysis for organization: ${organizationId}`);
  
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
