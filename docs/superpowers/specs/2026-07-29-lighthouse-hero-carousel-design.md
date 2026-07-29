# Lighthouse Hero Carousel Design

## Goal

Preserve the homepage's immediate autoplaying photo carousel while preventing later slides from replacing the first slide as the Largest Contentful Paint candidate.

## Approved Behavior

- Autoplay begins on page load and advances every four seconds.
- The carousel does not pause merely because the pointer hovers over it or keyboard focus enters it.
- Visitors can explicitly stop or restart autoplay with a control that is visually hidden until it receives keyboard focus.
- When the operating system requests reduced motion, autoplay remains stopped and slide transitions are suppressed.
- Elfsight is unchanged and remains deferred to `docs/superpowers/pending/2026-07-27-elfsight-performance.md`.

## Rendering Strategy

All three slide images remain in the DOM as equal-sized layers. Their declared intrinsic dimensions match the source photographs' shared 4:3 aspect ratio. Only opacity changes during a slide transition; neither the slide nor its image scales or changes layout.

The first image is eager, preloaded, and assigned high fetch priority. Later images use low fetch priority and lazy loading so they do not compete with the initial LCP resource.

## Accessible Rotation Control

The stop/start button is the first interactive element inside the carousel. Its accessible name reflects the available action:

- `Stop automatic slide show` while autoplay is running.
- `Start automatic slide show` while autoplay is stopped.

The button uses the standard visually-hidden pattern at rest. `:focus-visible` restores its dimensions and paints a compact, high-contrast control over the hero. This keeps it absent from normal pointer viewing while making it discoverable to keyboard users.

## Testing

Static regression tests will verify:

- Immediate four-second autoplay remains present.
- Pointer and focus events do not implicitly pause rotation.
- Reduced motion and explicit user pause are the only pause conditions.
- The stop/start button exposes its state and accessible action.
- The first image is high priority and later images are low priority.
- Every image declares the same 4:3 intrinsic dimensions.
- Slide CSS changes only opacity and contains no per-slide or per-image scaling.
- The control is visually hidden until `:focus-visible`.

After unit checks, lint, and a production build, the homepage will be audited with Lighthouse mobile conditions. The report must contain an LCP value, and repeated runs will be compared with the previous 13.4-second baseline. Elfsight findings are expected to remain because they are explicitly out of scope.

