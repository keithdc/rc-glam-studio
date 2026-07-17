# CLAUDE.md — Project Instructions for Claude

You are working on **RC Glam Studio**, a frontend-only React marketing/portfolio site for a beauty studio. All code lives in `app/`. Follow these rules strictly when generating or modifying code.

**Cursor auto-loads:** [`.cursor/rules/rc-glam-studio-standards.mdc`](.cursor/rules/rc-glam-studio-standards.mdc) (`alwaysApply: true` — injected on every prompt).

**Full reference:** [`.kiro/steering/coding-standards.md`](.kiro/steering/coding-standards.md). This file is an aligned summary for AI agents.

## Tech Stack

- Frontend: React 18, TypeScript, Vite
- UI: MUI (Material UI) + Tailwind CSS
- Animation: Framer Motion, MagicUI components (`components/magicui/`)
- Routing: react-router-dom
- Formatting: Prettier

There is **no backend**. Do not create API routes, database migrations, or server code.

## TypeScript Rules

- Strict mode is mandatory. Never use `any` — define proper types/interfaces.
- Always declare explicit return types on functions.
- Use `interface` for object shapes, `type` for unions/intersections.
- Use `type` imports: `import type { Foo } from "./foo"`.
- No non-null assertions (`!`) unless absolutely necessary with a comment explaining why.
- Prefer `unknown` over `any` when the type is truly unknown.

## Project Architecture

```
app/src/
├── App.tsx             ← Root providers, theme, and route definitions
├── theme.ts            ← MUI theme (light + dark)
├── components/magicui/ ← Animated UI primitives
├── features/[feature]/
│   ├── components/     ← Feature-specific UI
│   └── pages/          ← Route-level pages
├── lib/utils.ts        ← Shared utilities (cn())
└── shared/
    ├── components/     ← Reusable UI (Logo, etc.)
    └── hooks/          ← Reusable hooks (useColorMode, etc.)
```

## Feature Module Rules

1. Each feature is self-contained in its own folder.
2. Features should NOT import directly from other features' internal files — use `shared/` or barrel exports.
3. Shared code used by 2+ features goes in `shared/`.
4. When creating a new feature: components → page → route entry in `App.tsx`.
5. Static content lives within the feature — no backend persistence.

## Naming Conventions

- Files: kebab-case (`hero-section.tsx`)
- Components: PascalCase (`HeroSection`)
- Functions/hooks: camelCase (`useColorMode`)
- Interfaces: PascalCase (`PricingTier`)
- Constants: SCREAMING_SNAKE_CASE (`MAX_GALLERY_ITEMS`)
- Feature folders: kebab-case (`home`, `portfolio`)

## Routing

- Route definitions live in `App.tsx` — NOT in a separate file unless extracted deliberately.
- `App.tsx` handles providers (Theme, Router, Suspense) and renders routes.
- All page components must be lazy-loaded using `React.lazy()` with dynamic imports.
- When adding a new page, add the lazy import and `<Route>` entry in `App.tsx`.

## React Components

- Use functional components only.
- Extract logic into custom hooks when a component exceeds ~50 lines.
- Always define prop interfaces above the component.
- Keep components pure — side effects go in hooks.
- Use MUI components for structural UI — avoid raw HTML when a MUI equivalent exists.
- Use Tailwind via `cn()` from `lib/utils.ts` for utility styling.
- Use MagicUI components from `components/magicui/` for animated effects.

## Code Annotations

- Every file must start with a JSDoc comment block: `@file`, `@feature` or `@shared`, `@dependencies`.
- Every exported function/component gets a one-line JSDoc above it explaining what it does.
- Use `// --- Section Name ---` for logical sections within a file.
- TODOs: `// TODO(author): description`. Never bare TODOs.
- Only comment **why**, not **what**. No redundant comments.
- Keep annotations to 1–2 lines max. If you need more, refactor the code.

## UI/UX Fidelity

- Design for end users, not developers. Every interaction should feel polished and intuitive.
- Use proper loading states (skeletons or spinners) for async content.
- Provide empty states with helpful messaging — never show a blank area.
- Use consistent spacing, typography hierarchy, and color usage from the MUI theme.
- Forms must have clear labels, validation messages, and disabled states during submission.
- Keyboard navigable — focusable elements reachable via Tab.
- Responsive: desktop (primary), graceful on tablet and mobile.
- Hash-based section links (e.g. `/#contact`) must scroll to the correct section.

## Styling & Dark Mode

- Never hardcode colors like `grey.50`, `#f8fafc`, `#dbeafe`. Use MUI theme tokens: `background.default`, `background.paper`, `action.hover`, `text.primary`, `text.secondary`, `divider`.
- For custom UI, use CSS variables: `var(--background)`, `var(--foreground)`, `var(--border)`.
- The `.dark` class is toggled on `<html>` by `ColorModeProvider`. Dark mode is controlled via `useColorMode`.

## Code Reuse

- If you write the same logic in 2 places, extract it immediately.
- Shared UI → `app/src/shared/components/`
- Shared hooks → `app/src/shared/hooks/`
- Shared types → model file in the relevant feature or `shared/`
- Utility functions → `app/src/lib/` — keep them pure (no side effects)
- Animated primitives → `app/src/components/magicui/`

## Unused Imports Cleanup

- **Always remove unused imports immediately.** No import should exist in a file unless it is actively used.
- Before saving or committing any file, verify all imports are referenced in the code.
- This applies to value imports, type imports, and side-effect imports.

## Commands

From repo root or `app/`:

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run format` — Format source files with Prettier

## Testing

- When Vitest is configured, use Vitest + React Testing Library.
- Test files: `[filename].test.tsx` next to the component or in `__tests__/`.
- Test: hooks, utilities, component behavior, user interactions.
- Tests must be fast, isolated, deterministic.
