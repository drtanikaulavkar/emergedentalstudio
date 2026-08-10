# Homepage Section Consistency Design

## Purpose

Make the homepage feel visually uniform on desktop by separating full-width section surfaces from constrained content containers, reducing the number of background treatments, and establishing a deliberate vertical rhythm.

The refreshed composition must preserve Emerge Dental Studio's fresh, confident identity without turning the page into either a striped landing-page template or a flat, undifferentiated canvas.

## Approved Direction

Use an anchored-rhythm composition:

- Keep the hero as a full-bleed photographic opening.
- Use one continuous light canvas for Services, Facilities, Reviews, Gallery, and FAQ.
- Keep the Doctor section as a full-width dark brand anchor.
- Keep the Contact section as a full-width dark closing anchor.
- Distinguish neighboring light sections with spacing, layout, and selective dividers rather than additional background colors.

The Reviews section does not receive a special background color. Its heading, rating summary, and review cards already provide enough internal differentiation.

## Page Sequence

1. Hero — full-bleed photography
2. Services — light canvas
3. Doctor — dark plum anchor
4. Facilities / Why Choose Us — light canvas
5. Reviews — light canvas
6. Gallery — light canvas
7. FAQ — light canvas
8. Contact — dark plum closing anchor

## Section Architecture

Every non-hero homepage section must use the same two-layer structure:

1. A full-width outer section owns the semantic section, background, vertical padding, and section-level modifiers.
2. A nested `.container` owns the maximum content width and horizontal gutters.

The `.container` must never own a homepage section background. At desktop widths above 1180px, the outer section continues edge to edge while the content remains centered and readable.

The existing `.container` maximum width remains 1180px. This task does not widen the site's content grid.

## Surface System

The homepage uses three visual surface roles:

### Hero surface

- Existing full-bleed carousel imagery and overlay.
- No change to carousel behavior, captions, or booking call to action.

### Light canvas

- Services, Facilities, Reviews, Gallery, and FAQ share the same page-level light background.
- Remove section-specific translucent white and lavender fills from these outer sections.
- Do not introduce replacement tints, gradients, inset panels, or boxed section backgrounds.
- Cards and media within a section may retain their existing component-level surfaces where needed for legibility.

### Dark anchors

- Doctor retains the established plum-led dark treatment.
- Contact retains a plum-led dark treatment but should read as part of the same dark surface family as Doctor.
- The two dark sections may use different gradient direction or intensity where content legibility requires it, but they must share the same core plum palette and comparable visual weight.

## Section Boundaries and Rhythm

Color changes are not used to mark every section boundary. The light run relies on a controlled spacing rhythm:

- Use a shared fluid section-padding rule for ordinary light sections.
- Use tighter spacing where two sections are conceptually related and more generous spacing before a major narrative shift.
- Add a subtle horizontal divider between Gallery and FAQ because they are adjacent, content-dense light sections with no background change.
- Do not add dividers between every light section.
- Preserve clear heading-to-content grouping inside each section.

The intended rhythm is:

- Services: generous standalone treatment after the hero.
- Doctor: strong dark interruption and authority moment.
- Facilities through Reviews: steady light-content sequence.
- Gallery and FAQ: related lower-page information sequence, separated by one restrained divider.
- Contact: decisive dark conclusion.

## Height Behavior

Remove viewport-height minimums from Services, Doctor, and Contact on desktop. These sections must size from their content plus shared fluid padding.

Requirements:

- No ordinary homepage section should contain large empty areas solely to fill the viewport.
- Doctor must remain visually substantial because it is a brand anchor, but its height must be content-driven.
- Contact must fully contain the contact card and map without forcing an additional near-empty viewport.
- Existing mobile rules that already remove these minimum heights should be simplified where they become redundant.

## Responsive Behavior

### Desktop, 1280px and wider

- All outer section backgrounds span the full viewport width.
- All inner content aligns to the same 1180px container system.
- No centered colored rectangle may end at the container edge.
- Section spacing must remain balanced at 1280px, 1440px, and 1920px.

### Tablet, 561px to 920px

- Preserve the existing single-column transitions for split layouts.
- Maintain full-width outer surfaces and consistent inner gutters.
- Avoid oversized vertical gaps after removing desktop minimum heights.

### Mobile, 560px and below

- Preserve the existing stacking order and touch targets.
- Maintain the same surface sequence as desktop.
- Use the existing compact mobile section spacing as the starting point, consolidating overrides only where behavior remains unchanged.

## Content and Interaction Constraints

This task does not change:

- Homepage copy or section order.
- Hero carousel slides, timing, or caption animation.
- Services carousel behavior or service selection.
- Doctor biography content.
- Facilities cards or icons.
- Elfsight reviews integration.
- Gallery placeholder content.
- FAQ questions, answers, or accordion behavior.
- Contact details, map, hours, links, or booking destinations.
- Header, footer, or floating WhatsApp behavior.

## Accessibility and Performance

- Maintain WCAG AA contrast on both light and dark surfaces.
- Preserve visible keyboard focus styles and minimum 44px interactive targets.
- Preserve reduced-motion behavior.
- Do not add new dependencies, runtime JavaScript, decorative images, or animation solely for this visual correction.
- Background and layout changes must remain CSS-driven.

## Implementation Scope

Expected modifications are limited to:

- `app/page.tsx` for consistent outer-section and inner-container structure.
- `app/globals.css` for homepage surface roles, section spacing, height behavior, and responsive cleanup.
- `tests/homepage-section-structure.test.mjs`, a focused regression test that prevents homepage section backgrounds from being assigned to `.container` elements again.

No Sanity schema, query, data, shared component API, or content migration is required.

## Verification

Implementation is complete only when all of the following are true:

- Services, Facilities, Reviews, Gallery, and FAQ appear on one continuous light canvas.
- Reviews has no section-specific background color.
- Doctor and Contact remain full-width dark anchors.
- Every non-hero homepage section uses a full-width wrapper with a nested `.container`.
- At 1920px, no section background stops at the 1180px container boundary.
- Services, Doctor, and Contact no longer force near-viewport-height canvases.
- Gallery and FAQ are distinguished by spacing and one subtle divider.
- Existing homepage content and interactive behavior remain unchanged.
- The page has no horizontal overflow at 360px, 560px, 920px, 1280px, 1440px, or 1920px.
- Lint, existing homepage tests, and a production build pass.
- Desktop and mobile screenshots confirm consistent section alignment, background continuity, and vertical rhythm.

## Non-Goals

- Redesigning cards, typography, navigation, buttons, or imagery.
- Rewriting content or changing conversion strategy.
- Reordering or removing homepage sections.
- Replacing the reviews provider or map embed.
- Creating a site-wide dark mode or new theme-switching system.
- Refactoring unrelated global styles.

## Risks and Mitigations

- **Risk:** Removing tinted section backgrounds may reduce perceived separation.
  - **Mitigation:** Use shared spacing and the single Gallery-to-FAQ divider; rely on each section's heading and internal layout for hierarchy.

- **Risk:** Removing viewport minimum heights may make dark anchors feel too small.
  - **Mitigation:** Retain generous fluid padding and verify the Doctor and Contact sections visually at all desktop widths.

- **Risk:** Changing wrapper structure may affect section-specific selectors.
  - **Mitigation:** Keep existing section class names on outer wrappers and verify descendant selectors, carousel sizing, grid layouts, and responsive rules.

- **Risk:** The third-party reviews widget may visually dominate the unified light canvas.
  - **Mitigation:** Preserve its internal cards and spacing, but do not add a compensating section tint unless a verified legibility issue appears.
