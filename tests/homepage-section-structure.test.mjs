import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "app", "page.tsx"), "utf8");

const sectionClasses = [
  "services-section",
  "doctor-section",
  "why-choose-section",
  "reviews-section",
  "gallery-section",
  "faq-section",
  "contact-section"
];

test("non-hero homepage sections use full-width wrappers with nested containers", () => {
  for (const sectionClass of sectionClasses) {
    const sectionPattern = new RegExp(
      `<section className="section ${sectionClass}">\\s*<div className="container(?: [^"]+)?">`,
      "s"
    );

    assert.match(page, sectionPattern, `${sectionClass} must wrap a nested container`);
  }
});

test("homepage section backgrounds are not coupled to the container utility", () => {
  assert.doesNotMatch(page, /<section className="container section [^"]+">/);
});
