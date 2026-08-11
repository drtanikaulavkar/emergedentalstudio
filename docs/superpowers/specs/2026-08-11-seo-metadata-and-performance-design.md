# SEO Metadata and Performance Corrections

## Goal

Correct the website SEO issues confirmed by the live crawl while preserving the existing Blogs page, navigation links, and homepage before/after section for content that will be published soon.

## Scope

### Page metadata

- Add a self-referencing canonical URL to every public page.
- Give every page its own Open Graph title, description, and URL instead of inheriting the homepage values.
- Keep the clinic name appended once to page titles.
- Use locally relevant service-page titles in the form "Treatment in Indiranagar, Bengaluru | Emerge Dental Studio."
- Expand service-page descriptions with the clinic and location while keeping each description concise and accurate.

### Blogs and before/after placeholders

- Keep the Blogs page publicly accessible, linked in the header and footer, and indexable.
- Keep the homepage before/after section visible.
- Replace the visible word "Placeholder" with professional interim wording that makes clear new articles and clinical cases are coming soon.
- Do not invent patient outcomes, testimonials, clinical claims, article content, or before/after results.

### Sitemap

- Keep all current production pages in the sitemap.
- Do not add the interim Blogs page to the sitemap until real articles are published.
- Remove the generated `lastModified: new Date()` values because they falsely report every page as updated on every sitemap request.
- Reintroduce `lastModified` only when a trustworthy CMS update timestamp is available.

### Homepage performance

- Make the initial hero image stable so Lighthouse and PageSpeed can record Largest Contentful Paint.
- Preserve the carousel, automatic slide changes, pause behavior, responsive crop, and reduced-motion support.
- Later carousel images may retain their visual transition; the first visible image must not remain in a continuous transform transition during the LCP measurement window.

### Structured data

- Preserve the existing valid Dentist structured data and the clinic's split opening hours.
- Add the clinic’s official social profiles and Dr. Tanisha Kaulavkar’s founder/lead-dentist relationship only from existing verified website data.
- Do not add ratings, prices, or treatment claims that are not maintained as verified structured data.

## Testing

- Add automated tests before production changes.
- Tests must initially fail for the missing canonical URLs, incorrect page-specific social metadata, unreliable sitemap dates, duplicated Blogs title, visible "Placeholder" wording, and unstable initial hero image.
- Implement the smallest changes that make those tests pass.
- Run the focused tests, existing test suite, lint, and production build.
- Recheck rendered metadata and the homepage with a live or local Lighthouse/PageSpeed run where available.

## Out of Scope

- Removing or redesigning the Blogs page.
- Removing or redesigning the homepage before/after section.
- Writing the future dental articles.
- Creating or fabricating patient before/after photographs.
- Changing booking, contact, navigation, service content, or Google Business Profile settings.

## Success Criteria

- Every public page has an accurate self-referencing canonical URL and page-specific sharing metadata.
- Service pages use clear local search titles and descriptions.
- The sitemap no longer claims that every page changes daily.
- The Blogs page title contains the clinic name only once and no visible copy says "Placeholder."
- The homepage keeps its carousel and sections while allowing LCP to be measured.
- All checks and the production build pass.
