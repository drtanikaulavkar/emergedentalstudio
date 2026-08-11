# Dynamic Route Scroll Offset

## Goal

Ensure all mobile page-to-page navigation settles at the absolute document top without relying on a fixed header-height value.

## Root Cause

Next.js scrolls the destination `<main>` into view after client-side navigation. The global `scroll-margin-top: 80px` assumes an 80px header, but the responsive two-row header is approximately 105–107px tall. Because the sticky header remains in normal document flow, the difference leaves mobile navigation roughly 25–27px below `scrollY = 0`.

## Design

- Add a ref to the persistent `Header` element.
- Observe the rendered header with `ResizeObserver` and publish its current block size as the root CSS custom property `--site-header-height`.
- Replace the fixed `main` scroll margin with `scroll-margin-top: var(--site-header-height, 0px)` so the fallback does not assume a header height.
- Update the variable initially and whenever the header changes size, including responsive wrapping and viewport changes.
- Remove the custom property when the header component unmounts.

This keeps Next.js's native route scrolling and browser history behavior intact. It avoids route-specific click handlers and does not force `window.scrollTo()` after navigation.

## Scope

The measured offset applies to all internal route navigation at every viewport size. Desktop behavior remains equivalent because the measured desktop header height replaces the existing 80px assumption. Hash-linked service sections keep their existing section-specific scroll margins.

## Accessibility and Motion

The change does not alter focus management, keyboard navigation, reduced-motion behavior, or visible layout. It only provides the browser with the actual sticky-header height for route positioning.

## Verification

- Add regression coverage for header measurement, resize observation, cleanup, and CSS-variable use.
- Reproduce a service-to-service navigation at mobile width and confirm the destination settles at `scrollY = 0`.
- Confirm desktop route navigation still settles at the top.
- Run the full test suite, lint, and production build.
