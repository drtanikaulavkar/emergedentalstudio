# Social Brand Icons Design

## Goal

Replace the generic external-link icons and visible platform text in the Contact page’s “Follow us” area with recognizable, clickable Instagram, Facebook, and LinkedIn icons.

## Interaction and Layout

- Keep the “Follow us” heading and the existing order: Instagram, Facebook, LinkedIn.
- Render three compact icon-only links in one wrapping row.
- Preserve the existing destination URLs and open each profile in a new tab.
- Give each link a descriptive accessible name: “Follow Emerge Dental Studio on Instagram”, “Follow Emerge Dental Studio on Facebook”, or “Follow Emerge Dental Studio on LinkedIn”.
- Use a 44-by-44-pixel target with a larger 24-pixel icon and compact 8-pixel internal padding, while preserving visible keyboard focus, hover feedback, and mobile wrapping.

## Icon Implementation

- Add a small local `SocialIcon` component that renders the three platform marks as inline SVG.
- Do not add a dependency or use raster assets.
- Use `currentColor` so the icons inherit the existing Contact-page color, hover, and focus styles.
- Mark the SVG as decorative because the link’s accessible label provides its meaning.

## Styling

- Keep the current pill-like surface, border, spacing, hover lift, and color treatment.
- Make each link square, enlarge each brand mark to 24 pixels, and remove the visible platform text.
- Avoid platform-specific multicolor styling so the controls remain consistent with the Emerge Dental Studio brand.

## Verification

- Update the Contact-page regression test first and confirm it fails against the generic icon implementation.
- Confirm all three `SocialIcon` variants render and the old generic `ExternalLink` social icon is removed.
- Run the focused Contact-page test, the full test suite, lint for changed files, and a production build.
- Inspect the Contact page at desktop and mobile widths.
- Commit the change and push `main` to GitHub without including unrelated untracked folders.
