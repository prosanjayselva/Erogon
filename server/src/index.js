import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/v1/auth-routes.js';
import donorRoutes from './routes/v1/donor-routes.js';
import eventRoutes from './routes/v1/event-routes.js';
import dashboardRoutes from './routes/v1/dashboard-routes.js';
import notificationRoutes from './routes/v1/notification-routes.js';
import activityLogRoutes from './routes/v1/activity-log-routes.js';
import volunteerRoutes from './routes/v1/volunteer-routes.js';
import jobseekerRoutes from './routes/v1/jobseeker-routes.js';
import employerRoutes from './routes/v1/employer-routes.js';
import contactRoutes from './routes/v1/contact-routes.js';
import newsletterRoutes from './routes/v1/newsletter-routes.js';
import { startEventReminder } from './services/event-reminder.js';

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/donors', donorRoutes);
app.use('/api/v1/events', eventRoutes);
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

// Serve admin-panel build at /admin-panel/
const adminPanelDist = path.join(__dirname, '../../client/admin-panel/dist');
app.use('/admin-panel/assets', express.static(path.join(adminPanelDist, 'assets')));

// Admin-panel SPA fallback
app.get('/admin-panel/*', (_req, res) => {
  res.sendFile(path.join(adminPanelDist, 'index.html'));
});

// Serve portfolio build at /
const portfolioDist = path.join(__dirname, '../../client/portfolio/dist');
app.use(express.static(portfolioDist));

// Portfolio SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(portfolioDist, 'index.html'));
});

startEventReminder();

function startServer(port) {
  const srv = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`  Portfolio: http://localhost:${port}/`);
    console.log(`  Admin:     http://localhost:${port}/admin-panel/`);
  });
  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, retrying...`);
      setTimeout(() => startServer(port), 1000);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
}

startServer(PORT);
