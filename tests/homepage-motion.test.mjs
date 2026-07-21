import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const css = readFileSync(resolve(root, "app", "globals.css"), "utf8");
const page = readFileSync(resolve(root, "app", "page.tsx"), "utf8");
const carousel = readFileSync(resolve(root, "components", "HeroCarousel.tsx"), "utf8");
const header = readFileSync(resolve(root, "components", "Header.tsx"), "utf8");

test("homepage carousel has pause state, progress timing, and accessible inactive slides", () => {
  assert.match(carousel, /isPointerPaused/);
  assert.match(carousel, /isFocusPaused/);
  assert.match(carousel, /isRotationPaused/);
  assert.match(carousel, /const isPaused = prefersReducedMotion \|\| isPointerPaused \|\| isFocusPaused \|\| isRotationPaused/);
  assert.match(carousel, /onMouseEnter=\{\(\) => setIsPointerPaused\(true\)\}/);
  assert.match(carousel, /onFocus=\{\(\) => setIsFocusPaused\(true\)\}/);
  assert.match(carousel, /data-paused=\{isPaused\}/);
  assert.match(carousel, /carousel-toggle/);
  assert.match(carousel, /aria-pressed=\{prefersReducedMotion \|\| isRotationPaused\}/);
  assert.match(carousel, /disabled=\{prefersReducedMotion\}/);
  assert.match(carousel, /carousel-progress/);
  assert.match(carousel, /key=\{`\$\{activeIndex\}-\$\{isPaused \? "paused" : "running"\}`\}/);
  assert.match(carousel, /aria-hidden=\{index !== activeIndex\}/);
  assert.match(css, /\.carousel-progress/);
  assert.match(css, /animation:\s*carousel-progress 6000ms linear/);
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
  assert.match(css, /\.carousel-progress[^{]*\{[^}]*display:\s*none/s);
});
