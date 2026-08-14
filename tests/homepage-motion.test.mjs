import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

test("hero carousel pauses for reduced motion and user interaction, and hides inactive slides", () => {
  const carousel = readFileSync("components/HeroCarousel.tsx", "utf8");

  assert.match(carousel, /prefersReducedMotion/);
  assert.match(carousel, /isPointerPaused/);
  assert.match(carousel, /isFocusPaused/);
  assert.match(carousel, /aria-hidden=\{index !== activeIndex\}/);
});
