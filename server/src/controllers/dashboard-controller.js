import { prisma } from '../index.js';

export async function stats(_req, res) {
  try {
    const [totalDonors, upcomingEvents, completedEvents, totalDonationsAgg, recentDonations, recentActivities] =
      await Promise.all([
        prisma.donor.count(),
        prisma.event.count({ where: { status: 'UPCOMING' } }),
        prisma.event.count({ where: { status: 'COMPLETED' } }),
        prisma.donor.aggregate({ _sum: { amount: true } }),
        prisma.donor.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
        prisma.activityLog.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      ]);

    res.json({
      success: true,
      data: {
        totalDonors,
        upcomingEvents,
        completedEvents,
        totalDonations: totalDonationsAgg._sum.amount || 0,
        recentDonations,
        recentActivities,
      },
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
}
