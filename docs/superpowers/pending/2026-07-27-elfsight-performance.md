# Elfsight Reviews Performance — Pending Work

**Status:** Deferred by product decision on 2026-07-27.

**Current scope:** Do not change or remove Elfsight while completing the active Lighthouse remediation work. The current integration in `app/page.tsx` remains in place.

## Why This Is Deferred

The homepage currently loads the Elfsight Google Reviews widget with a `lazyOnload` script. It provides valuable social proof, but it is also the largest third-party performance cost found in the mobile Lighthouse audit.

Controlled local production audits produced the following comparison:

| Homepage audit | Performance | LCP | Total blocking time | Unused JavaScript |
| --- | ---: | ---: | ---: | ---: |
| Elfsight enabled | 37 | 13.4 s | 2.15 s | 283 KiB |
| Elfsight domains blocked | 64 | 5.7 s | 0.53 s | 72 KiB |

The controlled test indicates that Elfsight accounts for roughly 216 KiB of the unused JavaScript and about 1.62 seconds of blocking time under Lighthouse mobile throttling. It magnifies the separate hero-carousel LCP problem but is not its sole cause.

## Lighthouse Findings to Revisit

- Three third-party cookies are created: `__cf_bm`, `_cfuvid`, and `elfsight_viewed_recently`.
- Elfsight's Google Reviews bundle transfers roughly 500 KiB and has a short one-hour cache lifetime.
- The widget triggers forced layout work in its own JavaScript.
- Widget-generated review dates and the “Free Google Reviews Widget” link fail WCAG AA color contrast.
- A reviewer avatar is oversized and not served in an efficient modern format.
- Chrome reports third-party cookie issues in the DevTools Issues panel.
- The third-party widget code cannot be fully controlled, so accessibility and performance regressions may return after vendor updates.

## Preferred Future Direction

Replace the runtime widget with server-rendered testimonial cards sourced from the existing `siteSettings.testimonials` content in Sanity and the matching local fallback data.

This option preserves patient social proof while removing runtime third-party JavaScript, third-party cookies, vendor-controlled contrast, and most widget layout work. Review attribution and a link to the clinic's Google reviews should remain visible.

## Alternative Direction

Keep an initially server-rendered review summary and load Elfsight only after an explicit “Load live Google reviews” action. This retains the live widget while preventing it from affecting initial page load or setting third-party cookies before the visitor requests it.

## Pending Implementation Steps

1. Confirm the review content, author names, ratings, dates, and Google attribution that may be stored and displayed from Sanity.
2. Decide between server-rendered testimonials and explicit click-to-load Elfsight.
3. Write tests covering accessible review-card markup, Google attribution, empty CMS data, and the local fallback.
4. Build a focused reviews component rather than keeping vendor markup inside `app/page.tsx`.
5. If using Sanity testimonials, remove the Elfsight script and widget container.
6. If using click-to-load, ensure no Elfsight request or cookie occurs before activation and provide loading and failure states.
7. Verify WCAG AA contrast, keyboard behavior, reduced motion, and responsive layout.
8. Rebuild the production site and rerun mobile Lighthouse on the homepage at least three times.

## Future Acceptance Criteria

- Homepage review content remains useful without JavaScript.
- No third-party review request or cookie occurs during initial page load.
- Review text and attribution meet WCAG AA contrast.
- The homepage produces no Elfsight-related console, cookie, cache, image-delivery, or forced-reflow findings.
- Median mobile Lighthouse total blocking time improves materially from the current 2.15-second baseline.
- The homepage remains functional when Sanity is unavailable by using complete local fallback testimonials.
