import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createNotification(type, message) {
  try {
    return await prisma.notification.create({ data: { type, message } });
  } catch (err) {
    console.error('Failed to create notification:', err);
  }
}
