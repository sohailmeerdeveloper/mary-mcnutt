# Mary McNutt homepage

Plain HTML, CSS, and a small vanilla JavaScript file. No React, package installation, or compilation is needed.

## Files

- `dist/index.html` — complete responsive homepage.
- `dist/assets/styles.css` — green theme and desktop/mobile layout.
- `dist/assets/site.js` — mobile navigation and testimonial controls.
- `dist/assets/images/` — optimized local photos and map.
- `dist/assets/fonts/` — self-hosted Roboto and Nunito Sans.
- `dist/robots.txt`, `dist/sitemap.xml`, `dist/llms.txt` — discovery files for the intended canonical domain.
- `research/CONTENT-MAP.md` — original-page archive, section mapping, and content issues.
- `research/SEO-PLAN.md` — keyword priorities, evidence, technical SEO, and launch steps.
- `research/image-generation-prompts.md` — the three built-in ImageGen portrait prompts.

## Local preview

From this directory, run `node scripts/serve.mjs`, then open `http://127.0.0.1:4173`. All published files are inside `dist/`. Run `node --check dist/assets/site.js` and the Python `scripts/validate.py` script to check the static deliverable.

## Scope and launch

This phase builds the homepage. Other navigation destinations use the existing live original pages or Center for Excellence. Their content is archived for the next design phase. Do not replace the entire existing domain with only this homepage while the old service and article paths are still needed.

The private Sites preview is separate from MaryMcNutt.com. Canonical URLs and crawler files are prepared for that final domain. Search engines cannot index an authenticated private preview.

Client-provided content was condensed for the reference layout without copying the demo's names, invented metrics, claims, or contact details. Reference stock photography needs reuse rights confirmed before public launch; generated Mary portraits are separately documented. The map is a local OpenStreetMap capture linked to the interactive map, with visible attribution.
