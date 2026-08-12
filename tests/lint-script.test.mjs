import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const eslintConfig = readFileSync(resolve(root, "eslint.config.mjs"), "utf8");

test("lint script covers the repository including tracked root configs", () => {
  assert.equal(packageJson.scripts.lint, "eslint .");
  assert.doesNotMatch(packageJson.scripts.lint, /app components|lib sanity|scripts tests/);
});

test("ESLint ignores preserved local scratch directories", () => {
  assert.match(eslintConfig, /"\.codex-temp\/\*\*"/);
  assert.match(eslintConfig, /"\.playwright-cli\/\*\*"/);
  assert.match(eslintConfig, /"\.worktrees\/\*\*"/);
});
