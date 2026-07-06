# Donor API

> Flow: Portfolio Donate page (form) → `POST /api/v1/donors` → stored in DB → Admin panel reads via `GET /api/v1/donors`

---

## Donate Page — Form Fields

Add below the bank details table on `/donate`:

| Field | Type | Required |
|-------|------|----------|
| Full Name | text | ✅ |
| Email Address | email | ✅ |
| Phone Number | tel | ✅ |
| Donation Amount | number | ✅ |
| Message (optional) | textarea | ❌ |

---

## Prisma Schema

```prisma
model Donor {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  phone     String
  amount    Float
  message   String?
  createdAt DateTime @default(now()) @map("created_at")

  @@map("donors")
}
```

---

## Endpoints

### POST /api/v1/donors — Public (Portfolio)

Submit a donation from the Donate page.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "amount": 5000,
  "message": "For education support"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Thank you for your donation!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "amount": 5000,
    "message": "For education support",
    "createdAt": "2026-07-06T10:30:00.000Z"
  }
}
```

**Validation (Zod):**
```javascript
import { z } from 'zod';

export const createDonorSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone required'),
  amount: z.number().positive('Amount must be greater than 0'),
  message: z.string().optional(),
});
```

---

### GET /api/v1/donors — Protected (Admin)

List/search/filter/sort donors for admin panel.

**Query Params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `search` | string | — | Search name, email, or phone |
| `sortBy` | string | `created_at` | `name`, `amount`, `created_at` |
| `sortOrder` | `asc` / `desc` | `desc` | Sort direction |
| `page` | number | `1` | Page number |
| `limit` | number | `20` | Results per page |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 9876543210",
      "amount": 5000,
      "message": "For education support",
      "createdAt": "2026-07-06T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

---

### DELETE /api/v1/donors/:id — Protected (Admin)

Delete a donor record.

**Response (200):**
```json
{
  "success": true,
  "message": "Donor deleted successfully"
}
```

---

## Files to Create

```
server/src/
├── routes/v1/
│   └── donor-routes.js
├── controllers/
│   └── donor-controller.js
├── services/
│   └── donor-service.js
├── validators/
│   └── donor-validator.js
└── middleware/
    └── auth.js
```

---

## Example Route Setup

```javascript
// routes/v1/donor-routes.js
import { Router } from 'express';
import { create, list, remove } from '../../controllers/donor-controller.js';
import { authenticate } from '../../middleware/auth.js';

const router = Router();

router.post('/', create);              // Public — portfolio donate form
router.get('/', authenticate, list);   // Protected — admin panel
router.delete('/:id', authenticate, remove); // Protected — admin panel

export default router;
```
