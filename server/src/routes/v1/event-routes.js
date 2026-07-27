import { Router } from 'express';
import { create, list, getById, update, remove } from '../../controllers/event-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';
import { uploadBanner } from '../../middleware/upload.js';

const router = Router();

router.get('/', list);
router.get('/:id', getById);
router.post('/', authenticateWithSession, uploadBanner.single('banner'), create);
router.put('/:id', authenticateWithSession, uploadBanner.single('banner'), update);
router.delete('/:id', authenticateWithSession, remove);

export default router;
