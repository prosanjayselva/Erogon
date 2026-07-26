import { Router } from 'express';
import { create, list, getById, update, remove } from '../../controllers/event-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.get('/', list);
router.get('/:id', getById);
router.post('/', authenticateWithSession, upload.single('banner'), create);
router.put('/:id', authenticateWithSession, upload.single('banner'), update);
router.delete('/:id', authenticateWithSession, remove);

export default router;
