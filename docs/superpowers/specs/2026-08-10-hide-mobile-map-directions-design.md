# Hide Mobile Map Directions Overlay

## Goal

Hide the contact page's overlaid **Get directions** link on smaller screens while preserving its current appearance and behavior on larger screens.

## Design

- Reuse the site's existing `@media (max-width: 560px)` responsive breakpoint.
- Set `.contact-map-link` to `display: none` inside that media query.
- Do not add JavaScript, a new breakpoint, or changes to the map, address link, or desktop overlay.

## Accessibility

On smaller screens, `display: none` removes the overlaid link from both visual presentation and keyboard navigation. The separate address link in the contact details remains available for directions.

## Verification

- Confirm the overlay is absent at a viewport width of 560px or less.
- Confirm the overlay remains visible above 560px.
- Run the project lint check.

