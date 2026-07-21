import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

test("homepage service cards use the whole card as the service link", () => {
  const card = readFileSync("components/ServiceCard.tsx", "utf8");
  const css = readFileSync("app/globals.css", "utf8");

  assert.match(card, /<Link\s+className="service-card"/);
  assert.match(card, /href=\{`\/services\/\$\{service\.slug\}`\}/);
  assert.match(card, /style=\{style\}/);
  assert.match(card, /aria-label=\{`View \$\{service\.title\}`\}/);
  assert.doesNotMatch(card, /service-card-link/);
  assert.doesNotMatch(card, /Learn more/);
  assert.doesNotMatch(card, /<article className="service-card"/);
  assert.match(css, /\.service-card:focus-visible/);
  assert.doesNotMatch(css, /\.service-card-link/);
  assert.doesNotMatch(css, /\.service-card a:focus-visible/);
});
