import { Router } from 'express';
import { list, markRead, markAllRead, unreadCount } from '../../controllers/notification-controller.js';
import { authenticateWithSession } from '../../middleware/auth.js';

const router = Router();

router.get('/', authenticateWithSession, list);
router.get('/unread-count', authenticateWithSession, unreadCount);
router.put('/read-all', authenticateWithSession, markAllRead);
router.put('/:id/read', authenticateWithSession, markRead);

export default router;
