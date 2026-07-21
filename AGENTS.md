# Emerge Dental Studio Website

This repository contains the Next.js 14 App Router website for Emerge Dental Studio, with Sanity CMS for editable site content.

## Project Structure

- `app/` - Next.js routes, layouts, SEO metadata, sitemap, robots, and Sanity Studio route.
- `components/` - Shared UI components such as the header, footer, service cards, and WhatsApp booking form.
- `lib/` - Local fallback content, Sanity client setup, query helpers, and image helpers.
- `sanity/schemas/` - Sanity document schemas for site settings, pages, and services.
- `public/images/` - Local optimized source assets used by `next/image`.
- `scripts/seed-sanity.mjs` - Optional Sanity seed script for the empty CMS project.

## Local Development

1. Copy `.env.example` to `.env.local`.
2. Confirm the Sanity project ID is `el8er4wl` and dataset is `production`.
3. Run `pnpm install`.
4. Run `pnpm dev`.
5. Open the website at `http://localhost:3000` and the Studio at `http://localhost:3000/studio`.

## Git and GitHub Workflow

When the user asks to "push to git", "push to GitHub", "push the changes", or similar, treat that as a request to integrate the intended changes into the `main` branch and push `main` to the GitHub remote. Do not leave the work only on a feature branch unless the user explicitly asks for a branch or pull request instead.

Before merging or pushing, verify the intended diff, avoid including unrelated local changes, run the relevant checks, and make sure the pushed history contains the user-requested files.

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
