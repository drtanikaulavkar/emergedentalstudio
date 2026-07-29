# Static “Why Choose Us” Cards

## Goal

Make every card in the homepage “Why Choose Us” section appear and remain static because the cards are informational rather than interactive.

## Scope

- Keep the existing card layout, content, spacing, colors, borders, and resting shadows.
- Remove the grid’s `motion-sequence` class so the cards do not use the shared entry reveal.
- Remove transitions from the cards, their icon containers, and their icon paths.
- Remove the section-specific hover and focus-within styles that lift the cards, add a shadow, recolor or scale icons, or scale icon paths.
- Leave motion and interaction styles elsewhere on the website unchanged.

## Accessibility

The cards remain semantic `article` elements and expose no misleading pointer or keyboard interaction. Removing `focus-within` styling is safe because the cards contain no focusable controls.

## Verification

- Add a focused source-level regression test that initially fails while the animation hooks and effects remain.
- Confirm the test passes after the clean removal.
- Run the project’s relevant test, lint, and build checks.
- Inspect the final diff to ensure only the intended section and its regression coverage changed.
