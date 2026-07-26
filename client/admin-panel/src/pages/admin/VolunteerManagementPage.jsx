import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client.js';
import { useToastStore } from '../../stores/toast-store.js';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';

export default function VolunteerManagementPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const queryClient = useQueryClient();
  const toast = useToastStore((s) => s.add);

  const { data, isLoading } = useQuery({
    queryKey: ['volunteers', search, page],
    queryFn: () => api.get('/volunteers', { params: { search, page, limit: 10 } }).then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/volunteers/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['volunteers'] }); toast('Volunteer deleted', 'success'); },
    onError: () => toast('Failed to delete', 'error'),
  });

  const pagination = data?.pagination;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Volunteer Sign-Ups</h1>
        <p className="page-subtitle">Manage volunteer registrations from the website</p>
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search volunteers..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="search-input" />
        </div>
      </div>

      {isLoading ? <div className="admin-loading">Loading...</div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Phone</th><th>City</th><th>Interest</th><th>Availability</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data?.data?.length === 0 && <tr><td colSpan={8} className="empty-state">No volunteers found</td></tr>}
              {data?.data?.map((v) => (
                <tr key={v.id}>
                  <td><b>{v.fullName}</b></td>
                  <td>{v.email}</td>
                  <td>{v.contactNumber}</td>
                  <td>{v.city || '—'}</td>
                  <td><span className="pill">{v.areaOfInterest || '—'}</span></td>
                  <td>{v.availability || '—'}</td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: 13 }}>{new Date(v.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-icon btn-icon-delete" title="Delete"
                      onClick={() => setDeleteTarget(v)}>🗑️</button>
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
        title="Delete Volunteer"
        message={`Are you sure you want to delete "${deleteTarget?.fullName}"? This action cannot be undone.`}
        onConfirm={() => { deleteMutation.mutate(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
