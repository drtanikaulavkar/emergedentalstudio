import assert from "node:assert/strict";
import {existsSync, readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";
import ts from "typescript";

const root = resolve(import.meta.dirname, "..");
const read = (...parts) => readFileSync(resolve(root, ...parts), "utf8");

test("homepage targets dentist and implantologist searches in Indiranagar", () => {
  const siteData = read("lib", "siteData.ts");
  const expectedTitle = "Dentist & Implantologist in Indiranagar, Bengaluru | Emerge Dental Studio";

  assert.equal(siteData.match(new RegExp(expectedTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"))?.length, 1);
  assert.match(siteData, /const homeSeoTitle =/);
  assert.equal(siteData.match(/title: homeSeoTitle/g)?.length, 1);
  assert.equal(siteData.match(/seoTitle: homeSeoTitle/g)?.length, 1);
  assert.doesNotMatch(siteData, /Best Dentist Near Me in Bengaluru/);
});

test("public routes use the shared canonical and Open Graph metadata builder", () => {
  const seoPath = resolve(root, "lib", "seo.ts");
  assert.equal(existsSync(seoPath), true, "lib/seo.ts should exist");

  const seo = read("lib", "seo.ts");
  assert.match(seo, /export function buildPageMetadata/);
  assert.match(seo, /alternates:\s*\{\s*canonical:\s*path/);
  assert.match(seo, /openGraph:\s*\{/);
  assert.match(seo, /url:\s*path/);
  assert.match(seo, /title:\s*\{absolute:\s*brandedTitle\}/);

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

test("page metadata returns branded canonical and Open Graph values", async () => {
  const {buildPageMetadata} = await loadSeoHelpers();

  const metadata = buildPageMetadata({title: "Dental Blogs", description: "Useful dental guides.", path: "/blogs"});

  assert.deepEqual(metadata.title, {absolute: "Dental Blogs | Emerge Dental Studio"});
  assert.equal(metadata.description, "Useful dental guides.");
  assert.deepEqual(metadata.alternates, {canonical: "/blogs"});
  assert.equal(metadata.openGraph.title, "Dental Blogs | Emerge Dental Studio");
  assert.equal(metadata.openGraph.url, "/blogs");
});

test("page metadata includes the clinic brand once when a title repeats it", async () => {
  const {buildPageMetadata} = await loadSeoHelpers();

  const metadata = buildPageMetadata({
    title: "Dental Implants | Emerge Dental Studio | Emerge Dental Studio",
    description: "Implant care.",
    path: "/services/dental-implants"
  });

  assert.deepEqual(metadata.title, {absolute: "Dental Implants | Emerge Dental Studio"});
  assert.equal(metadata.openGraph.title, "Dental Implants | Emerge Dental Studio");
});

test("service metadata targets treatment searches in Indiranagar Bengaluru", () => {
  const seo = read("lib", "seo.ts");
  const servicePage = read("app", "services", "[slug]", "page.tsx");

  assert.match(seo, /export function buildServiceMetadata/);
  assert.match(seo, /\$\{title\} in Indiranagar, Bengaluru/);
  assert.match(seo, /Emerge Dental Studio in Indiranagar, Bengaluru/);
  assert.match(servicePage, /buildServiceMetadata\(\{/);
});

test("service metadata helper returns search-focused title description and canonical path", async () => {
  const {buildServiceMetadata} = await loadSeoHelpers();

  const metadata = buildServiceMetadata({title: "Dental Implants", summary: "Permanent tooth replacement.", slug: "dental-implants"});

  assert.deepEqual(metadata.title, {absolute: "Dental Implants in Indiranagar, Bengaluru | Emerge Dental Studio"});
  assert.equal(
    metadata.description,
    "Permanent tooth replacement. Available at Emerge Dental Studio in Indiranagar, Bengaluru."
  );
  assert.deepEqual(metadata.alternates, {canonical: "/services/dental-implants"});
});

test("Blogs metadata does not duplicate the clinic name", () => {
  const blogs = read("app", "blogs", "page.tsx");
  assert.doesNotMatch(blogs, /title:\s*"Dental Blogs \| Emerge Dental Studio"/);
  assert.match(blogs, /title:\s*"Dental Blogs"/);
});

test("interim content stays visible without public placeholder wording", () => {
  const home = read("app", "page.tsx");
  const blogs = read("app", "blogs", "page.tsx");
  const visiblePlaceholderCopy = /<(?:h[1-6]|p)[^>]*>[^<{]*placeholder[^<{]*<\/(?:h[1-6]|p)>/i;

  assert.doesNotMatch(home, visiblePlaceholderCopy);
  assert.doesNotMatch(blogs, visiblePlaceholderCopy);
  assert.equal(home.match(/className="gallery-card video-placeholder"/g)?.length, 2);
  assert.match(home, /will be added soon/i);
  assert.match(blogs, /are coming soon/i);
});

test("sitemap does not claim every page changed at request time", () => {
  const sitemap = read("app", "sitemap.ts");
  assert.doesNotMatch(sitemap, /lastModified:\s*new Date\(\)/);
  assert.doesNotMatch(sitemap, /lastModified:/);
});

async function loadSeoHelpers() {
  const compiled = ts.transpileModule(read("lib", "seo.ts"), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022}
  }).outputText;

  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}
