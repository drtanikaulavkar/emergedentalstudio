import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const css = read("app/globals.css");
const homepage = read("app/page.tsx");
const header = read("components/Header.tsx");
const carousel = read("components/HeroCarousel.tsx");
const reveal = read("components/HeroCaptionReveal.tsx");
const button = read("components/ui/button.tsx");
const packageJson = JSON.parse(read("package.json"));

test("hero caption reveal is server-rendered and animated with CSS", () => {
  assert.doesNotMatch(reveal, /^"use client";/m);
  assert.doesNotMatch(reveal, /motion\/react|useReducedMotion|<motion\./);
  assert.match(reveal, /<div className="hero-caption-reveal">\{children\}<\/div>/);
  assert.equal(packageJson.dependencies?.motion, undefined);
  assert.match(css, /\.hero-caption-reveal\s*\{[^}]*animation:\s*hero-caption-rise 580ms var\(--ease-out-quint\) 120ms both/s);
  assert.match(css, /@keyframes hero-caption-rise[\s\S]*transform:\s*translateY\(18px\)[\s\S]*transform:\s*translateY\(0\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.hero-caption-reveal\s*\{[^}]*animation:\s*none/s);
});

test("secondary hero images mount after the initial render", () => {
  assert.match(carousel, /const \[deferredSlidesReady, setDeferredSlidesReady\] = useState\(false\)/);
  assert.doesNotMatch(carousel, /"requestIdleCallback" in window/);
  assert.match(carousel, /requestIdleCallback\?: Window\["requestIdleCallback"\]/);
  assert.match(carousel, /requestIdleCallback\(loadDeferredSlides, \{timeout: 1800\}\)/);
  assert.match(carousel, /setTimeout\(loadDeferredSlides, 1200\)/);
  assert.match(carousel, /index === 0 \|\| deferredSlidesReady/);
  assert.match(carousel, /fetchPriority=\{index === 0 \? "high" : "low"\}/);
  assert.match(carousel, /priority=\{index === 0\}/);
  assert.match(carousel, /\}, 4000\)/);
  assert.match(carousel, /isPointerPaused/);
  assert.match(carousel, /isFocusPaused/);
});

test("styling-only actions do not create homepage client boundaries", () => {
  assert.doesNotMatch(homepage, /components\/ui\/button/);
  assert.doesNotMatch(header, /components\/ui\/button/);
  assert.doesNotMatch(button, /^"use client";/m);
  assert.match(homepage, /<a[^>]*className="button secondary hero-booking"/s);
  assert.match(homepage, /<Link[^>]*className="services-link"/s);
  assert.match(header, /<a className="header-cta"/);
});

test("homepage sections below the hero opt into offscreen rendering containment", () => {
  assert.equal(homepage.match(/homepage-deferred-section/g)?.length, 7);
  assert.match(css, /\.homepage-deferred-section\s*\{[^}]*content-visibility:\s*auto/s);
  assert.match(css, /\.homepage-deferred-section\s*\{[^}]*contain-intrinsic-block-size:\s*auto 760px/s);
});

test("services carousel starts at an exact scroll-snap position without inline padding", () => {
  assert.match(css, /\.services-carousel-rail\s*\{[^}]*padding-inline:\s*0/s);
  assert.match(css, /\.services-carousel-rail\s*\{[^}]*scroll-snap-type:\s*x mandatory/s);
});
