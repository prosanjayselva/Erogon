# 09 — Performance Rules

## Frontend Performance

### Bundle Size

- Keep the initial JS bundle under **200 KB** (gzipped).
- Use **code splitting** at the route level — each page loads its own chunk.
- Monitor bundle size with `vite-plugin-visualizer` or `source-map-explorer`.

```javascript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: 'dist/stats.html' }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query:  ['@tanstack/react-query'],
          state:  ['zustand'],
        },
      },
    },
  },
});
```

### Lazy Loading

- All page-level components must be lazy-loaded.
- Route-level code splitting via `React.lazy` + `Suspense`.

```javascript
// ✅ GOOD — lazy loaded pages
const DonorListPage = lazy(() => import('./pages/donors/DonorListPage'));
const EventListPage = lazy(() => import('./pages/events/EventListPage'));
```

### Image Optimization

- Use **WebP** or **AVIF** formats instead of JPEG/PNG.
- Serve responsive images via `srcSet` / `sizes`.
- Lazy-load below-the-fold images using `loading="lazy"`.
- Use a CDN with image transformation (Cloudinary, Imgix) in production.

```html
<img
  src="donor-photo.webp"
  srcSet="donor-photo-400.webp 400w, donor-photo-800.webp 800w"
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  alt="Donor event photo"
/>
```

### React Rendering Optimization

| Technique | When to Use |
|-----------|-------------|
| `React.memo` | Pure presentational components re-rendering with same props |
| `useMemo` | Expensive computations (sorting, filtering large arrays) |
| `useCallback` | Stable callbacks passed to memoized children |
| Virtualization | Lists > 100 items (`@tanstack/react-virtual`) |
| Debouncing | Search inputs, resize handlers |
| Throttling | Scroll events, API rate limits |

### Debouncing and Throttling

```javascript
// Debounce — delays execution until after a pause (search input)
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// Usage
function DonorSearch() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { data } = useDonors({ search: debouncedSearch });
  // ...
}
```

### Avoiding Unnecessary Re-Renders

- **Colocate state** — keep state as close as possible to where it's used.
- **Lift content up** — pass components as children (slots) instead of props that change.
- **Use selectors** in Zustand — subscribe only to the slice you need.
- **Stable references** — avoid creating new objects/arrays on every render.

```javascript
// ❌ BAD — new object on every render
<DonorCard style={{ marginTop: '16px' }} donor={donor} />

// ✅ GOOD — stable reference
const CARD_STYLE = { marginTop: '16px' } as const;
<DonorCard style={CARD_STYLE} donor={donor} />
```

### Virtualization for Large Lists

```javascript
import { useVirtualizer } from '@tanstack/react-virtual';

export function VirtualDonorList({ donors }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: donors.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="virtual-list-container">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <DonorRow donor={donors[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Backend Performance

### Response Time Targets

| Endpoint Type | Target (p95) |
|--------------|-------------|
| Simple CRUD (GET one) | < 50 ms |
| List with pagination | < 100 ms |
| List with search + filters | < 200 ms |
| Reports / aggregations | < 500 ms |
| File uploads | < 2 s |

### Database Query Optimization

- **Use indexes** on all columns used in `WHERE`, `ORDER BY`, `JOIN`, and `GROUP BY`.
- **Avoid N+1** — use `include` or batch queries.
- **Select only needed columns** — never `SELECT *` in production.
- **Use `explain analyze`** to identify slow queries.
- **Use connection pooling** — Prisma handles this, but tune pool size.

```sql
-- PostgreSQL: Analyze slow queries
EXPLAIN ANALYZE SELECT id, name, email FROM donors WHERE email = 'test@example.com';
```

### Caching Strategy

| Layer | Cache | TTL | Invalidation |
|-------|-------|-----|-------------|
| Database query | N/A | — | — |
| Redis (if available) | Frequent read queries | 5–60 min | On write |
| HTTP | CDN edge cache (GET) | Varies | Cache-control headers |
| Client | TanStack Query cache | `staleTime: 5min` | On mutation |

```javascript
// HTTP caching headers for non-sensitive GET endpoints
app.get('/api/v1/donors', (req, res) => {
  res.set('Cache-Control', 'public, max-age=60, s-maxage=300');
  // ...
});
```

### Compression

- Enable gzip or brotli compression in Express:

```javascript
import compression from 'compression';
app.use(compression()); // Brotli preferred, gzip fallback
```

### Async Operations

- Never block the event loop with synchronous operations.
- Use `Promise.all` for independent parallel operations.
- Use streaming for large responses.

```javascript
// ✅ GOOD — parallel independent queries
const [donors, events, reports] = await Promise.all([
  donorService.findAll(params),
  eventService.findAll(eventParams),
  reportService.findAll(reportParams),
]);
```

---

## API Performance

### Pagination

- All list endpoints **must** be paginated from day one.
- Default page size: 20. Max: 100.
- Return pagination metadata so clients can build UI.

```javascript
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 142,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Batching

- Support batch operations where appropriate:

```javascript
POST /api/v1/donors/bulk   // Create multiple donors
POST /api/v1/events/bulk   // Create multiple events
PATCH /api/v1/donors/bulk-status  // Bulk status update
```

### Rate Limiting

- Global: 100 req / 15 min per IP.
- Auth: 5 req / 15 min per IP.
- Adjust based on usage patterns.

---

## Monitoring and Profiling

### What to Monitor

| Metric | Tool |
|--------|------|
| Bundle size | `vite-plugin-visualizer` |
| React render count | React DevTools Profiler |
| API response times | Pino request logging |
| Slow database queries | Prisma `log: ['query', 'warn']` |
| Memory usage | `process.memoryUsage()` |
| Error rates | Error tracking (Sentry) |

### Lighthouse Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5 s |
| Largest Contentful Paint (LCP) | < 2.5 s |
| Total Blocking Time (TBT) | < 200 ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Speed Index | < 3.0 s |

---

## Checklist

- [ ] Route-level code splitting is configured
- [ ] Images are optimized (WebP, lazy loading, responsive)
- [ ] Long lists are virtualized (>100 items)
- [ ] Debouncing is applied to search inputs
- [ ] Zustand selectors are specific (no full-store subscriptions)
- [ ] No unnecessary re-renders (memoization used appropriately)
- [ ] API list endpoints are paginated
- [ ] Database queries use indexes (verified with `EXPLAIN ANALYZE`)
- [ ] N+1 queries are eliminated
- [ ] Compression is enabled
- [ ] Rate limiting is configured
- [ ] Caching headers are set on GET endpoints
- [ ] Parallel independent requests use `Promise.all`
- [ ] Bundle size is monitored
