/**
 * Organization Management Component
 */

import React, { useState, useEffect } from 'react';
import { Building2, Plus, Trash2, Edit2, ChevronRight, X } from 'lucide-react';
import clsx from 'clsx';
import api from '../api/client';
import type { Organization } from '../types/assessment';
import { INDUSTRY_OPTIONS, SIZE_OPTIONS } from '../types/assessment';

interface OrganizationListProps {
  onSelectOrganization: (org: Organization) => void;
  selectedOrgId?: string;
}

export function OrganizationList({ onSelectOrganization, selectedOrgId }: OrganizationListProps) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const orgs = await api.getOrganizations();
      setOrganizations(orgs);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this organization and all its assessments?')) return;
    
    try {
      await api.deleteOrganization(id);
      setOrganizations(orgs => orgs.filter(o => o.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (loading) {
    return <div className="p-4 text-gray-500">Loading organizations...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
        <button onClick={loadOrganizations} className="ml-2 text-blue-500 hover:underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Organizations
        </h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New
        </button>
      </div>

      {organizations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Building2 className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>No organizations yet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-2 text-blue-600 hover:underline"
          >
            Create your first organization
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {organizations.map(org => (
            <div
              key={org.id}
              onClick={() => onSelectOrganization(org)}
              className={clsx(
                "p-4 rounded-lg border cursor-pointer transition-all",
                selectedOrgId === org.id
                  ? "border-blue-300 bg-blue-50 ring-2 ring-blue-100"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{org.name}</h4>
                  {org.description && (
                    <p className="text-sm text-gray-500 mt-1">{org.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {org.industry && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {org.industry}
                      </span>
                    )}
                    {org.size && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {org.size}
                      </span>
                    )}
                    {org.assessment_count !== undefined && (
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                        {org.assessment_count} assessment{org.assessment_count !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditingOrg(org); }}
                    className="p-1.5 text-gray-400 hover:text-blue-600 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(org.id, e)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded"
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

      {(showCreateModal || editingOrg) && (
        <OrganizationModal
          organization={editingOrg}
          onClose={() => { setShowCreateModal(false); setEditingOrg(null); }}
          onSave={(org) => {
            if (editingOrg) {
              setOrganizations(orgs => orgs.map(o => o.id === org.id ? org : o));
            } else {
              setOrganizations(orgs => [org, ...orgs]);
            }
            setShowCreateModal(false);
            setEditingOrg(null);
          }}
        />
      )}
    </div>
  );
}

interface OrganizationModalProps {
  organization?: Organization | null;
  onClose: () => void;
  onSave: (org: Organization) => void;
}

function OrganizationModal({ organization, onClose, onSave }: OrganizationModalProps) {
  const [name, setName] = useState(organization?.name || '');
  const [description, setDescription] = useState(organization?.description || '');
  const [industry, setIndustry] = useState(organization?.industry || '');
  const [size, setSize] = useState(organization?.size || '');
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
      let saved: Organization;
      if (organization) {
        saved = await api.updateOrganization(organization.id, { name, description, industry, size });
      } else {
        saved = await api.createOrganization({ name, description, industry, size });
      }
      onSave(saved);
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">
            {organization ? 'Edit Organization' : 'Create Organization'}
          </h3>
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
              Organization Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter organization name"
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
              placeholder="Brief description"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                {INDUSTRY_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <select
                value={size}
                onChange={e => setSize(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                {SIZE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
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
              {saving ? 'Saving...' : organization ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganizationList;
