import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client.js';
import { useToastStore } from '../../stores/toast-store.js';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';

const avatarColors = ['#2E7D32', '#2563EB', '#7C3AED', '#DC2626', '#D97706', '#0891B2', '#DB2777', '#4F46E5'];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function getInitials(name) {
  return (name || '').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
}

function getPaymentBadge(mode) {
  if (!mode) return null;
  const cls = mode === 'UPI' ? 'payment-upi' : mode === 'Card' ? 'payment-card' : 'payment-net';
  return <span className={`payment-badge ${cls}`}>{mode}</span>;
}

export default function DonorManagementPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const queryClient = useQueryClient();
  const toast = useToastStore((s) => s.add);

  const { data, isLoading } = useQuery({
    queryKey: ['donors', search, page],
    queryFn: () =>
      api.get('/donors', { params: { search, page, limit: 8 } }).then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/donors/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donors'] });
      toast('Donor deleted', 'success');
    },
    onError: () => toast('Failed to delete donor', 'error'),
  });

  const pagination = data?.pagination;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Donor Management</h1>
        <p className="page-subtitle">View and manage all donor details</p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search donors..."
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
                <th></th>
                <th>Donor Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Amount (₹)</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length === 0 && (
                <tr><td colSpan={7} className="empty-state">No donors found</td></tr>
              )}
              {data?.data?.map((donor, i) => (
                <tr key={donor.id}>
                  <td>
                    <div className="donor-avatar" style={{ background: getAvatarColor(donor.name) }}>
                      {getInitials(donor.name)}
                    </div>
                  </td>
                  <td>
                    <div className="donor-cell">
                      <div>
                        <div className="donor-name">{donor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{donor.email}</td>
                  <td>{donor.phone}</td>
                  <td><strong>₹{donor.amount}</strong></td>
                  <td>{new Date(donor.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-cell">
                      <button
                        className="btn-icon btn-icon-delete"
                        title="Delete"
                        onClick={() => setDeleteTarget(donor)}
                      >🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagination?.totalPages > 1 && (
            <div className="pagination">
              <div className="pagination-info">
                Showing {((page - 1) * 8) + 1}–{Math.min(page * 8, pagination.total)} of {pagination.total}
              </div>
              <div className="pagination-btns">
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
                {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      className={page === p ? 'page-active' : ''}
                      onClick={() => setPage(p)}
                    >{p}</button>
                  );
                })}
                <button disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
              </div>
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Donor"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={() => { deleteMutation.mutate(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
