# SEO Final Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve the final important SEO review findings with behavioral regressions and restore repository-wide lint coverage.

**Architecture:** Keep CMS fallback decisions in pure merge helpers used by the Sanity queries, and keep JSON-LD serialization in a pure helper used by the React component. Exercise those helpers directly with Node's test runner, while retaining source-wiring assertions for routes and configuration.

**Tech Stack:** Next.js, TypeScript, Sanity, React, Node test runner, ESLint.

## Global Constraints

- Use strict RED/GREEN TDD for every behavior change.
- Preserve `.codex-temp/` and `.playwright-cli/` as untracked scratch directories.
- Run exact `pnpm lint`, focused tests, TypeScript, and build verification.
- Commit all fixes in one commit and do not push.

---

### Task 1: CMS text fallbacks

**Files:**
- Create: `lib/sanity/contentMerge.ts`
- Modify: `lib/sanity/queries.ts`
- Modify: `sanity/schemas/service.ts`
- Test: `tests/sanity-content-fallbacks.test.mjs`

**Interfaces:**
- Consumes: local `PageContent`, `SiteSettings`, and `Service` fallback records.
- Produces: `mergePageContent`, `mergeSiteSettings`, and `mergeServiceContent` with non-blank SEO and service description strings.

- [ ] Write tests proving null and whitespace-only page/site SEO text falls back, local service summary/description survive blank CMS values, and a CMS-only service derives a non-empty summary from its description.
- [ ] Run `node --test tests/sanity-content-fallbacks.test.mjs` and confirm assertions fail because the merge helpers do not exist.
- [ ] Implement the pure merge helpers, wire them into `queries.ts`, and require summary/description in the service schema.
- [ ] Re-run the focused test and confirm it passes.

### Task 2: Safe JSON-LD serialization

**Files:**
- Create: `components/jsonLdSerialization.ts`
- Modify: `components/JsonLd.tsx`
- Test: `tests/structured-data.test.mjs`

**Interfaces:**
- Produces: `serializeJsonLd(data: Record<string, unknown>): string`, replacing `<` with the JSON escape `\\u003c` before script insertion.

- [ ] Add a malicious `</script>` serialization test.
- [ ] Run the focused test and confirm the raw closing tag is present or the helper is missing.
- [ ] Implement and wire the serializer.
- [ ] Re-run the focused test and confirm it passes.

### Task 3: Broad lint coverage and literal placeholder classes

**Files:**
- Modify: `package.json`
- Modify: `eslint.config.mjs`
- Modify: `tests/lint-script.test.mjs`
- Modify: `tests/seo-metadata.test.mjs`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: exact lint command `eslint .`, ignoring only build outputs plus `.codex-temp/**` and `.playwright-cli/**`.

- [ ] Update the lint regression to require `eslint .` and both scratch ignores; narrow placeholder-copy checks to visible strings and require literal `video-placeholder` classes.
- [ ] Run both focused tests and confirm expected failures.
- [ ] Restore the lint command/config and literal class names.
- [ ] Re-run both focused tests and exact `pnpm lint`.

### Task 4: Metadata output behavior

**Files:**
- Modify: `tests/seo-metadata.test.mjs`
- Modify: `lib/seo.ts`

**Interfaces:**
- Produces: metadata objects with absolute and Open Graph titles branded exactly once, canonical route paths, and service search descriptions.

- [ ] Add direct helper-output tests, including a duplicated pipe-delimited clinic-name title.
- [ ] Run the focused metadata test and confirm the duplicate-title assertion fails.
- [ ] Normalize pipe-delimited title segments before adding the clinic brand.
- [ ] Re-run the focused test and confirm it passes.

### Task 5: Verification, report, and commit

**Files:**
- Create: `.superpowers/sdd/final-fix-report.md`

**Interfaces:**
- Produces: one commit and an evidence report with commands, results, RED/GREEN notes, files, and concerns.

- [ ] Run all Node tests, exact `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`.
- [ ] Review `git diff`, confirm scratch directories remain untracked, and record evidence in the report.
- [ ] Commit all intended files once; update the report with the resulting commit id and amend that same commit.

## Self-Review

- [x] Every review requirement maps to a task.
- [x] No placeholder steps remain.
- [x] Helper names and consumers are consistent across tasks.
