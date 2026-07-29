# Lighthouse Hero Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve immediate hero autoplay while stabilizing the first slide as the homepage LCP candidate and providing a keyboard-discoverable rotation control.

**Architecture:** Keep `HeroCarousel` as a focused client component. Make pause state explicit, keep media layers equal-sized, and restrict transitions to opacity so later slides cannot become larger paint candidates.

**Tech Stack:** Next.js App Router, React 19, `next/image`, CSS, Node test runner, Lighthouse 13.

## Global Constraints

- Keep the four-second autoplay cadence.
- Do not pause automatically on hover or focus.
- Stop autoplay for `prefers-reduced-motion: reduce`.
- Show the stop/start control only while it has keyboard-visible focus.
- Do not modify or remove Elfsight.
- Preserve WCAG AA focus visibility and touch-independent keyboard operation.

---

### Task 1: Carousel regression contract

**Files:**
- Modify: `tests/homepage-motion.test.mjs`

**Interfaces:**
- Consumes: source text from `components/HeroCarousel.tsx` and `app/globals.css`.
- Produces: regression assertions for the approved autoplay, image-priority, equal-size, and focus-only-control contract.

- [ ] **Step 1: Replace the obsolete no-controls assertions**

Assert that `HeroCarousel` contains `isRotationPaused`, a `carousel-toggle` button, action-based accessible labels, `aria-pressed`, high/low `fetchPriority`, and 1600×1200 image dimensions. Assert that pointer/focus pause state and handlers are absent.

- [ ] **Step 2: Add CSS assertions**

Assert that `.carousel-slide` transitions opacity only, `.carousel-slide` and `.carousel-slide img` do not transform, `.carousel-toggle` is clipped to one pixel by default, and `.carousel-toggle:focus-visible` restores a usable control.

- [ ] **Step 3: Run the focused test and verify the expected failure**

Run: `pnpm test:homepage-motion`

Expected: FAIL because the existing carousel still uses hover/focus pause state, contains transform scaling, and has no `carousel-toggle`.

### Task 2: Equal-size autoplay implementation

**Files:**
- Modify: `components/HeroCarousel.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `HeroCarouselSlide[]`.
- Produces: the existing `HeroCarousel({slides})` API with explicit pause state and stable media layers.

- [ ] **Step 1: Replace implicit pause state**

Remove pointer and focus pause state and handlers. Add `isRotationPaused`; compute `isPaused` from `prefersReducedMotion || isRotationPaused`.

- [ ] **Step 2: Add the keyboard-discoverable rotation control**

Render a `button.carousel-toggle` before the slides. Toggle `isRotationPaused`, expose `aria-pressed`, and switch between `Stop automatic slide show` and `Start automatic slide show`.

- [ ] **Step 3: Normalize image discovery and dimensions**

Render every image at `width={1600}` and `height={1200}`. Keep `priority` and high fetch priority only for index zero; use low fetch priority and lazy loading for later slides.

- [ ] **Step 4: Convert the transition to an equal-size crossfade**

Remove scale transforms and transform transitions from `.carousel-slide` and `.carousel-slide img`. Keep the 520 ms opacity transition and active-slide stacking.

- [ ] **Step 5: Style the focus-only control**

Use the visually-hidden clipping pattern for `.carousel-toggle`. Restore its size, padding, colors, and focus ring only under `.carousel-toggle:focus-visible`.

- [ ] **Step 6: Run the focused test**

Run: `pnpm test:homepage-motion`

Expected: PASS with zero failures.

### Task 3: Production verification and Lighthouse

**Files:**
- Verify: `components/HeroCarousel.tsx`
- Verify: `app/globals.css`
- Verify: `tests/homepage-motion.test.mjs`

**Interfaces:**
- Consumes: the completed production implementation.
- Produces: test, lint, build, and Lighthouse evidence.

- [ ] **Step 1: Run repository checks**

Run: `pnpm test:homepage-motion`

Expected: PASS.

Run: `pnpm lint`

Expected: exit code 0.

Run: `pnpm build`

Expected: optimized production build completes successfully.

- [ ] **Step 2: Inspect behavior in a real browser**

Verify that autoplay advances after four seconds, pointer hover does not pause it, keyboard focus reveals the control, activating the control stops/restarts rotation, and reduced-motion emulation stops autoplay.

- [ ] **Step 3: Run repeated mobile Lighthouse audits**

Audit the production homepage at least three times with the locally installed Lighthouse. Record performance, LCP, Speed Index, Total Blocking Time, accessibility, best practices, and SEO.

Expected: every run reports an LCP value; median LCP materially improves from the previous 13.4-second baseline. Report Elfsight findings separately as deferred.

- [ ] **Step 4: Review the final diff**

Confirm that only the approved carousel behavior, tests, Lighthouse dependency, and planning documents are included. Preserve unrelated workspace changes.
