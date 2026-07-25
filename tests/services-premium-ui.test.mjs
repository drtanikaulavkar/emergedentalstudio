import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("homepage and treatment pages share one semantic FAQ component", () => {
  const faq = read("components/FaqAccordion.tsx");
  const homepage = read("app/page.tsx");
  const treatmentPage = read("app/services/[slug]/page.tsx");

  assert.match(faq, /<details\b/);
  assert.match(faq, /<summary\b/);
  assert.match(faq, /<ChevronDown\b/);
  assert.match(faq, /faq-question-number/);
  assert.match(homepage, /from\s+["']@\/components\/FaqAccordion["']/);
  assert.match(homepage, /<FaqAccordion\b/);
  assert.match(treatmentPage, /from\s+["']@\/components\/FaqAccordion["']/);
  assert.match(treatmentPage, /<FaqAccordion\b/);
});

test("services directory reuses the image-led service card and shared action system", () => {
  const servicesPage = read("app/services/page.tsx");

  assert.match(servicesPage, /from\s+["']@\/components\/ServiceCard["']/);
  assert.match(servicesPage, /from\s+["']@\/components\/ui\/button["']/);
  assert.match(servicesPage, /<ServiceCard\b/);
  assert.match(servicesPage, /<CalendarDays\b/);
  assert.doesNotMatch(servicesPage, /className=\{styles\.serviceCard\}/);
});

test("treatment guides expose highlights, icon actions, and clear related navigation", () => {
  const treatmentPage = read("app/services/[slug]/page.tsx");

  assert.match(treatmentPage, /from\s+["']lucide-react["']/);
  assert.match(treatmentPage, /from\s+["']@\/components\/ui\/button["']/);
  assert.match(treatmentPage, /service\.highlights\.slice/);
  assert.match(treatmentPage, /className=\{styles\.serviceHighlights\}/);
  assert.match(treatmentPage, /<MessageCircle\b/);
  assert.match(treatmentPage, /<ArrowUpRight\b/);
  assert.doesNotMatch(treatmentPage, /className=\{styles\.faqCard\}/);
});

test("service styling supports an editorial rail, distinct content rhythms, and mobile navigation", () => {
  const css = read("app/services/services.module.css");
  const globalCss = read("app/globals.css");

  assert.match(css, /\.serviceHighlights\s*\{/);
  assert.match(css, /\.pageGuide\s*\{[^}]*position:\s*sticky/s);
  assert.match(css, /\.processStep\s*\{[^}]*border-top:/s);
  assert.match(css, /\.relatedLink\s*\{/);
  assert.match(css, /@media\s*\(max-width:\s*920px\)[\s\S]*\.pageGuide\s*\{[^}]*overflow-x:\s*auto/s);
  assert.match(globalCss, /\.faq-accordion(?:,|\s*\{)/);
  assert.match(globalCss, /\.faq-item\[open\]\s+\.faq-chevron(?:,|\s*\{)/);
  assert.match(globalCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.faq-item/s);
});
