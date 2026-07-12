# 10 — Error Handling Rules

## Philosophy

> Errors are inevitable. How you handle them determines the reliability of your system.

- Handle errors **at the boundary**, not in every function.
- Throw early, catch late.
- Never swallow errors silently.
- Never expose internals to the client.

---

## Backend Error Handling

### Custom Error Classes

Define a hierarchy of reusable error classes:

```javascript
// utils/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409, 'CONFLICT');
  }
}

export class ValidationError extends AppError {
  constructor(public details: ValidationDetail[]) {
    super('Validation failed', 400, 'VALIDATION_ERROR');
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super('Too many requests', 429, 'RATE_LIMITED');
  }
}
```

### Global Error Handler Middleware

```javascript
// middleware/error-handler.ts
import { logger } from '@/utils/logger';
import { AppError } from '@/utils/errors';
import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  // Log the error
  logger.error({
    type: 'error',
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    requestId: req.id,
    method: req.method,
    path: req.path,
    userId: req.user?.id,
  });

  // Known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err instanceof ValidationError && { details: err.details }),
      },
    });
  }

  // Prisma known errors
  if (err.constructor?.name === 'PrismaClientKnownRequestError') {
    const prismaErr = err as any;
    if (prismaErr.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'A record with this value already exists',
        },
      });
    }
    if (prismaErr.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Record not found',
        },
      });
    }
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token',
      },
    });
  }

  // Zod validation errors
  if (err.constructor?.name === 'ZodError') {
    const zodErr = err as any;
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: zodErr.errors.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
    });
  }

  // Unknown errors — don't expose details
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  });
}
```

### Using the Error Handler

```javascript
// app.ts
import { errorHandler } from '@/middleware/error-handler';

// Apply after all routes
app.use('/api/v1', v1Routes);
app.use(errorHandler); // <-- must be last
```

### Async Handler Wrapper

```javascript
// middleware/async-handler.ts
import type { Request, Response, NextFunction } from 'express';

export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Usage
router.get('/donors', asyncHandler(async (req, res) => {
  const donors = await donorService.findAll();
  res.json({ success: true, data: donors });
}));
```

### Error Handling Rules for Services

```javascript
// services/donor-service.ts
export async function getById(id: string) {
  // Validate input immediately
  if (!id || typeof id !== 'string') {
    throw new ValidationError([{ field: 'id', message: 'Invalid donor ID' }]);
  }

  const donor = await donorRepo.findById(id);
  if (!donor) {
    throw new NotFoundError('Donor');
  }

  return toDonorResponse(donor);
}
```

---

## Frontend Error Handling

### Error Boundaries

- Wrap each route segment with an error boundary.
- Provide a fallback UI with retry capability.
- Log errors to monitoring (Sentry).

```javascript
// components/ErrorBoundary.tsx
import { Component } from 'react';
import { logger } from '@/lib/logger';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('React error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage in router
<Route path="/donors" element={
  <ErrorBoundary>
    <DonorListPage />
  </ErrorBoundary>
} />
```

### TanStack Query Error Handling

```javascript
// Global error handler for queries
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      onError: (error) => {
        if (error.status === 401) {
          useAuthStore.getState().logout();
        }
      },
    },
  },
});

// Per-query error handling
export function useDonors(filters: DonorFilters) {
  return useQuery({
    queryKey: donorKeys.list(filters),
    queryFn: () => donorService.getAll(filters),
  });
}

// In component
function DonorListPage() {
  const { data, isLoading, isError, error, refetch } = useDonors(filters);

  if (isLoading) return <PageSkeleton />;
  if (isError) return (
    <ErrorState
      title="Failed to load donors"
      message={error instanceof AppError ? error.message : 'An unexpected error occurred'}
      onRetry={refetch}
    />
  );
  // ...
}
```

### Mutation Error Handling

```javascript
export function useCreateDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: donorService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donorKeys.lists() });
      toast.success('Donor created successfully');
    },
    onError: (error) => {
      if (error instanceof ValidationError) {
        // Show field-level validation errors
        setFormErrors(error.details);
      } else {
        toast.error(error.message || 'Failed to create donor');
      }
    },
  });
}
```

### API Client Error Interceptor

```javascript
// api/client.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import { toast } from '@/components/ui/toast';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach auth token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Session expired → logout
      if (status === 401) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Rate limited
      if (status === 429) {
        toast.error('Too many requests. Please slow down.');
      }

      // Format the error
      const apiError = new AppError(
        data?.error?.message || 'An error occurred',
        status,
        data?.error?.code || 'UNKNOWN',
      );
      return Promise.reject(apiError);
    }

    // Network error
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out. Please try again.');
    } else {
      toast.error('Network error. Please check your connection.');
    }

    return Promise.reject(error);
  },
);
```

### Error State Component

```javascript
// components/ui/ErrorState.tsx
interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="error-state" role="alert">
      <AlertIcon />
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="button button-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
```

### Empty State Component

```javascript
// components/ui/EmptyState.tsx
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && (
        <button className="button button-primary" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
```

---

## Error Handling Rules

### What to Never Do

| Mistake | Why |
|---------|-----|
| `catch (e) {}` (empty catch) | Swallows errors, makes debugging impossible |
| `catch (e) { console.log(e) }` | Logs to console in production |
| `process.on('uncaughtException')` without exit | Leaves process in unknown state |
| Exposing stack traces to clients | Security risk |
| Throwing generic `Error` | Hard to distinguish error types |
| Returning `null` instead of throwing | Hides errors, shifts burden to caller |

### What to Always Do

| Practice | Reason |
|----------|--------|
| Use typed error classes | Allows proper error handling by type |
| Log with context (requestId, userId) | Debuggable |
| Return consistent error format | Client can parse |
| Catch at the boundary (middleware) | Keeps business logic clean |
| Handle promise rejections | Prevents unhandled rejection crashes |
| Graceful shutdown on fatal errors | Prevents data loss |

## Checklist

- [ ] Custom error classes exist (AppError, NotFoundError, etc.)
- [ ] Global error handler middleware is applied last
- [ ] All route handlers use try/catch or asyncHandler wrapper
- [ ] API errors return consistent format `{ success, error: { code, message } }`
- [ ] No stack traces in production error responses
- [ ] Error boundaries wrap all route segments
- [ ] TanStack Query mutations handle onError
- [ ] API client interceptor handles 401 (auto-logout)
- [ ] All errors are logged with context
- [ ] Empty states are handled (no data ≠ error)
- [ ] Validation errors return field-level details
- [ ] No empty catch blocks anywhere in the codebase
