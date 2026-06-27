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
