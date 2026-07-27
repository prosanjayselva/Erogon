import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginSchema, passwordSchema } from '../validators/index.js';
import { prisma } from '../index.js';
import { logActivity } from '../services/activity-log.js';
import { recordFailedLogin, clearLoginAttempts, getAttemptInfo } from '../middleware/login-rate-limit.js';

function signAccessToken(user, sessionId) {
  return jwt.sign(
    { id: user.id, email: user.email, sessionId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' },
  );
}

function signRefreshToken(tokenId) {
  return jwt.sign(
    { tokenId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' },
  );
}

function parseExpiry(str) {
  const match = str.match(/^(\d+)([smhd])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000;
  const n = parseInt(match[1]);
  const unit = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[match[2]];
  return n * unit;
}

const isProduction = process.env.NODE_ENV === 'production';

function setAuthCookies(res, accessToken, refreshToken) {
  const accessMaxAge = parseExpiry(process.env.JWT_ACCESS_EXPIRY || '15m');
  const refreshMaxAge = parseExpiry(process.env.JWT_REFRESH_EXPIRY || '7d');
  const cookieOpts = { httpOnly: true, secure: isProduction, sameSite: 'lax', path: '/' };

  res.cookie('access_token', accessToken, { ...cookieOpts, maxAge: accessMaxAge });
  res.cookie('refresh_token', refreshToken, { ...cookieOpts, maxAge: refreshMaxAge });
}

function clearAuthCookies(res) {
  const opts = { httpOnly: true, secure: isProduction, sameSite: 'lax', path: '/' };
  res.clearCookie('access_token', opts);
  res.clearCookie('refresh_token', opts);
}

function getClientIp(req) {
  return req.ip || req.connection?.remoteAddress || 'unknown';
}

async function geolocate(ip) {
  try {
    if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') {
      return { city: 'Local', country: 'Local' };
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const data = await res.json();
    if (data.status === 'success') {
      return { city: data.city || 'Unknown', country: data.country || 'Unknown' };
    }
    return { city: 'Unknown', country: 'Unknown' };
  } catch {
    return { city: 'Unknown', country: 'Unknown' };
  }
}

function parseDevice(req) {
  const ua = req.headers['user-agent'] || '';
  let os = 'Unknown OS';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  let browser = 'Unknown Browser';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edg')) browser = 'Edge';

  return `${browser}/${os}`;
}

export async function me(req, res) {
  try {
    const token = req.cookies?.access_token || req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id }, select: { id: true, name: true, email: true } });
    if (!user) return res.status(401).json({ error: 'User not found' });

    const dbUser = await prisma.user.findUnique({ where: { id: decoded.id }, select: { activeSessionId: true } });
    if (dbUser.activeSessionId && dbUser.activeSessionId !== decoded.sessionId) {
      clearAuthCookies(res);
      return res.status(401).json({ error: 'Session expired' });
    }

    res.json({ success: true, data: { user } });
  } catch {
    clearAuthCookies(res);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export async function attemptsCheck(req, res) {
  try {
    const ip = getClientIp(req);
    const info = getAttemptInfo(ip);
    res.json({ success: true, data: info });
  } catch {
    res.status(500).json({ error: 'Failed to check attempts' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const ip = getClientIp(req);
    const key = ip;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const info = recordFailedLogin(key);
      logActivity(0, 'FAILED_LOGIN', `Failed login for "${email}" from IP ${ip} — ${info.attempts}/${info.maxAttempts} attempts`);
      return res.status(401).json({ error: 'Invalid credentials', ...info });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      const info = recordFailedLogin(key);
      logActivity(user.id, 'FAILED_LOGIN', `Failed login by "${user.email}" (${user.name}) from IP ${ip} — ${info.attempts}/${info.maxAttempts} attempts`);
      return res.status(401).json({ error: 'Invalid credentials', ...info });
    }

    clearLoginAttempts(key);

    const sessionId = crypto.randomUUID();
    await prisma.user.update({ where: { id: user.id }, data: { activeSessionId: sessionId } });

    const accessToken = signAccessToken(user, sessionId);

    const expiresAt = new Date(Date.now() + parseExpiry(process.env.JWT_REFRESH_EXPIRY || '7d'));
    const rawToken = crypto.randomBytes(40).toString('base64url');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    await prisma.refreshToken.create({ data: { token: tokenHash, userId: user.id, expiresAt } });

    const device = parseDevice(req);
    const { city, country } = await geolocate(ip);
    await prisma.loginLog.create({
      data: { userId: user.id, ip, city, country, device, success: true },
    });

    logActivity(user.id, 'LOGIN', `Admin logged in: ${user.email} from ${city}, ${country} (${device})`);

    setAuthCookies(res, accessToken, rawToken);

    res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email },
      },
    });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors[0].message });
    }
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function refresh(req, res) {
  try {
    let refreshToken = req.cookies?.refresh_token;
    if (!refreshToken && req.body?.refreshToken) {
      refreshToken = req.body.refreshToken;
    }
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      clearAuthCookies(res);
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const stored = await prisma.refreshToken.findUnique({ where: { token: tokenHash } });

    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      if (stored && stored.revoked) {
        await prisma.refreshToken.updateMany({
          where: { userId: stored.userId, revoked: false },
          data: { revoked: true },
        });
      }
      clearAuthCookies(res);
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

    await prisma.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } });

    const user = await prisma.user.findUnique({ where: { id: stored.userId } });
    if (!user) {
      clearAuthCookies(res);
      return res.status(401).json({ error: 'User not found' });
    }

    const sessionId = crypto.randomUUID();
    await prisma.user.update({ where: { id: user.id }, data: { activeSessionId: sessionId } });

    const accessToken = signAccessToken(user, sessionId);

    const expiresAt = new Date(Date.now() + parseExpiry(process.env.JWT_REFRESH_EXPIRY || '7d'));
    const newRawToken = crypto.randomBytes(40).toString('base64url');
    const newTokenHash = crypto.createHash('sha256').update(newRawToken).digest('hex');
    await prisma.refreshToken.create({ data: { token: newTokenHash, userId: user.id, expiresAt } });

    setAuthCookies(res, accessToken, newRawToken);

    res.json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email } } });
  } catch {
    clearAuthCookies(res);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
}

export async function logout(req, res) {
  try {
    const refreshToken = req.cookies?.refresh_token || req.body?.refreshToken;
    if (refreshToken) {
      const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
      await prisma.refreshToken.updateMany({ where: { token: tokenHash }, data: { revoked: true } });
    }
    if (req.user?.id) {
      await prisma.user.update({ where: { id: req.user.id }, data: { activeSessionId: null } });
      logActivity(req.user.id, 'LOGOUT', `Admin logged out: ${req.user.email}`);
    }
    clearAuthCookies(res);
    res.json({ success: true, message: 'Logged out' });
  } catch {
    if (req.user?.id) logActivity(req.user.id, 'LOGOUT', `Admin logged out: ${req.user.email}`);
    clearAuthCookies(res);
    res.json({ success: true, message: 'Logged out' });
  }
}

export async function loginHistory(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
    const userId = req.user?.id;

    const where = userId ? { userId } : {};
    const [logs, total] = await Promise.all([
      prisma.loginLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.loginLog.count({ where }),
    ]);

    res.json({
      success: true,
      data: logs,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch login history' });
  }
}

export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    const parsed = passwordSchema.safeParse(newPassword);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors[0].message });
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

    logActivity(user.id, 'CHANGE_PASSWORD', `Password changed for ${user.email}`);

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to change password' });
  }
}
