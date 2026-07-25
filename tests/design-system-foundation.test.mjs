import assert from "node:assert/strict";
import {existsSync, readFileSync} from "node:fs";
import test from "node:test";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

test("design system dependencies are installed", () => {
  const dependencies = packageJson.dependencies ?? {};

  for (const dependency of [
    "@radix-ui/react-slot",
    "@tailwindcss/postcss",
    "tailwindcss",
    "tw-animate-css",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "lucide-react",
    "motion"
  ]) {
    assert.ok(dependencies[dependency], `${dependency} should be listed in dependencies`);
  }
});

test("design system foundation files exist", () => {
  for (const path of ["postcss.config.mjs", "components/ui/button.tsx", "lib/utils.ts"]) {
    assert.ok(existsSync(path), `${path} should exist`);
  }
});

test("global stylesheet loads Tailwind and exposes theme tokens", () => {
  const css = readFileSync("app/globals.css", "utf8");

  assert.match(css, /@import\s+["']tailwindcss["'];/);
  assert.match(css, /@import\s+["']tw-animate-css["'];/);
  assert.match(css, /--palette-orchid:\s*#a763ae;/);
  assert.match(css, /--action:\s*color-mix\(in srgb,\s*var\(--palette-orchid\)\s*72%,\s*var\(--palette-plum\)\);/);
  assert.match(css, /--brand:\s*var\(--action\);/);
});
