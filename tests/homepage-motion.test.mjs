import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const css = readFileSync(resolve(root, "app", "globals.css"), "utf8");
const page = readFileSync(resolve(root, "app", "page.tsx"), "utf8");
const carousel = readFileSync(resolve(root, "components", "HeroCarousel.tsx"), "utf8");
const header = readFileSync(resolve(root, "components", "Header.tsx"), "utf8");

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
  assert.match(page, /Beautiful Smiles\. Built on Precision\./);
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
  assert.match(page, /<p className="section-kicker">Facilities<\/p>/);
  assert.match(page, /<h2>Why choose us\?<\/h2>/);
  assert.match(page, /24\+/);
  assert.match(page, /15000\+/);
  assert.match(page, /<SectionHeader eyebrow="Hear what our patients have to say about us" title="Patients reviews"/);
  assert.match(page, /<SectionHeader eyebrow="Smile gallery" title="Results that speak"/);
  assert.match(page, /gallery-section/);
  assert.match(page, /Visit us at/);
  assert.match(page, /Get directions/);
  assert.match(page, /Sunday/);
  assert.match(page, /By appointment only/);
  assert.doesNotMatch(page, /How do I book an appointment\?/);
  assert.doesNotMatch(page, /What are the timings of the dental clinic\?/);
});

test("homepage exposes semantic hooks for staged motion without hiding content", () => {
  assert.match(page, /motion-sequence/);
  assert.match(page, /style=\{\{\s*"--i": index/);
  assert.match(page, /why-choose-icon-path/);
  assert.match(css, /\.motion-sequence/);
  assert.doesNotMatch(css, /\.motion-sequence[^{]*\{[^}]*opacity:\s*0/);
});

test("homepage has focused micro-interactions for navigation, calls to action, services, and FAQs", () => {
  assert.match(header, /useEffect/);
  assert.match(header, /data-scrolled=\{isScrolled\}/);
  assert.match(css, /\.site-header\[data-scrolled="true"\]/);
  assert.match(css, /\.button:is\(:hover, :focus-visible\)/);
  assert.match(css, /\.service-card:is\(:hover, :focus-within\)/);
  assert.match(css, /\.faq-list details::details-content/);
  assert.match(css, /interpolate-size:\s*allow-keywords/);
  assert.match(css, /\.faq-list summary::after/);
});

test("reduced motion disables autoplay and progress animations", () => {
  assert.match(carousel, /prefers-reduced-motion: reduce/);
  assert.match(carousel, /if \(prefersReducedMotion \|\| isPaused\) \{\s*return;\s*\}/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /\.carousel-progress/);
});
