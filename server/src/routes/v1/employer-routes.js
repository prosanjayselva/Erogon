import { Router } from 'express';
import multer from 'multer';
import { create, list, remove } from '../../controllers/employer-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/', upload.single('jd'), create);
router.get('/', authenticateWithSession, list);
router.delete('/:id', authenticateWithSession, remove);

export default router;
