import { Router } from 'express';
import { subscribe, list, remove } from '../../controllers/newsletter-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';

const router = Router();

router.post('/', subscribe);
router.get('/', authenticateWithSession, list);
router.delete('/:id', authenticateWithSession, remove);

export default router;
