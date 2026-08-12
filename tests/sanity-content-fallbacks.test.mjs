import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import test from "node:test";
import ts from "typescript";

const root = resolve(import.meta.dirname, "..");
const fallbackPage = {
  title: "Home",
  slug: "home",
  seoTitle: "Fallback SEO title",
  seoDescription: "Fallback SEO description",
  heroTitle: "Fallback hero",
  heroText: "Fallback hero text",
  sections: []
};
const fallbackSettings = {
  title: "Fallback site title",
  description: "Fallback site description",
  siteUrl: "https://example.com",
  clinicName: "Emerge Dental Studio",
  phone: "123",
  whatsappNumber: "123",
  email: "clinic@example.com",
  bookingUrl: "https://example.com/book",
  address: {street: "Street", locality: "Area", city: "City", region: "State", postalCode: "123", country: "IN"},
  hours: [],
  closedDays: [],
  serviceAreas: [],
  testimonials: []
};
const fallbackService = makeService({
  title: "Local service",
  slug: "local-service",
  summary: "Local card summary",
  description: "Local page description"
});

const client = {fetch: async () => null};
globalThis.__sanityTestClient = client;
globalThis.__sanityTestData = {
  pages: {home: fallbackPage},
  services: [fallbackService],
  siteSettings: fallbackSettings
};

const queries = await loadQueries();

test("null and blank CMS SEO text preserves page fallbacks", async () => {
  client.fetch = async () => ({
    ...fallbackPage,
    title: "Published home",
    seoTitle: null,
    seoDescription: "   "
  });

  const page = await queries.getPageBySlug("home");

  assert.equal(page.seoTitle, fallbackPage.seoTitle);
  assert.equal(page.seoDescription, fallbackPage.seoDescription);
});

test("null and blank CMS SEO text preserves site-setting fallbacks", async () => {
  client.fetch = async () => ({
    ...fallbackSettings,
    title: null,
    description: "\n\t"
  });

  const settings = await queries.getSiteSettings();

  assert.equal(settings.title, fallbackSettings.title);
  assert.equal(settings.description, fallbackSettings.description);
});

test("null and blank CMS service copy preserves matching local content", async () => {
  client.fetch = async () => [
    makeService({
      title: "Published local service",
      slug: fallbackService.slug,
      summary: null,
      description: "   "
    })
  ];

  const [service] = await queries.getServices();

  assert.equal(service.summary, fallbackService.summary);
  assert.equal(service.description, fallbackService.description);
});

test("a CMS-only service derives a safe summary when its summary is missing", async () => {
  client.fetch = async () => [
    makeService({
      title: "CMS-only service",
      slug: "cms-only-service",
      summary: null,
      description: "A complete published service description."
    })
  ];

  const [service] = await queries.getServices();

  assert.equal(service.summary, "A complete published service description.");
  assert.equal(service.description, "A complete published service description.");
});

function makeService(overrides) {
  return {
    title: "Service",
    slug: "service",
    eyebrow: "Care",
    summary: "Summary",
    description: "Description",
    imageSrc: "/image.jpg",
    imageAlt: "Service image",
    highlights: [],
    benefits: [],
    process: [],
    aftercare: [],
    sections: [],
    faqs: [],
    relatedServices: [],
    ...overrides
  };
}

async function loadQueries() {
  globalThis.__sanityContentMerge = await loadTypeScriptModule(resolve(root, "lib", "sanity", "contentMerge.ts"));
  const source = readFileSync(resolve(root, "lib", "sanity", "queries.ts"), "utf8")
    .replace('import {groq} from "next-sanity";', "const groq = (parts) => parts.join('');")
    .replace('import {client} from "./client";', "const client = globalThis.__sanityTestClient;")
    .replace(
      /import \{pages, services, siteSettings, type PageContent, type Service, type SiteSettings\} from "@\/lib\/siteData";/,
      "const {pages, services, siteSettings} = globalThis.__sanityTestData;"
    )
    .replace(
      /import \{[\s\S]*?\} from "\.\/contentMerge";/,
      "const {mergePageContent, mergeServiceContent, mergeSiteSettings} = globalThis.__sanityContentMerge;"
    );
  const compiled = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022}
  }).outputText;

  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}

async function loadTypeScriptModule(path) {
  const compiled = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022}
  }).outputText;

  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}
