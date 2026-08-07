import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/client.js';

const actionColors = {
  LOGIN: { bg: '#E8F5E9', color: '#2E7D32' },
  FAILED_LOGIN: { bg: '#FEF2F2', color: '#DC2626' },
  CREATE_EVENT: { bg: '#E3F2FD', color: '#1E40AF' },
  UPDATE_EVENT: { bg: '#FFF3E0', color: '#D97706' },
  DELETE_EVENT: { bg: '#FEF2F2', color: '#DC2626' },
  NEW_DONATION: { bg: '#D1FAE5', color: '#065F46' },
  DELETE_DONOR: { bg: '#FEF2F2', color: '#DC2626' },
  NEW_VOLUNTEER: { bg: '#F3E8FF', color: '#7C3AED' },
  DELETE_VOLUNTEER: { bg: '#FEF2F2', color: '#DC2626' },
  NEW_JOB_SEEKER: { bg: '#E0F2FE', color: '#0369A1' },
  DELETE_JOB_SEEKER: { bg: '#FEF2F2', color: '#DC2626' },
  NEW_EMPLOYER: { bg: '#FEF3C7', color: '#92400E' },
  DELETE_EMPLOYER: { bg: '#FEF2F2', color: '#DC2626' },
  NEW_CONTACT: { bg: '#FCE7F3', color: '#BE185D' },
  DELETE_CONTACT: { bg: '#FEF2F2', color: '#DC2626' },
  NEW_NEWSLETTER_SUB: { bg: '#D1FAE5', color: '#065F46' },
  DELETE_NEWSLETTER_SUB: { bg: '#FEF2F2', color: '#DC2626' },
  MARK_NOTIFICATION_READ: { bg: '#F3F4F6', color: '#4B5563' },
  MARK_ALL_NOTIFICATIONS_READ: { bg: '#F3F4F6', color: '#4B5563' },
};

const ACTION_OPTIONS = [
  { value: '', label: 'All Actions' },
  { value: 'LOGIN', label: 'Login' },
  { value: 'FAILED_LOGIN', label: 'Failed Login' },
  { value: 'NEW_DONATION', label: 'New Donation' },
  { value: 'DELETE_DONOR', label: 'Delete Donor' },
  { value: 'CREATE_EVENT', label: 'Create Event' },
  { value: 'UPDATE_EVENT', label: 'Update Event' },
  { value: 'DELETE_EVENT', label: 'Delete Event' },
  { value: 'NEW_VOLUNTEER', label: 'New Volunteer' },
  { value: 'DELETE_VOLUNTEER', label: 'Delete Volunteer' },
  { value: 'NEW_JOB_SEEKER', label: 'New Job Seeker' },
  { value: 'DELETE_JOB_SEEKER', label: 'Delete Job Seeker' },
  { value: 'NEW_EMPLOYER', label: 'New Employer' },
  { value: 'DELETE_EMPLOYER', label: 'Delete Employer' },
  { value: 'NEW_CONTACT', label: 'New Contact' },
  { value: 'DELETE_CONTACT', label: 'Delete Contact' },
  { value: 'NEW_NEWSLETTER_SUB', label: 'New Subscriber' },
  { value: 'DELETE_NEWSLETTER_SUB', label: 'Delete Subscriber' },
  { value: 'MARK_NOTIFICATION_READ', label: 'Mark Notification Read' },
  { value: 'MARK_ALL_NOTIFICATIONS_READ', label: 'Mark All Read' },
];

function getActionBadge(action) {
  const style = actionColors[action] || { bg: '#F3F4F6', color: '#4B5563' };
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
      background: style.bg, color: style.color, textTransform: 'uppercase', letterSpacing: 0.3,
      whiteSpace: 'nowrap',
    }}>
      {action.replace(/_/g, ' ')}
    </span>
  );
}

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  pages.push(1);
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['activity-logs', search, actionFilter, page],
    queryFn: () =>
      api.get('/activity-logs', { params: { search, action: actionFilter, page, limit: 20 } }).then((r) => r.data),
    refetchInterval: 10000,
  });

  const pagination = data?.pagination;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Audit Logs</h1>
        <p className="page-subtitle">Track all admin actions and activities</p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search actions or details..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="search-input"
            />
          </div>
        </div>
        <div className="filter-tabs">
          {ACTION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`filter-tab${actionFilter === opt.value ? ' active' : ''}`}
              onClick={() => { setActionFilter(opt.value); setPage(1); }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="admin-loading">Loading...</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Action</th>
                <th>Details</th>
                <th>Admin ID</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length === 0 && (
                <tr><td colSpan={5} className="empty-state">No activity logs found</td></tr>
              )}
              {data?.data?.map((log, idx) => (
                <tr key={log.id}>
                  <td data-label="#" style={{ color: '#9CA3AF', fontSize: 13 }}>
                    {(page - 1) * 20 + idx + 1}
                  </td>
                  <td data-label="Action">{getActionBadge(log.action)}</td>
                  <td data-label="Details" style={{ fontSize: 14 }}>{log.details || '—'}</td>
                  <td data-label="Admin" style={{ color: '#6B7280', fontSize: 13 }}>
                    {log.adminId === 0 ? '🌐 System' : `#${log.adminId}`}
                  </td>
                  <td data-label="Date & Time" style={{ fontSize: 13, color: '#6B7280', whiteSpace: 'nowrap' }}>
                    {new Date(log.createdAt).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagination?.totalPages > 1 && (
            <div className="pagination">
              <div className="pagination-info">
                Page {pagination.page} of {pagination.totalPages} ({pagination.total} records)
              </div>
              <div className="pagination-btns">
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>← Prev</button>
                {getPageNumbers(pagination.page, pagination.totalPages).map((p, i) =>
                  p === '...' ? (
                    <span key={`dots-${i}`} className="pagination-dots">…</span>
                  ) : (
                    <button
                      key={p}
                      className={page === p ? 'page-active' : ''}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  )
                )}
                <button disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}>Next →</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
