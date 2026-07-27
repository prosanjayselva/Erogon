import { prisma } from '../index.js';

export async function createNotification(type, message) {
  try {
    return await prisma.notification.create({ data: { type, message } });
  } catch (err) {
    console.error('Failed to create notification:', err);
  }
}
