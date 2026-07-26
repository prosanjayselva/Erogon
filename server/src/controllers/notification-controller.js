import { prisma } from '../index.js';

export async function createNotification(type, message, eventId = null) {
  try {
    return await prisma.notification.create({
      data: { type, message, eventId },
    });
  } catch (err) {
    console.error('Failed to create notification:', err);
  }
}

export async function list(req, res) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { read: false },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json({ success: true, data: notifications });
  } catch {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
}

export async function unreadCount(_req, res) {
  try {
    const count = await prisma.notification.count({ where: { read: false } });
    res.json({ success: true, data: { count } });
  } catch {
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
}

export async function markRead(req, res) {
  try {
    const notif = await prisma.notification.update({
      where: { id: parseInt(req.params.id) },
      data: { read: true },
    });
    const { logActivity } = await import('../services/activity-log.js');
    await logActivity(req.user.id, 'MARK_NOTIFICATION_READ', `Marked notification as read: ${notif.message.slice(0, 80)}`);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
}

export async function markAllRead(req, res) {
  try {
    const { count } = await prisma.notification.updateMany({
      where: { read: false },
      data: { read: true },
    });
    const { logActivity } = await import('../services/activity-log.js');
    await logActivity(req.user.id, 'MARK_ALL_NOTIFICATIONS_READ', `Marked ${count} notifications as read`);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to mark all notifications as read' });
  }
}
