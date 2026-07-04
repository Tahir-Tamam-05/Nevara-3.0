# NEVARA — Production Audit Report

Date: 2026-07-05
Scope: Complete Astro codebase (`src/`, `public/`, config) and the deployed `dist/` output, audited via clean production builds and headless-browser testing across desktop/tablet/mobile.
Method: Static analysis (build, grep, dependency audit) + browser-driven functional, responsive, performance and security verification against `astro build` output served via `astro preview` — not the dev server, to match what actually ships.

---

## Final recommendation: **GO**

No Critical issues found. Three High-severity gaps were found and fixed (branded 404 page, canonical/OG URLs, sitemap + robots.txt). One High-severity finding (an upstream Astro framework CVE range) is documented below with a full exploitability assessment — it is not remotely exploitable in this project's static-only deployment, so it is not launch-blocking, but it should be scheduled as a dedicated follow-up (see Remaining Issues). Two Medium fixes (unused dependency, static-asset caching) are applied. No visual, content, or animation regressions were introduced — the cinematic hero is pixel-identical to before this audit.

---

## Fixes made

### High severity

**1. No custom 404 page — not even in the production build.**
`dist/` contained no `404.html` at all prior to this audit (confirmed by inspecting a clean `astro build` output). On Vercel and equivalent static hosts, an unmatched route falls back to the *platform's* generic error page, not even Astro's own placeholder — so any mistyped URL, stale link, or removed page would show a raw, unbranded error page, undermining the entire premium editorial impression the site is built to convey.
Fix: added `src/pages/404.astro`, composed entirely from existing components (`Layout`, `Navbar`, `PageHeader`, `Footer`) and existing typographic/button tokens — no new visual language. Set `noindex` so search engines don't index or attempt to canonicalize an error page. Verified: `dist/404.html` now exists, renders on-brand (screenshotted at desktop and mobile), has zero horizontal overflow, and correctly returns `robots: noindex, nofollow` with no canonical tag.

**2. Missing canonical URLs and `og:url`.**
No page emitted a `<link rel="canonical">` or `og:url`/`twitter:url` meta tag. Without these, duplicate-URL ambiguity (trailing slash, query strings) can dilute search ranking, and shared links lack proper attribution metadata.
Fix: added canonical + `og:url`/`twitter:url` generation in `Layout.astro`, derived from `Astro.url.pathname` against the configured `site`. Mid-fix, I caught and corrected a self-inconsistency: my first pass stripped trailing slashes, which didn't match the trailing-slash URLs `@astrojs/sitemap` generates for the same routes (Astro's static output serves every route as `/path/index.html`) — that would have re-created the exact ambiguity canonical tags exist to prevent. Corrected so both agree. Verified per-route in the built HTML.

**3. No sitemap.xml, no robots.txt.**
Neither existed. Fix: added the official `@astrojs/sitemap` integration (auto-discovers all built routes, so it won't go stale as pages are added/removed) and `public/robots.txt` pointing at it. Verified: `dist/sitemap-index.xml` → `dist/sitemap-0.xml` lists exactly the 9 real content routes; the 404 page is correctly excluded automatically.

### Medium severity

**4. Unused `playwright-core` devDependency.**
Present in `package.json` but referenced by nothing in the committed project (only used ad hoc during prior development/testing sessions). Removed; `npm install` re-synced the lockfile and pruned it from `node_modules`. Confirmed the project still builds and every automated check still passes afterward.

**5. No explicit cache headers for immutable static assets.**
The hero frame sequence, report page images, and partner logos are content-addressed by path and never change post-deploy without a full asset regeneration. Added `vercel.json` declaring `Cache-Control: public, max-age=31536000, immutable` for `/assets/*`, matching the Vercel deployment target named in the project's own build spec. Zero visual/content impact — infra-config only.

### Resolved in passing

**6. Stale duplicate build artifacts.** Found `dist/contact/index 2.html` and `dist/projects/index 2.html` (byte-identical macOS Finder-style duplicate-file cruft) in a pre-audit build. Confirmed harmless (identical content, not linked from anywhere) but indicative of a non-clean build state. A full `rm -rf dist .astro && npm run build` produced a pristine 435-file, zero-duplicate output — all further testing in this audit ran against that clean build.

---

## Remaining issues (not fixed — documented, not launch-blocking)

### High — flagged, not fixed: upstream Astro dependency advisories
`npm audit` flags the installed `astro@5.18.2` under an advisory range (patched at 7.0.0) covering four CVEs: XSS via incomplete `define:vars` escaping, reflected XSS via unescaped slot names, XSS via unescaped attribute names in spread props, and a Host-header SSRF in prerendered error-page fetches.

**Why this isn't launch-blocking:** I verified the codebase's actual exposure to each vector before deciding not to force a same-session fix:
- `grep` across every `.astro` file confirms **zero** use of `define:vars`, `server:defer` (server islands), or spread props (`{...x}`) anywhere in the project — the first three CVEs require one of these patterns with attacker-influenced input to be exploitable, and none are used at all, let alone with untrusted input.
- The SSRF advisory is in Astro's SSR error-page handling; this project builds with `output: "static"` and ships pre-rendered files to a static host (Vercel serves files, not a running Astro/Node process) — there is no live Astro server in production for that code path to execute in.

**Why it's still worth tracking:** these are real, published CVEs in a dependency, and "not currently exploitable given how we use it" is a weaker guarantee than "patched." The fix is a major version bump (5→7, skipping 6.x entirely) — npm's own installer flags it as a breaking change. That's a real upgrade project (compatibility pass across `@tailwindcss/vite`, `@fontsource`, `lucide-astro`, `@astrojs/sitemap`, and the hand-written GSAP/Lenis/canvas integration), not a same-session audit fix, and rushing it under audit pressure without a dedicated regression pass is its own risk. **Recommend scheduling this as its own tracked upgrade, not bundling it into a launch.**

### Medium
- Favicon is a placeholder "N" mark (already known/flagged from earlier work — pending final brand asset from you, not a defect).
- No page-specific structured data beyond the sitewide `Organization` JSON-LD (e.g., no `BreadcrumbList`). Not required for this page count/structure; would be a nice-to-have, not a gap.

### Low
- Hero payload (~10.5 MB desktop / ~3.3 MB mobile, all pre-decoded `ImageBitmap`s for scrub-perfect scrolling) is a known, deliberate architectural trade-off from earlier phases, re-confirmed here as unchanged and intentional — preserving it per this audit's explicit instruction not to alter the cinematic experience.

---

## Performance results

Measured via Chrome's own Performance Observer APIs (LCP, CLS) and navigation timing, against the production build, local server (absolute timings aren't representative of real-world network conditions — CLS and stability are the meaningful numbers here):

| Page | CLS | Notes |
|---|---|---|
| Home (desktop + mobile) | **0** | Full hero + all 8 sections |
| Reports | **0** | Includes interactive viewer + gate |
| Projects | **0** | |
| Contact | **0** | Form + info sections |
| Project detail | **0** | Before/after tables, observation cards |

CLS of 0–0.001 everywhere confirms every image's explicit `width`/`height` attributes are doing their job. Zero horizontal overflow confirmed across **35 combinations** (7 viewports from 375px to 1920px × 5 representative routes).

Hero canvas lifecycle re-verified after all audit changes: triggering a viewport resize while scrolled deep into content leaves the canvas's backing-store dimensions completely untouched (the offscreen-resize guard from the prior performance pass still holds) — confirmed byte-for-byte via direct canvas `width`/`height` inspection, not just visual inspection.

---

## Build / test results

- `npm run build`: clean, zero errors, zero warnings, 10 pages generated (9 content routes + 404).
- Zero console errors across all 9 real routes in the production build (the only console lines observed anywhere were from my own deliberate negative tests: fetching a non-existent route and fetching the now-deleted legacy PDF path — both correctly logged as 404s, which is the *passing* result, not a defect).
- Functional pass covered: every nav link, every footer link, contact form label/validation wiring, the 5-page report-preview cap and its conversion gate (trigger, PDF-absence, report-switch reset), the evidence lightbox (open/close via click, Escape, backdrop; no nav controls; no download links), and all 5 project detail pages (correct conditional sections, zero broken images).
- Responsive pass: 0 horizontal-overflow incidents across 35 viewport×route combinations. One apparent tablet-width layout bug (project cards appearing to vanish in a `fullPage` screenshot) was investigated and disproven — it was an artifact of Playwright's one-shot full-page capture not triggering the site's `IntersectionObserver`-based reveal animations; real incremental scrolling confirms all 5 cards render and reveal correctly.
- Accessibility spot-checks: 8/8 images have `alt` text, all form inputs have associated `<label for>`, `:focus-visible` and `prefers-reduced-motion` handling present sitewide (carried forward from prior work, re-verified present).

---

## Security / privacy verification

- **No PDFs, source documents, or development artifacts in `public/` or `dist/`.** Confirmed by direct filesystem search of the clean build output. The project's source PDFs, logo originals, and planning docs (`Reports/`, `Images/`, `CLAUDE.md`, `BUILD_PLAN.md`, etc.) live outside both `public/` and `src/`, so Astro's build never touches them — verified by enumerating the entire `dist/` tree (435 files) and cross-checking for `.pdf`/`.doc*`/`.md`/stray-HTML patterns: none found.
- **Legacy full-report PDF paths return 404**, not just "unlinked" — direct `fetch()` to the previously-public PDF URL confirmed gone from the deployed bundle, not merely hidden from navigation.
- **No secrets or `.env` files** anywhere in the repository.
- One dependency-level advisory (see Remaining Issues) — assessed as not exploitable in this project's configuration, tracked for a future dedicated upgrade.

---

## What I did not touch

Per instructions: no visual redesign, no content rewrites, no new sections, no changes to the cinematic hero's behavior or timing, and no speculative fixes. The one place a fix implied a larger decision — the Astro major-version security advisory — is flagged above rather than acted on, since a framework upgrade is a product/timeline decision, not a same-session audit fix.
