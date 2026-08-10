# Compact Mobile Navbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the mobile navigation row visibly compact while preserving the Services button's 44px touch target.

**Architecture:** Keep the existing header markup and dropdown behavior unchanged. In the mobile CSS, retain the button's 44px minimum height but offset its transparent vertical footprint with equal negative block margins, then align the underline inside that touch box.

**Tech Stack:** Next.js, React, CSS Modules, Node.js test runner

## Global Constraints

- Preserve the actual Services `button` at a minimum height of 44px.
- Do not change the desktop header, dropdown behavior, keyboard behavior, logo, WhatsApp action, or other navigation links.
- Keep the mobile navigation row visually aligned and compact.

---

### Task 1: Compact the Services control without shrinking its touch target

**Files:**
- Modify: `tests/service-nav.test.mjs`
- Modify: `components/Header.module.css`

**Interfaces:**
- Consumes: the existing `.serviceTrigger` and `.serviceTrigger::after` CSS hooks.
- Produces: a 44px-tall Services button whose flex layout footprint is approximately 24px at widths up to 920px.

- [ ] **Step 1: Write the failing regression assertions**

Add these assertions to `services disclosure uses deterministic touch and mouse interactions` in `tests/service-nav.test.mjs`:

```js
assert.match(
  css,
  /@media \(max-width: 920px\)[\s\S]*?\.serviceTrigger\s*\{[^}]*margin-block:\s*-10px;[^}]*min-height:\s*44px;[^}]*\}/
);
assert.match(
  css,
  /@media \(max-width: 920px\)[\s\S]*?\.serviceTrigger::after\s*\{[^}]*bottom:\s*0;[^}]*\}/
);
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
node --test tests/service-nav.test.mjs
```

Expected: FAIL because the mobile `.serviceTrigger` has no compacting margin and no mobile underline override.

- [ ] **Step 3: Implement the minimal CSS change**

Inside `@media (max-width: 920px)` in `components/Header.module.css`, change the Services trigger rules to:

```css
.serviceTrigger {
  margin-block: -10px;
  min-height: 44px;
}

.serviceTrigger::after {
  bottom: 0;
}
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```powershell
node --test tests/service-nav.test.mjs
```

Expected: all service-nav tests PASS.

- [ ] **Step 5: Run repository verification**

Run:

```powershell
node --test tests/*.test.mjs
eslint every tracked JavaScript and TypeScript source file
next build
```

Expected: all tests pass, ESLint reports zero errors, and the production build exits successfully.

- [ ] **Step 6: Verify the rendered mobile dimensions**

At a 390x844 viewport, measure the live header and confirm:

- Services button bounding box is at least 44px tall.
- Navigation row is no more than 28px tall.
- Header is no more than 112px tall.
- Home, About, Services, Blogs, and Contact remain visually aligned.

- [ ] **Step 7: Commit the implementation**

```powershell
git add -- components/Header.module.css tests/service-nav.test.mjs
git commit -m "fix: compact mobile navbar"
```

Expected: the implementation commit contains only the CSS module and its regression test.
