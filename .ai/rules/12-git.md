# 12 — Git Rules

## Branch Naming Convention

```
{type}/{description}
```

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat/donor-management` |
| `fix` | Bug fix | `fix/donor-email-validation` |
| `chore` | Maintenance | `chore/update-dependencies` |
| `refactor` | Code restructure | `refactor/donor-service` |
| `docs` | Documentation | `docs/api-endpoints` |
| `style` | Formatting | `style/eslint-config` |
| `test` | Testing | `test/donor-service` |
| `perf` | Performance | `perf/query-optimization` |
| `ci` | CI/CD | `ci/github-actions` |

### Rules

- Use **kebab-case** — e.g., `feat/donor-management`, not `feat/DonorManagement` or `feat/donor_management`.
- Keep branch names **under 50 characters**.
- Reference the issue number if applicable: `feat/42-donor-export`.
- Delete branches after merging.

---

## Commit Message Convention (Conventional Commits)

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Release Note Section |
|------|---------------------|
| `feat` | Features |
| `fix` | Bug Fixes |
| `perf` | Performance Improvements |
| `refactor` | Code Refactoring (no functional change) |
| `test` | Tests |
| `docs` | Documentation |
| `style` | Code style (formatting, no logic change) |
| `chore` | Build, CI, dependencies |
| `ci` | CI/CD configuration |

### Scope

The scope is the module or area the commit affects:

```
feat(donors): add export to CSV functionality
fix(auth): handle expired refresh token gracefully
refactor(api): extract pagination middleware
test(events): add integration tests for event CRUD
```

### Description

- **Imperative mood**: "add", not "added" or "adds".
- **Lowercase**: `feat(donors): add export` not `feat(donors): Add export`.
- **No period** at the end.
- **Max 72 characters**.

### Body

- Use the body to explain **why** the change was made, not **what** (the diff shows what).
- Separate from the subject with a blank line.
- Wrap at 72 characters.

```
feat(donors): add CSV export endpoint

Exporting donor data is required for the annual audit report.
The endpoint supports date range filtering and returns a
streamed CSV file to handle large datasets.
```

### Footer

- Reference issues: `Closes #42` or `Refs #73`.
- Breaking changes: `BREAKING CHANGE: the /api/v1/donors response format has changed`.

### Examples

```
feat(donors): add pagination support

Closes #42
```

```
fix(auth): handle token expiry during refresh

The refresh token endpoint was returning 500 when the
refresh token itself had expired. Now returns 401
with a clear error message so the client can redirect
to login.

Fixes #87
```

```
chore(deps): upgrade express to 5.0

BREAKING CHANGE: error middleware signature changed from
(err, req, res, next) to (err, req, res, next, meta).
```

---

## PR Checklist

Before submitting a PR, verify:

### Code Quality
- [ ] Code follows `.ai/rules/*.md` guidelines
- [ ] No console.log / debugger statements
- [ ] No TODO / FIXME / HACK comments
- [ ] No commented-out code
- [ ] No magic numbers or strings (all in constants/enums)
- [ ] Functions < 40 lines, components < 200 lines, files < 300 lines

### Functionality
- [ ] Feature works as described in the requirements
- [ ] All edge cases are handled (null, empty, error, auth)
- [ ] Input validation is applied on both client and server
- [ ] Error states are handled in UI
- [ ] Empty states are handled in UI
- [ ] Loading states are handled in UI

### Testing
- [ ] Unit tests added/updated for all new code
- [ ] Integration tests added/updated for API endpoints
- [ ] All existing tests pass
- [ ] Manual testing performed for the changed areas

### Security
- [ ] No sensitive data exposed in API responses
- [ ] Authentication/authorization checks in place
- [ ] Input sanitisation applied
- [ ] No secrets or credentials in code

### Performance
- [ ] No N+1 queries
- [ ] Pagination on list endpoints
- [ ] Lazy loading for new route components
- [ ] Images optimised (WebP, lazy loading)

### Git Hygiene
- [ ] Branch is up to date with `main`
- [ ] Commits follow Conventional Commits format
- [ ] PR title follows Conventional Commits format
- [ ] PR description explains the problem and solution
- [ ] No merge commits in the branch (rebase instead)

---

## Code Review Flow

```
feature branch → PR → review → squash merge → main → staging → production
```

1. **Create feature branch** from `main`.
2. **Open PR** against `main`. Include a clear description of what and why.
3. **Request review** from at least one team member.
4. **Address feedback** by pushing additional commits.
5. **Squash merge** into `main` (squash to keep history clean).
6. **Delete the feature branch** after merge.

### PR Title Format

Same as commit message:

```
feat(donors): add CSV export endpoint
fix(auth): handle expired refresh token
```

### PR Description Template

```markdown
## Problem

[What problem does this PR solve?]

## Solution

[How does this PR solve it?]

## Changes

- [Change 1]
- [Change 2]
- [Change 3]

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manually tested

## Screenshots

[If applicable]

Closes #42
```

---

## Merge Strategy

- **Squash merge** for all feature branches — keeps `main` history linear and clean.
- **Rebase** feature branches onto `main` before opening a PR to avoid conflicts.
- **Never use `git merge`** on feature branches.
- **Never force push** to `main`, `staging`, or `production`.

```bash
# Before opening a PR
git checkout main
git pull
git checkout feature/my-feature
git rebase main
```

---

## Release Strategy

```
main ──── feat1 ──── feat2 ──── fix1 ──── tag v1.2.0
          ↑                          ↑
        development               production release
```

### Semantic Versioning

| Version | When | Example |
|---------|------|---------|
| **MAJOR** | Breaking change | `v2.0.0` |
| **MINOR** | New feature (backward compatible) | `v1.3.0` |
| **PATCH** | Bug fix (backward compatible) | `v1.2.1` |

### Release Process

1. All changes merged to `main` via PRs.
2. Create a release branch: `release/v1.2.0`.
3. Run final tests and QA on the release branch.
4. Tag the release: `git tag v1.2.0 && git push --tags`.
5. Deploy to production.
6. Merge release branch back to `main`.

### Git Tags

```bash
git tag -a v1.2.0 -m "v1.2.0 - Add donor CSV export"
git push origin v1.2.0
```

Tags follow semantic versioning: `v{major}.{minor}.{patch}`.

---

## Repository Hygiene

- Keep `.gitignore` up to date — never commit `node_modules`, `.env`, `dist/`, `.next/`, `*.log`.
- Use `.gitkeep` in empty directories to preserve them in git.
- Prefer `rebase` over `merge` for feature branches.
- Never commit generated files — they belong in CI artifacts or `.gitignore`.
- Write meaningful commit messages — "fix stuff" is not acceptable.

## Checklist

- [ ] Branch name follows `{type}/{description}` format
- [ ] Commits follow Conventional Commits format
- [ ] PR title follows Conventional Commits format
- [ ] PR has a clear description
- [ ] Branch is rebased onto `main`
- [ ] All checklist items are verified before requesting review
- [ ] Squash merge is used (never regular merge)
- [ ] Feature branch is deleted after merge
- [ ] Release tags follow semantic versioning
