import cron from 'node-cron';
import { prisma } from '../index.js';

export function startEventReminder() {
  cron.schedule('0 8 * * *', async () => {
    try {
      const now = new Date();

      const events = await prisma.event.findMany({
        where: {
          status: 'UPCOMING',
          reminderDaysBefore: { not: null },
          eventDate: { gte: now },
        },
      });

      for (const event of events) {
        const reminderDate = new Date(
          event.eventDate.getTime() - event.reminderDaysBefore * 24 * 60 * 60 * 1000
        );

        if (now >= reminderDate) {
          const existing = await prisma.notification.findFirst({
            where: {
              eventId: event.id,
              type: 'EVENT_REMINDER',
            },
          });

          if (!existing) {
            const daysLeft = event.reminderDaysBefore;
            const unit = daysLeft === 1 ? 'day' : 'days';
            await prisma.notification.create({
              data: {
                message: `"${event.title}" is in ${daysLeft} ${unit}!`,
                type: 'EVENT_REMINDER',
                eventId: event.id,
              },
            });
            console.log(`Reminder created for event: ${event.title}`);
          }
        }
      }
    } catch (err) {
      console.error('Event reminder cron failed:', err);
    }
  });

  console.log('Event reminder cron scheduled (daily at 8 AM)');
}
