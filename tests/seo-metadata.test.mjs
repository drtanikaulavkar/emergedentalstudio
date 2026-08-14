import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";
import ts from "typescript";

const root = resolve(import.meta.dirname, "..");
const read = (...parts) => readFileSync(resolve(root, ...parts), "utf8");

test("public routes use the shared canonical and Open Graph metadata builder", () => {
  for (const route of [
    ["app", "page.tsx"],
    ["app", "about", "page.tsx"],
    ["app", "services", "page.tsx"],
    ["app", "contact", "page.tsx"],
    ["app", "blogs", "page.tsx"]
  ]) {
    assert.match(read(...route), /buildPageMetadata/);
  }
});

test("page metadata returns branded canonical and Open Graph values without duplicate branding", async () => {
  const {buildPageMetadata} = await loadSeoHelpers();
  const metadata = buildPageMetadata({
    title: "Dental Implants | Emerge Dental Studio | Emerge Dental Studio",
    description: "Implant care.",
    path: "/services/dental-implants"
  });

  assert.deepEqual(metadata.title, {absolute: "Dental Implants | Emerge Dental Studio"});
  assert.deepEqual(metadata.alternates, {canonical: "/services/dental-implants"});
  assert.equal(metadata.openGraph.url, "/services/dental-implants");
});

test("service metadata creates a search-focused title, description, and canonical path", async () => {
  const {buildServiceMetadata} = await loadSeoHelpers();
  const metadata = buildServiceMetadata({title: "Dental Implants", summary: "Permanent tooth replacement.", slug: "dental-implants"});

  assert.deepEqual(metadata.title, {absolute: "Dental Implants in Indiranagar, Bengaluru | Emerge Dental Studio"});
  assert.equal(metadata.description, "Permanent tooth replacement. Available at Emerge Dental Studio in Indiranagar, Bengaluru.");
  assert.deepEqual(metadata.alternates, {canonical: "/services/dental-implants"});
});

test("sitemap avoids assigning a request-time modification date to every route", () => {
  assert.doesNotMatch(read("app", "sitemap.ts"), /lastModified:\s*new Date\(\)/);
});

async function loadSeoHelpers() {
  const compiled = ts.transpileModule(read("lib", "seo.ts"), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022}
  }).outputText;

  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}
