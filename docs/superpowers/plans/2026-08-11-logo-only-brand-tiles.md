# Logo-Only Brand Tiles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove visible brand-name captions beneath service-page logos while retaining each brand name in descriptive image alt text.

**Architecture:** Keep the existing shared service-page brand grid and its Sanity/fallback data flow. Change only the shared tile markup and now-unused caption styling, with a source-level regression test covering the markup and all seven alt labels.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules, Node.js test runner

## Global Constraints

- Preserve the “Brands Used” and “Implant Brands Used” section headings.
- Preserve all seven logo files, tile dimensions, responsive grid behavior, and Sanity/fallback brand data.
- Remove the caption element rather than visually hiding it, so screen readers do not announce duplicate brand text.
- Keep every brand name in the rendered image `alt` attribute through `brand.logoAlt`.
- Do not include unrelated local workspace changes.

---

### Task 1: Render logo-only brand tiles

**Files:**
- Create: `tests/service-brand-logos.test.mjs`
- Modify: `app/services/[slug]/page.tsx:132-139`
- Modify: `app/services/services.module.css:476-500`

**Interfaces:**
- Consumes: `service.brands`, where each item exposes `name`, `logoSrc`, and `logoAlt`.
- Produces: Brand tiles containing one `next/image` image whose `alt` is `brand.logoAlt`, with no visible caption element.

- [ ] **Step 1: Write the failing regression test**

Create `tests/service-brand-logos.test.mjs`:

```js
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";

const pageSource = readFileSync("app/services/[slug]/page.tsx", "utf8");
const styleSource = readFileSync("app/services/services.module.css", "utf8");
const siteDataSource = readFileSync("lib/siteData.ts", "utf8");

test("brand tiles render logos without visible name captions", () => {
  assert.doesNotMatch(pageSource, /<span>\{brand\.name\}<\/span>/);
  assert.match(pageSource, /<Image src=\{brand\.logoSrc\} alt=\{brand\.logoAlt\}/);
  assert.doesNotMatch(styleSource, /\.brandCard span\s*\{/);
});

test("all brand names remain available in logo alt text", () => {
  const expectedAltLabels = [
    "Dio Implants logo",
    "Osstem logo",
    "Nobel Biocare logo",
    "Neodent logo",
    "Invisalign logo",
    "Damon braces logo",
    "Illusion Aligners logo",
  ];

  for (const label of expectedAltLabels) {
    assert.ok(siteDataSource.includes(`logoAlt: "${label}"`), `Missing alt label: ${label}`);
  }
});
```

- [ ] **Step 2: Run the regression test and confirm the caption assertion fails**

Run:

```bash
node --test tests/service-brand-logos.test.mjs
```

Expected: FAIL in `brand tiles render logos without visible name captions` because the page still renders `<span>{brand.name}</span>`.

- [ ] **Step 3: Remove the visible caption markup**

Change the shared brand tile in `app/services/[slug]/page.tsx` to:

```tsx
<article className={styles.brandCard} key={brand.name}>
  <Image src={brand.logoSrc} alt={brand.logoAlt} width={240} height={90} />
</article>
```

- [ ] **Step 4: Remove caption-only styling and close the image spacing**

In `app/services/services.module.css`, remove the `.brandCard span` rule and change the tile gap to:

```css
.brandCard {
  align-items: center;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: center;
  min-height: 126px;
  padding: 20px;
}
```

- [ ] **Step 5: Run the focused regression test**

Run:

```bash
node --test tests/service-brand-logos.test.mjs
```

Expected: 2 tests pass, 0 fail.

- [ ] **Step 6: Run project verification**

Run:

```bash
pnpm exec eslint . --ignore-pattern .playwright-cli --ignore-pattern .codex-temp --ignore-pattern .worktrees
pnpm test:homepage-motion
pnpm test:impeccable-wrapper
pnpm verify:runtime
pnpm build
```

Expected: lint exits 0, all tests pass, runtime verification targets Node 24, and the production build generates all routes successfully.

- [ ] **Step 7: Verify both service pages in a browser**

Open `/services/dental-implants` and `/services/braces-aligners` at desktop and mobile widths. Confirm the seven logos render, no brand-name captions appear, the section headings remain, and each image exposes non-empty alt text containing its brand name.

- [ ] **Step 8: Commit the focused implementation**

```bash
git add tests/service-brand-logos.test.mjs app/services/[slug]/page.tsx app/services/services.module.css
git commit -m "refactor: show brand logos without captions"
```

