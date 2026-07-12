# 08 — Code Style Rules

## Language Version

- **JavaScript**: ES2022+ (optional chaining, nullish coalescing, private fields, top-level await).
- **TypeScript**: Strict mode enabled. No `any` type.
- Use the latest stable ECMAScript features where they improve readability.

## Naming Conventions

| Artifact | Convention | Example | Counter-Example |
|----------|-----------|---------|-----------------|
| Variables | camelCase | `donorName` | `donor_name` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` | `maxRetryCount` |
| Functions | camelCase, verb | `getDonorById()` | `DonorById()` |
| Classes | PascalCase | `DonorService` | `donorService` |
| Interfaces | PascalCase, `I` prefix (optional) | `IDonor`, `DonorResponse` | `donor_interface` |
| Types | PascalCase | `DonorTier`, `SortOrder` | `donor_tier` |
| Enums | PascalCase | `Role.Admin` | `ROLE_ADMIN` |
| Boolean vars | `is`/`has`/`can` prefix | `isActive`, `hasPermission` | `active`, `permission` |
| React components | PascalCase | `DonorCard.tsx` | `donorCard.tsx` |
| Custom hooks | camelCase, `use` prefix | `useAuth()` | `authHook()` |
| Files | kebab-case | `donor-service.ts` | `donorService.ts` |
| Directories | kebab-case | `donor-management/` | `donorManagement/` |
| Database tables | snake_case | `donors` | `Donors` |
| Database columns | snake_case | `created_at` | `createdAt` |
| CSS classes | kebab-case | `.donor-card` | `.donorCard` |
| Environment vars | UPPER_SNAKE_CASE | `JWT_SECRET` | `jwtSecret` |

## Formatting

- **Indentation**: 2 spaces (no tabs).
- **Semicolons**: Required.
- **Quotes**: Single quotes for JavaScript/TypeScript. Double quotes for JSX attributes.
- **Trailing commas**: Always (cleaner diffs).
- **Line length**: 100 characters max.
- **Blank lines**: 1 between functions, 2 between sections.

```javascript
// ✅ GOOD — consistent formatting
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export function DonorList() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['donors', search],
    queryFn: () => getDonors({ search }),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="donor-list">
      {data?.map((donor) => (
        <DonorCard key={donor.id} donor={donor} />
      ))}
    </div>
  );
}
```

## Function Style

### Function Size

- Functions should be **under 40 lines**. If longer, extract sub-functions.
- Arrow functions for callbacks and hooks; `function` declarations for top-level exports.

```javascript
// ✅ GOOD — arrow for callback
items.map((item) => item.name);

// ✅ GOOD — function declaration for top-level
export async function getDonorById(id: string) { ... }
```

### Early Returns

```javascript
// ✅ GOOD — early return for edge cases
export async function getDonor(id?: string | null) {
  if (!id) return null;
  const donor = await donorRepo.findById(id);
  if (!donor) throw new NotFoundError('Donor not found');
  return toDonorResponse(donor);
}
```

### Pure Functions

- Prefer pure functions (same input always produces same output).
- Avoid side effects in utility functions. Side effects belong in services/hooks.

```javascript
// ✅ GOOD — pure
export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
  }).format(amount);
}
```

## Component Style

### Component Size

- **Max 200 lines** of JSX.
- If a component exceeds this, extract sub-components or custom hooks.

### Props

- Use TypeScript interfaces for props.
- Destructure props in the function signature.
- Use default values where appropriate.

```javascript
// ✅ GOOD
interface DonorCardProps {
  name: string;
  amount: number;
  onDonate?: () => void;
  className?: string;
}

export function DonorCard({
  name,
  amount,
  onDonate,
  className = '',
}: DonorCardProps) {
  return (
    <div className={`donor-card ${className}`}>
      <h3>{name}</h3>
      <p>₹{amount}</p>
      {onDonate && <button onClick={onDonate}>Donate</button>}
    </div>
  );
}
```

## Imports

### Order

1. Node built-ins (`fs`, `path`)
2. External packages (`react`, `express`, `zustand`)
3. Internal absolute imports (`@/components/`, `@/services/`)
4. Relative imports (`../components/`, `./utils/`)
5. CSS/asset imports (`./styles.css`, `./logo.svg`)

```javascript
// ✅ GOOD — ordered imports
import path from 'path';
import fs from 'fs/promises';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';

import { Button } from '@/components/ui/Button';
import { donorKeys } from '@/queries/donors';
import { formatCurrency } from '@/lib/format';

import type { IDonor } from '@/types/donor';

import './DonorList.css';
```

### Rules

- No unused imports.
- No barrel imports that pull in many modules — import directly from the file.
- Use `import type` for type-only imports to avoid bundler issues.

## Exports

- Use **named exports** for all modules (avoids naming issues with default exports).
- Only use `export default` for page components in React Router.

```javascript
// ✅ GOOD — named export
export function DonorCard() { ... }
export type { DonorCardProps } from './DonorCard';

// ❌ BAD — default export for non-page components
export default function DonorCard() { ... }
```

## Constants and Enums

```javascript
// ✅ GOOD — descriptive constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// ✅ GOOD — TypeScript enum
export enum DonorTier {
  Platinum = 'platinum',
  Gold = 'gold',
  Silver = 'silver',
  Bronze = 'bronze',
}

// ❌ BAD — magic values
if (pageSize > 100) throw new Error('Page size too large');
```

## Utilities

- Pure utility functions go in `lib/` (frontend) or `utils/` (backend).
- Each utility file has a single responsibility.
- Utility functions are always pure (no side effects, no network calls).

```javascript
// lib/format.ts
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncate(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}
```

## Comments

- Comments explain **why**, not **what**. The code shows what it does.
- Write self-documenting code with good naming first. Comments are a fallback.

```javascript
// ✅ GOOD — explains why
// Using Math.round to avoid floating-point display issues in INR
const displayAmount = Math.round(amount);

// ❌ BAD — states the obvious
// This function formats the donor's name
function formatName(name) { ... }

// ❌ BAD — commented-out code. Delete it.
// const oldCalculation = amount * 0.18;
```

## Common Anti-Patterns

| Anti-Pattern | Why It's Bad | Fix |
|-------------|-------------|-----|
| Deeply nested ternaries | Unreadable | Extract to variables or if/else |
| Magic numbers | Meaningless | Use named constants |
| Long parameter lists (>3) | Hard to read/call | Use an options object |
| Mutating function args | Side effects, bugs | Copy before mutating |
| Nested callbacks | Callback hell | Use async/await |
| `var` declarations | Function scoping issues | Use `const` / `let` |
| Implicit type coercion | Surprising results | Use strict equality `===` |
| Catch with empty block | Swallows errors | At minimum log the error |
| Large files (>300 lines) | Hard to navigate | Split into multiple files |
| Over-engineering | Increased complexity | Follow YAGNI / KISS |

## Checklist

- [ ] Code follows naming conventions table
- [ ] No magic numbers or strings (use constants/enums)
- [ ] Functions are under 40 lines
- [ ] Components are under 200 lines
- [ ] Files are under 300 lines
- [ ] Imports follow the defined order
- [ ] No unused imports
- [ ] Named exports used (not default exports except pages)
- [ ] No `any` types
- [ ] No commented-out code
- [ ] No console.log / debugger
- [ ] Props have TypeScript interfaces
- [ ] Pure functions where possible
- [ ] Early returns for edge cases
- [ ] No deeply nested ternaries
