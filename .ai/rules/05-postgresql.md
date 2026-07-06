# 05 — PostgreSQL and Prisma Rules

## General Database Principles

- Use PostgreSQL as the primary database.
- Design the schema **before** writing application code.
- Every table must have an `id` (UUID), `created_at`, and `updated_at` column.
- Use **UUIDs** as primary keys (never auto-increment integers).
- All columns must have **NOT NULL** or a clear default.
- Every table must have an explicit comment describing its purpose.

## Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| Tables | snake_case, plural | `donors`, `event_reminders` |
| Columns | snake_case | `first_name`, `donation_amount` |
| Primary key | `id` (UUID) | `id UUID PRIMARY KEY DEFAULT gen_random_uuid()` |
| Foreign key | `{table}_id` | `donor_id`, `event_id` |
| Created at | `created_at` | `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()` |
| Updated at | `updated_at` | `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()` |
| Boolean | `is_` / `has_` prefix | `is_active`, `has_consented` |
| Join table | `{table1}_{table2}` | `donors_events` |
| Indexes | `idx_{table}_{column}` | `idx_donors_email` |
| Unique constraints | `uq_{table}_{column}` | `uq_donors_email` |

## Prisma Schema

### Model Definition Template

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Donor {
  id        String   @id @default(uuid()) @db.Uuid
  name      String   @db.VarChar(200)
  email     String   @unique @db.VarChar(255)
  phone     String?  @db.VarChar(20)
  amount    Decimal  @db.Decimal(12, 2)
  message   String?  @db.Text
  is_active Boolean  @default(true)
  created_at DateTime @default(now()) @db.Timestamptz()
  updated_at DateTime @updatedAt @db.Timestamptz()

  donations Donation[]

  @@map("donors")
  @@index([email])
  @@index([created_at])
}

model Donation {
  id        String   @id @default(uuid()) @db.Uuid
  donor_id  String   @db.Uuid
  amount    Decimal  @db.Decimal(12, 2)
  date      DateTime @default(now()) @db.Timestamptz()
  note      String?  @db.Text

  donor     Donor    @relation(fields: [donor_id], references: [id])

  @@map("donations")
  @@index([donor_id])
  @@index([date])
}
```

### Prisma Schema Rules

1. Always use `@db.Uuid` for UUID columns.
2. Always use `@db.Timestamptz()` for timestamps (never `DateTime` without timezone).
3. Always use `@db.Decimal(p, s)` for monetary values (never `Float` or `Int`).
4. Always name the join table explicitly with `@@map`.
5. Always add indexes on foreign keys and frequently queried columns.
6. Always use `@updatedAt` for `updated_at`.
7. Use `@default(now())` for `created_at`.
8. Use optional fields (`String?`) for nullable columns — never use empty strings.

## Normalization

- Follow **3NF (Third Normal Form)** as the baseline.
- Denormalize **only** when query performance requires it, and document the reason.
- Every non-key column must depend on "the key, the whole key, and nothing but the key."

```prisma
// ✅ GOOD — normalized
model Event {
  id          String   @id @default(uuid()) @db.Uuid
  title       String   @db.VarChar(200)
  description String   @db.Text
  event_date  DateTime @db.Timestamptz()
  status      EventStatus @default(UPCOMING)
  created_at  DateTime @default(now()) @db.Timestamptz()
  updated_at  DateTime @updatedAt @db.Timestamptz()
}

// ❌ BAD — denormalized without reason
model Event {
  id          String   @id @default(uuid()) @db.Uuid
  title       String   @db.VarChar(200)
  description String   @db.Text
  event_date  DateTime @db.Timestamptz()
  status      String   @db.VarChar(20)
  donor_count Int      @default(0)   // derived — should be computed via count()
  total_raised Decimal @default(0)   // derived — should be computed via sum()
}
```

## Indexes

### Index Rules

| Scenario | Index Type | Example |
|----------|-----------|---------|
| Primary key | Primary (auto) | `@id` on `id` column |
| Foreign key | B-tree | `@@index([donor_id])` |
| Frequently searched | B-tree | `@@index([email])` |
| Sorting by date | B-tree | `@@index([created_at])` |
| Full-text search | GIN (tsvector) | `@@index([search_vector], type: Gin)` |
| Unique constraint | Unique B-tree | `@unique` on `email` |
| Multi-column search | Composite B-tree | `@@index([status, event_date])` |

```prisma
model Donor {
  // ...
  @@index([email])
  @@index([created_at])
  @@index([is_active, created_at])
}
```

### Index Anti-Patterns

- Don't index every column — each index slows writes.
- Don't duplicate indexes — if `(a, b)` is indexed, `(a)` alone is redundant.
- Don't index low-cardinality columns (like `is_active: boolean`) unless combined with other columns.
- Don't forget to index foreign key columns — Prisma doesn't do this automatically.

## Foreign Keys

- Always define foreign key relationships explicitly in Prisma.
- Use `onDelete` and `onUpdate` actions.

```prisma
model Donation {
  donor_id String @db.Uuid
  donor    Donor  @relation(fields: [donor_id], references: [id], onDelete: Cascade)

  @@index([donor_id])
}
```

## Transactions

- Use Prisma's `$transaction` for operations that modify multiple records.
- Keep transactions short — never include network calls inside a transaction.

```javascript
// ✅ GOOD
await prisma.$transaction([
  prisma.donation.create({ data: { donor_id, amount, event_id } }),
  prisma.donor.update({ where: { id: donor_id }, data: { last_donation: new Date() } }),
]);

// ❌ BAD — network call inside transaction
await prisma.$transaction(async (tx) => {
  const donor = await tx.donor.create({ data });
  await emailService.sendWelcome(donor.email); // BLOCKS transaction
});
```

## Query Optimization

### Avoid N+1

```javascript
// ❌ BAD — N+1 queries (one query per donor to fetch donations)
const donors = await prisma.donor.findMany();
for (const donor of donors) {
  const donations = await prisma.donation.findMany({ where: { donor_id: donor.id } });
}

// ✅ GOOD — single query with include
const donors = await prisma.donor.findMany({
  include: { donations: true },
});
```

### Use Select Only Required Fields

```javascript
// ❌ BAD — fetches all columns
const donors = await prisma.donor.findMany();

// ✅ GOOD — fetches only what's needed
const donors = await prisma.donor.findMany({
  select: { id: true, name: true, email: true, amount: true },
});
```

### Pagination

- Use **cursor-based pagination** for real-time feeds.
- Use **offset-based pagination** for admin panels and static lists.
- Always use `take` + `skip` (offset) or `cursor` + `take` (cursor-based).

```javascript
// Offset-based
const donors = await prisma.donor.findMany({
  skip: (page - 1) * limit,
  take: limit,
  orderBy: { created_at: 'desc' },
});

// Cursor-based
const donors = await prisma.donor.findMany({
  take: limit + 1,
  cursor: { id: cursor },
  skip: 1, // Skip the cursor itself
  orderBy: { created_at: 'desc' },
});
```

## Connection Pooling

```javascript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'warn', 'error']
    : ['warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

- Use `DATABASE_URL` with `pgbouncer` connection string for production pooling.
- Connection pool default: 10 connections (adjust based on workload).
- Use `pgbouncer` in transaction mode for serverless deployments.

## Migrations

- Always use `prisma migrate dev` for development and `prisma migrate deploy` for production.
- Never edit migration files manually — create a new migration instead.
- Name migrations descriptively: `20260607_add_donor_tier_column`
- Run migrations as part of the CI/CD pipeline, never manually in production.

```bash
# Development
npx prisma migrate dev --name add_donor_tier_column

# Production
npx prisma migrate deploy
```

## Constraints

| Constraint | When to Use |
|-----------|-------------|
| `@unique` | Email, phone, slug — any field that must be unique |
| `@@unique([a, b])` | Composite unique (e.g., a donor can only register once per event) |
| `@default` | Every column should have a default where sensible |
| `onDelete: Cascade` | Child records should be deleted when parent is deleted |
| `onDelete: SetNull` | Child records should be preserved but orphaned |
| `CHECK` constraints | Via `@pg` extension or application-level validation |

## Database Security

- Never store plain-text passwords — use bcrypt in application code.
- Never store sensitive data (API keys, secrets) in the database.
- Use database-level encryption (TLS) for connections.
- Least privilege: the database user used by the application should only have CRUD access to the application schema — no DDL access.
- Regular backups with point-in-time recovery (PITR).

## Best Practices

1. **Schema-first development** — design the Prisma schema before writing services.
2. **One Prisma client instance** — use the global singleton pattern.
3. **Use enums in Prisma**, not strings.
4. **Always use `@db.Timestamptz()`** — never timezone-naive timestamps.
5. **Use `@db.Decimal` for money** — never `Float` (precision issues).
6. **Add indexes on all foreign keys** — Prisma doesn't auto-index them.
7. **Use `select` to limit returned columns** — especially in list queries.
8. **Use `include` or `select` for relations** — avoid N+1.
9. **Keep migrations small and frequent** — avoid giant migration files.
10. **Never run `prisma db push` in production** — always use `prisma migrate deploy`.

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Auto-increment IDs | Use UUIDs |
| No `@@index` on foreign keys | Add composite or single-column indexes |
| Using `Int` for monetary columns | Use `Decimal(12, 2)` |
| Not using transactions | Wrap multi-table writes in `$transaction` |
| Fetching all columns | Use `select` to limit |
| Calling `prisma` in a loop | Use `findMany` with `include` or batch |
| No timezone on timestamps | Use `@db.Timestamptz()` |
| String enums | Use Prisma `enum` type |
| Running `db push` in production | Use `migrate deploy` |
| Not handling connection pool exhaustion | Tune pool size, add retry logic |

## Checklist

- [ ] All tables have `id` (UUID), `created_at`, `updated_at`
- [ ] All monetary values use `Decimal`
- [ ] All timestamps use `Timestamptz`
- [ ] Foreign keys have `@@index`
- [ ] Unique constraints defined where needed
- [ ] No N+1 queries (use `include` or batch)
- [ ] Migrations are named descriptively
- [ ] Connection pooling is configured for production
- [ ] Prisma client is a global singleton
- [ ] Schema is in 3NF (or documented denormalization)
- [ ] All columns have NOT NULL or a default
