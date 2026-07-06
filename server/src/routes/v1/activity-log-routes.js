import { Router } from 'express';
import { list } from '../../controllers/activity-log-controller.js';
import { authenticate } from '../../middleware/auth.js';

const router = Router();

router.get('/', authenticate, list);

export default router;
