# Hide Mobile Map Directions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide the contact page's overlaid Get directions link at viewport widths of 560px or less.

**Architecture:** Keep the contact-page markup and larger-screen styling unchanged. Reuse the existing mobile media query in the global stylesheet and add a focused regression test that checks the responsive rule.

**Tech Stack:** Next.js, CSS, Node.js test runner

## Global Constraints

- Reuse the existing `@media (max-width: 560px)` breakpoint.
- Do not add JavaScript or a new breakpoint.
- Keep the map, address link, and larger-screen overlay unchanged.

---

### Task 1: Hide the directions overlay on smaller screens

**Files:**
- Create: `tests/contact-map-mobile.test.mjs`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the existing `.contact-map-link` CSS hook and mobile media query.
- Produces: a hidden map overlay at widths up to 560px, with the default larger-screen rule untouched.

- [ ] **Step 1: Write the failing regression test**

Create `tests/contact-map-mobile.test.mjs`:

```js
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const css = readFileSync(resolve(root, "app", "globals.css"), "utf8");

test("contact map directions overlay is hidden on smaller screens", () => {
  assert.match(
    css,
    /@media \(max-width: 560px\)[\s\S]*?\.contact-map-link\s*\{[^}]*display:\s*none;[^}]*\}/
  );
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
node --test tests/contact-map-mobile.test.mjs
```

Expected: FAIL because the mobile media query does not yet hide `.contact-map-link`.

- [ ] **Step 3: Implement the minimal CSS change**

Inside `@media (max-width: 560px)` in `app/globals.css`, add:

```css
.contact-map-link {
  display: none;
}
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```powershell
node --test tests/contact-map-mobile.test.mjs
```

Expected: the contact map mobile test passes.

- [ ] **Step 5: Run repository verification**

Run:

```powershell
pnpm lint
pnpm build
```

Expected: ESLint reports no errors and the production build succeeds.

- [ ] **Step 6: Verify responsive rendering**

Open the contact page at 390px width and confirm the overlay is absent. Open it at 768px width and confirm the overlay remains visible.

- [ ] **Step 7: Commit and push**

```powershell
git add -- app/globals.css tests/contact-map-mobile.test.mjs docs/superpowers/plans/2026-08-10-hide-mobile-map-directions.md
git commit -m "fix: hide map directions overlay on mobile"
git push origin main
```

Expected: only the requested CSS, regression test, and implementation plan are included in the implementation commit, and `origin/main` advances successfully.
