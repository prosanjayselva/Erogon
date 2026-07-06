# 02 — State Management Rules

## Guiding Principle

> Server state belongs in TanStack Query. Client state belongs in Zustand.

---

## Zustand — Client State Only

### What Belongs in Zustand

| Concern | Example |
|---------|---------|
| **Authentication** | Current user object, login/logout status |
| **Theme** | Dark/light mode preference |
| **Sidebar** | Open/closed state |
| **Modal** | Which modal is visible, its props |
| **UI State** | Active tab, selected items, view mode |
| **Permissions** | User roles and feature flags |
| **User Preferences** | Language, timezone, notification settings |

### What Does NOT Belong in Zustand

- Server data (donors, events, reports)
- Pagination cursors from the server
- Cache data that should survive across sessions
- Any state that needs background refetching

### Store Structure

```javascript
// src/stores/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: IUser, token: string) => void;
  logout: () => void;
  setUser: (user: IUser) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
      }),

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
      }),

      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
);
```

### Store Best Practices

| Rule | Reason |
|------|--------|
| One store per domain | Keeps concerns separated |
| Use `partialize` for persistence | Only persist what's needed |
| Use `shallow` for selector equality | Prevents unnecessary re-renders |
| Select only what you need | `const name = useAuthStore(s => s.user?.name)` |
| Derive, don't store derived state | Compute `isAdmin` from `user.role`, don't store it |

```javascript
// ✅ GOOD — selective subscription
function UserAvatar() {
  const userName = useAuthStore(s => s.user?.name);
  return <span>{userName ?? 'Guest'}</span>;
}

// ❌ BAD — subscribes to entire store, re-renders on every change
function UserAvatar() {
  const { user } = useAuthStore();
  return <span>{user?.name ?? 'Guest'}</span>;
}
```

---

## TanStack Query — Server State Only

### What Belongs in TanStack Query

| Concern | Example |
|---------|---------|
| **API data** | Donors, events, reports, gallery items |
| **Pagination** | Cursor-based or offset-based lists |
| **Infinite queries** | Infinite scroll lists |
| **CRUD** | Create, read, update, delete operations |
| **Cache** | Locally cached server responses |
| **Mutations** | POST, PUT, PATCH, DELETE calls |
| **Refetching** | Auto-refetch, background refresh |
| **Optimistic updates** | Update UI before server confirms |
| **Background refresh** | Keep data fresh without user action |

### Query Key Convention

```
['domain', 'action', ...params]
```

```javascript
// Keys
export const donorKeys = {
  all:      ['donors'] as const,
  lists:    ()    => [...donorKeys.all, 'list'] as const,
  list:     (filters: DonorFilters) => [...donorKeys.lists(), filters] as const,
  details:  ()    => [...donorKeys.all, 'detail'] as const,
  detail:   (id: string) => [...donorKeys.details(), id] as const,
};

// Usage
export function useDonors(filters: DonorFilters) {
  return useQuery({
    queryKey: donorKeys.list(filters),
    queryFn:  () => donorService.getAll(filters),
  });
}

export function useDonor(id: string) {
  return useQuery({
    queryKey: donorKeys.detail(id),
    queryFn:  () => donorService.getById(id),
    enabled:  !!id,
  });
}
```

### Mutation Lifecycle

```javascript
export function useCreateDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DonorInput) => donorService.create(data),

    onSuccess: (newDonor) => {
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: donorKeys.lists() });

      // Optionally set the detail cache immediately
      queryClient.setQueryData(donorKeys.detail(newDonor.id), newDonor);
    },

    onError: (error) => {
      toast.error(`Failed to create donor: ${error.message}`);
    },
  });
}
```

### Query Configuration Defaults

```javascript
// src/lib/query-client.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:      5 * 60 * 1000,   // 5 minutes before refetch
      gcTime:         30 * 60 * 1000,  // 30 minutes in garbage collection
      retry:          2,
      retryDelay:     (attempt) => Math.min(1000 * 2 ** attempt, 10000),
      refetchOnWindowFocus: true,
      refetchOnReconnect:   true,
    },
    mutations: {
      retry: 0, // Do not retry mutations by default
    },
  },
});
```

### Retry Strategy

| Scenario | Retry Behavior |
|----------|---------------|
| Network error | Retry up to 2 times with exponential backoff |
| 4xx (client error) | Do not retry |
| 5xx (server error) | Retry up to 2 times |
| Mutation | Do not retry (user must manually retry) |

### Pagination and Infinite Queries

```javascript
// Offset-based pagination
export function useDonorsPaginated(page: number, pageSize = 20) {
  return useQuery({
    queryKey: donorKeys.list({ page, pageSize }),
    queryFn:  () => donorService.getAll({ page, pageSize }),
    placeholderData: keepPreviousData,
  });
}

// Infinite scroll
export function useDonorsInfinite() {
  return useInfiniteQuery({
    queryKey: donorKeys.infinite(),
    queryFn:  ({ pageParam = 1 }) => donorService.getAll({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });
}
```

### Loading, Error, and Empty States

Every query must handle all three states:

```javascript
function DonorList() {
  const { data, isLoading, isError, error, refetch } = useDonors();

  if (isLoading) return <SkeletonTable rows={5} />;
  if (isError)   return <ErrorState message={error.message} onRetry={refetch} />;
  if (!data?.length) return <EmptyState
    icon={<UsersIcon />}
    title="No donors yet"
    description="Donors will appear here once they contribute."
  />;

  return <DonorTable donors={data} />;
}
```

### Optimistic Updates

```javascript
export function useToggleDonorStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, active }) => donorService.updateStatus(id, { active }),

    onMutate: async ({ id, active }) => {
      await queryClient.cancelQueries({ queryKey: donorKeys.detail(id) });
      const previous = queryClient.getQueryData(donorKeys.detail(id));
      queryClient.setQueryData(donorKeys.detail(id), (old) => ({
        ...old,
        active,
      }));
      return { previous };
    },

    onError: (err, vars, context) => {
      // Rollback
      queryClient.setQueryData(donorKeys.detail(vars.id), context.previous);
      toast.error('Failed to update status');
    },

    onSettled: (data, err, vars) => {
      queryClient.invalidateQueries({ queryKey: donorKeys.detail(vars.id) });
    },
  });
}
```

### Cache Invalidation Rules

| Event | Invalidate |
|-------|-----------|
| Create donor | `donorKeys.lists()` |
| Update donor | `donorKeys.detail(id)` + `donorKeys.lists()` |
| Delete donor | `donorKeys.lists()` + remove detail cache |
| Create event | `eventKeys.lists()` |
| Update event | `eventKeys.detail(id)` + `eventKeys.lists()` |

---

## Server State vs Client State — Decision Table

| Question | If Yes → | If No → |
|----------|---------|---------|
| Does this data come from the server? | TanStack Query | Zustand |
| Does it need to survive a page reload? | TanStack Query (cached) | Zustand (persisted) |
| Does it change without user action? | TanStack Query (refetch) | Zustand |
| Is it shared across many components? | Either | Local state (useState) |
| Is it UI-only (modal open, tab active)? | Zustand or useState | — |
| Do other users affect this data? | TanStack Query (invalidation) | Zustand |

## Best Practices

1. **Never duplicate server state in Zustand.** If you find yourself storing API data in Zustand, you made a wrong choice.
2. **Co-locate queries** — put `useDonors()` in the same file as the component that uses it, or in a dedicated `hooks/` folder.
3. **Derive computed state** using `useMemo` or selectors, never store it.
4. **Use stale-while-revalidate** — show stale data while refetching in the background.
5. **Configure global defaults** for retries, stale time, and GC time.
6. **Name query keys by domain** for easy invalidation.
7. **Reset stores on logout** to clear sensitive data.

## Anti-Patterns

| Anti-Pattern | Why It's Bad |
|-------------|-------------|
| Storing API response in Zustand | Duplicated state, no cache invalidation, no background refresh |
| TanStack Query for non-server state | Creates unnecessary network dependency |
| Single giant Zustand store | Tight coupling, poor performance on updates |
| `enabled: false` everywhere | Misuse; prefer `skipToken` or conditional logic |
| Not invalidating after mutation | Stale UI |
| Mutating query cache directly | Bypasses the invalidation system |
| Infinite query without `getNextPageParam` | Pagination never loads next page |

## Checklist

- [ ] Server data is fetched via TanStack Query, not Zustand
- [ ] Zustand stores are split by domain (auth, ui, theme)
- [ ] TanStack Query keys follow a consistent naming convention
- [ ] All queries handle loading, error, and empty states
- [ ] Stale time and GC time are configured (not using defaults blindly)
- [ ] Mutations invalidate the correct query keys on success
- [ ] No API data is stored in Zustand
- [ ] Optimistic updates have rollback logic
- [ ] Stores use `partialize` for persistence (not the entire state)
- [ ] Selectors use `shallow` when selecting multiple properties
