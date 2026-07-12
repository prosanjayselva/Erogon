import { prisma } from '../index.js';

export async function logActivity(adminId, action, details = null) {
  try {
    await prisma.activityLog.create({
      data: { adminId, action, details },
    });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
}
