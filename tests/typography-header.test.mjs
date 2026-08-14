import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesheet = await readFile(
  new URL("../components/Header.module.css", import.meta.url),
  "utf8",
);

test("service dropdown links use the specified readable typography", () => {
  const serviceLinks = stylesheet.match(/\.serviceMenu a\s*\{([\s\S]*?)\n\}/);

  assert.ok(serviceLinks, "Expected a .serviceMenu a rule.");
  assert.match(serviceLinks[1], /font-size:\s*0\.9375rem;/);
  assert.match(serviceLinks[1], /font-weight:\s*700;/);
});

test("header typography excludes overly heavy legacy weights", () => {
  assert.doesNotMatch(stylesheet, /font-weight:\s*(?:900|750|650);/);
});
