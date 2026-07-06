import { Router } from 'express';
import { create, list, getById, update, remove } from '../../controllers/event-controller.js';
import { authenticate } from '../../middleware/auth.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.get('/', list);
router.get('/:id', getById);
router.post('/', authenticate, upload.single('banner'), create);
router.put('/:id', authenticate, upload.single('banner'), update);
router.delete('/:id', authenticate, remove);

export default router;
