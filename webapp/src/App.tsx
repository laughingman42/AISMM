import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import type { AISMMDataV1, Domain } from './types';
import { 
  Shield, 
  ChevronRight, 
  Menu,
  BookOpen,
  Layers,
  ShieldCheck,
  Target,
  ClipboardList
} from 'lucide-react';
import clsx from 'clsx';
import AssessmentHub from './components/AssessmentHub';

function App() {
  const [data, setData] = useState<AISMMDataV1 | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/aismm.yaml')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch YAML data');
        return res.text();
      })
      .then(text => {
        const parsed = yaml.load(text) as AISMMDataV1;
        setData(parsed);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-600">Loading AISMM Model...</div>;
  if (error) return <div className="flex items-center justify-center h-screen bg-red-50 text-red-600">Error: {error}</div>;
  if (!data) return null;

  // Helper functions
  const getDomainsByPillar = (): Record<string, Domain[]> => {
    const grouped: Record<string, Domain[]> = {};
    Object.values(data.domains).forEach(domain => {
      if (!grouped[domain.pillar]) {
        grouped[domain.pillar] = [];
      }
      grouped[domain.pillar].push(domain);
    });
    return grouped;
  };

  const getUniqueFrameworks = (domain: Domain): string[] => {
    const frameworks = new Set<string>();
    domain.framework_alignment?.forEach(fa => {
      Object.keys(fa.frameworks).forEach(f => {
        const refs = fa.frameworks[f];
        if (refs && refs.length > 0) {
          frameworks.add(f);
        }
      });
    });
    return Array.from(frameworks);
  };

  const getFrameworkRefs = (domain: Domain, framework: string): string[] => {
    const refs: string[] = [];
    domain.framework_alignment?.forEach(fa => {
      const items = fa.frameworks[framework];
      if (items) {
        refs.push(...items);
      }
    });
    return [...new Set(refs)];
  };

  const FRAMEWORK_DISPLAY_NAMES: Record<string, string> = {
    nist_ai_rmf: 'NIST AI RMF',
    iso_27001: 'ISO 27001',
    iso_42001: 'ISO 42001',
    eu_ai_act: 'EU AI Act',
    nist_csf: 'NIST CSF',
    soc2_security: 'SOC 2',
    nist_ssdf: 'NIST SSDF',
    owasp_asvs: 'OWASP ASVS',
    mitre_atlas: 'MITRE ATLAS',
    owasp_genai: 'OWASP GenAI',
  };

  const FRAMEWORK_COLORS: Record<string, string> = {
    nist_ai_rmf: 'bg-blue-50 border-blue-200 text-blue-800',
    iso_27001: 'bg-purple-50 border-purple-200 text-purple-800',
    iso_42001: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    eu_ai_act: 'bg-amber-50 border-amber-200 text-amber-800',
    nist_csf: 'bg-cyan-50 border-cyan-200 text-cyan-800',
    soc2_security: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    nist_ssdf: 'bg-teal-50 border-teal-200 text-teal-800',
    owasp_asvs: 'bg-orange-50 border-orange-200 text-orange-800',
    mitre_atlas: 'bg-red-50 border-red-200 text-red-800',
    owasp_genai: 'bg-pink-50 border-pink-200 text-pink-800',
  };

  const domainsByPillar = getDomainsByPillar();
  const pillarList = Object.values(data.pillars);

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.name}</h2>
        <p className="text-lg text-gray-600 leading-relaxed">{data.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            Version {data.version}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
            {Object.keys(data.domains).length} Domains
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium">
            {Object.keys(data.pillars).length} Pillars
          </span>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {pillarList.map(pillar => (
          <button 
            key={pillar.id}
            onClick={() => setActiveSection(pillar.id)}
            className="text-left bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={clsx(
                "text-sm font-mono px-2 py-1 rounded",
                pillar.id === 'security_for_ai' ? "bg-blue-50 text-blue-600" :
                pillar.id === 'ai_for_security' ? "bg-green-50 text-green-600" :
                "bg-purple-50 text-purple-600"
              )}>{domainsByPillar[pillar.id]?.length || 0} domains</span>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{pillar.name}</h3>
            <p className="text-gray-600 text-sm">{pillar.description}</p>
          </button>
        ))}
      </div>

      {/* Maturity Level Overview Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900">Maturity Levels Overview</h3>
          <p className="text-sm text-gray-600 mt-1">Summary of all domains and their maturity progression</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 min-w-[200px]">Domain</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[150px]">Level 1<br/><span className="font-normal text-gray-500">Initial</span></th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[150px]">Level 2<br/><span className="font-normal text-gray-500">Developing</span></th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[150px]">Level 3<br/><span className="font-normal text-gray-500">Defined</span></th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[150px]">Level 4<br/><span className="font-normal text-gray-500">Managed</span></th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[150px]">Level 5<br/><span className="font-normal text-gray-500">Optimizing</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pillarList.map((pillar) => (
                <React.Fragment key={pillar.id}>
                  {/* Pillar divider row */}
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t-2 border-blue-200">
                    <td colSpan={6} className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={clsx(
                          "text-xs font-mono px-2 py-1 rounded",
                          pillar.id === 'security_for_ai' ? "bg-blue-100 text-blue-700" :
                          pillar.id === 'ai_for_security' ? "bg-green-100 text-green-700" :
                          "bg-purple-100 text-purple-700"
                        )}>{pillar.id}</span>
                        <span className="text-sm font-bold text-gray-900">{pillar.name}</span>
                      </div>
                    </td>
                  </tr>
                  {/* Domain rows */}
                  {(domainsByPillar[pillar.id] || []).map((domain) => (
                    <tr key={domain.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 sticky left-0 bg-white hover:bg-gray-50 border-r border-gray-100">
                        <button
                          onClick={() => { setActiveSection(pillar.id); setActiveDomain(domain.id); }}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600 text-left"
                        >
                          {domain.name}
                        </button>
                      </td>
                      {['level_1', 'level_2', 'level_3', 'level_4', 'level_5'].map((levelKey, idx) => {
                        const level = domain.levels[levelKey];
                        return (
                          <td key={levelKey} className="px-3 py-3 align-top">
                            {level && (
                              <div className={clsx(
                                "text-xs p-2 rounded-lg border",
                                idx === 0 ? "bg-gray-50 border-gray-200 text-gray-700" :
                                idx === 1 ? "bg-blue-50 border-blue-200 text-blue-800" :
                                idx === 2 ? "bg-indigo-50 border-indigo-200 text-indigo-800" :
                                idx === 3 ? "bg-purple-50 border-purple-200 text-purple-800" :
                                "bg-green-50 border-green-200 text-green-800"
                              )}>
                                <div className="font-medium mb-1">{level.name}</div>
                                <div className="line-clamp-2 leading-tight opacity-80">
                                  {level.description}
                                </div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPillar = (pillarId: string) => {
    const pillar = data.pillars[pillarId];
    if (!pillar) return <div>Pillar not found</div>;

    const domains = domainsByPillar[pillarId] || [];

    return (
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <span className={clsx(
              "text-sm font-mono px-2 py-1 rounded",
              pillarId === 'security_for_ai' ? "bg-blue-50 text-blue-600" :
              pillarId === 'ai_for_security' ? "bg-green-50 text-green-600" :
              "bg-purple-50 text-purple-600"
            )}>{domains.length} domains</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{pillar.name}</h2>
          <p className="text-lg text-gray-600">{pillar.description}</p>
        </div>

        <div className="space-y-6">
          {domains.map(domain => (
            <div 
              key={domain.id} 
              id={domain.id}
              className={clsx(
                "bg-white rounded-xl shadow-sm border overflow-hidden transition-all",
                activeDomain === domain.id ? "border-blue-300 ring-2 ring-blue-100" : "border-gray-100"
              )}
            >
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{domain.id}</span>
                  {domain.weight && (
                    <span className="text-xs text-gray-500">Weight: {domain.weight}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{domain.name}</h3>
                <p className="text-gray-600 mb-4">{domain.description}</p>
                
                {/* Framework Mappings */}
                {domain.framework_alignment && domain.framework_alignment.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Framework Mappings</h4>
                    <div className="flex flex-wrap gap-2">
                      {getUniqueFrameworks(domain).map(framework => {
                        const refs = getFrameworkRefs(domain, framework);
                        const displayName = FRAMEWORK_DISPLAY_NAMES[framework] || framework;
                        const colorClass = FRAMEWORK_COLORS[framework] || 'bg-gray-50 border-gray-200 text-gray-800';
                        return (
                          <div key={framework} className={clsx("flex items-center gap-1 px-2 py-1 border rounded text-xs", colorClass)}>
                            <span className="font-medium">{displayName}:</span>
                            <span className="opacity-80">{refs.slice(0, 3).join(', ')}{refs.length > 3 && ` +${refs.length - 3}`}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Maturity Levels */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Maturity Levels</h4>
                <div className="grid gap-4">
                  {['level_1', 'level_2', 'level_3', 'level_4', 'level_5'].map((levelKey, idx) => {
                    const level = domain.levels[levelKey];
                    if (!level) return null;
                    return (
                      <div key={levelKey} className="flex gap-4 p-4 rounded-lg bg-white border border-gray-100 hover:border-blue-100 transition-colors">
                        <div className={clsx(
                          "w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm",
                          idx === 0 ? "bg-gray-100 text-gray-600" :
                          idx === 1 ? "bg-blue-50 text-blue-600" :
                          idx === 2 ? "bg-indigo-50 text-indigo-600" :
                          idx === 3 ? "bg-purple-50 text-purple-600" :
                          "bg-green-50 text-green-600"
                        )}>
                          {level.score_value}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 mb-1">{level.name}</h5>
                          <p className="text-sm text-gray-600">{level.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Controls */}
              {domain.key_controls && domain.key_controls.length > 0 && (
                <div className="p-6 border-b border-gray-100 bg-blue-50/30">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Key Controls</h4>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {domain.key_controls.map((control, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{control}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Indicators */}
              {domain.indicators && domain.indicators.indicators && (
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Indicators</h4>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {domain.indicators.indicators.map((indicator, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-indigo-500 mt-1">→</span>
                        <span>{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Success Criteria */}
              {domain.indicators && domain.indicators.success_criteria && (
                <div className="p-6 border-b border-gray-100 bg-amber-50/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-amber-600" />
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Success Criteria</h4>
                  </div>
                  <ul className="space-y-2">
                    {domain.indicators.success_criteria.map((criterion, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeSection === 'overview') {
      return renderOverview();
    }

    // Check if it's the assessment section
    if (activeSection === 'assessment') {
      return <AssessmentHub modelData={data} />;
    }

    // Check if it's a pillar
    if (data.pillars[activeSection]) {
      return renderPillar(activeSection);
    }

    return <div>Section not found</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
              <Shield className="w-6 h-6 text-blue-600" />
              <span>AISMM</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">v{data.version}</div>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <button
              onClick={() => { setActiveSection('overview'); setActiveDomain(null); setMobileMenuOpen(false); }}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                activeSection === 'overview' 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <BookOpen className="w-4 h-4" />
              Overview
            </button>

            <button
              onClick={() => { setActiveSection('assessment'); setActiveDomain(null); setMobileMenuOpen(false); }}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                activeSection === 'assessment' 
                  ? "bg-green-50 text-green-700" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <ClipboardList className="w-4 h-4" />
              Assessment
            </button>

            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Pillars
            </div>
            
            {pillarList.map(pillar => (
              <div key={pillar.id}>
                <button
                  onClick={() => { setActiveSection(pillar.id); setActiveDomain(null); setMobileMenuOpen(false); }}
                  className={clsx(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeSection === pillar.id 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Layers className="w-4 h-4" />
                  <span className="truncate">{pillar.name}</span>
                  <span className="ml-auto text-xs text-gray-400">{domainsByPillar[pillar.id]?.length || 0}</span>
                </button>
                
                {/* Show domains under active pillar */}
                {activeSection === pillar.id && (
                  <div className="ml-4 mt-1 space-y-1">
                    {(domainsByPillar[pillar.id] || []).map(domain => (
                      <button
                        key={domain.id}
                        onClick={() => {
                          setActiveDomain(domain.id);
                          // Scroll to domain
                          setTimeout(() => {
                            document.getElementById(domain.id)?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className={clsx(
                          "w-full text-left px-3 py-1.5 rounded text-xs transition-colors",
                          activeDomain === domain.id 
                            ? "bg-blue-100 text-blue-700" 
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {domain.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="font-bold text-gray-900">AISMM</div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
