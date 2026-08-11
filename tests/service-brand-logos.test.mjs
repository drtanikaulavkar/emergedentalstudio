import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";

const pageSource = readFileSync("app/services/[slug]/page.tsx", "utf8");
const styleSource = readFileSync("app/services/services.module.css", "utf8");
const siteDataSource = readFileSync("lib/siteData.ts", "utf8");

test("brand tiles render logos without visible name captions", () => {
  assert.doesNotMatch(pageSource, /<span>\{brand\.name\}<\/span>/);
  assert.match(pageSource, /<Image src=\{brand\.logoSrc\} alt=\{brand\.logoAlt\}/);
  assert.doesNotMatch(styleSource, /\.brandCard span\s*\{/);
});

test("all brand names remain available in logo alt text", () => {
  const expectedAltLabels = [
    "Dio Implants logo",
    "Osstem logo",
    "Nobel Biocare logo",
    "Neodent logo",
    "Invisalign logo",
    "Damon braces logo",
    "Illusion Aligners logo",
  ];

  for (const label of expectedAltLabels) {
    assert.ok(siteDataSource.includes(`logoAlt: "${label}"`), `Missing alt label: ${label}`);
  }
});
