import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';

function extractToken(req) {
  if (req.cookies?.access_token) return req.cookies.access_token;
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) return header.replace('Bearer ', '');
  return null;
}

export function authenticate(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    req._tokenSessionId = decoded.sessionId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export async function authenticateWithSession(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (user.activeSessionId && user.activeSessionId !== decoded.sessionId) {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }

    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
