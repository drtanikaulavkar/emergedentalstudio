# Native Route Scroll Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make native Next.js navigation settle at the document top without fixed responsive offsets or custom route-scroll handlers.

**Architecture:** The persistent header publishes its live rendered height through a root CSS variable, and the document uses that value for standard scroll padding. The service route avoids a short loading boundary that would collapse page height during navigation and interfere with Next.js's native scroll restoration.

**Tech Stack:** Next.js, React, TypeScript, CSS, Node.js test runner

## Global Constraints

- Do not hardcode a mobile or desktop header height.
- Preserve Next.js native route scrolling, history restoration, and hash-link behavior.
- Do not add JavaScript route-scroll handlers or click interception.
- Keep focus, keyboard, and reduced-motion behavior unchanged.

---

### Task 1: Use live header height for native document scrolling

**Files:**
- Modify: `tests/nav-scroll-offset.test.mjs`
- Modify: `components/Header.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the rendered `.site-header` element and `ResizeObserver`.
- Produces: `--site-header-height` and `html { scroll-padding-top: var(--site-header-height, 0px); }`.

- [x] **Step 1: Write and run a failing regression test for live scroll padding**
- [x] **Step 2: Measure the header, publish the CSS variable, and clean it up on unmount**
- [x] **Step 3: Apply document scroll padding and remove the fixed global main offset**
- [x] **Step 4: Run the focused regression test and confirm it passes**

### Task 2: Keep service transitions layout-stable

**Files:**
- Delete: `app/services/[slug]/loading.tsx`
- Modify: `app/services/services.module.css`
- Modify: `tests/service-nav.test.mjs`

**Interfaces:**
- Consumes: Next.js's default `<Link>` transition behavior.
- Produces: service navigation that retains the current page until the destination is ready.

- [x] **Step 1: Write and run a failing regression test for the collapsing service fallback**
- [x] **Step 2: Remove the route loading boundary and its unused skeleton styles**
- [x] **Step 3: Remove the fixed section anchor offset in favor of document scroll padding**
- [x] **Step 4: Run the focused regression test and confirm it passes**

### Task 3: Verify and integrate

**Files:**
- Modify: `docs/superpowers/specs/2026-08-11-dynamic-route-scroll-offset-design.md`
- Modify: `docs/superpowers/plans/2026-08-11-dynamic-route-scroll-offset.md`

- [x] **Step 1: Verify deep mobile service navigation settles at the top**
- [x] **Step 2: Verify Back restores a deep position and desktop navigation settles at the top**
- [ ] **Step 3: Run the full test suite, lint, and production build**
- [ ] **Step 4: Review the intended diff, commit it, integrate onto the latest main, and push main**
