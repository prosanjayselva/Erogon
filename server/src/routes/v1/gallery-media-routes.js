import { Router } from 'express';
import { list, createImage, createVideo, updateImage, updateVideo, removeImage, removeVideo } from '../../controllers/gallery-media-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';
import { uploadGalleryImage, uploadGalleryVideo } from '../../middleware/upload.js';

const router = Router();
router.get('/', list);
router.post('/images', authenticateWithSession, uploadGalleryImage.single('media'), createImage);
router.post('/videos', authenticateWithSession, uploadGalleryVideo.single('media'), createVideo);
router.put('/images/:id', authenticateWithSession, uploadGalleryImage.single('media'), updateImage);
router.put('/videos/:id', authenticateWithSession, uploadGalleryVideo.single('media'), updateVideo);
router.delete('/images/:id', authenticateWithSession, removeImage);
router.delete('/videos/:id', authenticateWithSession, removeVideo);
export default router;
