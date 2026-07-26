import { Router } from 'express';
import { list } from '../../controllers/activity-log-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';

const router = Router();

router.get('/', authenticateWithSession, list);

export default router;
