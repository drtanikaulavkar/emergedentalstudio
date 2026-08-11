# Logo-Only Brand Tiles Design

## Goal

Show only each brand logo in the brand sections on service pages. Remove the visible brand-name caption beneath every logo without reducing accessibility or crawler-readable context.

## Scope

- Update the shared brand-tile markup used by the dental implants and braces/aligners service pages.
- Remove the visible `brand.name` caption from each tile.
- Retain the existing descriptive image alt text, which includes the brand name, such as `Nobel Biocare logo`.
- Remove the now-unused caption styling.
- Preserve section headings, logo files, card layout, responsive behavior, and Sanity/fallback brand data.

## Implementation

The service page will continue to map over each brand and render its logo inside the existing tile container. The caption element will be deleted rather than visually hidden, avoiding duplicate announcements for screen-reader users. The image `alt` attribute remains populated from `brand.logoAlt`, so the brand name stays available to assistive technology and HTML-aware crawlers.

The tile dimensions and grid behavior remain unchanged. No CMS migration or content update is required because all seven brand records already contain descriptive alt text.

## Verification

- Confirm no visible brand-name caption is rendered beneath any of the seven logos.
- Confirm every rendered brand image has non-empty alt text containing its brand name.
- Run lint, relevant tests, and the production build.
- Inspect the implant and braces/aligners service pages at desktop and mobile widths.

