/**
 * Assessment Results Component
 * Displays assessment scores and maturity levels
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  ChevronDown, 
  ChevronUp,
  Download,
  ArrowLeft
} from 'lucide-react';
import clsx from 'clsx';
import api from '../api/client';
import type { Assessment, DomainScore, PillarScore } from '../types/assessment';
import type { AISMMDataV1 } from '../types';

interface AssessmentResultsProps {
  assessmentId: string;
  modelData: AISMMDataV1;
  onBack: () => void;
}

export function AssessmentResults({ assessmentId, modelData, onBack }: AssessmentResultsProps) {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [domainScores, setDomainScores] = useState<DomainScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPillars, setExpandedPillars] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadResults();
  }, [assessmentId]);

  const loadResults = async () => {
    try {
      setLoading(true);
      const [assessmentData, scores] = await Promise.all([
        api.getAssessment(assessmentId),
        api.getDomainScores(assessmentId),
      ]);
      setAssessment(assessmentData);
      setDomainScores(scores);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate pillar scores
  const pillarScores = useMemo((): PillarScore[] => {
    if (domainScores.length === 0) return [];

    const pillarMap = new Map<string, DomainScore[]>();
    
    domainScores.forEach(ds => {
      const existing = pillarMap.get(ds.pillar_id) || [];
      pillarMap.set(ds.pillar_id, [...existing, ds]);
    });

    return Array.from(pillarMap.entries()).map(([pillarId, scores]) => {
      const pillar = modelData.pillars[pillarId];
      const avgRaw = scores.reduce((sum, s) => sum + s.raw_score, 0) / scores.length;
      const avgWeighted = scores.reduce((sum, s) => sum + s.weighted_score, 0) / scores.length;
      
      return {
        pillar_id: pillarId,
        pillar_name: pillar?.name || pillarId,
        raw_score: avgRaw,
        weighted_score: avgWeighted,
        maturity_level: Math.round(avgRaw),
        domain_scores: scores,
      };
    });
  }, [domainScores, modelData]);

  // Get maturity level info
  const getMaturityInfo = (level: number) => {
    const levels = [
      { name: 'Initial', color: 'bg-gray-100 text-gray-800 border-gray-300' },
      { name: 'Developing', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      { name: 'Defined', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { name: 'Managed', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { name: 'Optimizing', color: 'bg-green-100 text-green-800 border-green-300' },
    ];
    return levels[Math.max(0, Math.min(level - 1, 4))];
  };

  const togglePillar = (pillarId: string) => {
    setExpandedPillars(prev => {
      const next = new Set(prev);
      if (next.has(pillarId)) {
        next.delete(pillarId);
      } else {
        next.add(pillarId);
      }
      return next;
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading results...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error: {error}
        <button onClick={loadResults} className="ml-2 text-blue-500 hover:underline">Retry</button>
      </div>
    );
  }

  if (!assessment) {
    return <div className="p-8 text-center text-gray-500">Assessment not found</div>;
  }

  const overallMaturity = getMaturityInfo(assessment.maturity_level || 1);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={() => {
            // Export functionality
            const data = JSON.stringify({ assessment, pillarScores, domainScores }, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `assessment-${assessment.id}.json`;
            a.click();
          }}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">Completed</span>
          <span>•</span>
          <span>{new Date(assessment.completed_at || assessment.started_at).toLocaleDateString()}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{assessment.name}</h2>
        <p className="text-gray-600 mb-6">{assessment.organization_name}</p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Overall Score */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
              <BarChart3 className="w-4 h-4" />
              Overall Score
            </div>
            <div className="text-4xl font-bold text-gray-900">
              {(assessment.total_score || 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-500 mt-1">out of 5.0</div>
          </div>

          {/* Maturity Level */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
              <Award className="w-4 h-4" />
              Maturity Level
            </div>
            <div className={clsx(
              "inline-flex items-center px-4 py-2 rounded-lg border text-xl font-bold",
              overallMaturity.color
            )}>
              Level {assessment.maturity_level || 1}
            </div>
            <div className="text-sm text-gray-600 mt-2">{overallMaturity.name}</div>
          </div>

          {/* Coverage */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
              <TrendingUp className="w-4 h-4" />
              Coverage
            </div>
            <div className="text-4xl font-bold text-gray-900">
              {domainScores.reduce((sum, d) => sum + d.questions_answered, 0)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              of {domainScores.reduce((sum, d) => sum + d.questions_total, 0)} questions
            </div>
          </div>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h3>
        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map(level => {
            const domainsAtLevel = domainScores.filter(d => d.maturity_level === level);
            const percentage = (domainsAtLevel.length / domainScores.length) * 100;
            const levelInfo = getMaturityInfo(level);
            
            return (
              <div key={level} className="flex items-center gap-4">
                <div className="w-24 text-sm text-gray-600">
                  Level {level} <span className="text-gray-400">({levelInfo.name})</span>
                </div>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className={clsx(
                      "h-full transition-all flex items-center justify-end px-2",
                      level === 1 ? "bg-gray-300" :
                      level === 2 ? "bg-blue-300" :
                      level === 3 ? "bg-indigo-300" :
                      level === 4 ? "bg-purple-300" :
                      "bg-green-300"
                    )}
                    style={{ width: `${percentage}%` }}
                  >
                    {percentage > 10 && (
                      <span className="text-xs font-medium text-white">{domainsAtLevel.length}</span>
                    )}
                  </div>
                </div>
                <div className="w-16 text-right text-sm text-gray-600">
                  {percentage.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pillar Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Pillar & Domain Scores</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {pillarScores.map(pillar => {
            const isExpanded = expandedPillars.has(pillar.pillar_id);
            const pillarMaturity = getMaturityInfo(pillar.maturity_level);
            
            return (
              <div key={pillar.pillar_id}>
                <button
                  onClick={() => togglePillar(pillar.pillar_id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={clsx(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm",
                      pillar.pillar_id === 'security_for_ai' ? 'bg-blue-100 text-blue-700' :
                      pillar.pillar_id === 'ai_for_security' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    )}>
                      {pillar.raw_score.toFixed(1)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{pillar.pillar_name}</div>
                      <div className="text-sm text-gray-500">
                        {pillar.domain_scores.length} domains • Level {pillar.maturity_level}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={clsx(
                      "px-3 py-1 rounded-lg text-sm font-medium border",
                      pillarMaturity.color
                    )}>
                      {pillarMaturity.name}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-4">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {pillar.domain_scores.map(ds => {
                        const domain = modelData.domains[ds.domain_id];
                        const domainMaturity = getMaturityInfo(ds.maturity_level);
                        
                        return (
                          <div key={ds.domain_id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={clsx(
                                "w-8 h-8 rounded flex items-center justify-center text-xs font-bold",
                                domainMaturity.color
                              )}>
                                {ds.raw_score.toFixed(1)}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {domain?.name || ds.domain_id}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {ds.questions_answered}/{ds.questions_total} questions
                                </div>
                              </div>
                            </div>
                            <span className={clsx(
                              "px-2 py-0.5 rounded text-xs border",
                              domainMaturity.color
                            )}>
                              Level {ds.maturity_level}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Areas</h3>
        <div className="space-y-4">
          {domainScores
            .filter(ds => ds.maturity_level < 3)
            .sort((a, b) => a.raw_score - b.raw_score)
            .slice(0, 5)
            .map(ds => {
              const domain = modelData.domains[ds.domain_id];
              return (
                <div key={ds.domain_id} className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center text-amber-700 font-bold text-sm">
                    {ds.maturity_level}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{domain?.name || ds.domain_id}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Current level: {getMaturityInfo(ds.maturity_level).name}. 
                      Consider focusing on key controls to advance to the next maturity level.
                    </div>
                    {domain?.key_controls && domain.key_controls.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Key controls to implement:</div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {domain.key_controls.slice(0, 3).map((ctrl, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-500">•</span>
                              {ctrl}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default AssessmentResults;
