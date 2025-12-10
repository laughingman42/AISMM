/**
 * Organization Dashboard Component
 * Shows assessment history and maturity trends over time
 */

import { useState, useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import clsx from 'clsx';
import api from '../api/client';
import type { Assessment, DomainScore } from '../types/assessment';
import type { AISMMDataV1 } from '../types';

interface OrganizationDashboardProps {
  organizationId: string;
  assessments: Assessment[];
  modelData: AISMMDataV1;
}

interface AssessmentWithScores extends Assessment {
  domainScores: DomainScore[];
}

interface TrendDataPoint {
  date: string;
  assessmentName: string;
  overallScore: number;
  [key: string]: string | number; // For dynamic pillar/domain keys
}

const PILLAR_COLORS: Record<string, string> = {
  security_for_ai: '#3b82f6', // blue
  ai_for_security: '#22c55e', // green
  governance_ethics: '#a855f7', // purple
};

const DOMAIN_COLORS = [
  '#3b82f6', '#22c55e', '#a855f7', '#f59e0b', '#ef4444',
  '#06b6d4', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
];

export function OrganizationDashboard({ organizationId: _organizationId, assessments, modelData }: OrganizationDashboardProps) {
  const [assessmentsWithScores, setAssessmentsWithScores] = useState<AssessmentWithScores[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'pillars' | 'domains' | 'improvements'>('overview');

  // Filter to completed assessments only
  const completedAssessments = useMemo(() => 
    assessments.filter(a => a.status === 'completed').sort(
      (a, b) => new Date(a.completed_at || a.started_at).getTime() - new Date(b.completed_at || b.started_at).getTime()
    ), [assessments]
  );

  // Load domain scores for all completed assessments
  useEffect(() => {
    const loadScores = async () => {
      if (completedAssessments.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          completedAssessments.map(async (assessment) => {
            const domainScores = await api.getDomainScores(assessment.id);
            return { ...assessment, domainScores };
          })
        );
        setAssessmentsWithScores(results);
      } catch (err) {
        console.error('Failed to load domain scores:', err);
      } finally {
        setLoading(false);
      }
    };

    loadScores();
  }, [completedAssessments]);

  // Calculate trend data for overall and pillars
  const trendData: TrendDataPoint[] = useMemo(() => {
    return assessmentsWithScores.map(assessment => {
      const date = new Date(assessment.completed_at || assessment.started_at);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      
      // Calculate pillar averages
      const pillarScores: Record<string, number[]> = {};
      assessment.domainScores.forEach(ds => {
        if (!pillarScores[ds.pillar_id]) {
          pillarScores[ds.pillar_id] = [];
        }
        pillarScores[ds.pillar_id].push(ds.maturity_level);
      });

      const pillarAverages: Record<string, number> = {};
      Object.entries(pillarScores).forEach(([pillar, scores]) => {
        pillarAverages[pillar] = scores.reduce((a, b) => a + b, 0) / scores.length;
      });

      return {
        date: formattedDate,
        assessmentName: assessment.name,
        overallScore: assessment.total_score || 0,
        ...pillarAverages,
      };
    });
  }, [assessmentsWithScores]);

  // Calculate domain-level trend data
  const domainTrendData = useMemo(() => {
    const domains = Object.keys(modelData.domains);
    
    return assessmentsWithScores.map(assessment => {
      const date = new Date(assessment.completed_at || assessment.started_at);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      
      const domainScoreMap: Record<string, number> = {};
      assessment.domainScores.forEach(ds => {
        domainScoreMap[ds.domain_id] = ds.maturity_level;
      });

      const result: Record<string, string | number> = {
        date: formattedDate,
        assessmentName: assessment.name,
      };

      domains.forEach(domain => {
        result[domain] = domainScoreMap[domain] || 0;
      });

      return result;
    });
  }, [assessmentsWithScores, modelData.domains]);

  // Get radar data organized by pillar with historical layers
  const pillarRadarData = useMemo(() => {
    if (assessmentsWithScores.length === 0) return {};
    
    const result: Record<string, Array<{
      domain: string;
      domainId: string;
      current: number;
      previous: number;
      oldest: number;
    }>> = {};

    // Get assessments: latest, previous (if exists), and oldest (if exists)
    const latest = assessmentsWithScores[assessmentsWithScores.length - 1];
    const previous = assessmentsWithScores.length > 1 ? assessmentsWithScores[assessmentsWithScores.length - 2] : null;
    const oldest = assessmentsWithScores.length > 2 ? assessmentsWithScores[0] : null;

    // Create maps for quick lookup
    const latestMap: Record<string, number> = {};
    const previousMap: Record<string, number> = {};
    const oldestMap: Record<string, number> = {};

    latest.domainScores.forEach(ds => { latestMap[ds.domain_id] = ds.maturity_level; });
    previous?.domainScores.forEach(ds => { previousMap[ds.domain_id] = ds.maturity_level; });
    oldest?.domainScores.forEach(ds => { oldestMap[ds.domain_id] = ds.maturity_level; });

    // Group by pillar
    Object.entries(modelData.domains).forEach(([domainId, domain]) => {
      const pillarId = domain.pillar;
      if (!result[pillarId]) {
        result[pillarId] = [];
      }
      result[pillarId].push({
        domain: domain.name,
        domainId,
        current: latestMap[domainId] || 0,
        previous: previousMap[domainId] || 0,
        oldest: oldestMap[domainId] || 0,
      });
    });

    return result;
  }, [assessmentsWithScores, modelData.domains]);

  // Get assessment labels for radar legend
  const radarLegendLabels = useMemo(() => {
    if (assessmentsWithScores.length === 0) return { current: '', previous: '', oldest: '' };
    
    const latest = assessmentsWithScores[assessmentsWithScores.length - 1];
    const previous = assessmentsWithScores.length > 1 ? assessmentsWithScores[assessmentsWithScores.length - 2] : null;
    const oldest = assessmentsWithScores.length > 2 ? assessmentsWithScores[0] : null;

    return {
      current: latest.name,
      previous: previous?.name || '',
      oldest: oldest?.name || '',
    };
  }, [assessmentsWithScores]);

  // Get domain bar chart data for the Domains tab
  const domainBarChartData = useMemo(() => {
    if (assessmentsWithScores.length === 0) return [];
    
    const latest = assessmentsWithScores[assessmentsWithScores.length - 1];
    return latest.domainScores.map(ds => ({
      domain: modelData.domains[ds.domain_id]?.name || ds.domain_id,
      domainId: ds.domain_id,
      pillar: ds.pillar_id,
      score: ds.maturity_level,
    })).sort((a, b) => b.score - a.score); // Sort by score descending
  }, [assessmentsWithScores, modelData.domains]);

  // Calculate improvements and regressions
  const improvements = useMemo(() => {
    if (assessmentsWithScores.length < 2) return { improved: [], regressed: [], unchanged: [] };

    const latest = assessmentsWithScores[assessmentsWithScores.length - 1];
    const previous = assessmentsWithScores[assessmentsWithScores.length - 2];

    const latestMap: Record<string, number> = {};
    const previousMap: Record<string, number> = {};

    latest.domainScores.forEach(ds => { latestMap[ds.domain_id] = ds.maturity_level; });
    previous.domainScores.forEach(ds => { previousMap[ds.domain_id] = ds.maturity_level; });

    const improved: Array<{ domain: string; change: number; current: number }> = [];
    const regressed: Array<{ domain: string; change: number; current: number }> = [];
    const unchanged: Array<{ domain: string; current: number }> = [];

    Object.keys(latestMap).forEach(domainId => {
      const current = latestMap[domainId];
      const prev = previousMap[domainId] || 0;
      const change = current - prev;
      const domainName = modelData.domains[domainId]?.name || domainId;

      if (change > 0) {
        improved.push({ domain: domainName, change, current });
      } else if (change < 0) {
        regressed.push({ domain: domainName, change, current });
      } else {
        unchanged.push({ domain: domainName, current });
      }
    });

    // Sort by change magnitude
    improved.sort((a, b) => b.change - a.change);
    regressed.sort((a, b) => a.change - b.change);

    return { improved, regressed, unchanged };
  }, [assessmentsWithScores, modelData.domains]);

  // Identify low-scoring domains (improvement areas)
  const lowScoringDomains = useMemo(() => {
    if (assessmentsWithScores.length === 0) return [];
    
    const latest = assessmentsWithScores[assessmentsWithScores.length - 1];
    return latest.domainScores
      .filter(ds => ds.maturity_level < 3)
      .map(ds => ({
        domain: modelData.domains[ds.domain_id]?.name || ds.domain_id,
        domainId: ds.domain_id,
        score: ds.maturity_level,
        pillar: modelData.pillars[ds.pillar_id]?.name || ds.pillar_id,
        description: modelData.domains[ds.domain_id]?.description || '',
      }))
      .sort((a, b) => a.score - b.score);
  }, [assessmentsWithScores, modelData]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
        Loading dashboard data...
      </div>
    );
  }

  if (completedAssessments.length === 0 || assessmentsWithScores.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <BarChart3 className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500">No completed assessments yet</p>
        <p className="text-sm text-gray-400 mt-1">Complete an assessment to see your maturity dashboard</p>
      </div>
    );
  }

  const latestAssessment = assessmentsWithScores[assessmentsWithScores.length - 1];
  if (!latestAssessment) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
        Loading assessment data...
      </div>
    );
  }
  
  const previousAssessment = assessmentsWithScores.length > 1 ? assessmentsWithScores[assessmentsWithScores.length - 2] : null;
  const overallChange = previousAssessment 
    ? (latestAssessment.total_score || 0) - (previousAssessment.total_score || 0) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Maturity Dashboard
          </h3>
          <div className="text-sm text-gray-500">
            Based on {completedAssessments.length} completed assessment{completedAssessments.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'pillars', label: 'Pillar Trends' },
            { id: 'domains', label: 'Domain Trends' },
            { id: 'improvements', label: 'Improvement Areas' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={clsx(
                "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Row 1: Summary Cards and Overall Trend */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Summary Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Latest Assessment Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {(latestAssessment.total_score || 0).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-500">Overall Score</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    Level {latestAssessment.maturity_level || 1}
                  </div>
                  <div className="text-sm text-gray-500">Maturity Level</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {overallChange > 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : overallChange < 0 ? (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    ) : (
                      <Minus className="w-5 h-5 text-gray-400" />
                    )}
                    <span className={clsx(
                      "text-2xl font-bold",
                      overallChange > 0 ? "text-green-600" : overallChange < 0 ? "text-red-600" : "text-gray-500"
                    )}>
                      {overallChange > 0 ? '+' : ''}{overallChange.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">Change from Previous</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{lowScoringDomains.length}</div>
                  <div className="text-sm text-gray-500">Improvement Areas</div>
                </div>
              </div>
            </div>

            {/* Overall Trend Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Overall Maturity Trend</h4>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                            <p className="font-medium text-gray-900">{payload[0]?.payload?.assessmentName}</p>
                            <p className="text-sm text-gray-500">{label}</p>
                            <p className="text-lg font-bold text-blue-600">
                              Score: {Number(payload[0]?.value).toFixed(2)}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="overallScore" 
                    name="Overall Score"
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6, fill: '#2563eb' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 2: Pillar Radar Charts with Historical Layers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Domain Maturity by Pillar</h4>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  {radarLegendLabels.current}
                </span>
                {radarLegendLabels.previous && (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-blue-300"></span>
                    {radarLegendLabels.previous}
                  </span>
                )}
                {radarLegendLabels.oldest && (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                    {radarLegendLabels.oldest}
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(modelData.pillars).map(([pillarId, pillar]) => (
                <div key={pillarId} className="border border-gray-100 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-2 text-center" 
                      style={{ color: PILLAR_COLORS[pillarId] }}>
                    {pillar.name}
                  </h5>
                  <ResponsiveContainer width="100%" height={220}>
                    <RadarChart data={pillarRadarData[pillarId] || []}>
                      <PolarGrid />
                      <PolarAngleAxis 
                        dataKey="domain" 
                        tick={{ fontSize: 8 }}
                        tickFormatter={(value) => value.length > 12 ? value.slice(0, 12) + '...' : value}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 8 }} tickCount={6} />
                      
                      {/* Oldest assessment layer (lightest) */}
                      {radarLegendLabels.oldest && (
                        <Radar
                          name={radarLegendLabels.oldest}
                          dataKey="oldest"
                          stroke="#d1d5db"
                          fill="#d1d5db"
                          fillOpacity={0.2}
                        />
                      )}
                      
                      {/* Previous assessment layer (medium) */}
                      {radarLegendLabels.previous && (
                        <Radar
                          name={radarLegendLabels.previous}
                          dataKey="previous"
                          stroke="#93c5fd"
                          fill="#93c5fd"
                          fillOpacity={0.3}
                        />
                      )}
                      
                      {/* Current assessment layer (darkest, on top) */}
                      <Radar
                        name={radarLegendLabels.current}
                        dataKey="current"
                        stroke={PILLAR_COLORS[pillarId]}
                        fill={PILLAR_COLORS[pillarId]}
                        fillOpacity={0.4}
                      />
                      
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0]?.payload;
                            return (
                              <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-xs">
                                <p className="font-medium text-gray-900">{data?.domain}</p>
                                <p className="text-blue-600">Current: {data?.current?.toFixed(1)}</p>
                                {data?.previous > 0 && (
                                  <p className="text-blue-400">Previous: {data?.previous?.toFixed(1)}</p>
                                )}
                                {data?.oldest > 0 && (
                                  <p className="text-gray-400">Oldest: {data?.oldest?.toFixed(1)}</p>
                                )}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pillars Tab */}
      {activeTab === 'pillars' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Pillar Maturity Trends</h4>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              {Object.entries(modelData.pillars).map(([id, pillar]) => (
                <Line
                  key={id}
                  type="monotone"
                  dataKey={id}
                  name={pillar.name}
                  stroke={PILLAR_COLORS[id] || '#6b7280'}
                  strokeWidth={2}
                  dot={{ fill: PILLAR_COLORS[id] || '#6b7280' }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>

          {/* Pillar Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {Object.entries(modelData.pillars).map(([id, pillar]) => {
              const latestScore = trendData.length > 0 ? (trendData[trendData.length - 1][id] as number) || 0 : 0;
              const previousScore = trendData.length > 1 ? (trendData[trendData.length - 2][id] as number) || 0 : latestScore;
              const change = latestScore - previousScore;
              
              return (
                <div 
                  key={id}
                  className="p-4 rounded-lg border"
                  style={{ borderColor: PILLAR_COLORS[id] || '#e5e7eb' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{pillar.name}</span>
                    {change !== 0 && (
                      <span className={clsx(
                        "text-xs px-2 py-0.5 rounded flex items-center gap-1",
                        change > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {change > 0 ? '+' : ''}{change.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold" style={{ color: PILLAR_COLORS[id] }}>
                    {latestScore.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-500">Current Maturity</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Domains Tab */}
      {activeTab === 'domains' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Domain Maturity Comparison</h4>
          
          {/* Bar chart showing all domains for latest assessment */}
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={domainBarChartData}
              layout="vertical"
              margin={{ left: 150 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis 
                type="category" 
                dataKey="domain" 
                tick={{ fontSize: 11 }}
                width={140}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0]?.payload;
                    return (
                      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-sm">
                        <p className="font-medium text-gray-900">{data?.domain}</p>
                        <p className="text-gray-500">{modelData.pillars[data?.pillar]?.name}</p>
                        <p className="text-blue-600 font-bold">Level {data?.score}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="score" 
                name="Maturity Level"
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Domain trend lines */}
          {completedAssessments.length > 1 && (
            <>
              <h4 className="text-sm font-semibold text-gray-700 mt-8 mb-4">Domain Trends Over Time</h4>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={domainTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  {Object.keys(modelData.domains).slice(0, 10).map((domainId, idx) => (
                    <Line
                      key={domainId}
                      type="monotone"
                      dataKey={domainId}
                      name={modelData.domains[domainId].name}
                      stroke={DOMAIN_COLORS[idx % DOMAIN_COLORS.length]}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      )}

      {/* Improvements Tab */}
      {activeTab === 'improvements' && (
        <div className="space-y-6">
          {/* Low Scoring Domains */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Priority Improvement Areas (Score &lt; 3)
            </h4>
            
            {lowScoringDomains.length === 0 ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-2" />
                <p className="text-gray-600">Great job! All domains are at Level 3 or above.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowScoringDomains.map(domain => (
                  <div 
                    key={domain.domainId}
                    className="p-4 bg-amber-50 border border-amber-100 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{domain.domain}</div>
                        <div className="text-sm text-gray-500 mt-0.5">{domain.pillar}</div>
                        {domain.description && (
                          <p className="text-sm text-gray-600 mt-2">{domain.description}</p>
                        )}
                      </div>
                      <span className={clsx(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        domain.score === 1 ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                      )}>
                        Level {domain.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Changes from Previous Assessment */}
          {completedAssessments.length > 1 && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Improvements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Recent Improvements
                </h4>
                
                {improvements.improved.length === 0 ? (
                  <p className="text-sm text-gray-500">No improvements since last assessment</p>
                ) : (
                  <div className="space-y-2">
                    {improvements.improved.slice(0, 5).map(item => (
                      <div key={item.domain} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-gray-900">{item.domain}</span>
                        <span className="text-sm font-medium text-green-600">+{item.change.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Regressions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  Areas Needing Attention
                </h4>
                
                {improvements.regressed.length === 0 ? (
                  <p className="text-sm text-gray-500">No regressions since last assessment</p>
                ) : (
                  <div className="space-y-2">
                    {improvements.regressed.slice(0, 5).map(item => (
                      <div key={item.domain} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-sm text-gray-900">{item.domain}</span>
                        <span className="text-sm font-medium text-red-600">{item.change.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrganizationDashboard;
