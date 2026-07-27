# Mobile Services Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver deterministic touch navigation for the Services disclosure and immediate feedback while service pages load.

**Architecture:** Keep one React boolean as the disclosure source of truth. Click/keyboard activation toggles that state; pointer hover is a mouse-only progressive enhancement. A route-segment `loading.tsx` provides feedback independently of the header state.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, Node test runner.

## Global Constraints

- Touch/click is authoritative on every viewport.
- Hover may affect state only for `pointerType === "mouse"`.
- Service links close on `click`, never `pointerdown`.
- Preserve existing brand styling and WCAG AA behavior.
- Do not modify Sanity schemas or copy.
- Preserve unrelated working-tree changes.

---

### Task 1: Services disclosure interaction and loading feedback

**Files:**
- Modify: `tests/service-nav.test.mjs`
- Modify: `components/Header.tsx`
- Modify: `components/Header.module.css`
- Create: `app/services/[slug]/loading.tsx`
- Modify: `app/services/services.module.css`

**Interfaces:**
- Consumes: `Header({settings, services})` and the existing `Service`/`SiteSettings` shapes.
- Produces: a button-controlled disclosure identified by `services-menu`, plus the service-detail route loading UI.

- [ ] **Step 1: Write the failing regression tests**

Update `tests/service-nav.test.mjs` to require a functional state toggle, mouse-only pointer handlers, no focus-open handler, `aria-controls="services-menu"`, ordinary navigation link semantics, 44px mobile targets, and `app/services/[slug]/loading.tsx`.

- [ ] **Step 2: Run the regression test and confirm RED**

Run: `node --test tests/service-nav.test.mjs`

Expected: failures showing the current always-open click handler, ungated pointer handlers, focus-open behavior, missing disclosure control ID, and missing loading state.

- [ ] **Step 3: Implement the minimal interaction fix**

In `components/Header.tsx`, add a toggle callback, gate pointer enter/leave by `event.pointerType === "mouse"`, remove focus-open behavior, set `aria-controls`, give the panel the matching ID, and keep link closing on `click`.

In `components/Header.module.css`, retain the current appearance while enforcing 44px narrow-screen targets and a viewport-bounded scrollable menu.

- [ ] **Step 4: Add route loading feedback**

Create `app/services/[slug]/loading.tsx` with a status-labelled treatment-page placeholder. Add only the CSS needed to match the existing service-page layout and reduced-motion behavior.

- [ ] **Step 5: Verify GREEN**

Run: `node --test tests/service-nav.test.mjs`

Expected: all service-navigation tests pass.

- [ ] **Step 6: Run project verification**

Run: `pnpm lint`

Expected: exit code 0.

Run: `node --test tests/*.test.mjs`

Expected: all tests pass.

Run: `pnpm build`

Expected: production build exits with code 0.
