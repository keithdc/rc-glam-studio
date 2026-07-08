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
├── features/           ← Feature modules (one per domain)
│   └── [feature]/
│       ├── components/ ← UI components specific to this feature
│       ├── pages/      ← Route-level page components
│       ├── services/   ← API calls for this feature
│       ├── models/     ← TypeScript interfaces/types
│       ├── hooks/      ← Custom React hooks for this feature
│       └── index.ts    ← Public exports (barrel file)
├── shared/             ← Cross-feature reusable code
│   ├── components/     ← Reusable UI components
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

## React Components

- Use functional components only.
- Extract logic into custom hooks when a component exceeds ~50 lines.
- Always define prop interfaces above the component.
- Keep components pure — side effects go in hooks or services.
- Use MUI components for all UI — avoid raw HTML when a MUI equivalent exists.

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

## Formatting & Linting

- Prettier handles formatting — do not manually format.
- ESLint with strict TypeScript rules is enforced.
- Run `npm run lint` in each workspace before considering code complete.
- Run `npm run format` from root to auto-format everything.
