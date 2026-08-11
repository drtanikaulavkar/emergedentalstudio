import assert from "node:assert/strict";
import {existsSync, readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const read = (...parts) => readFileSync(resolve(root, ...parts), "utf8");

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

test("service metadata targets treatment searches in Indiranagar Bengaluru", () => {
  const seo = read("lib", "seo.ts");
  const servicePage = read("app", "services", "[slug]", "page.tsx");

  assert.match(seo, /export function buildServiceMetadata/);
  assert.match(seo, /\$\{title\} in Indiranagar, Bengaluru/);
  assert.match(seo, /Emerge Dental Studio in Indiranagar, Bengaluru/);
  assert.match(servicePage, /buildServiceMetadata\(\{/);
});

test("Blogs metadata does not duplicate the clinic name", () => {
  const blogs = read("app", "blogs", "page.tsx");
  assert.doesNotMatch(blogs, /title:\s*"Dental Blogs \| Emerge Dental Studio"/);
  assert.match(blogs, /title:\s*"Dental Blogs"/);
});
