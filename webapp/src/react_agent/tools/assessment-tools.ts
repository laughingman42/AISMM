/**
 * LangChain Tools for AISMM Assessment Analysis
 * These tools are used by the pillar agents to fetch and analyze assessment data
 */

import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { 
  fetchOrganization, 
  fetchAssessments, 
  loadAISMMModel,
  getOrganizationData 
} from './api-client.js';
import type { PillarId, Response as AssessmentResponse } from '../types/index.js';
import { getMaturityLevelName } from '../config/index.js';

/**
 * Tool to get organization overview
 */
export const getOrganizationOverviewTool = tool(
  async ({ organizationId }: { organizationId: string }) => {
    try {
      const org = await fetchOrganization(organizationId);
      const assessments = org.assessments || await fetchAssessments(organizationId);
      
      const completedAssessments = assessments.filter(a => a.status === 'completed');
      const latestAssessment = completedAssessments.length > 0 
        ? completedAssessments.sort((a, b) => 
            new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
          )[0] 
        : null;
      
      return JSON.stringify({
        organization: {
          id: org.id,
          name: org.name,
          description: org.description,
          industry: org.industry,
          size: org.size,
        },
        assessment_summary: {
          total_assessments: assessments.length,
          completed_assessments: completedAssessments.length,
          latest_assessment: latestAssessment ? {
            id: latestAssessment.id,
            name: latestAssessment.name,
            completed_at: latestAssessment.completed_at,
            total_score: latestAssessment.total_score,
            maturity_level: latestAssessment.maturity_level,
          } : null,
        },
      }, null, 2);
    } catch (error) {
      return `Error fetching organization: ${(error as Error).message}`;
    }
  },
  {
    name: 'get_organization_overview',
    description: 'Get an overview of the organization including basic info and assessment summary',
    schema: z.object({
      organizationId: z.string().describe('The ID of the organization to analyze'),
    }),
  }
);

/**
 * Tool to get pillar-specific domain scores
 */
export const getPillarDomainScoresTool = tool(
  async ({ organizationId, pillarId }: { organizationId: string; pillarId: PillarId }) => {
    try {
      const { assessments, allDomainScores } = await getOrganizationData(organizationId);
      const model = await loadAISMMModel();
      
      // Filter domains by pillar
      const pillarDomains = Object.entries(model.domains)
        .filter(([_, domain]) => domain.pillar === pillarId)
        .map(([domainId, domain]) => ({ domainId, ...domain }));
      
      const pillarDomainIds = pillarDomains.map(d => d.domainId);
      
      // Get scores for this pillar's domains from all assessments
      const pillarScores = allDomainScores.filter(s => pillarDomainIds.includes(s.domain_id));
      
      // Group by domain and calculate averages across assessments
      const domainAnalysis = pillarDomains.map(domain => {
        const domainScores = pillarScores.filter(s => s.domain_id === domain.domainId);
        const avgRawScore = domainScores.length > 0
          ? domainScores.reduce((sum, s) => sum + s.raw_score, 0) / domainScores.length
          : 0;
        const avgMaturityLevel = domainScores.length > 0
          ? Math.round(domainScores.reduce((sum, s) => sum + s.maturity_level, 0) / domainScores.length)
          : 0;
        
        // Track progression if multiple assessments
        const progression = domainScores
          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
          .map(s => ({
            assessment_id: s.assessment_id,
            score: s.raw_score,
            maturity_level: s.maturity_level,
            created_at: s.created_at,
          }));
        
        return {
          domain_id: domain.domainId,
          domain_name: domain.name,
          domain_description: domain.description,
          weight: domain.weight,
          key_controls: domain.key_controls || [],
          average_raw_score: avgRawScore,
          average_maturity_level: avgMaturityLevel,
          maturity_level_name: getMaturityLevelName(avgMaturityLevel),
          assessments_count: domainScores.length,
          progression,
        };
      });
      
      // Calculate pillar-level statistics
      const validDomains = domainAnalysis.filter(d => d.assessments_count > 0);
      const pillarAvgScore = validDomains.length > 0
        ? validDomains.reduce((sum, d) => sum + d.average_raw_score, 0) / validDomains.length
        : 0;
      const pillarAvgMaturity = validDomains.length > 0
        ? Math.round(validDomains.reduce((sum, d) => sum + d.average_maturity_level, 0) / validDomains.length)
        : 0;
      
      return JSON.stringify({
        pillar: {
          id: pillarId,
          name: model.pillars[pillarId]?.name || pillarId,
          description: model.pillars[pillarId]?.description || '',
          weight: model.pillars[pillarId]?.weight || 1.0,
        },
        pillar_statistics: {
          total_domains: pillarDomains.length,
          assessed_domains: validDomains.length,
          average_score: pillarAvgScore,
          average_maturity_level: pillarAvgMaturity,
          maturity_level_name: getMaturityLevelName(pillarAvgMaturity),
        },
        domain_analyses: domainAnalysis,
        assessments_analyzed: assessments.length,
      }, null, 2);
    } catch (error) {
      return `Error fetching pillar domain scores: ${(error as Error).message}`;
    }
  },
  {
    name: 'get_pillar_domain_scores',
    description: 'Get detailed domain scores for a specific pillar (security_for_ai, ai_for_security, or security_from_ai)',
    schema: z.object({
      organizationId: z.string().describe('The ID of the organization to analyze'),
      pillarId: z.enum(['security_for_ai', 'ai_for_security', 'security_from_ai'])
        .describe('The pillar to analyze'),
    }),
  }
);

/**
 * Tool to get detailed responses for a domain
 */
export const getDomainResponsesTool = tool(
  async ({ organizationId, domainId }: { organizationId: string; domainId: string }) => {
    try {
      const { allResponses } = await getOrganizationData(organizationId);
      const model = await loadAISMMModel();
      
      const domain = model.domains[domainId];
      if (!domain) {
        return `Domain not found: ${domainId}`;
      }
      
      // Filter responses for this domain
      const domainResponses = allResponses.filter(r => r.domain_id === domainId);
      
      // Group by question
      const questionGroups: Record<string, AssessmentResponse[]> = {};
      for (const response of domainResponses) {
        if (!questionGroups[response.question_id]) {
          questionGroups[response.question_id] = [];
        }
        questionGroups[response.question_id].push(response);
      }
      
      // Analyze each question's responses
      const questionAnalysis = Object.entries(questionGroups).map(([questionId, responses]) => {
        const latestResponse = responses.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )[0];
        
        const scores = responses.filter(r => r.score != null).map(r => r.score!);
        const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
        
        return {
          question_id: questionId,
          responses_count: responses.length,
          latest_response: {
            value: latestResponse.response_value,
            text: latestResponse.response_text,
            score: latestResponse.score,
            updated_at: latestResponse.updated_at,
          },
          average_score: avgScore,
          trend: responses.length > 1 ? calculateTrend(scores) : 'insufficient_data',
        };
      });
      
      return JSON.stringify({
        domain: {
          id: domainId,
          name: domain.name,
          description: domain.description,
          pillar: domain.pillar,
          key_controls: domain.key_controls || [],
        },
        response_summary: {
          total_questions_answered: Object.keys(questionGroups).length,
          total_responses: domainResponses.length,
        },
        question_analyses: questionAnalysis,
      }, null, 2);
    } catch (error) {
      return `Error fetching domain responses: ${(error as Error).message}`;
    }
  },
  {
    name: 'get_domain_responses',
    description: 'Get detailed question responses for a specific domain to understand specific areas of strength and weakness',
    schema: z.object({
      organizationId: z.string().describe('The ID of the organization to analyze'),
      domainId: z.string().describe('The domain ID to get responses for'),
    }),
  }
);

/**
 * Tool to get maturity trend analysis
 */
export const getMaturityTrendTool = tool(
  async ({ organizationId }: { organizationId: string }) => {
    try {
      const { assessments, allDomainScores } = await getOrganizationData(organizationId);
      
      if (assessments.length < 2) {
        return JSON.stringify({
          trend_available: false,
          message: 'At least 2 completed assessments are required for trend analysis',
          assessments_count: assessments.length,
        });
      }
      
      // Sort assessments by date
      const sortedAssessments = assessments.sort((a, b) => 
        new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
      );
      
      // Calculate overall progression
      const assessmentProgression = sortedAssessments.map(assessment => {
        const scores = allDomainScores.filter(s => s.assessment_id === assessment.id);
        const avgScore = scores.length > 0
          ? scores.reduce((sum, s) => sum + s.raw_score, 0) / scores.length
          : 0;
        const avgMaturity = scores.length > 0
          ? scores.reduce((sum, s) => sum + s.maturity_level, 0) / scores.length
          : 0;
        
        return {
          assessment_id: assessment.id,
          assessment_name: assessment.name,
          date: assessment.started_at,
          average_score: avgScore,
          average_maturity: avgMaturity,
          total_score: assessment.total_score,
          maturity_level: assessment.maturity_level,
        };
      });
      
      // Calculate improvement
      const first = assessmentProgression[0];
      const latest = assessmentProgression[assessmentProgression.length - 1];
      const scoreChange = latest.average_score - first.average_score;
      const maturityChange = latest.average_maturity - first.average_maturity;
      
      return JSON.stringify({
        trend_available: true,
        assessments_count: assessments.length,
        time_span: {
          first_assessment: first.date,
          latest_assessment: latest.date,
        },
        progression: assessmentProgression,
        improvement_summary: {
          score_change: scoreChange,
          score_trend: scoreChange > 0 ? 'improving' : scoreChange < 0 ? 'declining' : 'stable',
          maturity_change: maturityChange,
          maturity_trend: maturityChange > 0 ? 'improving' : maturityChange < 0 ? 'declining' : 'stable',
        },
      }, null, 2);
    } catch (error) {
      return `Error analyzing maturity trend: ${(error as Error).message}`;
    }
  },
  {
    name: 'get_maturity_trend',
    description: 'Analyze the maturity trend across multiple assessments to understand progress over time',
    schema: z.object({
      organizationId: z.string().describe('The ID of the organization to analyze'),
    }),
  }
);

/**
 * Tool to identify gaps and prioritize recommendations
 */
export const identifyGapsTool = tool(
  async ({ organizationId, pillarId }: { organizationId: string; pillarId?: PillarId }) => {
    try {
      const { allDomainScores, assessments } = await getOrganizationData(organizationId);
      const model = await loadAISMMModel();
      
      // Get latest assessment's scores
      const latestAssessment = assessments.sort((a, b) => 
        new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
      )[0];
      
      if (!latestAssessment) {
        return JSON.stringify({
          error: 'No completed assessments found',
        });
      }
      
      const latestScores = allDomainScores.filter(s => s.assessment_id === latestAssessment.id);
      
      // Filter by pillar if specified
      const relevantScores = pillarId
        ? latestScores.filter(s => s.pillar_id === pillarId)
        : latestScores;
      
      // Identify gaps (low maturity domains)
      const gaps = relevantScores
        .map(score => {
          const domain = model.domains[score.domain_id];
          return {
            domain_id: score.domain_id,
            domain_name: domain?.name || score.domain_id,
            pillar_id: score.pillar_id,
            pillar_name: model.pillars[score.pillar_id as PillarId]?.name || score.pillar_id,
            maturity_level: score.maturity_level,
            maturity_name: getMaturityLevelName(score.maturity_level),
            raw_score: score.raw_score,
            weight: domain?.weight || 1.0,
            key_controls: domain?.key_controls || [],
            priority_score: (5 - score.maturity_level) * (domain?.weight || 1.0),
          };
        })
        .sort((a, b) => b.priority_score - a.priority_score);
      
      // Categorize by priority
      const critical = gaps.filter(g => g.maturity_level <= 1);
      const high = gaps.filter(g => g.maturity_level === 2);
      const medium = gaps.filter(g => g.maturity_level === 3);
      const low = gaps.filter(g => g.maturity_level >= 4);
      
      return JSON.stringify({
        assessment_info: {
          id: latestAssessment.id,
          name: latestAssessment.name,
          date: latestAssessment.started_at,
        },
        pillar_filter: pillarId || 'all',
        gap_analysis: {
          critical_gaps: critical,
          high_priority_gaps: high,
          medium_priority_gaps: medium,
          mature_domains: low,
        },
        summary: {
          total_domains_analyzed: gaps.length,
          critical_count: critical.length,
          high_count: high.length,
          medium_count: medium.length,
          mature_count: low.length,
        },
      }, null, 2);
    } catch (error) {
      return `Error identifying gaps: ${(error as Error).message}`;
    }
  },
  {
    name: 'identify_gaps',
    description: 'Identify security gaps and prioritize domains for improvement based on maturity levels',
    schema: z.object({
      organizationId: z.string().describe('The ID of the organization to analyze'),
      pillarId: z.enum(['security_for_ai', 'ai_for_security', 'security_from_ai']).optional()
        .describe('Optional: Filter by specific pillar'),
    }),
  }
);

// Helper function to calculate trend
function calculateTrend(scores: number[]): string {
  if (scores.length < 2) return 'insufficient_data';
  const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
  const secondHalf = scores.slice(Math.floor(scores.length / 2));
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  if (secondAvg > firstAvg + 0.5) return 'improving';
  if (secondAvg < firstAvg - 0.5) return 'declining';
  return 'stable';
}

// Export all tools as an array
export const assessmentTools = [
  getOrganizationOverviewTool,
  getPillarDomainScoresTool,
  getDomainResponsesTool,
  getMaturityTrendTool,
  identifyGapsTool,
];
