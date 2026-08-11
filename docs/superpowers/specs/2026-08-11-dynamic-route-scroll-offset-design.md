# Native Route Scroll Positioning

## Goal

Ensure page-to-page navigation uses Next.js's native scrolling, settles at the absolute document top, and preserves browser history without fixed header-height values.

## Root Cause

Two behaviors combined to leave mobile service navigation below the top:

- Next.js aligns the destination `<main>` with the viewport. Because the sticky header remains in normal document flow, the alignment moves the document by the rendered header height.
- The service route's short `loading.tsx` fallback temporarily replaces a long page. The browser clamps the old deep scroll position before the destination is ready, preventing a reliable native reset.

The former fixed `main { scroll-margin-top: 80px; }` only approximated the desktop header and could not account for the responsive two-row mobile header.

## Design

- Measure the persistent header with `ResizeObserver` and publish its rendered height as `--site-header-height`.
- Apply that value through the standards-based `scroll-padding-top` property on the document scrolling container.
- Remove the global fixed route margin and the service section's fixed anchor margin.
- Remove the short service route loading boundary so the current page remains stable until the destination is ready.
- Keep navigation on Next.js `<Link>` with its default scroll and history behavior.
- Do not add route listeners, click interception, viewport breakpoints, or `window.scrollTo()` calls.

## Scope

The measured scroll padding applies to all internal navigation and hash links at every viewport size. It updates automatically when the responsive header changes height.

## Accessibility and Motion

The change does not alter focus management, keyboard navigation, or reduced-motion behavior. Removing the service fallback trades immediate skeleton feedback for stable native navigation positioning.

## Verification

- Add regression coverage for live header measurement, document scroll padding, removal of fixed offsets, and removal of the collapsing service fallback.
- Reproduce a deep service-to-service navigation at mobile width and confirm it settles within subpixel rounding of `scrollY = 0`.
- Confirm browser Back restores the previous deep position.
- Confirm desktop navigation settles at `scrollY = 0`.
- Run the full test suite, lint, and production build.
