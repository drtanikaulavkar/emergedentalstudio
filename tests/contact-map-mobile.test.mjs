import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const css = readFileSync(resolve(root, "app", "globals.css"), "utf8");

test("contact map directions overlay is hidden on smaller screens", () => {
  assert.match(
    css,
    /@media \(max-width: 560px\)[\s\S]*?\.contact-map-link\s*\{[^}]*display:\s*none;[^}]*\}/
  );
});
