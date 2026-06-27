import {createClient} from "@sanity/client";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import vm from "node:vm";
import ts from "typescript";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "el8er4wl";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-27";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Set SANITY_API_WRITE_TOKEN before running pnpm sanity:seed.");
  process.exit(1);
}

function loadSiteData() {
  const source = readFileSync(join(process.cwd(), "lib", "siteData.ts"), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;

  const sandbox = {
    exports: {},
    process,
    console
  };

  vm.runInNewContext(compiled, sandbox, {filename: "siteData.ts"});
  return sandbox.exports;
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

const {siteSettings, pages, services} = loadSiteData();

await client.createOrReplace({
  _id: "siteSettings",
  _type: "siteSettings",
  ...siteSettings
});

for (const page of Object.values(pages)) {
  await client.createOrReplace({
    _id: `page-${page.slug}`,
    _type: "page",
    ...page,
    slug: {_type: "slug", current: page.slug}
  });
}

for (const service of services) {
  await client.createOrReplace({
    _id: `service-${service.slug}`,
    _type: "service",
    ...service,
    slug: {_type: "slug", current: service.slug},
    orderRank: services.findIndex((item) => item.slug === service.slug) + 1
  });
}

console.log("Seeded site settings, pages, and services.");
