# 06 — Security Rules

## OWASP Top 10 Coverage

This document maps every applicable OWASP Top 10 risk to a specific mitigation strategy in this codebase.

---

## 1. SQL Injection

**Risk**: Malicious SQL statements inserted via user input.

**Mitigations**:

- **Never** use raw SQL queries. Prisma parameterises all queries by default.
- If raw queries are unavoidable, use parameterised queries only:

```javascript
// ✅ SAFE — parameterised
await prisma.$queryRaw`SELECT * FROM donors WHERE email = ${email}`;

// ❌ UNSAFE — string interpolation
await prisma.$queryRawUnsafe(`SELECT * FROM donors WHERE email = '${email}'`);
```

- Validate and sanitise all user input using Zod schemas.
- Restrict database user permissions — only grant SELECT, INSERT, UPDATE, DELETE on required tables.

## 2. Cross-Site Scripting (XSS)

**Risk**: Malicious scripts injected into web pages viewed by other users.

**Mitigations**:

- **React auto-escapes** JSX expressions — do not use `dangerouslySetInnerHTML`.
- If `dangerouslySetInnerHTML` is unavoidable (rendered HTML from CMS), sanitise with DOMPurify:

```javascript
import DOMPurify from 'dompurify';

function RichContent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}
```

- Set security headers via **Helmet** (see section below).
- Encode output for the context (HTML entity encoding, URL encoding, JS encoding).
- Use Content Security Policy (CSP) to restrict script sources.

## 3. Cross-Site Request Forgery (CSRF)

**Risk**: An attacker tricks an authenticated user into performing unintended actions.

**Mitigations**:

- Use **same-site cookies**: `SameSite=Strict` or `SameSite=Lax`.
- Use anti-CSRF tokens for state-changing requests (if cookies are used for auth).
- Since we use JWT (stored in `Authorization` header, not cookies), CSRF is inherently mitigated for API calls.
- If cookie-based auth is used, implement CSRF tokens.

```javascript
// Cookie configuration
res.cookie('refreshToken', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

## 4. Insecure Direct Object References (IDOR)

**Risk**: User accesses a resource belonging to another user by manipulating an ID.

**Mitigations**:

- Always verify **ownership** or **authorization** before returning a resource.
- Use UUIDs (not sequential integers) for resource IDs.

```javascript
// ✅ GOOD — ownership check
export async function getDonation(req, res) {
  const donation = await donationService.findById(req.params.id);
  if (!donation) throw new NotFoundError('Donation not found');
  if (donation.donor_id !== req.user.id && req.user.role !== 'admin') {
    throw new ForbiddenError('Access denied');
  }
  res.json({ success: true, data: donation });
}
```

## 5. Security Misconfiguration

**Mitigations**:

- Use **Helmet** to set security headers:

```javascript
import helmet from 'helmet';
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc:  ["'self'", "'unsafe-inline'"], // unsafe-inline only if needed
    styleSrc:   ["'self'", "'unsafe-inline'"],
    imgSrc:     ["'self'", "data:", "https:"],
    connectSrc: ["'self'", process.env.API_URL].filter(Boolean),
  },
}));
```

- Disable `x-powered-by: Express` header.
- Use environment-specific configuration (never the same config for dev and prod).
- Run `npm audit` regularly and fix vulnerabilities.

## 6. Sensitive Data Exposure

**Mitigations**:

- Never return passwords, tokens, or internal IDs in API responses.
- Use DTOs to strip sensitive fields:

```javascript
// ✅ GOOD — DTO strips passwordHash
export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    // passwordHash is intentionally omitted
  };
}
```

- All traffic must use HTTPS in production.
- Database connections must use TLS.
- Environment variables for secrets — never hardcode credentials.
- Use `.env` files locally, secrets manager (AWS Secrets Manager / Vault) in production.
- Logs must never contain passwords, tokens, or PII.

## 7. Broken Authentication

**Mitigations**:

### JWT Configuration

```javascript
// Access token (short-lived)
const accessToken = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_ACCESS_SECRET!,
  { expiresIn: '15m' }
);

// Refresh token (long-lived)
const refreshToken = jwt.sign(
  { userId: user.id },
  process.env.JWT_REFRESH_SECRET!,
  { expiresIn: '7d' }
);
```

| Token | Expiry | Storage |
|-------|--------|---------|
| Access token | 15 minutes | Memory / Zustand (never localStorage) |
| Refresh token | 7 days | httpOnly, secure, sameSite cookie |

### Password Hashing

```javascript
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

### Brute-Force Protection

```javascript
import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // 5 attempts per window
  message: {
    success: false,
    error: { code: 'RATE_LIMITED', message: 'Too many login attempts. Try again later.' },
  },
});
```

### Additional Authentication Rules

- Enforce minimum password strength: 8+ characters, upper + lower + number + symbol.
- Lock account after 10 failed attempts (requires password reset to unlock).
- Invalidate all tokens on password change.
- Use refresh token rotation — issue a new refresh token on each refresh, invalidate the old one.

## 8. Cross-Origin Resource Sharing (CORS)

```javascript
import cors from 'cors';

const allowedOrigins = [
  process.env.FRONTEND_URL, // e.g., https://ergonfoundation.org
  'http://localhost:5173',   // Vite dev server
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

## 9. Mass Assignment

**Risk**: Attacker sends unexpected fields in a request body to modify properties they shouldn't.

**Mitigations**:

- Use Zod schemas to **whitelist** allowed fields — never use `req.body` directly.

```javascript
// ❌ UNSAFE — accepts all fields
app.put('/api/v1/donors/:id', async (req, res) => {
  const donor = await prisma.donor.update({
    where: { id: req.params.id },
    data: req.body, // Attacker could set is_admin: true
  });
});

// ✅ SAFE — only whitelisted fields
const updateDonorSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    // is_active, role, etc. are NOT in the schema
  }),
});
```

## 10. Server-Side Request Forgery (SSRF)

**Risk**: Attacker tricks the server into making requests to internal services.

**Mitigations**:

- Validate and whitelist URLs if your application fetches external resources.
- Block requests to private IP ranges (127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16).
- Use a URL validation library to reject internal IPs.

## Additional Security Measures

### Helmet Security Headers

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0 (disabled — modern browsers handle XSS via CSP)
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Input Sanitization and Output Encoding

| Context | Encoding |
|---------|----------|
| HTML body | HTML entity encoding (`&` → `&amp;`) |
| HTML attribute | Attribute encoding |
| JavaScript string | Unicode escape |
| URL parameter | URL encoding (`encodeURIComponent`) |
| CSS | CSS escape |

### File Upload Security

- Validate file type by **magic bytes** (MIME type alone is unreliable).
- Limit file size (e.g., 5 MB).
- Store files outside the web root or use cloud storage (S3).
- Scan uploaded files for malware.
- Generate random filenames — never trust user-provided filenames.

```javascript
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = crypto.randomBytes(16).toString('hex');
    cb(null, `${name}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});
```

### Environment Variables and Secret Management

```bash
# .env.example — committed to repository
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/ergon
JWT_ACCESS_SECRET=change-me
JWT_REFRESH_SECRET=change-me
FRONTEND_URL=http://localhost:5173
LOG_LEVEL=debug

# .env — never committed
JWT_ACCESS_SECRET=actual-production-secret
```

- All secrets must be loaded from environment variables.
- Validate required variables at application startup:

```javascript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  FRONTEND_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

### Dependency Vulnerabilities

- Run `npm audit` in CI — fail the build on critical vulnerabilities.
- Use `npm ls` to check for deprecated packages.
- Regularly update dependencies with `npm update`.
- Use `snyk` or `Dependabot` for automated vulnerability scanning.

### Supply Chain Security

- Pin dependency versions in `package.json` — no `^` or `~` ranges for critical packages.
- Use lockfiles (`package-lock.json`) — commit them to the repository.
- Review `node_modules` changes in code reviews for suspicious packages.
- Consider using `npm ci` instead of `npm install` in CI for deterministic builds.
- Use `--ignore-scripts` when auditing dependencies.

### Audit Logging

```javascript
// middleware/audit-log.ts
export function auditLog(action: string, details?: Record<string, unknown>) {
  return async (req, res, next) => {
    const originalSend = res.json.bind(res);
    res.json = function (body) {
      logger.info({
        type: 'audit',
        action,
        userId: req.user?.id,
        ip: req.ip,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        details,
        timestamp: new Date().toISOString(),
      });
      return originalSend(body);
    };
    next();
  };
}
```

## Least Privilege

- Database user only has SELECT, INSERT, UPDATE, DELETE on the application schema.
- API keys have scoped permissions.
- Admin role is separate from regular user roles.
- RBAC ensures users can only access what their role permits.

## Production Deployment Security Checklist

- [ ] HTTPS enforced (SSL/TLS certificate configured)
- [ ] All secrets in environment variables (not in code)
- [ ] Helmet middleware enabled
- [ ] CORS configured with specific origins
- [ ] Rate limiting enabled on auth endpoints
- [ ] No stack traces returned in error responses
- [ ] Database connection uses TLS
- [ ] Database user has least-privilege access
- [ ] `npm audit` passes with no critical vulnerabilities
- [ ] CSP header configured
- [ ] File upload restrictions in place
- [ ] Audit logging enabled for sensitive actions
- [ ] Password policy enforced (min 8 chars, complexity)
- [ ] Refresh token rotation implemented
- [ ] Session timeout configured on frontend (auto-logout after inactivity)
- [ ] `.env` files are in `.gitignore`
