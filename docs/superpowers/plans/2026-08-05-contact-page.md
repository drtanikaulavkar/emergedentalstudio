# Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Contact page’s obsolete hours and Clinicia path with direct contact links, a three-field WhatsApp enquiry form, and a full-width clickable clinic map.

**Architecture:** Keep the server-rendered Contact page responsible for contact content and external URLs, and keep `BookingForm` as the client boundary responsible for field state and WhatsApp submission. Reuse the existing Home-page map source and visual tokens, adding only Contact-page-specific structure and CSS hooks.

**Tech Stack:** Next.js App Router, React 19, TypeScript, global CSS, Lucide icons, Node’s built-in test runner.

## Global Constraints

- Display the H1 exactly as “Book an appointment with us”.
- Display `emergedentalstudio@gmail.com` exactly and make it a `mailto:` link.
- Keep the configured phone and WhatsApp numbers from site settings.
- Keep the five existing nearby service-area pills beneath the form.
- Remove Contact-page hours and the Clinicia “Book online” CTA.
- Keep WCAG AA focus, contrast, touch-target, and responsive behavior.
- Do not add dependencies or expand the Sanity schema.

---

### Task 1: Lock the Contact-page contract with failing tests

**Files:**
- Modify: `tests/contact-page.test.mjs`

**Interfaces:**
- Consumes: source files `app/contact/page.tsx`, `components/BookingForm.tsx`, `lib/siteData.ts`, and `app/globals.css` as UTF-8 text.
- Produces: regression tests for exact content, links, form fields, map hooks, and removed content.

- [ ] **Step 1: Replace the obsolete Contact-page assertions with the new content contract**

Add source reads for `BookingForm.tsx` and assertions equivalent to:

```js
const bookingForm = readFileSync(join(process.cwd(), "components", "BookingForm.tsx"), "utf8");

assert.equal(pages.contact.heroTitle, "Book an appointment with us");
assert.equal(siteSettings.email, "emergedentalstudio@gmail.com");
assert.match(contactPage, /href=\{`tel:\$\{settings\.phone\}`\}/);
assert.match(contactPage, /mailto:emergedentalstudio@gmail\.com/);
assert.match(contactPage, /facebook\.com\/profile\.php\?id=100085397533519/);
assert.match(contactPage, /instagram\.com\/emergedentalstudio/);
assert.match(contactPage, /linkedin\.com\/company\/emerge-dental-studio-multispeciality-dental-clinic/);
assert.match(contactPage, /<h2>Get in touch<\/h2>/);
assert.match(contactPage, /<h2>Directions to the Clinic<\/h2>/);
assert.match(contactPage, /className="contact-map-link"/);
assert.doesNotMatch(contactPage, /<h2>Hours<\/h2>/);
assert.doesNotMatch(contactPage, /Book online/);
assert.match(bookingForm, />\s*Full name\s*</);
assert.match(bookingForm, />\s*Treatment you are looking for\s*</);
assert.match(bookingForm, />\s*Message for us \(optional\)\s*</);
assert.match(bookingForm, /message\.trim\(\)/);
assert.match(bookingForm, /window\.open\(`https:\/\/wa\.me\/\$\{settings\.whatsappNumber\}\?text=\$\{encodedMessage\}`/);
```

Keep the independent shared-hours and service-area tests unchanged.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/contact-page.test.mjs`

Expected: FAIL because the old title/email/contact ordering/form/map are still present and the new hooks are absent.

- [ ] **Step 3: Commit the failing test**

```powershell
git add -- tests/contact-page.test.mjs
git commit -m "test: define updated contact page behavior"
```

---

### Task 2: Implement contact links, WhatsApp enquiry, and directions map

**Files:**
- Modify: `app/contact/page.tsx`
- Modify: `components/BookingForm.tsx`
- Modify: `lib/siteData.ts`
- Modify: `app/globals.css`
- Test: `tests/contact-page.test.mjs`

**Interfaces:**
- Consumes: `SiteSettings`, `formatAddress(settings)`, the configured `settings.phone`, and `settings.whatsappNumber`.
- Produces: `BookingForm({settings}: {settings: SiteSettings})` with three fields and an encoded WhatsApp URL; semantic Contact-page links and map hooks used by CSS and tests.

- [ ] **Step 1: Update fallback content**

In `lib/siteData.ts`, set:

```ts
email: "emergedentalstudio@gmail.com",
```

and set the Contact-page hero title to:

```ts
heroTitle: "Book an appointment with us",
```

- [ ] **Step 2: Implement the three-field WhatsApp form**

In `components/BookingForm.tsx`, add `message` state and build the encoded message at submission time:

```tsx
const [message, setMessage] = useState("");

const messageLines = [
  "Hello Dr. Tanisha, I would like to enquire about an appointment at Emerge Dental Studio.",
  `Full name: ${name}`,
  `Treatment: ${treatment}`,
  ...(message.trim() ? [`Message: ${message.trim()}`] : [])
];
const encodedMessage = encodeURIComponent(messageLines.join("\n"));
```

Render exact labels `Full name`, `Treatment you are looking for`, and `Message for us (optional)`. Keep the first two fields required, leave the third optional, and open:

```tsx
window.open(
  `https://wa.me/${settings.whatsappNumber}?text=${encodedMessage}`,
  "_blank",
  "noopener,noreferrer"
);
```

- [ ] **Step 3: Rebuild the Contact-page information card**

In `app/contact/page.tsx`, remove `next/link`, import the required Lucide contact icons, declare the requested social URLs, and use these map constants:

```ts
const contactEmail = "emergedentalstudio@gmail.com";
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Emerge%20Dental%20Studio%20Indiranagar%20Bengaluru";
const mapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0059496583885!2d77.63272917520163!3d12.971470887343878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17258ff3f73d%3A0xa4f9b26340b29668!2sEmerge%20Dental%20Studio%20%7C%20Dentist%2C%20Prosthodontist%20%7C%207th%20Main%2C%20Indiranagar!5e0!3m2!1sen!2sin!4v1682962797284!5m2!1sen!2sin";
```

Render phone, email, Follow us, and address in that order. Use native `tel:` and `mailto:` links; use `target="_blank" rel="noreferrer"` for social and maps links. Add `<h2>Get in touch</h2>` before `BookingForm`, preserve the existing service-area list, and remove hours and both old CTAs.

- [ ] **Step 4: Add the full-width accessible map section**

Below the two-card grid, render:

```tsx
<section className="container section contact-directions">
  <h2>Directions to the Clinic</h2>
  <div className="contact-map-shell">
    <iframe
      className="map-embed"
      src={mapsUrl}
      title="Directions to Emerge Dental Studio"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      tabIndex={-1}
    />
    <a
      className="contact-map-link"
      href={directionsUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Get directions to Emerge Dental Studio on Google Maps"
    >
      <span>Get directions</span>
    </a>
  </div>
</section>
```

The overlay is the keyboard and pointer target; the iframe remains descriptive but is removed from the tab sequence.

- [ ] **Step 5: Add focused responsive styles**

In `app/globals.css`, add styles for `.contact-detail`, `.contact-detail-link`, `.social-links`, `.booking-card`, `.contact-directions`, `.contact-map-shell`, and `.contact-map-link`. Use existing color variables, 8px card radii, at least 44px interactive target height, the existing focus-visible outline conventions, a map height using `clamp(360px, 54vw, 620px)`, and a single-column mobile arrangement without changing global typography.

- [ ] **Step 6: Run focused and full checks**

Run: `node --test tests/contact-page.test.mjs`

Expected: all Contact-page tests PASS.

Run: `pnpm lint`

Expected: exit code 0 with no ESLint errors.

Run: `pnpm build`

Expected: exit code 0 and successful static generation of `/contact`.

- [ ] **Step 7: Commit the implementation**

```powershell
git add -- app/contact/page.tsx components/BookingForm.tsx lib/siteData.ts app/globals.css
git commit -m "feat: update contact page enquiry experience"
```

---

### Task 3: Verify the rendered experience

**Files:**
- Inspect: `app/contact/page.tsx`
- Inspect: `components/BookingForm.tsx`
- Inspect: `app/globals.css`

**Interfaces:**
- Consumes: the running `/contact` route.
- Produces: visual and interaction evidence that the implementation matches the approved design.

- [ ] **Step 1: Start the development server and open `/contact`**

Run: `pnpm dev`

Expected: the local site starts and `/contact` returns successfully.

- [ ] **Step 2: Inspect desktop layout**

At a desktop viewport, confirm the compact hero, two balanced cards, exact left-card order, “Get in touch” heading, retained service-area pills, and full-width map with visible direction cue.

- [ ] **Step 3: Inspect mobile layout**

At a mobile viewport near 390px wide, confirm the cards stack without horizontal overflow, all links remain easy to tap, fields fit the viewport, pills wrap, and the map remains usable.

- [ ] **Step 4: Verify interactions**

Confirm the phone link begins with `tel:`, email begins with `mailto:`, all three social links are correct, address and map overlay use the Google Maps directions URL, and form submission generates a WhatsApp URL containing the entered name/treatment and conditionally the optional message.

- [ ] **Step 5: Record final repository state**

Run: `git status --short`

Expected: only the pre-existing `.codex-temp/` and `.playwright-cli/` untracked directories remain; no requested implementation files are uncommitted.
