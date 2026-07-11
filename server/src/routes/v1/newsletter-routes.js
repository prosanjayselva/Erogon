import { Router } from 'express';
import { subscribe, list, remove } from '../../controllers/newsletter-controller.js';
import { authenticate } from '../../middleware/auth.js';

const router = Router();

router.post('/', subscribe);
router.get('/', authenticate, list);
router.delete('/:id', authenticate, remove);

export default router;
