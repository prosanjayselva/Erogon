# Admin Panel — Development Plan

> **Source**: Trust Management Software Proposal §2–§7
>
> Password-protected. URL `/admin/*`. Login required.

---

## 1. Modules (from Proposal)

| # | Module | Proposal § | Description |
|---|--------|-----------|-------------|
| 1 | Secure Admin Panel | §2 | Login, email/password auth, session handling, protected routes |
| 2 | Dashboard | §6 | Overview of trust activities with summary cards |
| 3 | Donor Management | §3 | View/search/filter/sort donor list |
| 4 | Event Management | §4 | CRUD events, banner upload, status tracking |
| 5 | Event Reminder | §5 | Auto-notify admin 2 days before event |
| 6 | Enhancements | §7 | UI/UX, animations, search/filter, notifications, activity log, validation |

---

## 2. Module Details

### 2.1 Secure Admin Panel (§2)

**Features**:
- Admin Login
- Email & Password Authentication
- Only authorized admin email can access dashboard
- Secure session handling
- Protected admin routes

**Flow**:
```
/admin/login → Email + Password → POST /api/v1/auth/login
                                        ↓
                               JWT (access + refresh tokens)
                                        ↓
                               Protected routes check token
                                        ↓
                               Invalid → redirect /admin/login
```

### 2.2 Dashboard (§6)

**Cards**: Total Donors, Upcoming Events, Completed Events, Recent Donations, Recent Activities
- Quick summary cards
- Clean visual dashboard layout

**API**: `GET /api/v1/dashboard/stats`

### 2.3 Donor Management (§3)

**Features**:
- View donor list
- Donor Name, Email, Phone, Amount, Date
- Search donor details
- Filter and sort donor records
- Easy donor tracking

**API**: `GET /api/v1/donors?search=&sortBy=&page=`

### 2.4 Event Management (§4)

**Features**:
- Add New Event
- Edit Event
- Delete Event
- View Completed Events
- View Upcoming Events
- Event Date & Description
- Event banner or image upload
- Event status tracking

**API**: `GET/POST/PUT/DELETE /api/v1/events`

### 2.5 Event Reminder (§5)

**Features**:
- Automatic reminder notification
- Dashboard reminder message
- Upcoming event alert
- Timely event notification support

**Implementation**: Cron job (daily) → finds events within 2 days → creates notification → shown on Dashboard

### 2.6 Enhancements (§7)

**Features**:
- Modern UI/UX design with premium look
- Smooth animations and transitions
- Clean dashboard interface
- Better color theme and typography
- Search and filter options
- Notification system
- Activity log for admin actions
- Data validation and error handling
- Secure and scalable database structure
- Future-ready architecture

---

## 3. Admin Layout

```
┌─────────────────────────────────────────────┐
│  ERGON Admin                    👤 Admin 🔓 │
├──────────┬──────────────────────────────────┤
│  📊 Dash │                                   │
│  👥 Donors│    <Outlet /> — page content     │
│  📅 Events│                                   │
└──────────┴──────────────────────────────────┘
```

**Sidebar**: Dashboard, Donors, Events

---

## 4. API Endpoints (Admin)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/v1/auth/login` | Admin login |
| `POST` | `/api/v1/auth/refresh` | Refresh token |
| `POST` | `/api/v1/auth/logout` | Logout |
| `GET` | `/api/v1/dashboard/stats` | Dashboard stats |
| `GET` | `/api/v1/donors` | List/search donors |
| `DELETE` | `/api/v1/donors/:id` | Delete donor |
| `GET` | `/api/v1/events` | List events |
| `GET` | `/api/v1/events/:id` | Get single event |
| `POST` | `/api/v1/events` | Create event |
| `PUT` | `/api/v1/events/:id` | Update event |
| `DELETE` | `/api/v1/events/:id` | Delete event |
| `GET` | `/api/v1/gallery` | List gallery items (for admin view) |
| `GET` | `/api/v1/reports` | List reports (for admin view) |
| `GET` | `/api/v1/careers/job-seekers` | View job seeker submissions |
| `GET` | `/api/v1/careers/employers` | View employer submissions |
| `GET` | `/api/v1/subscribers` | View newsletter subscribers |
| `GET` | `/api/v1/contact/enquiries` | View contact enquiries |

---

## 5. Implementation Order

| Step | Task | Days |
|------|------|------|
| 1 | Backend: Auth (login/refresh/logout JWT) | 1.5 |
| 2 | Backend: Donor endpoints (list, search, delete) | 1 |
| 3 | Backend: Event CRUD endpoints | 1.5 |
| 4 | Backend: Dashboard stats endpoint | 0.5 |
| 5 | Backend: Event reminder cron job | 0.5 |
| 6 | Backend: Additional read-only endpoints (gallery, reports, careers, subscribers, enquiries) | 1 |
| 7 | Frontend: Login page + auth store + Axios interceptor | 1 |
| 8 | Frontend: Admin layout + sidebar | 0.5 |
| 9 | Frontend: Dashboard page with summary cards | 1 |
| 10 | Frontend: Donor management page | 1 |
| 11 | Frontend: Event management page (CRUD, status, banner) | 1.5 |
| 12 | Enhancements: UI polish, animations, notifications, activity log, validation | 2 |
| | **Total** | **~13 days** |
