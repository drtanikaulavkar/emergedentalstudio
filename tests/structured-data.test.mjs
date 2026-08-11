import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const siteData = readFileSync(resolve(root, "lib", "siteData.ts"), "utf8");
const contact = readFileSync(resolve(root, "app", "contact", "page.tsx"), "utf8");
const layout = readFileSync(resolve(root, "app", "layout.tsx"), "utf8");

test("verified social profiles are shared by contact UI and Dentist schema", () => {
  assert.match(siteData, /export const socialProfiles/);
  assert.match(siteData, /instagram\.com\/emergedentalstudio/);
  assert.match(siteData, /facebook\.com\/profile\.php\?id=100085397533519/);
  assert.match(siteData, /linkedin\.com\/company\/emerge-dental-studio/);
  assert.match(contact, /import \{[^}]*socialProfiles[^}]*\} from "@\/lib\/siteData"/s);
  assert.doesNotMatch(contact, /const socialLinks = \[/);
  assert.match(layout, /sameAs:\s*socialProfiles\.map/);
});

test("Dentist schema identifies Dr. Tanisha as founder and lead dentist", () => {
  assert.match(layout, /founder:\s*\{/);
  assert.match(layout, /"@type":\s*"Person"/);
  assert.match(layout, /name:\s*doctor\.name/);
  assert.match(layout, /jobTitle:\s*doctor\.role/);
});
