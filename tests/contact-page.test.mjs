import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import test from "node:test";
import ts from "typescript";
import vm from "node:vm";

function loadSiteData() {
  const source = readFileSync(join(process.cwd(), "lib", "siteData.ts"), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;

  const sandbox = {
    exports: {},
    process,
    console
  };

  vm.runInNewContext(compiled, sandbox, {filename: "siteData.ts"});
  return sandbox.exports;
}

test("contact page opens with a compact hero and no explanatory subheading", () => {
  const contactPage = readFileSync(join(process.cwd(), "app", "contact", "page.tsx"), "utf8");
  const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
  const {pages} = loadSiteData();

  assert.equal(pages.contact.heroText, "");
  assert.doesNotMatch(contactPage, /<p>\{page\.heroText\}<\/p>/);
  assert.match(contactPage, /className="page-hero contact-hero"/);
  assert.match(contactPage, /const contactServiceAreas = \[/);
  assert.doesNotMatch(contactPage, /settings\.serviceAreas\.map/);
  assert.match(css, /\.contact-hero\s*\{[^}]*padding-block:\s*clamp\(28px,\s*4vw,\s*48px\)/s);
  assert.match(css, /\.contact-hero h1\s*\{[^}]*font-size:\s*clamp\(1\.9rem,\s*3\.2vw,\s*2\.8rem\)/s);
});

test("contact form service areas show only the requested nearby neighborhoods", () => {
  const {siteSettings} = loadSiteData();

  assert.deepEqual(Array.from(siteSettings.serviceAreas), [
    "Indiranagar",
    "Koramangala",
    "Domlur",
    "Ulsoor",
    "Cambridge layout"
  ]);
});
