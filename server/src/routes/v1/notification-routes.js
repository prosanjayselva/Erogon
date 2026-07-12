import { Router } from 'express';
import { list, markRead, markAllRead, unreadCount } from '../../controllers/notification-controller.js';
import { authenticate } from '../../middleware/auth.js';

const router = Router();

router.get('/', authenticate, list);
router.get('/unread-count', authenticate, unreadCount);
router.put('/read-all', authenticate, markAllRead);
router.put('/:id/read', authenticate, markRead);

export default router;
