# Premium Visual System Design

## Intent

Emerge Dental Studio should feel like a specialist dental atelier: precise, personal, image-led, and quietly confident. It must not resemble a generic blue-and-white clinic template or a decorative luxury brand that happens to mention dentistry.

The design uses the existing Manrope family with deliberate weight contrast:

- Headings: Manrope ExtraBold
- Body: Manrope Medium
- Buttons and compact labels: Manrope SemiBold

The supplied palette remains the single source of truth:

- Orchid `#A763AE`: primary action and brand signal
- Lavender `#B19AC8`: atmosphere and section tint
- Plum `#463F64`: text and dark immersive sections
- Sage `#A1BE91`: reassurance, supporting highlights, and positive states
- Bronze `#5E3E07`: selective warm contrast for high-value actions

## Visual Direction

Use a "specialist dental atelier" reference: the precision and material restraint of a bespoke studio combined with warm, real clinic photography. Full-bleed imagery carries the first impression. Crisp type, thin rules, a limited set of square-cornered controls, and carefully placed bronze or sage accents create memorability.

The hero caption stays compact so it does not obscure the carousel. Its existing type scale is preserved. A narrow accent rule and stronger spacing can improve hierarchy without enlarging the text block.

## Component Strategy

Add a small local component layer inspired by shadcn/ui rather than importing a large visual kit:

- A variant-based `Button` primitive built on Radix Slot
- A `cn` class utility for predictable composition
- Lucide icons for familiar actions and feature symbols
- Motion for one or two purposeful transitions, with reduced-motion support

Tailwind CSS 4 supplies utility generation for new primitives. Existing handcrafted CSS remains in place and is improved incrementally; there is no full-site class migration.

## Homepage Changes

### Header and Hero

- Keep the logo and navigation visually quiet.
- Give the WhatsApp header CTA an icon and stronger action hierarchy.
- Keep the hero caption dimensions and font sizes restrained.
- Add a calendar icon to "Book a Consultation" and preserve the current CTA wording.

### Services

- Keep heading, cards, arrows, and "View all services" within one desktop viewport.
- Make cards more image-led and use a compact treatment index plus directional affordance.
- Replace text arrows with Lucide icons.
- Keep the previous arrow hidden until the visitor has moved forward.

### Doctor and Trust

- Treat the doctor section as a composed editorial band, not two equal cards.
- Preserve the compact viewport fit.
- Use credentials and an arrow affordance to reinforce expertise and progression.
- Replace handmade facility icons with a consistent Lucide set.

### Contact

- Keep "Visit us".
- Keep phone and WhatsApp actions on one row where space allows.
- Use recognizable phone, WhatsApp, directions, and time symbols.
- Keep the complete contact section within a desktop viewport and preserve mobile wrapping.

### FAQ

- Use one semantic disclosure component for homepage and treatment-page questions.
- Number questions for easy scanning and use a restrained Lucide chevron for state.
- Keep the homepage FAQ image-led and editorial, with the answer list carrying most of the interaction.
- Preserve keyboard access, visible focus, and useful no-JavaScript behavior.

### Services Directory and Treatment Guides

- Reuse the homepage service-card language on the full services directory.
- Recompose the services hero around treatment clarity and a direct consultation path.
- Lead every treatment guide with a balanced image, concise explanation, key benefits, and a clear enquiry action.
- Keep the in-page guide quiet and useful: sticky on desktop, horizontal and scrollable on smaller screens.
- Alternate section treatments through typography, rules, lists, images, and color bands instead of repeating white cards.
- Keep clinical information calm and legible; visual polish must never make treatment details harder to compare.

## Accessibility and Responsiveness

- WCAG AA contrast remains the baseline.
- Interactive targets are at least 44px where practical.
- Focus rings remain highly visible.
- Text never relies on color alone.
- Motion honors `prefers-reduced-motion`.
- Desktop verification targets 1440x900 and 1280x720.
- Mobile verification targets 390x844.

## Out of Scope

- Rewriting clinic copy
- Replacing supplied clinic photography
- A full Tailwind migration
- New CMS fields
- Redesigning Sanity Studio
- New treatment copy or CMS fields
