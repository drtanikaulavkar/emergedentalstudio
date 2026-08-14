import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import test from "node:test";
import ts from "typescript";
import vm from "node:vm";

function loadServices() {
  const source = readFileSync(join(process.cwd(), "lib", "siteData.ts"), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}
  }).outputText;
  const sandbox = {exports: {}, process, console};

  vm.runInNewContext(compiled, sandbox, {filename: "siteData.ts"});
  return sandbox.exports.services;
}

test("local service fallbacks supply complete, accessible treatment-page content", () => {
  const services = loadServices();

  assert.ok(services.length > 0);
  for (const service of services) {
    assert.ok(service.slug && service.title && service.summary && service.description, `${service.slug} has core copy`);
    assert.ok(service.imageSrc && service.imageAlt, `${service.slug} has an accessible image`);
    assert.ok(service.benefits?.length && service.process?.length && service.faqs?.length, `${service.slug} has supporting content`);
  }
});
