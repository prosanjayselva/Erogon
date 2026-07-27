import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, refresh, logout, me, attemptsCheck, loginHistory, changePassword } from '../../controllers/auth-controller.js';
import { loginRateLimit } from '../../middleware/login-rate-limit.js';
import { authenticate } from '../../middleware/auth.js';

const router = Router();

const attemptsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

router.get('/me', me);
router.get('/attempts-check', attemptsLimiter, attemptsCheck);
router.post('/login', loginRateLimit, login);
router.post('/refresh', refresh);
router.post('/logout', authenticate, logout);
router.post('/change-password', authenticate, changePassword);
router.get('/login-history', authenticate, loginHistory);

export default router;
