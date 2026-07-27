// NOTE: This is an in-memory store. It resets on server restart.
// For production with multiple instances, migrate to Redis or database-backed store.
// Consider using `rate-limit-redis` or similar package.

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

const store = new Map();

function getRecord(key) {
  const rec = store.get(key);
  if (!rec) return null;
  if (rec.lockedUntil > 0 && Date.now() >= rec.lockedUntil) {
    store.delete(key);
    return null;
  }
  return rec;
}

export function getAttemptInfo(identifier) {
  const key = identifier.toLowerCase();
  const rec = getRecord(key);
  if (!rec) {
    return { attempts: 0, maxAttempts: MAX_ATTEMPTS, locked: false, remainingMs: 0 };
  }
  if (rec.lockedUntil > Date.now()) {
    return { attempts: rec.count, maxAttempts: MAX_ATTEMPTS, locked: true, remainingMs: rec.lockedUntil - Date.now() };
  }
  return { attempts: rec.count, maxAttempts: MAX_ATTEMPTS, locked: false, remainingMs: 0 };
}

export function recordFailedLogin(identifier) {
  const key = identifier.toLowerCase();
  const now = Date.now();
  const rec = store.get(key);

  if (rec && rec.lockedUntil > now) {
    return getAttemptInfo(identifier);
  }

  const count = (rec ? rec.count : 0) + 1;
  const lockedUntil = count >= MAX_ATTEMPTS ? now + LOCKOUT_MS : 0;

  store.set(key, { count, lockedUntil });

  return { attempts: count, maxAttempts: MAX_ATTEMPTS, locked: count >= MAX_ATTEMPTS, remainingMs: lockedUntil > 0 ? lockedUntil - now : 0 };
}

export function clearLoginAttempts(identifier) {
  store.delete(identifier.toLowerCase());
}

export function loginRateLimit(req, res, next) {
  const identifier = req.ip;
  const info = getAttemptInfo(identifier);

  if (info.locked) {
    return res.status(429).json({
      error: `Account locked. Try again in ${Math.ceil(info.remainingMs / 1000)} seconds.`,
      ...info,
    });
  }

  next();
}
