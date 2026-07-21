import {existsSync} from "node:fs";
import {spawn} from "node:child_process";
import {basename, join} from "node:path";

const scriptName = basename(process.argv[1] || "");

const candidateSkillDirs = [
  process.env.IMPECCABLE_SKILL_DIR,
  process.env.CODEX_HOME ? join(process.env.CODEX_HOME, "skills", "impeccable") : null,
  process.env.USERPROFILE ? join(process.env.USERPROFILE, ".codex", "skills", "impeccable") : null,
  process.env.HOME ? join(process.env.HOME, ".codex", "skills", "impeccable") : null
].filter(Boolean);

const installedScript = candidateSkillDirs
  .map((skillDir) => join(skillDir, "scripts", scriptName))
  .find((scriptPath) => existsSync(scriptPath));

if (!installedScript) {
  console.error(
    [
      `Could not find the installed impeccable helper script "${scriptName}".`,
      "Checked:",
      ...candidateSkillDirs.map((skillDir) => `- ${join(skillDir, "scripts", scriptName)}`),
      "",
      "Set IMPECCABLE_SKILL_DIR to the installed impeccable skill directory, or install the skill under CODEX_HOME/skills/impeccable."
    ].join("\n")
  );
  process.exitCode = 1;
} else {
  const child = spawn(process.execPath, [installedScript, ...process.argv.slice(2)], {
    env: process.env,
    stdio: "inherit"
  });

  const exitCode = await new Promise((resolve) => {
    child.on("error", (error) => {
      console.error(error);
      resolve(1);
    });
    child.on("exit", (code, signal) => {
      if (signal) {
        console.error(`Impeccable helper script exited with signal ${signal}.`);
        resolve(1);
        return;
      }
      resolve(code ?? 0);
    });
  });

  process.exitCode = exitCode;
}
