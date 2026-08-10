# Compact Mobile Navbar

## Goal

Reduce the visible height of the mobile navbar without reducing the Services control's 44px touch target.

## Approved Design

- Keep the Services button itself at a 44px minimum height for comfortable touch use.
- Use equal negative block margins on the transparent button box so its outer layout footprint matches the approximately 24px-high text links.
- Keep the button's text and caret visually aligned with Home, About, Blogs, and Contact.
- Reposition the Services underline within the retained touch box so its active and focus state aligns with the other navbar underlines.
- Preserve the existing two-row mobile header, logo, WhatsApp action, dropdown behavior, keyboard behavior, and desktop layout.

## Accessibility

The actual Services `button` remains at least 44px tall, so its touch target is not reduced. The surrounding navigation has visible overflow and enough existing space above and below the row for the target to extend without clipping or overlapping another control.

## Verification

- Add a source-level regression assertion for the 44px minimum height, compacting margins, and mobile underline position.
- Run the focused navigation test before and after implementation to establish a red-green cycle.
- Run the full test suite, ESLint, and production build.
- Measure the rendered mobile header, nav row, Services button, and neighboring links at a 390px viewport.
