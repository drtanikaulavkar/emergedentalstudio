import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const css = await readFile(
  new URL("../app/services/services.module.css", import.meta.url),
  "utf8",
);
const globalCss = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);

function declaration(selector, property, source = css) {
  const selectorPattern = selector
    .trim()
    .split(/\s+/)
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("\\s+");
  const propertyPattern = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(
    new RegExp(`${selectorPattern}\\s*\\{([\\s\\S]*?)\\}`, "m"),
  );

  assert.ok(match, `Expected a ${selector} rule`);

  const value = match[1].match(
    new RegExp(`${propertyPattern}\\s*:\\s*([^;]+);`),
  );

  assert.ok(value, `Expected ${property} in ${selector}`);
  return value[1].trim();
}

test("services directory summaries use readable body typography", () => {
  assert.equal(
    declaration(".servicesGrid :global(.service-card-summary)", "font-size"),
    "1rem",
  );
  assert.ok(
    Number(declaration(".servicesGrid :global(.service-card-summary)", "line-height")) >=
      1.5,
  );
});

test("services hero and case supporting copy meet the readable body minimum", () => {
  for (const selector of [".servicesHeroIndex p", ".caseCaption"]) {
    assert.equal(declaration(selector, "font-size"), "1rem");
    assert.ok(Number(declaration(selector, "line-height")) >= 1.5);
  }
});

test("treatment detail copy meets the approved minimum size and leading", () => {
  assert.equal(declaration(".serviceIntro", "font-size"), "clamp(1.0625rem, 1.25vw, 1.08rem)");
  assert.ok(Number(declaration(".serviceIntro", "line-height")) >= 1.5);
  assert.doesNotMatch(
    css,
    /@media \(max-width: 560px\)[\s\S]*?\.serviceIntro\s*\{[^}]*font-size/,
  );
  assert.doesNotMatch(
    css,
    /@media \(max-width: 560px\)[\s\S]*?\.serviceIntro\s*\{[^}]*line-height:\s*1\.[0-4]\d*\s*;/,
  );

  for (const selector of [
    ".processStep p,\n.sectionCard p,\n.sectionCard li,\n.aftercareList li",
  ]) {
    assert.equal(declaration(selector, "font-size"), "1rem");
    assert.ok(Number(declaration(selector, "line-height")) >= 1.55);
  }
});

test("service labels and navigation use the prescribed type hierarchy", () => {
  assert.equal(declaration(".pageGuide a", "font-size"), "0.9375rem");
  assert.equal(declaration(".pageGuide a", "font-weight"), "600");

  for (const selector of [
    ".pageGuide strong",
    ".sectionLabel",
    ".caseLabel",
    ".relatedLink small",
  ]) {
    assert.ok(parseFloat(declaration(selector, "font-size")) >= 0.8125);
    assert.equal(declaration(selector, "font-weight"), "700");
    assert.equal(declaration(selector, "text-transform"), "uppercase");
    assert.match(declaration(selector, "letter-spacing"), /em$/);
  }

  assert.ok(parseFloat(declaration(".stepNumber", "font-size")) >= 0.8125);
  assert.equal(declaration(".stepNumber", "font-weight"), "700");

  assert.ok(parseFloat(declaration(".servicesHeroIndex span", "font-size")) >= 0.8125);
  assert.equal(declaration(".servicesHeroIndex span", "font-weight"), "700");
  assert.equal(declaration(".servicesHeroIndex span", "text-transform"), "uppercase");
  const heroIndexTracking = parseFloat(
    declaration(".servicesHeroIndex span", "letter-spacing"),
  );
  assert.ok(heroIndexTracking >= 0.06 && heroIndexTracking <= 0.1);
});

test("service typography uses only the intended display weights", () => {
  assert.equal(declaration(".benefitsList", "font-weight"), "700");
  assert.equal(declaration(".relatedLink", "font-weight"), "700");
  assert.ok(
    parseFloat(
      declaration(".processStep h3,\n.sectionCard h3,\n.caseCard h3", "font-size"),
    ) >= 1.125,
  );
  assert.equal(declaration(".processStep h3,\n.sectionCard h3,\n.caseCard h3", "font-weight"), "800");
  assert.doesNotMatch(css, /font-weight:\s*(?:650|750|900)\s*;/);
  assert.equal(css.match(/font-weight:\s*800\s*;/g)?.length, 1);
});

test("service section headings keep the approved mobile minimum and bold weight", () => {
  assert.equal(
    declaration(".serviceSection h2", "font-size"),
    "clamp(1.5rem, 2.4vw, 2.05rem)",
  );
  assert.doesNotMatch(
    css.match(/\.serviceSection h2\s*\{([\s\S]*?)\}/)?.[1] ?? "",
    /font-weight\s*:/,
  );
  assert.match(globalCss, /h2\s*\{[^}]*font-weight:\s*700\s*;/);
});
