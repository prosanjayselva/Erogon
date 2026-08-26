import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client.js';
import { useToastStore } from '../../stores/toast-store.js';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import ExportExcelButton from '../../components/admin/ExportExcelButton.jsx';

export default function NewsletterManagementPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const queryClient = useQueryClient();
  const toast = useToastStore((s) => s.add);

  const { data, isLoading } = useQuery({
    queryKey: ['newsletter', search, page],
    queryFn: () => api.get('/newsletter', { params: { search, page, limit: 10 } }).then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/newsletter/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['newsletter'] }); toast('Subscriber removed', 'success'); },
    onError: () => toast('Failed to remove', 'error'),
  });

  const pagination = data?.pagination;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Newsletter Subscribers</h1>
        <p className="page-subtitle">Email subscribers for monthly updates and impact stories</p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search emails..." value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="search-input" />
          </div>
          <div className="toolbar-count">
            Total: <b>{pagination?.total ?? '...'}</b> subscribers
          </div>
        </div>
        <ExportExcelButton rows={data?.data} filename="ergon-newsletter-subscribers" />
      </div>

      {isLoading ? <div className="admin-loading">Loading...</div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>#</th><th>Email</th><th>Subscribed On</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data?.data?.length === 0 && <tr><td colSpan={4} className="empty-state">No subscribers found</td></tr>}
              {data?.data?.map((s, i) => (
                <tr key={s.id}>
                  <td data-label="#" style={{ color: '#9CA3AF' }}>{(page - 1) * 10 + i + 1}</td>
                  <td data-label="Email"><b>{s.email}</b></td>
                  <td data-label="Subscribed On" style={{ fontSize: 13 }}>{new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td data-label="Actions">
                    <button className="btn-icon btn-icon-delete" title="Delete"
                      onClick={() => setDeleteTarget(s)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagination?.totalPages > 1 && (
            <div className="pagination">
              <div className="pagination-info">Showing {((page - 1) * 10) + 1}–{Math.min(page * 10, pagination.total)} of {pagination.total}</div>
              <div className="pagination-btns">
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
                {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                  const p = i + 1;
                  return <button key={p} className={page === p ? 'page-active' : ''} onClick={() => setPage(p)}>{p}</button>;
                })}
                <button disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
              </div>
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Remove Subscriber"
        message={`Are you sure you want to remove "${deleteTarget?.email}"? This action cannot be undone.`}
        onConfirm={() => { deleteMutation.mutate(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
