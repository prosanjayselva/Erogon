import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client.js';
import { useToastStore } from '../../stores/toast-store.js';

export default function JobSeekerManagementPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const toast = useToastStore((s) => s.add);

  const { data, isLoading } = useQuery({
    queryKey: ['job-seekers', search, page],
    queryFn: () => api.get('/job-seekers', { params: { search, page, limit: 10 } }).then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/job-seekers/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['job-seekers'] }); toast('Job seeker deleted', 'success'); },
    onError: () => toast('Failed to delete', 'error'),
  });

  const pagination = data?.pagination;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Job Seekers</h1>
        <p className="page-subtitle">Candidate profiles submitted via Career Opportunities</p>
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search candidates..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="search-input" />
        </div>
      </div>

      {isLoading ? <div className="admin-loading">Loading...</div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Phone</th><th>Qualification</th><th>Experience</th><th>Role</th><th>Location</th><th>Resume</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data?.data?.length === 0 && <tr><td colSpan={10} className="empty-state">No job seekers found</td></tr>}
              {data?.data?.map((s) => (
                <tr key={s.id}>
                  <td><b>{s.fullName}</b></td>
                  <td>{s.email}</td>
                  <td>{s.contactNumber}</td>
                  <td>{s.qualification || '—'}</td>
                  <td>{s.experience || '—'}</td>
                  <td>{s.preferredRole || '—'}</td>
                  <td>{s.preferredLocation || '—'}</td>
                  <td>{s.resume ? <a href={`/uploads/${s.resume}`} target="_blank" rel="noreferrer" className="link-arrow">View</a> : '—'}</td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: 13 }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-icon btn-icon-delete" title="Delete"
                      onClick={() => { if (confirm('Delete this job seeker?')) deleteMutation.mutate(s.id); }}>🗑️</button>
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
    </div>
  );
}
