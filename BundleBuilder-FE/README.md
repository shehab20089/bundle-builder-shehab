# Wyze Bundle Builder

A React + TypeScript implementation of the frontend take-home bundle builder.
The app is organized feature-first around the `bundle-builder` feature and uses
React Router, Tailwind CSS, shadcn UI primitives, SVGR icons, and Zustand state.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Useful Scripts

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run format:check
npm run preview
```

## Project Structure

```txt
src/
  router/
    index.tsx
  features/
    bundle-builder/
      apis/
      assets/
      components/
      hooks/
      routes/
      types/
      utils/
```

The app router composes feature routes from
`src/features/bundle-builder/routes`, so future features can expose their own
route arrays and be spread into the app router.

## Implementation Notes

- Product and review UI is data-driven from `bundle-builder-data.ts`.
- Quantity and variant selection state lives in Zustand.
- The "Save my system for later" action writes the current configuration to
  `localStorage`; saved configurations are restored on the next visit.
- Bundle colors, shadows, and fonts are centralized in `src/index.css` as
  Tailwind v4 design tokens.
- Feature images and icons live under
  `src/features/bundle-builder/assets` to keep the bundle-builder boundary
  self-contained.

## Tradeoffs

- No backend was added; the take-home allows local JSON/data, and keeping data
  local keeps the implementation focused on the requested UI behavior.
- No dedicated test framework is configured yet. Current verification is
  TypeScript build, ESLint, Prettier, and manual browser smoke checks.
