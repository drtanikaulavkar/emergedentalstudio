import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");
const declarationsFor = (css, selector) =>
  [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter(([, selectors]) => selectors.split(",").map((item) => item.trim()).includes(selector))
    .map(([, , declarations]) => declarations);

test("homepage actions use server-rendered links and the Lucide icon system", () => {
  const homepage = read("app/page.tsx");
  const header = read("components/Header.tsx");

  assert.match(homepage, /from\s+["']lucide-react["']/);
  assert.doesNotMatch(homepage, /from\s+["']@\/components\/ui\/button["']/);
  assert.doesNotMatch(header, /from\s+["']@\/components\/ui\/button["']/);
  assert.match(homepage, /<CalendarDays\b/);
  assert.match(homepage, /<MapPin\b/);
  assert.match(homepage, /<Phone\b/);
  assert.match(header, /<MessageCircle\b/);
});

test("homepage contact section uses vertical same-color text links", () => {
  const homepage = read("app/page.tsx");
  const css = read("app/globals.css");

  assert.match(homepage, /<a className="home-address-link" href=\{directionsUrl\} target="_blank" rel="noreferrer">/);
  assert.match(homepage, /<span>\{formatAddress\(settings\)\}<\/span>/);
  assert.doesNotMatch(homepage, /Get directions/);
  assert.match(homepage, /<div className="contact-actions" aria-label="Contact options">/);
  assert.match(homepage, /className="contact-text-link"/);
  assert.doesNotMatch(homepage, /className="contact-action(?:\s|")/);
  assert.doesNotMatch(homepage, /contact-action-primary/);
  assert.doesNotMatch(homepage, /contact-primary-actions/);
  assert.doesNotMatch(homepage, /contact-secondary-actions/);
  assert.match(css, /\.contact-actions\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.doesNotMatch(css, /\.contact-actions\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(css, /\.contact-card\s*\{[^}]*gap:\s*10px;/s);
  assert.match(css, /\.contact-actions\s*\{[^}]*margin-top:\s*-2px;/s);
  assert.match(css, /\.contact-text-link\s*\{[^}]*color:\s*var\(--brand\);[^}]*min-height:\s*36px;/s);
  assert.match(css, /\.contact-text-link\s*\{[^}]*padding:\s*5px 0;/s);
  assert.match(css, /\.contact-text-link svg\s*\{[^}]*color:\s*currentColor;/s);
  assert.match(css, /\.home-address-link\s*\{[^}]*color:\s*var\(--ink-soft\);/s);
  assert.match(css, /\.clinic-hours\s*\{[^}]*border-top:\s*1px solid var\(--line\);[^}]*padding-top:\s*18px;/s);
  assert.match(css, /\.clinic-hours p:not\(\.clinic-hours-heading\)\s*\{[^}]*padding-left:\s*27px;/s);
});

test("services carousel uses icon controls and image-led card affordances", () => {
  const carousel = read("components/ServicesCarousel.tsx");
  const card = read("components/ServiceCard.tsx");

  assert.match(carousel, /<ChevronLeft\b/);
  assert.match(carousel, /<ChevronRight\b/);
  assert.doesNotMatch(carousel, /&lt;|&gt;/);
  assert.match(card, /service-card-index/);
  assert.match(card, /service-card-content/);
  assert.match(card, /service-card-affordance/);
  assert.match(card, /<ArrowUpRight\b/);
});

test("facility symbols are provided by a dedicated Lucide mapping", () => {
  const homepage = read("app/page.tsx");
  const icons = read("components/WhyChooseIcon.tsx");

  assert.match(homepage, /from\s+["']@\/components\/WhyChooseIcon["']/);
  assert.match(icons, /from\s+["']lucide-react["']/);
  assert.doesNotMatch(homepage, /function WhyChooseIcon/);
});

test("hero typography remains within the approved compact scale", () => {
  const css = read("app/globals.css");

  assert.match(css, /\.hero h1\s*\{[^}]*font-size:\s*clamp\(1\.72rem,\s*3vw,\s*2\.72rem\)/s);
  assert.match(css, /\.hero-caption p\s*\{[^}]*font-size:\s*clamp\(0\.86rem,\s*1\.08vw,\s*0\.98rem\)/s);
  assert.match(
    css,
    /\.button\.secondary\.hero-booking\s*\{[^}]*background:\s*var\(--palette-sage\);[^}]*color:\s*var\(--palette-plum\);/s
  );
  assert.match(
    css,
    /\.button\.secondary\.hero-booking:is\(:hover, :focus-visible\)\s*\{[^}]*background:\s*var\(--palette-sage\);/s
  );
  assert.match(css, /\.services-carousel-arrow:is\(:hover, :focus-visible\)\s*\{[^}]*background:\s*var\(--action\);/s);
  assert.match(css, /\.contact-text-link:is\(:hover, :focus-visible\)\s*\{[^}]*color:\s*var\(--action\);/s);
});

test("hero entrance motion is purposeful and respects reduced-motion preferences", () => {
  const homepage = read("app/page.tsx");
  const reveal = read("components/HeroCaptionReveal.tsx");
  const css = read("app/globals.css");

  assert.match(homepage, /from\s+["']@\/components\/HeroCaptionReveal["']/);
  assert.match(homepage, /<HeroCaptionReveal>/);
  assert.doesNotMatch(reveal, /^"use client";/m);
  assert.doesNotMatch(reveal, /motion\/react|useReducedMotion/);
  assert.match(reveal, /className="hero-caption-reveal"/);
  assert.doesNotMatch(reveal, /opacity:\s*0/);
  assert.match(css, /@keyframes hero-caption-rise/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.hero-caption-reveal\s*\{[^}]*animation:\s*none/s);
});

test("mobile section headings can wrap without widening the page", () => {
  const css = read("app/globals.css");

  assert.match(
    css,
    /@media\s*\(max-width:\s*560px\)[\s\S]*\.section-header h2\s*\{\s*white-space:\s*normal;\s*\}/
  );
});

test("the closed services menu stays inside the mobile viewport", () => {
  const css = read("components/Header.module.css");

  assert.match(
    css,
    /@media\s*\(max-width:\s*560px\)[\s\S]*\.serviceMenu\s*\{[^}]*left:\s*50%;[^}]*min-width:\s*min\(280px,\s*calc\(100vw\s*-\s*36px\)\);[^}]*translate\(-50%,\s*8px\)/s
  );
});

test("the mobile header and key homepage folds use compact natural heights", () => {
  const css = read("app/globals.css");

  assert.match(css, /@media\s*\(max-width:\s*560px\)[\s\S]*\.nav-links\s*\{[^}]*flex-wrap:\s*nowrap;[^}]*gap:\s*16px;/s);
  for (const selector of [".services-section", ".doctor-section", ".contact-section"]) {
    assert.equal(
      declarationsFor(css, selector).some((declarations) => /\bmin-height\s*:/.test(declarations)),
      false,
      `${selector} must remain content-driven at every viewport`
    );
  }
});

test("narrow mobile layouts keep full-size targets without horizontal overflow pressure", () => {
  const css = read("app/globals.css");

  assert.match(css, /@media\s*\(max-width:\s*360px\)/);
  assert.match(css, /@media\s*\(max-width:\s*560px\)[\s\S]*\.header-cta\s*\{[^}]*min-height:\s*44px/s);
  assert.match(css, /@media\s*\(max-width:\s*560px\)[\s\S]*\.services-carousel-arrow\s*\{[^}]*height:\s*44px;[^}]*width:\s*44px/s);
  assert.match(css, /@media\s*\(max-width:\s*560px\)[\s\S]*\.contact-text-link\s*\{[^}]*min-height:\s*36px/s);
});
