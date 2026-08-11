import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const layout = readFileSync(resolve(root, "app", "layout.tsx"), "utf8");

test("declares Vercel Analytics and Speed Insights as production dependencies", () => {
  assert.equal(typeof packageJson.dependencies?.["@vercel/analytics"], "string");
  assert.equal(typeof packageJson.dependencies?.["@vercel/speed-insights"], "string");
});

test("mounts Vercel Analytics and Speed Insights once in the root layout", () => {
  assert.match(layout, /import \{Analytics\} from "@vercel\/analytics\/next";/);
  assert.match(layout, /import \{SpeedInsights\} from "@vercel\/speed-insights\/next";/);
  assert.equal(layout.match(/<Analytics\s*\/>/g)?.length, 1);
  assert.equal(layout.match(/<SpeedInsights\s*\/>/g)?.length, 1);
});
