import { prisma } from '../index.js';

const ACTION_COLORS = {
  LOGIN: '\x1b[32m',
  FAILED_LOGIN: '\x1b[31m',
  LOGOUT: '\x1b[33m',
  CREATE: '\x1b[36m',
  UPDATE: '\x1b[35m',
  DELETE: '\x1b[91m',
  VIEW: '\x1b[90m',
};
const RESET = '\x1b[0m';

export async function logActivity(adminId, action, details = null) {
  const color = ACTION_COLORS[action] || '\x1b[37m';
  const timestamp = new Date().toISOString();
  console.log(`${color}[AUDIT] ${timestamp} | ${action} | admin:${adminId} | ${details || ''}${RESET}`);

  try {
    await prisma.activityLog.create({
      data: { adminId, action, details },
    });
  } catch (err) {
    console.error('Failed to log activity to database:', err);
  }
}
