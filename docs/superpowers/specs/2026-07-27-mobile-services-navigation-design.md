# Mobile Services Navigation Design

## Goal

Make the Services navigation deterministic on touch devices while preserving convenient mouse hover and keyboard access. A service selection must navigate exactly once and give immediate visual feedback even when the destination route is still rendering.

## Interaction Model

- Tap, click, Enter, and Space toggle the Services disclosure.
- Pointer hover may open and close the disclosure only when the event came from a mouse.
- Touch and pen pointer transitions never change disclosure state.
- Escape, an outside pointer press, and selecting a service close the disclosure.
- Selecting a service closes on `click`, not `pointerdown`, so the link activation cannot lose its target.
- The disclosure uses `aria-expanded` and `aria-controls`. Its destinations remain ordinary navigation links rather than ARIA application-menu items.

## Responsive and Accessibility Requirements

- Preserve the existing desktop and mobile visual treatment.
- Give the Services trigger and service links a minimum 44px touch target on narrow viewports.
- Keep the dropdown within the mobile viewport and allow it to scroll when its contents exceed available height.
- Retain visible focus styling and Escape/outside-click behavior.

## Navigation Feedback

Add a route-level loading state for individual service pages. It should reuse the existing treatment-page visual language, be announced as status, avoid layout jumps, and honor reduced-motion preferences.

## Regression Coverage

Automated source-level tests must fail against the current regression and verify:

- click toggles rather than always opening;
- hover handlers ignore non-mouse pointer types;
- focus does not independently open the disclosure;
- links close on click and retain normal `href` navigation;
- disclosure semantics use `aria-controls`;
- a service-detail loading state exists.

## Out of Scope

- Replacing the full navigation with a hamburger drawer.
- Changing service copy or Sanity schemas.
- Applying CMS performance changes before the Sanity audit is reviewed.
