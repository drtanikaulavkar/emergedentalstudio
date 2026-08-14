import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

test("service cards provide a single, labelled link to the corresponding treatment", () => {
  const card = readFileSync("components/ServiceCard.tsx", "utf8");

  assert.match(card, /<Link/);
  assert.match(card, /\/services\/\$\{service\.slug\}/);
  assert.match(card, /aria-label/);
});
