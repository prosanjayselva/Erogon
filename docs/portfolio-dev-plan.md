# Portfolio Website — Development Plan

> **Sources**: Trust Management Software Proposal §1 + ERGON Foundation Website Content (DOCX) §§1–9

---

## 1. Pages (Merged)

| # | Page | Route | Source | Content | Action |
|---|------|-------|--------|---------|--------|
| 1 | Home | `/` | Proposal §1 + DOCX §1 | Banner + tagline "People • Pets • Planet" | 🔄 Migrate |
| 2 | About Us | `/about` | Proposal §1 + DOCX §2 | Vision, Key Activities, Team, Partners, Donors | 🔄 Migrate |
| 3 | Mission & Vision | `/mission-vision` | Proposal §1 | Mission + Vision statements | 🔄 Migrate |
| 4 | Gallery | `/gallery` | Proposal §1 + DOCX §5 | Images + Videos | 🔄 Migrate + Add Videos |
| 5 | Events | `/events` | Proposal §1 | Event list with dates & descriptions | 🆕 New |
| 6 | Contact | `/contact` | Proposal §1 + DOCX §9 | Address, Email, Phone, Social links + enquiry form | 🔄 Migrate |
| 7 | Donate | `/donate` | Proposal §1 + DOCX §8 | Bank account details (SBI, A/c 45185422472, IFSC SBIN0018228) | 🔄 Migrate |
| 8 | Newsletter | `/newsletter` | DOCX §3 | Monthly updates + Impact Stories + subscribe form | 🆕 New |
| 9 | Career Opportunities | `/careers` | DOCX §4 | Job Seeker form + Employer form | 🆕 New |
| 10 | Reports | `/reports` | DOCX §6 | Activity Report + Annual Report PDF downloads | 🆕 New |
| 11 | EduSPro | `/eduspro` | DOCX §7 | Educational Sponsors Programme description | 🔄 Migrate |

---

## 2. Page Content Detail (from DOCX)

### Home (DOCX §1)
> "ERGON Foundation is a registered charitable trust dedicated to innovation for the welfare of people, animals, and the environment. Guided by the vision, ROOTED IN GOOD DEEDS for the People • Pets • Planet."

- Banner with tagline
- Clean modern layout (Proposal §1)

### About Us (DOCX §2)

**Our Vision**: Work for welfare of People, Pets, and Planet through charitable and sustainable initiatives. Support poor communities, care for animals, protect environment in Tamil Nadu and across India.

**Key Activities**:
| Category | Activities |
|----------|-----------|
| **People** | Education Support & Skill Development, Women Empowerment & Livelihood Support, Healthcare & Community Welfare, Career Guidance & Placement Support |
| **Pets** | Animal Rescue & Welfare Activities |
| **Planet** | Environmental Protection & Sustainability, Awareness, Volunteer & Community Development Programmes |

**ERGON Team**:
- **Governing Body**: Mr. S. S. Antony Joseph (Founder & Chairman), Mrs. Sarah Preethi Antony (Secretary & Treasurer), Mr. Vinoth Raj Kumar (Member)
- **Patrons**: (list)
- **Staff**: CEO, Ms. A. Sangeetha (Director, Communications & Programmes), Mr. John Milton (Director, Projects & Resource Mobilisation)

**Our Partners**: Tech Tycoon Digital Solution LLP

**Our Donors**: LOGOS Constructions PVT Ltd., Rhema Resorts PVT Ltd.

### Mission & Vision (Proposal §1)
Separate page or section showing trust's mission and vision.

### Gallery (DOCX §5)
- Images display
- Videos display (new — add YouTube embeds)

### Events (Proposal §1)
- Event listing
- Dates & descriptions
- Upcoming / past view

### Contact (DOCX §9)
- **Address**: ERGON Foundation, 10/13, 2nd Floor, 1st Street, Dr. Subbarayan Nagar, Kodambakkam, Chennai - 600024
- **Email**: admin@ergonfoundation.org
- **Mobile**: +91 8438540850
- **Social**: Facebook, X (Twitter), LinkedIn, Instagram, YouTube (with URLs)
- Contact form / enquiry

### Donate (DOCX §8)
| Field | Value |
|-------|-------|
| Account Name | ERGON FOUNDATION |
| Bank | STATE BANK OF INDIA |
| Account Number | 45185422472 |
| Branch | SBI HNI Ashok Nagar, Chennai |
| IFSC Code | SBIN0018228 |

### Newsletter (DOCX §3) — 🆕
- Monthly updates section
- Impact Stories section
- Email subscribe form

### Career Opportunities (DOCX §4) — 🆕
ERGON Foundation connects job seekers with employers.

**Job Seeker Form Fields**:
Full Name, Date of Birth, Gender, Educational Qualification, Address, Contact Number, Email ID, Years of Experience, Skills, Preferred Job Role, Preferred Industry, Preferred Location, Current CTC, Expected CTC, Notice Period, Languages Known, Resume / CV Upload

**Employer Form Fields**:
Name of Organization, Contact Person, Designation, Contact Number, Email ID, Industry Type, Job Role Required, Number of Vacancies, Qualification Required, Experience Required, Salary Range (CTC), Job Location, Employment Type (Full Time / Part Time / Internship), Job Description Upload, Additional Expectations

### Reports (DOCX §6) — 🆕
- Activity Report (PDF download)
- Annual Report (PDF download)

### EduSPro (DOCX §7)
> Educational Support Programme for school students without parents or with single parents in absolute poverty. Raise ₹1,00,000 (One lakh) from sponsors per child.

---

## 3. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router v6 |
| Server State | TanStack Query |
| HTTP Client | Axios |
| Validation | Zod (forms) |
| Styling | Existing `styles.css` (preserved as-is) |

---

## 4. API Endpoints (Portfolio Consumes)

| Method | Endpoint | Purpose | Source |
|--------|----------|---------|--------|
| `GET` | `/api/v1/events` | List events | Proposal §1 |
| `GET` | `/api/v1/gallery` | List images + videos | DOCX §5 |
| `GET` | `/api/v1/reports` | List report PDFs | DOCX §6 |
| `POST` | `/api/v1/careers/job-seekers` | Submit job seeker form | DOCX §4 |
| `POST` | `/api/v1/careers/employers` | Submit employer form | DOCX §4 |
| `POST` | `/api/v1/subscribers` | Newsletter subscribe | DOCX §3 |
| `POST` | `/api/v1/contact/enquiries` | Contact form submit | DOCX §9 |

All public — no auth required.

---

## 5. Implementation Order

| Step | Task | Days |
|------|------|------|
| 1 | Scaffold Vite + React, configure routing + layout | 0.5 |
| 2 | Migrate Home page (DOCX §1 banner + tagline) | 1 |
| 3 | Migrate About Us page (Vision, Activities, Team, Partners, Donors) | 1.5 |
| 4 | Migrate Mission & Vision page | 0.5 |
| 5 | Build Events page (new — from Proposal) | 1.5 |
| 6 | Migrate Gallery + add Videos tab | 1.5 |
| 7 | Migrate Contact page with form + social links | 1 |
| 8 | Migrate Donate page with bank details | 0.5 |
| 9 | Build Newsletter page (subscribe + updates) | 1 |
| 10 | Build Career Opportunities page (Job Seeker + Employer forms) | 2.5 |
| 11 | Build Reports page (PDF download cards) | 1 |
| 12 | Migrate EduSPro page | 0.5 |
| 13 | Wire API calls (TanStack Query) | 1 |
| 14 | Responsive polish + testing | 1 |
| | **Total** | **~14 days** |
