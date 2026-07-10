import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

test("header exposes services as a dropdown of direct service links", () => {
  const header = readFileSync("components/Header.tsx", "utf8");
  const layout = readFileSync("app/layout.tsx", "utf8");

  assert.match(header, /services:\s*Pick<Service,\s*"title"\s*\|\s*"slug">/);
  assert.match(header, /Header\.module\.css/);
  assert.match(header, /aria-haspopup="menu"/);
  assert.match(header, /className=\{styles\.serviceMenu\}/);
  assert.match(header, /href=\{`\/services\/\$\{service\.slug\}`\}/);
  assert.doesNotMatch(header, /\{href:\s*"\/services",\s*label:\s*"Services"\}/);
  assert.match(layout, /getServices/);
  assert.match(layout, /<Header settings=\{settings\} services=\{services\}/);
});
