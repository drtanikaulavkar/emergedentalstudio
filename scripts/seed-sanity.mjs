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

function keyFromParts(parts) {
  const key = parts
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return key || "item";
}

function uniqueKey(base, seen) {
  const count = seen.get(base) || 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

function withArrayKeys(value) {
  if (Array.isArray(value)) {
    const seen = new Map();

    return value.map((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return item;
      }

      const keyedItem = withArrayKeys(item);
      const baseKey = keyFromParts([
        item.slug?.current || item.slug,
        item.title,
        item.name,
        item.days,
        item.label,
        index
      ]);

      return {
        ...keyedItem,
        _key: item._key || uniqueKey(baseKey, seen)
      };
    });
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, withArrayKeys(child)]));
  }

  return value;
}

await client.createOrReplace(withArrayKeys({
  _id: "siteSettings",
  _type: "siteSettings",
  ...siteSettings
}));

for (const page of Object.values(pages)) {
  await client.createOrReplace(withArrayKeys({
    _id: `page-${page.slug}`,
    _type: "page",
    ...page,
    slug: {_type: "slug", current: page.slug}
  }));
}

for (const service of services) {
  await client.createOrReplace(withArrayKeys({
    _id: `service-${service.slug}`,
    _type: "service",
    ...service,
    slug: {_type: "slug", current: service.slug},
    orderRank: services.findIndex((item) => item.slug === service.slug) + 1
  }));
}

console.log("Seeded site settings, pages, and services.");
