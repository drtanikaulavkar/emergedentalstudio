# Service Images and Brand Logos Design

## Goal

Replace the three generic service illustrations and seven simulated brand logos with real local assets, while keeping the Next.js fallback content and published Sanity content aligned.

## Service photography

Copy the user-supplied 1080 × 1080 JPEGs into `public/images/` without recompression:

| Service | Source | Destination |
| --- | --- | --- |
| Full Mouth Rehabilitation | `C:\Users\Dr Tanisha\Desktop\Website 2025\Website\FMR.jpg` | `public/images/service-full-mouth-rehab.jpg` |
| Extractions & Impactions | `C:\Users\Dr Tanisha\Desktop\Website 2025\Website\Extraction.jpg` | `public/images/service-extractions.jpg` |
| Teeth Cleaning & Whitening | `C:\Users\Dr Tanisha\Desktop\Website 2025\Website\Whitening 1.jpg` | `public/images/service-cleaning-whitening.jpg` |

Existing `object-fit: cover` presentation will crop the square photographs responsively. The original source files remain unchanged.

## Brand logos

Download the current logo artwork exposed by each brand's official website and store it locally under `public/images/brands/`. Use native source formats where practical and do not hotlink production pages to third-party URLs.

| Brand | Local destination | Official source |
| --- | --- | --- |
| DIO Implant | `dio-implants-official.svg` | DIO Implant website |
| OSSTEM Implant | `osstem-official.png` | OSSTEM Implant website application asset |
| Nobel Biocare | `nobel-biocare-official.webp` | Nobel Biocare trademark page asset |
| Neodent | `neodent-official.svg` | Straumann/Neodent shared brand asset |
| Invisalign | `invisalign-official.svg` | Invisalign website asset |
| Damon | `damon-official.webp` | Ormco Damon product asset |
| Illusion Aligners | `illusion-aligners-official.png` | Illusion Aligners website asset |

The logo section identifies products used by the clinic. It must not add endorsement, certification, or affiliation claims.

## Content integration

Update `lib/siteData.ts` so all fallback image paths point to the new local files. Update the corresponding published Sanity service documents so CMS content does not override the new fallback paths with the old placeholders.

## Validation

- Every configured `/images/...` path must resolve to a non-empty file.
- The three copied JPEGs must retain the source hashes.
- Logo responses and local files must have valid SVG, PNG, or WebP signatures.
- ESLint and the production Next.js build must complete successfully.
- A fresh Sanity query must return the new service-photo and logo paths.

