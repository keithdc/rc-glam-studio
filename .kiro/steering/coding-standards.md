# Coding Standards & AI Guardrails

This document governs how all code in this monorepo should be written. Follow these rules strictly.

## General Principles

- Write readable, maintainable, and reusable code.
- Prefer small, focused functions over large monolithic ones.
- DRY (Don't Repeat Yourself) — extract shared logic into `shared/` folders.
- KISS (Keep It Simple) — avoid over-engineering.
- Every file should have a single responsibility.

## TypeScript Rules

- **Strict mode is mandatory.** Never use `any` — define proper types/interfaces.
- Always declare explicit return types on functions.
- Use `interface` for object shapes, `type` for unions/intersections.
- Use `type` imports: `import type { Foo } from "./foo"`.
- No non-null assertions (`!`) unless absolutely necessary with a comment explaining why.
- Prefer `unknown` over `any` when the type is truly unknown.

## Project Architecture

### Frontend (`app/`)

```
app/src/
├── routes.tsx          ← All route definitions (lazy-loaded)
├── features/           ← Feature modules (one per domain)
│   └── [feature]/
│       ├── components/ ← UI components specific to this feature
│       ├── pages/      ← Route-level page components
│       ├── services/   ← API calls for this feature
│       ├── models/     ← TypeScript interfaces/types
│       ├── hooks/      ← Custom React hooks for this feature
│       └── index.ts    ← Public exports (barrel file)
├── shared/             ← Cross-feature reusable code
│   ├── components/     ← Reusable UI components (Layout, Sidebar)
│   ├── hooks/          ← Reusable React hooks
│   ├── services/       ← Shared services (api-client, auth, etc.)
│   └── utils/          ← Pure utility functions
└── theme.ts            ← MUI theme configuration
```

### Backend (`api/`)

```
api/src/
├── features/           ← Feature modules (one per domain)
│   └── [feature]/
│       ├── [feature].routes.ts   ← Express route definitions
│       ├── [feature].service.ts  ← Business logic
│       ├── [feature].model.ts    ← Type definitions
│       └── [feature].schema.ts   ← Validation schemas (optional)
├── shared/
│   └── middleware/     ← Reusable Express middleware
├── db.ts               ← Database connection pool
└── index.ts            ← Server entry point
```

## Feature Module Rules

1. Each feature is self-contained in its own folder.
2. Features expose their public API through an `index.ts` barrel file.
3. Features should NOT import directly from other features' internal files — only from their `index.ts`.
4. Shared code used by 2+ features goes in `shared/`.
5. When creating a new feature, always create: models → services → components/routes → page.
6. **Every new page/feature MUST have a corresponding backend implementation.** When adding a frontend page, always create the matching API routes, service logic, database table(s), and migration. No page should rely on hardcoded/in-memory data — all data must be dynamic and persisted in PostgreSQL.
7. Database migrations are stored in `api/src/migrations/` as sequential SQL files (e.g., `001_create_workflow_statuses.sql`). On a fresh install, all migrations run in order to create the full schema.

## Naming Conventions

| Item            | Convention      | Example              |
| --------------- | --------------- | -------------------- |
| Files           | kebab-case      | `contact-card.tsx`   |
| Components      | PascalCase      | `ContactCard`        |
| Functions/hooks | camelCase       | `useContacts`        |
| Interfaces      | PascalCase      | `Contact`            |
| Constants       | SCREAMING_SNAKE | `MAX_RETRIES`        |
| Feature folders | kebab-case      | `contacts`           |
| Backend files   | dot notation    | `contacts.routes.ts` |

## Routing

- All route definitions live in `app/src/routes.tsx` — NOT in `App.tsx`.
- `App.tsx` only handles providers (Theme, Router, Suspense) and renders routes.
- All page components must be lazy-loaded using `React.lazy()` with dynamic imports.
- Use `useRoutes()` hook with a `RouteObject[]` array for route config.
- When adding a new page, add the lazy import and route entry in `routes.tsx` only.

## React Components

- Use functional components only.
- Extract logic into custom hooks when a component exceeds ~50 lines.
- Always define prop interfaces above the component.
- Keep components pure — side effects go in hooks or services.
- Use MUI components for all UI — avoid raw HTML when a MUI equivalent exists.

## UI/UX Fidelity

- Design for end users, not developers. Every interaction should feel polished and intuitive.
- List/card items should be clickable and open a detail view (dialog or page) showing all relevant fields.
- Use proper loading states (skeletons or spinners) for async data.
- Provide empty states with helpful messaging — never show a blank area.
- Use consistent spacing, typography hierarchy, and color usage from the MUI theme.
- Forms must have clear labels, validation messages, and disabled states during submission.
- Destructive actions (delete) require a confirmation dialog.
- Toast/snackbar notifications for success and error feedback on mutations.
- Keyboard navigable — dialogs trap focus, buttons are reachable via Tab.
- Responsive: UI should work on desktop (primary) and degrade gracefully on tablet.
- **Search fields must always have a clear (×) button** that appears when the field has a value.
- **Date range "To" fields must never allow a date before the "From" value.** Use `min` constraints on the input. Same for End Date vs Start Date pickers — End Date cannot be before Start Date.

## API/Backend

- Route handlers should be thin — delegate to service functions.
- Always validate request input before processing.
- Use parameterized queries for all database calls (prevent SQL injection).
- Return consistent error response shapes: `{ status: "error", message: string }`.
- Group routes by feature, not by HTTP method.

## Code Reuse

- If you write the same logic in 2 places, extract it immediately.
- Shared UI → `app/src/shared/components/`
- Shared API logic → `app/src/shared/services/`
- Shared types → create a model file in the relevant feature or shared folder.
- Utility functions → `shared/utils/` — keep them pure (no side effects).

## Mock Data

- All mock/sample data lives in `app/src/features/[feature]/mocks/` — never inline in hooks or components.
- Mock files export constants: `MOCK_TASKS`, `MOCK_STATUSES`, `MOCK_USERS`, etc.
- Hooks import from the mock folder and will be swapped for API calls later.
- Mock files are named `[resource].mock.ts` (e.g., `tasks.mock.ts`, `statuses.mock.ts`).

## Code Annotations

AI-readable annotations help any AI (and developers) understand intent, constraints, and relationships without reading entire files. Follow these rules for all code:

- **File headers:** Every file must start with a comment block describing its purpose, ownership (feature/shared), and key dependencies.
- **Function/component annotations:** Above each exported function or component, add a brief JSDoc comment explaining what it does, its params, and return value.
- **Section markers:** In files with multiple logical sections, use `// --- Section Name ---` to delimit them.
- **TODO/FIXME format:** Use `// TODO(author): description` or `// FIXME(author): description` — never bare TODOs.
- **Avoid redundant comments:** Do NOT comment what code already says (`// increment i` above `i++`). Only comment **why**, not **what**.
- **Interface/model annotations:** Add a one-line JSDoc above each interface field only when the name is not self-explanatory.
- **Keep annotations concise:** Max 1–2 lines. If you need more, the code itself needs refactoring.

### Annotation Templates

**File header:**

```ts
/**
 * @file [filename] — [brief purpose]
 * @feature [feature-name] | @shared
 * @dependencies [key imports if non-obvious]
 */
```

**Component:**

```tsx
/** Renders [what] with [key behavior]. */
```

**Hook:**

```ts
/** Manages [state/logic] for [feature]. Returns [key items]. */
```

**Service function:**

```ts
/** Fetches/creates/updates [resource]. Throws on network error. */
```

## Formatting & Linting

- Prettier handles formatting — do not manually format.
- ESLint with strict TypeScript rules is enforced.
- Run `npm run lint` in each workspace before considering code complete.
- Run `npm run format` from root to auto-format everything.

## Testing

- Every feature must have tests. Use **Vitest** for unit/integration tests and **React Testing Library** for component tests.
- Test files live next to the component: `ComponentName.test.tsx` or in a `__tests__/` folder within the feature.
- Test file naming: `[filename].test.ts` or `[filename].test.tsx`.
- Write tests for: hooks, utility functions, component behavior, and user interactions.
- Mock external dependencies (localStorage, API calls) — never test against real services.
- Run tests with `npm run test` in each workspace.
- Tests should be fast, isolated, and deterministic — no reliance on order or timing.

## ESLint / @typescript-eslint Rules to Follow

These rules are enforced by our ESLint config. Write code that avoids these violations from the start.

### no-confusing-void-expression

- **Never** return a void expression from an arrow function shorthand.
- If the function body calls a void-returning function (e.g., `setState`), wrap it in braces.
- Bad: `onClick={() => setOpen(true)}`
- Good: `onClick={() => { setOpen(true); }}`

### no-unsafe-member-access / no-unsafe-assignment

- Never access properties on a value whose type cannot be resolved or is `any`/`error`.
- When accessing optional fields inside JSX conditionals (`{obj.field != null && ...}`), extract the optional field into a local `const` first so TypeScript can narrow the type properly.
- Bad: `{msg.attachment != null && <span>{msg.attachment.fileName}</span>}`
- Good:
  ```tsx
  const attachment = msg.attachment;
  // ...
  {
    attachment != null && <span>{attachment.fileName}</span>;
  }
  ```

### no-deprecated

- Never use deprecated MUI props or APIs. Always use the latest `slotProps` pattern.
- Bad: `<ListItemText primaryTypographyProps={{ variant: "body2" }} />`
- Good: `<ListItemText slotProps={{ primary: { variant: "body2" } }} />`
- Same applies to `secondaryTypographyProps` → `slotProps.secondary`, `inputProps` → `slotProps.input`, etc.
- When in doubt, check the MUI component's type definition for deprecated markers.

### restrict-template-expressions

- Only `string` values are allowed inside template literals by default.
- When embedding a `number` in a template literal, convert it explicitly with `String(value)` or `.toString()`.
- Bad: `` `${diffMins}m` ``
- Good: `` `${String(diffMins)}m` ``

### no-unused-vars

- Every declared variable, import, and function must be used. Remove dead code immediately.
- If a function parameter is intentionally unused (e.g., required by a callback signature), prefix it with `_`.

### no-floating-promises

- Every `Promise` must be handled — either `await` it, return it, or explicitly call `.catch()`.
- Never fire-and-forget async calls.

### consistent-type-imports

- Always use `import type` for type-only imports.
- Bad: `import { Foo } from "./foo"` (when `Foo` is only used as a type)
- Good: `import type { Foo } from "./foo"`

### Unused Imports Cleanup

- **Always remove unused imports immediately.** No import should exist in a file unless it is actively used.
- Before saving or committing any file, verify all imports are referenced in the code.
- This applies to value imports, type imports, and side-effect imports.
- Run `npm run lint` to catch any leftover unused imports — treat them as errors, not warnings.
