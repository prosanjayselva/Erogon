import fs from 'fs';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/v1/auth-routes.js';
import donorRoutes from './routes/v1/donor-routes.js';
import eventRoutes from './routes/v1/event-routes.js';
// Gallery database API is temporarily disabled.
// import galleryMediaRoutes from './routes/v1/gallery-media-routes.js';
import dashboardRoutes from './routes/v1/dashboard-routes.js';
import notificationRoutes from './routes/v1/notification-routes.js';
import activityLogRoutes from './routes/v1/activity-log-routes.js';
import volunteerRoutes from './routes/v1/volunteer-routes.js';
import jobseekerRoutes from './routes/v1/jobseeker-routes.js';
import employerRoutes from './routes/v1/employer-routes.js';
import contactRoutes from './routes/v1/contact-routes.js';
import newsletterRoutes from './routes/v1/newsletter-routes.js';
import { authenticate, authenticateWithSession } from './middleware/auth.js';
import { csrfProtection } from './middleware/csrf.js';

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000; // Shared API port used by both development frontends.
app.set('trust proxy', 1);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.JWT_ACCESS_SECRET || process.env.JWT_ACCESS_SECRET.length < 20) {
  console.warn('⚠️  WEAK JWT_ACCESS_SECRET — generate a strong random secret for production');
  process.exit(1);
}
if (!process.env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH_SECRET.length < 20) {
  console.warn('⚠️  WEAK JWT_REFRESH_SECRET — generate a strong random secret for production');
  process.exit(1);
}

const isProduction = process.env.NODE_ENV === 'production';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      mediaSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: isProduction ? [] : null,
    },
  },
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  hsts: isProduction ? { maxAge: 31536000, includeSubDomains: true } : false,
}));

app.use((_req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

app.use(cors({
  origin: process.env.CORS_ORIGIN || (isProduction ? false : 'http://localhost:5173'),
  credentials: true,
}));
app.use(cookieParser());
app.use(csrfProtection);
app.use(express.json({ limit: '500kb' }));

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const publicUploads = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.webm']);

app.use('/uploads', (req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  if (publicUploads.has(ext)) {
    return express.static(uploadsDir)(req, res, next);
  }
  authenticate(req, res, next);
}, express.static(uploadsDir));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth requests. Please wait.' },
});

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please wait.' },
});

app.use('/api/', globalLimiter);
app.post('/api/v1/auth/login', authLimiter);
app.post('/api/v1/auth/refresh', authLimiter);
app.use('/api/v1/donors', formLimiter);
app.use('/api/v1/volunteers', formLimiter);
app.use('/api/v1/job-seekers', formLimiter);
app.use('/api/v1/employers', formLimiter);
app.use('/api/v1/contacts', formLimiter);
app.use('/api/v1/newsletter', formLimiter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/donors', donorRoutes);
app.use('/api/v1/events', eventRoutes);
// app.use('/api/v1/gallery-media', galleryMediaRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/activity-logs', activityLogRoutes);
app.use('/api/v1/volunteers', volunteerRoutes);
app.use('/api/v1/job-seekers', jobseekerRoutes);
app.use('/api/v1/employers', employerRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);

app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const adminPanelDist = path.join(__dirname, '../../client/admin-panel/dist');
app.use('/admin-panel/assets', express.static(path.join(adminPanelDist, 'assets')));
app.use('/admin-panel/images', express.static(path.join(adminPanelDist, 'images')));

app.get('/admin-panel', (_req, res) => {
  res.redirect(302, '/admin-panel/');
});
app.get('/admin-panel/', (_req, res) => {
  res.sendFile(path.join(adminPanelDist, 'index.html'));
});
app.get('/admin-panel/*', (_req, res) => {
  res.sendFile(path.join(adminPanelDist, 'index.html'));
});

const portfolioDist = path.join(__dirname, '../../client/portfolio/dist');
app.use(express.static(portfolioDist));

app.get('*', (_req, res) => {
  res.sendFile(path.join(portfolioDist, 'index.html'));
});

function startServer(port, retries = 5) {
  const srv = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`  Portfolio: http://localhost:${port}/`);
    console.log(`  Admin:     http://localhost:${port}/admin-panel/`);
    console.log(`  Security:  CSP enabled, brute-force protection active`);
  });
  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      if (retries <= 0) {
        console.error(`Port ${port} still in use after retries. Exiting.`);
        process.exit(1);
      }
      console.log(`Port ${port} in use, retrying (${retries - 1} left)...`);
      setTimeout(() => startServer(port, retries - 1), 3000);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
}

startServer(PORT);

async function cleanupExpiredTokens() {
  try {
    const result = await prisma.refreshToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    if (result.count > 0) console.log(`Cleaned up ${result.count} expired refresh tokens`);
  } catch { /* ignore */ }
}
cleanupExpiredTokens();
setInterval(cleanupExpiredTokens, 60 * 60 * 1000);
