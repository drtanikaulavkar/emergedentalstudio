import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import test from "node:test";

test("header exposes services as a dropdown of direct service links", () => {
  const header = readFileSync("components/Header.tsx", "utf8");
  const layout = readFileSync("app/layout.tsx", "utf8");

  assert.match(header, /services:\s*Pick<Service,\s*"title"\s*\|\s*"slug">/);
  assert.match(header, /Header\.module\.css/);
  assert.match(header, /aria-haspopup="menu"/);
  assert.match(header, /className=\{styles\.serviceMenu\}/);
  assert.match(header, /href=\{`\/services\/\$\{service\.slug\}`\}/);
  assert.doesNotMatch(header, /\{href:\s*"\/services",\s*label:\s*"Services"\}/);
  assert.match(layout, /getServices/);
  assert.match(layout, /<Header settings=\{settings\} services=\{services\}/);
});

test("services dropdown closes from outside interactions and service selection", () => {
  const header = readFileSync("components/Header.tsx", "utf8");
  const css = readFileSync("components/Header.module.css", "utf8");

  assert.match(header, /useRef/);
  assert.match(header, /servicesDropdownRef/);
  assert.match(header, /const closeServicesDropdown = useCallback\(\(\) => \{/);
  assert.match(header, /const openServicesDropdown = useCallback\(\(\) => \{/);
  assert.match(header, /onPointerEnter=\{openServicesDropdown\}/);
  assert.match(header, /onPointerLeave=\{closeServicesDropdown\}/);
  assert.match(header, /pointerdown/);
  assert.match(header, /contains\(event\.target as Node\)/);
  assert.match(header, /event\.key === "Escape"/);
  assert.match(header, /onClick=\{closeServicesDropdown\}/);
  assert.doesNotMatch(header, /onPointerDown=\{\(event\) => \{/);
  assert.doesNotMatch(header, /event\.currentTarget\.blur\(\)/);
  assert.match(css, /\.serviceMenu\[data-open="true"\]/);
  assert.doesNotMatch(header, /isServicesClosing/);
  assert.doesNotMatch(css, /\.serviceDropdown:hover \.serviceMenu/);
  assert.doesNotMatch(css, /\.serviceDropdown:focus-within \.serviceMenu/);
  assert.doesNotMatch(css, /data-closing/);
  assert.doesNotMatch(header, /onMouseEnter/);
  assert.doesNotMatch(header, /onMouseLeave/);
});
