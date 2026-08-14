import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

test("header receives CMS service data and exposes direct treatment links", () => {
  const header = readFileSync("components/Header.tsx", "utf8");
  const layout = readFileSync("app/layout.tsx", "utf8");

  assert.match(layout, /getServices/);
  assert.match(layout, /<Header[^>]*services=\{services\}/);
  assert.match(header, /\/services\/\$\{service\.slug\}/);
});

test("services disclosure supports pointer, keyboard, and screen-reader interaction", () => {
  const header = readFileSync("components/Header.tsx", "utf8");

  assert.match(header, /onClick/);
  assert.match(header, /onPointerEnter/);
  assert.match(header, /onPointerLeave/);
  assert.match(header, /Escape/);
  assert.match(header, /aria-controls/);
  assert.match(header, /aria-hidden/);
  assert.match(header, /inert/);
  assert.match(header, /\.focus\(\)/);
});

test("service detail navigation does not replace native scrolling with a loading shell", () => {
  const css = readFileSync("app/services/services.module.css", "utf8");

  assert.doesNotMatch(css, /service-loading-pulse/);
});
