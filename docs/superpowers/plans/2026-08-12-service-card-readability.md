# Service Card Readability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enlarge homepage service cards and align their label, title, and description rows across phone, tablet, and desktop layouts.

**Architecture:** Keep the existing `ServicesCarousel` and `ServiceCard` markup unchanged. Apply the readability and alignment rules only through `.services-carousel-rail` selectors, with CSS breakpoints controlling one, two, or four visible cards.

**Tech Stack:** Next.js, React, TypeScript, CSS, Node test runner.

## Global Constraints

- Preserve one shared carousel code path.
- Preserve service descriptions, whole-card links, the line indicator, mobile swipe, and desktop arrows.
- Render “View all services” as a borderless text-and-arrow link with a 44px interaction height.
- Show one card plus a next-card cue on phones, two cards on tablets, and four cards on desktop.
- Do not alter service cards on the full Services directory page.

---

### Task 1: Lock the readability contract

**Files:**
- Modify: `tests/mobile-services-layout.test.mjs`
- Read: `app/globals.css`

**Interfaces:**
- Consumes: Homepage carousel CSS selectors.
- Produces: Assertions for shared text rows, readable typography, and 1/2/4 responsive card widths.

- [ ] **Step 1: Update the source-level regression assertions**

Require `grid-template-rows`, a single-line title row, a three-line summary row, larger padding and type, four desktop cards, two tablet cards, one phone card with a visible next-card cue, and a lightweight section link.

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `node --test tests/mobile-services-layout.test.mjs`

Expected: FAIL because the existing CSS still uses 1/2/3/4/5 sizing and no shared text rows.

### Task 2: Implement shared sizing and alignment

**Files:**
- Modify: `app/globals.css`
- Test: `tests/mobile-services-layout.test.mjs`

**Interfaces:**
- Consumes: Existing `.services-carousel-rail` markup.
- Produces: A shared readable card style and responsive 1/2/4 column widths.

- [ ] **Step 1: Add the shared content grid and readable type scale**

Use a natural single-line row for titles and a reserved three-line row for descriptions, increase padding, and keep label/title/description spacing on the 4px rhythm.

- [ ] **Step 2: Replace the responsive widths**

Keep four cards by default, use two below 920px, and use one card with a 52px next-card cue below 560px. Remove the five-card wide-screen override.

- [ ] **Step 3: Run the targeted test and verify it passes**

Run: `node --test tests/mobile-services-layout.test.mjs`

Expected: PASS with 4 tests and 0 failures.

### Task 3: Verify project health and responsive appearance

**Files:**
- Verify: `app/globals.css`
- Verify: `tests/mobile-services-layout.test.mjs`

**Interfaces:**
- Consumes: Completed CSS implementation.
- Produces: Automated and browser evidence for handoff.

- [ ] **Step 1: Run all tests and lint**

Run: `node --test tests/*.test.mjs` and `pnpm lint`

Expected: All tests pass and lint exits with code 0.

- [ ] **Step 2: Run the production build**

Run: `pnpm build`

Expected: All routes compile successfully.

- [ ] **Step 3: Inspect representative viewport widths**

Check 390px, 768px, and 1280px. Confirm one, two, and four fully visible cards respectively; readable copy; aligned card content; a visible next-card cue on phones; correct indicator counts; and no page-level horizontal overflow.
