import { createGalleryMediaSchema, updateGalleryMediaSchema } from '../validators/index.js';
import { prisma } from '../index.js';
import { logActivity } from '../services/activity-log.js';

function mediaType(file) {
  return file.mimetype.startsWith('video/') ? 'VIDEO' : 'IMAGE';
}

export async function list(req, res) {
  try {
    const category = req.query.category?.toUpperCase();
    const where = category && ['PEOPLE', 'PETS', 'PLANET'].includes(category) ? { category } : {};
    const items = await prisma.galleryMedia.findMany({
      where,
      orderBy: [{ activityDate: 'desc' }, { createdAt: 'desc' }],
      take: 500,
    });
    res.json({ success: true, data: items });
  } catch {
    res.status(500).json({ error: 'Failed to fetch gallery media' });
  }
}

export async function create(req, res) {
  try {
    const data = createGalleryMediaSchema.parse(req.body);
    if (!req.file) return res.status(400).json({ error: 'An image or video is required' });
    const item = await prisma.galleryMedia.create({
      data: { ...data, caption: data.caption || null, activityDate: new Date(data.activityDate), mediaType: mediaType(req.file), media: req.file.filename },
    });
    await logActivity(req.user.id, 'CREATE_GALLERY_MEDIA', `Added gallery media for: ${item.activityName}`);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
    res.status(500).json({ error: 'Failed to add gallery media' });
  }
}

export async function update(req, res) {
  try {
    const data = updateGalleryMediaSchema.parse(req.body);
    const updateData = { ...data };
    if (data.activityDate) updateData.activityDate = new Date(data.activityDate);
    if (data.caption === '') updateData.caption = null;
    if (req.file) {
      updateData.media = req.file.filename;
      updateData.mediaType = mediaType(req.file);
    }
    const item = await prisma.galleryMedia.update({ where: { id: Number(req.params.id) }, data: updateData });
    await logActivity(req.user.id, 'UPDATE_GALLERY_MEDIA', `Updated gallery media for: ${item.activityName}`);
    res.json({ success: true, data: item });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
    res.status(500).json({ error: 'Failed to update gallery media' });
  }
}

export async function remove(req, res) {
  try {
    const item = await prisma.galleryMedia.delete({ where: { id: Number(req.params.id) } });
    await logActivity(req.user.id, 'DELETE_GALLERY_MEDIA', `Deleted gallery media for: ${item.activityName}`);
    res.json({ success: true, message: 'Gallery media deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete gallery media' });
  }
}
