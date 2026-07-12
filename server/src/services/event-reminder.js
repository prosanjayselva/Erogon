import cron from 'node-cron';
import { prisma } from '../index.js';

export function startEventReminder() {
  cron.schedule('0 8 * * *', async () => {
    try {
      const now = new Date();
      const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

      const events = await prisma.event.findMany({
        where: {
          status: 'UPCOMING',
          eventDate: {
            gte: now,
            lte: twoDaysFromNow,
          },
        },
      });

      for (const event of events) {
        await prisma.notification.create({
          data: {
            message: `"${event.title}" is in 2 days!`,
            type: 'EVENT_REMINDER',
          },
        });
        console.log(`Reminder created for event: ${event.title}`);
      }
    } catch (err) {
      console.error('Event reminder cron failed:', err);
    }
  });

  console.log('Event reminder cron scheduled (daily at 8 AM)');
}
