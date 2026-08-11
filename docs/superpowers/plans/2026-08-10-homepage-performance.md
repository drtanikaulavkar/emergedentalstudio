# Homepage Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce homepage JavaScript, initial hero requests, hydration work, and offscreen rendering while preserving the current carousel and leaving Elfsight unchanged.

**Architecture:** Keep interactive behavior inside the existing header, hero carousel, and services carousel client islands. Move the hero caption reveal and styling-only actions to server-rendered HTML/CSS, defer secondary hero media until idle time, and contain offscreen homepage sections.

**Tech Stack:** Next.js 16 App Router, React 19, `next/image`, CSS, Node test runner, Lighthouse 13.

## Global Constraints

- Preserve the current four-second carousel timing and hover/focus/reduced-motion pause behavior.
- Keep the first hero image eager and high priority.
- Do not modify Elfsight.
- Maintain WCAG AA and reduced-motion support.
- Run performance verification on an isolated production server, not the shared dev server.

---

### Task 1: Performance regression contracts

**Files:**
- Create: `tests/homepage-performance.test.mjs`
- Modify: `tests/homepage-premium-ui.test.mjs`
- Modify: `tests/design-system-foundation.test.mjs`

**Interfaces:**
- Consumes: homepage, header, hero, shared button, CSS, and package source text.
- Produces: four focused tests that fail against the current implementation.

- [ ] **Step 1: Add the CSS reveal contract**

Assert that `HeroCaptionReveal` has no client directive or `motion/react` import, that `motion` is not a direct dependency, and that CSS supplies `hero-caption-rise` plus a reduced-motion override.

- [ ] **Step 2: Add the deferred-image contract**

Assert that `HeroCarousel` uses `deferredSlidesReady`, `requestIdleCallback`, a timeout fallback, and renders later images only when deferred loading is ready.

- [ ] **Step 3: Add the hydration and containment contracts**

Assert that the homepage and header do not import `Button`, `button.tsx` has no client directive, every below-hero section uses `homepage-deferred-section`, and its CSS contains both required containment declarations.

- [ ] **Step 4: Verify RED**

Run: `node --test tests/homepage-performance.test.mjs tests/homepage-premium-ui.test.mjs tests/design-system-foundation.test.mjs`

Expected: FAIL because the Motion dependency, eager secondary images, client button boundary, and missing containment class still exist.

### Task 2: CSS-only caption reveal

**Files:**
- Modify: `components/HeroCaptionReveal.tsx`
- Modify: `app/globals.css`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

**Interfaces:**
- Consumes: `PropsWithChildren`.
- Produces: the unchanged `HeroCaptionReveal({children})` API as server-rendered markup.

- [ ] **Step 1: Replace the client component**

Render `<div className="hero-caption-reveal">{children}</div>` without Motion or browser hooks.

- [ ] **Step 2: Add the CSS animation**

Add `animation: hero-caption-rise 580ms var(--ease-out-quint) 120ms both`, animate only `transform: translateY(18px)` to zero, and disable it in the existing reduced-motion media query.

- [ ] **Step 3: Remove the direct dependency**

Run: `pnpm remove motion`

- [ ] **Step 4: Verify GREEN for the reveal contract**

Run the focused test command from Task 1 and confirm only the remaining three unimplemented contracts fail.

### Task 3: Deferred secondary hero images

**Files:**
- Modify: `components/HeroCarousel.tsx`

**Interfaces:**
- Consumes: the existing `HeroCarouselSlide[]` prop.
- Produces: the existing carousel behavior with secondary `Image` elements mounted during idle time.

- [ ] **Step 1: Schedule deferred media**

Add a `deferredSlidesReady` state and an effect that uses `window.requestIdleCallback(loadDeferredSlides, {timeout: 1800})`, falling back to `window.setTimeout(loadDeferredSlides, 1200)`, with cleanup for either path.

- [ ] **Step 2: Gate later images**

Keep every figure layer but render its `Image` only when `index === 0 || deferredSlidesReady`. Give index zero eager/high-priority discovery and later images low fetch priority.

- [ ] **Step 3: Verify GREEN for deferred media**

Run the focused test command and confirm only hydration and containment remain failing.

### Task 4: Remove styling-only hydration

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/Header.tsx`
- Modify: `components/ui/button.tsx`

**Interfaces:**
- Consumes: the existing `.button`, `.header-cta`, and modifier classes.
- Produces: equivalent anchor and `Link` markup without client component boundaries for styling alone.

- [ ] **Step 1: Render direct homepage actions**

Replace the three `Button asChild` wrappers with direct anchors or `Link` elements carrying their existing classes.

- [ ] **Step 2: Render the direct header action**

Replace the header `Button asChild` wrapper with an anchor using `className="header-cta"`.

- [ ] **Step 3: Make the shared button server-compatible**

Remove only the `"use client"` directive from `components/ui/button.tsx`; retain its public API for server routes.

- [ ] **Step 4: Verify GREEN for hydration**

Run the focused test command and confirm only containment remains failing.

### Task 5: Contain offscreen sections

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: homepage section elements below the hero.
- Produces: an opt-in `homepage-deferred-section` rendering boundary.

- [ ] **Step 1: Mark homepage sections**

Add `homepage-deferred-section` to services, doctor, facilities, reviews, gallery, FAQ, and contact sections.

- [ ] **Step 2: Add containment CSS**

Define `content-visibility: auto` and `contain-intrinsic-block-size: auto 760px` on the dedicated class.

- [ ] **Step 3: Verify GREEN**

Run the focused tests and confirm all pass.

### Task 6: Repository and Lighthouse verification

**Files:**
- Verify all modified production, test, dependency, and documentation files.

**Interfaces:**
- Consumes: the complete implementation.
- Produces: fresh functional and performance evidence.

- [ ] **Step 1: Run repository verification**

Run `node --test tests/*.test.mjs`, `pnpm lint`, and `pnpm build`; require exit code zero from each.

- [ ] **Step 2: Run isolated production audits**

Start the built app on an unused port, run three mobile Lighthouse audits, and stop that server. Record performance, FCP, LCP, observed LCP, TBT, CLS, Speed Index, transfer size, request count, and accessibility.

- [ ] **Step 3: Review the diff**

Confirm Elfsight is untouched, the carousel behavior remains intact, and no unrelated files are included.
