# Homepage Performance Design

## Goal

Improve the homepage's Lighthouse performance without replacing the autoplaying carousel, changing its visible interaction model, or modifying Elfsight.

## Approved Scope

1. Replace the JavaScript-powered hero caption reveal with an equivalent CSS animation.
2. Render only the first hero image in the server response, then mount the remaining slides during browser idle time before the first four-second rotation.
3. Remove styling-only client boundaries from shared buttons and homepage links while retaining JavaScript only where interaction requires it.
4. Let the browser skip layout and paint work for offscreen homepage sections with `content-visibility: auto` and a stable intrinsic block-size estimate.

Elfsight remains unchanged and deferred to `docs/superpowers/pending/2026-07-27-elfsight-performance.md`.

## Rendering Design

`HeroCaptionReveal` remains as a small server-compatible wrapper so the homepage API and markup stay clear. Its rise animation moves to `app/globals.css`, starts with content fully visible, and is disabled under `prefers-reduced-motion: reduce`.

`HeroCarousel` keeps its existing four-second interval, hover pause, focus pause, and reduced-motion behavior. The first slide remains eager and high priority. Empty figure layers preserve the carousel's layout during server rendering; later `Image` elements mount through `requestIdleCallback` with a bounded timeout and a `setTimeout` fallback for browsers without the idle callback API.

Homepage calls to action render as direct `Link` or anchor elements using the established `.button` classes. The header's WhatsApp action renders as a direct anchor. `components/ui/button.tsx` becomes server-compatible for the server routes that still use it.

Every homepage section below the hero receives a dedicated `homepage-deferred-section` class. The class uses `content-visibility: auto` and `contain-intrinsic-block-size: auto 760px`; it does not hide content from the accessibility tree or change the section's final measured height.

## Constraints

- Preserve the current carousel timing and visible design.
- Preserve hover, focus, and reduced-motion pause behavior.
- Keep the first hero image discoverable in server-rendered HTML.
- Do not lazy-load the first hero image.
- Do not change, remove, or replace Elfsight.
- Do not start or reuse the shared development server.
- Maintain WCAG AA behavior and visible focus states.

## Verification

Static regression tests will prove each performance contract before implementation. The completed change will be checked with the focused tests, the complete Node test suite, ESLint, and a production build. A separate production server on an unused port will then receive three mobile Lighthouse runs, compared with the existing carousel baseline.
