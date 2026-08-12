import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";
import {jsx} from "react/jsx-runtime";
import ts from "typescript";

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

test("JsonLd escapes script-closing payloads before inserting serialized data", async () => {
  const {JsonLd} = await loadJsonLd();
  const maliciousData = {name: "Malicious </script><script>alert('xss')</script> payload"};

  const element = JsonLd({data: maliciousData});
  const serialized = element.props.dangerouslySetInnerHTML.__html;

  assert.equal(serialized.includes("</script>"), false);
  assert.match(serialized, /\\u003c\/script>/);
  assert.deepEqual(JSON.parse(serialized), maliciousData);
});

async function loadJsonLd() {
  const compiled = ts.transpileModule(readFileSync(resolve(root, "components", "JsonLd.tsx"), "utf8"), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX}
  }).outputText;
  globalThis.__jsonLdJsx = jsx;
  const runnable = compiled.replace(
    'import { jsx as _jsx } from "react/jsx-runtime";',
    "const _jsx = globalThis.__jsonLdJsx;"
  );

  return import(`data:text/javascript;base64,${Buffer.from(runnable).toString("base64")}`);
}
