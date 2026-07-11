import { Router } from 'express';
import { create, list, remove } from '../../controllers/contact-controller.js';
import { authenticate } from '../../middleware/auth.js';

const router = Router();

router.post('/', create);
router.get('/', authenticate, list);
router.delete('/:id', authenticate, remove);

export default router;
