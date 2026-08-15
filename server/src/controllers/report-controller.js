import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createReportSchema, updateReportSchema } from '../validators/index.js';
import { prisma } from '../index.js';
import { logActivity } from '../services/activity-log.js';

const uploadsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../uploads');

function reportFile(filename) {
  return `reports/${filename}`;
}

function removeStoredFile(file) {
  if (!file) return;
  fs.promises.unlink(path.join(uploadsDirectory, file)).catch(() => {});
}

export async function list(req, res) {
  try {
    const category = req.query.category?.toUpperCase();
    const where = category && ['ACTIVITY_REPORT', 'IMPACT_REPORT'].includes(category) ? { category } : {};
    const reports = await prisma.report.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: reports });
  } catch {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
}

export async function create(req, res) {
  try {
    const data = createReportSchema.parse(req.body);
    if (!req.file) return res.status(400).json({ error: 'A report file is required' });

    const report = await prisma.report.create({
      data: {
        ...data,
        description: data.description || null,
        file: reportFile(req.file.filename),
      },
    });

    await logActivity(req.user.id, 'CREATE_REPORT', `Created report: ${report.title}`);
    res.status(201).json({ success: true, data: report });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
    res.status(500).json({ error: 'Failed to create report' });
  }
}

export async function update(req, res) {
  try {
    const data = updateReportSchema.parse(req.body);
    const updateData = { ...data };
    if (data.description === '') updateData.description = null;

    const id = parseInt(req.params.id);
    if (req.file) {
      const existing = await prisma.report.findUnique({ where: { id } });
      updateData.file = reportFile(req.file.filename);
      if (existing?.file) removeStoredFile(existing.file);
    }

    const report = await prisma.report.update({ where: { id }, data: updateData });
    await logActivity(req.user.id, 'UPDATE_REPORT', `Updated report: ${report.title}`);
    res.json({ success: true, data: report });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors[0].message });
    res.status(500).json({ error: 'Failed to update report' });
  }
}

export async function remove(req, res) {
  try {
    const report = await prisma.report.delete({ where: { id: parseInt(req.params.id) } });
    if (report.file) removeStoredFile(report.file);
    await logActivity(req.user.id, 'DELETE_REPORT', `Deleted report: ${report.title}`);
    res.json({ success: true, message: 'Report deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete report' });
  }
}
