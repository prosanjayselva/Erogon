import { Router } from 'express';
import { list, create, update, remove } from '../../controllers/gallery-media-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';
import { uploadGalleryMedia } from '../../middleware/upload.js';

const router = Router();
router.get('/', list);
router.post('/', authenticateWithSession, uploadGalleryMedia.single('media'), create);
router.put('/:id', authenticateWithSession, uploadGalleryMedia.single('media'), update);
router.delete('/:id', authenticateWithSession, remove);
export default router;
