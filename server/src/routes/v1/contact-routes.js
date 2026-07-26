import { Router } from 'express';
import { create, list, remove } from '../../controllers/contact-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';

const router = Router();

router.post('/', create);
router.get('/', authenticateWithSession, list);
router.delete('/:id', authenticateWithSession, remove);

export default router;
