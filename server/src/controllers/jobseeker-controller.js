import { createJobSeekerSchema } from '../validators/index.js';
import { prisma } from '../index.js';

export async function create(req, res) {
  try {
    const data = createJobSeekerSchema.parse(req.body);
    const resume = req.file ? req.file.filename : null;
    const jobSeeker = await prisma.jobSeeker.create({ data: { ...data, resume } });
    res.status(201).json({ success: true, message: 'Profile submitted successfully!', data: jobSeeker });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
    res.status(500).json({ error: 'Failed to submit job seeker profile' });
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
    const [seekers, total] = await Promise.all([
      prisma.jobSeeker.findMany({ where, orderBy, skip: (pageNum - 1) * limitNum, take: limitNum }),
      prisma.jobSeeker.count({ where }),
    ]);
    res.json({ success: true, data: seekers, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } });
  } catch {
    res.status(500).json({ error: 'Failed to fetch job seekers' });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    await prisma.jobSeeker.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: 'Job seeker deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete job seeker' });
  }
}
