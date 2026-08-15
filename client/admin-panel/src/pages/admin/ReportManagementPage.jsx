import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client.js';
import { useToastStore } from '../../stores/toast-store.js';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';

const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const CATEGORY_LABEL = { ACTIVITY_REPORT: 'Activity Report', IMPACT_REPORT: 'Impact Report' };

function validateFile(file) {
  if (!file) return null;
  if (!ALLOWED_FILE_TYPES.includes(file.type)) return 'Only PDF or image files are allowed';
  if (file.size > MAX_FILE_SIZE) return 'File must be under 20MB';
  return null;
}

const initialForm = {
  title: '',
  category: 'ACTIVITY_REPORT',
  description: '',
};

export default function ReportManagementPage() {
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const queryClient = useQueryClient();
  const toast = useToastStore((s) => s.add);

  const { data, isLoading } = useQuery({
    queryKey: ['reports', filter],
    queryFn: () => api.get('/reports', { params: { category: filter } }).then((r) => r.data),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['reports'] });

  const createMutation = useMutation({
    mutationFn: (formData) => api.post('/reports', formData),
    onSuccess: () => { invalidate(); resetForm(); toast('Report created', 'success'); },
    onError: (err) => toast(err.response?.data?.error || 'Failed to create report', 'error'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => api.put(`/reports/${id}`, formData),
    onSuccess: () => { invalidate(); resetForm(); toast('Report updated', 'success'); },
    onError: (err) => toast(err.response?.data?.error || 'Failed to update report', 'error'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/reports/${id}`),
    onSuccess: () => { invalidate(); toast('Report deleted', 'success'); },
    onError: () => toast('Failed to delete report', 'error'),
  });

  const resetForm = () => {
    setForm(initialForm);
    setFile(null);
    setFileError('');
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateFile(file);
    if (err) { setFileError(err); return; }
    setFileError('');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('description', form.description || '');
    if (file) formData.append('file', file);

    if (editing) updateMutation.mutate({ id: editing.id, formData });
    else createMutation.mutate(formData);
  };

  const handleEdit = (report) => {
    setEditing(report);
    setForm({ title: report.title, category: report.category, description: report.description || '' });
    setShowForm(true);
  };

  const isImageFile = (path) => !path?.toLowerCase().endsWith('.pdf');
  const reportSrc = (report) => `/uploads/${report.file}`;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Report Management</h1>
        <p className="page-subtitle">Manage published reports and their categories</p>
      </div>

      <div className="toolbar">
        <div className="filter-tabs">
          {['', 'ACTIVITY_REPORT', 'IMPACT_REPORT'].map((c) => (
            <button
              key={c}
              className={`filter-tab${filter === c ? ' active' : ''}`}
              onClick={() => setFilter(c)}
            >{c ? CATEGORY_LABEL[c] : 'All'}</button>
          ))}
        </div>
        <button className="btn-add" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? 'Cancel' : '+ Add Report'}
        </button>
      </div>

      {showForm && (
        <form className="event-form" onSubmit={handleSubmit}>
          <h2>{editing ? 'Edit Report' : 'Add New Report'}</h2>
          <div className="form-grid">
            <label>Title
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </label>
            <label>Category
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="ACTIVITY_REPORT">Activity Report</option>
                <option value="IMPACT_REPORT">Impact Report</option>
              </select>
            </label>
            <label>Report File {editing && '(optional)'}
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
                required={!editing}
                onChange={(e) => {
                  const f = e.target.files[0];
                  const err = validateFile(f);
                  if (err) { setFileError(err); setFile(null); return; }
                  setFileError('');
                  setFile(f);
                }}
              />
              {fileError && <span className="form-error">{fileError}</span>}
            </label>
            <label className="full-width">Description
              <textarea rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What is this report about?" />
            </label>
          </div>
          <button type="submit" className="btn-save">{editing ? 'Update Report' : 'Create Report'}</button>
        </form>
      )}

      {isLoading ? (
        <div className="admin-loading">Loading...</div>
      ) : (
        <div className="event-grid">
          {data?.data?.length === 0 && <p className="empty-state">No reports found</p>}
          {data?.data?.map((report) => (
            <div key={report.id} className="event-card">
              <div className="event-card-img">
                {isImageFile(report.file) ? (
                  <img src={reportSrc(report)} alt={report.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : '📄'}
              </div>
              <div className="event-card-body">
                <div style={{ marginBottom: 8 }}>
                  <span className={`event-status event-status-completed`}>{CATEGORY_LABEL[report.category] || report.category}</span>
                </div>
                <h3 className="event-card-title">{report.title}</h3>
                <div className="event-card-meta">
                  <span>📅 {new Date(report.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  {report.description && <span>{report.description}</span>}
                </div>
                <a href={reportSrc(report)} target="_blank" rel="noreferrer" className="view-all-link">Open file ↗</a>
                <div className="event-card-actions">
                  <button className="btn-icon btn-icon-edit" title="Edit" onClick={() => handleEdit(report)}>✏️</button>
                  <button className="btn-icon btn-icon-delete" title="Delete" onClick={() => setDeleteTarget(report)}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Report"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={() => { deleteMutation.mutate(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
