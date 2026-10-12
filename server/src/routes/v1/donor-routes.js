import { Router } from 'express';
import { create, createUpi, list, remove } from '../../controllers/donor-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';

const router = Router();

router.post('/', create);
router.post('/upi', createUpi);
router.get('/', authenticateWithSession, list);
router.delete('/:id', authenticateWithSession, remove);

export default router;
