import {existsSync, readFileSync} from "node:fs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const nodeVersion = existsSync(".node-version") ? readFileSync(".node-version", "utf8").trim() : "";

const failures = [];

if (packageJson.engines?.node !== "24.x") {
  failures.push('package.json must set engines.node to "24.x".');
}

if (nodeVersion !== "24") {
  failures.push('.node-version must contain "24".');
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Runtime config targets Node 24.");
