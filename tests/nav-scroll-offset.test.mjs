import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

test("native anchor navigation accounts for the rendered header height", () => {
  const css = readFileSync("app/globals.css", "utf8");
  const header = readFileSync("components/Header.tsx", "utf8");

  assert.match(header, /ResizeObserver/);
  assert.match(header, /--site-header-height/);
  assert.match(css, /scroll-padding-top:\s*var\(--site-header-height/);
});
