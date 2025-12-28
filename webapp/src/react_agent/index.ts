/**
 * AISMM React Agent Module
 * Exports for programmatic usage and CLI entry point
 */

// Export all agent functionality
export { 
  generateOrganizationSecurityReport, 
  formatReportAsMarkdown,
  formatReportAsJSON 
} from './agents/orchestrator.js';

export { runSecurityForAIAgent } from './agents/security-for-ai-agent.js';
export { runAIForSecurityAgent } from './agents/ai-for-security-agent.js';
export { runSecurityFromAIAgent } from './agents/security-from-ai-agent.js';
export { createPillarAgent, runPillarAgent, createLLM } from './agents/base-agent.js';

// Export tools
export { 
  getOrganizationOverviewTool,
  getPillarDomainScoresTool,
  getDomainResponsesTool,
  getMaturityTrendTool,
  identifyGapsTool,
  assessmentTools 
} from './tools/assessment-tools.js';

export {
  fetchOrganizations,
  fetchOrganization,
  fetchAssessments,
  fetchAssessment,
  fetchResponses,
  fetchDomainScores,
  loadAISMMModel,
  getOrganizationData
} from './tools/api-client.js';

// Export config
export { config, getMaturityLevel, getMaturityLevelName } from './config/index.js';

// Export types
export type {
  Organization,
  Assessment,
  Response,
  DomainScore,
  PillarId,
  Pillar,
  Domain,
  AISMMModel,
  DomainAnalysis,
  PillarReport,
  PrioritizedRecommendation,
  OrganizationSecurityReport,
  AgentContext,
} from './types/index.js';

// CLI functionality (only runs when executed directly)
import { 
  generateOrganizationSecurityReport, 
  formatReportAsMarkdown,
  formatReportAsJSON 
} from './agents/orchestrator.js';
import { fetchOrganizations } from './tools/api-client.js';
import { config } from './config/index.js';
import { writeFile } from 'fs/promises';
import { join } from 'path';

/**
 * Print usage information
 */
function printUsage(): void {
  console.log(`
AISMM React Agent - AI Security Maturity Evaluation

Usage:
  npm run agent -- --org <organization-id>    Analyze a specific organization
  npm run agent -- --list                     List all organizations
  npm run agent -- --help                     Show this help message

Options:
  --org, -o <id>      Organization ID to analyze
  --list, -l          List all available organizations
  --output, -out <format>   Output format: markdown, json, or both (default: markdown)
  --file, -f <path>   Save report to file
  --parallel, -p      Run pillar analyses in parallel
  --quiet, -q         Reduce output verbosity

Environment Variables:
  AISMM_API_URL       API server URL (default: http://localhost:3001)
  OLLAMA_BASE_URL     Ollama server URL (default: http://localhost:11434)
  OLLAMA_MODEL        Ollama model to use (default: llama3.2)
  OLLAMA_TEMPERATURE  Model temperature (default: 0.3)

Examples:
  npm run agent -- --list
  npm run agent -- --org abc123
  npm run agent -- --org abc123 --output json --file report.json
  npm run agent -- --org abc123 --parallel
`);
}

/**
 * List all organizations
 */
async function listOrganizations(): Promise<void> {
  console.log('\n📋 Fetching organizations...\n');
  
  try {
    const orgs = await fetchOrganizations();
    
    if (orgs.length === 0) {
      console.log('No organizations found. Create one using the AISMM web application.');
      return;
    }
    
    console.log('Available Organizations:');
    console.log('─'.repeat(80));
    console.log(
      '  ID'.padEnd(40) + 
      'Name'.padEnd(25) + 
      'Assessments'.padEnd(15)
    );
    console.log('─'.repeat(80));
    
    for (const org of orgs) {
      console.log(
        `  ${org.id.padEnd(38)}` +
        `${(org.name || 'Unnamed').substring(0, 23).padEnd(25)}` +
        `${String(org.assessment_count || 0).padEnd(15)}`
      );
    }
    
    console.log('─'.repeat(80));
    console.log(`\nTotal: ${orgs.length} organization(s)`);
    console.log('\nTo analyze an organization, run: npm run agent -- --org <organization-id>');
  } catch (error) {
    console.error('Error fetching organizations:', (error as Error).message);
    console.error('\nMake sure the AISMM API server is running at:', config.api.baseUrl);
  }
}

/**
 * Analyze an organization
 */
async function analyzeOrganization(
  orgId: string,
  options: {
    outputFormat: 'markdown' | 'json' | 'both';
    outputFile?: string;
    parallel?: boolean;
    verbose?: boolean;
  }
): Promise<void> {
  const { outputFormat, outputFile, parallel = false, verbose = true } = options;
  
  try {
    // Generate the report
    const report = await generateOrganizationSecurityReport(orgId, {
      runInParallel: parallel,
      verbose,
    });
    
    // Format output
    let output: string;
    
    if (outputFormat === 'json') {
      output = formatReportAsJSON(report);
    } else if (outputFormat === 'both') {
      const md = formatReportAsMarkdown(report);
      const json = formatReportAsJSON(report);
      output = `${md}\n\n---\n\n## Raw JSON Data\n\n\`\`\`json\n${json}\n\`\`\``;
    } else {
      output = formatReportAsMarkdown(report);
    }
    
    // Output or save
    if (outputFile) {
      const filePath = outputFile.startsWith('/') 
        ? outputFile 
        : join(process.cwd(), outputFile);
      
      await writeFile(filePath, output, 'utf-8');
      console.log(`\n📄 Report saved to: ${filePath}`);
    } else {
      console.log('\n' + '═'.repeat(80));
      console.log('                         SECURITY EVALUATION REPORT');
      console.log('═'.repeat(80) + '\n');
      console.log(output);
    }
  } catch (error) {
    console.error('\n❌ Error generating report:', (error as Error).message);
    
    if ((error as Error).message.includes('fetch')) {
      console.error('\nMake sure:');
      console.error(`  1. The AISMM API server is running at: ${config.api.baseUrl}`);
      console.error(`  2. The Ollama server is running at: ${config.ollama.baseUrl}`);
      console.error(`  3. The model "${config.ollama.model}" is available in Ollama`);
    }
    
    process.exit(1);
  }
}

/**
 * Parse command line arguments
 */
function parseArgs(args: string[]): {
  command: 'help' | 'list' | 'analyze';
  orgId?: string;
  outputFormat: 'markdown' | 'json' | 'both';
  outputFile?: string;
  parallel: boolean;
  verbose: boolean;
} {
  let command: 'help' | 'list' | 'analyze' = 'help';
  let orgId: string | undefined = undefined;
  let outputFormat: 'markdown' | 'json' | 'both' = 'markdown';
  let outputFile: string | undefined = undefined;
  let parallel = false;
  let verbose = true;
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--help':
      case '-h':
        command = 'help';
        return { command, orgId, outputFormat, outputFile, parallel, verbose };
        
      case '--list':
      case '-l':
        command = 'list';
        break;
        
      case '--org':
      case '-o':
        command = 'analyze';
        orgId = args[++i];
        break;
        
      case '--output':
      case '-out': {
        const format = args[++i];
        if (format === 'json' || format === 'markdown' || format === 'both') {
          outputFormat = format;
        }
        break;
      }
        
      case '--file':
      case '-f':
        outputFile = args[++i];
        break;
        
      case '--parallel':
      case '-p':
        parallel = true;
        break;
        
      case '--quiet':
      case '-q':
        verbose = false;
        break;
    }
  }
  
  return { command, orgId, outputFormat, outputFile, parallel, verbose };
}

/**
 * Main entry point (for CLI usage)
 */
async function main(): Promise<void> {
  console.log('\n🔐 AISMM React Agent - AI Security Maturity Evaluation\n');
  
  const args = parseArgs(process.argv.slice(2));
  
  switch (args.command) {
    case 'help':
      printUsage();
      break;
      
    case 'list':
      await listOrganizations();
      break;
      
    case 'analyze':
      if (!args.orgId) {
        console.error('❌ Organization ID is required for analysis');
        console.error('Usage: npm run agent -- --org <organization-id>');
        process.exit(1);
      }
      await analyzeOrganization(args.orgId, {
        outputFormat: args.outputFormat,
        outputFile: args.outputFile,
        parallel: args.parallel,
        verbose: args.verbose,
      });
      break;
  }
}

// Only run main when executed directly (not when imported)
const isMainModule = process.argv[1]?.includes('react_agent');
if (isMainModule) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
