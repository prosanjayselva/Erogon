import { Router } from 'express';
import { list, update } from '../../controllers/home-stat-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';

const router = Router();
router.get('/', list);
router.put('/', authenticateWithSession, update);
export default router;
