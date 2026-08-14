import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

test("homepage and treatment pages use native semantic FAQ disclosure", () => {
  const faq = readFileSync("components/FaqAccordion.tsx", "utf8");
  const homepage = readFileSync("app/page.tsx", "utf8");
  const treatmentPage = readFileSync("app/services/[slug]/page.tsx", "utf8");

  assert.match(faq, /<details\b/);
  assert.match(faq, /<summary\b/);
  assert.match(homepage, /FaqAccordion/);
  assert.match(treatmentPage, /FaqAccordion/);
});
