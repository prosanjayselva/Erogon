import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client.js';
import { useToastStore } from '../../stores/toast-store.js';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';

const emptyForm = { activityName: '', activityDate: '', category: 'PEOPLE', caption: '' };
const types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
const fileError = (file, required) => !file ? (required ? 'Please select an image or video' : '') : !types.includes(file.type) ? 'Use JPG, PNG, GIF, WebP, MP4 or WebM only' : file.size > 100 * 1024 * 1024 ? 'Media must be under 100MB' : '';

export default function GalleryManagementPage() {
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [media, setMedia] = useState(null);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const queryClient = useQueryClient();
  const toast = useToastStore((state) => state.add);
  const { data, isLoading } = useQuery({ queryKey: ['gallery-media', filter], queryFn: () => api.get('/gallery-media', { params: { category: filter } }).then((response) => response.data) });
  const refresh = () => queryClient.invalidateQueries({ queryKey: ['gallery-media'] });
  const reset = () => { setForm(emptyForm); setMedia(null); setError(''); setEditing(null); setOpen(false); };
  const created = () => { refresh(); reset(); toast('Gallery media saved', 'success'); };
  const failed = (err) => toast(err.response?.data?.error || 'Could not save gallery media', 'error');
  const createMutation = useMutation({ mutationFn: (payload) => api.post('/gallery-media', payload), onSuccess: created, onError: failed });
  const updateMutation = useMutation({ mutationFn: ({ id, payload }) => api.put(`/gallery-media/${id}`, payload), onSuccess: created, onError: failed });
  const deleteMutation = useMutation({ mutationFn: (id) => api.delete(`/gallery-media/${id}`), onSuccess: () => { refresh(); toast('Gallery media deleted', 'success'); }, onError: () => toast('Could not delete gallery media', 'error') });

  function submit(event) {
    event.preventDefault();
    const validation = fileError(media, !editing);
    if (validation) return setError(validation);
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (media) payload.append('media', media);
    editing ? updateMutation.mutate({ id: editing.id, payload }) : createMutation.mutate(payload);
  }

  function edit(item) {
    setEditing(item);
    setForm({ activityName: item.activityName, activityDate: item.activityDate.slice(0, 10), category: item.category, caption: item.caption || '' });
    setMedia(null); setError(''); setOpen(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <div>
    <div className="page-header"><h1>Gallery Management</h1><p>Add pictures and videos under an activity name and date.</p></div>
    <div className="toolbar"><div className="toolbar-left"><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="">All three categories</option><option value="PEOPLE">People</option><option value="PETS">Pets</option><option value="PLANET">Planet</option></select><span className="toolbar-count"><b>{data?.data?.length || 0}</b> media items</span></div><button className="btn-add" onClick={() => open ? reset() : setOpen(true)}>{open ? 'Cancel' : '+ Add Gallery Media'}</button></div>
    {open && <form className="event-form" onSubmit={submit}><h2>{editing ? 'Edit Gallery Media' : 'Add Gallery Media'}</h2><div className="form-grid">
      <label>Activity Name<input value={form.activityName} onChange={(event) => setForm({ ...form, activityName: event.target.value })} required /></label>
      <label>Activity Date<input type="date" value={form.activityDate} onChange={(event) => setForm({ ...form, activityDate: event.target.value })} required /></label>
      <label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option value="PEOPLE">People</option><option value="PETS">Pets</option><option value="PLANET">Planet</option></select></label>
      <label>{editing ? 'Replace Image / Video (optional)' : 'Image / Video'}<input type="file" accept=".jpg,.jpeg,.png,.gif,.webp,.mp4,.webm" required={!editing} onChange={(event) => { const selected = event.target.files[0]; setMedia(selected); setError(fileError(selected, !editing)); }} />{error && <span className="form-error">{error}</span>}</label>
      <label className="full-width">Caption (optional)<textarea rows="3" value={form.caption} onChange={(event) => setForm({ ...form, caption: event.target.value })} /></label>
    </div><button className="btn-save" type="submit">{editing ? 'Update Media' : 'Add to Gallery'}</button></form>}
    {isLoading ? <div className="admin-loading">Loading...</div> : <div className="event-grid">{!data?.data?.length && <p className="empty-state">No gallery media found</p>}{data?.data?.map((item) => <article className="event-card" key={item.id}><div className="event-card-img">{item.mediaType === 'VIDEO' ? <video src={`/uploads/${item.media}`} controls preload="metadata" /> : <img src={`/uploads/${item.media}`} alt={item.caption || item.activityName} />}</div><div className="event-card-body"><span className="event-status event-status-completed">{item.category}</span><h3 className="event-card-title">{item.activityName}</h3><div className="event-card-meta"><span>{new Date(item.activityDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>{item.caption && <span>{item.caption}</span>}<span>{item.mediaType === 'VIDEO' ? 'Video' : 'Image'}</span></div><div className="event-card-actions"><button className="btn-icon btn-icon-edit" onClick={() => edit(item)}>Edit</button><button className="btn-icon btn-icon-delete" onClick={() => setDeleteTarget(item)}>Delete</button></div></div></article>)}</div>}
    <ConfirmDialog open={!!deleteTarget} title="Delete Gallery Media" message={`Delete this media from “${deleteTarget?.activityName}”?`} onConfirm={() => { deleteMutation.mutate(deleteTarget.id); setDeleteTarget(null); }} onCancel={() => setDeleteTarget(null)} />
  </div>;
}
