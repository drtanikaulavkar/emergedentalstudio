# Homepage Section Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every homepage section use a full-width surface with a consistently constrained inner container, one continuous light canvas, and two content-driven dark anchors.

**Architecture:** Normalize the homepage markup to an outer `<section>` plus nested `.container` contract, then simplify homepage CSS so light sections inherit the page canvas and only Doctor and Contact own dark backgrounds. Protect the structure and style rules with source-level Node tests, then verify the integrated page visually at desktop and mobile widths.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS, Node test runner, Playwright/browser visual verification.

## Global Constraints

- Preserve the existing section order, content, component APIs, interactions, links, embeds, and responsive stacking behavior.
- Services, Facilities, Reviews, Gallery, and FAQ use one continuous light canvas with no section-specific background fills.
- Doctor and Contact remain full-width plum-led dark anchors from the same surface family.
- Every non-hero homepage section uses a full-width outer section with a nested `.container`.
- Keep the existing `.container` maximum width at exactly `1180px`.
- Remove viewport-height minimums from Services, Doctor, and Contact; their height must be content-driven.
- Use one subtle divider between Gallery and FAQ; do not add dividers between every light section.
- Maintain WCAG AA, visible focus styles, minimum 44px interactive targets, and reduced-motion behavior.
- Add no dependencies, runtime JavaScript, decorative imagery, content changes, or unrelated refactors.

---

## File Structure

- Modify `app/page.tsx`: normalize homepage section wrapper/container anatomy.
- Modify `app/globals.css`: unify light surfaces, align dark anchors, remove viewport minimum heights, and define the Gallery-to-FAQ divider.
- Create `tests/homepage-section-structure.test.mjs`: protect the outer-section/nested-container contract.
- Modify `tests/homepage-motion.test.mjs`: update the existing homepage style expectations for the approved surface system.

Tasks 1 and 2 are intentionally file-disjoint and may run in parallel. Task 3 begins only after both commits are integrated.

---

### Task 1: Normalize Homepage Section Structure

**Files:**
- Create: `tests/homepage-section-structure.test.mjs`
- Modify: `app/page.tsx:157-314`

**Interfaces:**
- Consumes: Existing global `.container` class and existing homepage section class names.
- Produces: A stable DOM contract where each non-hero section class is on a full-width outer `<section>` and its content is inside a direct `.container` child.

- [ ] **Step 1: Write the failing structure regression test**

Create `tests/homepage-section-structure.test.mjs`:

```js
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "app", "page.tsx"), "utf8");

const sectionClasses = [
  "services-section",
  "doctor-section",
  "why-choose-section",
  "reviews-section",
  "gallery-section",
  "faq-section",
  "contact-section"
];

test("non-hero homepage sections use full-width wrappers with nested containers", () => {
  for (const sectionClass of sectionClasses) {
    const sectionPattern = new RegExp(
      `<section className="section ${sectionClass}">\\s*<div className="container(?: [^"]+)?">`,
      "s"
    );

    assert.match(page, sectionPattern, `${sectionClass} must wrap a nested container`);
  }
});

test("homepage section backgrounds are not coupled to the container utility", () => {
  assert.doesNotMatch(page, /<section className="container section [^"]+">/);
});
```

- [ ] **Step 2: Run the structure test and verify RED**

Run: `node --test tests/homepage-section-structure.test.mjs`

Expected: FAIL because Services, Gallery, and FAQ currently place `container` on the `<section>` itself.

- [ ] **Step 3: Normalize all non-hero section wrappers**

In `app/page.tsx`, use this exact anatomy for every non-hero section:

```tsx
<section className="section services-section">
  <div className="container services-content">
    {/* existing Services content unchanged */}
  </div>
</section>
```

Apply the same outer-section/direct-container structure to Doctor, Why Choose Us, Reviews, Gallery, FAQ, and Contact. Preserve their existing inner layout classes by combining them with `container` on the direct child where applicable, for example:

```tsx
<div className="container split">...</div>
<div className="container why-choose-layout">...</div>
<div className="container gallery-content">...</div>
<div className="container faq-layout">...</div>
<div className="container contact-home">...</div>
```

Do not change copy, ordering, components, links, or interactive behavior.

- [ ] **Step 4: Run the focused test and existing homepage test**

Run: `node --test tests/homepage-section-structure.test.mjs tests/homepage-motion.test.mjs`

Expected: All tests pass except any pre-existing style assertion intentionally assigned to Task 2; document that cross-task expectation rather than editing Task 2 files.

- [ ] **Step 5: Commit Task 1**

```powershell
git add -- app/page.tsx tests/homepage-section-structure.test.mjs
git commit -m "refactor: normalize homepage section wrappers"
```

---

### Task 2: Unify Homepage Surfaces and Vertical Rhythm

**Files:**
- Modify: `tests/homepage-motion.test.mjs:42-83`
- Modify: `app/globals.css:327-331,573-584,650-664,943-946,1080-1108,1753-1988`

**Interfaces:**
- Consumes: Existing section class names and the Task 1 direct-child classes `services-content` and `gallery-content`.
- Produces: One continuous light surface, two related dark anchors, content-driven section heights, and a single Gallery-to-FAQ divider.

- [ ] **Step 1: Update style expectations before changing CSS**

In `tests/homepage-motion.test.mjs`, replace the obsolete Why Choose Us background expectation and add focused assertions equivalent to:

```js
assert.match(css, /\.services-section,\s*\.why-choose-section,\s*\.reviews-section,\s*\.gallery-section,\s*\.faq-section\s*\{[^}]*background:\s*transparent/s);
assert.doesNotMatch(css, /\.services-section\s*\{[^}]*min-height:/s);
assert.doesNotMatch(css, /\.doctor-section\s*\{[^}]*min-height:/s);
assert.doesNotMatch(css, /\.contact-section\s*\{[^}]*min-height:/s);
assert.match(css, /\.faq-section\s*\{[^}]*border-top:\s*1px solid var\(--line\)/s);
assert.doesNotMatch(css, /\.reviews-section\s*\{[^}]*rgba\(177, 154, 200, 0\.2\)/s);
```

- [ ] **Step 2: Run the homepage test and verify RED**

Run: `node --test tests/homepage-motion.test.mjs`

Expected: FAIL because the current CSS still assigns separate light-section fills and viewport-height minimums.

- [ ] **Step 3: Implement the unified surface system**

In `app/globals.css`:

- Group `.services-section`, `.why-choose-section`, `.reviews-section`, `.gallery-section`, and `.faq-section` under `background: transparent`.
- Keep their outer sections full width; never add `max-width` or auto margins to section classes.
- Move Services grid alignment responsibilities to `.services-content`.
- Remove the Services, Doctor, and Contact `min-height: calc(100svh - 80px)` declarations.
- Retain the Doctor plum background and make Contact use the same core plum surface family without changing text/card contrast.
- Add `border-top: 1px solid var(--line)` to `.faq-section` as the sole light-run divider.
- Keep the shared `.section` fluid padding and use only targeted padding overrides required by the Doctor, Why Choose Us, Reviews, and Contact compositions.
- Remove redundant mobile `min-height: auto` overrides once the desktop minimum heights no longer exist.
- Remove the old `.gallery-section` white fill, `.reviews-section` lavender fill, `.why-choose-section` surface fill, and `.services-section` white fill.

- [ ] **Step 4: Run the focused homepage style test**

Run: `node --test tests/homepage-motion.test.mjs`

Expected: 7 tests pass, 0 fail, with pristine output.

- [ ] **Step 5: Commit Task 2**

```powershell
git add -- app/globals.css tests/homepage-motion.test.mjs
git commit -m "style: unify homepage section surfaces"
```

---

### Task 3: Integrate and Verify the Homepage

**Files:**
- Modify only if verification exposes a concrete defect: `app/page.tsx`, `app/globals.css`, `tests/homepage-section-structure.test.mjs`, or `tests/homepage-motion.test.mjs`.

**Interfaces:**
- Consumes: Task 1 normalized markup and Task 2 surface/spacing rules.
- Produces: A verified combined homepage ready for review and push to `main`.

- [ ] **Step 1: Integrate the two task commits onto `main`**

Cherry-pick the Task 1 and Task 2 commits in that order. Resolve only genuine overlap; the planned file ownership should avoid conflicts.

- [ ] **Step 2: Run focused automated tests**

Run:

```powershell
node --test tests/homepage-section-structure.test.mjs tests/homepage-motion.test.mjs tests/page-transition.test.mjs tests/impeccable-wrapper.test.mjs
```

Expected: 12 tests pass, 0 fail.

- [ ] **Step 3: Run lint and production build**

Run:

```powershell
pnpm lint
pnpm build
```

Expected: Both commands exit 0 with no errors.

- [ ] **Step 4: Verify computed section geometry and surfaces**

At viewport widths 1280px, 1440px, and 1920px, inspect every `main > section` and confirm:

- Each non-hero outer section spans the viewport width.
- Each direct `.container` child remains at or below 1180px.
- Services, Facilities, Reviews, Gallery, and FAQ resolve to the same transparent/light canvas.
- Reviews has no unique section background.
- Doctor and Contact remain full-width dark surfaces.
- Services, Doctor, and Contact heights are content-driven rather than approximately one viewport tall.

- [ ] **Step 5: Verify responsive screenshots**

Capture and inspect the homepage at 1920×1080, 1440×1000, 920×1000, and 390×844. Confirm no boxed section backgrounds, unintended empty bands, horizontal overflow, clipped content, or broken stacking.

- [ ] **Step 6: Commit any verification-only correction**

If verification required a correction, first add or adjust a failing focused test, verify RED, implement the minimal fix, verify GREEN, and commit only the related files:

```powershell
git add -- app/page.tsx app/globals.css tests/homepage-section-structure.test.mjs tests/homepage-motion.test.mjs
git commit -m "fix: refine homepage section consistency"
```

If no correction is needed, create no extra commit.

- [ ] **Step 7: Request final code review**

Review the full range from the implementation base through the final integrated commit against this plan and the approved design specification. Fix all Critical and Important findings, re-run their covering tests, then repeat the review.

- [ ] **Step 8: Push verified `main`**

Confirm the intended diff contains only the specification, implementation plan, homepage markup/CSS, and focused tests. Push `main` to `origin` without force.
