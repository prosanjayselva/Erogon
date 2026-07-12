import { createNewsletterSchema } from '../validators/index.js';
import { prisma } from '../index.js';
import { createNotification } from '../services/notification.js';

export async function subscribe(req, res) {
  try {
    const { email } = createNewsletterSchema.parse(req.body);
    const existing = await prisma.newsletter.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already subscribed' });
    const sub = await prisma.newsletter.create({ data: { email } });
    await createNotification('NEWSLETTER', `New newsletter subscriber: ${email}`);
    res.status(201).json({ success: true, message: 'Subscribed successfully!', data: sub });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
    res.status(500).json({ error: 'Failed to subscribe' });
  }
}

export async function list(req, res) {
  try {
    const { search = '', page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const where = search ? { email: { contains: search, mode: 'insensitive' } } : {};
    const [subs, total] = await Promise.all([
      prisma.newsletter.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (pageNum - 1) * limitNum, take: limitNum }),
      prisma.newsletter.count({ where }),
    ]);
    res.json({ success: true, data: subs, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } });
  } catch {
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    await prisma.newsletter.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: 'Subscriber deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete subscriber' });
  }
}
