# Vercel Analytics and Speed Insights Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable Vercel Web Analytics and Speed Insights on every website route.

**Architecture:** Install Vercel's two official production packages and mount their Next.js components once in the App Router root layout. A source-level regression test will protect the package declarations, imports, and global component placement without relying on production telemetry during local tests.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, pnpm, Node.js test runner, Vercel Analytics, Vercel Speed Insights

## Global Constraints

- Use `@vercel/analytics` for page views and visitor analytics.
- Use `@vercel/speed-insights` for Core Web Vitals and performance measurements.
- Render both integrations once in `app/layout.tsx` so all routes are covered.
- Do not add custom events, conversion tracking, consent UI, or visible design changes.
- Analytics failures must not block website rendering or booking and contact paths.
- Preserve unrelated existing workspace changes.

---

## File Map

- Create `tests/vercel-observability.test.mjs`: regression coverage for dependency declarations and root-layout integration.
- Modify `package.json`: declare the two official Vercel packages as production dependencies.
- Modify `pnpm-lock.yaml`: lock resolved versions and integrity metadata through pnpm.
- Modify `app/layout.tsx`: import and render both global observability components.

### Task 1: Add Global Vercel Observability

**Files:**
- Create: `tests/vercel-observability.test.mjs`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: the existing Next.js `RootLayout({children})` component in `app/layout.tsx`.
- Produces: one global `<Analytics />` instance from `@vercel/analytics/next` and one global `<SpeedInsights />` instance from `@vercel/speed-insights/next`.

- [ ] **Step 1: Write the failing regression test**

Create `tests/vercel-observability.test.mjs`:

```js
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const layout = readFileSync(resolve(root, "app", "layout.tsx"), "utf8");

test("declares Vercel Analytics and Speed Insights as production dependencies", () => {
  assert.equal(typeof packageJson.dependencies?.["@vercel/analytics"], "string");
  assert.equal(typeof packageJson.dependencies?.["@vercel/speed-insights"], "string");
});

test("mounts Vercel Analytics and Speed Insights once in the root layout", () => {
  assert.match(layout, /import \{Analytics\} from "@vercel\/analytics\/next";/);
  assert.match(layout, /import \{SpeedInsights\} from "@vercel\/speed-insights\/next";/);
  assert.equal(layout.match(/<Analytics\s*\/>/g)?.length, 1);
  assert.equal(layout.match(/<SpeedInsights\s*\/>/g)?.length, 1);
});
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```powershell
node --test tests/vercel-observability.test.mjs
```

Expected: FAIL because neither Vercel dependency nor either root-layout component exists yet.

- [ ] **Step 3: Install the official production packages**

Run:

```powershell
pnpm add @vercel/analytics @vercel/speed-insights
```

Expected: `package.json` and `pnpm-lock.yaml` include both packages under production dependencies.

- [ ] **Step 4: Add both components to the root layout**

Add these imports near the other package imports in `app/layout.tsx`:

```tsx
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
```

Render the components once at the end of `<body>`, after the floating WhatsApp link:

```tsx
        <Analytics />
        <SpeedInsights />
```

- [ ] **Step 5: Run the focused test and verify it passes**

Run:

```powershell
node --test tests/vercel-observability.test.mjs
```

Expected: 2 tests pass and 0 fail.

- [ ] **Step 6: Run repository verification**

Run:

```powershell
pnpm lint
pnpm build
```

Expected: ESLint exits successfully and the Next.js production build completes successfully.

- [ ] **Step 7: Review and commit only the intended implementation files**

Run:

```powershell
git diff --check
git diff -- package.json pnpm-lock.yaml app/layout.tsx tests/vercel-observability.test.mjs
git add -- package.json pnpm-lock.yaml app/layout.tsx tests/vercel-observability.test.mjs
git commit -m "feat: enable Vercel analytics and speed insights"
```

Expected: the commit contains exactly the four implementation files and excludes unrelated workspace changes.

## Post-Deployment Check

After deployment, enable Web Analytics and Speed Insights in the Vercel project dashboard if needed. Visit the production site, then confirm page-view and Core Web Vitals data begins appearing in their respective dashboards.
