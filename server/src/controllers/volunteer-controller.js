import { createVolunteerSchema } from '../validators/index.js';
import { prisma } from '../index.js';
import { createNotification } from '../services/notification.js';
import { logActivity } from '../services/activity-log.js';

export async function create(req, res) {
  try {
    const data = createVolunteerSchema.parse(req.body);
    const volunteer = await prisma.volunteer.create({ data });
    await createNotification('VOLUNTEER', `New volunteer sign-up from ${volunteer.fullName}`);
    await logActivity(0, 'NEW_VOLUNTEER', `New volunteer sign-up: ${volunteer.fullName} (${volunteer.email})`);
    res.status(201).json({ success: true, message: 'Thank you for your interest!', data: volunteer });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
    res.status(500).json({ error: 'Failed to submit volunteer form' });
  }
}

export async function list(req, res) {
  try {
    const { search = '', sortBy = 'created_at', sortOrder = 'desc', page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const where = search ? { OR: [{ fullName: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }, { contactNumber: { contains: search, mode: 'insensitive' } }] } : {};
    const orderBy = {};
    if (sortBy === 'fullName') orderBy.fullName = sortOrder;
    else orderBy.createdAt = sortOrder;
    const [volunteers, total] = await Promise.all([
      prisma.volunteer.findMany({ where, orderBy, skip: (pageNum - 1) * limitNum, take: limitNum }),
      prisma.volunteer.count({ where }),
    ]);
    res.json({ success: true, data: volunteers, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } });
  } catch {
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    const volunteer = await prisma.volunteer.delete({ where: { id: parseInt(id) } });
    await logActivity(req.user.id, 'DELETE_VOLUNTEER', `Deleted volunteer: ${volunteer.fullName} (${volunteer.email})`);
    res.json({ success: true, message: 'Volunteer deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete volunteer' });
  }
}
