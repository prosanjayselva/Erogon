# 04 — API Design Rules

## REST Principles

- Use **RESTful** URL patterns with nouns, not verbs.
- Use HTTP methods to represent actions:

| Method | Action | Example |
|--------|--------|---------|
| `GET` | Read | `GET /api/v1/donors` |
| `POST` | Create | `POST /api/v1/donors` |
| `PUT` | Full update | `PUT /api/v1/donors/:id` |
| `PATCH` | Partial update | `PATCH /api/v1/donors/:id` |
| `DELETE` | Delete | `DELETE /api/v1/donors/:id` |

### URL Naming

- Use **plural nouns** for resources: `/donors`, `/events`, `/reports`
- Use **kebab-case** for multi-word resources: `/event-reminders`
- Nest resources by relationship: `/donors/:id/donations`
- Keep URLs shallow (max 2 levels deep)

```javascript
// ✅ GOOD
GET    /api/v1/donors
GET    /api/v1/donors/:id
POST   /api/v1/donors
PUT    /api/v1/donors/:id
DELETE /api/v1/donors/:id
GET    /api/v1/donors/:id/donations

// ❌ BAD
GET    /api/v1/getDonors
POST   /api/v1/createDonor
GET    /api/v1/donorList
PUT    /api/v1/update_donor
```

## HTTP Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| `200` | OK | Successful GET, PUT, PATCH |
| `201` | Created | Successful POST (resource created) |
| `204` | No Content | Successful DELETE |
| `400` | Bad Request | Validation error, malformed input |
| `401` | Unauthorized | Missing or invalid authentication |
| `403` | Forbidden | Authenticated but not authorized |
| `404` | Not Found | Resource does not exist |
| `409` | Conflict | Duplicate resource, conflicting state |
| `422` | Unprocessable Entity | Semantic validation failure |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Unexpected server failure |

## Response Format

### Success Responses

```javascript
// Single resource
{
  "success": true,
  "data": {
    "id": "abc-123",
    "name": "John Doe",
    "email": "john@example.com",
    "amount": 5000,
    "createdAt": "2026-06-15T10:30:00Z"
  }
}

// Collection with pagination
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 142,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}

// No content
{ "success": true, "data": null }
```

### Error Responses

```javascript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" },
      { "field": "amount", "message": "Amount must be positive" }
    ]
  }
}

// Single error
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Donor with id abc-123 not found"
  }
}
```

### Error Codes

| Code | HTTP Status | Meaning |
|------|-------------|---------|
| `VALIDATION_ERROR` | 400 | Request body/params/qeury failed validation |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Duplicate or conflicting resource |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

## API Versioning

- Version via URL prefix: `/api/v1/`, `/api/v2/`
- Maintain backward compatibility within a version.
- Deprecate old versions with a `Sunset` header and migration guide.

```javascript
// app.ts
import v1Routes from './routes/v1';
import v2Routes from './routes/v2';

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
```

## Validation

- Validate all inputs: `req.body`, `req.params`, `req.query`, `req.headers`.
- Use **Zod** schemas with a reusable validation middleware.
- Return a 400 with structured error details on failure.

```javascript
// middleware/validate.ts
import { ZodError, ZodSchema } from 'zod';

interface ValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export function validate(schemas: ValidationSchemas) {
  return (req, res, next) => {
    try {
      if (schemas.body)   req.body   = schemas.body.parse(req.body);
      if (schemas.query)  req.query  = schemas.query.parse(req.query);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: error.errors.map(e => ({
              field: e.path.join('.'),
              message: e.message,
            })),
          },
        });
      }
      next(error);
    }
  };
}
```

## Rate Limiting

- Apply rate limiting globally via `express-rate-limit`.
- Use stricter limits on auth endpoints (e.g., 5 requests per minute).

```javascript
import rateLimit from 'express-rate-limit';

// Global
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { code: 'RATE_LIMITED', message: 'Too many requests, try again later' },
  },
});

// Auth endpoints (stricter)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: { code: 'RATE_LIMITED', message: 'Too many login attempts' },
  },
});
```

## Pagination

All list endpoints must support:

| Parameter | Type | Default | Notes |
|-----------|------|---------|-------|
| `page` | number | 1 | 1-indexed |
| `limit` | number | 20 | Max 100 |
| `search` | string | — | Full-text search |
| `sortBy` | string | `created_at` | Field to sort by |
| `sortOrder` | `asc` \| `desc` | `desc` | Sort direction |

Response includes a `meta` object with pagination metadata:

```javascript
"meta": {
  "page": 1,
  "limit": 20,
  "total": 142,
  "totalPages": 8,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

## Filtering and Sorting

- Use query parameters for filters: `GET /api/v1/donors?status=active&minAmount=1000`
- Use `sortBy` and `sortOrder` for sorting.
- Document which fields are filterable and sortable.

```javascript
// Example
GET /api/v1/events?status=upcoming&category=environment&sortBy=date&sortOrder=asc
```

## API Consistency Rules

1. **Always plural nouns** for collection endpoints.
2. **Always use the same envelope** (`{ success, data }` or `{ success, error }`).
3. **Always include a `meta` object** for paginated responses.
4. **Always validate input** — never trust the client.
5. **Always use UTC** for timestamps in ISO 8601 format.
6. **Always return meaningful error messages** that help the client debug.
7. **Never expose stack traces** in production error responses.
8. **Never return sensitive data** (passwords, tokens) in responses.
9. **Never use auto-increment IDs** in URLs — use UUIDs or slugs.
10. **Never change the meaning of an existing field** — add a new field instead.

## Idempotency

| Method | Idempotent | Notes |
|--------|-----------|-------|
| `GET` | Yes | Safe, no side effects |
| `PUT` | Yes | Same request always produces the same state |
| `PATCH` | No | May not be idempotent |
| `DELETE` | Yes | Deleting the same resource twice returns the same result |
| `POST` | No | Creates a new resource each time |

## OpenAPI Documentation

- Document all endpoints using OpenAPI 3.0 (generate from Zod schemas or write manually).
- Include request/response schemas, error codes, and examples.
- Serve documentation via Swagger UI at `/api-docs`.

## Best Practices

1. **Design for the client** — think about what the frontend needs.
2. **Use sparse fieldsets** — allow clients to request only the fields they need: `?fields=id,name,email`
3. **Support bulk operations** via dedicated endpoints: `POST /api/v1/donors/bulk`
4. **Use ETags** for conditional requests when appropriate.
5. **Add request IDs** to every response for debugging.
6. **Deprecate gracefully** — add `Deprecation` and `Sunset` headers before removing an endpoint.

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Verbs in URLs (`/getDonors`) | Use nouns (`/donors`) |
| Inconsistent error format | Standardise on `{ success, error }` |
| Returning 500 for validation errors | Return 400 with details |
| No pagination on list endpoints | Add page/limit from the start |
| Exposing internal IDs | Use UUIDs |
| No rate limiting | Apply rate limiter |
| Mixing snake_case and camelCase | Pick one (camelCase for API) |

## Checklist

- [ ] URLs use plural nouns, kebab-case
- [ ] HTTP methods match the action (GET/POST/PUT/PATCH/DELETE)
- [ ] Response format is consistent (`{ success, data }` / `{ success, error }`)
- [ ] Proper HTTP status codes are used
- [ ] Validation is applied to all inputs
- [ ] Rate limiting is configured
- [ ] Pagination is implemented on list endpoints
- [ ] Error responses include a code and a message
- [ ] No sensitive data is exposed in responses
- [ ] Timestamps use ISO 8601 / UTC
- [ ] API is versioned (`/api/v1/`)
- [ ] OpenAPI documentation exists
