# Coding Standards & AI Guardrails

This document is the **canonical** reference for how all code in RC Glam Studio should be written.

- **Cursor rules (auto-loaded every prompt):** `.cursor/rules/rc-glam-studio-standards.mdc`
- **Human summary:** `CONVENTIONS.md`
- **AI agent summary:** `CLAUDE.md`

## General Principles

- Write readable, maintainable, and reusable code.
- Prefer small, focused functions over large monolithic ones.
- DRY (Don't Repeat Yourself) — extract shared logic into `shared/`.
- KISS (Keep It Simple) — avoid over-engineering.
- Every file should have a single responsibility.

## Tech Stack

- **Framework:** React 18, TypeScript, Vite
- **UI:** MUI (Material UI) for components and theme; Tailwind CSS for utility classes
- **Animation:** Framer Motion; MagicUI-style components in `components/magicui/`
- **Routing:** react-router-dom
- **Formatting:** Prettier (when configured)

This is a **frontend-only** marketing/portfolio site. There is no backend, database, or API layer.

## TypeScript Rules

- **Strict mode is mandatory.** Never use `any` — define proper types/interfaces.
- Always declare explicit return types on functions.
- Use `interface` for object shapes, `type` for unions/intersections.
- Use `type` imports: `import type { Foo } from "./foo"`.
- No non-null assertions (`!`) unless absolutely necessary with a comment explaining why.
- Prefer `unknown` over `any` when the type is truly unknown.

## Project Architecture

All application code lives in `app/src/`.

```
app/src/
├── App.tsx             ← Root providers, theme, and route definitions
├── main.tsx            ← Entry point
├── theme.ts            ← MUI theme (light + dark)
├── index.css           ← Global styles and CSS variables
├── components/
│   └── magicui/        ← Animated UI primitives (blur-fade, shimmer-button, etc.)
├── features/           ← Feature modules (one per page/domain)
│   └── [feature]/
│       ├── components/ ← UI components specific to this feature
│       ├── pages/      ← Route-level page components
│       ├── models/     ← TypeScript interfaces/types (optional)
│       ├── hooks/      ← Custom React hooks for this feature (optional)
│       └── index.ts    ← Public exports (barrel file, optional)
├── lib/
│   └── utils.ts        ← Shared utilities (e.g. cn() for Tailwind class merging)
└── shared/             ← Cross-feature reusable code
    ├── components/     ← Reusable UI components (Logo, etc.)
    └── hooks/          ← Reusable React hooks (useColorMode, etc.)
```

## Feature Module Rules

1. Each feature is self-contained in its own folder under `features/`.
2. Features may expose a public API through an `index.ts` barrel file.
3. Features should NOT import directly from other features' internal files — only from their barrel or `shared/`.
4. Shared code used by 2+ features goes in `shared/`.
5. When creating a new feature, create: components → page → route entry in `App.tsx`.
6. Static content (copy, images, pricing) lives in feature components or dedicated data files within the feature — not scattered across unrelated modules.

## Naming Conventions

| Item            | Convention      | Example                |
| --------------- | --------------- | ---------------------- |
| Files           | kebab-case      | `hero-section.tsx`     |
| Components      | PascalCase      | `HeroSection`          |
| Functions/hooks | camelCase       | `useColorMode`         |
| Interfaces      | PascalCase      | `PricingTier`          |
| Constants       | SCREAMING_SNAKE | `MAX_GALLERY_ITEMS`    |
| Feature folders | kebab-case      | `home`, `portfolio`    |

## Routing

- Route definitions live in `App.tsx` alongside providers and theme setup.
- All page components must be lazy-loaded using `React.lazy()` with dynamic imports.
- Wrap lazy routes in `<Suspense>` with a loading fallback.
- When adding a new page, add the lazy import and `<Route>` entry in `App.tsx`.

## React Components

- Use functional components only.
- Extract logic into custom hooks when a component exceeds ~50 lines.
- Always define prop interfaces above the component.
- Keep components pure — side effects go in hooks.
- Use MUI components for structural UI — avoid raw HTML when a MUI equivalent exists.
- Use Tailwind utility classes via the `cn()` helper from `lib/utils.ts` for layout and spacing where appropriate.
- Prefer MagicUI components from `components/magicui/` for animated/decorative effects.

## Styling & Dark Mode

- Never hardcode colors like `grey.50`, `#f8fafc`, or `#dbeafe`. Use MUI theme tokens: `background.default`, `background.paper`, `action.hover`, `text.primary`, `text.secondary`, `divider`.
- For custom UI outside MUI, use CSS variables defined in `index.css`: `var(--background)`, `var(--foreground)`, `var(--border)`, etc.
- Dark mode is toggled via the `.dark` class on `<html>`, controlled by `ColorModeProvider` in `shared/hooks/use-color-mode.tsx`.
- Brand palette is defined in `theme.ts` (rose gold, burgundy, champagne, charcoal).

## UI/UX Fidelity

- Design for end users, not developers. Every interaction should feel polished and intuitive.
- Use proper loading states (skeletons or spinners) for async content.
- Provide empty states with helpful messaging — never show a blank area.
- Use consistent spacing, typography hierarchy, and color from the MUI theme.
- Forms must have clear labels, validation messages, and disabled states during submission.
- Keyboard navigable — focusable elements reachable via Tab; dialogs trap focus.
- Responsive: UI should work on desktop (primary) and degrade gracefully on tablet and mobile.
- Smooth scroll and hash-based section navigation should work when linking to page anchors (e.g. `/#contact`).

## Code Reuse

- If you write the same logic in 2 places, extract it immediately.
- Shared UI → `app/src/shared/components/`
- Shared hooks → `app/src/shared/hooks/`
- Shared types → create a model file in the relevant feature or `shared/`
- Utility functions → `app/src/lib/` — keep them pure (no side effects)
- Animated primitives → `app/src/components/magicui/`

## Code Annotations

AI-readable annotations help any AI (and developers) understand intent without reading entire files.

- **File headers:** Every file must start with a comment block describing its purpose, ownership (feature/shared), and key dependencies.
- **Function/component annotations:** Above each exported function or component, add a brief JSDoc comment explaining what it does.
- **Section markers:** In files with multiple logical sections, use `// --- Section Name ---` to delimit them.
- **TODO/FIXME format:** Use `// TODO(author): description` — never bare TODOs.
- **Avoid redundant comments:** Only comment **why**, not **what**.
- **Keep annotations concise:** Max 1–2 lines. If you need more, refactor the code.

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

## Unused Imports Cleanup

- **Always remove unused imports immediately.** No import should exist in a file unless it is actively used.
- Before saving or committing any file, verify all imports are referenced in the code.
- This applies to value imports, type imports, and side-effect imports.

## Formatting & Linting

- Prettier handles formatting — do not manually format.
- Run `npm run format` from `app/` to auto-format.
- When ESLint is configured, run `npm run lint` from `app/` before considering code complete.

## Testing

- When Vitest is configured, every feature should have tests using Vitest + React Testing Library.
- Test files: `[filename].test.tsx` next to the component or in a `__tests__/` folder.
- Test: hooks, utility functions, component behavior, and user interactions.
- Tests should be fast, isolated, and deterministic.

## TypeScript / ESLint Rules to Follow

Write code that avoids these violations from the start (apply when ESLint is configured):

### no-confusing-void-expression

- **Never** return a void expression from an arrow function shorthand.
- Bad: `onClick={() => setOpen(true)}`
- Good: `onClick={() => { setOpen(true); }}`

### no-deprecated (MUI)

- Never use deprecated MUI props. Always use the latest `slotProps` pattern.
- Bad: `<ListItemText primaryTypographyProps={{ variant: "body2" }} />`
- Good: `<ListItemText slotProps={{ primary: { variant: "body2" } }} />`

### restrict-template-expressions

- When embedding a `number` in a template literal, convert explicitly: `` `${String(value)}px` ``

### no-unused-vars

- Every declared variable, import, and function must be used. Remove dead code immediately.
- Prefix intentionally unused parameters with `_`.

### no-floating-promises

- Every `Promise` must be handled — `await`, return, or `.catch()`.

### consistent-type-imports

- Always use `import type` for type-only imports.

## Commands

From the repo root:

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run format    # Format source files with Prettier
```

Or from `app/` directly with the same script names.
