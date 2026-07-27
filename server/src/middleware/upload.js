import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

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
};

function createUpload(fieldName) {
  const config = ALLOWED_TYPES[fieldName] || ALLOWED_TYPES.banner;

  return multer({
    storage: multer.diskStorage({
      destination: 'uploads/',
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
