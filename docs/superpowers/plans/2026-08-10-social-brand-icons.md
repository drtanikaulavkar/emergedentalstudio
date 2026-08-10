# Social Brand Icons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Contact page’s generic social-link symbol and visible labels with clickable Instagram, Facebook, and LinkedIn icons.

**Architecture:** Add a focused server-safe `SocialIcon` component that owns the inline SVG paths and accepts one platform name. The Contact page supplies each platform name and existing URL, while the existing `.social-links` styles continue to provide accessible 44-pixel targets, wrapping, hover, and focus states.

**Tech Stack:** Next.js App Router, React 19, TypeScript, inline SVG, global CSS already present, Node test runner.

## Global Constraints

- Keep social-link order: Instagram, Facebook, LinkedIn.
- Keep the existing profile URLs and new-tab behavior.
- Render 24-pixel icon-only links inside 44-by-44-pixel controls with 8-pixel padding and descriptive `aria-label` values.
- Do not add dependencies, raster assets, or unrelated styling changes.
- Preserve unrelated uncommitted homepage, navigation, package, and test changes.

---

### Task 1: Define the social-icon contract with a failing test

**Files:**
- Modify: `tests/contact-page.test.mjs`

**Interfaces:**
- Consumes: `app/contact/page.tsx` and `components/SocialIcon.tsx` as source text.
- Produces: regression assertions for all three icon variants, icon-only links, and removal of the generic external-link icon.

- [ ] **Step 1: Write the failing assertions**

Import `existsSync`, then add a file-existence assertion before the source read so RED is an assertion failure rather than a file-system error:

```js
const socialIconPath = join(process.cwd(), "components", "SocialIcon.tsx");
assert.equal(existsSync(socialIconPath), true);
const socialIcon = readFileSync(socialIconPath, "utf8");

assert.match(contactPage, /import \{SocialIcon\} from "@\/components\/SocialIcon"/);
assert.doesNotMatch(contactPage, /ExternalLink/);
assert.match(contactPage, /<SocialIcon platform=\{label\} \/>/);
assert.doesNotMatch(contactPage, /<span>\{label\}<\/span>/);
assert.match(socialIcon, /type SocialPlatform = "Instagram" \| "Facebook" \| "LinkedIn"/);
assert.match(socialIcon, /platform === "Instagram"/);
assert.match(socialIcon, /platform === "Facebook"/);
assert.match(socialIcon, /platform === "LinkedIn"/);
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/contact-page.test.mjs`

Expected: FAIL because `components/SocialIcon.tsx` and its Contact-page usage do not exist.

- [ ] **Step 3: Commit the failing test**

```powershell
git add -- tests/contact-page.test.mjs
git commit -m "test: define social brand icon behavior"
```

---

### Task 2: Render and verify clickable social brand icons

**Files:**
- Create: `components/SocialIcon.tsx`
- Modify: `app/contact/page.tsx`
- Test: `tests/contact-page.test.mjs`

**Interfaces:**
- Consumes: `platform: "Instagram" | "Facebook" | "LinkedIn"`.
- Produces: `SocialIcon({platform}: {platform: SocialPlatform})` returning a decorative inline SVG that inherits `currentColor`.

- [ ] **Step 1: Add the SVG icon component**

Create `components/SocialIcon.tsx` with a shared SVG shell and distinct recognizable geometry:

```tsx
export type SocialPlatform = "Instagram" | "Facebook" | "LinkedIn";

export function SocialIcon({platform}: {platform: SocialPlatform}) {
  if (platform === "Instagram") {
    return (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
      </svg>
    );
  }

  if (platform === "Facebook") {
    return (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4v-8h3.5l.5-4h-4V9c0-.7.3-1 1-1Z" />
      </svg>
    );
  }

  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM7.7 9.6h-3v8.9h3V9.6ZM6.2 4.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm12.3 8.4c0-2.6-1.4-3.8-3.2-3.8-1.5 0-2.2.8-2.6 1.4V9.6h-3v8.9h3.1v-4.4c0-1.2.2-2.3 1.7-2.3s1.5 1.4 1.5 2.4v4.3h2.5v-5.3Z" />
    </svg>
  );
}
```

- [ ] **Step 2: Replace the generic Contact-page icon and enlarge the marks**

In `app/contact/page.tsx`, remove `ExternalLink` from the Lucide import, import `SocialIcon` and `SocialPlatform`, type `socialLinks` with `satisfies`, render `<SocialIcon platform={label} />`, and remove `<span>{label}</span>`. In `app/globals.css`, set `.social-links a` to 44-by-44 pixels with 8 pixels of padding and set `.social-links .social-icon` to 24-by-24 pixels.

- [ ] **Step 3: Verify GREEN and regression safety**

Run: `node --test tests/contact-page.test.mjs`

Expected: all Contact-page tests PASS.

Run: `node --test tests/*.test.mjs`

Expected: the full test suite PASS.

Run: `pnpm exec eslint app/contact/page.tsx components/SocialIcon.tsx tests/contact-page.test.mjs`

Expected: exit code 0 with no lint errors.

Run: `pnpm build`

Expected: successful TypeScript compilation and static generation of `/contact`.

- [ ] **Step 4: Inspect responsive rendering**

Run the local site and inspect `/contact` at desktop and 390-pixel widths. Confirm three distinct icon-only controls, 44-pixel targets, correct accessible names, no overflow, and no console errors.

- [ ] **Step 5: Commit and push only intended files**

```powershell
git add -- app/contact/page.tsx app/globals.css components/SocialIcon.tsx tests/contact-page.test.mjs docs/superpowers/specs/2026-08-10-social-brand-icons-design.md docs/superpowers/plans/2026-08-10-social-brand-icons.md
git commit -m "feat: add social brand icons"
git push origin main
```

Verify `origin/main` and local `main` resolve to the same commit. Leave all unrelated working-tree changes unstaged.
