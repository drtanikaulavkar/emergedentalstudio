import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const normalizedCss = css.replace(/\s+/g, " ");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function rule(selector) {
  const normalizedSelector = selector.replace(/\s+/g, " ");
  const match = normalizedCss.match(new RegExp(`${escapeRegExp(normalizedSelector)}\\s*\\{([^}]*)\\}`, "m"));
  assert.ok(match, `Expected a rule for ${selector}`);
  return match[1];
}

function expectDeclaration(selector, declaration) {
  assert.match(rule(selector), new RegExp(escapeRegExp(declaration)));
}

function mediaBlock(query) {
  const start = css.indexOf(`@media (${query})`);
  assert.notEqual(start, -1, `Expected @media (${query})`);
  const next = css.indexOf("@media ", start + 1);
  return css.slice(start, next === -1 ? undefined : next);
}

function expectMediaDeclaration(query, selector, declaration) {
  const block = mediaBlock(query).replace(/\s+/g, " ");
  const normalizedSelector = selector.replace(/\s+/g, " ");
  const match = block.match(new RegExp(`${escapeRegExp(normalizedSelector)}\\s*\\{([^}]*)\\}`, "m"));
  assert.ok(match, `Expected ${selector} inside @media (${query})`);
  assert.match(match[1], new RegExp(escapeRegExp(declaration)));
}

test("balances all heading levels and gives shared section headings their desktop scale", () => {
  expectDeclaration("h1,\nh2", "text-wrap: balance;");
  expectDeclaration("h3", "text-wrap: balance;");
  const sharedHeadings = rule(".section-header h2,\n.rich-text h2,\n.faq-layout h2,\n.contact-card h2");
  assert.match(sharedHeadings, /font-size:\s*clamp\(2\.25rem, 3vw, 2\.75rem\);/);
  assert.match(sharedHeadings, /font-weight:\s*700;/);
  assert.doesNotMatch(sharedHeadings, /white-space:\s*nowrap;/);
});

test("keeps mobile global and homepage type comfortably readable", () => {
  for (const selector of [
    ".section-header h2,\n  .rich-text h2,\n  .why-choose-heading h2,\n  .faq-layout h2,\n  .contact-card h2",
  ]) {
    expectMediaDeclaration("max-width: 560px", selector, "font-size: clamp(1.5rem, 6vw, 1.875rem);");
    expectMediaDeclaration("max-width: 560px", selector, "line-height: 1.18;");
    expectMediaDeclaration("max-width: 560px", selector, "font-weight: 700;");
  }
  expectMediaDeclaration("max-width: 560px", ".hero-caption p", "font-size: clamp(1rem, 3.4vw, 1.2rem);");
  expectDeclaration(".service-card-summary", "font-size: 1rem;");
  expectDeclaration(".service-card-summary", "line-height: 1.45;");
  expectDeclaration(".services-carousel-rail .service-card-summary", "font-size: 1rem;");
  expectDeclaration(".services-carousel-rail .service-card-summary", "line-height: 1.45;");
  expectMediaDeclaration("max-width: 560px", ".doctor-section .rich-text p", "font-size: 1rem;");
  expectMediaDeclaration("max-width: 560px", ".doctor-section .rich-text p", "line-height: 1.5;");
});

test("uses a consistent title-to-content spacing rhythm", () => {
  expectDeclaration(".section-header", "margin: 0 auto clamp(1.25rem, 2.2vw, 1.625rem);");
  expectDeclaration(".why-choose-layout", "gap: clamp(20px, 3vw, 34px);");
  expectDeclaration(".faq-accordion,\n.faq-list", "margin-top: 22px;");
  expectDeclaration(".contact-card", "gap: 14px;");
  expectMediaDeclaration("max-width: 560px", ".doctor-section .rich-text", "gap: 12px;");
});

test("preserves legible compact navigation and contact form hierarchy", () => {
  for (const selector of [".header-cta", ".nav-links", ".contact-text-link"]) {
    expectMediaDeclaration("max-width: 360px", selector, "font-size: 0.9375rem;");
  }
  expectDeclaration(".booking-form label", "font-weight: 700;");
  expectDeclaration(".booking-form input,\n.booking-form textarea", "font-weight: 500;");
});

test("uses a calmer hierarchy for contact metadata, actions, and footer copy", () => {
  expectDeclaration(".contact-detail h2", "font-size: 0.8125rem;");
  expectDeclaration(".contact-detail h2", "font-weight: 700;");
  expectDeclaration(".contact-detail h2", "letter-spacing: 0.09em;");
  expectDeclaration(".contact-detail-link", "font-weight: 600;");
  expectDeclaration(".home-address-link", "font-weight: 700;");
  expectDeclaration(".contact-text-link", "font-weight: 700;");
  expectDeclaration(".contact-map-link > span", "font-weight: 700;");
  expectDeclaration(".hours-list p,\n.footer-hour", "font-size: 1rem;");
  expectDeclaration(".hours-list p,\n.footer-hour", "line-height: 1.45;");
  expectDeclaration(".site-footer", "font-size: 1rem;");
  expectDeclaration(".site-footer .footer-hour", "font-size: 1rem;");
  expectDeclaration(".site-footer .footer-hour", "line-height: 1.45;");
});

test("keeps homepage and carousel service-card headings above the mobile readability floor", () => {
  expectDeclaration(".why-choose-item h3", "font-size: clamp(1.125rem, 1.2vw, 1.25rem);");
  expectDeclaration(".service-card h3", "font-size: clamp(1.125rem, 1.2vw, 1.25rem);");
  expectDeclaration(".services-carousel-rail .service-card h3", "font-size: clamp(1.125rem, 0.92rem + 0.22vw, 1.25rem);");
  expectDeclaration(".service-card .eyebrow", "font-size: 0.8125rem;");
  expectDeclaration(".services-carousel-rail .service-card .eyebrow", "font-size: 0.8125rem;");
  expectDeclaration(".site-footer h2", "font-size: 1.125rem;");
  expectDeclaration(".site-footer h2", "font-weight: 700;");
});

test("reserves heavy weights for short headings and numeric emphasis", () => {
  assert.doesNotMatch(css, /font-weight:\s*(?:900|750|650);/);
  for (const match of css.matchAll(/([^{}]+)\{[^{}]*font-weight:\s*800;[^{}]*\}/g)) {
    assert.match(match[1], /(h3|index|number)/, `Unexpected 800 weight in ${match[1].trim()}`);
  }
  for (const match of css.matchAll(/([^{}]+)\{[^{}]*text-transform:\s*uppercase;[^{}]*\}/g)) {
    assert.match(match[0], /font-size:\s*(?:0\.8125rem|clamp\([^;]*0\.8125rem[^;]*\));/);
    assert.match(match[0], /letter-spacing:\s*0\.(?:0[6-9]|10)em;/);
  }
});
