import { Router } from 'express';
import { stats } from '../../controllers/dashboard-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';

const router = Router();

router.get('/stats', authenticateWithSession, stats);

export default router;
