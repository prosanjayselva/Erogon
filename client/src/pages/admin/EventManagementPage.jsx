import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client.js';
import { useToastStore } from '../../stores/toast-store.js';

const initialForm = {
  title: '',
  description: '',
  eventDate: '',
  status: 'UPCOMING',
};

export default function EventManagementPage() {
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [banner, setBanner] = useState(null);
  const queryClient = useQueryClient();
  const toast = useToastStore((s) => s.add);

  const { data, isLoading } = useQuery({
    queryKey: ['events', filter],
    queryFn: () =>
      api.get('/events', { params: { status: filter, limit: 50 } }).then((r) => r.data),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['events'] });

  const createMutation = useMutation({
    mutationFn: (formData) => api.post('/events', formData),
    onSuccess: () => { invalidate(); resetForm(); toast('Event created', 'success'); },
    onError: () => toast('Failed to create event', 'error'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => api.put(`/events/${id}`, formData),
    onSuccess: () => { invalidate(); resetForm(); toast('Event updated', 'success'); },
    onError: () => toast('Failed to update event', 'error'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/events/${id}`),
    onSuccess: () => { invalidate(); toast('Event deleted', 'success'); },
    onError: () => toast('Failed to delete event', 'error'),
  });

  const resetForm = () => {
    setForm(initialForm);
    setBanner(null);
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('eventDate', form.eventDate);
    formData.append('status', form.status);
    if (banner) formData.append('banner', banner);

    if (editing) updateMutation.mutate({ id: editing.id, formData });
    else createMutation.mutate(formData);
  };

  const handleEdit = (event) => {
    setEditing(event);
    setForm({
      title: event.title,
      description: event.description,
      eventDate: event.eventDate.slice(0, 16),
      status: event.status,
    });
    setShowForm(true);
  };

  const statusClass = (s) =>
    s === 'UPCOMING' ? 'event-status-upcoming' : s === 'COMPLETED' ? 'event-status-completed' : 'event-status-cancelled';

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Event Management</h1>
        <p className="page-subtitle">Manage trust events easily</p>
      </div>

      <div className="toolbar">
        <div className="filter-tabs">
          {['', 'UPCOMING', 'COMPLETED', 'CANCELLED'].map((s) => (
            <button
              key={s}
              className={`filter-tab${filter === s ? ' active' : ''}`}
              onClick={() => setFilter(s)}
            >{s || 'All'}</button>
          ))}
        </div>
        <button className="btn-add" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? 'Cancel' : '+ Add Event'}
        </button>
      </div>

      {showForm && (
        <form className="event-form" onSubmit={handleSubmit}>
          <h2>{editing ? 'Edit Event' : 'Add New Event'}</h2>
          <div className="form-grid">
            <label>Title
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </label>
            <label>Event Date
              <input type="datetime-local" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} required />
            </label>
            <label>Status
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="UPCOMING">Upcoming</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </label>
            <label>Banner Image
              <input type="file" accept="image/*" onChange={(e) => setBanner(e.target.files[0])} />
            </label>
            <label className="full-width">Description
              <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </label>
          </div>
          <button type="submit" className="btn-save">{editing ? 'Update Event' : 'Create Event'}</button>
        </form>
      )}

      {isLoading ? (
        <div className="admin-loading">Loading...</div>
      ) : (
        <>
          <div className="event-grid">
            {data?.data?.length === 0 && <p className="empty-state">No events found</p>}
            {data?.data?.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-card-img">
                  {event.banner ? (
                    <img src={`http://localhost:3000/uploads/${event.banner}`} alt={event.title}
                         style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : '📅'}
                </div>
                <div className="event-card-body">
                  <div style={{ marginBottom: 8 }}>
                    <span className={`event-status ${statusClass(event.status)}`}>{event.status}</span>
                  </div>
                  <h3 className="event-card-title">{event.title}</h3>
                  <div className="event-card-meta">
                    <span>📅 {new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span>📍 {event.description?.slice(0, 50)}</span>
                  </div>
                  <div className="event-card-actions">
                    <button className="btn-icon btn-icon-edit" title="Edit" onClick={() => handleEdit(event)}>✏️</button>
                    <button className="btn-icon btn-icon-delete" title="Delete"
                      onClick={() => { if (confirm('Delete this event?')) deleteMutation.mutate(event.id); }}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a href="/admin/events" className="view-all-link" onClick={(e) => e.preventDefault()}>
            View All Events →
          </a>
        </>
      )}
    </div>
  );
}
