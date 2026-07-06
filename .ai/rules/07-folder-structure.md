# 07 — Folder Structure

## Enterprise Monorepo Layout

```
ergon-foundation/
├── .ai/                    # AI coding rules (this directory)
│   └── rules/
├── .github/                # GitHub Actions, templates
├── client/                 # React frontend
├── server/                 # Node.js backend
├── packages/               # Shared packages
│   ├── shared/             # Shared types, validation schemas
│   └── config/             # Shared ESLint, Prettier, TS configs
├── docs/                   # Project documentation
├── scripts/                # Build, deploy, migration scripts
├── docker-compose.yml      # Local development
├── .gitignore
└── README.md
```

---

## Frontend (`client/`)

```
client/
├── public/                      # Static assets (served as-is)
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
├── src/
│   ├── api/                     # API client and endpoint functions
│   │   ├── client.ts            # Axios instance with interceptors
│   │   ├── donors.ts            # Donor API functions
│   │   ├── events.ts
│   │   ├── auth.ts
│   │   └── reports.ts
│   ├── assets/                  # Images, fonts, SVGs
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Primitives: Button, Input, Modal, Card, Table
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── AppLayout.tsx    # Header + main + footer
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx      # Admin sidebar
│   │   │   └── PageSkeleton.tsx # Loading skeleton for pages
│   │   ├── auth/                # Auth-related components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── RoleGuard.tsx
│   │   ├── donors/              # Donor feature components
│   │   │   ├── DonorCard.tsx
│   │   │   ├── DonorTable.tsx
│   │   │   ├── DonorForm.tsx
│   │   │   └── DonorFilters.tsx
│   │   ├── events/              # Event feature components
│   │   ├── gallery/             # Gallery feature components
│   │   ├── reports/             # Reports feature components
│   │   └── common/              # Shared domain-agnostic components
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   └── usePagination.ts
│   ├── lib/                     # Utility functions
│   │   ├── format.ts            # Date, currency formatting
│   │   ├── cn.ts                # classnames utility (clsx + tailwind-merge)
│   │   └── constants.ts         # App-wide constants
│   ├── pages/                   # Route page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── donors/
│   │   │   ├── DonorListPage.tsx
│   │   │   ├── DonorDetailPage.tsx
│   │   │   └── DonorCreatePage.tsx
│   │   ├── events/
│   │   │   ├── EventListPage.tsx
│   │   │   ├── EventDetailPage.tsx
│   │   │   └── EventCreatePage.tsx
│   │   ├── admin/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── DonorManagementPage.tsx
│   │   │   └── EventManagementPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── ReportsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── providers/               # React context providers
│   │   ├── AuthProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── QueryProvider.tsx
│   ├── queries/                 # TanStack Query hooks
│   │   ├── donors.ts            # useDonors, useDonor, useCreateDonor, etc.
│   │   ├── events.ts
│   │   ├── auth.ts
│   │   └── reports.ts
│   ├── stores/                  # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── ui-store.ts          # Sidebar, modal, theme
│   │   └── preferences-store.ts
│   ├── schemas/                 # Zod validation schemas
│   │   ├── donor.ts
│   │   ├── event.ts
│   │   └── auth.ts
│   ├── types/                   # TypeScript type definitions
│   │   ├── donor.ts
│   │   ├── event.ts
│   │   ├── auth.ts
│   │   └── api.ts               # API response types
│   ├── router.tsx               # React Router configuration
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.ts           # If using Tailwind CSS
└── package.json
```

### Frontend Folder Responsibilities

| Folder | Responsibility |
|--------|---------------|
| `api/` | Axios client, typed API functions (one file per domain) |
| `assets/` | Static files: images, icons, fonts |
| `components/ui/` | Primitive, reusable UI components (Button, Input, Modal) |
| `components/layout/` | Layout shell (header, footer, sidebar) |
| `components/{feature}/` | Feature-specific components |
| `hooks/` | Custom React hooks (reusable stateful logic) |
| `lib/` | Pure utility functions (formatting, constants) |
| `pages/` | Route-level page components (one file per route) |
| `providers/` | React context providers |
| `queries/` | TanStack Query hooks (one file per domain) |
| `stores/` | Zustand stores (one file per store) |
| `schemas/` | Zod validation schemas (shared with server if possible) |
| `types/` | TypeScript interfaces and types |

---

## Backend (`server/`)

```
server/
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Auto-generated migrations
│   └── seed.ts                  # Database seed script
├── src/
│   ├── routes/                  # Express route definitions
│   │   ├── v1/
│   │   │   ├── index.ts         # Mounts all v1 routes
│   │   │   ├── auth-routes.ts
│   │   │   ├── donor-routes.ts
│   │   │   ├── event-routes.ts
│   │   │   ├── report-routes.ts
│   │   │   └── gallery-routes.ts
│   │   └── v2/                  # Future API version
│   ├── controllers/             # Request handlers (thin)
│   │   ├── auth-controller.ts
│   │   ├── donor-controller.ts
│   │   ├── event-controller.ts
│   │   ├── report-controller.ts
│   │   └── gallery-controller.ts
│   ├── services/                # Business logic
│   │   ├── auth-service.ts
│   │   ├── donor-service.ts
│   │   ├── event-service.ts
│   │   ├── report-service.ts
│   │   └── gallery-service.ts
│   ├── repositories/            # Data access layer
│   │   ├── donor-repo.ts
│   │   ├── event-repo.ts
│   │   ├── report-repo.ts
│   │   └── gallery-repo.ts
│   ├── middleware/              # Express middleware
│   │   ├── auth.ts              # authenticate, authorize
│   │   ├── validate.ts          # Zod validation
│   │   ├── error-handler.ts     # Global error handler
│   │   ├── rate-limiter.ts      # Rate limiting
│   │   ├── audit-log.ts         # Audit logging
│   │   └── request-id.ts        # Request ID generation
│   ├── validators/              # Zod schemas for request validation
│   │   ├── auth.ts
│   │   ├── donor.ts
│   │   ├── event.ts
│   │   └── common.ts            # Shared validation utilities
│   ├── utils/                   # Shared utilities
│   │   ├── errors.ts            # Custom error classes
│   │   ├── logger.ts            # Pino logger
│   │   ├── jwt.ts               # JWT sign/verify helpers
│   │   ├── password.ts          # bcrypt hash/compare helpers
│   │   └── response.ts          # Response formatters
│   ├── types/                   # TypeScript type definitions
│   │   ├── express.d.ts         # Express request extensions
│   │   ├── auth.ts
│   │   ├── donor.ts
│   │   └── event.ts
│   ├── config/                  # Configuration
│   │   ├── env.ts               # Environment variable validation
│   │   ├── cors.ts              # CORS configuration
│   │   └── database.ts          # Database connection config
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point (start, graceful shutdown)
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── uploads/                     # Uploaded files (dev only)
├── .env.example
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
├── nodemon.json
└── package.json
```

### Backend Folder Responsibilities

| Folder | Responsibility |
|--------|---------------|
| `prisma/` | Database schema, migrations, seed scripts |
| `src/routes/` | Express router definitions (one file per domain) |
| `src/controllers/` | Thin request handlers — parse input, call service, send response |
| `src/services/` | Business logic — orchestration, validation, transformation |
| `src/repositories/` | Data access — Prisma queries (one file per domain) |
| `src/middleware/` | Reusable middleware functions |
| `src/validators/` | Zod schemas for request validation |
| `src/utils/` | Shared helpers, custom errors, response formatting |
| `src/types/` | TypeScript type definitions |
| `src/config/` | App configuration (env, cors, database) |
| `tests/` | Test files mirroring src structure |
| `uploads/` | Temporary file uploads (dev only — use S3 in production) |

---

## Shared Package (`packages/shared/`)

```
packages/shared/
├── src/
│   ├── schemas/                 # Zod schemas shared between client and server
│   │   ├── donor.ts
│   │   ├── event.ts
│   │   └── auth.ts
│   ├── types/                   # Shared TypeScript types
│   │   ├── donor.ts
│   │   ├── event.ts
│   │   └── api.ts               # API envelope types
│   └── constants/               # Shared constants
│       ├── roles.ts
│       ├── status.ts
│       └── errors.ts            # Error codes
├── tsconfig.json
├── package.json
└── index.ts
```

---

## Folder Organization Rules

1. **Feature-based grouping** — group files by feature (donors, events), not by technical role.
2. **One file per concept** — no giant files. `donor-service.ts` handles donor business logic.
3. **Co-location** — place related files close together. If a component is only used by one page, put it in that page's folder.
4. **Avoid deep nesting** — max 4 levels deep from `src/`. If deeper, extract to a module.
5. **Use index files** sparingly — barrel exports (`index.ts`) should only re-export, never contain logic.
6. **No circular dependencies** — if A imports B and B imports A, extract the shared code to a third module.
7. **Test files mirror source** — `tests/unit/services/donor-service.test.ts` tests `src/services/donor-service.ts`.

## Checklist

- [ ] Frontend follows the `client/` structure above
- [ ] Backend follows the `server/` structure above
- [ ] Feature-based grouping is used (not technical grouping)
- [ ] No file exceeds 300 lines
- [ ] No barrel file contains logic (only re-exports)
- [ ] No circular dependencies
- [ ] Test files mirror source structure
- [ ] Shared schemas exist in `packages/shared/`
