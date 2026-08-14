# Emerge Dental Studio Website

This repository contains the Next.js 16 App Router website for Emerge Dental Studio, with Sanity CMS for editable site content.

## Project Structure

- `app/` - Next.js routes, layouts, SEO metadata, sitemap, robots, and Sanity Studio route.
- `components/` - Shared UI components such as the header, footer, service cards, and WhatsApp booking form.
- `lib/` - Local fallback content, Sanity client setup, query helpers, and image helpers.
- `sanity/schemas/` - Sanity document schemas for site settings, pages, and services.
- `public/images/` - Local optimized source assets used by `next/image`.
- `scripts/seed-sanity.mjs` - Optional Sanity seed script for the empty CMS project.

## First-Time Setup

1. Copy `.env.example` to `.env.local`.
2. Confirm the Sanity project ID is `el8er4wl` and dataset is `production`.
3. Run `pnpm install`.
4. Run `pnpm dev`.
5. Open the website at `http://localhost:3000` and the Studio at `http://localhost:3000/studio`.

For normal ongoing development after setup, run only `pnpm dev` unless dependencies or environment configuration changed.

## Development Workflow

Use the smallest workflow proportional to the change. This section is the authoritative repository workflow and overrides generic process skills when they would add unnecessary ceremony.

### Fast Path - Default

For clear, localized, low-risk changes such as copy, styling, spacing, typography, images, metadata, or a small component fix:

1. Inspect only the relevant files and current diff.
2. Make the change directly in the current workspace.
3. Run the smallest relevant check.
4. Inspect the final diff and report the result.

Do not require a design document, implementation plan, worktree, subagent, new automated test, commit, or additional user approval unless the user explicitly requests one or the change presents material ambiguity or risk. Do not ask clarifying questions when the request and local context support a safe, reasonable interpretation.

### Planned Path

Use a written design or implementation plan only for architectural, multi-system, security-sensitive, destructive, or substantially ambiguous work. Keep small plans in the conversation. Create persistent plan or specification files only when the user explicitly asks for them.

### Impeccable UI Workflow

Impeccable remains part of this repository's design toolkit. Use it when the user asks to audit, critique, redesign, polish, or substantially improve an interface, or when a meaningful UI change benefits from its design guidance. Small targeted visual edits still use the fast path: apply the relevant Impeccable principles without requiring a separate critique artifact, design specification, or implementation plan.

### Testing and Verification

Match verification to the change:

- Copy or content: inspect the affected rendered or generated output.
- CSS or visual changes: check the affected responsive views; do not add source-text tests for exact styling values solely to satisfy process.
- Localized logic: run the focused relevant test.
- Shared logic, routing, dependencies, configuration, or CMS schemas: run focused tests, lint, type checking, and a production build as relevant.
- Before pushing: inspect the intended diff and run any relevant checks not already run against the exact tree being pushed.

Add regression tests when they protect meaningful behavior or a known failure mode. Test-first development is optional for clear, low-risk changes and expected for complex logic or important bug fixes where observing the failure adds confidence.

Run each relevant check once against the exact commit tree that will be delivered. Do not repeat checks after a clean fast-forward or other operation that leaves the verified tree unchanged. Repeat verification only when the final tree changes.

### Workspace and Git

Work in the current workspace by default. Use a worktree only when the user requests isolation or parallel work creates a real conflict risk. Do not create commits unless the user asks to commit, push, or otherwise requests a Git operation.

### Historical Documents

Files under `docs/backlog/` are reference material, not active implementation instructions. Read them only when the current task directly concerns the documented work or the user explicitly references them.

## Git and GitHub Workflow

When the user asks to "push to git", "push to GitHub", "push the changes", or similar, treat that as a request to integrate the intended changes into the `main` branch and push `main` to the GitHub remote. Do not leave the work only on a feature branch unless the user explicitly asks for a branch or pull request instead.

Before merging or pushing, verify the intended diff, avoid including unrelated local changes, run the relevant checks once against the exact tree being pushed, and make sure the pushed history contains the user-requested files. Do not rerun unchanged verification after a clean fast-forward.

## Architecture and Design Context for LLMs

- App routes live in `app/` and use the Next.js App Router. `app/layout.tsx` fetches site settings and services, then renders the shared `Header`, JSON-LD, page content, and `Footer`.
- Most routes are server components that call helpers from `lib/sanity/queries.ts`. Those helpers prefer published Sanity content but fall back to local data from `lib/siteData.ts`, so keep fallback content complete when adding or changing CMS-backed fields.
- Shared UI belongs in `components/`. Route-specific styles can use local CSS modules, but the main visual system, layout utilities, responsive behavior, and motion rules currently live in `app/globals.css`.
- Sanity schema changes belong in `sanity/schemas/` and should stay aligned with the TypeScript data shapes in `lib/siteData.ts` and the GROQ projections in `lib/sanity/queries.ts`.
- Product and brand direction lives in `PRODUCT.md`: fresh, modern, energetic, confident, human, and not a sterile corporate hospital template.
- Maintain WCAG AA as the accessibility baseline. Preserve clear focus states, readable type, large touch targets, responsive layouts, and reduced-motion support when adding visual polish or animation.
- For agent context, `AGENTS.md` gives architecture and workflow rules, `PRODUCT.md` gives audience and design intent, and `docs/source/website-services.md` is source copy rather than implementation guidance.

## Sanity Content Model

- `siteSettings` controls the clinic name, contact details, hours, booking links, logo, and testimonials.
- `page` controls editable text and SEO metadata for static pages.
- `service` controls service titles, slugs, descriptions, benefits, process sections, and service images.

The site includes local fallback content so pages render before CMS content is published. Once Sanity has content, the frontend will prefer published CMS data.

## Seeding Sanity

Set `SANITY_API_WRITE_TOKEN` in `.env.local`, then run:

```bash
pnpm sanity:seed
```

This creates site settings and service documents from the current website draft content.
