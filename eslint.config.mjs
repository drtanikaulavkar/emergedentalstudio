import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    ".codex-temp/**",
    ".playwright-cli/**",
    ".worktrees/**",
    "out/**",
    "output/**",
    "build/**",
    "next-env.d.ts"
  ])
]);

export default eslintConfig;
