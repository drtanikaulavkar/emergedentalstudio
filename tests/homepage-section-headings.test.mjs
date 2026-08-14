import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

const homepage = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

test("homepage major sections use one clear heading instead of duplicate kickers", () => {
  for (const heading of [
    "Why Choose Us",
    "Patient Reviews",
    "Smile Gallery",
    "Frequently Asked Questions",
    "Visit Our Clinic",
  ]) {
    assert.match(homepage, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(homepage, />Meet the doctor</);
  assert.match(homepage, /<h2>\{doctor\.name\}<\/h2>/);
  assert.match(homepage, /eyebrow="Services"/);
  assert.match(homepage, /title=\{servicesIntro\?\.title \|\| "Care for every stage of your smile"\}/);

  for (const redundantCopy of [
    ">Facilities<",
    'eyebrow="Hear what our patients have to say about us"',
    'eyebrow="Smile gallery"',
    ">Before you visit<",
    ">Contact us<",
  ]) {
    assert.doesNotMatch(homepage, new RegExp(redundantCopy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("doctor credentials render as two distinct lines", () => {
  assert.match(homepage, /className="doctor-credential-copy"/);
  assert.match(homepage, /<span>\{doctor\.role\}<\/span>/);
  assert.match(homepage, /<span>BDS, MDS in Prosthodontics\.<\/span>/);
  assert.doesNotMatch(homepage, /\{doctor\.role\} - \{doctor\.qualifications\}/);
});
