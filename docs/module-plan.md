# Module Plan

> **Sources**: Trust Management Software Proposal (7 modules) + ERGON Foundation Website Content (DOCX)

---

## Module Inventory

| # | Module | Proposal | DOCX | Type | Auth | Est. Days |
|---|--------|----------|------|------|------|-----------|
| 1 | Portfolio Website | §1 | §§1–9 | Public | ❌ | 14 |
| 2 | Secure Admin Panel | §2 | — | Admin | ✅ | 1.5 |
| 3 | Dashboard | §6 | — | Admin | ✅ | 1.5 |
| 4 | Donor Management | §3 | — | Admin | ✅ | 2 |
| 5 | Event Management | §4 | — | Admin | ✅ | 3 |
| 6 | Event Reminder | §5 | — | Admin | ✅ | 0.5 |
| 7 | Enhancements | §7 | — | Both | — | 2 |

---

## MOD-1: Portfolio Website (§1 + DOCX §§1–9)

### Pages

| Page | Route | DOCX § | Content | Data Source |
|------|-------|--------|---------|-------------|
| Home | `/` | §1 | Banner + tagline "People • Pets • Planet" | Static |
| About Us | `/about` | §2 | Vision, Key Activities, Team, Partners, Donors | Static + Partners from API |
| Mission & Vision | `/mission-vision` | — | Mission & vision statements | Static |
| Gallery | `/gallery` | §5 | Images + Videos | API |
| Events | `/events` | — | Event list with dates, descriptions | API |
| Contact | `/contact` | §9 | Address, Email, Phone, Social links, enquiry form | Static + POST |
| Donate | `/donate` | §8 | Bank details (SBI, A/c 45185422472, IFSC SBIN0018228) | Static |
| Newsletter | `/newsletter` | §3 | Monthly updates, Impact Stories, subscribe | Static + POST |
| Career Opportunities | `/careers` | §4 | Job Seeker form + Employer form | POST forms |
| Reports | `/reports` | §6 | Activity Report + Annual Report PDFs | API |
| EduSPro | `/eduspro` | §7 | Educational Sponsors Programme description | Static |

### API Endpoints (Public)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/v1/events` | Events list |
| `GET` | `/api/v1/gallery` | Images + videos |
| `GET` | `/api/v1/reports` | Report PDFs |
| `GET` | `/api/v1/partners` | Partner logos |
| `POST` | `/api/v1/careers/job-seekers` | Job seeker form |
| `POST` | `/api/v1/careers/employers` | Employer form |
| `POST` | `/api/v1/subscribers` | Newsletter subscribe |
| `POST` | `/api/v1/contact/enquiries` | Contact form |

---

## MOD-2: Secure Admin Panel (Proposal §2)

**Features**: Login, Email & Password auth, authorized email only, session handling, protected routes

**Files**: `auth-routes.js`, `auth-controller.js`, `auth-service.js`, `auth.js` (middleware), `LoginPage.jsx`, `auth-store.js`

---

## MOD-3: Dashboard (Proposal §6)

**Cards**: Total Donors, Upcoming Events, Completed Events, Recent Donations, Recent Activities

**API**: `GET /api/v1/dashboard/stats`

**Files**: `dashboard-routes.js`, `dashboard-controller.js`, `dashboard-service.js`, `DashboardPage.jsx`

---

## MOD-4: Donor Management (Proposal §3)

**Columns**: Name, Email, Phone, Amount, Date
**Features**: Search, filter, sort, paginate

**API**: `GET /api/v1/donors`

**Files**: `donor-routes.js`, `donor-controller.js`, `donor-service.js`, `DonorManagementPage.jsx`

---

## MOD-5: Event Management (Proposal §4)

**Features**: Add/Edit/Delete, banner upload, status (UPCOMING/COMPLETED/CANCELLED), filter

**API**: `GET/POST/PUT/DELETE /api/v1/events`

**Files**: `event-routes.js`, `event-controller.js`, `event-service.js`, `EventManagementPage.jsx`

---

## MOD-6: Event Reminder (Proposal §5)

**Features**: Auto-notify 2 days before, dashboard alert

**File**: `event-reminder.js` (cron)

---

## MOD-7: Enhancements (Proposal §7)

UI/UX, animations, notifications, activity log, validation, error handling — applied across all modules.

---

## DB Tables

| Table | Modules | Purpose |
|-------|---------|---------|
| `users` | MOD-2 | Admin credentials |
| `donors` | MOD-3, MOD-4 | Donor records |
| `events` | MOD-1, MOD-5, MOD-6 | Event data |
| `gallery_items` | MOD-1 | Images + videos |
| `reports` | MOD-1 | Report PDFs |
| `partners` | MOD-1 | Partner logos |
| `job_seekers` | MOD-1 | Career form submissions |
| `employer_requirements` | MOD-1 | Employer form submissions |
| `subscribers` | MOD-1 | Newsletter emails |
| `enquiries` | MOD-1 | Contact form submissions |
| `notifications` | MOD-6, MOD-3 | Reminders + activity log |

---

## Dependency Graph

```
PostgreSQL
    ↓
Prisma ORM
    ↓
Express API (server/) ──→ Event Reminder (cron)
    ↓                                               ↓
React Portfolio (public)                    React Admin (login required)
├── Home              (static)              ├── Login
├── About             (static + API)        ├── Dashboard
├── Mission & Vision  (static)              ├── Donors
├── Gallery           (API)                 └── Events
├── Events            (API)
├── Contact           (static + POST)
├── Donate            (static)
├── Newsletter        (static + POST)
├── Careers           (POST)
├── Reports           (API)
└── EduSPro           (static)
```
