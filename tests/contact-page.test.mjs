import assert from "node:assert/strict";
import {existsSync, readFileSync} from "node:fs";
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

test("contact page provides direct contact, social, enquiry, and directions paths", () => {
  const contactPage = readFileSync(join(process.cwd(), "app", "contact", "page.tsx"), "utf8");
  const bookingForm = readFileSync(join(process.cwd(), "components", "BookingForm.tsx"), "utf8");
  const socialIconPath = join(process.cwd(), "components", "SocialIcon.tsx");
  assert.equal(existsSync(socialIconPath), true);
  const socialIcon = readFileSync(socialIconPath, "utf8");
  const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
  const {pages, siteSettings} = loadSiteData();

  assert.equal(pages.contact.heroText, "");
  assert.equal(pages.contact.heroTitle, "Book an appointment with us");
  assert.equal(siteSettings.email, "emergedentalstudio@gmail.com");
  assert.doesNotMatch(contactPage, /<p>\{page\.heroText\}<\/p>/);
  assert.match(contactPage, /className="page-hero contact-hero"/);
  assert.match(contactPage, /const contactServiceAreas = \[/);
  assert.match(contactPage, /href=\{`tel:\$\{settings\.phone\}`\}/);
  assert.match(contactPage, /mailto:emergedentalstudio@gmail\.com/);
  assert.match(contactPage, /facebook\.com\/profile\.php\?id=100085397533519/);
  assert.match(contactPage, /instagram\.com\/emergedentalstudio/);
  assert.match(contactPage, /linkedin\.com\/company\/emerge-dental-studio-multispeciality-dental-clinic/);
  assert.match(contactPage, /import \{SocialIcon\} from "@\/components\/SocialIcon"/);
  assert.doesNotMatch(contactPage, /ExternalLink/);
  assert.match(contactPage, /<SocialIcon platform=\{label\} \/>/);
  assert.doesNotMatch(contactPage, /<span>\{label\}<\/span>/);
  assert.match(socialIcon, /type SocialPlatform = "Instagram" \| "Facebook" \| "LinkedIn"/);
  assert.match(socialIcon, /platform === "Instagram"/);
  assert.match(socialIcon, /platform === "Facebook"/);
  assert.match(socialIcon, /platform === "LinkedIn"/);
  assert.match(contactPage, /<h2>Get in touch<\/h2>/);
  assert.match(contactPage, /<h2>Directions to the Clinic<\/h2>/);
  assert.match(contactPage, /className="contact-map-link"/);
  assert.doesNotMatch(contactPage, /<h2>Hours<\/h2>/);
  assert.doesNotMatch(contactPage, /Book online/);
  assert.doesNotMatch(contactPage, /settings\.serviceAreas\.map/);
  assert.match(bookingForm, />\s*Full name\s*</);
  assert.match(bookingForm, />\s*Treatment you are looking for\s*</);
  assert.match(bookingForm, />\s*Message for us \(optional\)\s*</);
  assert.match(bookingForm, /message\.trim\(\)/);
  assert.match(
    bookingForm,
    /window\.open\(\s*`https:\/\/wa\.me\/\$\{settings\.whatsappNumber\}\?text=\$\{encodedMessage\}`/
  );
  assert.match(css, /\.contact-hero\s*\{[^}]*padding-block:\s*clamp\(28px,\s*4vw,\s*48px\)/s);
  assert.match(css, /\.contact-hero h1\s*\{[^}]*font-size:\s*clamp\(1\.9rem,\s*3\.2vw,\s*2\.8rem\)/s);
  assert.match(css, /\.contact-map-shell\s*\{/);
  assert.match(css, /\.contact-map-link\s*\{/);
  assert.match(css, /\.social-links a\s*\{[^}]*height:\s*44px;[^}]*padding:\s*8px;[^}]*width:\s*44px;/s);
  assert.match(css, /\.social-links \.social-icon\s*\{[^}]*height:\s*24px;[^}]*width:\s*24px;/s);
});

test("Sunday is listed as by appointment only across shared site settings", () => {
  const footer = readFileSync(join(process.cwd(), "components", "Footer.tsx"), "utf8");
  const page = readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8");

  assert.match(footer, /By appointment only/);
  assert.match(page, /By appointment only/);
  assert.match(footer, /10:00 AM to 1:00 PM/);
  assert.match(footer, /4:00 PM to 8:00 PM/);
  assert.doesNotMatch(footer, /<strong className="hours-day">Sunday<\/strong>\s*<span className="hours-time">Closed<\/span>/);
  assert.doesNotMatch(page, /<strong className="hours-day">Sunday<\/strong>\s*<span className="hours-time">Closed<\/span>/);
});

test("contact form service areas show only the requested nearby neighborhoods", () => {
  const {siteSettings} = loadSiteData();

  assert.deepEqual(Array.from(siteSettings.serviceAreas), [
    "Indiranagar",
    "Koramangala",
    "Domlur",
    "Ulsoor",
    "Cambridge layout"
  ]);
});
