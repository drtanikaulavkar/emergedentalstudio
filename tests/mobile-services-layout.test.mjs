import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const css = readFileSync(resolve(root, "app", "globals.css"), "utf8");
const page = readFileSync(resolve(root, "app", "page.tsx"), "utf8");
const carousel = readFileSync(resolve(root, "components", "ServicesCarousel.tsx"), "utf8");

test("homepage services use the standard section header and one shared action", () => {
  assert.match(
    page,
    /<SectionHeader eyebrow="Services" title=\{servicesIntro\?\.title \|\| "Care for every stage of your smile"\} \/>/
  );
  assert.doesNotMatch(page, /services-heading-row|services-mobile-link|services-desktop-actions/);
  assert.match(page, /className="actions services-actions"/);
  assert.match(page, /<Link className="services-link" href="\/services">/);
  assert.doesNotMatch(page, /<Link className="button ghost" href="\/services">/);
  assert.match(css, /\.services-link\s*\{[^}]*display:\s*inline-flex;[^}]*min-height:\s*44px/s);
  assert.match(css, /\.services-link:focus-visible\s*\{[^}]*outline:\s*3px solid var\(--gold\)/s);
  assert.match(css, /\.services-section \.actions\s*\{[^}]*margin-top:\s*4px/s);
});

test("the carousel uses one readable, vertically aligned card presentation at every size", () => {
  assert.match(
    css,
    /\.services-carousel-rail \.service-card-content\s*\{[^}]*gap:\s*0;[^}]*grid-template-rows:\s*auto auto minmax\(4\.05em,\s*auto\);[^}]*padding:\s*14px 14px 16px/s
  );
  assert.match(css, /\.services-carousel-rail \.service-card \.eyebrow\s*\{[^}]*font-size:\s*0\.72rem/s);
  assert.match(css, /\.services-carousel-rail \.service-card-meta\s*\{[^}]*margin-bottom:\s*4px/s);
  assert.match(css, /\.services-carousel-rail \.service-card h3\s*\{[^}]*font-size:\s*clamp\(1rem,[^;]+1\.12rem\)/s);
  assert.match(css, /\.services-carousel-rail \.service-card-summary\s*\{[^}]*font-size:\s*clamp\(0\.82rem,[^;]+0\.88rem\);[^}]*-webkit-line-clamp:\s*3;[^}]*margin-top:\s*8px/s);
  assert.match(css, /\.services-carousel-rail \.service-card-affordance\s*\{[^}]*display:\s*none/s);
});

test("responsive layouts show one, two, or four readable cards through CSS only", () => {
  assert.match(css, /\.services-carousel-rail\s*\{[^}]*grid-auto-columns:\s*calc\(\(100% - 42px\) \/ 4\)/s);
  assert.doesNotMatch(css, /@media \(min-width: 1200px\)[\s\S]*\.services-carousel-rail/);
  assert.match(
    css,
    /@media \(max-width: 920px\)[\s\S]*\.services-carousel-rail\s*\{[^}]*grid-auto-columns:\s*calc\(\(100% - 14px\) \/ 2\)/s
  );
  assert.match(
    css,
    /@media \(max-width: 560px\)[\s\S]*\.services-carousel\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s
  );
  assert.match(
    css,
    /@media \(max-width: 560px\)[\s\S]*\.services-carousel-arrow\s*\{[^}]*display:\s*none/s
  );
  assert.match(
    css,
    /@media \(max-width: 560px\)[\s\S]*\.services-carousel-rail\s*\{[^}]*grid-auto-columns:\s*calc\(100% - 52px\)/s
  );
  assert.match(
    css,
    /@media \(max-width: 560px\)[\s\S]*\.services-carousel-rail\s*\{[^}]*scroll-snap-type:\s*x mandatory/s
  );
});

test("the line indicator follows the measured carousel pages", () => {
  assert.match(carousel, /className="services-carousel-indicator"/);
  assert.match(carousel, /className=\{`services-carousel-segment\$\{index === activePage \? " is-active" : ""\}`\}/);
  assert.match(carousel, /aria-label=\{`Service page \$\{activePage \+ 1\} of \$\{pageCount\}`\}/);
  assert.match(carousel, /new ResizeObserver\(updateCarouselState\)/);
  assert.match(carousel, /Math\.ceil\(services\.length \/ visibleCount\)/);
  assert.match(css, /\.services-carousel-indicator\s*\{[^}]*grid-column:\s*1 \/ -1/s);
  assert.match(css, /\.services-carousel-segment\.is-active\s*\{[^}]*width:\s*24px/s);
});
