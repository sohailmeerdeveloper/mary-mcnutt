# Site verification

Verified 2026-09-14 in the Codex browser at desktop and mobile sizes. The existing homepage and the new About and Coaching pages were reviewed against the supplied desktop and mobile reference captures. Full-page screenshots can show lazy-image stitching artifacts, so direct viewport inspection was used as the visual source of truth.

## Final reviewer disposition: ship

| Area | Status | Evidence |
|---|---|---|
| Direction and visual system | Pass | Both interior pages extend the established green editorial system with thin display type, square surfaces, restrained imagery, and reference-faithful compositions. |
| Responsive behavior | Pass | The alternating coaching timeline becomes a clear single-column mobile sequence; grids, navigation, image crops, and typography reflow without horizontal overflow. |
| Content and accessibility | Pass after fix | Skip links, labeled controls, meaningful alt text, one H1 per page, visible focus, and reduced-motion handling are present. Four small reverse-text colors were standardized to white to meet WCAG AA contrast on `--panel`. |
| Technical | Pass | Local references, image decoding, canonical metadata, structured data, JavaScript syntax, and sitemap validation are clean. |

## Functional and static checks

- Browser console: no warnings or errors on Home, About, or Coaching.
- Mobile document width: client width and scroll width both 375 px on all three pages.
- No broken images; each page has exactly one H1.
- Mobile menu opens and closes with Escape.
- Local files, CSS asset references, internal links, and section anchors resolve.
- All HTML images have alt attributes and intrinsic dimensions; local image files decode.
- Canonical URLs, robots directives, JSON-LD, Open Graph metadata, and sitemap entries were checked.
- Vanilla JavaScript passes `node --check`.
- Validator result: 3 pages, 31 local references, 38 images, 11 schema nodes, no issues, and 1,998,095 public bytes.

## Accepted tradeoffs

- The contact form uses `mailto:` because no form-processing backend or account was supplied; direct phone and email links remain available.
- Program pricing is intentionally omitted because the current source pages contain contradictory price information.
- Existing stock imagery is used only as illustrative process/support imagery and is not represented as Mary.
- The local preview is private and non-indexable; search ranking and future indexing cannot be guaranteed by static QA.

## Remaining-pages verification — 2026-09-15

Blog, five reusable article routes, Pricing, and Contact were inspected in the Codex browser at the default desktop viewport and at 390×844. Home, About, and Coaching were rechecked at both desktop and phone widths after the shared navigation and CSS changes.

| Area | Status | Evidence |
|---|---|---|
| New page composition | Pass | Blog, article, Contact, and Pricing first viewports preserve the screenshot-led hierarchy while using the established green identity. |
| Responsive layouts | Pass after fix | Cards and form sections stack cleanly; article measure remains comfortable; mobile menu works. A compact-desktop About support-grid overflow was corrected and rechecked at `clientWidth = scrollWidth = 895`. |
| Content integrity | Pass after fix | A service-territory inference from speaking history was removed. Pricing uses the client-directed $99 introductory hour and $249/$399/$499/$549 plan prices. |
| SEO and semantics | Pass | Eleven pages have unique canonical metadata, one H1, Open Graph/X data, page-specific JSON-LD, image dimensions/alt handling, and sitemap coverage. |
| Static validation | Pass | Validator reports 11 pages, 123 image instances, 33 schema nodes, and no issues. JavaScript syntax checks pass. |

The mechanical design detector reported mostly incumbent font and type-ramp advisories from the approved Roboto/Nunito design system. Its relevant new thick sidebar accent was reduced to a one-pixel rule. No second detector run was performed, per the bounded Impeccable workflow.

## Legacy migration verification — 2026-09-15

- Generated 38 indexable pages in total, including 19 specialist services, two content hubs, three long-form recovery references, Center for Excellence, and two policy pages.
- Rewrote visitor-facing old-site anchors to local equivalents while preserving production canonical and Open Graph URLs.
- Static validator passes all 38 pages with no broken local links or anchors, one H1 per page, valid JSON-LD, complete sitemap coverage, image dimensions, and decodable assets.
- Intentional external destinations are limited to Facebook and OpenStreetMap; no visitor navigation points to the retired MaryMcNutt.com paths or Center4Excellence.com.
