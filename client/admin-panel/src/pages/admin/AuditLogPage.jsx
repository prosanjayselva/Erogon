import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/client.js';

const actionColors = {
  LOGIN: { bg: '#E8F5E9', color: '#2E7D32' },
  CREATE_EVENT: { bg: '#E3F2FD', color: '#1E40AF' },
  UPDATE_EVENT: { bg: '#FFF3E0', color: '#D97706' },
  DELETE_EVENT: { bg: '#FEF2F2', color: '#DC2626' },
  DELETE_DONOR: { bg: '#FEF2F2', color: '#DC2626' },
};

function getActionBadge(action) {
  const style = actionColors[action] || { bg: '#F3F4F6', color: '#4B5563' };
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
      background: style.bg, color: style.color, textTransform: 'uppercase', letterSpacing: 0.3,
    }}>
      {action.replace(/_/g, ' ')}
    </span>
  );
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
      </div>

      {isLoading ? (
        <div className="admin-loading">Loading...</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Details</th>
                <th>Admin ID</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length === 0 && (
                <tr><td colSpan={4} className="empty-state">No activity logs found</td></tr>
              )}
              {data?.data?.map((log) => (
                <tr key={log.id}>
                  <td>{getActionBadge(log.action)}</td>
                  <td style={{ fontSize: 14 }}>{log.details || '—'}</td>
                  <td style={{ color: '#6B7280', fontSize: 13 }}>#{log.adminId}</td>
                  <td style={{ fontSize: 13, color: '#6B7280', whiteSpace: 'nowrap' }}>
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
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
                {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button key={p} className={page === p ? 'page-active' : ''} onClick={() => setPage(p)}>
                      {p}
                    </button>
                  );
                })}
                <button disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
