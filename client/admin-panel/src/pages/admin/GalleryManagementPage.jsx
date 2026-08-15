import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client.js';
import { useToastStore } from '../../stores/toast-store.js';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';

const emptyForm = { activityName: '', activityDate: '', category: 'PEOPLE', caption: '', mediaType: 'IMAGE' };
const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const videoTypes = ['video/mp4', 'video/webm'];
const mediaTypeLabel = { IMAGE: 'image', VIDEO: 'video' };
const mediaEndpoint = (mediaType) => (mediaType === 'VIDEO' ? '/gallery-media/videos' : '/gallery-media/images');
const fileError = (file, mediaType, required) => {
  if (!file) return required ? 'Please select a file' : '';
  const types = mediaType === 'VIDEO' ? videoTypes : imageTypes;
  if (!types.includes(file.type)) return mediaType === 'VIDEO' ? 'Use MP4 or WebM only' : 'Use JPG, PNG, GIF or WebP only';
  const max = mediaType === 'VIDEO' ? 100 : 10;
  return file.size > max * 1024 * 1024 ? `Media must be under ${max}MB` : '';
};

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
  const createMutation = useMutation({ mutationFn: ({ payload, mediaType }) => api.post(mediaEndpoint(mediaType), payload), onSuccess: created, onError: failed });
  const updateMutation = useMutation({ mutationFn: ({ id, payload, mediaType }) => api.put(`${mediaEndpoint(mediaType)}/${id}`, payload), onSuccess: created, onError: failed });
  const deleteMutation = useMutation({ mutationFn: (item) => api.delete(`${mediaEndpoint(item.mediaType)}/${item.id}`), onSuccess: () => { refresh(); toast('Gallery media deleted', 'success'); }, onError: () => toast('Could not delete gallery media', 'error') });

  function submit(event) {
    event.preventDefault();
    const validation = fileError(media, form.mediaType, !editing);
    if (validation) return setError(validation);
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => { if (key !== 'mediaType') payload.append(key, value); });
    if (media) payload.append('media', media);
    editing
      ? updateMutation.mutate({ id: editing.id, payload, mediaType: editing.mediaType })
      : createMutation.mutate({ payload, mediaType: form.mediaType });
  }

  function edit(item) {
    setEditing(item);
    setForm({ activityName: item.activityName, activityDate: item.activityDate.slice(0, 10), category: item.category, caption: item.caption || '', mediaType: item.mediaType });
    setMedia(null); setError(''); setOpen(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <div>
    <div className="page-header"><h1>Gallery Management</h1><p>Add pictures and videos under an activity name and date. Images and videos are stored separately.</p></div>
    <div className="toolbar"><div className="toolbar-left"><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="">All three categories</option><option value="PEOPLE">People</option><option value="PETS">Pets</option><option value="PLANET">Planet</option></select><span className="toolbar-count"><b>{data?.data?.length || 0}</b> media items</span></div><button className="btn-add" onClick={() => open ? reset() : setOpen(true)}>{open ? 'Cancel' : '+ Add Gallery Media'}</button></div>
    {open && <form className="event-form" onSubmit={submit}><h2>{editing ? 'Edit Gallery Media' : 'Add Gallery Media'}</h2><div className="form-grid">
      <label>Activity Name<input value={form.activityName} onChange={(event) => setForm({ ...form, activityName: event.target.value })} required /></label>
      <label>Activity Date<input type="date" value={form.activityDate} onChange={(event) => setForm({ ...form, activityDate: event.target.value })} required /></label>
      <label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option value="PEOPLE">People</option><option value="PETS">Pets</option><option value="PLANET">Planet</option></select></label>
      <label>Media Type<select value={form.mediaType} onChange={(event) => { setForm({ ...form, mediaType: event.target.value }); setMedia(null); setError(''); }}><option value="IMAGE">Image</option><option value="VIDEO">Video</option></select></label>
      <label>{editing ? 'Replace Media (optional)' : 'Media'}<input type="file" accept={form.mediaType === 'VIDEO' ? '.mp4,.webm' : '.jpg,.jpeg,.png,.gif,.webp'} required={!editing} onChange={(event) => { const selected = event.target.files[0]; setMedia(selected); setError(fileError(selected, form.mediaType, !editing)); }} />{error && <span className="form-error">{error}</span>}</label>
      <label className="full-width">Description (optional)<textarea rows="3" value={form.caption} onChange={(event) => setForm({ ...form, caption: event.target.value })} placeholder="Short description shown under the media on the gallery" /></label>
    </div><button className="btn-save" type="submit">{editing ? 'Update Media' : 'Add to Gallery'}</button></form>}
    {isLoading ? <div className="admin-loading">Loading...</div> : <div className="event-grid">{!data?.data?.length && <p className="empty-state">No gallery media found</p>}{data?.data?.map((item) => <article className="event-card" key={`${item.mediaType}-${item.id}`}><div className="event-card-img">{item.mediaType === 'VIDEO' ? <video src={`/uploads/${item.media}`} controls preload="metadata" /> : <img src={`/uploads/${item.media}`} alt={item.caption || item.activityName} />}</div><div className="event-card-body"><span className="event-status event-status-completed">{item.category} · {mediaTypeLabel[item.mediaType]}</span><h3 className="event-card-title">{item.activityName}</h3><div className="event-card-meta"><span>{new Date(item.activityDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>{item.caption && <span>{item.caption}</span>}</div><div className="event-card-actions"><button className="btn-icon btn-icon-edit" onClick={() => edit(item)}>Edit</button><button className="btn-icon btn-icon-delete" onClick={() => setDeleteTarget(item)}>Delete</button></div></div></article>)}</div>}
    <ConfirmDialog open={!!deleteTarget} title="Delete Gallery Media" message={`Delete this ${mediaTypeLabel[deleteTarget?.mediaType] || 'media'} from “${deleteTarget?.activityName}”?`} onConfirm={() => { deleteMutation.mutate(deleteTarget); setDeleteTarget(null); }} onCancel={() => setDeleteTarget(null)} />
  </div>;
}
