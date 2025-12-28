/**
 * Configuration for the AISMM React Agent Application
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.AISMM_API_URL || 'http://localhost:3001',
    timeout: 30000,
  },

  // Ollama Configuration
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    // Model to use - can be llama2, llama3, mistral, mixtral, etc.
    model: process.env.OLLAMA_MODEL || 'llama3.2:latest',
    // Temperature for generation (0.0 - 1.0) - Lower for better tool calling
    temperature: parseFloat(process.env.OLLAMA_TEMPERATURE || '0.1'),
    // Max tokens for response
    maxTokens: parseInt(process.env.OLLAMA_MAX_TOKENS || '8192', 10),
  },

  // Agent Configuration
  agent: {
    // Maximum number of iterations for ReAct loop (increased for complex analysis)
    maxIterations: parseInt(process.env.AGENT_MAX_ITERATIONS || '15', 10),
    // Verbose logging (enabled by default for debugging)
    verbose: process.env.AGENT_VERBOSE !== 'false',
  },

  // Maturity Level Thresholds (aligned with aismm.yaml)
  maturityThresholds: {
    level_5: 90,  // 90% and above = Level 5 (Optimizing)
    level_4: 70,  // 70% and above = Level 4 (Managed)
    level_3: 50,  // 50% and above = Level 3 (Defined)
    level_2: 30,  // 30% and above = Level 2 (Developing)
    level_1: 0,   // Below 30% = Level 1 (Initial)
  },

  // Maturity Level Names
  maturityLevelNames: {
    1: 'Initial',
    2: 'Developing',
    3: 'Defined',
    4: 'Managed',
    5: 'Optimizing',
  } as Record<number, string>,
};

/**
 * Get maturity level from percentage score
 */
export function getMaturityLevel(percentageScore: number): number {
  if (percentageScore >= config.maturityThresholds.level_5) return 5;
  if (percentageScore >= config.maturityThresholds.level_4) return 4;
  if (percentageScore >= config.maturityThresholds.level_3) return 3;
  if (percentageScore >= config.maturityThresholds.level_2) return 2;
  return 1;
}

/**
 * Get maturity level name
 */
export function getMaturityLevelName(level: number): string {
  return config.maturityLevelNames[level] || 'Unknown';
}

export default config;
