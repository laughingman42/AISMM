/**
 * AI Analysis Report Component
 * Displays the AI-generated security maturity analysis report
 */

import { useState } from 'react';
import { 
  X, 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Target,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  Loader2
} from 'lucide-react';
import clsx from 'clsx';

interface PillarReport {
  pillar_id: string;
  pillar_name: string;
  executive_summary?: string;
  key_milestones?: string[];
  achievements?: string[];
  areas_for_improvement?: string[];
  prioritized_recommendations?: Array<{
    priority: string;
    domain: string;
    recommendation: string;
    expected_impact: string;
    effort_estimate: string;
  }>;
}

interface AnalysisReport {
  organization_id: string;
  organization_name: string;
  report_generated_at: string;
  assessments_analyzed: number;
  executive_summary: string;
  overall_maturity_level: number;
  overall_score: number;
  pillar_reports: PillarReport[];
  cross_pillar_insights: string[];
  strategic_recommendations: Array<{
    priority: string;
    domain: string;
    recommendation: string;
    expected_impact: string;
    effort_estimate: string;
  }>;
  maturity_trend?: string;
}

interface AIAnalysisReportProps {
  report: AnalysisReport;
  markdown: string;
  onClose: () => void;
}

const MATURITY_LEVEL_NAMES: Record<number, string> = {
  1: 'Initial',
  2: 'Developing',
  3: 'Defined',
  4: 'Managed',
  5: 'Optimizing',
};

const PRIORITY_COLORS: Record<string, string> = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200',
};

const PILLAR_ICONS: Record<string, string> = {
  security_for_ai: '🔐',
  ai_for_security: '🤖',
  security_from_ai: '🛡️',
};

export function AIAnalysisReport({ report, markdown, onClose }: AIAnalysisReportProps) {
  const [expandedPillars, setExpandedPillars] = useState<Set<string>>(new Set(['security_for_ai']));
  const [activeView, setActiveView] = useState<'structured' | 'markdown'>('structured');

  const togglePillar = (pillarId: string) => {
    const newExpanded = new Set(expandedPillars);
    if (newExpanded.has(pillarId)) {
      newExpanded.delete(pillarId);
    } else {
      newExpanded.add(pillarId);
    }
    setExpandedPillars(newExpanded);
  };

  const downloadReport = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.organization_name.replace(/\s+/g, '_')}_AI_Security_Report_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getMaturityColor = (level: number) => {
    if (level >= 4) return 'text-green-600 bg-green-50';
    if (level >= 3) return 'text-blue-600 bg-blue-50';
    if (level >= 2) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Security Analysis Report</h2>
              <p className="text-sm text-gray-500">
                {report.organization_name} • Generated {new Date(report.report_generated_at).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex border-b border-gray-200 px-6 flex-shrink-0">
          <button
            onClick={() => setActiveView('structured')}
            className={clsx(
              "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center gap-2",
              activeView === 'structured'
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            <Target className="w-4 h-4" />
            Structured View
          </button>
          <button
            onClick={() => setActiveView('markdown')}
            className={clsx(
              "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center gap-2",
              activeView === 'markdown'
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            <FileText className="w-4 h-4" />
            Full Report
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeView === 'structured' ? (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={clsx(
                  "rounded-xl p-4 border",
                  getMaturityColor(report.overall_maturity_level)
                )}>
                  <div className="text-sm font-medium opacity-80">Overall Maturity</div>
                  <div className="text-3xl font-bold mt-1">
                    Level {report.overall_maturity_level}
                  </div>
                  <div className="text-sm mt-1">
                    {MATURITY_LEVEL_NAMES[report.overall_maturity_level] || 'Unknown'}
                  </div>
                </div>
                <div className="rounded-xl p-4 border bg-blue-50 text-blue-800 border-blue-200">
                  <div className="text-sm font-medium opacity-80">Overall Score</div>
                  <div className="text-3xl font-bold mt-1">
                    {report.overall_score.toFixed(1)}%
                  </div>
                  <div className="text-sm mt-1">Composite Score</div>
                </div>
                <div className="rounded-xl p-4 border bg-purple-50 text-purple-800 border-purple-200">
                  <div className="text-sm font-medium opacity-80">Assessments Analyzed</div>
                  <div className="text-3xl font-bold mt-1">
                    {report.assessments_analyzed}
                  </div>
                  <div className="text-sm mt-1">
                    {report.maturity_trend || 'No trend data'}
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Executive Summary
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {report.executive_summary}
                </p>
              </div>

              {/* Pillar Reports */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Pillar Analysis</h3>
                {report.pillar_reports.map((pillar) => (
                  <div 
                    key={pillar.pillar_id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => togglePillar(pillar.pillar_id)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{PILLAR_ICONS[pillar.pillar_id] || '📊'}</span>
                        <span className="font-semibold text-gray-900">{pillar.pillar_name}</span>
                      </div>
                      {expandedPillars.has(pillar.pillar_id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedPillars.has(pillar.pillar_id) && (
                      <div className="p-4 space-y-4">
                        {pillar.executive_summary && (
                          <p className="text-gray-600 text-sm">{pillar.executive_summary}</p>
                        )}
                        
                        {pillar.key_milestones && pillar.key_milestones.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Key Milestones
                            </h4>
                            <ul className="space-y-1">
                              {pillar.key_milestones.map((milestone, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-green-500 mt-1">•</span>
                                  {milestone}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {pillar.areas_for_improvement && pillar.areas_for_improvement.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              Areas for Improvement
                            </h4>
                            <ul className="space-y-1">
                              {pillar.areas_for_improvement.map((area, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-yellow-500 mt-1">•</span>
                                  {area}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {pillar.prioritized_recommendations && pillar.prioritized_recommendations.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-blue-500" />
                              Recommendations
                            </h4>
                            <div className="space-y-2">
                              {pillar.prioritized_recommendations.slice(0, 5).map((rec, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm">
                                  <span className={clsx(
                                    "px-2 py-0.5 rounded text-xs font-medium border",
                                    PRIORITY_COLORS[rec.priority] || PRIORITY_COLORS.medium
                                  )}>
                                    {rec.priority.toUpperCase()}
                                  </span>
                                  <span className="text-gray-600">{rec.recommendation}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Cross-Pillar Insights */}
              {report.cross_pillar_insights && report.cross_pillar_insights.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Cross-Pillar Insights
                  </h3>
                  <ul className="space-y-2">
                    {report.cross_pillar_insights.map((insight, idx) => (
                      <li key={idx} className="text-blue-800 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">💡</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Strategic Recommendations */}
              {report.strategic_recommendations && report.strategic_recommendations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    Strategic Recommendations
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-3 font-semibold text-gray-700">Priority</th>
                          <th className="text-left p-3 font-semibold text-gray-700">Domain</th>
                          <th className="text-left p-3 font-semibold text-gray-700">Recommendation</th>
                          <th className="text-left p-3 font-semibold text-gray-700">Impact</th>
                          <th className="text-left p-3 font-semibold text-gray-700">Effort</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.strategic_recommendations.map((rec, idx) => (
                          <tr key={idx} className="border-t border-gray-100">
                            <td className="p-3">
                              <span className={clsx(
                                "px-2 py-1 rounded text-xs font-medium border",
                                PRIORITY_COLORS[rec.priority] || PRIORITY_COLORS.medium
                              )}>
                                {rec.priority.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-3 text-gray-600">{rec.domain}</td>
                            <td className="p-3 text-gray-800">{rec.recommendation}</td>
                            <td className="p-3 text-gray-600">{rec.expected_impact}</td>
                            <td className="p-3 text-gray-600 capitalize">{rec.effort_estimate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Markdown View */
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg overflow-x-auto">
                {markdown}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading/Running state component
export function AIAnalysisLoading({ onCancel }: { onCancel?: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Brain className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">AI Analysis in Progress</h2>
        <p className="text-gray-500 mb-6">
          Our AI agents are analyzing your organization's security maturity across all three pillars...
        </p>
        <div className="flex items-center justify-center gap-3 text-sm text-gray-600 mb-6">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span>This may take 1-2 minutes</span>
        </div>
        <div className="space-y-2 text-left bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <span>🔐</span>
            <span className="text-gray-600">Analyzing Security for AI...</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>🤖</span>
            <span className="text-gray-600">Analyzing AI for Security...</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>🛡️</span>
            <span className="text-gray-600">Analyzing Security from AI...</span>
          </div>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

// Error state component
export function AIAnalysisError({ 
  error, 
  onRetry, 
  onClose 
}: { 
  error: string; 
  onRetry?: () => void; 
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Analysis Failed</h2>
        <p className="text-gray-500 mb-4">
          {error}
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Make sure Ollama is running with the configured model available.
        </p>
        <div className="flex gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
