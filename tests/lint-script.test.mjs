import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

test("lint script scopes ESLint to tracked source directories", () => {
  assert.equal(packageJson.scripts.lint, "eslint app components lib sanity scripts tests");
});
