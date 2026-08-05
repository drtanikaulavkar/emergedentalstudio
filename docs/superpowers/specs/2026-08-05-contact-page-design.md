# Contact Page Design

## Goal

Make the Contact page a direct, reassuring path to call, email, follow, locate, or message Emerge Dental Studio. Remove the Clinicia booking path from this page and use WhatsApp as the form destination.

## Page Structure

### Hero

- Keep the existing compact Contact-page hero and eyebrow.
- Set the H1 to “Book an appointment with us”.

### Contact and Enquiry Cards

Keep the existing two-column card layout on larger screens and stack the cards on smaller screens.

The left contact card presents the following information in this exact order:

1. Phone number, linked with a `tel:` URL.
2. `emergedentalstudio@gmail.com`, linked with a `mailto:` URL.
3. A “Follow us” group containing external links to:
   - Facebook: `https://www.facebook.com/profile.php?id=100085397533519`
   - Instagram: `https://www.instagram.com/emergedentalstudio/`
   - LinkedIn: `https://www.linkedin.com/company/emerge-dental-studio-multispeciality-dental-clinic/?viewAsMember=true`
4. Clinic address, linked to Google Maps directions.

External social links and Google Maps directions open in a new tab with safe relationship attributes. Phone and email use their native device handlers.

Remove clinic hours, the Clinicia “Book online” CTA, and the existing “Get directions” button from this card because the address itself is the directions link and a dedicated map section follows.

The right card has the heading “Get in touch” and contains these fields:

- Full name — required, single-line text input with name autocomplete.
- Treatment you are looking for — required, multi-line text input.
- Message for us (optional) — optional, multi-line text input.

Submitting the form opens WhatsApp for the configured clinic WhatsApp number in a new tab. The prefilled message includes all three field labels and values, omitting the optional message line when it is empty. Existing nearby service-area pills remain below the form.

### Directions to the Clinic

Add a full-width section beneath the cards with the heading “Directions to the Clinic”. Reuse the same Google Maps embed and clinic directions URL used on the Home page.

The map spans the available page width. Place it inside a clearly labeled directions link so clicking or keyboard-activating the map opens Google Maps directions in a new tab. Because an iframe consumes pointer interaction, use an accessible link overlay and a visible “Get directions” cue rather than relying on clicks inside the iframe.

## Content and Data

- Update the local fallback email in `lib/siteData.ts` to `emergedentalstudio@gmail.com`.
- The Contact page displays the requested Gmail address exactly, even if older published Sanity settings still contain the previous address.
- Keep the configured phone and WhatsApp numbers from site settings.
- Reuse one shared Contact-page constant for the map embed and directions URL so the visible address and map action stay consistent within the page.

## Visual Direction

Preserve the existing Emerge visual system: soft shell cards, restrained lavender/sage accents, rounded corners, strong plum headings, and clear focus rings. Use small contact icons and concise labels to improve scanning without introducing a new design language. The map is the page’s signature element and should feel expansive compared with the compact cards above it.

## Responsive and Accessible Behavior

- Maintain two columns where space allows and one column below the existing responsive breakpoint.
- Keep interactive targets at least 44 pixels tall where appropriate.
- Provide descriptive accessible names for social and directions links.
- Preserve visible keyboard focus styles and sufficient color contrast.
- Do not remove iframe semantics; retain a descriptive map title and lazy loading.

## Verification

- Add a focused test that initially fails for the new Contact-page content, link destinations, form fields, and WhatsApp message behavior.
- Confirm the test passes after implementation.
- Run lint and production build checks.
- Inspect desktop and mobile layouts in a browser.
- Confirm phone, email, social, address, map, and WhatsApp URLs are correct.
