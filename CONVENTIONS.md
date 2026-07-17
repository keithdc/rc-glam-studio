# Coding Standards & AI Guardrails

Summary of project conventions for RC Glam Studio.

- **Cursor rules (auto-loaded every prompt):** [`.cursor/rules/rc-glam-studio-standards.mdc`](.cursor/rules/rc-glam-studio-standards.mdc)
- **Full reference:** [`.kiro/steering/coding-standards.md`](.kiro/steering/coding-standards.md)

## General Principles

- Write readable, maintainable, and reusable code.
- Prefer small, focused functions over large monolithic ones.
- DRY — extract shared logic into `shared/`.
- KISS — avoid over-engineering.
- Every file should have a single responsibility.

## Tech Stack

- React 18, TypeScript, Vite
- MUI for components/theme; Tailwind CSS for utilities
- Framer Motion + MagicUI components for animations
- react-router-dom for routing

This is a **frontend-only** site — no backend, database, or API.

## TypeScript Rules

- Strict mode is mandatory. Never use `any`.
- Always declare explicit return types on functions.
- Use `interface` for object shapes, `type` for unions/intersections.
- Use `import type { Foo } from "./foo"` for type-only imports.
- Prefer `unknown` over `any` when the type is truly unknown.

## Project Architecture

```
app/src/
├── App.tsx             ← Providers, theme, and routes
├── theme.ts            ← MUI theme (light + dark)
├── components/magicui/ ← Animated UI primitives
├── features/[feature]/
│   ├── components/
│   └── pages/
├── lib/utils.ts        ← Shared utilities (cn())
└── shared/
    ├── components/
    └── hooks/
```

## Feature Module Rules

1. Each feature is self-contained under `features/`.
2. Do not import from another feature's internals — use `shared/` or barrel exports.
3. Shared code used by 2+ features goes in `shared/`.
4. New features: components → page → route in `App.tsx`.
5. Static content lives within the feature, not scattered across modules.

## Naming Conventions

| Item            | Convention      | Example             |
| --------------- | --------------- | ------------------- |
| Files           | kebab-case      | `hero-section.tsx`  |
| Components      | PascalCase      | `HeroSection`       |
| Functions/hooks | camelCase       | `useColorMode`      |
| Constants       | SCREAMING_SNAKE | `MAX_GALLERY_ITEMS` |
| Feature folders | kebab-case      | `home`, `portfolio` |

## Routing

- Routes are defined in `App.tsx` with lazy-loaded page components.
- Wrap lazy routes in `<Suspense>` with a loading fallback.

## React Components

- Functional components only.
- Extract hooks when a component exceeds ~50 lines.
- Define prop interfaces above the component.
- Use MUI for structural UI; Tailwind via `cn()` for utilities; MagicUI for animations.

## Styling & Dark Mode

- Use MUI theme tokens, not hardcoded colors.
- CSS variables in `index.css` for custom UI: `var(--background)`, `var(--foreground)`, etc.
- Dark mode via `ColorModeProvider` toggling `.dark` on `<html>`.

## UI/UX

- Polished, intuitive interactions with proper loading and empty states.
- Responsive: desktop-first, graceful on tablet and mobile.
- Forms: clear labels, validation, disabled submit states.
- Hash-based section navigation (e.g. `/#contact`) must scroll correctly.

## Code Annotations

Every file starts with a JSDoc header (`@file`, `@feature` or `@shared`, `@dependencies`). Exported functions/components get a one-line JSDoc. Use `// TODO(author): description` format.

## Code Reuse

- Shared UI → `shared/components/`
- Shared hooks → `shared/hooks/`
- Utilities → `lib/`
- Animated primitives → `components/magicui/`

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build
npm run format    # Prettier format
```

Run from repo root or `app/` directory.
