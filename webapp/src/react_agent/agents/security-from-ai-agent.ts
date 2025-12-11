/**
 * Security from AI Pillar Agent
 * Specializes in analyzing defenses against AI-enabled attacks and threats
 */

import { runPillarAgent, parseAgentOutput } from './base-agent.js';
import type { PillarReport } from '../types/index.js';

const PILLAR_ID = 'security_from_ai' as const;
const PILLAR_NAME = 'Security from AI';
const PILLAR_DESCRIPTION = `Defending against AI-enabled attacks and malicious AI usage.

This pillar covers domains including:
- Shadow AI Management: Detection and governance of unauthorized AI tools
- AI Agent Authorization: Access control for autonomous AI agents
- Malicious Agent Detection: Detection of rogue or compromised AI agents
- Agent-to-Agent Security: Security for AI agent communication
- AI-Generated Content Detection: Detecting synthetic content
- Deepfake Defense: Protection against deepfake attacks
- AI-Powered Attack Defense: Defense against AI-enabled attacks
- AI Supply Chain Security: Security of AI component supply chain
- Adversarial AI Defense: Protection against adversarial attacks

Focus on identifying and mitigating risks from AI-powered threats, managing shadow AI,
securing autonomous agents, and defending against sophisticated AI-enabled attacks.`;

/**
 * Run the Security from AI agent
 */
export async function runSecurityFromAIAgent(organizationId: string): Promise<{
  rawOutput: string;
  structuredReport: Partial<PillarReport>;
}> {
  console.log(`\n🛡️ Starting ${PILLAR_NAME} analysis for organization: ${organizationId}`);
  
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
