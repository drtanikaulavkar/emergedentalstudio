import assert from "node:assert/strict";
import {existsSync, readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const templatePath = resolve(root, "app", "template.tsx");
const css = readFileSync(resolve(root, "app", "globals.css"), "utf8");

test("root app template wraps route content for page transition animation", () => {
  assert.equal(existsSync(templatePath), true, "app/template.tsx should exist");

  const template = readFileSync(templatePath, "utf8");

  assert.match(template, /export default function Template/);
  assert.match(template, /children:\s*React\.ReactNode/);
  assert.match(template, /className="page-transition-shell"/);
});

test("page transition uses a subtle lift crossfade with reduced motion fallback", () => {
  assert.match(css, /\.page-transition-shell\s*\{[^}]*animation:\s*page-soft-lift 240ms var\(--ease-out-quint\) both/s);
  assert.match(css, /@keyframes page-soft-lift[\s\S]*opacity:\s*0/);
  assert.match(css, /@keyframes page-soft-lift[\s\S]*transform:\s*translateY\(8px\)/);
  assert.match(css, /@keyframes page-soft-lift[\s\S]*filter:\s*blur\(3px\)/);
  assert.match(css, /@keyframes page-soft-lift[\s\S]*opacity:\s*1/);
  assert.match(css, /@keyframes page-soft-lift[\s\S]*transform:\s*translateY\(0\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.page-transition-shell\s*\{[^}]*animation:\s*page-soft-fade 1ms linear both/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*@keyframes page-soft-fade\s*\{[^}]*opacity:\s*1/s);
});
