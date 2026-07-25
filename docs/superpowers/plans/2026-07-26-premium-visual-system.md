# Premium Visual System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a globally editable visual system and apply a premium, bespoke design language across the shared shell, homepage, FAQ, service index, and treatment-guide pages.

**Architecture:** Keep the existing Next.js App Router and global CSS architecture. Add a small local UI primitive layer using Tailwind CSS 4, Radix Slot, class-variance-authority, Lucide, and Motion. Reuse one semantic FAQ component and the existing image-led service card across routes so the site has a coherent interaction and visual language.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.9, Tailwind CSS 4, Radix UI Slot, Lucide React, Motion, Node test runner, Playwright.

## Global Constraints

- Use the latest registry versions that install cleanly with Node 24 and pnpm 11.
- Preserve Manrope ExtraBold headings, Manrope Medium body, and Manrope SemiBold buttons.
- Keep all palette and semantic colors editable from `:root` in `app/globals.css`.
- Do not enlarge the hero caption or let it cover more of the carousel.
- Merge the completed, verified work into `main` and push `main` only after all requested pages are complete.
- Preserve WCAG AA, visible focus states, reduced motion, and responsive viewport fit.

## File Map

- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`: dependency versions and reproducible install state.
- `postcss.config.mjs`: Tailwind 4 PostCSS integration.
- `lib/utils.ts`: class-name composition utility.
- `components/ui/button.tsx`: reusable button variants.
- `components/WhyChooseIcon.tsx`: Lucide-based facility icon mapping.
- `components/ServicesCarousel.tsx`: accessible carousel controls and arrow state.
- `components/ServiceCard.tsx`: compact image-led treatment card.
- `components/Header.tsx`: icon-enhanced booking CTA.
- `components/FaqAccordion.tsx`: shared semantic FAQ pattern for home and treatment pages.
- `app/page.tsx`: homepage composition and icon-enhanced actions.
- `app/services/page.tsx`: image-led services directory.
- `app/services/[slug]/page.tsx`: premium treatment-guide composition.
- `app/services/services.module.css`: service directory and treatment-guide visual system.
- `app/globals.css`: global theme tokens, component styling, responsive layout, and reduced motion.
- `tests/design-system-foundation.test.mjs`: dependency and foundation contract.
- `tests/homepage-premium-ui.test.mjs`: homepage structural and iconography contract.
- `tests/services-premium-ui.test.mjs`: FAQ and service-route structural contract.

## Task 1: Stabilize the design-system foundation

- [x] Run the existing foundation test and confirm it fails because the foundation files/imports do not exist.
- [x] Confirm the latest dependency versions and complete a reproducible pnpm install.
- [x] Add the Tailwind 4 PostCSS configuration.
- [x] Add `lib/utils.ts` and the local `Button` primitive.
- [x] Load Tailwind and animation utilities from the global stylesheet.
- [x] Run the foundation test and confirm it passes.
- [x] Run TypeScript and lint checks.

## Task 2: Add reusable premium interaction patterns

- [x] Write a failing structural test for Lucide icons, service-card affordances, and compact hero CTA markup.
- [x] Add a Lucide-based facility icon mapping.
- [x] Replace carousel text arrows with icon buttons while preserving the hidden-back-arrow behavior.
- [x] Add icons to the header, hero, doctor, and contact actions.
- [x] Use the local button primitive where it improves consistency without forcing a broad migration.
- [x] Run the structural test and confirm it passes.

## Task 3: Refine the homepage visual hierarchy

- [x] Preserve the hero caption scale and reduce its visual footprint with a narrow accent treatment.
- [x] Make service cards more image-led while keeping the entire section inside common desktop viewport heights.
- [x] Recompose the doctor section as an asymmetric expertise band that fits within the viewport.
- [x] Refine the trust, gallery, and contact bands so the page has varied rhythm rather than repeated card styling.
- [x] Keep contact actions in one row on desktop and adapt them cleanly on mobile.
- [x] Confirm all semantic colors still derive from the root palette.

## Task 4: Unify the FAQ experience

- [x] Write a failing structural test for a shared semantic FAQ component.
- [x] Add a reusable disclosure-based FAQ component with Lucide iconography and numbered questions.
- [x] Use the shared FAQ component on the homepage and every treatment page.
- [x] Refine the homepage FAQ as an editorial image-and-answer band with clear open, hover, and focus states.
- [x] Respect reduced motion and keep the component usable without client-side JavaScript.

## Task 5: Redesign the services directory and treatment guides

- [x] Reuse the image-led service card on the services directory.
- [x] Recompose the directory hero around treatment clarity and a direct consultation path.
- [x] Refine treatment heroes with a balanced image crop, key benefits, and a consistent CTA.
- [x] Turn the sticky page guide into a quiet, useful navigation rail.
- [x] Give benefits, process, aftercare, cases, brands, and details distinct visual rhythms without nested cards.
- [x] Restyle related services as clear navigation links and the final CTA as a strong plum closing band.
- [x] Check all ten service routes at representative desktop and mobile sizes.

## Task 6: Verify, integrate, and push

- [x] Run the foundation and homepage tests.
- [x] Run the FAQ and services-page tests.
- [x] Run lint, TypeScript, and production build.
- [x] Start or reuse `localhost:3000`.
- [x] Check the homepage, services directory, and representative treatment pages at 1440x900, 1280x720, 390x844, and 320x800.
- [x] Check FAQ disclosure states, hero balance, section rhythm, overlap, overflow, focus states, and reduced-motion behavior.
- [ ] Review the final diff, commit the intended files, merge into `main`, and push `main` to GitHub.
