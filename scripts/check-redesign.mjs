import {readFileSync} from "node:fs";
import assert from "node:assert/strict";

const page = readFileSync("app/page.tsx", "utf8");
const css = readFileSync("app/globals.css", "utf8");
const header = readFileSync("components/Header.tsx", "utf8");
const heroCarousel = readFileSync("components/HeroCarousel.tsx", "utf8");
const serviceCard = readFileSync("components/ServiceCard.tsx", "utf8");

assert.match(css, /font-family:\s*Poppins/, "site should use Poppins as the primary font");
assert.match(page, /Personalised smile and implant care/, "carousel should include the first requested caption");
assert.match(page, /Advanced\. Gentle\. Trusted\./, "carousel should include the second requested caption");
assert.match(page, /Expert dentistry for your smile\./, "carousel should include the third requested caption");
assert.match(heroCarousel, /className="hero-carousel"/, "hero should include a landscape carousel");
assert.doesNotMatch(page, /<h1>\{page\.heroTitle\}<\/h1>/, "hero should not render the large heading");
assert.match(page, /Dental implants, cosmetic dentistry, and prosthodontic care in Indiranagar, Bengaluru/, "hero should use the requested green top heading");
assert.match(heroCarousel, /aria-label="Previous slide"/, "carousel should include a previous button");
assert.match(heroCarousel, /aria-label="Next slide"/, "carousel should include a next button");
assert.match(page, /\/images\/home-carousel-1\.jpg/, "carousel should use the provided first homepage image");
assert.match(page, /\/images\/home-carousel-2\.jpg/, "carousel should use the provided second homepage image");
assert.match(page, /\/images\/home-carousel-3\.jpg/, "carousel should use the provided third homepage image");
assert.match(page, /Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%21/, "hero CTA should open the requested prefilled WhatsApp message");
assert.match(page, /Book online/, "hero should keep one Book online CTA");
assert.doesNotMatch(page, /Why choose a prosthodontist/, "old right-side prosthodontist panel should be removed from the hero");
assert.doesNotMatch(page, /pathway-section|Choose the path that fits your smile/, "choose-path section should be removed");
assert.match(serviceCard, /Image from "next\/image"/, "service cards should render related images");
assert.match(serviceCard, /service\.imageSrc/, "service cards should use a service image source");
assert.match(page, /elfsight-app-ff647765-4f7b-4dc5-bd88-b5235109b9ca/, "homepage should use the old Google reviews widget");
assert.doesNotMatch(page, /Testimonials/, "reviews section should not show repetitive Testimonials heading");
assert.match(page, /Frequently asked questions/, "homepage should include FAQ section from the FAQ document");
assert.match(page, /google\.com\/maps\/embed/, "homepage contact section should include embedded Google Maps");
assert.match(page, /href=\{`tel:\$\{settings\.phone/, "homepage contact phone should be clickable");

assert.match(css, /:focus-visible/, "global styles should include visible keyboard focus states");
assert.match(css, /prefers-reduced-motion:\s*reduce/, "global styles should respect reduced-motion preferences");
assert.match(css, /img\s*{[\s\S]*height:\s*auto;/, "global image styles should preserve aspect ratio");
assert.match(css, /\.section-header h2[\s\S]*white-space:\s*nowrap/, "section headings should stay on one line on wider viewports");
assert.match(css, /\.hero-booking[\s\S]*background:\s*var\(--coral\)/, "hero CTA should use a stronger accent color");
assert.match(css, /\.hours-list p[\s\S]*white-space:\s*nowrap/, "contact timing lines should not wrap on wider viewports");
assert.match(css, /\.map-embed[\s\S]*height:\s*100%/, "map should fill the contact section height");
assert.doesNotMatch(css, /border-left:\s*4px\s+solid\s+var\(--teal\)/, "side-tab accent border should be removed");
assert.match(css, /@media\s*\(max-width:\s*560px\)[\s\S]*\.site-header/, "mobile header should be intentionally compacted");

assert.match(header, /aria-label="Open navigation"|aria-label="Main navigation"/, "header navigation should remain accessible");

console.log("Redesign checks passed.");
