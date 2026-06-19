# Wyze Bundle Builder

A React + TypeScript implementation of the frontend take-home bundle builder.
The app recreates a multi-step security bundle builder with product selection,
variant-specific quantities, a live review panel, local persistence, and a
checkout confirmation placeholder.

The project is runnable from the repository root.

## Quick Start

Prerequisites:

- Node.js 20+ recommended.
- npm, which is included with Node.js.

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Open the local URL printed by Vite. It is usually:

```txt
http://localhost:5173
```

## Build And Preview

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Quality Commands

Run linting:

```bash
npm run lint
```

Run tests:

```bash
npm run test
```

Check formatting:

```bash
npm run format:check
```

Format files:

```bash
npm run format
```

## Available Scripts

| Command                | Purpose                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Starts the Vite development server.                               |
| `npm run build`        | Runs TypeScript build checks and creates a production Vite build. |
| `npm run preview`      | Serves the production build locally.                              |
| `npm run lint`         | Runs ESLint across the project.                                   |
| `npm run test`         | Runs the Vitest test suite.                                       |
| `npm run format`       | Formats files with Prettier.                                      |
| `npm run format:check` | Checks formatting without changing files.                         |

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Tailwind CSS v4
- shadcn UI primitives
- Radix UI primitives
- SVGR for SVG icons as React components
- Vitest
- ESLint
- Prettier

## Project Structure

```txt
src/
  main.tsx
  index.css
  router/
    index.tsx
  components/
    ui/
  features/
    bundle-builder/
      apis/
        bundle-builder-data.json
        bundle-builder-data.ts
      assets/
        fonts/
        icons/
        images/
      components/
      hooks/
      routes/
      types/
      utils/
```

## Architecture

The app uses a feature-first structure. The `bundle-builder` feature owns its
routes, UI components, hooks, data access, domain types, utilities, and visual
assets. This keeps feature-specific code together and avoids scattering bundle
builder logic across generic app-level folders.

The app-level router lives in `src/router/index.tsx` and composes feature routes:

```ts
const routes = [...bundleBuilderRoutes];
```

This makes it easy to add future features without rewriting the app router. A
new feature can expose its own route array and be spread into the root router.

## Feature: Bundle Builder

The bundle builder is available at `/`.

It contains a two-column desktop layout:

- Left side: multi-step accordion builder.
- Right side: live review panel.

On smaller screens, the layout becomes responsive so the builder and review
content remain usable.

### Builder Accordion

The builder is a 4-step accordion:

1. Choose your cameras
2. Choose your plan
3. Choose your sensors
4. Add extra protection

Each step displays:

- A `STEP X OF 4` label.
- A step icon.
- The step title.
- A selected count.
- Expand/collapse behavior.
- A next-step button where applicable.

Step 1 is open by default unless a saved configuration restores a different
open step.

### Product Cards

Product cards are rendered from JSON data instead of hardcoded per-product JSX.
Cards support:

- Product image.
- Optional discount badge.
- Product title.
- Product description.
- Optional learn-more link.
- Optional variant selector.
- Quantity stepper.
- Active/selected card styling.
- Compare-at price and active price.
- Free products.

### Variant Selection

Products with variants track quantities separately per variant. For example,
adding 2 white cameras and then switching to black keeps the white quantity
intact while the black quantity starts from its own count.

The review panel shows every selected variant with a quantity above zero as its
own line item.

### Quantity Steppers

Quantity steppers appear in product cards and review-panel lines. They are kept
in sync through shared Zustand state. Updating a quantity in one place updates
the other place and recalculates totals.

### Review Panel

The review panel summarizes the configured system. It groups selected items by:

- Cameras
- Sensors
- Accessories
- Plan

The review panel includes:

- Selected item rows.
- Review quantity steppers.
- Compare-at pricing.
- Active pricing.
- Plan row.
- Shipping row.
- Satisfaction guarantee badge.
- Financing label.
- Total.
- Savings message.
- Checkout button.
- Save-for-later action.

### Checkout Dialog

Checkout is intentionally a prototype placeholder. Clicking checkout opens a
confirmation dialog showing the configured total and bundle savings. No payment
is processed.

## Data Flow

Product and fulfillment data lives in:

```txt
src/features/bundle-builder/apis/bundle-builder-data.json
```

The adjacent TypeScript module maps JSON `imageKey` values to Vite-imported
image assets:

```txt
src/features/bundle-builder/apis/bundle-builder-data.ts
```

This keeps product rendering data-driven while still letting Vite optimize image
imports.

## State Management

Bundle state is managed with Zustand in:

```txt
src/features/bundle-builder/hooks/use-bundle-builder-store.ts
```

The store owns:

- Active accordion step.
- Product selections.
- Active variant per product.
- Quantities per product variant.
- Step navigation.
- Save-current-configuration action.

Derived data is separated into selectors in:

```txt
src/features/bundle-builder/utils/bundle-builder-selectors.ts
```

Those selectors calculate:

- Selected review line items.
- Subtotal.
- Compare-at total.
- Active variant.
- Active quantity.
- Product total quantity.
- Per-step selected count.

This keeps the React hook focused on wiring state to the UI instead of owning
all calculation logic.

## Persistence

The "Save my system for later" action writes the current bundle configuration
to `localStorage`.

Saved data includes:

- Storage version.
- Open accordion step.
- Product selections.
- Variant quantities.

On the next visit or page reload, the saved configuration is restored.

Storage helpers and runtime guards live in:

```txt
src/features/bundle-builder/utils/storage.ts
```

## Design System

Global styling lives in:

```txt
src/index.css
```

It contains:

- Gilroy font-face declarations.
- Tailwind v4 theme tokens.
- Bundle-specific colors.
- Bundle-specific shadows.
- Checkout checkmark animations.
- Base global styles.

The UI uses project-level design tokens such as:

- `bundle-panel`
- `bundle-brand`
- `bundle-brand-hover`
- `bundle-divider`
- `bundle-success`
- `bundle-muted`
- `bundle-obsidian`

This avoids scattering raw hex values throughout components.

## Component Organization

The bundle-builder components are split by responsibility:

```txt
components/
  CheckoutSuccessDialog.tsx
  ProductCard.tsx
  ProductPrice.tsx
  ProductVariantSelector.tsx
  ProductVisual.tsx
  QuantityStepper.tsx
  ReviewItemsSection.tsx
  ReviewLine.tsx
  ReviewPanel.tsx
  ReviewPanelActions.tsx
  ReviewPanelHeader.tsx
  ReviewPlanSection.tsx
  review-panel.constants.ts
```

The main route lives in:

```txt
routes/
  BundleBuilderRoute.tsx
  index.ts
```

The route owns the page-level layout. Smaller UI responsibilities are delegated
to components.

## Tests

Tests are written with Vitest.

Current coverage focuses on state behavior:

- Variant quantities are tracked separately.
- Explicit configurations save and reload.
- Zustand store configuration can be saved on demand.

Run tests with:

```bash
npm run test
```
