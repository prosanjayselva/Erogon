import { createEventSchema, updateEventSchema } from '../validators/index.js';
import { prisma } from '../index.js';
import { logActivity } from '../services/activity-log.js';

export async function create(req, res) {
  try {
    const data = createEventSchema.parse(req.body);
    const banner = req.file ? req.file.filename : null;

    const event = await prisma.event.create({
      data: {
        ...data,
        eventDate: new Date(data.eventDate),
        banner,
      },
    });

    await logActivity(req.user.id, 'CREATE_EVENT', `Created event: ${event.title}`);
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors[0].message });
    }
    res.status(500).json({ error: 'Failed to create event' });
  }
}

export async function list(req, res) {
  try {
    const { status, page = '1', limit = '20' } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

    const where = status ? { status: status.toUpperCase() } : {};

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { eventDate: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.event.count({ where }),
    ]);

    res.json({
      success: true,
      data: events,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
}

export async function getById(req, res) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ success: true, data: event });
  } catch {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
}

export async function update(req, res) {
  try {
    const data = updateEventSchema.parse(req.body);
    const banner = req.file ? req.file.filename : undefined;

    const updateData = { ...data };
    if (data.eventDate) updateData.eventDate = new Date(data.eventDate);
    if (banner) updateData.banner = banner;

    const event = await prisma.event.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
    });

    await logActivity(req.user.id, 'UPDATE_EVENT', `Updated event: ${event.title}`);
    res.json({ success: true, data: event });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors[0].message });
    }
    res.status(500).json({ error: 'Failed to update event' });
  }
}

export async function remove(req, res) {
  try {
    const event = await prisma.event.delete({ where: { id: parseInt(req.params.id) } });
    await logActivity(req.user.id, 'DELETE_EVENT', `Deleted event: ${event.title}`);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete event' });
  }
}
