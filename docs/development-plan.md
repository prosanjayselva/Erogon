# ERGON Foundation — Full-Stack Development Plan

> Based on: *Trust Management Software Proposal* (Tamilarasan N) + *ERGON Foundation Website Content*

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   DNS / Domain                   │
│         ergonfoundation.org (example)            │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              Reverse Proxy (Nginx)               │
│  / → React Portfolio  │  /admin → Admin Panel   │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│          Node.js + Express.js Backend            │
│     /api/v1/* (REST API)                         │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│         PostgreSQL (Docker Container)            │
│         Port: 5432                               │
└─────────────────────────────────────────────────┘
```

### Two Applications, One Domain

| App | Route | Auth Required | Tech |
|-----|-------|--------------|------|
| **Portfolio Website** | `/` (root) | ❌ Public | React + TanStack Query |
| **Admin Panel** | `/admin/*` | ✅ Login required | React + Zustand + TanStack Query |
| **Backend API** | `/api/v1/*` | Mixed (JWT) | Express.js + Prisma |

---

## 2. Tech Stack

### Frontend

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 18+ | UI |
| Build tool | Vite | Dev server + bundler |
| Routing | React Router v6 | Client-side routing |
| Client state | Zustand | Auth, UI, theme |
| Server state | TanStack Query | API data, cache, mutations |
| HTTP client | Axios | API calls |
| Validation | Zod | Form + API validation |
| Styling | CSS (existing) + Tailwind or CSS Modules | Maintain current look |

### Backend

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Node.js 20+ | Server |
| Framework | Express.js | HTTP server |
| ORM | Prisma | Database access |
| Database | PostgreSQL | Primary data store |
| Auth | JWT + bcrypt | Authentication |
| Security | Helmet + CORS + express-rate-limit | Security headers |
| Validation | Zod | Request validation |
| Logging | Pino | Structured logging |

### Infrastructure

| Tool | Purpose |
|------|---------|
| Docker | PostgreSQL container |
| Docker Compose | Orchestration |
| Nginx | Reverse proxy |
| GitHub Actions | CI/CD |

---

## 3. Database Schema (PostgreSQL via Docker)

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    container_name: ergon-postgres
    environment:
      POSTGRES_DB: ergon_foundation
      POSTGRES_USER: ergon_admin
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  pgdata:
```

### Prisma Schema

```prisma
// server/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Auth & Users ───────────────────────────────────────────

enum UserRole {
  ADMIN
  MANAGER
  VIEWER
}

model User {
  id           String     @id @default(uuid()) @db.Uuid
  name         String     @db.VarChar(200)
  email        String     @unique @db.VarChar(255)
  passwordHash String     @db.VarChar(255)
  role         UserRole   @default(VIEWER)
  is_active    Boolean    @default(true)
  created_at   DateTime   @default(now()) @db.Timestamptz()
  updated_at   DateTime   @updatedAt @db.Timestamptz()
  last_login   DateTime?  @db.Timestamptz()

  @@map("users")
  @@index([email])
}

// ─── Donors ─────────────────────────────────────────────────

model Donor {
  id         String       @id @default(uuid()) @db.Uuid
  name       String       @db.VarChar(200)
  email      String       @db.VarChar(255)
  phone      String?      @db.VarChar(20)
  amount     Decimal      @db.Decimal(12, 2)
  message    String?      @db.Text
  is_active  Boolean      @default(true)
  created_at DateTime     @default(now()) @db.Timestamptz()
  updated_at DateTime     @updatedAt @db.Timestamptz()

  @@map("donors")
  @@index([email])
  @@index([created_at])
  @@index([is_active, created_at])
}

// ─── Events ─────────────────────────────────────────────────

enum EventStatus {
  UPCOMING
  COMPLETED
  CANCELLED
}

model Event {
  id          String       @id @default(uuid()) @db.Uuid
  title       String       @db.VarChar(300)
  description String       @db.Text
  event_date  DateTime     @db.Timestamptz()
  location    String?      @db.VarChar(300)
  banner_url  String?      @db.VarChar(500)
  status      EventStatus  @default(UPCOMING)
  created_by  String       @db.Uuid
  created_at  DateTime     @default(now()) @db.Timestamptz()
  updated_at  DateTime     @updatedAt @db.Timestamptz()

  creator     User         @relation(fields: [created_by], references: [id])

  @@map("events")
  @@index([event_date])
  @@index([status, event_date])
}

// ─── Newsletter Subscribers ────────────────────────────────

model Subscriber {
  id         String   @id @default(uuid()) @db.Uuid
  email      String   @unique @db.VarChar(255)
  is_active  Boolean  @default(true)
  created_at DateTime @default(now()) @db.Timestamptz()

  @@map("subscribers")
  @@index([email])
}

// ─── Career (Job Seekers) ──────────────────────────────────

model JobSeeker {
  id            String  @id @default(uuid()) @db.Uuid
  full_name     String  @db.VarChar(200)
  dob           DateTime? @db.Date
  gender        String? @db.VarChar(20)
  qualification String? @db.VarChar(300)
  address       String? @db.Text
  phone         String  @db.VarChar(20)
  email         String  @db.VarChar(255)
  experience    Int?    // years
  skills        String? @db.Text
  preferred_role String? @db.VarChar(200)
  preferred_industry String? @db.VarChar(200)
  preferred_location String? @db.VarChar(200)
  current_ctc   Decimal? @db.Decimal(12, 2)
  expected_ctc  Decimal? @db.Decimal(12, 2)
  notice_period Int?    // days
  languages     String? @db.Text
  resume_url    String? @db.VarChar(500)
  created_at    DateTime @default(now()) @db.Timestamptz()

  @@map("job_seekers")
  @@index([email])
  @@index([created_at])
}

// ─── Career (Employers) ────────────────────────────────────

model EmployerRequirement {
  id                  String  @id @default(uuid()) @db.Uuid
  org_name            String  @db.VarChar(300)
  contact_person      String  @db.VarChar(200)
  designation         String? @db.VarChar(200)
  phone               String  @db.VarChar(20)
  email               String  @db.VarChar(255)
  industry_type       String? @db.VarChar(200)
  job_role            String  @db.VarChar(200)
  vacancies           Int
  qualification       String? @db.VarChar(300)
  experience_required String? @db.VarChar(100)
  salary_range        String? @db.VarChar(100)
  job_location        String? @db.VarChar(200)
  employment_type     String? @db.VarChar(50) // Full Time / Part Time / Internship
  jd_url              String? @db.VarChar(500)
  additional_notes    String? @db.Text
  created_at          DateTime @default(now()) @db.Timestamptz()

  @@map("employer_requirements")
  @@index([created_at])
}

// ─── Gallery Items ─────────────────────────────────────────

model GalleryItem {
  id          String   @id @default(uuid()) @db.Uuid
  title       String?  @db.VarChar(200)
  type        String   @db.VarChar(20) // 'image' or 'video'
  url         String   @db.VarChar(500)
  thumbnail   String?  @db.VarChar(500)
  sort_order  Int      @default(0)
  is_active   Boolean  @default(true)
  created_at  DateTime @default(now()) @db.Timestamptz()

  @@map("gallery_items")
  @@index([type, is_active])
  @@index([sort_order])
}

// ─── Reports ───────────────────────────────────────────────

enum ReportType {
  ACTIVITY
  ANNUAL
  ENVIRONMENTAL
}

model Report {
  id          String     @id @default(uuid()) @db.Uuid
  title       String     @db.VarChar(300)
  type        ReportType
  description String?    @db.Text
  file_url    String     @db.VarChar(500)
  cover_image String?    @db.VarChar(500)
  publish_date DateTime? @db.Timestamptz()
  is_active   Boolean    @default(true)
  created_at  DateTime   @default(now()) @db.Timestamptz()
  updated_at  DateTime   @updatedAt @db.Timestamptz()

  @@map("reports")
  @@index([type, is_active])
  @@index([publish_date])
}

// ─── Partner Logos ─────────────────────────────────────────

model Partner {
  id         String   @id @default(uuid()) @db.Uuid
  name       String   @db.VarChar(200)
  logo_url   String   @db.VarChar(500)
  website    String?  @db.VarChar(500)
  sort_order Int      @default(0)
  is_active  Boolean  @default(true)
  created_at DateTime @default(now()) @db.Timestamptz()

  @@map("partners")
  @@index([is_active, sort_order])
}
```

---

## 4. Folder Structure

```
ergon-foundation/
├── .ai/rules/
├── docker-compose.yml
├── client/                    # React Portfolio + Admin
│   ├── public/
│   ├── src/
│   │   ├── api/               # Axios client
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/            # Button, Input, Modal, Table, Spinner
│   │   │   ├── layout/        # Header, Footer, AdminSidebar
│   │   │   ├── portfolio/     # Public site components
│   │   │   └── admin/         # Admin panel components
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   ├── portfolio/     # Public pages
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── AboutPage.tsx
│   │   │   │   ├── CausesPage.tsx
│   │   │   │   ├── EduSProPage.tsx
│   │   │   │   ├── GalleryPage.tsx
│   │   │   │   ├── ReportsPage.tsx
│   │   │   │   ├── ContactPage.tsx
│   │   │   │   └── DonatePage.tsx
│   │   │   └── admin/         # Admin pages
│   │   │       ├── LoginPage.tsx
│   │   │       ├── DashboardPage.tsx
│   │   │       ├── DonorManagementPage.tsx
│   │   │       ├── EventManagementPage.tsx
│   │   │       ├── GalleryManagementPage.tsx
│   │   │       ├── ReportManagementPage.tsx
│   │   │       ├── CareerManagementPage.tsx
│   │   │       ├── SubscriberManagementPage.tsx
│   │   │       └── UserManagementPage.tsx
│   │   ├── providers/
│   │   ├── queries/
│   │   ├── stores/
│   │   ├── schemas/
│   │   ├── types/
│   │   ├── router.tsx
│   │   └── App.tsx
│   └── package.json
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── src/
│   │   ├── routes/v1/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middleware/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── config/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
└── packages/shared/
    ├── schemas/
    ├── types/
    └── constants/
```

---

## 5. Routing Plan

### Frontend Routes

| Path | Page | Layout | Auth |
|------|------|--------|------|
| `/` | HomePage | PortfolioLayout | ❌ |
| `/about` | AboutPage | PortfolioLayout | ❌ |
| `/causes` | CausesPage | PortfolioLayout | ❌ |
| `/eduspro` | EduSProPage | PortfolioLayout | ❌ |
| `/gallery` | GalleryPage | PortfolioLayout | ❌ |
| `/reports` | ReportsPage | PortfolioLayout | ❌ |
| `/contact` | ContactPage | PortfolioLayout | ❌ |
| `/donate` | DonatePage | PortfolioLayout | ❌ |
| `/get-involved` | GetInvolvedPage | PortfolioLayout | ❌ |
| `/careers` | CareersPage | PortfolioLayout | ❌ |
| `/admin/login` | LoginPage | MinimalLayout | ❌ |
| `/admin` | DashboardPage | AdminLayout | ✅ |
| `/admin/donors` | DonorManagementPage | AdminLayout | ✅ |
| `/admin/events` | EventManagementPage | AdminLayout | ✅ |
| `/admin/gallery` | GalleryManagementPage | AdminLayout | ✅ |
| `/admin/reports` | ReportManagementPage | AdminLayout | ✅ |
| `/admin/careers` | CareerManagementPage | AdminLayout | ✅ |
| `/admin/subscribers` | SubscriberManagementPage | AdminLayout | ✅ |
| `/admin/users` | UserManagementPage | AdminLayout | ✅ |

### Backend API Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/auth/login` | ❌ | Admin login |
| `POST` | `/api/v1/auth/refresh` | ❌ | Refresh token |
| `POST` | `/api/v1/auth/logout` | ✅ | Logout |
| | | | |
| `GET` | `/api/v1/donors` | ✅ | List donors (paginated) |
| `GET` | `/api/v1/donors/:id` | ✅ | Get donor |
| `POST` | `/api/v1/donors` | ❌ | Create donor (public) |
| `DELETE` | `/api/v1/donors/:id` | ✅ | Delete donor |
| | | | |
| `GET` | `/api/v1/events` | ❌ | List events (public, active) |
| `GET` | `/api/v1/events/:id` | ❌ | Get event |
| `POST` | `/api/v1/events` | ✅ | Create event |
| `PUT` | `/api/v1/events/:id` | ✅ | Update event |
| `DELETE` | `/api/v1/events/:id` | ✅ | Delete event |
| | | | |
| `POST` | `/api/v1/subscribers` | ❌ | Subscribe (public) |
| `GET` | `/api/v1/subscribers` | ✅ | List subscribers (admin) |
| | | | |
| `POST` | `/api/v1/careers/job-seekers` | ❌ | Submit job seeker form (public) |
| `GET` | `/api/v1/careers/job-seekers` | ✅ | List job seekers (admin) |
| `POST` | `/api/v1/careers/employers` | ❌ | Submit employer form (public) |
| `GET` | `/api/v1/careers/employers` | ✅ | List employer requirements (admin) |
| | | | |
| `GET` | `/api/v1/gallery` | ❌ | List gallery items (public) |
| `POST` | `/api/v1/gallery` | ✅ | Add gallery item (admin) |
| `DELETE` | `/api/v1/gallery/:id` | ✅ | Delete gallery item (admin) |
| | | | |
| `GET` | `/api/v1/reports` | ❌ | List reports (public) |
| `POST` | `/api/v1/reports` | ✅ | Add report (admin) |
| `DELETE` | `/api/v1/reports/:id` | ✅ | Delete report (admin) |
| | | | |
| `GET` | `/api/v1/partners` | ❌ | List partners (public) |
| `POST` | `/api/v1/partners` | ✅ | Add partner (admin) |
| `DELETE` | `/api/v1/partners/:id` | ✅ | Delete partner (admin) |
| | | | |
| `GET` | `/api/v1/dashboard/stats` | ✅ | Dashboard summary stats |

---

## 6. Implementation Phases

### Phase 1: Foundation (Days 1–3)

| Task | Details |
|------|---------|
| Docker setup | `docker-compose.yml` with PostgreSQL 16 |
| Project scaffolding | Init `client/` (Vite + React) and `server/` (Express + Prisma) |
| Prisma schema | All models with relations, indexes, enums |
| Seed script | Admin user, sample donors, events, gallery items |
| Shared package | Zod schemas, TypeScript types, constants |

### Phase 2: Backend API (Days 4–8)

| Task | Details |
|------|---------|
| Auth system | JWT access + refresh tokens, login/logout/refresh endpoints |
| Middleware | Auth, RBAC, validation, error handler, rate limiter, request ID |
| Donor module | CRUD + pagination + search |
| Event module | CRUD + status management + upcoming/completed filters |
| Gallery module | List + create + delete (image upload) |
| Report module | List + create + delete (PDF upload) |
| Career module | Job seeker + employer form submissions + admin listing |
| Subscriber module | Subscribe + admin list |
| Partner module | CRUD |
| Dashboard stats | Aggregate endpoint |

### Phase 3: Portfolio Frontend (Days 9–13)

| Task | Details |
|------|---------|
| Convert existing HTML→React | Migrate `index.html`, `about.html`, `causes.html`, etc. to React components |
| Portfolio layout | Header, footer, hero sections (preserve current CSS design) |
| Home page | Banner, stats, activities, projects, testimonials, partners (dynamic data) |
| About page | Vision, team, partners, donors |
| Causes page | People / Pets / Planet sections |
| EduSPro page | Programme details |
| Gallery page | Image grid from API |
| Reports page | Downloadable PDFs from API |
| Contact page | Address, social links, enquiry form |
| Donate page | Bank account details |
| Careers page | Job seeker form + employer form (functional forms) |

### Phase 4: Admin Panel (Days 14–18)

| Task | Details |
|------|---------|
| Admin layout | Sidebar navigation, header with user menu |
| Login page | Email + password, JWT storage, redirect to dashboard |
| Dashboard | Stats cards (total donors, events, subscribers), recent donations, upcoming events |
| Donor management | Table with search/filter, view details, delete |
| Event management | CRUD table, create/edit form, status toggle, banner upload |
| Gallery management | Grid view, upload images, delete |
| Report management | Upload PDF, set type (activity/annual), publish date |
| Career management | View job seeker submissions + employer requirements |
| Subscriber management | List subscribers, export to CSV |
| User management | Admin user CRUD |

### Phase 5: Polish & Deploy (Days 19–25)

| Task | Details |
|------|---------|
| File uploads | Implement multer + local storage (dev) / S3 (prod) |
| Error handling | Global error boundary, toast notifications |
| Loading states | Skeleton loaders for all pages |
| Empty states | Consistent empty state component |
| Responsive design | Ensure mobile compatibility |
| Performance | Bundle analysis, lazy loading, image optimization |
| Security audit | Helmet, CORS, rate limiting, input sanitization |
| Nginx config | Reverse proxy setup for portfolio + admin |
| Deployment | Deploy to VPS / Vercel + Render / Railway |

---

## 7. Domain Strategy

```
ergonfoundation.org
├── /                  → React Portfolio (public)
├── /admin/*           → React Admin Panel (login required)
└── /api/v1/*          → Express API (behind Nginx reverse proxy)

Nginx config:
  /          → client:5173 (or client build)
  /admin     → client:5173 (same React app, different route)
  /api       → server:3000
```

### Same React App, Two Entry Points

```javascript
// client/src/router.tsx
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  // ─── Public Portfolio ─────────────────────────
  {
    element: <PortfolioLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/',              element: <HomePage /> },
      { path: '/about',         element: <AboutPage /> },
      { path: '/causes',        element: <CausesPage /> },
      { path: '/eduspro',       element: <EduSProPage /> },
      { path: '/gallery',       element: <GalleryPage /> },
      { path: '/reports',       element: <ReportsPage /> },
      { path: '/contact',       element: <ContactPage /> },
      { path: '/donate',        element: <DonatePage /> },
      { path: '/get-involved',  element: <GetInvolvedPage /> },
    ],
  },
  // ─── Admin Panel ──────────────────────────────
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login',          element: <LoginPage /> },
      { path: '',               element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
      { path: 'donors',         element: <ProtectedRoute><DonorManagementPage /></ProtectedRoute> },
      { path: 'events',         element: <ProtectedRoute><EventManagementPage /></ProtectedRoute> },
      { path: 'gallery',        element: <ProtectedRoute><GalleryManagementPage /></ProtectedRoute> },
      { path: 'reports',        element: <ProtectedRoute><ReportManagementPage /></ProtectedRoute> },
      { path: 'careers',        element: <ProtectedRoute><CareerManagementPage /></ProtectedRoute> },
      { path: 'subscribers',    element: <ProtectedRoute><SubscriberManagementPage /></ProtectedRoute> },
      { path: 'users',          element: <ProtectedRoute><UserManagementPage /></ProtectedRoute> },
    ],
  },
]);
```

---

## 8. Auth Flow (Admin)

```
1. User visits /admin/login
2. Enters email + password
3. POST /api/v1/auth/login
4. Backend validates credentials (bcrypt compare)
5. Returns { accessToken (15min), refreshToken (7d) }
6. Frontend stores:
   - accessToken → Zustand (memory)
   - refreshToken → httpOnly cookie
7. Axios interceptor attaches Authorization: Bearer <token>
8. On 401 → interceptor calls /auth/refresh
9. If refresh fails → redirect to /admin/login
```

---

## 9. Key Migration: Static HTML → React

### Current State
```
10 static HTML files + 1 CSS file
- index.html, about.html, causes.html, eduspro.html
- projects.html, reports.html, gallery.html
- get-involved.html, contact.html, donate.html
- styles.css
```

### Migration Strategy

| File | React Page | Data Source |
|------|-----------|-------------|
| `index.html` | `HomePage.tsx` | Hardcoded + API (stats, partners, projects) |
| `about.html` | `AboutPage.tsx` | Hardcoded + API (team, partners) |
| `causes.html` | `CausesPage.tsx` | Hardcoded |
| `eduspro.html` | `EduSProPage.tsx` | Hardcoded |
| `projects.html` | Merged into Home | API-driven |
| `reports.html` | `ReportsPage.tsx` | API (downloadable PDFs) |
| `gallery.html` | `GalleryPage.tsx` | API (images + videos) |
| `get-involved.html` | `CareersPage.tsx` | API (functional forms) |
| `contact.html` | `ContactPage.tsx` | Static + API (enquiry form) |
| `donate.html` | `DonatePage.tsx` | Static |

### Preserve Existing CSS Design

- Keep `styles.css` as the design foundation
- Convert to CSS modules or Tailwind during migration
- Maintain exact colour palette, typography, spacing, and component styles

---

## 10. Estimated Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Phase 1: Foundation | 3 days | Docker, project scaffold, schema, seed |
| Phase 2: Backend API | 5 days | All API endpoints working |
| Phase 3: Portfolio Frontend | 5 days | All public pages live, dynamic data |
| Phase 4: Admin Panel | 5 days | Login, dashboard, CRUD management |
| Phase 5: Polish & Deploy | 7 days | Security, responsive, deployment |
| **Total** | **~25 days** | Full production-ready application |

---

## 11. Quick Start

```bash
# 1. Clone and enter project
cd ergon-foundation

# 2. Start PostgreSQL
docker compose up -d

# 3. Setup backend
cd server
cp .env.example .env    # Edit DATABASE_URL
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev

# 4. Setup frontend
cd ../client
cp .env.example .env    # Edit VITE_API_URL
npm install
npm run dev

# 5. Open in browser
# Portfolio:  http://localhost:5173
# Admin:      http://localhost:5173/admin/login
# API:        http://localhost:3000/api/v1
```

---

## 12. Admin Panel UI Preview

```
┌──────────────────────────────────────────────────────┐
│  [Logo]  ERGON Admin                    👤 Admin  ⏻ │
├──────────┬───────────────────────────────────────────┤
│          │                                           │
│  📊 Dashboard │   Welcome back, Admin                │
│  👥 Donors    │                                       │
│  📅 Events    │   ┌──────┬──────┬──────┬──────┐      │
│  🖼 Gallery   │   │ 245  │  12  │ 850  │  8   │      │
│  📄 Reports   │   │Total │Upc. │Donors │This  │      │
│  💼 Careers   │   │Donors│Events│₹(K)  │Month │      │
│  📧 Subs.     │   └──────┴──────┴──────┴──────┘      │
│  👤 Users     │                                       │
│          │   ┌──────────────────────────────────┐    │
│          │   │ Recent Donations                  │    │
│          │   │ John Doe    ₹5,000   Today        │    │
│          │   │ Jane Smith  ₹2,500   Yesterday    │    │
│          │   │ ...                               │    │
│          │   └──────────────────────────────────┘    │
├──────────┴───────────────────────────────────────────┤
│  © 2026 ERGON Foundation                             │
└──────────────────────────────────────────────────────┘
```
