# Static “Why Choose Us” Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all entry, hover, and focus-within animation and visual effects from the homepage “Why Choose Us” cards.

**Architecture:** Keep the existing semantic article grid and resting styles. Remove the shared entry-motion class from this grid and delete only the section-specific transition and interactive-state CSS, with a source-level regression test guarding the static behavior.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS, Node.js test runner

## Global Constraints

- Preserve the cards’ existing layout, content, spacing, colors, borders, and resting shadows.
- Do not change animation or interaction behavior elsewhere on the website.
- Preserve the cards as semantic `article` elements.

---

### Task 1: Make the “Why Choose Us” cards static

**Files:**
- Modify: `tests/homepage-motion.test.mjs`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the existing `.why-choose-grid`, `.why-choose-item`, `.why-choose-icon`, and `.why-choose-icon-path` styling hooks.
- Produces: a static `.why-choose-grid` whose cards have no entry-motion class, transitions, hover rules, or focus-within rules.

- [ ] **Step 1: Write the failing regression test**

Add this test to `tests/homepage-motion.test.mjs`:

```js
test("why choose cards remain static because they are not interactive", () => {
  assert.match(page, /className="why-choose-grid"/);
  assert.doesNotMatch(page, /className="why-choose-grid motion-sequence"/);
  assert.doesNotMatch(css, /\.why-choose-item:is\(:hover,\s*:focus-within\)/);
  assert.doesNotMatch(css, /\.why-choose-item\s*\{[^}]*transition:/s);
  assert.doesNotMatch(css, /\.why-choose-icon\s*\{[^}]*transition:/s);
  assert.doesNotMatch(css, /\.why-choose-icon-path \*\s*\{[^}]*transition:/s);
});
```

- [ ] **Step 2: Run the focused test and verify it fails for the existing animation hooks**

Run:

```powershell
pnpm test:homepage-motion
```

Expected: FAIL in `why choose cards remain static because they are not interactive` because the grid still has `motion-sequence` and the CSS still contains transitions and hover/focus-within selectors.

- [ ] **Step 3: Remove the entry-animation hook**

In `app/page.tsx`, change:

```tsx
<div className="why-choose-grid motion-sequence" aria-label="Reasons to choose Emerge Dental Studio">
```

to:

```tsx
<div className="why-choose-grid" aria-label="Reasons to choose Emerge Dental Studio">
```

- [ ] **Step 4: Remove the section-specific effects**

In `app/globals.css`:

- Delete the `transition` declaration from `.why-choose-item`.
- Delete the `.why-choose-item:is(:hover, :focus-within)` rule.
- Delete the `transition` declaration from `.why-choose-icon`.
- Delete the `.why-choose-item:is(:hover, :focus-within) .why-choose-icon` rule.
- Delete the `.why-choose-icon-path *` rule.
- Delete the `.why-choose-item:is(:hover, :focus-within) .why-choose-icon-path *` rule.

Keep every resting-state declaration in `.why-choose-item`, `.why-choose-icon`, and `.why-choose-icon svg` unchanged.

- [ ] **Step 5: Run the focused test and verify it passes**

Run:

```powershell
pnpm test:homepage-motion
```

Expected: all homepage-motion tests PASS.

- [ ] **Step 6: Run full project verification**

Run:

```powershell
pnpm lint
pnpm build
```

Expected: both commands exit with status 0 and no errors.

- [ ] **Step 7: Review and commit only the intended files**

Run:

```powershell
git diff --check
git diff -- tests/homepage-motion.test.mjs app/page.tsx app/globals.css
git add -- tests/homepage-motion.test.mjs app/page.tsx app/globals.css docs/superpowers/plans/2026-07-29-static-why-choose-cards.md
git commit -m "style: make why choose cards static"
```

Expected: the commit contains only the plan, regression test, homepage markup, and section-specific CSS cleanup.
