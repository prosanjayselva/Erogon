import { Router } from 'express';
import { create, list, remove } from '../../controllers/employer-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';
import { uploadJd } from '../../middleware/upload.js';

const router = Router();

router.post('/', uploadJd.single('jd'), create);
router.get('/', authenticateWithSession, list);
router.delete('/:id', authenticateWithSession, remove);

export default router;
