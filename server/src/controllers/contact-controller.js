import { createContactSchema } from '../validators/index.js';
import { prisma } from '../index.js';
import { createNotification } from '../services/notification.js';

export async function create(req, res) {
  try {
    const data = createContactSchema.parse(req.body);
    const contact = await prisma.contact.create({ data });
    await createNotification('CONTACT', `New contact message from ${contact.fullName}`);
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
}

export async function list(req, res) {
  try {
    const { search = '', sortBy = 'created_at', sortOrder = 'desc', page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const where = search ? { OR: [{ fullName: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }, { subject: { contains: search, mode: 'insensitive' } }] } : {};
    const orderBy = {};
    if (sortBy === 'fullName') orderBy.fullName = sortOrder;
    else orderBy.createdAt = sortOrder;
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({ where, orderBy, skip: (pageNum - 1) * limitNum, take: limitNum }),
      prisma.contact.count({ where }),
    ]);
    res.json({ success: true, data: contacts, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } });
  } catch {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    await prisma.contact.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
}
