# Service Images and Brand Logos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace three service illustration placeholders and seven simulated brand logos with verified local assets.

**Architecture:** Static assets remain in `public/images`, local fallback references remain in `lib/siteData.ts`, and published Sanity service records mirror the same paths. No third-party asset is hotlinked at runtime.

**Tech Stack:** Next.js App Router, TypeScript, Sanity CMS, static SVG/PNG/WebP/JPEG assets.

## Global Constraints

- Preserve the three user-supplied JPEG files byte-for-byte.
- Fetch logo artwork only from the corresponding brand's official web property.
- Keep local fallback content and published Sanity content aligned.
- Do not modify unrelated working-tree changes.

---

### Task 1: Install service photographs

**Files:**
- Create: `public/images/service-full-mouth-rehab.jpg`
- Create: `public/images/service-extractions.jpg`
- Create: `public/images/service-cleaning-whitening.jpg`
- Modify: `lib/siteData.ts`

**Interfaces:**
- Consumes: Three user-supplied 1080 × 1080 JPEG files.
- Produces: Three local `/images/service-*.jpg` paths used by service cards and service detail heroes.

- [ ] **Step 1: Record source hashes**

Run `Get-FileHash` for the three supplied JPEG files and retain the SHA-256 values for comparison.

- [ ] **Step 2: Copy the source files**

Copy each source to its exact destination filename without transcoding or metadata changes.

- [ ] **Step 3: Update fallback paths**

Change the Full Mouth Rehabilitation, Extractions & Impactions, and Teeth Cleaning & Whitening `imageSrc` values in `lib/siteData.ts` from `.svg` to `.jpg`.

- [ ] **Step 4: Verify byte identity**

Run `Get-FileHash` on sources and destinations. Expected: each source and destination pair has the same SHA-256 hash.

### Task 2: Install official brand artwork

**Files:**
- Create: `public/images/brands/dio-implants-official.svg`
- Create: `public/images/brands/osstem-official.png`
- Create: `public/images/brands/nobel-biocare-official.webp`
- Create: `public/images/brands/neodent-official.svg`
- Create: `public/images/brands/invisalign-official.svg`
- Create: `public/images/brands/damon-official.webp`
- Create: `public/images/brands/illusion-aligners-official.png`
- Modify: `lib/siteData.ts`

**Interfaces:**
- Consumes: Official brand asset responses.
- Produces: Seven locally served logo paths.

- [ ] **Step 1: Fetch official assets**

Download each approved source into its exact destination. Decode the OSSTEM logo embedded by the official OSSTEM application bundle.

- [ ] **Step 2: Validate file signatures**

Confirm SVG files begin with XML/SVG markup, PNG files have the `89 50 4E 47` signature, and WebP files begin with `RIFF` and contain `WEBP`.

- [ ] **Step 3: Update fallback brand paths**

Replace the seven placeholder `logoSrc` values in `lib/siteData.ts` with the new official filenames.

### Task 3: Synchronize Sanity

**Files:**
- Modify externally: Published `service` documents in Sanity dataset `production`.

**Interfaces:**
- Consumes: Updated local `imageSrc` and `brands[].logoSrc` values.
- Produces: Published CMS records that return the same paths as local fallback content.

- [ ] **Step 1: Patch affected service documents**

Patch service documents for `full-mouth-rehabilitation`, `extractions-impactions`, `teeth-cleaning-whitening`, `dental-implants`, and `braces-aligners`.

- [ ] **Step 2: Query published values**

Fetch the affected service documents and compare every returned path with `lib/siteData.ts`. Expected: all paths match.

### Task 4: Verify the website

**Files:**
- Test: all modified assets and references.

**Interfaces:**
- Consumes: Completed Tasks 1–3.
- Produces: Evidence that the site compiles and every configured image exists.

- [ ] **Step 1: Verify configured image paths**

Extract every `/images/...` reference from application source and assert its corresponding file exists and is non-empty.

- [ ] **Step 2: Run lint**

Run `pnpm lint`. Expected: exit code 0.

- [ ] **Step 3: Run production build**

Run `pnpm build`. Expected: exit code 0 and all routes generated successfully.

