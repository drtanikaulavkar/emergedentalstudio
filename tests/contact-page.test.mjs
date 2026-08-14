import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import test from "node:test";
import ts from "typescript";
import vm from "node:vm";

function loadSiteData() {
  const source = readFileSync(join(process.cwd(), "lib", "siteData.ts"), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}
  }).outputText;
  const sandbox = {exports: {}, process, console};

  vm.runInNewContext(compiled, sandbox, {filename: "siteData.ts"});
  return sandbox.exports;
}

test("contact page keeps phone, email, social, and WhatsApp enquiry paths available", () => {
  const contactPage = readFileSync(join(process.cwd(), "app", "contact", "page.tsx"), "utf8");
  const bookingForm = readFileSync(join(process.cwd(), "components", "BookingForm.tsx"), "utf8");

  assert.match(contactPage, /tel:/);
  assert.match(contactPage, /mailto:/);
  assert.match(contactPage, /socialProfiles\.map/);
  assert.match(bookingForm, /Full name/);
  assert.match(bookingForm, /Treatment you are looking for/);
  assert.match(bookingForm, /wa\.me/);
  assert.match(bookingForm, /message\.trim\(\)/);
});

test("nearby service areas stay available from shared settings", () => {
  const {siteSettings} = loadSiteData();

  assert.deepEqual(Array.from(siteSettings.serviceAreas), [
    "Indiranagar",
    "Koramangala",
    "Domlur",
    "Ulsoor",
    "Cambridge layout"
  ]);
});
