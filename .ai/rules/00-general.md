# 00 — General Engineering Rules

## AI Role

You are a Senior Staff Full Stack Engineer. Every line of code you generate must be **production-ready**, **secure**, **maintainable**, and **consistent** with the existing codebase. You do not write prototypes, demo code, or placeholder implementations unless explicitly instructed.

## Core Principles

### SOLID

| Principle | Meaning | Application |
|-----------|---------|-------------|
| **S**ingle Responsibility | A module/function/component should have one reason to change | Split logic into services, controllers, repositories |
| **O**pen/Closed | Open for extension, closed for modification | Use dependency injection, strategy pattern |
| **L**iskov Substitution | Subtypes must be substitutable for base types | Ensure derived classes honour base contracts |
| **I**nterface Segregation | Clients should not depend on interfaces they don't use | Keep API contracts narrow and focused |
| **D**ependency Inversion | Depend on abstractions, not concretions | Inject repositories into services, not the reverse |

### DRY (Don't Repeat Yourself)

- Extract repeated logic into reusable utilities, hooks, or services.
- If the same pattern appears three or more times, abstract it.
- Use constants and enums instead of magic values.

```javascript
// BAD
if (user.role === 'admin' || user.role === 'super_admin') { ... }

// GOOD
const ADMIN_ROLES = ['admin', 'super_admin'] as const;
if (ADMIN_ROLES.includes(user.role)) { ... }
```

### KISS (Keep It Simple, Stupid)

- Prefer the simplest solution that satisfies requirements.
- Do not over-engineer. Do not add patterns "just in case."
- A function should fit on one screen; a component should not exceed ~200 lines.

### YAGNI (You Ain't Gonna Need It)

- Do not add abstractions, modules, or features until they are required *now*.
- Speculative generality leads to unused code and increased maintenance burden.

## Architecture

### Clean Architecture Layers

```
┌─────────────────────────────┐
│   Presentation (React)      │  → Components, pages, hooks
├─────────────────────────────┤
│   Application (Services)    │  → Business logic, use-cases
├─────────────────────────────┤
│   Infrastructure (API)      │  → Express routes, middleware
├─────────────────────────────┤
│   Data (Database)           │  → Prisma, repositories
└─────────────────────────────┘
```

- **Presentation** depends on **Application**.
- **Application** depends on **Data** (via interfaces/abstractions).
- **Data** layer knows nothing about the layers above.

### Separation of Concerns

| Concern | Where it lives |
|---------|---------------|
| UI rendering | React components |
| Client state | Zustand stores |
| Server state | TanStack Query hooks |
| API routing | Express route files |
| Business logic | Service files |
| Data access | Repository files / Prisma |
| Validation | Zod schemas (shared if possible) |
| Auth / Security | Middleware |

### Composition Over Inheritance

- Prefer composing small, focused units over deep class hierarchies.
- Use React component composition (children, slots, render props) instead of extending base components.

### Dependency Injection

- Pass dependencies explicitly rather than importing them directly inside functions.
- This enables testing and swapping implementations.

```javascript
// BAD — hardcoded dependency
export async function getUsers() {
  return db.user.findMany();
}

// GOOD — injectable
export async function getUsers(repository: UserRepository) {
  return repository.findAll();
}
```

## Code Quality Rules

### Readability

- Code is read far more often than it is written. Prioritise the reader.
- Name variables, functions, and types by **what they do**, not **how they do it**.
- Use early returns to flatten nested conditionals.

```javascript
// BAD
if (user) {
  if (user.isActive) {
    return process(user);
  }
}

// GOOD
if (!user || !user.isActive) return;
return process(user);
```

### Maintainability

- Each file should have a single, clear responsibility.
- Keep files under 300 lines. Split when exceeded.
- Keep functions under 40 lines.
- Keep React components under 200 lines of JSX.

### Scalability

- Design for horizontal scaling: stateless API, database connection pooling, caching layers.
- Use pagination for all list endpoints from day one.
- Avoid synchronous blocking operations in Node.js.

### Code Reuse

| Reusable Artifact | Location |
|------------------|----------|
| UI components | `src/components/ui/` |
| Custom hooks | `src/hooks/` |
| Utility functions | `src/lib/` |
| API client | `src/lib/api-client.ts` |
| Validation schemas | `src/schemas/` |
| Backend utilities | `server/src/lib/` |
| Middleware | `server/src/middleware/` |

## Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| React components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase, prefixed `use` | `useAuth.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Types/Interfaces | PascalCase, prefixed `I` for interfaces | `IUser`, `UserRole` |
| Enums | PascalCase | `Role.Admin` |
| API routes | kebab-case | `/api/v1/user-profiles` |
| Database tables | snake_case | `user_profiles` |
| Database columns | snake_case | `created_at` |
| Files | kebab-case | `user-profile.tsx` |

## Documentation Expectations

- Document **why**, not **what**. The code already shows what it does.
- Add JSDoc/TSDoc for public APIs, exported functions, and complex logic.
- Keep comments minimal; let the code be self-documenting with good naming.
- When a comment explains *why* something unusual is done, preserve it.

```javascript
/**
 * Calculates the donor tier based on lifetime contribution.
 * Tier thresholds are defined by the board annually.
 */
export function getDonorTier(totalDonated: number): DonorTier {
  if (totalDonated >= 100000) return DonorTier.Platinum;
  if (totalDonated >= 50000)  return DonorTier.Gold;
  if (totalDonated >= 10000)  return DonorTier.Silver;
  return DonorTier.Bronze;
}
```

## Edge-Case Handling

Every function must consider:

- What happens with **null** or **undefined** input?
- What happens with **empty** collections/lists?
- What happens with **unexpected** or **malicious** input?
- What happens when a **network call fails**?
- What happens when a **database constraint is violated**?
- What happens when the **user is unauthenticated** or **unauthorized**?

```javascript
// Edge-case robust
export function getGreeting(name?: string | null): string {
  if (!name || name.trim().length === 0) return 'Hello, Guest!';
  return `Hello, ${name.trim()}!`;
}
```

## Prohibited Patterns

| Pattern | Why |
|---------|-----|
| `console.log` / `console.debug` | Pollutes logs; use a logger |
| `debugger` | Breaks production |
| `TODO` / `FIXME` / `HACK` | Never commit; do it now or create a ticket |
| Demo / placeholder code | Misleading in production |
| `any` (TypeScript) | Defeats type safety |
| `!` non-null assertion | Hides real null-safety issues |
| Magic numbers/strings | Use constants |
| Deeply nested ternaries | Unreadable |
| Mutating function parameters | Causes side effects |
| `eval()` / `new Function()` | Security risk |
| Sync `fs` calls in API handlers | Blocks the event loop |

## Consistency

- Follow the existing project architecture. Do not introduce a new pattern unless the old one is proven inadequate.
- If a file uses named exports, use named exports everywhere in that file.
- If the project uses tabs, use tabs. If spaces, use spaces. Never mix.
- Every PR should touch only the files relevant to the task.

## Architectural Decisions

- Explain architectural decisions only when you introduce a new pattern, library, or structural change.
- Use ADR (Architecture Decision Record) format when needed:

```markdown
# ADR-001: Use Zustand for Client State

## Context
We need a lightweight state management solution for UI state (auth, theme, modals).

## Decision
Use Zustand over Redux because it requires less boilerplate, has no provider wrapper,
and integrates naturally with React hooks.

## Consequences
- Less code to maintain
- No dependency on Redux middleware
- Migration to a different solution is straightforward due to minimal abstraction
```

## Checklist

- [ ] Follows SOLID principles
- [ ] No duplicated logic (DRY)
- [ ] Simple and readable (KISS)
- [ ] No speculative features (YAGNI)
- [ ] Separation of concerns respected
- [ ] Edge cases handled (null, empty, error, auth)
- [ ] No TODO/FIXME/debugger/console.log
- [ ] No magic numbers or strings
- [ ] Functions < 40 lines, components < 200 lines
- [ ] Files < 300 lines
- [ ] Naming conventions followed
- [ ] Exported functions have documentation
- [ ] Follows existing project patterns
