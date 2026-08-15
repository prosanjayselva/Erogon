import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGalleryMediaSchema, updateGalleryMediaSchema } from '../validators/index.js';
import { prisma } from '../index.js';
import { logActivity } from '../services/activity-log.js';

const uploadsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../uploads');

const MEDIA_SUBFOLDER = {
  IMAGE: 'gallery/images',
  VIDEO: 'gallery/videos',
};

function getModel(mediaType) {
  return mediaType === 'IMAGE' ? prisma.galleryImage : prisma.galleryVideo;
}

function mediaPath(mediaType, filename) {
  return `${MEDIA_SUBFOLDER[mediaType]}/${filename}`;
}

function removeStoredFile(media) {
  if (!media) return;
  fs.promises.unlink(path.join(uploadsDirectory, media)).catch(() => {});
}

export async function list(req, res) {
  try {
    const category = req.query.category?.toUpperCase();
    const where = category && ['PEOPLE', 'PETS', 'PLANET'].includes(category) ? { category } : {};

    const [images, videos] = await Promise.all([
      prisma.galleryImage.findMany({ where, orderBy: [{ activityDate: 'desc' }, { createdAt: 'desc' }] }),
      prisma.galleryVideo.findMany({ where, orderBy: [{ activityDate: 'desc' }, { createdAt: 'desc' }] }),
    ]);

    const items = [
      ...images.map((item) => ({ ...item, mediaType: 'IMAGE' })),
      ...videos.map((item) => ({ ...item, mediaType: 'VIDEO' })),
    ].sort((a, b) => b.activityDate - a.activityDate || b.createdAt - a.createdAt);

    res.json({ success: true, data: items });
  } catch {
    res.status(500).json({ error: 'Failed to fetch gallery media' });
  }
}

function createHandler(mediaType) {
  const label = mediaType === 'IMAGE' ? 'image' : 'video';
  return async (req, res) => {
    try {
      const data = createGalleryMediaSchema.parse(req.body);
      if (!req.file) return res.status(400).json({ error: `An ${label} is required` });

      const item = await getModel(mediaType).create({
        data: {
          ...data,
          caption: data.caption || null,
          activityDate: new Date(data.activityDate),
          media: mediaPath(mediaType, req.file.filename),
        },
      });

      await logActivity(req.user.id, `CREATE_GALLERY_${mediaType}`, `Added gallery ${label} for: ${item.activityName}`);
      res.status(201).json({ success: true, data: item });
    } catch (err) {
      if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
      res.status(500).json({ error: `Failed to add gallery ${label}` });
    }
  };
}

function updateHandler(mediaType) {
  const label = mediaType === 'IMAGE' ? 'image' : 'video';
  return async (req, res) => {
    try {
      const data = updateGalleryMediaSchema.parse(req.body);
      const updateData = { ...data };
      if (data.activityDate) updateData.activityDate = new Date(data.activityDate);
      if (data.caption === '') updateData.caption = null;

      const id = Number(req.params.id);
      if (req.file) {
        const existing = await getModel(mediaType).findUnique({ where: { id } });
        updateData.media = mediaPath(mediaType, req.file.filename);
        if (existing?.media) removeStoredFile(existing.media);
      }

      const item = await getModel(mediaType).update({ where: { id }, data: updateData });
      await logActivity(req.user.id, `UPDATE_GALLERY_${mediaType}`, `Updated gallery ${label} for: ${item.activityName}`);
      res.json({ success: true, data: item });
    } catch (err) {
      if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
      res.status(500).json({ error: `Failed to update gallery ${label}` });
    }
  };
}

function removeHandler(mediaType) {
  const label = mediaType === 'IMAGE' ? 'image' : 'video';
  return async (req, res) => {
    try {
      const id = Number(req.params.id);
      const item = await getModel(mediaType).delete({ where: { id } });
      if (item.media) removeStoredFile(item.media);
      await logActivity(req.user.id, `DELETE_GALLERY_${mediaType}`, `Deleted gallery ${label} for: ${item.activityName}`);
      res.json({ success: true, message: `Gallery ${label} deleted successfully` });
    } catch {
      res.status(500).json({ error: `Failed to delete gallery ${label}` });
    }
  };
}

export const createImage = createHandler('IMAGE');
export const createVideo = createHandler('VIDEO');
export const updateImage = updateHandler('IMAGE');
export const updateVideo = updateHandler('VIDEO');
export const removeImage = removeHandler('IMAGE');
export const removeVideo = removeHandler('VIDEO');
