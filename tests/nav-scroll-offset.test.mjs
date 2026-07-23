import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

test("page scroll targets leave room for the sticky header", () => {
  const css = readFileSync("app/globals.css", "utf8");

  assert.match(css, /main\s*\{[^}]*scroll-margin-top:\s*80px/s);
});
