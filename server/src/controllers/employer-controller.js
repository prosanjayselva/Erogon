import { createEmployerSchema } from '../validators/index.js';
import { prisma } from '../index.js';
import { createNotification } from '../services/notification.js';

export async function create(req, res) {
  try {
    const data = createEmployerSchema.parse(req.body);
    const jd = req.file ? req.file.filename : null;
    const employer = await prisma.employer.create({ data: { ...data, jd } });
    await createNotification('EMPLOYER', `New employer requirement from ${employer.organization}`);
    res.status(201).json({ success: true, message: 'Requirement submitted successfully!', data: employer });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
    res.status(500).json({ error: 'Failed to submit employer requirement' });
  }
}

export async function list(req, res) {
  try {
    const { search = '', sortBy = 'created_at', sortOrder = 'desc', page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const where = search ? { OR: [{ organization: { contains: search, mode: 'insensitive' } }, { contactPerson: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }] } : {};
    const orderBy = {};
    if (sortBy === 'organization') orderBy.organization = sortOrder;
    else orderBy.createdAt = sortOrder;
    const [employers, total] = await Promise.all([
      prisma.employer.findMany({ where, orderBy, skip: (pageNum - 1) * limitNum, take: limitNum }),
      prisma.employer.count({ where }),
    ]);
    res.json({ success: true, data: employers, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } });
  } catch {
    res.status(500).json({ error: 'Failed to fetch employer requirements' });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    await prisma.employer.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: 'Employer requirement deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete employer requirement' });
  }
}
