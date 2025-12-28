/**
 * Assessment Form Component
 * Renders the questionnaire with all question types and handles responses
 */

import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Save, Check, AlertCircle, HelpCircle } from 'lucide-react';
import clsx from 'clsx';
import api from '../api/client';
import type { Assessment, SaveResponseRequest } from '../types/assessment';
import type { AISMMDataV1, Domain, Question } from '../types';

interface AssessmentFormProps {
  assessment: Assessment;
  modelData: AISMMDataV1;
  onComplete: () => void;
  onBack: () => void;
}

interface LocalResponse {
  domain_id: string;
  question_id: string;
  response_value?: string;
  response_index?: number;
  response_text?: string;
  score?: number;
}

export function AssessmentForm({ assessment, modelData, onComplete, onBack }: AssessmentFormProps) {
  const [responses, setResponses] = useState<Record<string, LocalResponse>>({});
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState<string | null>(null);

  // Get domains with questions
  const domainsWithQuestions = useMemo(() => {
    return Object.values(modelData.domains).filter(d => d.questions && d.questions.length > 0);
  }, [modelData]);

  const currentDomain = domainsWithQuestions[currentDomainIndex];
  const totalDomains = domainsWithQuestions.length;

  // Load existing responses
  useEffect(() => {
    const loadResponses = async () => {
      try {
        const existingResponses = await api.getResponses(assessment.id);
        const responseMap: Record<string, LocalResponse> = {};
        existingResponses.forEach(r => {
          responseMap[r.question_id] = {
            domain_id: r.domain_id,
            question_id: r.question_id,
            response_value: r.response_value || undefined,
            response_index: r.response_index ?? undefined,
            response_text: r.response_text || undefined,
            score: r.score ?? undefined,
          };
        });
        setResponses(responseMap);
      } catch (err) {
        console.error('Failed to load responses:', err);
        setError('Failed to load existing responses. Please try again.');
      }
    };
    loadResponses();
  }, [assessment.id]);

  // Calculate score for a single choice response (0-4 scale mapped to 1-5 maturity)
  const calculateScore = (questionIndex: number, optionsCount: number): number => {
    // Map 0-based index to 1-5 scale
    return Math.round((questionIndex / (optionsCount - 1)) * 4) + 1;
  };

  // Handle response change
  const handleResponseChange = (question: Question, value: string | number | string[] | boolean, domain: Domain) => {
    const questionId = question.id;
    
    const response: LocalResponse = {
      domain_id: domain.id,
      question_id: questionId,
    };

    if (question.question_type === 'single_choice' || question.question_type === 'scale') {
      const index = typeof value === 'number' ? value : parseInt(value as string, 10);
      const options = question.options || [];
      response.response_index = index;
      response.response_value = options[index] as string;
      response.score = calculateScore(index, options.length);
    } else if (question.question_type === 'multiple_choice') {
      const values = value as string[];
      response.response_value = JSON.stringify(values);
      // Score based on how many options selected (more = higher maturity)
      response.score = Math.min(5, Math.ceil((values.length / (question.options?.length || 1)) * 5));
    } else if (question.question_type === 'text') {
      response.response_text = value as string;
      response.score = undefined; // Text questions don't have automatic scores
    } else if (question.question_type === 'boolean') {
      const boolVal = value === true || value === 'true' || value === 'yes';
      response.response_value = boolVal ? 'Yes' : 'No';
      response.response_index = boolVal ? 1 : 0;
      response.score = boolVal ? 5 : 1; // Yes = high maturity, No = low maturity
    } else if (question.question_type === 'numeric') {
      const numVal = typeof value === 'number' ? value : parseFloat(value as string);
      response.response_value = String(numVal);
      response.response_text = String(numVal);
      // Score based on numeric ranges (can be customized)
      response.score = numVal === 0 ? 1 : numVal < 5 ? 2 : numVal < 10 ? 3 : numVal < 20 ? 4 : 5;
    }

    setResponses(prev => ({
      ...prev,
      [questionId]: response,
    }));
  };

  // Save current domain responses
  const saveResponses = async () => {
    if (!currentDomain) return;

    setSaving(true);
    setError(null);

    try {
      const domainResponses = currentDomain.questions
        ?.map(q => responses[q.id])
        .filter(Boolean) as SaveResponseRequest[];

      if (domainResponses.length > 0) {
        await api.saveResponses(assessment.id, domainResponses);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  // Navigate to next domain
  const goNext = async () => {
    await saveResponses();
    if (currentDomainIndex < totalDomains - 1) {
      setCurrentDomainIndex(i => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigate to previous domain
  const goPrev = async () => {
    await saveResponses();
    if (currentDomainIndex > 0) {
      setCurrentDomainIndex(i => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Complete assessment
  const handleComplete = async () => {
    await saveResponses();
    
    // Calculate and save domain scores
    const domainScores = domainsWithQuestions.map(domain => {
      const domainResponses = domain.questions?.map(q => responses[q.id]).filter(Boolean) || [];
      const scores = domainResponses.map(r => r.score).filter((s): s is number => s !== undefined);
      const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      
      return {
        domain_id: domain.id,
        pillar_id: domain.pillar,
        raw_score: avgScore,
        weighted_score: avgScore * (domain.weight || 1),
        maturity_level: Math.round(avgScore),
        questions_answered: domainResponses.length,
        questions_total: domain.questions?.length || 0,
      };
    });

    try {
      await api.saveDomainScores(assessment.id, domainScores);
      
      // Calculate overall score
      const totalScore = domainScores.reduce((sum, d) => sum + d.weighted_score, 0) / domainScores.length;
      const maturityLevel = Math.round(totalScore);
      
      await api.updateAssessment(assessment.id, {
        status: 'completed',
        total_score: totalScore,
        maturity_level: maturityLevel,
      });
      
      onComplete();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Calculate progress
  const getProgress = () => {
    const totalQuestions = domainsWithQuestions.reduce((sum, d) => sum + (d.questions?.length || 0), 0);
    const answeredQuestions = Object.keys(responses).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  // Check if current domain is complete
  const isDomainComplete = () => {
    if (!currentDomain?.questions) return false;
    const requiredQuestions = currentDomain.questions.filter(q => q.required);
    return requiredQuestions.every(q => responses[q.id] !== undefined);
  };

  if (!currentDomain) {
    return <div className="p-8 text-center text-gray-500">No questions found in the model.</div>;
  }

  const pillar = modelData.pillars[currentDomain.pillar];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Assessment
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Progress:</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{getProgress()}%</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">{assessment.name}</h2>
        <p className="text-gray-600 mt-1">
          Domain {currentDomainIndex + 1} of {totalDomains}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Domain Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className={clsx(
            "px-2 py-0.5 rounded",
            currentDomain.pillar === 'security_for_ai' ? 'bg-blue-100 text-blue-700' :
            currentDomain.pillar === 'ai_for_security' ? 'bg-green-100 text-green-700' :
            'bg-purple-100 text-purple-700'
          )}>
            {pillar?.name || currentDomain.pillar}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{currentDomain.name}</h3>
        <p className="text-gray-600">{currentDomain.description}</p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentDomain.questions?.map((question, qIndex) => (
          <div 
            key={question.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    Q{qIndex + 1}
                  </span>
                  {question.required && (
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">Required</span>
                  )}
                  {question.weight && question.weight !== 1 && (
                    <span className="text-xs text-gray-500">Weight: {question.weight}</span>
                  )}
                </div>
                <p className="text-gray-900 font-medium">{question.text}</p>
              </div>
              {question.help_text && (
                <button
                  onClick={() => setShowHelp(showHelp === question.id ? null : question.id)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 rounded"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              )}
            </div>

            {showHelp === question.id && question.help_text && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                {question.help_text}
              </div>
            )}

            {/* Single Choice */}
            {question.question_type === 'single_choice' && question.options && (
              <div className="space-y-2">
                {(question.options as string[]).map((option, index) => (
                  <label
                    key={index}
                    className={clsx(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      responses[question.id]?.response_index === index
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={index}
                      checked={responses[question.id]?.response_index === index}
                      onChange={() => handleResponseChange(question, index, currentDomain)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="flex-1 text-gray-700">{option}</span>
                    <span className={clsx(
                      "text-xs px-2 py-0.5 rounded",
                      index === 0 ? "bg-gray-100 text-gray-600" :
                      index === 1 ? "bg-blue-100 text-blue-700" :
                      index === 2 ? "bg-indigo-100 text-indigo-700" :
                      index === 3 ? "bg-purple-100 text-purple-700" :
                      "bg-green-100 text-green-700"
                    )}>
                      Level {calculateScore(index, question.options!.length)}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Multiple Choice */}
            {question.question_type === 'multiple_choice' && question.options && (
              <div className="space-y-2">
                {(question.options as string[]).map((option, index) => {
                  const currentValues: string[] = responses[question.id]?.response_value 
                    ? JSON.parse(responses[question.id].response_value as string) 
                    : [];
                  const isChecked = currentValues.includes(option);
                  
                  return (
                    <label
                      key={index}
                      className={clsx(
                        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                        isChecked
                          ? "border-blue-300 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const newValues = e.target.checked
                            ? [...currentValues, option]
                            : currentValues.filter(v => v !== option);
                          handleResponseChange(question, newValues, currentDomain);
                        }}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="flex-1 text-gray-700">{option}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Text */}
            {question.question_type === 'text' && (
              <textarea
                value={responses[question.id]?.response_text || ''}
                onChange={(e) => handleResponseChange(question, e.target.value, currentDomain)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Enter your response..."
              />
            )}

            {/* Boolean (Yes/No) */}
            {question.question_type === 'boolean' && (
              <div className="flex gap-4">
                {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => (
                  <label
                    key={opt.label}
                    className={clsx(
                      "flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border cursor-pointer transition-all",
                      responses[question.id]?.response_value === opt.label
                        ? opt.value ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      checked={responses[question.id]?.response_value === opt.label}
                      onChange={() => handleResponseChange(question, opt.value, currentDomain)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="font-medium text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Numeric */}
            {question.question_type === 'numeric' && (
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  value={responses[question.id]?.response_value || ''}
                  onChange={(e) => handleResponseChange(question, e.target.value, currentDomain)}
                  className="w-32 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-medium"
                  placeholder="0"
                />
                <span className="text-gray-500 text-sm">Enter a number</span>
              </div>
            )}

            {/* Scale (1-10 or similar) */}
            {question.question_type === 'scale' && question.options && (
              <div className="space-y-2">
                {(question.options as string[]).map((option, index) => (
                  <label
                    key={index}
                    className={clsx(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      responses[question.id]?.response_index === index
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={index}
                      checked={responses[question.id]?.response_index === index}
                      onChange={() => handleResponseChange(question, index, currentDomain)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="flex-1 text-gray-700">{option}</span>
                    <span className={clsx(
                      "text-xs px-2 py-0.5 rounded font-medium",
                      index < 3 ? "bg-red-100 text-red-700" :
                      index < 5 ? "bg-orange-100 text-orange-700" :
                      index < 7 ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    )}>
                      {index + 1}/10
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Response indicator */}
            {responses[question.id] && (
              <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                <Check className="w-4 h-4" />
                Response saved
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <button
          onClick={goPrev}
          disabled={currentDomainIndex === 0 || saving}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Domain
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={saveResponses}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Progress'}
          </button>

          {currentDomainIndex === totalDomains - 1 ? (
            <button
              onClick={handleComplete}
              disabled={saving || !isDomainComplete()}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              Complete Assessment
            </button>
          ) : (
            <button
              onClick={goNext}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Next Domain
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssessmentForm;
