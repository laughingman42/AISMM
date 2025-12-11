/**
 * Base Pillar Agent - Common functionality for all pillar-specific agents
 */

import { ChatOllama } from '@langchain/ollama';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { StateGraph, MessagesAnnotation, START, END } from '@langchain/langgraph';
import { config } from '../config/index.js';
import { assessmentTools } from '../tools/assessment-tools.js';
import type { PillarId, PillarReport, DomainAnalysis, PrioritizedRecommendation } from '../types/index.js';

/**
 * Create the Ollama LLM instance
 */
export function createLLM() {
  return new ChatOllama({
    baseUrl: config.ollama.baseUrl,
    model: config.ollama.model,
    temperature: config.ollama.temperature,
  });
}

/**
 * Get the system prompt for a pillar agent
 */
export function getPillarSystemPrompt(pillarId: PillarId, pillarName: string, pillarDescription: string): string {
  return `You are an expert AI Security Analyst specializing in the "${pillarName}" pillar of the AI Security Maturity Model (AISMM).

Your expertise: ${pillarDescription}

Your role is to analyze organizational assessment data for this pillar and produce comprehensive security evaluation reports. You have access to tools that can fetch organization data, domain scores, detailed responses, maturity trends, and gap analysis.

When analyzing an organization, you should:
1. First get an overview of the organization and their assessments
2. Fetch the pillar-specific domain scores to understand maturity across domains
3. For domains with low scores, get detailed responses to understand specific weaknesses
4. Analyze trends if multiple assessments are available
5. Identify gaps and prioritize recommendations

Your output should be a structured analysis including:
- Executive summary of the pillar's security posture
- Key milestones and achievements
- Areas requiring improvement
- Prioritized recommendations with expected impact and effort estimates

Be specific, actionable, and base all conclusions on the actual data you retrieve. If data is missing or insufficient, note this in your analysis.

Always use the tools to gather data before making conclusions. Do not make assumptions without data.`;
}

/**
 * Create a pillar-specific agent
 */
export async function createPillarAgent(
  pillarId: PillarId,
  pillarName: string,
  pillarDescription: string
) {
  const llm = createLLM();
  
  // Bind tools to the model
  const llmWithTools = llm.bindTools(assessmentTools);
  
  // Create tool node
  const toolNode = new ToolNode(assessmentTools);
  
  // Define the agent node
  const agentNode = async (state: typeof MessagesAnnotation.State) => {
    const systemMessage = new SystemMessage(
      getPillarSystemPrompt(pillarId, pillarName, pillarDescription)
    );
    
    const response = await llmWithTools.invoke([
      systemMessage,
      ...state.messages,
    ]);
    
    return { messages: [response] };
  };
  
  // Define the routing function
  const shouldContinue = (state: typeof MessagesAnnotation.State) => {
    const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
    
    // If there are tool calls, route to tools
    if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
      return 'tools';
    }
    
    // Otherwise, end
    return END;
  };
  
  // Build the graph
  const workflow = new StateGraph(MessagesAnnotation)
    .addNode('agent', agentNode)
    .addNode('tools', toolNode)
    .addEdge(START, 'agent')
    .addConditionalEdges('agent', shouldContinue, ['tools', END])
    .addEdge('tools', 'agent');
  
  // Compile and return
  return workflow.compile();
}

/**
 * Run a pillar agent and get the report
 */
export async function runPillarAgent(
  pillarId: PillarId,
  pillarName: string,
  pillarDescription: string,
  organizationId: string
): Promise<string> {
  const agent = await createPillarAgent(pillarId, pillarName, pillarDescription);
  
  const prompt = `Analyze the security maturity of organization "${organizationId}" for the ${pillarName} pillar.

Please:
1. Get the organization overview first
2. Fetch the pillar-specific domain scores for "${pillarId}"
3. Identify gaps and prioritize recommendations for this pillar
4. Check maturity trends if available
5. For any domains with maturity level 2 or below, get detailed responses

Then provide a comprehensive analysis report including:
- Executive Summary (2-3 paragraphs)
- Key Milestones and Achievements (bullet points)
- Areas for Improvement (with specific domains)
- Prioritized Recommendations (with priority level, expected impact, and effort estimate)

Format your final report clearly with headers and structured content.`;

  const result = await agent.invoke({
    messages: [new HumanMessage(prompt)],
  });
  
  // Get the last AI message as the final response
  const messages = result.messages;
  const lastAIMessage = [...messages].reverse().find(m => m instanceof AIMessage);
  
  return lastAIMessage?.content?.toString() || 'No analysis generated';
}

/**
 * Parse agent output into structured PillarReport (best effort)
 */
export function parseAgentOutput(
  output: string,
  pillarId: PillarId,
  pillarName: string
): Partial<PillarReport> {
  // This is a best-effort parser - the LLM output may vary
  // In production, you might want structured output with JSON schema
  
  return {
    pillar_id: pillarId,
    pillar_name: pillarName,
    executive_summary: extractSection(output, 'Executive Summary') || output.substring(0, 500),
    key_milestones: extractBulletPoints(output, 'Key Milestones') || 
                    extractBulletPoints(output, 'Achievements') || [],
    achievements: extractBulletPoints(output, 'Achievements') || [],
    areas_for_improvement: extractBulletPoints(output, 'Areas for Improvement') || 
                           extractBulletPoints(output, 'Improvement') || [],
    prioritized_recommendations: extractRecommendations(output),
  };
}

// Helper functions for parsing
function extractSection(text: string, sectionName: string): string | null {
  const regex = new RegExp(`(?:^|\\n)##?\\s*${sectionName}[:\\s]*\\n([\\s\\S]*?)(?=\\n##?\\s|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

function extractBulletPoints(text: string, sectionName: string): string[] {
  const section = extractSection(text, sectionName);
  if (!section) return [];
  
  const bullets = section.match(/^[\s]*[-*•]\s*(.+)$/gm);
  return bullets ? bullets.map(b => b.replace(/^[\s]*[-*•]\s*/, '').trim()) : [];
}

function extractRecommendations(text: string): PrioritizedRecommendation[] {
  // Try to extract structured recommendations
  const recommendations: PrioritizedRecommendation[] = [];
  
  const section = extractSection(text, 'Recommendations') || 
                  extractSection(text, 'Prioritized Recommendations') || '';
  
  // Simple extraction - look for priority indicators
  const lines = section.split('\n').filter(l => l.trim());
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    let priority: 'critical' | 'high' | 'medium' | 'low' = 'medium';
    
    if (lowerLine.includes('critical')) priority = 'critical';
    else if (lowerLine.includes('high')) priority = 'high';
    else if (lowerLine.includes('low')) priority = 'low';
    
    if (line.match(/[-*•]/)) {
      recommendations.push({
        priority,
        domain: 'General',
        recommendation: line.replace(/^[\s]*[-*•]\s*/, '').trim(),
        expected_impact: 'To be assessed',
        effort_estimate: 'medium',
      });
    }
  }
  
  return recommendations;
}
