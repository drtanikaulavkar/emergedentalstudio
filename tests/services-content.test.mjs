import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import test from "node:test";
import ts from "typescript";
import vm from "node:vm";

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

test("services include complete seeded content for every service page", () => {
  const {services} = loadSiteData();
  const slugs = Array.from(services, (service) => service.slug);

  assert.deepEqual(slugs, [
    "dental-implants",
    "cosmetic-dentistry",
    "braces-aligners",
    "pediatric-dentistry",
    "root-canal-treatment",
    "dentures",
    "full-mouth-rehabilitation",
    "extractions-impactions",
    "teeth-cleaning-whitening",
    "crowns-bridges"
  ]);

  for (const service of services) {
    assert.ok(service.title, `${service.slug} has a title`);
    assert.ok(service.summary, `${service.slug} has a card summary`);
    assert.ok(service.description, `${service.slug} has hero intro copy`);
    assert.ok(service.imageSrc, `${service.slug} has a hero image`);
    assert.ok(service.imageAlt, `${service.slug} has image alt text`);
    assert.ok(service.benefits?.length >= 3, `${service.slug} has compact benefit bullets`);
    assert.ok(service.process?.length >= 2, `${service.slug} has process steps`);
    assert.ok(service.aftercare?.length >= 1, `${service.slug} has aftercare`);
    assert.ok(service.faqs?.length >= 3, `${service.slug} has FAQs`);
  }
});

test("configured brand and before-after modules match requested services", () => {
  const {services} = loadSiteData();
  const bySlug = new Map(services.map((service) => [service.slug, service]));

  assert.deepEqual(
    Array.from(bySlug.get("dental-implants").brands, (brand) => brand.name),
    ["Dio Implants", "Osstem", "Nobel Biocare", "Neodent"]
  );
  assert.deepEqual(
    Array.from(bySlug.get("braces-aligners").brands, (brand) => brand.name),
    ["Invisalign", "Damon", "Illusion Aligners"]
  );

  for (const slug of [
    "dental-implants",
    "cosmetic-dentistry",
    "braces-aligners",
    "dentures",
    "full-mouth-rehabilitation",
    "teeth-cleaning-whitening"
  ]) {
    const beforeAfter = bySlug.get(slug).beforeAfter;
    assert.ok(beforeAfter?.length >= 2, `${slug} has before/after cases`);
    for (const item of beforeAfter) {
      assert.ok(item.beforeImageSrc, `${slug} before image`);
      assert.ok(item.afterImageSrc, `${slug} after image`);
    }
  }
});

test("service page heading scale stays readable beside approved body copy", () => {
  const css = readFileSync(join(process.cwd(), "app", "services", "services.module.css"), "utf8");
  const globalCss = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

  assert.match(globalCss, /h1\s*\{[^}]*font-size:\s*clamp\(2rem,\s*3\.6vw,\s*3\.35rem\)/s);
  assert.match(css, /\.serviceHeroGrid\s*\{[^}]*align-items:\s*center/s);
  assert.match(css, /\.serviceHeroGrid\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(280px,\s*0\.78fr\)/s);
  assert.match(css, /\.serviceHero h1\s*\{[^}]*font-size:\s*clamp\(2rem,\s*4\.2vw,\s*3\.35rem\)/s);
  assert.match(css, /\.serviceIntro\s*\{[^}]*font-size:\s*clamp\(0\.98rem,\s*1\.25vw,\s*1\.08rem\)/s);
  assert.match(css, /\.heroImage\s*\{[^}]*aspect-ratio:\s*16 \/ 10/s);
  assert.match(css, /\.heroImage\s*\{[^}]*height:\s*min\(34vw,\s*420px\)/s);
  assert.match(css, /\.heroImage\s*\{[^}]*max-height:\s*420px/s);
  assert.match(css, /\.heroImage\s*\{[^}]*min-height:\s*300px/s);
  assert.match(css, /@media \(max-width: 920px\)[\s\S]*\.heroImage\s*\{[^}]*height:\s*auto/s);
  assert.match(css, /\.serviceSection h2\s*\{[^}]*font-size:\s*clamp\(1\.45rem,\s*2\.4vw,\s*2\.05rem\)/s);
  assert.match(css, /\.finalCta h2\s*\{[^}]*font-size:\s*clamp\(1\.45rem,\s*2\.4vw,\s*2\.05rem\)/s);
});
