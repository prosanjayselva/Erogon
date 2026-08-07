import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client.js';
import { useToastStore } from '../../stores/toast-store.js';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';

export default function EmployerManagementPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const queryClient = useQueryClient();
  const toast = useToastStore((s) => s.add);

  const { data, isLoading } = useQuery({
    queryKey: ['employers', search, page],
    queryFn: () => api.get('/employers', { params: { search, page, limit: 10 } }).then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/employers/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['employers'] }); toast('Employer deleted', 'success'); },
    onError: () => toast('Failed to delete', 'error'),
  });

  const pagination = data?.pagination;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Employer Requirements</h1>
        <p className="page-subtitle">Manpower requirements submitted by employers</p>
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search organizations..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="search-input" />
        </div>
      </div>

      {isLoading ? <div className="admin-loading">Loading...</div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Organization</th><th>Contact</th><th>Email</th><th>Phone</th><th>Job Role</th><th>Vacancies</th><th>Location</th><th>Type</th><th>JD</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data?.data?.length === 0 && <tr><td colSpan={11} className="empty-state">No employer requirements found</td></tr>}
              {data?.data?.map((e) => (
                <tr key={e.id}>
                  <td data-label="Organization"><b>{e.organization}</b></td>
                  <td data-label="Contact">{e.contactPerson}</td>
                  <td data-label="Email">{e.email}</td>
                  <td data-label="Phone">{e.contactNumber}</td>
                  <td data-label="Job Role">{e.jobRole || '—'}</td>
                  <td data-label="Vacancies">{e.vacancies ?? '—'}</td>
                  <td data-label="Location">{e.jobLocation || '—'}</td>
                  <td data-label="Type"><span className="pill">{e.employmentType || '—'}</span></td>
                  <td data-label="JD">{e.jd ? <a href={`/uploads/${e.jd}`} target="_blank" rel="noreferrer" className="link-arrow">View</a> : '—'}</td>
                  <td data-label="Date" style={{ whiteSpace: 'nowrap', fontSize: 13 }}>{new Date(e.createdAt).toLocaleDateString()}</td>
                  <td data-label="Actions">
                    <button className="btn-icon btn-icon-delete" title="Delete"
                      onClick={() => setDeleteTarget(e)}>🗑️</button>
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
        title="Delete Employer Requirement"
        message={`Are you sure you want to delete the requirement from "${deleteTarget?.organization}"? This action cannot be undone.`}
        onConfirm={() => { deleteMutation.mutate(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
