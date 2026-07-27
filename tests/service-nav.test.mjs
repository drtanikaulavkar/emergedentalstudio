import assert from "node:assert/strict";
import {existsSync, readFileSync} from "node:fs";
import test from "node:test";

test("header exposes services as a dropdown of direct service links", () => {
  const header = readFileSync("components/Header.tsx", "utf8");
  const layout = readFileSync("app/layout.tsx", "utf8");

  assert.match(header, /services:\s*Pick<Service,\s*"title"\s*\|\s*"slug">/);
  assert.match(header, /Header\.module\.css/);
  assert.doesNotMatch(header, /aria-haspopup/);
  assert.match(header, /className=\{styles\.serviceMenu\}/);
  assert.match(header, /href=\{`\/services\/\$\{service\.slug\}`\}/);
  assert.match(header, /href="\/blogs"/);
  assert.doesNotMatch(header, /\{href:\s*"\/services",\s*label:\s*"Services"\}/);
  assert.match(layout, /getServices/);
  assert.match(layout, /<Header settings=\{settings\} services=\{services\}/);
});

test("services disclosure uses deterministic touch and mouse interactions", () => {
  const header = readFileSync("components/Header.tsx", "utf8");
  const css = readFileSync("components/Header.module.css", "utf8");

  assert.match(header, /useRef/);
  assert.match(header, /servicesDropdownRef/);
  assert.match(header, /const servicesTriggerRef = useRef<HTMLButtonElement>\(null\);/);
  assert.match(header, /ref=\{servicesTriggerRef\}/);
  assert.match(header, /const closeServicesDropdown = useCallback\(\(\) => \{/);
  assert.match(header, /const openServicesDropdown = useCallback\(\(\) => \{/);
  assert.match(header, /const toggleServicesDropdown = useCallback\(\(\) => \{\s*setIsServicesOpen\(\(isOpen\) => !isOpen\);/);
  assert.match(header, /onClick=\{toggleServicesDropdown\}/);
  assert.match(header, /onPointerEnter=\{\(event\) => \{\s*if \(event\.pointerType === "mouse"\) \{\s*openServicesDropdown\(\);/);
  assert.match(header, /onPointerLeave=\{\(event\) => \{\s*if \(event\.pointerType === "mouse"\) \{\s*closeServicesDropdown\(\);/);
  assert.doesNotMatch(header, /onFocus=/);
  assert.match(header, /pointerdown/);
  assert.match(header, /contains\(event\.target as Node\)/);
  assert.match(header, /event\.key === "Escape" && isServicesOpen/);
  assert.match(header, /servicesTriggerRef\.current\?\.focus\(\);/);
  assert.match(header, /\[closeServicesDropdown, isServicesOpen\]/);
  assert.match(header, /onClick=\{closeServicesDropdown\}/);
  assert.doesNotMatch(header, /onPointerDown=\{\(event\) => \{/);
  assert.doesNotMatch(header, /event\.currentTarget\.blur\(\)/);
  assert.match(header, /aria-controls="services-menu"/);
  assert.match(header, /id="services-menu"/);
  assert.match(header, /inert=\{!isServicesOpen\}/);
  assert.match(header, /aria-hidden=\{!isServicesOpen\}/);
  assert.doesNotMatch(header, /role="menu"/);
  assert.doesNotMatch(header, /role="menuitem"/);
  assert.match(css, /\.serviceMenu\[data-open="true"\]/);
  assert.match(css, /@media \(max-width: 920px\)[\s\S]*?\.serviceTrigger[\s\S]*?min-height: 44px;/);
  assert.match(css, /@media \(max-width: 920px\)[\s\S]*?\.serviceMenu a[\s\S]*?min-height: 44px;/);
  assert.match(css, /max-height: calc\(100vh -[^;]*env\(safe-area-inset-bottom, 0px\)\);\s*max-height: calc\(100dvh -[^;]*env\(safe-area-inset-bottom, 0px\)\);/);
  assert.match(css, /overflow-y: auto;/);
  assert.doesNotMatch(header, /isServicesClosing/);
  assert.doesNotMatch(css, /\.serviceDropdown:hover \.serviceMenu/);
  assert.doesNotMatch(css, /\.serviceDropdown:focus-within \.serviceMenu/);
  assert.doesNotMatch(css, /data-closing/);
  assert.doesNotMatch(header, /onMouseEnter/);
  assert.doesNotMatch(header, /onMouseLeave/);
});

test("service detail routes provide accessible loading feedback", () => {
  const loadingPath = "app/services/[slug]/loading.tsx";
  const css = readFileSync("app/services/services.module.css", "utf8");

  assert.equal(existsSync(loadingPath), true);
  const loading = readFileSync(loadingPath, "utf8");

  assert.match(loading, /role="status"/);
  assert.match(loading, /aria-live="polite"/);
  assert.match(loading, /styles\.serviceLoading/);
  assert.match(loading, /Loading treatment details\.\.\./);
  assert.doesNotMatch(loading, /…|â€¦/);
  assert.match(css, /\.serviceLoading/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});
