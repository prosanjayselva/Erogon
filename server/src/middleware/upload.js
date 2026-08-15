import fs from 'fs';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const uploadsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../uploads');

const ALLOWED_TYPES = {
  resume: {
    mime: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ],
    ext: ['.pdf', '.doc', '.docx', '.txt'],
    maxSize: 5 * 1024 * 1024,
  },
  jd: {
    mime: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ],
    ext: ['.pdf', '.doc', '.docx', '.txt'],
    maxSize: 5 * 1024 * 1024,
  },
  banner: {
    mime: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ],
    ext: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    maxSize: 5 * 1024 * 1024,
  },
  galleryImage: {
    mime: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ext: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    maxSize: 10 * 1024 * 1024,
    dest: 'gallery/images',
  },
  galleryVideo: {
    mime: ['video/mp4', 'video/webm'],
    ext: ['.mp4', '.webm'],
    maxSize: 100 * 1024 * 1024,
    dest: 'gallery/videos',
  },
  report: {
    mime: [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ],
    ext: ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.webp'],
    maxSize: 20 * 1024 * 1024,
    dest: 'reports',
  },
};

function createUpload(fieldName) {
  const config = ALLOWED_TYPES[fieldName] || ALLOWED_TYPES.banner;
  const destination = config.dest ? path.join(uploadsDirectory, config.dest) : uploadsDirectory;
  fs.mkdirSync(destination, { recursive: true });

  return multer({
    storage: multer.diskStorage({
      destination,
      filename: (req, file, cb) => {
        const unique = crypto.randomBytes(16).toString('hex');
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${unique}${ext}`);
      },
    }),
    limits: { fileSize: config.maxSize },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (config.mime.includes(file.mimetype) && config.ext.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error(`Invalid file type. Allowed: ${config.ext.join(', ')}`));
      }
    },
  });
}

export const uploadResume = createUpload('resume');
export const uploadJd = createUpload('jd');
export const uploadBanner = createUpload('banner');
export const uploadGalleryImage = createUpload('galleryImage');
export const uploadGalleryVideo = createUpload('galleryVideo');
export const uploadReport = createUpload('report');
