# 11 — Testing Rules

## Testing Philosophy

- **Test behaviour, not implementation.**
- **Don't test the framework** (React, Express, Prisma). Test your code.
- Every PR must include tests for new functionality and bug fixes.
- Aim for **80%+ coverage**, but focus on meaningful tests, not metrics.

---

## Test Pyramid

```
      ╱╲
     ╱ E2E ╲          ← Few (critical user journeys)
    ╱────────╲
   ╱Integration╲       ← Some (API endpoints, service + database)
  ╱──────────────╲
 ╱   Unit Tests    ╲    ← Many (pure logic, utilities, hooks)
╱────────────────────╲
```

| Layer | Count | Speed | What to Test |
|-------|-------|-------|-------------|
| Unit | Many | < 1 ms each | Pure functions, utilities, custom hooks, validation schemas |
| Integration | Some | < 100 ms each | API endpoints, services with database, middleware |
| E2E | Few | < 10 s each | Critical user flows (login → donate → see report) |

---

## Directory Structure

```
tests/
├── unit/
│   ├── utils/
│   │   ├── format.test.ts
│   │   └── errors.test.ts
│   ├── services/
│   │   ├── donor-service.test.ts
│   │   └── auth-service.test.ts
│   ├── validators/
│   │   ├── donor.test.ts
│   │   └── auth.test.ts
│   └── hooks/              # Frontend
│       ├── useDebounce.test.ts
│       └── usePagination.test.ts
├── integration/
│   ├── api/
│   │   ├── donor-api.test.ts
│   │   ├── event-api.test.ts
│   │   └── auth-api.test.ts
│   └── components/         # Frontend
│       ├── DonorForm.test.tsx
│       └── DonorList.test.tsx
└── e2e/
    ├── donation-flow.spec.ts
    ├── admin-panel.spec.ts
    └── auth-flow.spec.ts
```

---

## Unit Tests

### What to Unit Test

- Pure utility functions (`formatDate`, `formatCurrency`, `cn`)
- Validation schemas (Zod)
- Custom React hooks
- Service functions with mocked dependencies
- Error classes and error handling logic

### What NOT to Unit Test

- Framework internals (React, Express, Prisma)
- Database queries (test at integration level)
- UI rendering details (test behaviour, not markup)

### Service Unit Tests

```javascript
// tests/unit/services/donor-service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as donorService from '@/services/donor-service';
import * as donorRepo from '@/repositories/donor-repo';

vi.mock('@/repositories/donor-repo');

describe('donorService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('getById', () => {
    it('returns a donor when found', async () => {
      const mockDonor = { id: '1', name: 'John' };
      vi.mocked(donorRepo.findById).mockResolvedValue(mockDonor);

      const result = await donorService.getById('1');
      expect(result).toEqual(toDonorResponse(mockDonor));
    });

    it('throws NotFoundError when donor does not exist', async () => {
      vi.mocked(donorRepo.findById).mockResolvedValue(null);

      await expect(donorService.getById('999')).rejects.toThrowNotFoundError();
    });

    it('throws ValidationError for invalid ID', async () => {
      await expect(donorService.getById('')).rejects.toThrowValidationError();
      await expect(donorService.getById(null as any)).rejects.toThrowValidationError();
    });
  });

  describe('create', () => {
    it('creates a donor successfully', async () => {
      const input = { name: 'John', email: 'john@test.com', amount: 1000 };
      vi.mocked(donorRepo.findByEmail).mockResolvedValue(null);
      vi.mocked(donorRepo.create).mockResolvedValue({ id: '1', ...input });

      const result = await donorService.create(input);
      expect(result).toBeDefined();
      expect(donorRepo.create).toHaveBeenCalledWith(input);
    });

    it('throws ConflictError when email already exists', async () => {
      vi.mocked(donorRepo.findByEmail).mockResolvedValue({ id: 'existing' });

      await expect(donorService.create({
        name: 'John',
        email: 'existing@test.com',
        amount: 1000,
      })).rejects.toThrowConflictError();
    });
  });
});
```

### Validation Schema Tests

```javascript
// tests/unit/validators/donor.test.ts
import { describe, it, expect } from 'vitest';
import { createDonorSchema } from '@/validators/donor';

describe('createDonorSchema', () => {
  it('accepts valid input', () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+919876543210',
      amount: 1000,
    };
    const result = createDonorSchema.parse(input);
    expect(result).toEqual(input);
  });

  it('rejects missing name', () => {
    expect(() => createDonorSchema.parse({
      email: 'john@example.com',
      amount: 1000,
    })).toThrow();
  });

  it('rejects invalid email', () => {
    expect(() => createDonorSchema.parse({
      name: 'John',
      email: 'not-an-email',
      amount: 1000,
    })).toThrow();
  });

  it('rejects negative amount', () => {
    expect(() => createDonorSchema.parse({
      name: 'John',
      email: 'john@example.com',
      amount: -100,
    })).toThrow();
  });

  it('accepts optional message field', () => {
    const input = {
      name: 'John',
      email: 'john@example.com',
      amount: 500,
      message: 'Great work!',
    };
    const result = createDonorSchema.parse(input);
    expect(result.message).toBe('Great work!');
  });
});
```

### Custom Hook Tests

```javascript
// tests/unit/hooks/useDebounce.test.ts
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } },
    );

    rerender({ value: 'hello world' });
    // Value should still be 'hello' within debounce window
    expect(result.current).toBe('hello');

    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe('hello world');
  });
});
```

---

## Integration Tests

### API Integration Tests

```javascript
// tests/integration/api/donor-api.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createTestDonor, generateToken } from '../fixtures/helpers';

const request = supertest(app);

describe('GET /api/v1/donors', () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = await generateToken({ role: 'admin' });
  });

  it('returns paginated donors', async () => {
    await createTestDonor({ name: 'John' });
    await createTestDonor({ name: 'Jane' });

    const res = await request
      .get('/api/v1/donors')
      .set('Authorization', `Bearer ${adminToken}`)
      .query({ page: 1, limit: 10 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.meta).toEqual({
      page: 1,
      limit: 10,
      total: 2,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    });
  });

  it('returns 401 without authentication', async () => {
    const res = await request.get('/api/v1/donors');
    expect(res.status).toBe(401);
  });

  it('returns 403 for unauthorized role', async () => {
    const viewerToken = await generateToken({ role: 'viewer' });
    const res = await request
      .get('/api/v1/donors')
      .set('Authorization', `Bearer ${viewerToken}`);
    expect(res.status).toBe(403);
  });
});
```

### Component Integration Tests

```javascript
// tests/integration/components/DonorForm.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider } from '@tanstack/react-query';
import { DonorForm } from '@/components/donors/DonorForm';

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>,
  );
}

describe('DonorForm', () => {
  it('shows validation errors on empty submit', async () => {
    const onSubmit = vi.fn();
    renderWithProviders(<DonorForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits with valid data', async () => {
    const onSubmit = vi.fn();
    renderWithProviders(<DonorForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/amount/i), '1000');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        amount: 1000,
      });
    });
  });
});
```

---

## E2E Tests

- Use **Playwright** for E2E tests.
- Test critical user flows only.
- Run against a test database.

```javascript
// tests/e2e/donation-flow.spec.ts
import { test, expect } from '@playwright/test';

test('user can complete a donation flow', async ({ page }) => {
  await page.goto('/');

  // Navigate to donate page
  await page.click('text=Donate Now');
  await expect(page).toHaveURL(/\/donate/);

  // Fill donation form
  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="amount"]', '2500');

  // Submit
  await page.click('button:has-text("Donate")');

  // Verify success
  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page.locator('.success-message')).toContainText('Thank you');
});
```

---

## Mocking Rules

| What | How | When |
|------|-----|------|
| Database | `vi.mock('@/lib/prisma')` or in-memory test DB | Service tests |
| HTTP calls | Mock axios or use `msw` (Mock Service Worker) | Integration tests |
| Auth/user | Generate test JWT tokens | API tests |
| Time | `vi.useFakeTimers()` | Debounce, date-based logic |
| Random/UUID | `vi.mock('crypto')` | ID generation |

### MSW for API Mocking

```javascript
// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/v1/donors', () => {
    return HttpResponse.json({
      success: true,
      data: [
        { id: '1', name: 'John', amount: 1000 },
        { id: '2', name: 'Jane', amount: 2000 },
      ],
      meta: { page: 1, limit: 20, total: 2, totalPages: 1 },
    });
  }),
];
```

---

## Coverage

- **Target**: 80%+ line coverage.
- **What counts**: Branches, lines, functions.
- **What doesn't count**: Configuration files, generated code, type definitions.
- Coverage is a guideline, not a goal. Write meaningful tests first.

```javascript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/migrations/**',
      ],
      thresholds: {
        lines: 80,
        branches: 75,
        functions: 80,
        statements: 80,
      },
    },
  },
});
```

---

## Testing Checklist

- [ ] Unit tests exist for all utility functions
- [ ] Unit tests exist for all validation schemas
- [ ] Service tests cover success + error cases (found, not found, conflict)
- [ ] API integration tests cover auth, validation, and success cases
- [ ] Component tests cover user interaction (form validation, submission)
- [ ] E2E tests cover at least the primary user flow (donate)
- [ ] All tests are deterministic (no flaky tests)
- [ ] Tests clean up after themselves (test DB, mocks restored)
- [ ] `vi.mock` is used at the top of the file (not inside test blocks)
- [ ] No tests depend on the order of other tests
