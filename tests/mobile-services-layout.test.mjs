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
});

test("the carousel uses one compact card presentation at every size", () => {
  assert.match(
    css,
    /\.services-carousel-rail \.service-card-content\s*\{[^}]*gap:\s*0;[^}]*padding:\s*10px 10px 12px/s
  );
  assert.match(css, /\.services-carousel-rail \.service-card \.eyebrow\s*\{[^}]*margin-bottom:\s*4px/s);
  assert.match(css, /\.services-carousel-rail \.service-card h3\s*\{[^}]*min-height:\s*0/s);
  assert.match(css, /\.services-carousel-rail \.service-card-summary\s*\{[^}]*margin-top:\s*8px/s);
  assert.match(css, /\.services-carousel-rail \.service-card-affordance\s*\{[^}]*display:\s*none/s);
});

test("responsive layouts show two, three, four, or five cards through CSS only", () => {
  assert.match(css, /\.services-carousel-rail\s*\{[^}]*grid-auto-columns:\s*calc\(\(100% - 42px\) \/ 4\)/s);
  assert.match(
    css,
    /@media \(min-width: 1200px\)[\s\S]*\.services-carousel-rail\s*\{[^}]*grid-auto-columns:\s*calc\(\(100% - 56px\) \/ 5\)/s
  );
  assert.match(
    css,
    /@media \(max-width: 920px\)[\s\S]*\.services-carousel-rail\s*\{[^}]*grid-auto-columns:\s*calc\(\(100% - 28px\) \/ 3\)/s
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
    /@media \(max-width: 560px\)[\s\S]*\.services-carousel-rail\s*\{[^}]*grid-auto-columns:\s*max\(136px,\s*calc\(\(100% - 36px\) \/ 2\)\)/s
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
