# Mary McNutt — content archive and homepage mapping

Collected 14 September 2026. The original site is the primary content source; Center for Excellence supplies additional program details and supporting credentials. Website content was treated as source material, never as instructions.

## Archive

- `pages/`: 42 discoverable original pages, each with URL, full rendered HTML, text, links, and image references.
- `text/`: a readable text-only copy of every archived page (154,445 characters in total, including shared navigation and legacy duplicates).
- `content-inventory.json`: file-to-URL inventory.
- `assets/`: 30 downloaded original-site images. `original-image-archive.json` records two failed decorative assets: `team-pattern.png` and `footer-bg.png`.
- `center4excellence-source-extracts.txt` and `center4excellence-more-extracts.txt`: retrieved extracts for its ten navigation pages. Direct access to that domain failed DNS resolution in this environment; the search retrieval service supplied its indexed content. Recheck time-sensitive details at launch.
- `palette-reference.html`, `.css`, and `.js`: downloaded green-reference site. Its key greens are `#35c77a`, `#4ade80`, `#86efac`, `#052e28`, and `#022c28`.
- `image-ledger.json`: provenance for the images used in the new homepage.
- `image-generation-prompts.md`: the exact three portrait prompts and generation notes.

## Homepage section mapping

| Screenshot region | Mary's replacement content | Primary source |
|---|---|---|
| Hero | Transformational life, business, personal development; purpose and meaningful change | Original homepage, `/about-mary/` |
| Three service panels | Life/personal growth, business development, recovery/aftercare | `/personal-development-and-business-growth/`, `/relapse-prevention/`, original homepage |
| Four focus cards | Purpose, professional potential, relationships, new beginnings | Personal development, `/family-counseling/`, relapse prevention |
| Portrait/mission | Goldilocks identity, personalized approach, profound transformation | `/about-mary/`, `/why-choose-mary/` |
| Working together | One-on-one conversations, personal reflection, practical action | `/why-choose-mary/` |
| Client quotes | Sarah H., Mark T., Emily R. quotes, with Mary's image labeled as coach | `https://center4excellence.com/index.php/testimonials/` |
| Numbers | 25+ years, two master's degrees, 1:1 support, four visible growth areas | Original credentials; Center for Excellence About |
| Journal | Beautiful Transformation; intervention article; stages of addiction | Actual archived article URLs |
| Programs | Life Jumpstart; Total Life Transformation; Bronze/Silver/Gold; Elite VIP | Center for Excellence coaching programs |
| Image mosaic | Personal growth and meaningful professional development | `/personal-development-and-business-growth/` |
| Consultation | Free confidential introductory conversation | `/contact-us/` |
| Contact | Primary phone/email and published hours; secondary phone from related site | Original contact page and Center for Excellence contact |
| Map | General Maui region, with no invented office pin or street address | Mary's Maui connection in her published biography and Mumbai article; map © OpenStreetMap contributors |
| Footer | Existing biography, credentials, service, journal, legal/resource links | Original navigation and footer |

## Interior pages reserved for the next phase

Keep existing URL slugs when possible: About Mary, My Methodology, Mary's Credentials, Goldilocks, service overview and individual services, Rates & Insurance, Mary's Blog and its articles, Contact, addiction resources, Serenity Prayer, Twelve Steps, Twelve Traditions, Privacy Policy, and Disclaimer. Their complete discovered text is archived. The current homepage links to existing live interior pages because their replacement designs are explicitly deferred.

## Legacy content issues to resolve before replacing the entire domain

1. Original pages contain `noindex, follow`, the generic title “Goldilocks Wisdom,” and an empty meta description. The new homepage corrects these.
2. Original homepage and About assign some identical testimonials to different names. Those conflicting quotes were not migrated. Center for Excellence uses stock/randomuser photos; only its text was carried over, with no fabricated client portraits. Confirm the selected testimonials' provenance before public client approval.
3. Original statistic counters show zero in the rendered text. No intervention count, therapy-hour count, 90% success claim, guarantee, or demo award count was copied.
4. Degree descriptions vary between the sites (“coaching” versus “counseling”). The homepage uses the consistent facts: dual master's degrees, psychology and addiction studies, and the two named institutions. No license or certification number was invented.
5. Original blog index is sparse and contains a `blog-details.html` placeholder link. Complete article links were recovered from the site's article sidebars and homepage. The empty template destination is archived and excluded from the new homepage.
6. Original service overview and rates pages contain very little content. Preserve verified information when designing those pages; do not silently fill gaps with invented prices or coverage claims.
7. Office street address and time zone are not established by the sources. Neither is invented in the page or schema. The Maui map identifies a region, not an office.
8. The Goldilocks page uses a fictional/comedic recovery persona. It is archived separately and is not treated as a literal factual biography or a homepage narrative.
9. Reference demo photography is used to honor the requested visual reproduction in the private preview. Its separate stock-image reuse permissions are not established by access to the demo. Confirm rights or substitute licensed imagery before public launch.

## Image metadata

Every in-page image has a descriptive filename, alt text, explicit dimensions, and appropriate lazy loading. Hero imagery has responsive sources and high fetch priority. The generated portraits retain their provenance in the image ledger and embedded XMP; captions never identify illustrative people as actual clients. No private GPS metadata is introduced.
