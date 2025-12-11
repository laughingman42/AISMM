/**
 * AISMM Security Evaluation Orchestrator
 * Coordinates the three pillar agents and generates consolidated organization report
 */

import { runSecurityForAIAgent } from './security-for-ai-agent.js';
import { runAIForSecurityAgent } from './ai-for-security-agent.js';
import { runSecurityFromAIAgent } from './security-from-ai-agent.js';
import { fetchOrganization, loadAISMMModel, getOrganizationData } from '../tools/api-client.js';
import { getMaturityLevel, getMaturityLevelName } from '../config/index.js';
import type { 
  OrganizationSecurityReport, 
  PillarReport, 
  PrioritizedRecommendation 
} from '../types/index.js';

/**
 * Run all pillar agents and generate consolidated report
 */
export async function generateOrganizationSecurityReport(
  organizationId: string,
  options: {
    runInParallel?: boolean;
    verbose?: boolean;
  } = {}
): Promise<OrganizationSecurityReport> {
  const { runInParallel = false, verbose = true } = options;
  
  if (verbose) {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('     AISMM Security Evaluation Report Generator');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\nOrganization ID: ${organizationId}`);
    console.log('Starting comprehensive security analysis...\n');
  }
  
  // Fetch organization data
  const organization = await fetchOrganization(organizationId);
  const { assessments, allDomainScores } = await getOrganizationData(organizationId);
  
  if (verbose) {
    console.log(`📊 Organization: ${organization.name}`);
    console.log(`📋 Completed Assessments: ${assessments.length}`);
  }
  
  if (assessments.length === 0) {
    throw new Error('No completed assessments found for this organization');
  }
  
  // Run pillar agents
  let pillarResults: Array<{ rawOutput: string; structuredReport: Partial<PillarReport> }>;
  
  if (runInParallel) {
    if (verbose) console.log('\n🚀 Running pillar analyses in parallel...\n');
    
    pillarResults = await Promise.all([
      runSecurityForAIAgent(organizationId),
      runAIForSecurityAgent(organizationId),
      runSecurityFromAIAgent(organizationId),
    ]);
  } else {
    if (verbose) console.log('\n🔄 Running pillar analyses sequentially...\n');
    
    pillarResults = [];
    pillarResults.push(await runSecurityForAIAgent(organizationId));
    pillarResults.push(await runAIForSecurityAgent(organizationId));
    pillarResults.push(await runSecurityFromAIAgent(organizationId));
  }
  
  // Calculate overall metrics
  const latestAssessment = assessments.sort((a, b) => 
    new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
  )[0];
  
  const overallScore = latestAssessment.total_score || 
    (allDomainScores.length > 0 
      ? allDomainScores
          .filter(s => s.assessment_id === latestAssessment.id)
          .reduce((sum, s) => sum + s.weighted_score, 0) / 
        allDomainScores.filter(s => s.assessment_id === latestAssessment.id).length
      : 0);
  
  const overallMaturity = latestAssessment.maturity_level || getMaturityLevel(overallScore);
  
  // Generate cross-pillar insights
  const crossPillarInsights = generateCrossPillarInsights(pillarResults);
  
  // Consolidate and prioritize recommendations
  const strategicRecommendations = consolidateRecommendations(pillarResults);
  
  // Generate executive summary
  const executiveSummary = generateExecutiveSummary(
    organization.name,
    overallMaturity,
    overallScore,
    pillarResults,
    assessments.length
  );
  
  // Build the final report
  const report: OrganizationSecurityReport = {
    organization_id: organizationId,
    organization_name: organization.name,
    report_generated_at: new Date().toISOString(),
    assessments_analyzed: assessments.length,
    executive_summary: executiveSummary,
    overall_maturity_level: overallMaturity,
    overall_score: overallScore,
    pillar_reports: pillarResults.map(r => r.structuredReport) as PillarReport[],
    cross_pillar_insights: crossPillarInsights,
    strategic_recommendations: strategicRecommendations,
    maturity_trend: assessments.length > 1 ? calculateTrendDescription(assessments) : undefined,
  };
  
  if (verbose) {
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('     Report Generation Complete');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📈 Overall Maturity Level: ${overallMaturity} (${getMaturityLevelName(overallMaturity)})`);
    console.log(`📊 Overall Score: ${overallScore.toFixed(1)}%`);
    console.log(`💡 Strategic Recommendations: ${strategicRecommendations.length}`);
  }
  
  return report;
}

/**
 * Generate cross-pillar insights by analyzing common themes
 */
function generateCrossPillarInsights(
  pillarResults: Array<{ rawOutput: string; structuredReport: Partial<PillarReport> }>
): string[] {
  const insights: string[] = [];
  
  // Look for common themes across pillars
  const allImprovements = pillarResults
    .flatMap(r => r.structuredReport.areas_for_improvement || []);
  
  const allAchievements = pillarResults
    .flatMap(r => r.structuredReport.achievements || r.structuredReport.key_milestones || []);
  
  // Check for governance/policy themes
  const governanceIssues = allImprovements.filter(i => 
    i.toLowerCase().includes('governance') || 
    i.toLowerCase().includes('policy') ||
    i.toLowerCase().includes('standard')
  );
  
  if (governanceIssues.length > 1) {
    insights.push('Governance and policy frameworks need strengthening across multiple pillars - consider a unified AI governance initiative');
  }
  
  // Check for monitoring/detection themes
  const monitoringIssues = allImprovements.filter(i =>
    i.toLowerCase().includes('monitor') ||
    i.toLowerCase().includes('detect') ||
    i.toLowerCase().includes('visibility')
  );
  
  if (monitoringIssues.length > 1) {
    insights.push('Monitoring and detection capabilities show gaps across pillars - consider centralized AI security monitoring');
  }
  
  // Check for training/expertise themes
  const skillsIssues = allImprovements.filter(i =>
    i.toLowerCase().includes('training') ||
    i.toLowerCase().includes('skill') ||
    i.toLowerCase().includes('expertise')
  );
  
  if (skillsIssues.length > 0) {
    insights.push('AI security skills development is a cross-cutting priority - invest in team training and expertise building');
  }
  
  // Add insight about overall maturity balance
  const pillarSummaries = pillarResults.map(r => r.structuredReport.executive_summary || '');
  const hasImbalance = pillarSummaries.some((s, i) => {
    const level = extractMaturityFromText(s);
    return pillarSummaries.some((s2, j) => i !== j && Math.abs(level - extractMaturityFromText(s2)) >= 2);
  });
  
  if (hasImbalance) {
    insights.push('Significant maturity imbalance detected across pillars - prioritize lagging areas to achieve balanced security posture');
  }
  
  // Add general insight if we have achievements
  if (allAchievements.length > 0) {
    insights.push('Organization shows positive security maturity indicators - maintain momentum while addressing identified gaps');
  }
  
  return insights.length > 0 ? insights : [
    'Cross-pillar analysis complete - review individual pillar reports for detailed findings'
  ];
}

/**
 * Consolidate recommendations from all pillars and prioritize
 */
function consolidateRecommendations(
  pillarResults: Array<{ rawOutput: string; structuredReport: Partial<PillarReport> }>
): PrioritizedRecommendation[] {
  const allRecommendations: PrioritizedRecommendation[] = [];
  
  // Gather all recommendations
  for (const result of pillarResults) {
    const pillarRecs = result.structuredReport.prioritized_recommendations || [];
    allRecommendations.push(...pillarRecs);
  }
  
  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  allRecommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  // Take top recommendations, ensuring diversity across pillars
  const consolidated: PrioritizedRecommendation[] = [];
  const seenDomains = new Set<string>();
  
  for (const rec of allRecommendations) {
    // Add critical recommendations regardless
    if (rec.priority === 'critical' || !seenDomains.has(rec.domain)) {
      consolidated.push(rec);
      seenDomains.add(rec.domain);
      
      if (consolidated.length >= 10) break;
    }
  }
  
  return consolidated;
}

/**
 * Generate executive summary
 */
function generateExecutiveSummary(
  orgName: string,
  overallMaturity: number,
  overallScore: number,
  pillarResults: Array<{ rawOutput: string; structuredReport: Partial<PillarReport> }>,
  assessmentCount: number
): string {
  const maturityName = getMaturityLevelName(overallMaturity);
  
  let summary = `${orgName} demonstrates an overall AI security maturity level of ${overallMaturity} (${maturityName}) with a composite score of ${overallScore.toFixed(1)}%. `;
  
  if (overallMaturity >= 4) {
    summary += `The organization shows strong AI security practices with well-established processes and controls. `;
  } else if (overallMaturity === 3) {
    summary += `The organization has defined AI security processes but opportunities exist for further maturation. `;
  } else if (overallMaturity === 2) {
    summary += `AI security practices are developing but require significant investment to reach industry standards. `;
  } else {
    summary += `AI security is at an initial stage with critical gaps requiring immediate attention. `;
  }
  
  summary += `\n\nThis analysis is based on ${assessmentCount} completed assessment(s) covering all three AISMM pillars: `;
  summary += `Security for AI (protecting AI systems), AI for Security (using AI to enhance security), and Security from AI (defending against AI-enabled threats). `;
  
  // Add key highlights from each pillar
  const highlights = pillarResults
    .map(r => r.structuredReport.executive_summary?.split('.')[0])
    .filter(Boolean);
  
  if (highlights.length > 0) {
    summary += `\n\nKey pillar findings: ` + highlights.join('. ') + '.';
  }
  
  return summary;
}

/**
 * Calculate trend description from multiple assessments
 */
function calculateTrendDescription(assessments: Array<{ total_score?: number; maturity_level?: number; started_at: string }>): string {
  const sorted = [...assessments].sort((a, b) => 
    new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
  );
  
  if (sorted.length < 2) return 'Insufficient data for trend analysis';
  
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  
  const scoreChange = (last.total_score || 0) - (first.total_score || 0);
  const maturityChange = (last.maturity_level || 0) - (first.maturity_level || 0);
  
  if (scoreChange > 10 || maturityChange > 0) {
    return 'Improving - positive progress observed across assessments';
  } else if (scoreChange < -10 || maturityChange < 0) {
    return 'Declining - regression noted, requires attention';
  } else {
    return 'Stable - consistent performance across assessments';
  }
}

/**
 * Helper to extract maturity level from text (best effort)
 */
function extractMaturityFromText(text: string): number {
  const match = text.match(/level\s*(\d)/i) || text.match(/maturity[:\s]*(\d)/i);
  return match ? parseInt(match[1], 10) : 3; // Default to 3 if not found
}

/**
 * Format report as markdown
 */
export function formatReportAsMarkdown(report: OrganizationSecurityReport): string {
  let md = `# AI Security Maturity Report\n\n`;
  md += `**Organization:** ${report.organization_name}\n`;
  md += `**Report Generated:** ${new Date(report.report_generated_at).toLocaleString()}\n`;
  md += `**Assessments Analyzed:** ${report.assessments_analyzed}\n\n`;
  
  md += `## Executive Summary\n\n${report.executive_summary}\n\n`;
  
  md += `## Overall Metrics\n\n`;
  md += `| Metric | Value |\n|--------|-------|\n`;
  md += `| Overall Maturity Level | ${report.overall_maturity_level} (${getMaturityLevelName(report.overall_maturity_level)}) |\n`;
  md += `| Overall Score | ${report.overall_score.toFixed(1)}% |\n`;
  if (report.maturity_trend) {
    md += `| Maturity Trend | ${report.maturity_trend} |\n`;
  }
  md += `\n`;
  
  md += `## Pillar Analysis\n\n`;
  for (const pillar of report.pillar_reports) {
    if (!pillar) continue;
    md += `### ${pillar.pillar_name}\n\n`;
    md += `${pillar.executive_summary || 'Analysis pending'}\n\n`;
    
    if (pillar.key_milestones && pillar.key_milestones.length > 0) {
      md += `**Key Milestones:**\n`;
      for (const milestone of pillar.key_milestones) {
        md += `- ${milestone}\n`;
      }
      md += `\n`;
    }
    
    if (pillar.areas_for_improvement && pillar.areas_for_improvement.length > 0) {
      md += `**Areas for Improvement:**\n`;
      for (const area of pillar.areas_for_improvement) {
        md += `- ${area}\n`;
      }
      md += `\n`;
    }
  }
  
  md += `## Cross-Pillar Insights\n\n`;
  for (const insight of report.cross_pillar_insights) {
    md += `- ${insight}\n`;
  }
  md += `\n`;
  
  md += `## Strategic Recommendations\n\n`;
  md += `| Priority | Domain | Recommendation | Expected Impact | Effort |\n`;
  md += `|----------|--------|----------------|-----------------|--------|\n`;
  for (const rec of report.strategic_recommendations) {
    md += `| ${rec.priority.toUpperCase()} | ${rec.domain} | ${rec.recommendation} | ${rec.expected_impact} | ${rec.effort_estimate} |\n`;
  }
  
  return md;
}

/**
 * Format report as JSON
 */
export function formatReportAsJSON(report: OrganizationSecurityReport): string {
  return JSON.stringify(report, null, 2);
}
