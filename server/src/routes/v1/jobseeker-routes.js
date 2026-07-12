import { Router } from 'express';
import multer from 'multer';
import { create, list, remove } from '../../controllers/jobseeker-controller.js';
import { authenticate } from '../../middleware/auth.js';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/', upload.single('resume'), create);
router.get('/', authenticate, list);
router.delete('/:id', authenticate, remove);

export default router;
