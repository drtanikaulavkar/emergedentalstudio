# Service Card Readability Design

## Goal

Make homepage service cards easier to read while keeping one shared carousel implementation and aligning the text content across every card.

## Responsive layout

- Phones show one generous card with a small portion of the next card visible as a swipe cue.
- Tablets show two cards.
- Desktop and wide desktop show four cards.
- The existing line indicator, mobile swipe behavior, and desktop arrow controls remain.
- The section action is a lightweight text-and-arrow link rather than a bordered button.
- The action sits close to the page indicator with only 4px of top spacing.

## Card rhythm

Every carousel card uses the same content grid: service label, a single-line title row, and a reserved three-line description row. Shorter descriptions receive deliberate breathing room rather than pulling subsequent content upward. The card padding and type sizes increase slightly at every breakpoint while the services directory remains unchanged.

## Accessibility and scope

The complete card remains one semantic link. The lightweight section action retains a 44px tap area and visible keyboard focus. Existing reduced-motion behavior, descriptions, images, and carousel labels remain intact. Only the homepage carousel presentation changes.

## Verification

Source-level regression tests cover the shared row sizing, typography, and 1/2/4 responsive widths. Browser checks cover a phone, tablet, desktop, horizontal overflow, next-card cue, and dynamic indicator count.
