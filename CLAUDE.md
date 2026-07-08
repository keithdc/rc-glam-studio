# CLAUDE.md — Project Instructions for Claude

You are working on a CRM monorepo with a React frontend (`app/`) and Node.js + Express backend (`api/`). Follow these rules strictly when generating or modifying code.

## Tech Stack

- Frontend: React 18, TypeScript, Vite, MUI (Material UI), @magicui/highlighter
- Backend: Node.js, Express, TypeScript, PostgreSQL (pg)
- Monorepo: npm workspaces
- Linting: ESLint with strict-type-checked
- Formatting: Prettier

## TypeScript Rules

- Strict mode is mandatory. Never use `any` — define proper types/interfaces.
- Always declare explicit return types on functions.
- Use `interface` for object shapes, `type` for unions/intersections.
- Use `type` imports: `import type { Foo } from "./foo"`.
- No non-null assertions (`!`) unless absolutely necessary with a comment explaining why.
- Prefer `unknown` over `any` when the type is truly unknown.

## Project Architecture

### Frontend (`app/src/`)

```
features/[feature]/
├── components/   ← UI components specific to this feature
├── pages/        ← Route-level page components
├── services/     ← API calls for this feature
├── models/       ← TypeScript interfaces/types
├── hooks/        ← Custom React hooks for this feature
└── index.ts      ← Public exports (barrel file)

shared/
├── components/   ← Reusable UI components
├── hooks/        ← Reusable React hooks
├── services/     ← Shared services (api-client, auth, etc.)
└── utils/        ← Pure utility functions
```

### Backend (`api/src/`)

```
features/[feature]/
├── [feature].routes.ts   ← Express route definitions
├── [feature].service.ts  ← Business logic
├── [feature].model.ts    ← Type definitions
└── [feature].schema.ts   ← Validation schemas (optional)

shared/
└── middleware/   ← Reusable Express middleware
```

## Feature Module Rules

1. Each feature is self-contained in its own folder.
2. Features expose their public API through an `index.ts` barrel file.
3. Features should NOT import directly from other features' internal files — only from their `index.ts`.
4. Shared code used by 2+ features goes in `shared/`.
5. When creating a new feature, always create: models → services → components/routes → page.
6. **Every new page/feature MUST have a corresponding backend implementation.** Always create matching API routes, service logic, database table(s), and migration. No hardcoded/in-memory data — all data must be dynamic and persisted in PostgreSQL.
7. Database migrations are stored in `api/src/migrations/` as sequential SQL files (e.g., `001_create_workflow_statuses.sql`). On a fresh install, all migrations run in order to create the full schema.

## Naming Conventions

- Files: kebab-case (`contact-card.tsx`)
- Components: PascalCase (`ContactCard`)
- Functions/hooks: camelCase (`useContacts`)
- Interfaces: PascalCase (`Contact`)
- Constants: SCREAMING_SNAKE_CASE (`MAX_RETRIES`)
- Feature folders: kebab-case (`contacts`)
- Backend files: dot notation (`contacts.routes.ts`)

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

## Code Annotations

- Every file must start with a JSDoc comment block: `@file`, `@feature` or `@shared`, `@dependencies`.
- Every exported function/component gets a one-line JSDoc above it explaining what it does.
- Use `// --- Section Name ---` for logical sections within a file.
- TODOs: `// TODO(author): description`. Never bare TODOs.
- Only comment **why**, not **what**. No redundant comments.
- Keep annotations to 1–2 lines max. If you need more, refactor the code.

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

## Unused Imports Cleanup

- **Always remove unused imports immediately.** No import should exist in a file unless it is actively used.
- Before saving or committing any file, verify all imports are referenced in the code.
- This applies to value imports, type imports, and side-effect imports.
- Run `npm run lint` to catch any leftover unused imports — treat them as errors, not warnings.

## Commands

- `npm run dev:app` — Start frontend dev server (port 3000)
- `npm run dev:api` — Start backend dev server (port 5000)
- `npm run lint:app` — Lint frontend
- `npm run lint:api` — Lint backend
- `npm run format` — Format all files with Prettier

## Mock Data

- All mock/sample data lives in `app/src/features/[feature]/mocks/` — never inline in hooks or components.
- Mock files export constants: `MOCK_TASKS`, `MOCK_STATUSES`, `MOCK_USERS`, etc.
- Mock files are named `[resource].mock.ts`.

## Shared Components (Mandatory Usage)

- **UserAvatar** (`shared/components/UserAvatar.tsx`) — use for ALL user avatars. Derives color from initials deterministically. Never use raw `<Avatar>` with hardcoded bgcolor for users.
- **TiptapMentionEditor** (`shared/components/TiptapMentionEditor.tsx`) — use for ALL text inputs that need @mention support (Chat, Comments, Description). Renders mentions as inline chips.
- **getAvatarColor / getInitials** (`shared/utils/avatar-color.ts`) — use for color derivation. Same user always gets same color app-wide.

## Dark Mode

- Never hardcode colors like `grey.50`, `#f8fafc`, `#dbeafe`. Use MUI theme tokens: `background.default`, `background.paper`, `action.hover`, `text.primary`, `text.secondary`, `divider`.
- For mention chips and custom UI, use CSS variables: `var(--mention-bg)`, `var(--mention-color)`, `var(--background)`, `var(--foreground)`, `var(--border)`.
- The `.dark` class is toggled on `<html>` by App.tsx. Dark mode is controlled via ThemeModeContext.

## Search & Date UX Rules

- Search fields must always have a clear (×) button when populated.
- Date range "To" fields must never allow a date before the "From" value (use `min` constraint).
- End Date cannot be before Start Date in any picker.

## Settings ↔ Workflow Sync

- Workflow Statuses, Tags, Users, and Defaults are persisted to localStorage.
- Settings writes → Workflow reads from the same localStorage keys.
- Keys: `workflow-statuses`, `workflow-tags`, `crm-users`, `workflow-default-completed-filter`.

## Testing

- Every feature must have tests. Use Vitest + React Testing Library.
- Test files: `[filename].test.tsx` next to the component or in `__tests__/`.
- Test: hooks, utilities, component behavior, user interactions.
- Mock external deps (localStorage, API). Never test against real services.
- Tests must be fast, isolated, deterministic.
- Run: `npm run test` in each workspace.
