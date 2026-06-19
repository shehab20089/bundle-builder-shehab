<div align="center">

# Wyze Bundle Builder

Production-style React take-home implementation for a multi-step security
bundle builder.

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=061B25">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=061B25">
  <img alt="Zustand" src="https://img.shields.io/badge/State-Zustand-0B0D10">
  <img alt="Tests" src="https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest&logoColor=white">
</p>

<p>
  <strong>Data-driven products</strong> &middot;
  <strong>variant-specific quantities</strong> &middot;
  <strong>live review panel</strong> &middot;
  <strong>localStorage persistence</strong>
</p>

<p>
  <a href="https://bundle-builder-shehab.vercel.app/">
    <img alt="Open Live Demo" src="https://img.shields.io/badge/Open_Live_Demo-bundle--builder--shehab.vercel.app-4E2FD2?style=for-the-badge">
  </a>
</p>

</div>

---

## Table Of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Quick Start](#quick-start)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Feature Documentation](#feature-documentation)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Persistence](#persistence)
- [Design System](#design-system)
- [Testing](#testing)
- [Tradeoffs](#tradeoffs)
- [Submission Checklist](#submission-checklist)

## Overview

This project recreates the requested bundle-builder experience as a React +
TypeScript app. The main screen lets shoppers configure a Wyze security bundle
through a 4-step accordion while a live review panel keeps selected items,
variant quantities, totals, savings, shipping, and checkout state in sync.

> **Status:** Frontend prototype focused on UI fidelity, state behavior,
> persistence, and clean project structure. No backend or real checkout is
> required for this assignment.

## Live Demo

> **Open the deployed app:** [https://bundle-builder-shehab.vercel.app/](https://bundle-builder-shehab.vercel.app/)

## Quick Start

| Step | Command       | Notes                                           |
| ---: | ------------- | ----------------------------------------------- |
|    1 | `npm install` | Installs dependencies from the repository root. |
|    2 | `npm run dev` | Starts the Vite development server.             |
|    3 | Open Vite URL | Usually `http://localhost:5173`.                |

```bash
npm install
npm run dev
```

## Build And Preview

| Goal                     | Command           |
| ------------------------ | ----------------- |
| Create production build  | `npm run build`   |
| Preview production build | `npm run preview` |

```bash
npm run build
npm run preview
```

## Scripts

| Command                | Purpose                                                      |
| ---------------------- | ------------------------------------------------------------ |
| `npm run dev`          | Starts the local Vite dev server.                            |
| `npm run build`        | Runs TypeScript build checks and creates a production build. |
| `npm run preview`      | Serves the production build locally.                         |
| `npm run lint`         | Runs ESLint across the project.                              |
| `npm run test`         | Runs the Vitest test suite.                                  |
| `npm run format`       | Formats files with Prettier.                                 |
| `npm run format:check` | Checks formatting without writing files.                     |

## Tech Stack

| Layer   | Tooling                                                 |
| ------- | ------------------------------------------------------- |
| UI      | React 19, TypeScript                                    |
| Build   | Vite                                                    |
| Routing | React Router                                            |
| State   | Zustand                                                 |
| Styling | Tailwind CSS v4, shadcn UI primitives, Radix primitives |
| Assets  | SVGR for SVG React components, local image imports      |
| Quality | ESLint, Prettier, Vitest                                |

## Project Structure

The app is organized by shell-level app code first, then feature-owned code.

```txt
src
|-- main.tsx                    # React entrypoint
|-- index.css                   # Global styles, fonts, Tailwind tokens
|-- router
|   `-- index.tsx               # App-level route composition
|-- components
|   `-- ui                      # Shared shadcn/Radix UI primitives
`-- features
    `-- bundle-builder
        |-- apis                # Local JSON data and asset mapping
        |-- assets              # Feature images, icons, and visual assets
        |-- components          # Bundle-builder UI components
        |-- hooks               # Zustand store and feature hooks
        |-- routes              # Feature route definitions
        |-- types               # Domain TypeScript types
        `-- utils               # Selectors, formatters, persistence helpers
```

| Path                                     | Responsibility                                                          |
| ---------------------------------------- | ----------------------------------------------------------------------- |
| `src/main.tsx`                           | Mounts React and the router provider.                                   |
| `src/router/index.tsx`                   | Composes route arrays exported by features.                             |
| `src/components/ui`                      | Shared shadcn/Radix primitives.                                         |
| `src/features/bundle-builder/routes`     | Owns the route entry and exports `bundleBuilderRoutes`.                 |
| `src/features/bundle-builder/components` | Product cards, review panel, checkout dialog, steppers, and feature UI. |
| `src/features/bundle-builder/hooks`      | Zustand store and UI-facing feature hook.                               |
| `src/features/bundle-builder/apis`       | Product JSON and image-key resolution.                                  |
| `src/features/bundle-builder/types`      | Bundle builder domain types.                                            |
| `src/features/bundle-builder/utils`      | Selectors, formatting, selection helpers, and storage helpers.          |
| `src/features/bundle-builder/assets`     | Feature-specific images, fonts, and SVG icons.                          |

## Architecture

### Feature-First Boundary

The `bundle-builder` feature owns its route, data, state, UI, assets, and domain
types. This keeps feature behavior close to the code that renders it.

### Route Composition

The root router imports route arrays from features:

```ts
const routes = [...bundleBuilderRoutes];
```

This keeps the app router small and makes future feature routes easy to add.

### Responsibility Split

| Area              | Responsibility                                                            |
| ----------------- | ------------------------------------------------------------------------- |
| Route             | Page-level layout and accordion flow.                                     |
| Components        | Visual sections and reusable UI pieces.                                   |
| Store             | Mutations for selected variants, quantities, step navigation, and saving. |
| Selectors         | Derived review lines, totals, counts, and active quantities.              |
| Data module       | Converts JSON image keys into Vite asset imports.                         |
| Storage utilities | Versioned localStorage read/write and validation.                         |

## Feature Documentation

### Bundle Builder Route

The bundle builder is available at `/`.

Desktop layout:

| Column | Content                                           |
| ------ | ------------------------------------------------- |
| Left   | 4-step accordion builder.                         |
| Right  | Live review panel with configured bundle summary. |

Smaller screens stack into a responsive layout so the builder remains usable on
mobile widths.

### Builder Accordion

The builder walks through four steps:

1. Choose your cameras
2. Choose your plan
3. Choose your sensors
4. Add extra protection

Each step includes:

- `STEP X OF 4` label
- Step icon
- Step title
- Selected item count
- Expand/collapse behavior
- Next-step button where applicable

Step 1 opens by default unless a saved configuration restores another open step.

### Product Cards

Product cards are rendered from JSON data. They support:

| Capability     | Details                                                   |
| -------------- | --------------------------------------------------------- |
| Product media  | Local optimized image assets.                             |
| Discount badge | Optional product-level badge.                             |
| Product copy   | Title, description, and optional learn-more link.         |
| Variants       | Optional color/image selector.                            |
| Quantity       | Product-card stepper tied to active variant.              |
| Pricing        | Compare-at price, active price, and free products.        |
| Selected state | Border changes when total product quantity is above zero. |

### Variant Selection

Variant quantities are stored separately. If a shopper adds two white cameras,
then switches to black, the white quantity remains untouched and the black
variant has its own count.

The review panel renders every selected variant above zero as its own line.

### Quantity Steppers

Quantity steppers exist in two places:

- Product cards
- Review panel lines

Both surfaces write to the same Zustand store, so changing either one updates
the rest of the UI and recalculates totals.

### Review Panel

The review panel groups selected items by:

- Cameras
- Sensors
- Accessories
- Plan

It also includes:

| Section   | Behavior                                                      |
| --------- | ------------------------------------------------------------- |
| Item rows | Show selected items, variant labels, quantities, and pricing. |
| Plan      | Shows Cam Unlimited monthly pricing.                          |
| Shipping  | Shows fast shipping as free.                                  |
| Guarantee | Displays the satisfaction guarantee badge.                    |
| Totals    | Shows compare-at total, active total, and savings.            |
| Save      | Persists the current system to localStorage.                  |
| Checkout  | Opens a prototype confirmation dialog.                        |

### Checkout Dialog

Checkout is intentionally a frontend-only placeholder. Clicking checkout opens a
confirmation dialog with:

- Configured total
- Compare-at total
- Bundle savings
- A note that no payment was processed

## Data Flow

Product and fulfillment data starts in JSON:

```txt
src/features/bundle-builder/apis/bundle-builder-data.json
```

The TypeScript adapter maps `imageKey` values to local image imports:

```txt
src/features/bundle-builder/apis/bundle-builder-data.ts
```

High-level flow:

```txt
JSON data
  -> asset mapping
  -> typed products and steps
  -> Zustand selection state
  -> selectors
  -> builder UI and review panel
```

## State Management

Bundle state lives in:

```txt
src/features/bundle-builder/hooks/use-bundle-builder-store.ts
```

The store owns:

- Active accordion step
- Product selections
- Active variant per product
- Quantities per product variant
- Step navigation
- Save-current-configuration action

Derived data lives in:

```txt
src/features/bundle-builder/utils/bundle-builder-selectors.ts
```

Selectors calculate:

- Selected review line items
- Subtotal
- Compare-at total
- Active variant
- Active quantity
- Product total quantity
- Per-step selected count

This keeps calculation logic testable and keeps React components focused on UI.

## Persistence

The "Save my system for later" action writes a versioned configuration to
`localStorage`.

Saved data includes:

- Storage version
- Open accordion step
- Product selections
- Variant quantities

Storage helpers live in:

```txt
src/features/bundle-builder/utils/storage.ts
```

Saved systems restore on reload or return visit.

## Design System

Global styling lives in:

```txt
src/index.css
```

It contains:

- Gilroy font-face declarations
- Tailwind v4 theme tokens
- Bundle-specific colors
- Bundle-specific shadows
- Checkout checkmark animations
- Base global styles

Core bundle tokens:

| Token                | Purpose                                   |
| -------------------- | ----------------------------------------- |
| `bundle-panel`       | Light blue panel backgrounds.             |
| `bundle-brand`       | Primary purple action and emphasis color. |
| `bundle-brand-hover` | Primary button hover color.               |
| `bundle-divider`     | Review and section separators.            |
| `bundle-success`     | Savings and success state.                |
| `bundle-muted`       | Secondary text.                           |
| `bundle-obsidian`    | Primary dark text.                        |

## Component Organization

Key bundle-builder components:

| Component                    | Role                                         |
| ---------------------------- | -------------------------------------------- |
| `CheckoutSuccessDialog.tsx`  | Checkout confirmation modal.                 |
| `ProductCard.tsx`            | Product card shell.                          |
| `ProductPrice.tsx`           | Product pricing display.                     |
| `ProductVariantSelector.tsx` | Variant chip selector.                       |
| `ProductVisual.tsx`          | Product image/fallback visual renderer.      |
| `QuantityStepper.tsx`        | Shared increment/decrement control.          |
| `ReviewPanel.tsx`            | Review panel coordinator.                    |
| `ReviewItemsSection.tsx`     | Camera/sensor/accessory review groups.       |
| `ReviewLine.tsx`             | Individual selected review item.             |
| `ReviewPlanSection.tsx`      | Plan and fulfillment rows.                   |
| `ReviewPanelActions.tsx`     | Totals, savings, checkout, and save actions. |

Main route files:

| File                            | Role                                     |
| ------------------------------- | ---------------------------------------- |
| `routes/BundleBuilderRoute.tsx` | Page-level layout and builder accordion. |
| `routes/index.ts`               | Exports `bundleBuilderRoutes`.           |

## Testing

Tests are written with Vitest.

Current coverage focuses on state behavior:

- Variant quantities are tracked separately
- Explicit configurations save and reload
- Zustand store configuration can be saved on demand

Run tests:

```bash
npm run test
```

## Accessibility Notes

- Product and review steppers use accessible labels.
- Variant buttons expose selected state with `aria-pressed`.
- The builder accordion uses Radix/shadcn primitives.
- The checkout modal uses accessible dialog primitives with title and
  description.

## Tradeoffs

- No backend was added. Local JSON is allowed by the assignment and keeps the
  implementation focused on UI behavior.
- Checkout is a prototype confirmation only. The assignment focuses on builder
  and review interactions, not payment processing.
- Product image assets are bundled locally so the app does not depend on remote
  image requests.

## Submission Checklist

Before submitting, run:

```bash
npm install
npm run lint
npm run test
npm run build
```

Then run the app and verify:

- First accordion step opens by default
- Product quantities update correctly
- Variant quantities stay separate
- Review panel updates live
- Totals recalculate as quantities change
- "Save my system for later" restores after reload
- Checkout opens the confirmation dialog
- Layout remains usable on smaller screens
