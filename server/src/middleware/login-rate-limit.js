const attempts = new Map();

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

export function getAttemptInfo(identifier) {
  const key = identifier.toLowerCase();
  const record = attempts.get(key);
  const now = Date.now();

  if (!record) return { attempts: 0, maxAttempts: MAX_ATTEMPTS, locked: false, remainingMs: 0 };
  if (record.lockedUntil > now) {
    return { attempts: 0, maxAttempts: MAX_ATTEMPTS, locked: true, remainingMs: record.lockedUntil - now };
  }
  return { attempts: record.count, maxAttempts: MAX_ATTEMPTS, locked: false, remainingMs: 0 };
}

export function loginRateLimit(req, res, next) {
  const identifier = (req.body?.email || req.ip).toLowerCase();
  const now = Date.now();
  const record = attempts.get(identifier);

  if (record && record.lockedUntil > now) {
    const remaining = Math.ceil((record.lockedUntil - now) / 1000);
    return res.status(429).json({
      error: `Too many failed attempts. Try again in ${remaining} seconds.`,
      locked: true,
      remainingMs: record.lockedUntil - now,
    });
  }

  if (record && record.lockedUntil <= now) {
    attempts.delete(identifier);
  }

  req._loginAttempt = { identifier };
  next();
}

export function recordFailedLogin(identifier) {
  const now = Date.now();
  const record = attempts.get(identifier) || { count: 0, lockedUntil: 0 };
  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    record.count = 0;
  }

  attempts.set(identifier, record);
}

export function clearLoginAttempts(identifier) {
  attempts.delete(identifier);
}

setInterval(() => {
  const now = Date.now();
  for (const [key, val] of attempts) {
    if (val.lockedUntil > 0 && val.lockedUntil < now) attempts.delete(key);
  }
}, 60 * 1000);
