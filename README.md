# Mary McNutt coaching website

Plain HTML, CSS, and a small vanilla JavaScript file. No React, package installation, or compilation is needed.

The September 16, 2026 refresh adds 36 page-specific AI scenes, researched titles for every interior page, circular number animations, and accessible scroll entrances. See `research/REFRESH-2026-09-16.md` for scope and verification. `dist/` is the authoritative authored site; the earlier migration/build scripts must not be rerun over it. The inquiry forms open an email draft and include a copyable fallback; they do not send from a server.

## Files

- `dist/index.html` — complete responsive homepage.
- `dist/about/index.html` — Mary biography, approach, credentials, and support areas.
- `dist/coaching/index.html` — coaching process, focus areas, program formats, and contact form.
- `dist/pricing/index.html` — verified hourly rate, service formats, payment details, and consultation CTA.
- `dist/blog/index.html` — responsive editorial archive using Mary's real published topics.
- `dist/blog/*/index.html` — five articles built from one reusable semantic article system.
- `dist/contact/index.html` — accessible inquiry form, verified contact details, and regional map context.
- `dist/services/` — complete service directory plus 19 source-backed specialist service pages.
- `dist/resources/` — recovery resource hub, Serenity Prayer, Twelve Steps, and Twelve Traditions pages.
- `dist/center-for-excellence/` — local Center for Excellence mission, values, and service overview.
- `dist/privacy-policy/`, `dist/disclaimer/` — locally hosted legal pages.
- `dist/assets/styles.css` — green theme and desktop/mobile layout.
- `dist/assets/site.js` — mobile navigation and testimonial controls.
- `dist/assets/images/` — optimized local photos and map.
- `dist/assets/fonts/` — self-hosted Roboto and Nunito Sans.
- `dist/robots.txt`, `dist/sitemap.xml`, `dist/llms.txt` — discovery files for the intended canonical domain.
- `research/CONTENT-MAP.md` — original-page archive, three-page section mapping, and content issues.
- `research/SEO-PLAN.md` — keyword priorities, evidence, technical SEO, and launch steps.
- `research/image-generation-prompts.md` — the three built-in ImageGen portrait prompts.

## Local preview

From this directory, run `node scripts/serve.mjs`, then open `http://127.0.0.1:4173`. All published files are inside `dist/`. Run `node --check dist/assets/site.js` and the Python `scripts/validate.py` script to check the static deliverable.

## Scope and launch

The static package now includes the full public route system: core pages, journal and articles, 19 specialist services, recovery resources, Center for Excellence, and local legal pages. Visitor-facing legacy MaryMcNutt.com and Center for Excellence links have been replaced with equivalent local routes; social and map destinations remain intentionally external.

The private Sites preview is separate from MaryMcNutt.com. Canonical URLs and crawler files are prepared for that final domain. Search engines cannot index an authenticated private preview.

Client-provided content was condensed for the reference layout without copying the demo's names, invented metrics, claims, or contact details. Old stock and original reference portraits are retained only in the local research archive; the served site uses documented AI coaching scenes. The map is a local OpenStreetMap capture linked to the interactive map, with visible attribution.
