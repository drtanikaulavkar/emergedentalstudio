import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const css = readFileSync(resolve(root, "app", "globals.css"), "utf8");
const page = readFileSync(resolve(root, "app", "page.tsx"), "utf8");
const carousel = readFileSync(resolve(root, "components", "HeroCarousel.tsx"), "utf8");
const header = readFileSync(resolve(root, "components", "Header.tsx"), "utf8");
const servicesCarousel = readFileSync(resolve(root, "components", "ServicesCarousel.tsx"), "utf8");
const whyChooseIcon = readFileSync(resolve(root, "components", "WhyChooseIcon.tsx"), "utf8");

test("homepage carousel fills the hero without visible manual controls", () => {
  assert.match(carousel, /isPointerPaused/);
  assert.match(carousel, /isFocusPaused/);
  assert.doesNotMatch(carousel, /isRotationPaused/);
  assert.match(carousel, /const isPaused = prefersReducedMotion \|\| isPointerPaused \|\| isFocusPaused/);
  assert.match(carousel, /onMouseEnter=\{\(\) => setIsPointerPaused\(true\)\}/);
  assert.match(carousel, /onFocus=\{\(\) => setIsFocusPaused\(true\)\}/);
  assert.match(carousel, /data-paused=\{isPaused\}/);
  assert.doesNotMatch(carousel, /carousel-toggle/);
  assert.doesNotMatch(carousel, /carousel-dots/);
  assert.doesNotMatch(carousel, /carousel-progress/);
  assert.match(carousel, /aria-hidden=\{index !== activeIndex\}/);
  assert.match(page, /className="hero-title-line">Beautiful Smiles\.<\/span>/);
  assert.match(page, /className="hero-title-line">Built on Precision\.<\/span>/);
  assert.match(page, /className="hero-subtitle-line">Specialist-led cosmetic & implant dentistry in Indiranagar, Bengaluru\.<\/span>/);
  assert.match(page, /className="hero-subtitle-line">From smile makeovers to routine care, designed around you\.<\/span>/);
  assert.match(page, /className="hero-caption-copy"/);
  assert.match(page, /className="button secondary hero-booking"/);
  assert.doesNotMatch(page, /Dental implants, cosmetic dentistry, and prosthodontic care in Indiranagar, Bengaluru/);
  assert.match(page, /className="hero-caption"/);
  assert.match(css, /\.hero\s*\{[^}]*min-height:\s*calc\(100svh - 78px\)/s);
  assert.match(css, /\.hero-carousel\s*\{[^}]*height:\s*100%/s);
  assert.doesNotMatch(css, /\.carousel-toggle/);
  assert.doesNotMatch(css, /\.carousel-dots/);
  assert.doesNotMatch(css, /\.carousel-progress/);
  assert.match(carousel, /\}, 4000\)/);
});

test("homepage sections reflect the requested content structure", () => {
  assert.match(page, /const featuredServiceSlugs = \[/);
  assert.match(page, /"dental-implants"/);
  assert.match(page, /"cosmetic-dentistry"/);
  assert.match(page, /"braces-aligners"/);
  assert.match(page, /"root-canal-treatment"/);
  assert.match(page, /<ServicesCarousel services=\{featuredServices\} \/>/);
  assert.match(page, /<SectionHeader eyebrow="Services" title=\{servicesIntro\?\.title \|\| "Care for every stage of your smile"\}>\s*<\/SectionHeader>/);
  assert.match(page, /<p className="section-kicker">Facilities<\/p>/);
  assert.match(page, /<h2>Why choose us\?<\/h2>/);
  assert.match(page, /Individualized & Family Dental Care/);
  assert.match(page, /Certified Dentists & Advanced Equipment/);
  assert.match(page, /Digital X-rays & Digital Impressions/);
  assert.match(page, /Affordable & Transparent Pricing/);
  assert.match(page, /Hygienic & Comfortable Environment/);
  assert.match(page, /Lift access & Gender neutral restroom/);
  assert.doesNotMatch(page, /Years Of Experience/);
  assert.doesNotMatch(page, /15000\+/);
  assert.doesNotMatch(css, /background:\s*#fbf5ee/);
  assert.doesNotMatch(css, /\.why-choose-item\s*\{[^}]*border-right/s);
  assert.match(css, /\.why-choose-section\s*\{[^}]*background:\s*var\(--surface\)/s);
  assert.match(page, /<SectionHeader eyebrow="Hear what our patients have to say about us" title="Patients reviews"/);
  assert.match(page, /<SectionHeader eyebrow="Smile gallery" title="Results that speak"/);
  assert.match(page, /gallery-section/);
  assert.match(page, /<h2>Visit us<\/h2>/);
  assert.doesNotMatch(page, /Visit us at/);
  assert.match(page, /Get directions/);
  assert.match(page, /contact-primary-actions/);
  assert.match(page, /contact-secondary-actions/);
  assert.match(page, /Monday to Saturday/);
  assert.match(page, /10:00 AM to 1:00 PM/);
  assert.match(page, /4:00 PM to 8:00 PM/);
  assert.match(page, /Sunday/);
  assert.match(page, /By appointment only/);
  assert.doesNotMatch(page, /settings\.hours\.map/);
  assert.doesNotMatch(page, /How do I book an appointment\?/);
  assert.doesNotMatch(page, /What are the timings of the dental clinic\?/);
});

test("homepage exposes semantic hooks for staged motion without hiding content", () => {
  assert.match(servicesCarousel, /motion-sequence/);
  assert.match(servicesCarousel, /style=\{\{\s*"--i": index/);
  assert.match(whyChooseIcon, /why-choose-icon-path/);
  assert.match(css, /\.motion-sequence/);
  assert.doesNotMatch(css, /\.motion-sequence[^{]*\{[^}]*opacity:\s*0/);
});

test("why choose cards remain static because they are not interactive", () => {
  assert.match(page, /className="why-choose-grid"/);
  assert.doesNotMatch(page, /className="why-choose-grid motion-sequence"/);
  assert.doesNotMatch(css, /\.why-choose-item:is\(:hover,\s*:focus-within\)/);
  assert.doesNotMatch(css, /\.why-choose-item\s*\{[^}]*transition:/s);
  assert.doesNotMatch(css, /\.why-choose-icon\s*\{[^}]*transition:/s);
  assert.doesNotMatch(css, /\.why-choose-icon-path \*\s*\{[^}]*transition:/s);
});

test("homepage has focused micro-interactions for navigation, calls to action, services, and FAQs", () => {
  assert.match(header, /useEffect/);
  assert.match(header, /data-scrolled=\{isScrolled\}/);
  assert.match(css, /\.site-header\[data-scrolled="true"\]/);
  assert.match(css, /\.button:is\(:hover, :focus-visible\)/);
  assert.match(css, /\.service-card:is\(:hover, :focus-within\)/);
  assert.match(css, /\.services-carousel\s*\{[^}]*grid-template-columns:\s*44px minmax\(0,\s*1fr\) 44px/s);
  assert.match(css, /\.services-carousel-rail\s*\{[^}]*scrollbar-width:\s*none/s);
  assert.match(css, /\.services-carousel-rail::-webkit-scrollbar\s*\{[^}]*display:\s*none/s);
  assert.match(css, /\.doctor-photo\s*\{[^}]*aspect-ratio:\s*4 \/ 5/s);
  assert.match(css, /\.faq-list details::details-content/);
  assert.match(css, /interpolate-size:\s*allow-keywords/);
  assert.match(css, /\.faq-item\[open\] \.faq-chevron/);
});

test("homepage has a pinned WhatsApp shortcut", () => {
  const layout = readFileSync(resolve(root, "app", "layout.tsx"), "utf8");

  assert.match(layout, /className="floating-whatsapp"/);
  assert.match(layout, /https:\/\/wa\.me\/\$\{settings\.whatsappNumber\}/);
  assert.match(css, /\.floating-whatsapp\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /\.floating-whatsapp\s*\{[^}]*bottom:\s*clamp\(18px,\s*4vw,\s*30px\)/s);
  assert.match(css, /\.floating-whatsapp\s*\{[^}]*right:\s*clamp\(18px,\s*4vw,\s*30px\)/s);
});

test("reduced motion disables autoplay and progress animations", () => {
  assert.match(carousel, /prefers-reduced-motion: reduce/);
  assert.match(carousel, /if \(prefersReducedMotion \|\| isPaused\) \{\s*return;\s*\}/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /\.carousel-progress/);
});
