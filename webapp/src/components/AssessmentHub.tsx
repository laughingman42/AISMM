/**
 * Assessment Hub Component
 * Main entry point for the assessment functionality
 */

import { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Calendar, 
  Clock,
  Trash2,
  Play,
  Eye,
  Building2,
  ChevronRight,
  ArrowLeft,
  X
} from 'lucide-react';
import clsx from 'clsx';
import api from '../api/client';
import type { Organization, Assessment } from '../types/assessment';
import type { AISMMDataV1 } from '../types';
import { OrganizationList } from './OrganizationList';
import { AssessmentForm } from './AssessmentForm';
import { AssessmentResults } from './AssessmentResults';

interface AssessmentHubProps {
  modelData: AISMMDataV1;
}

type View = 'list' | 'org-detail' | 'assessment-form' | 'assessment-results';

export function AssessmentHub({ modelData }: AssessmentHubProps) {
  const [view, setView] = useState<View>('list');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  // Load assessments when org changes
  useEffect(() => {
    if (selectedOrg) {
      loadAssessments();
    }
  }, [selectedOrg?.id]);

  const loadAssessments = async () => {
    if (!selectedOrg) return;
    
    try {
      setLoading(true);
      const data = await api.getAssessments(selectedOrg.id);
      setAssessments(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrg = (org: Organization) => {
    setSelectedOrg(org);
    setView('org-detail');
  };

  const handleStartAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setView('assessment-form');
  };

  const handleViewResults = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setView('assessment-results');
  };

  const handleAssessmentComplete = () => {
    loadAssessments();
    setView('org-detail');
  };

  const handleDeleteAssessment = async (id: string) => {
    if (!confirm('Delete this assessment?')) return;
    
    try {
      await api.deleteAssessment(id);
      setAssessments(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Render organization list view
  if (view === 'list') {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-2">
            <ClipboardList className="w-6 h-6 text-blue-600" />
            Assessment Hub
          </h2>
          <p className="text-gray-600">
            Manage organizations and conduct AI security maturity assessments.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <OrganizationList 
            onSelectOrganization={handleSelectOrg}
            selectedOrgId={selectedOrg?.id}
          />
        </div>
      </div>
    );
  }

  // Render organization detail view with assessments
  if (view === 'org-detail' && selectedOrg) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <button
            onClick={() => { setView('list'); setSelectedOrg(null); }}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Organizations
          </button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">Organization</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedOrg.name}</h2>
              {selectedOrg.description && (
                <p className="text-gray-600 mt-1">{selectedOrg.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedOrg.industry && (
                  <span className="text-sm px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {selectedOrg.industry}
                  </span>
                )}
                {selectedOrg.size && (
                  <span className="text-sm px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {selectedOrg.size}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Assessment
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Assessments List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Assessments</h3>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading assessments...</div>
          ) : assessments.length === 0 ? (
            <div className="p-8 text-center">
              <ClipboardList className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">No assessments yet</p>
              <button
                onClick={() => setShowNewModal(true)}
                className="mt-3 text-blue-600 hover:underline"
              >
                Create your first assessment
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {assessments.map(assessment => (
                <div
                  key={assessment.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-gray-900">{assessment.name}</h4>
                        <span className={clsx(
                          "text-xs px-2 py-0.5 rounded capitalize",
                          getStatusColor(assessment.status)
                        )}>
                          {assessment.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(assessment.started_at).toLocaleDateString()}
                        </span>
                        {assessment.completed_at && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Completed {new Date(assessment.completed_at).toLocaleDateString()}
                          </span>
                        )}
                        {assessment.total_score && (
                          <span className="font-medium text-gray-700">
                            Score: {assessment.total_score.toFixed(1)} / 5.0
                          </span>
                        )}
                        {assessment.maturity_level && (
                          <span className={clsx(
                            "px-2 py-0.5 rounded text-xs",
                            assessment.maturity_level <= 1 ? 'bg-gray-100 text-gray-700' :
                            assessment.maturity_level === 2 ? 'bg-blue-100 text-blue-700' :
                            assessment.maturity_level === 3 ? 'bg-indigo-100 text-indigo-700' :
                            assessment.maturity_level === 4 ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          )}>
                            Level {assessment.maturity_level}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {assessment.status === 'in_progress' ? (
                        <button
                          onClick={() => handleStartAssessment(assessment)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                          <Play className="w-3.5 h-3.5" />
                          Continue
                        </button>
                      ) : (
                        <button
                          onClick={() => handleViewResults(assessment)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Results
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteAssessment(assessment.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* New Assessment Modal */}
        {showNewModal && (
          <NewAssessmentModal
            organizationId={selectedOrg.id}
            modelVersion={modelData.version}
            onClose={() => setShowNewModal(false)}
            onCreate={(assessment) => {
              setAssessments(prev => [assessment, ...prev]);
              setShowNewModal(false);
              handleStartAssessment(assessment);
            }}
          />
        )}
      </div>
    );
  }

  // Render assessment form
  if (view === 'assessment-form' && selectedAssessment) {
    return (
      <AssessmentForm
        assessment={selectedAssessment}
        modelData={modelData}
        onComplete={handleAssessmentComplete}
        onBack={() => setView('org-detail')}
      />
    );
  }

  // Render assessment results
  if (view === 'assessment-results' && selectedAssessment) {
    return (
      <AssessmentResults
        assessmentId={selectedAssessment.id}
        modelData={modelData}
        onBack={() => setView('org-detail')}
      />
    );
  }

  return null;
}

// New Assessment Modal
interface NewAssessmentModalProps {
  organizationId: string;
  modelVersion: string;
  onClose: () => void;
  onCreate: (assessment: Assessment) => void;
}

function NewAssessmentModal({ organizationId, modelVersion, onClose, onCreate }: NewAssessmentModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const assessment = await api.createAssessment({
        organization_id: organizationId,
        name: name.trim(),
        description: description.trim() || undefined,
        model_version: modelVersion,
      });
      onCreate(assessment);
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">New Assessment</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assessment Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Assessment - ${new Date().toLocaleDateString()}`}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Optional notes about this assessment"
              rows={3}
            />
          </div>

          <div className="text-sm text-gray-500">
            Model Version: <span className="font-mono">{modelVersion}</span>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Creating...' : 'Start Assessment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssessmentHub;
