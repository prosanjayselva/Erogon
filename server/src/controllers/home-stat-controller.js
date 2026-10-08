import { z } from 'zod';
import { prisma } from '../index.js';
import { logActivity } from '../services/activity-log.js';

const defaults = [
  { key: 'lives-impacted', label: 'Lives Impacted', value: 373 },
  { key: 'free-medical-camp', label: 'Free Medical Camp', value: 1 },
  { key: 'education-support', label: 'Education Support', value: 3 },
  { key: 'meals-served', label: 'Meals Served', value: 160 },
  { key: 'trees-planted', label: 'Trees Planted', value: 41 },
  { key: 'placement-support', label: 'Placement Support', value: 0 },
  { key: 'women-empowered', label: 'Women Empowered', value: 0 },
  { key: 'youth-skilled', label: 'Youth Skilled', value: 0 },
  { key: 'animals-rescued', label: 'Animals Rescued & Care', value: 0 },
];

const updateSchema = z.object({
  values: z.object(Object.fromEntries(defaults.map(({ key }) => [key, z.number().int().min(0).max(2147483647)]))).strict(),
}).strict();

export async function list(_req, res) {
  try {
    const saved = await prisma.homeStat.findMany();
    const values = new Map(saved.map((item) => [item.key, item.value]));
    res.set('Cache-Control', 'no-store');
    res.json({ success: true, data: defaults.map((item) => ({ ...item, value: values.get(item.key) ?? item.value })) });
  } catch {
    res.status(500).json({ error: 'Failed to fetch homepage statistics' });
  }
}

export async function update(req, res) {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Enter a valid non-negative whole number for every statistic' });

  try {
    await prisma.$transaction(defaults.map(({ key }) => prisma.homeStat.upsert({
      where: { key },
      create: { key, value: parsed.data.values[key] },
      update: { value: parsed.data.values[key] },
    })));
    await logActivity(req.user.id, 'UPDATE_HOME_STATS', 'Updated homepage statistics');
    res.json({ success: true, data: defaults.map((item) => ({ ...item, value: parsed.data.values[item.key] })) });
  } catch {
    res.status(500).json({ error: 'Failed to update homepage statistics' });
  }
}
