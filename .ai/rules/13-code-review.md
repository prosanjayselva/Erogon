# 13 — Code Review Checklist

## Purpose

This checklist is used by reviewers to evaluate every pull request. Every item should be verified before approving.

---

## Architecture

- [ ] Follows Clean Architecture layering (presentation → application → infrastructure → data)
- [ ] Separation of concerns respected (controller ≠ service ≠ repository)
- [ ] No business logic in controllers or route handlers
- [ ] No database access in controllers or services (goes through repositories)
- [ ] Dependency injection used where appropriate (no hardcoded dependencies)
- [ ] Feature is built for the current requirement only (YAGNI)
- [ ] No over-engineered abstractions (KISS)
- [ ] If a pattern was introduced, it's justified (is there an ADR?)
- [ ] Architecture is consistent with the rest of the codebase

## Readability

- [ ] Code is easy to read and understand at a glance
- [ ] Functions have clear names that describe what they do
- [ ] No deeply nested conditionals (max 2 levels of nesting)
- [ ] Early returns used for edge cases and guard clauses
- [ ] Complex logic has a comment explaining *why*
- [ ] No magic numbers or strings (constants/enums used)
- [ ] No abbreviations or cryptic variable names
- [ ] No long parameter lists (>3 parameters → use options object)

## Performance

- [ ] No N+1 database queries (verify `include` or batch queries are used)
- [ ] List endpoints are paginated (page + limit)
- [ ] Database queries have appropriate indexes
- [ ] No synchronous blocking operations in request handlers
- [ ] React components are properly memoized where beneficial
- [ ] Route-level code splitting is used for new pages
- [ ] Images are optimized (WebP, lazy loading, responsive)
- [ ] No unnecessary re-renders (verify selector usage in Zustand)
- [ ] `useMemo` and `useCallback` are used only when they add value

## Security

- [ ] Authentication is required for protected endpoints
- [ ] Authorization (role check) is applied where needed
- [ ] User input is validated on both client and server (Zod)
- [ ] No raw SQL queries — Prisma parameterised queries used
- [ ] No `dangerouslySetInnerHTML` without DOMPurify
- [ ] CORS is configured with specific origins
- [ ] Rate limiting is applied (especially on auth endpoints)
- [ ] No secrets or credentials in code or commit history
- [ ] Passwords are hashed with bcrypt (cost factor ≥ 12)
- [ ] JWT tokens have appropriate expiry (access: 15m, refresh: 7d)
- [ ] No sensitive data exposed in API responses (DTOs are used)
- [ ] Security headers are applied (Helmet)
- [ ] Mass assignment is prevented (Zod whitelisting)
- [ ] File uploads are validated (type, size, filename)

## Testing

- [ ] Unit tests cover utility functions and validation schemas
- [ ] Unit tests cover service success + error cases
- [ ] Integration tests cover API endpoints (auth, validation, CRUD)
- [ ] Component tests cover user interaction (form validation, submission)
- [ ] All edge cases are tested (null, empty, not found, conflict, auth failure)
- [ ] No tests depend on external services without mocking
- [ ] Tests are deterministic (no flaky tests)
- [ ] New code maintains or improves overall coverage
- [ ] Error states, loading states, and empty states are tested (frontend)

## Validation

- [ ] All request inputs are validated (body, params, query, headers)
- [ ] Validation schemas are defined in a single source of truth (Zod)
- [ ] Validation errors return 400 with field-level details
- [ ] Business rules are validated in the service layer (not just in the schema)
- [ ] SQL injection is prevented (Prisma parameterised queries)
- [ ] XSS is prevented (React auto-escaping, CSP, DOMPurify if needed)
- [ ] No unsafe `eval()`, `setTimeout(string)`, or `new Function()`

## Naming

- [ ] Variables and functions follow `camelCase`
- [ ] Constants follow `UPPER_SNAKE_CASE`
- [ ] React components follow `PascalCase`
- [ ] Files follow `kebab-case`
- [ ] Database tables and columns follow `snake_case`
- [ ] API endpoints use plural nouns and `kebab-case`
- [ ] Boolean variables have `is`/`has`/`can` prefix
- [ ] Custom hooks have `use` prefix
- [ ] No single-letter variable names (except loop indices in small scopes)

## Error Handling

- [ ] Custom error classes are used (NotFoundError, ValidationError, etc.)
- [ ] Global error handler catches all errors (backend)
- [ ] API errors return a consistent format `{ success, error: { code, message } }`
- [ ] No stack traces exposed in production
- [ ] Error boundaries wrap route segments (frontend)
- [ ] TanStack Query mutations handle `onError`
- [ ] API client interceptor handles 401 (auto-logout)
- [ ] Empty catch blocks do not exist
- [ ] All caught errors are logged with context
- [ ] Graceful degradation on network failure (frontend)
- [ ] Retry logic is configured for transient failures

## Accessibility

- [ ] Semantic HTML is used (`<nav>`, `<main>`, `<section>`, `<button>`)
- [ ] All images have `alt` attributes
- [ ] Form inputs have associated `<label>` elements or `aria-label`
- [ ] Interactive elements are keyboard accessible
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] ARIA attributes are used correctly (`aria-current`, `aria-expanded`, `role`)
- [ ] Focus management is handled (modals, navigation)
- [ ] Error messages are associated with their inputs (`aria-describedby`)

## Maintainability

- [ ] Files are under 300 lines
- [ ] Components are under 200 lines
- [ ] Functions are under 40 lines
- [ ] No duplicate code (DRY principle followed)
- [ ] Shared logic is extracted into utilities, hooks, or services
- [ ] No commented-out code
- [ ] No `console.log` or `debugger` statements
- [ ] No `TODO` or `FIXME` comments
- [ ] Imports are organised (built-in → external → internal → types → styles)
- [ ] Cyclomatic complexity is low (no deeply nested conditionals)
- [ ] Configuration is in environment variables, not hardcoded

## Scalability

- [ ] List endpoints are paginated (even if only 10 items exist today)
- [ ] Database queries use indexes on filtered/sorted columns
- [ ] No synchronous blocking in request handlers
- [ ] Connection pooling is configured for production
- [ ] Rate limiting is applied
- [ ] Stateless API design (no in-memory session storage)
- [ ] Caching strategy is considered (Cache-Control headers, TanStack Query stale time)

## Database

- [ ] Prisma schema uses UUIDs (not auto-increment integers)
- [ ] Timestamps use `Timestamptz` (not `DateTime` without timezone)
- [ ] Monetary values use `Decimal` (not `Float` or `Int`)
- [ ] Foreign keys have `@@index`
- [ ] Unique constraints are defined where needed
- [ ] No N+1 queries (verify `include` usage)
- [ ] Table and column names follow `snake_case`
- [ ] Migrations are named descriptively
- [ ] Transactions wrap multi-table writes
- [ ] No `SELECT *` (use `select` to limit columns)

## API

- [ ] RESTful URL naming (plural nouns, no verbs)
- [ ] Correct HTTP methods (GET for read, POST for create, etc.)
- [ ] Consistent response format `{ success, data }` / `{ success, error }`
- [ ] Proper HTTP status codes (201 for create, 204 for delete, etc.)
- [ ] API is versioned (`/api/v1/`)
- [ ] Error responses include a code and a message
- [ ] Paginated responses include `meta` object
- [ ] No breaking changes without a new API version
- [ ] Rate limiting headers are returned

## React

- [ ] Functional components only (no class components)
- [ ] Custom hooks follow `use` naming convention
- [ ] No data fetching in `useEffect` (TanStack Query used instead)
- [ ] No prop drilling deeper than 3 levels
- [ ] Routes are lazy-loaded with `React.lazy` + `Suspense`
- [ ] No `any` types (specific types or generics used)
- [ ] Lists have stable `key` props (not array index)
- [ ] No stale closures (exhaustive deps in hooks)
- [ ] State is colocated (no unnecessary lifting)
- [ ] Zustand store subscriptions are selective (not full store)

## Node.js / Express

- [ ] Routes define only path + middleware + controller — no logic
- [ ] Controllers are thin — parse request, call service, send response
- [ ] Services contain all business logic
- [ ] Repositories wrap Prisma queries only
- [ ] Async route handlers have error handling (try/catch or asyncHandler wrapper)
- [ ] Middleware is modular and reusable
- [ ] Logger is used instead of `console.log`
- [ ] Graceful shutdown is implemented (SIGTERM handler)

## Prisma

- [ ] Global Prisma client singleton (no multiple instances)
- [ ] No raw SQL unless absolutely necessary (and parameterised)
- [ ] `select` limits returned columns
- [ ] `include` prevents N+1
- [ ] Transactions wrap operations that modify multiple records
- [ ] Enums used (not strings)

## PostgreSQL

- [ ] Indexes on all foreign key columns
- [ ] Composite indexes for multi-column queries
- [ ] Unique constraints prevent duplicate data
- [ ] Connection pooling configured
- [ ] Column data types are appropriate (TIMESTAMPTZ, DECIMAL, UUID)
- [ ] Migrations are tested before deploy

---

## How to Use This Checklist

### For the Author (Before Requesting Review)

Go through each section and self-verify. Mark items as completed.

### For the Reviewer

1. Start with **Architecture** and **Readability** — understand the overall approach.
2. Check **Security** — the most critical section.
3. Check **Performance** — prevent regressions.
4. Check **Testing** — ensure quality is backed by tests.
5. Check **Error Handling** — ensure robustness.
6. Scan remaining sections for any obvious issues.
7. Leave actionable comments referencing the item number.

### Comment Format

```
[Security-5] Passwords must be hashed with bcrypt before storage.
See .ai/rules/06-security.md for password hashing requirements.
```
