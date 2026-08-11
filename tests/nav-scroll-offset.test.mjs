import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

test("native scrolling uses the rendered sticky header height", () => {
  const css = readFileSync("app/globals.css", "utf8");
  const header = readFileSync("components/Header.tsx", "utf8");

  assert.match(header, /ref=\{headerRef\}/);
  assert.match(header, /new ResizeObserver\(updateScrollPadding\)/);
  assert.match(header, /getBoundingClientRect\(\)\.height/);
  assert.match(header, /style\.setProperty\("--site-header-height", `\$\{headerHeight\}px`\)/);
  assert.match(header, /resizeObserver\.disconnect\(\)/);
  assert.match(css, /html\s*\{[^}]*scroll-padding-top:\s*var\(--site-header-height,\s*0px\)/s);
  assert.doesNotMatch(css, /main\s*\{[^}]*scroll-margin-top\s*:/s);
});
