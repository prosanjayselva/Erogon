# 03 — Backend (Node.js + Express) Rules

## Architecture Overview

```
src/
├── routes/          → Express route definitions
├── controllers/     → Request handling, validation, response formatting
├── services/        → Business logic
├── repositories/    → Data access (Prisma queries)
├── middleware/      → Auth, error handling, validation, logging
├── validators/      → Zod schemas for request validation
├── utils/           → Helpers, constants, enums
├── types/           → TypeScript type definitions
└── app.ts           → Express app setup
```

### Clean Architecture Layers

```
Request → Router → Middleware → Controller → Service → Repository → Database
                                                                         ↑
                                                                    Prisma ORM
```

- **Controller** receives the request, calls validation, invokes service, formats response.
- **Service** contains business logic, orchestrates multiple repository calls.
- **Repository** is a thin wrapper over Prisma queries.

### Dependency Flow

```
Controller depends on → Service
Service depends on    → Repository (via interface/abstraction)
Repository depends on → Prisma Client
```

## Routes

- Routes only define the HTTP method, path, and middleware chain.
- Routes delegate to controllers — no logic in route files.
- Use `express.Router()` for modular routing.

```javascript
// routes/donor-routes.ts
import { Router } from 'express';
import { authenticate, authorize } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { createDonorSchema } from '@/validators/donor';
import * as donorController from '@/controllers/donor-controller';

const router = Router();

router.get('/',
  authenticate,
  authorize(['admin', 'manager']),
  donorController.list
);

router.post('/',
  validate(createDonorSchema),
  donorController.create
);

router.get('/:id',
  authenticate,
  donorController.getById
);

export default router;
```

## Controllers

- Keep controllers thin. They should **not** contain business logic.
- Controllers parse the request, call the service, and send the response.
- Use try/catch and let the global error handler catch thrown errors.

```javascript
// controllers/donor-controller.ts
import { Request, Response, NextFunction } from 'express';
import * as donorService from '@/services/donor-service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page = 1, limit = 20, search, sortBy } = req.query;
    const result = await donorService.findAll({
      page: Number(page),
      limit: Number(limit),
      search: search as string,
      sortBy: sortBy as string,
    });
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const donor = await donorService.create(req.body);
    res.status(201).json({ success: true, data: donor });
  } catch (error) {
    next(error);
  }
}
```

## Services

- Services contain **all business logic**.
- Services call repositories — never call Prisma directly from a controller.
- Services throw custom errors (e.g., `NotFoundError`, `ConflictError`).

```javascript
// services/donor-service.ts
import * as donorRepo from '@/repositories/donor-repo';
import { NotFoundError } from '@/utils/errors';

export async function findAll(params: PaginationParams) {
  const [donors, total] = await Promise.all([
    donorRepo.findAll(params),
    donorRepo.count(params),
  ]);

  return {
    data: donors,
    meta: {
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
    },
  };
}

export async function create(data: CreateDonorInput) {
  const existing = await donorRepo.findByEmail(data.email);
  if (existing) {
    throw new ConflictError('A donor with this email already exists');
  }
  return donorRepo.create(data);
}
```

## Repositories

- Repositories are thin wrappers over Prisma queries.
- They accept simple parameters and return typed results.
- Keep Prisma-specific query logic here.

```javascript
// repositories/donor-repo.ts
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

interface FindAllParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
}

export async function findAll(params: FindAllParams) {
  const { page, limit, search, sortBy = 'created_at' } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.DonorWhereInput = {};
  if (search) {
    where.OR = [
      { name:   { contains: search, mode: 'insensitive' } },
      { email:  { contains: search, mode: 'insensitive' } },
    ];
  }

  return prisma.donor.findMany({
    where,
    skip,
    take: limit,
    orderBy: { [sortBy]: 'desc' },
  });
}

export async function count(params: FindAllParams) {
  const where: Prisma.DonorWhereInput = {};
  if (params.search) {
    where.OR = [
      { name:   { contains: params.search, mode: 'insensitive' } },
      { email:  { contains: params.search, mode: 'insensitive' } },
    ];
  }
  return prisma.donor.count({ where });
}
```

## Middleware

### Global Middleware (applied in `app.ts`)

| Middleware | Purpose |
|-----------|---------|
| `helmet()` | Security headers |
| `cors()` | Cross-origin access |
| `express.json()` | Body parsing |
| `morgan()` | HTTP request logging |
| Rate limiter | Brute-force protection |

### Route-Level Middleware

| Middleware | Purpose |
|-----------|---------|
| `authenticate` | Verify JWT, attach user to request |
| `authorize(roles)` | Check user role against allowed roles |
| `validate(schema)` | Validate request body/params/query via Zod |

```javascript
// middleware/auth.ts
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@/utils/errors';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new UnauthorizedError('Authentication required');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
}

export function authorize(...roles: string[]) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Insufficient permissions');
    }
    next();
  };
}
```

## Validation

- Use **Zod** for all request validation.
- Define schemas in `validators/` directory.
- Use a reusable `validate` middleware.

```javascript
// validators/donor.ts
import { z } from 'zod';

export const createDonorSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9]\d{9,14}$/),
    amount: z.number().positive(),
    message: z.string().max(500).optional(),
  }),
});

export const listDonorsQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().optional(),
    sortBy: z.enum(['created_at', 'name', 'amount']).optional(),
  }),
});
```

## DTO Pattern

- Use DTOs (Data Transfer Objects) to shape API responses.
- Never expose internal database models directly.

```javascript
// DTO
export function toDonorResponse(donor: PrismaDonor): DonorResponse {
  return {
    id: donor.id,
    name: donor.name,
    email: donor.email,
    amount: donor.amount,
    donatedAt: donor.created_at.toISOString(),
  };
}
```

## Response Format

All API responses must follow a consistent format:

```javascript
// Success
{ "success": true, "data": { ... } }
{ "success": true, "data": [ ... ], "meta": { "total": 100, "page": 1, "limit": 20 } }

// Error
{ "success": false, "error": { "code": "NOT_FOUND", "message": "Donor not found" } }
```

## Async Handling

- All controllers and services use `async/await`.
- Every async route handler must catch errors and pass them to `next()`.
- Use `express-async-errors` to automatically catch async errors, or wrap handlers.

```javascript
// Wrapper for async route handlers
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

## Authentication and Authorization

| Aspect | Implementation |
|--------|---------------|
| **Authentication** | JWT access token (short-lived: 15 min) + refresh token (long-lived: 7 days) |
| **Password hashing** | bcrypt with cost factor 12 |
| **Authorization** | Role-based (RBAC): `admin`, `manager`, `viewer` |
| **Session** | Stateless JWT, no session store needed |

## Logging

- Use `pino` or `winston` — never `console.log`.
- Log structured JSON in production.
- Include request ID, user ID, and timing in every log line.

```javascript
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty' }
    : undefined,
});
```

## Transactions

- Use Prisma transactions for operations that modify multiple records.
- Keep transaction boundaries narrow.

```javascript
export async function transferDonor(donorId: string, newProgramId: string) {
  return prisma.$transaction(async (tx) => {
    const donor = await tx.donor.findUniqueOrThrow({ where: { id: donorId } });
    const program = await tx.program.findUniqueOrThrow({ where: { id: newProgramId } });
    return tx.donor.update({
      where: { id: donorId },
      data: { programId: newProgramId },
    });
  });
}
```

## Pagination

All list endpoints must support pagination from day one.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number (1-indexed) |
| `limit` | number | 20 | Items per page (max 100) |
| `search` | string | — | Search query |
| `sortBy` | string | `created_at` | Field to sort by |

## Best Practices

1. **Single responsibility** — each file does one thing.
2. **Dependency injection** — pass repositories to services for testability.
3. **Error types** — use custom error classes that the error handler can distinguish.
4. **Input validation** — validate on every endpoint, always.
5. **DTOs** — never expose raw database models.
6. **Consistent responses** — use the same envelope format everywhere.
7. **No business logic in controllers** — that's the service's job.
8. **No raw SQL in controllers** — that's the repository's job.
9. **Use `process.env` validation** (with Zod or `envalid`) at startup.
10. **Graceful shutdown** — handle SIGTERM, close Prisma connections.

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Business logic in controllers | Move to services |
| Leaking stack traces in errors | Global error handler strips them |
| No transaction on multi-table writes | Wrap in `prisma.$transaction` |
| Not validating input | Add Zod validation on every endpoint |
| Hardcoded secrets | Use environment variables |
| Synchronous file reads in request handler | Use async versions |
| `app.listen` without graceful shutdown | Add SIGTERM handler |

## Checklist

- [ ] Routes only define path + middleware — no logic
- [ ] Controllers are thin — parse request, call service, send response
- [ ] Services contain all business logic
- [ ] Repositories wrap Prisma queries only
- [ ] Every endpoint has request validation (Zod)
- [ ] Response format is consistent (`{ success, data }` / `{ success, error }`)
- [ ] Authentication and authorization middleware are applied
- [ ] Error handling uses custom error classes
- [ ] Pagination is implemented on list endpoints
- [ ] DTOs are used instead of exposing raw database models
- [ ] Environment variables are validated at startup
- [ ] Logger is used instead of `console.log`
- [ ] Graceful shutdown is implemented
