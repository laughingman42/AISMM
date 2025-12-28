/**
 * Base Pillar Agent - Common functionality for all pillar-specific agents
 */

import { ChatOllama } from '@langchain/ollama';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { StateGraph, MessagesAnnotation, START, END } from '@langchain/langgraph';
import { config } from '../config/index.js';
import { assessmentTools } from '../tools/assessment-tools.js';
import type { PillarId, PillarReport, PrioritizedRecommendation } from '../types/index.js';

/**
 * Create the Ollama LLM instance
 */
export function createLLM() {
  const model = config.ollama.model;
  
  // Warn about models with poor tool-calling support
  if (model.includes('llama3.2') || model.includes('llama2')) {
    console.warn(`⚠️  Model "${model}" may have poor tool-calling support.`);
    console.warn(`⚠️  For better results, use: gemma3:27b, llama3.1, or mixtral`);
  }
  
  return new ChatOllama({
    baseUrl: config.ollama.baseUrl,
    model: model,
    temperature: config.ollama.temperature,    numCtx: 8192, // Larger context window for complex analysis
    numPredict: config.ollama.maxTokens,  });
}

/**
 * Get the system prompt for a pillar agent
 */
export function getPillarSystemPrompt(pillarId: PillarId, pillarName: string, pillarDescription: string): string {
  return `You are an expert AI Security Analyst specializing in the "${pillarName}" pillar of the AI Security Maturity Model (AISMM).

Your expertise: ${pillarDescription}

CRITICAL INSTRUCTION: You MUST use the available tools to gather data. DO NOT write any analysis without calling tools first.

MANDATORY TOOL SEQUENCE:
1. FIRST call: get_organization_overview (organizationId)
2. THEN call: get_pillar_domain_scores (organizationId, pillarId="${pillarId}")
3. THEN call: identify_gaps (organizationId, pillarId="${pillarId}")
4. OPTIONAL: get_maturity_trend (organizationId, pillarId="${pillarId}")
5. OPTIONAL: get_domain_responses (organizationId, domainId) for low-scoring domains

After collecting ALL tool data, write your structured analysis with:
- Executive summary (based on domain scores you retrieved)
- Key milestones and achievements (based on HIGH maturity domains)
- Areas requiring improvement (based on LOW maturity domains from gap analysis)
- Prioritized recommendations (critical/high/medium/low priority, with impact and effort)

NEVER say "without domain-specific data" or "data not available" - you have tools to get ALL data. Use them!

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
  
  // Compile with recursion limit
  return workflow.compile({
    recursionLimit: config.agent.maxIterations,
  });
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
  
  const prompt = `Analyze organization ID: ${organizationId} for the ${pillarName} pillar.

STEP 1: Call get_organization_overview with organizationId="${organizationId}"
STEP 2: Call get_pillar_domain_scores with organizationId="${organizationId}" and pillarId="${pillarId}"  
STEP 3: Call identify_gaps with organizationId="${organizationId}" and pillarId="${pillarId}"
STEP 4: (Optional) Call get_maturity_trend for trend analysis

After you have ALL the data from these tool calls, write your comprehensive analysis report.`;

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
