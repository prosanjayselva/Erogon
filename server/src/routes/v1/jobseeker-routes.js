import { Router } from 'express';
import { create, list, remove } from '../../controllers/jobseeker-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';
import { uploadResume } from '../../middleware/upload.js';

const router = Router();

router.post('/', uploadResume.single('resume'), create);
router.get('/', authenticateWithSession, list);
router.delete('/:id', authenticateWithSession, remove);

export default router;
