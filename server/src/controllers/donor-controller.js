import { createDonorSchema } from '../validators/index.js';
import { prisma } from '../index.js';
import { logActivity } from '../services/activity-log.js';

export async function create(req, res) {
  try {
    const data = createDonorSchema.parse(req.body);

    const donor = await prisma.donor.create({ data });

    res.status(201).json({
      success: true,
      message: 'Thank you for your donation!',
      data: donor,
    });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors[0].message });
    }
    res.status(500).json({ error: 'Failed to create donor' });
  }
}

export async function list(req, res) {
  try {
    const {
      search = '',
      sortBy = 'created_at',
      sortOrder = 'desc',
      page = '1',
      limit = '20',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const orderBy = {};
    if (sortBy === 'name') orderBy.name = sortOrder;
    else if (sortBy === 'amount') orderBy.amount = sortOrder;
    else orderBy.createdAt = sortOrder;

    const [donors, total] = await Promise.all([
      prisma.donor.findMany({
        where,
        orderBy,
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.donor.count({ where }),
    ]);

    res.json({
      success: true,
      data: donors,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    const donor = await prisma.donor.delete({ where: { id: parseInt(id) } });
    await logActivity(req.user.id, 'DELETE_DONOR', `Deleted donor: ${donor.name} (₹${donor.amount})`);
    res.json({ success: true, message: 'Donor deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete donor' });
  }
}
