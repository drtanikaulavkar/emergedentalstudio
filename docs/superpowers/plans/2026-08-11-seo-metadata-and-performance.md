# SEO Metadata and Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct confirmed SEO metadata, sitemap, placeholder-copy, structured-data, and homepage LCP issues without removing or redesigning existing public sections.

**Architecture:** Centralize page metadata construction in `lib/seo.ts`, then have each public route provide its title, description, and canonical path. Keep content and performance corrections local to their existing pages/components, and reuse one exported social-profile list in both contact UI and Dentist JSON-LD.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Node's built-in test runner, CSS, Schema.org JSON-LD.

## Global Constraints

- Keep the Blogs page publicly accessible, linked, and indexable.
- Keep the homepage before/after section visible.
- Do not invent patient outcomes, testimonials, clinical claims, article content, or before/after results.
- Preserve the carousel, automatic slide changes, pause behavior, responsive crop, and reduced-motion support.
- Do not add ratings, prices, or treatment claims to structured data.
- Do not change booking, contact, navigation, service content, or Google Business Profile settings.
- Follow test-driven development: write each test first and observe the expected failure before production edits.

---

## File Map

- Create `lib/seo.ts`: shared metadata builder for canonical, title, description, and Open Graph values.
- Create `tests/seo-metadata.test.mjs`: source-level regression tests for metadata, sitemap, and interim copy.
- Create `tests/structured-data.test.mjs`: source-level regression tests for social-profile reuse and founder schema.
- Modify `app/layout.tsx`: retain default metadata and enrich Dentist JSON-LD.
- Modify `app/page.tsx`: use shared metadata and replace placeholder wording.
- Modify `app/about/page.tsx`: use shared metadata.
- Modify `app/services/page.tsx`: use shared metadata.
- Modify `app/contact/page.tsx`: use shared metadata and shared social profiles.
- Modify `app/blogs/page.tsx`: use shared metadata and professional interim wording.
- Modify `app/services/[slug]/page.tsx`: create local service metadata through the shared builder.
- Modify `app/sitemap.ts`: stop emitting false request-time update dates.
- Modify `components/HeroCarousel.tsx`: identify the initially visible slide for stable LCP styling.
- Modify `app/globals.css`: disable the long image transform only for the initial hero slide.
- Modify `lib/siteData.ts`: export the verified clinic social-profile list.
- Modify `package.json`: add focused SEO test commands.

---

### Task 1: Canonical and Page-Specific Metadata

**Files:**
- Create: `lib/seo.ts`
- Create: `tests/seo-metadata.test.mjs`
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/blogs/page.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: `buildPageMetadata(input: {title: string; description: string; path: string}): Metadata`
- Produces: `buildServiceMetadata(input: {title: string; summary: string; slug: string}): Metadata`
- Consumes: Next.js `Metadata` and route content already returned by Sanity helpers.

- [ ] **Step 1: Write the failing metadata tests**

Create `tests/seo-metadata.test.mjs` with these initial tests:

```js
import assert from "node:assert/strict";
import {existsSync, readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const read = (...parts) => readFileSync(resolve(root, ...parts), "utf8");

test("public routes use the shared canonical and Open Graph metadata builder", () => {
  const seoPath = resolve(root, "lib", "seo.ts");
  assert.equal(existsSync(seoPath), true, "lib/seo.ts should exist");

  const seo = read("lib", "seo.ts");
  assert.match(seo, /export function buildPageMetadata/);
  assert.match(seo, /alternates:\s*\{\s*canonical:\s*path/);
  assert.match(seo, /openGraph:\s*\{/);
  assert.match(seo, /url:\s*path/);
  assert.match(seo, /title:\s*\{absolute:\s*brandedTitle\}/);

  for (const route of [
    ["app", "page.tsx"],
    ["app", "about", "page.tsx"],
    ["app", "services", "page.tsx"],
    ["app", "contact", "page.tsx"],
    ["app", "blogs", "page.tsx"]
  ]) {
    assert.match(read(...route), /buildPageMetadata/);
  }
});

test("service metadata targets treatment searches in Indiranagar Bengaluru", () => {
  const seo = read("lib", "seo.ts");
  const servicePage = read("app", "services", "[slug]", "page.tsx");

  assert.match(seo, /export function buildServiceMetadata/);
  assert.match(seo, /\$\{title\} in Indiranagar, Bengaluru/);
  assert.match(seo, /Emerge Dental Studio in Indiranagar, Bengaluru/);
  assert.match(servicePage, /buildServiceMetadata\(\{/);
});

test("Blogs metadata does not duplicate the clinic name", () => {
  const blogs = read("app", "blogs", "page.tsx");
  assert.doesNotMatch(blogs, /title:\s*"Dental Blogs \| Emerge Dental Studio"/);
  assert.match(blogs, /title:\s*"Dental Blogs"/);
});
```

Add this script to `package.json`:

```json
"test:seo": "node --test tests/seo-metadata.test.mjs tests/structured-data.test.mjs"
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/seo-metadata.test.mjs`

Expected: FAIL because `lib/seo.ts` and shared metadata calls do not exist.

- [ ] **Step 3: Add the shared metadata builders**

Create `lib/seo.ts`:

```ts
import type {Metadata} from "next";

const clinicName = "Emerge Dental Studio";
const defaultImage = {url: "/images/emerge-logo.png", width: 671, height: 168};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildPageMetadata({title, description, path}: PageMetadataInput): Metadata {
  const brandedTitle = title.includes(clinicName) ? title : `${title} | ${clinicName}`;

  return {
    title: {absolute: brandedTitle},
    description,
    alternates: {canonical: path},
    openGraph: {
      title: brandedTitle,
      description,
      url: path,
      siteName: clinicName,
      images: [defaultImage],
      locale: "en_IN",
      type: "website"
    }
  };
}

export function buildServiceMetadata({title, summary, slug}: {title: string; summary: string; slug: string}): Metadata {
  return buildPageMetadata({
    title: `${title} in Indiranagar, Bengaluru`,
    description: `${summary} Available at Emerge Dental Studio in Indiranagar, Bengaluru.`,
    path: `/services/${slug}`
  });
}
```

- [ ] **Step 4: Route every public page through the helper**

For the homepage, About, Services, and Contact metadata functions, replace the returned object with:

```ts
return buildPageMetadata({
  title: page.seoTitle,
  description: page.seoDescription,
  path: "/"
});
```

Use `/about`, `/services`, and `/contact` respectively on the other routes.

For `app/blogs/page.tsx`, use:

```ts
export const metadata: Metadata = buildPageMetadata({
  title: "Dental Blogs",
  description: "Patient-friendly dental guides from Emerge Dental Studio in Indiranagar, Bengaluru, with new articles coming soon.",
  path: "/blogs"
});
```

For `app/services/[slug]/page.tsx`, return:

```ts
return buildServiceMetadata({title: service.title, summary: service.summary, slug: service.slug});
```

Import the appropriate helper in each route.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run: `node --test tests/seo-metadata.test.mjs`

Expected: all metadata tests PASS.

- [ ] **Step 6: Commit Task 1**

```powershell
git add -- package.json lib/seo.ts tests/seo-metadata.test.mjs app/page.tsx app/about/page.tsx app/services/page.tsx app/contact/page.tsx app/blogs/page.tsx 'app/services/[slug]/page.tsx'
git commit -m "fix: add canonical page metadata"
```

---

### Task 2: Honest Interim Copy and Accurate Sitemap Dates

**Files:**
- Modify: `tests/seo-metadata.test.mjs`
- Modify: `app/blogs/page.tsx`
- Modify: `app/page.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: the metadata tests and route files from Task 1.
- Produces: public interim wording without fabricated clinical evidence and a sitemap without unreliable update dates.

- [ ] **Step 1: Add failing copy and sitemap tests**

Append to `tests/seo-metadata.test.mjs`:

```js
test("interim content stays visible without public placeholder wording", () => {
  const home = read("app", "page.tsx");
  const blogs = read("app", "blogs", "page.tsx");

  assert.doesNotMatch(home, /placeholder/i);
  assert.doesNotMatch(blogs, /placeholder/i);
  assert.match(home, /will be added soon/i);
  assert.match(blogs, /are coming soon/i);
});

test("sitemap does not claim every page changed at request time", () => {
  const sitemap = read("app", "sitemap.ts");
  assert.doesNotMatch(sitemap, /lastModified:\s*new Date\(\)/);
  assert.doesNotMatch(sitemap, /lastModified:/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/seo-metadata.test.mjs`

Expected: FAIL on existing placeholder wording and `lastModified: new Date()`.

- [ ] **Step 3: Replace only interim wording**

In `app/blogs/page.tsx`, replace the hero paragraph with:

```tsx
<p>Patient-friendly guides on smile design, implants, prevention, and everyday dental care are coming soon.</p>
```

In `app/page.tsx`, use these honest interim labels:

```tsx
<Image src="/images/before-after/smile-before.svg" alt="Before-treatment gallery preview illustration" width={360} height={240} />
<Image src="/images/before-after/smile-after.svg" alt="After-treatment gallery preview illustration" width={360} height={240} />
```

```tsx
<p>New cosmetic, implant, and restorative treatment cases will be added soon.</p>
```

```tsx
<p>Short patient stories and treatment experience videos will be added soon.</p>
```

```tsx
<p>Planning, design, and final-smile walkthroughs will be added soon.</p>
```

- [ ] **Step 4: Remove unreliable sitemap dates**

Delete both `lastModified: new Date(),` entries from the static-route and service-route objects in `app/sitemap.ts`. Keep URLs, change frequencies, and priorities unchanged.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run: `node --test tests/seo-metadata.test.mjs`

Expected: all tests PASS.

- [ ] **Step 6: Commit Task 2**

```powershell
git add -- tests/seo-metadata.test.mjs app/blogs/page.tsx app/page.tsx app/sitemap.ts
git commit -m "fix: clarify interim content and sitemap dates"
```

---

### Task 3: Stable Initial Hero Image for LCP

**Files:**
- Modify: `tests/homepage-motion.test.mjs`
- Modify: `components/HeroCarousel.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `data-initial={index === 0}` on each carousel figure.
- Consumes: existing carousel slide order, CSS transitions, and motion preferences.

- [ ] **Step 1: Write the failing LCP stability test**

Append to `tests/homepage-motion.test.mjs`:

```js
test("initial hero image stays visually stable for LCP measurement", () => {
  assert.match(carousel, /data-initial=\{index === 0\}/);
  assert.match(css, /\.carousel-slide\[data-initial="true"\] img\s*\{[^}]*transform:\s*scale\(1\)[^}]*transition:\s*none/s);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/homepage-motion.test.mjs`

Expected: FAIL because the initial-slide hook and stable-image rule do not exist.

- [ ] **Step 3: Mark the initial slide**

Add this attribute to the `<figure>` in `components/HeroCarousel.tsx`:

```tsx
data-initial={index === 0}
```

- [ ] **Step 4: Stabilize only the first image**

Add after the active-image rule in `app/globals.css`:

```css
.carousel-slide[data-initial="true"] img {
  transform: scale(1);
  transition: none;
}
```

- [ ] **Step 5: Run carousel tests and verify GREEN**

Run: `node --test tests/homepage-motion.test.mjs`

Expected: all homepage motion tests PASS.

- [ ] **Step 6: Commit Task 3**

```powershell
git add -- tests/homepage-motion.test.mjs components/HeroCarousel.tsx app/globals.css
git commit -m "fix: stabilize initial hero LCP image"
```

---

### Task 4: Verified Social Profiles and Founder Structured Data

**Files:**
- Create: `tests/structured-data.test.mjs`
- Modify: `lib/siteData.ts`
- Modify: `app/contact/page.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `socialProfiles: ReadonlyArray<{label: "Instagram" | "Facebook" | "LinkedIn"; href: string}>` from `lib/siteData.ts`.
- Consumes: `doctor.name`, `doctor.role`, and `socialProfiles` in Dentist JSON-LD.

- [ ] **Step 1: Write the failing structured-data test**

Create `tests/structured-data.test.mjs`:

```js
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const siteData = readFileSync(resolve(root, "lib", "siteData.ts"), "utf8");
const contact = readFileSync(resolve(root, "app", "contact", "page.tsx"), "utf8");
const layout = readFileSync(resolve(root, "app", "layout.tsx"), "utf8");

test("verified social profiles are shared by contact UI and Dentist schema", () => {
  assert.match(siteData, /export const socialProfiles/);
  assert.match(siteData, /instagram\.com\/emergedentalstudio/);
  assert.match(siteData, /facebook\.com\/profile\.php\?id=100085397533519/);
  assert.match(siteData, /linkedin\.com\/company\/emerge-dental-studio/);
  assert.match(contact, /import \{[^}]*socialProfiles[^}]*\} from "@\/lib\/siteData"/s);
  assert.doesNotMatch(contact, /const socialLinks = \[/);
  assert.match(layout, /sameAs:\s*socialProfiles\.map/);
});

test("Dentist schema identifies Dr. Tanisha as founder and lead dentist", () => {
  assert.match(layout, /founder:\s*\{/);
  assert.match(layout, /"@type":\s*"Person"/);
  assert.match(layout, /name:\s*doctor\.name/);
  assert.match(layout, /jobTitle:\s*doctor\.role/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/structured-data.test.mjs`

Expected: FAIL because `socialProfiles`, `sameAs`, and `founder` are absent.

- [ ] **Step 3: Export and reuse verified profiles**

Move the existing Instagram, Facebook, and LinkedIn objects from `app/contact/page.tsx` into an exported `socialProfiles` constant in `lib/siteData.ts`, ending the array with `as const`. Import that constant into the contact page and rename the mapping reference from `socialLinks` to `socialProfiles`.

- [ ] **Step 4: Enrich Dentist JSON-LD**

Import `doctor` and `socialProfiles` into `app/layout.tsx`, then add:

```ts
sameAs: socialProfiles.map(({href}) => href),
founder: {
  "@type": "Person",
  name: doctor.name,
  jobTitle: doctor.role
},
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run: `node --test tests/structured-data.test.mjs`

Expected: both tests PASS.

- [ ] **Step 6: Commit Task 4**

```powershell
git add -- tests/structured-data.test.mjs lib/siteData.ts app/contact/page.tsx app/layout.tsx
git commit -m "feat: enrich clinic structured data"
```

---

### Task 5: Full Verification and Live-Output Checks

**Files:**
- Verify only; modify implementation files only if a check exposes a defect covered by this plan.

**Interfaces:**
- Consumes: all deliverables from Tasks 1-4.
- Produces: evidence that the complete SEO correction builds and renders correctly.

- [ ] **Step 1: Run all focused and existing tests**

Run:

```powershell
pnpm test:seo
pnpm test:homepage-motion
pnpm test:page-transition
pnpm test:impeccable-wrapper
```

Expected: every test PASS with no warnings or errors.

- [ ] **Step 2: Run static analysis and runtime checks**

Run:

```powershell
pnpm lint
pnpm verify:runtime
pnpm verify:sanity-keys
```

Expected: all commands exit 0.

- [ ] **Step 3: Build the production site**

Run: `pnpm build`

Expected: Next.js production build completes successfully and lists all public routes.

- [ ] **Step 4: Verify generated metadata and sitemap locally**

Start the production server and verify `/`, `/about`, `/services`, `/blogs`, `/contact`, `/services/dental-implants`, `/sitemap.xml`, and `/robots.txt`.

Confirm:

- Every checked page has one self-referencing canonical URL.
- Each page has page-specific Open Graph title, description, and URL.
- The Blogs title contains `Emerge Dental Studio` once.
- The sitemap contains no `<lastmod>` until real CMS timestamps are wired.
- The Blogs and homepage gallery remain visible and contain no public `Placeholder` wording.

- [ ] **Step 5: Run Lighthouse/PageSpeed where available**

Run a mobile homepage audit. Confirm LCP is recorded instead of returning `NO_LCP`. Record FCP, LCP, Speed Index, CLS, accessibility, best-practices, and SEO results. If the external service still fails independently of the local build, retain the passing source test and document the external limitation.

- [ ] **Step 6: Review the final diff**

Run:

```powershell
git status --short
git diff HEAD~4 -- app components lib tests package.json
```

Expected: only the files named in this plan changed; `.codex-temp/` and `.playwright-cli/` remain untouched and untracked.
