# 01 — React.js Rules

## Component Architecture

### Functional Components Only

All components must be functions — no class components.

```javascript
// ✅ GOOD
export function DonorList({ donors }: DonorListProps) { ... }

// ❌ BAD
export class DonorList extends React.Component { ... }
```

### Component Composition

Favour composition over inheritance:

```javascript
// ✅ GOOD — compound component pattern
<Card>
  <Card.Header>Donor Overview</Card.Header>
  <Card.Body>{children}</Card.Body>
  <Card.Footer>Last updated: {date}</Card.Footer>
</Card>
```

### Component Size

- **Presentation components**: ≤ 100 lines of JSX
- **Container/page components**: ≤ 200 lines
- If a component exceeds these limits, extract sub-components or custom hooks.

### Smart vs Dumb Components

| Type | Also Called | Role |
|------|------------|------|
| **Smart** (Container) | Page / Feature | Fetches data, manages state, passes props down |
| **Dumb** (Presentational) | UI component | Receives props, renders UI, no data fetching |

```javascript
// Dumb
export function DonorCard({ name, amount, onDonate }: DonorCardProps) {
  return (
    <div className="donor-card">
      <h3>{name}</h3>
      <p>Donated: ₹{amount}</p>
      <button onClick={onDonate}>Donate Again</button>
    </div>
  );
}

// Smart
export function DonorListPage() {
  const { data: donors, isLoading } = useDonors();
  if (isLoading) return <Spinner />;
  return (
    <div className="donor-grid">
      {donors.map(d => <DonorCard key={d.id} {...d} />)}
    </div>
  );
}
```

## Hooks

### Rules of Hooks

1. Only call hooks at the **top level** (not inside conditions, loops, or nested functions).
2. Only call hooks from **React functions** or **custom hooks**.
3. Use the exhaustive-deps lint rule (`react-hooks/exhaustive-deps`). Disabling it requires a comment explaining why.

### Custom Hooks

Every custom hook should be a single, focused abstraction.

```javascript
// ✅ GOOD
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
```

Custom hook naming convention: `use<Feature>()` — e.g., `useAuth()`, `useDonors()`, `useMediaQuery()`.

### Hook Anti-Patterns

| Anti-Pattern | Solution |
|-------------|----------|
| Hook inside a condition | Move to top level |
| Hook inside a callback | Move to top level |
| Too many `useState` in one component | Use `useReducer` or Zustand |
| Fetching data in `useEffect` manually | Use TanStack Query |
| Stale closures | Include all deps in the dependency array |
| Giant `useEffect` with multiple responsibilities | Split into multiple effects or custom hooks |

## Routing (React Router v6)

- Define routes in a single centralized config or route file.
- Use **layout routes** for shared UI (header, footer, sidebar).
- Use **lazy loading** for all page-level components.
- Use **relative paths** for nested routes.

```javascript
// src/router.tsx
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: lazy(() => import('./pages/Home')) },
      {
        path: 'donors',
        element: lazy(() => import('./pages/donors/DonorLayout')),
        children: [
          { index: true, element: lazy(() => import('./pages/donors/DonorList')) },
          { path: ':id', element: lazy(() => import('./pages/donors/DonorDetail')) },
        ],
      },
    ],
  },
]);
```

### Lazy Loading and Suspense

```javascript
const DonorList = lazy(() => import('./pages/DonorList'));

<Routes>
  <Route path="/donors" element={
    <Suspense fallback={<PageSkeleton />}>
      <DonorList />
    </Suspense>
  } />
</Routes>
```

## Memoization

### When to Use `React.memo`

- Pure presentational components that receive the same props frequently.
- Components that render within lists (e.g., `DonorCard` inside a mapped list).
- NOT for components with cheap renders or that change on every render.

### When to Use `useMemo`

- Expensive computations (e.g., sorting, filtering a large array).
- Referential equality for objects passed as props to memoized children.

### When to Use `useCallback`

- Passing callbacks to memoized child components.
- Functions used as dependencies in `useEffect`.

```javascript
// ✅ GOOD — prevents unnecessary re-renders of DonorCard
const DonorList = React.memo(function DonorList({ donors, onSelect }) {
  return donors.map(d => <DonorCard key={d.id} donor={d} onSelect={onSelect} />);
});

// ✅ GOOD — stable callback reference
const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);
```

### Memoization Anti-Patterns

| Anti-Pattern | Why |
|-------------|-----|
| Wrapping everything in `React.memo` | Adds overhead, can cause bugs with children/slots |
| `useMemo` on trivial operations | The cost of memoization > cost of recomputation |
| `useCallback` for every handler | Unnecessary; rerenders are cheap for simple components |
| Missing deps in `useCallback`/`useMemo` | Stale closure bugs |

## Forms

- Use controlled components.
- Use a validation library (Zod with `@hookform/resolvers` or custom validation).
- Group related form state with the field name pattern.

```javascript
export function DonorForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<DonorInput>({
    resolver: zodResolver(donorSchema),
  });

  const mutation = useCreateDonor();

  return (
    <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit" disabled={mutation.isPending}>Submit</button>
    </form>
  );
}
```

## Validation

- Define validation schemas using **Zod** in a shared location.
- Validate on both **client** (form submission) and **server** (API).
- Share validation rules between frontend and backend when possible.

```javascript
// src/schemas/donor.ts
export const donorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  amount: z.number().positive('Amount must be positive'),
  message: z.string().max(500).optional(),
});

export type DonorInput = z.infer<typeof donorSchema>;
```

## Accessibility (a11y)

- All interactive elements must be keyboard accessible.
- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<button>`, `<a>`).
- Every image must have an `alt` attribute describing its content.
- Form inputs must have associated `<label>` elements or `aria-label`.
- Use `aria-current="page"` for active navigation links.
- Color contrast must meet WCAG AA minimum (4.5:1 for normal text).
- Test with a screen reader before shipping.

```javascript
// ✅ GOOD
<button aria-label="Close donation modal" onClick={onClose}>
  <XIcon aria-hidden="true" />
</button>

// ✅ GOOD
<nav aria-label="Main navigation">
  <a href="/donors" aria-current="page">Donors</a>
</nav>
```

## Error Boundaries

- Wrap each route segment with an error boundary.
- Provide a fallback UI with a retry mechanism.
- Log error details to your monitoring service, but never expose internals to the user.

```javascript
class DonorErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    logError(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          message="Something went wrong loading donors."
          onRetry={() => this.setState({ hasError: false })}
        />
      );
    }
    return this.props.children;
  }
}
```

## Rendering Optimization

### Avoid Unnecessary Re-Renders

| Technique | How |
|-----------|-----|
| Lifting state up | Shared state lives at the lowest common ancestor |
| Colocation | State lives as close as possible to where it's used |
| Component splitting | Split large components so state changes affect a smaller tree |
| `React.memo` | Memoize components that receive stable props |
| `useMemo` / `useCallback` | Stabilize values and callbacks passed to children |
| Key props | Use stable, unique keys in lists (never index unless data is static) |

### Virtualization

For long lists (>100 items), use virtualisation (`react-window` or `@tanstack/virtual`).

```javascript
import { useVirtualizer } from '@tanstack/react-virtual';

export function VirtualDonorList({ donors }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: donors.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(item => (
          <DonorCard key={item.key} donor={donors[item.index]} style={{
            position: 'absolute',
            top: 0,
            transform: `translateY(${item.start}px)`,
          }} />
        ))}
      </div>
    </div>
  );
}
```

## React Patterns

| Pattern | Use Case |
|---------|----------|
| **Compound Components** | Related components that share implicit state (`<Tabs>`, `<Tab>` ) |
| **Render Props** | Sharing logic via a function prop |
| **Higher-Order Components** | Cross-cutting concerns (deprecated, prefer hooks) |
| **Custom Hooks** | Reusable stateful logic |
| **Context + useReducer** | Mid-level state without an external library |
| **Portals** | Modals, tooltips, dropdowns that need to break out of overflow |

## Common Mistakes

| Mistake | Correction |
|---------|-----------|
| Using state for derived values | Compute on the fly with `useMemo` |
| Mutating state directly | Use setter function immutably |
| Over-nesting providers | Flatten provider tree |
| Large `useEffect` with many deps | Each effect should handle one concern |
| Using `key=index` in lists | Use a stable ID from the data |
| Not cleaning up side effects | Return cleanup from `useEffect` |
| Fetching in `useEffect` | Use TanStack Query |
| Prop drilling | Use composition first, then Context/Zustand |
| `!` non-null assertion on state | Handle undefined properly |

## Checklist

- [ ] Component is a function, not a class
- [ ] Component size ≤ 200 lines
- [ ] No prop drilling deeper than 3 levels
- [ ] Custom hooks are focused and reusable
- [ ] All routes are lazy-loaded
- [ ] Validation exists on both client and server
- [ ] Memoization is used where it adds value, not everywhere
- [ ] Semantic HTML and ARIA attributes are used
- [ ] Error boundary wraps route segments
- [ ] Lists have stable `key` props
- [ ] No `any` types (use specific types or generics)
- [ ] No `useEffect` for data fetching
- [ ] No stale closures in callbacks/effects
