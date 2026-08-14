import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";
import {jsx} from "react/jsx-runtime";
import ts from "typescript";

const root = resolve(import.meta.dirname, "..");

test("Dentist structured data reuses the shared social-profile source", () => {
  const contact = readFileSync(resolve(root, "app", "contact", "page.tsx"), "utf8");
  const layout = readFileSync(resolve(root, "app", "layout.tsx"), "utf8");

  assert.match(contact, /socialProfiles/);
  assert.match(layout, /sameAs:\s*socialProfiles\.map/);
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
