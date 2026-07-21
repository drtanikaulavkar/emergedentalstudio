import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {dirname, resolve} from "node:path";
import test from "node:test";

const testDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(testDir, "..");

test("project-local impeccable context script delegates to the installed skill script", () => {
  const result = spawnSync(
    process.execPath,
    [".agents/skills/impeccable/scripts/context.mjs", "--target", "app"],
    {
      cwd: repoRoot,
      encoding: "utf8"
    }
  );

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /# PRODUCT\.md/);
  assert.match(result.stdout, /RESOLVED_CONTEXT/);
  assert.match(result.stdout, /project's register is `brand`/);
});
