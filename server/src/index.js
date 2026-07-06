import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/v1/auth-routes.js';
import donorRoutes from './routes/v1/donor-routes.js';
import eventRoutes from './routes/v1/event-routes.js';
import dashboardRoutes from './routes/v1/dashboard-routes.js';
import notificationRoutes from './routes/v1/notification-routes.js';
import activityLogRoutes from './routes/v1/activity-log-routes.js';
import { startEventReminder } from './services/event-reminder.js';

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/donors', donorRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/activity-logs', activityLogRoutes);

app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

startEventReminder();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
