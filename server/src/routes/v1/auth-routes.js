import { Router } from 'express';
import { login, refresh, logout, me, attemptsCheck, loginHistory } from '../../controllers/auth-controller.js';
import { loginRateLimit } from '../../middleware/login-rate-limit.js';
import { authenticate } from '../../middleware/auth.js';

const router = Router();

router.get('/me', me);
router.get('/attempts-check', attemptsCheck);
router.post('/login', loginRateLimit, login);
router.post('/refresh', refresh);
router.post('/logout', authenticate, logout);
router.get('/login-history', authenticate, loginHistory);

export default router;
