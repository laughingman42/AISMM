import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import type { AISMMData } from './types';
import { 
  Shield, 
  CheckSquare, 
  ChevronRight, 
  Menu,
  BookOpen,
  Layers,
  ShieldCheck,
  Target
} from 'lucide-react';
import clsx from 'clsx';

function App() {
  const [data, setData] = useState<AISMMData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/aismm.yaml')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch YAML data');
        return res.text();
      })
      .then(text => {
        const parsed = yaml.load(text) as any;
        // Support both old and new structure
        const normalizedData: AISMMData = {
          aismm: parsed.aismm,
          components: parsed.components || parsed.aismm?.components || [],
          assessment_questionnaire: parsed.assessment_questionnaire || parsed.aismm?.assessment_questionnaire || { questions: [] }
        };
        setData(normalizedData);
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

  const renderContent = () => {
    if (activeSection === 'overview') {
      return (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.aismm.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{data.aismm.description}</p>
            <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              Version {data.aismm.version}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {data.components.map(comp => (
              <button 
                key={comp.id}
                onClick={() => setActiveSection(comp.id)}
                className="text-left bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono text-gray-400">{comp.id_code}</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{comp.title}</h3>
                <p className="text-gray-600 text-sm">{comp.description}</p>
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
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px]">Level 1<br/><span className="font-normal text-gray-500">Ad hoc</span></th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px]">Level 2<br/><span className="font-normal text-gray-500">Developing</span></th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px]">Level 3<br/><span className="font-normal text-gray-500">Defined</span></th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px]">Level 4<br/><span className="font-normal text-gray-500">Managed</span></th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px]">Level 5<br/><span className="font-normal text-gray-500">Optimized</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.components.map((comp, compIdx) => (
                    <React.Fragment key={comp.id}>
                      {/* Component divider row */}
                      <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t-2 border-blue-200">
                        <td colSpan={6} className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-blue-600 bg-blue-100 px-2 py-1 rounded">{comp.id_code}</span>
                            <span className="text-sm font-bold text-gray-900">{comp.title}</span>
                          </div>
                        </td>
                      </tr>
                      {/* Domain rows */}
                      {comp.domains.map((domain) => (
                        <tr key={domain.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 sticky left-0 bg-white hover:bg-gray-50 border-r border-gray-100">
                            <div className="flex flex-col">
                              <span className="text-xs font-mono text-gray-400">{domain.id_code}</span>
                              <button
                                onClick={() => setActiveSection(comp.id)}
                                className="text-sm font-medium text-gray-900 hover:text-blue-600 text-left"
                              >
                                {domain.name}
                              </button>
                            </div>
                          </td>
                          {[1, 2, 3, 4, 5].map(level => {
                            const maturityLevel = domain.maturity_levels.find(ml => ml.level === level);
                            return (
                              <td key={level} className="px-3 py-3 align-top">
                                {maturityLevel && (
                                  <div className={clsx(
                                    "text-xs p-2 rounded-lg border",
                                    level === 1 ? "bg-gray-50 border-gray-200 text-gray-700" :
                                    level === 2 ? "bg-blue-50 border-blue-200 text-blue-800" :
                                    level === 3 ? "bg-indigo-50 border-indigo-200 text-indigo-800" :
                                    level === 4 ? "bg-purple-50 border-purple-200 text-purple-800" :
                                    "bg-green-50 border-green-200 text-green-800"
                                  )}>
                                    <div className="line-clamp-3 leading-tight">
                                      {maturityLevel.description}
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
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-300"></div>
                  <span>Level 1: Ad hoc / Reactive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 border border-blue-300"></div>
                  <span>Level 2: Repeatable / Developing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 border border-indigo-300"></div>
                  <span>Level 3: Defined / Standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-100 border border-purple-300"></div>
                  <span>Level 4: Measured / Managed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 border border-green-300"></div>
                  <span>Level 5: Optimized / Adaptive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'questionnaire') {
      return (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <CheckSquare className="w-6 h-6 text-blue-600" />
              Assessment Questionnaire
            </h2>
            <p className="text-gray-600 mt-2">Standardized questions to assess maturity across all domains.</p>
          </div>

          <div className="space-y-4">
            {data.assessment_questionnaire.questions.map((q) => (
              <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-mono rounded">{q.id}</span>
                      {q.required && <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded">Required</span>}
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded capitalize">{q.type.replace('_', ' ')}</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{q.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{q.help_text}</p>
                    
                    {q.options && (
                      <div className="pl-4 border-l-2 border-gray-100 space-y-2">
                        {q.options.map(opt => (
                          <div key={opt.code} className="flex items-center gap-3 text-sm text-gray-700">
                            <span className="w-6 h-6 flex items-center justify-center bg-gray-50 rounded-full text-xs font-medium text-gray-500">{opt.code}</span>
                            <span>{opt.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const activeComponent = data.components.find(c => c.id === activeSection);
    if (activeComponent) {
      return (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{activeComponent.id_code}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeComponent.title}</h2>
            <p className="text-lg text-gray-600">{activeComponent.description}</p>
          </div>

          <div className="space-y-8">
            {activeComponent.domains.map(domain => (
              <div key={domain.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-gray-500">{domain.id_code}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{domain.name}</h3>
                  <p className="text-gray-600 mb-4">{domain.description}</p>
                  
                  {domain.mappings && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Framework Mappings</h4>
                      <div className="flex flex-wrap gap-2">
                        {domain.mappings.nist_ai_rmf && domain.mappings.nist_ai_rmf.length > 0 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 border border-blue-200 rounded text-xs">
                            <span className="font-medium text-blue-900">NIST AI RMF:</span>
                            <span className="text-blue-700">{domain.mappings.nist_ai_rmf.join(', ')}</span>
                          </div>
                        )}
                        {domain.mappings.eu_ai_act && domain.mappings.eu_ai_act.length > 0 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 border border-purple-200 rounded text-xs">
                            <span className="font-medium text-purple-900">EU AI Act:</span>
                            <span className="text-purple-700">{domain.mappings.eu_ai_act.join(', ')}</span>
                          </div>
                        )}
                        {domain.mappings.iso_42001 && domain.mappings.iso_42001.length > 0 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded text-xs">
                            <span className="font-medium text-green-900">ISO 42001:</span>
                            <span className="text-green-700">{domain.mappings.iso_42001.join(', ')}</span>
                          </div>
                        )}
                        {domain.mappings.owasp_genai && domain.mappings.owasp_genai.length > 0 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 border border-orange-200 rounded text-xs">
                            <span className="font-medium text-orange-900">OWASP GenAI:</span>
                            <span className="text-orange-700">{domain.mappings.owasp_genai.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {domain.key_controls && domain.key_controls.length > 0 && (
                  <div className="p-6 border-b border-gray-100 bg-blue-50/30">
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Key Controls</h4>
                    </div>
                    <ul className="space-y-2">
                      {domain.key_controls.map((control, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{control}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Maturity Levels</h4>
                  <div className="grid gap-4">
                    {domain.maturity_levels.map(level => (
                      <div key={level.level} className="flex gap-4 p-4 rounded-lg bg-white border border-gray-100 hover:border-blue-100 transition-colors">
                        <div className={clsx(
                          "w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm",
                          level.level === 1 ? "bg-gray-100 text-gray-600" :
                          level.level === 2 ? "bg-blue-50 text-blue-600" :
                          level.level === 3 ? "bg-indigo-50 text-indigo-600" :
                          level.level === 4 ? "bg-purple-50 text-purple-600" :
                          "bg-green-50 text-green-600"
                        )}>
                          {level.level}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 mb-1">{level.name}</h5>
                          <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                          {level.key_indicators && level.key_indicators.length > 0 && (
                            <div className="mt-2">
                              <div className="flex items-center gap-1 mb-2">
                                <Target className="w-3 h-3 text-gray-500" />
                                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Key Indicators</span>
                              </div>
                              <ul className="space-y-1 pl-4">
                                {level.key_indicators.map((indicator, idx) => (
                                  <li key={idx} className="text-xs text-gray-600 list-disc">{indicator}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
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
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <button
              onClick={() => { setActiveSection('overview'); setMobileMenuOpen(false); }}
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

            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Components
            </div>
            
            {data.components.map(comp => (
              <button
                key={comp.id}
                onClick={() => { setActiveSection(comp.id); setMobileMenuOpen(false); }}
                className={clsx(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeSection === comp.id 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Layers className="w-4 h-4" />
                {comp.title}
              </button>
            ))}

            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Tools
            </div>

            <button
              onClick={() => { setActiveSection('questionnaire'); setMobileMenuOpen(false); }}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                activeSection === 'questionnaire' 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <CheckSquare className="w-4 h-4" />
              Questionnaire
            </button>
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
    </div>
  );
}

export default App;
