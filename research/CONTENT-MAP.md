# Mary McNutt — content archive and site mapping

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

## About page mapping

| Reference region | Mary's replacement content | Primary source |
|---|---|---|
| Interior hero | About Mary positioning and personal coaching relationship | MaryMcNutt.com `/about-mary/`; Center for Excellence About |
| Eight-part approach grid | Story, values, strengths, awareness, courageous conversation, planning, momentum, support | MaryMcNutt.com `/why-choose-mary/`; Center for Excellence How It Works |
| Green four-step field | Unearth Narrative, Forge Core, Discover Genius, Activate Lens | MaryMcNutt.com `/why-choose-mary/`; Center for Excellence How It Works |
| Experience background | 25+ years, dual master's degrees, one-to-one work, national/international speaking | MaryMcNutt.com `/marys-credentials/`; Center for Excellence About |
| Biography portrait | Education, outpatient treatment center leadership, counseling/coaching experience, profession as ministry | MaryMcNutt.com `/about-mary/` and `/marys-credentials/` |
| Four support cards | Life coaching, business/personal development, recovery aftercare, family/emotional healing | Center for Excellence Services; archived Mary service pages |
| Consultation and contact | Free confidential conversation, verified email/phone/hours | Both source sites' contact content |

## Coaching page mapping

| Reference region | Mary's replacement content | Primary source |
|---|---|---|
| Interior hero | Personalized coaching plan and one-to-one relationship | Center for Excellence Coaching Programs |
| Five-step alternating timeline | Initial consultation, values and purpose, coaching focus, personal plan, sustainable change | Center for Excellence How It Works; MaryMcNutt.com `/why-choose-mary/` |
| Coaching focus links | Life, business/personal development, recovery/aftercare, family/emotional healing | Center for Excellence Services and homepage |
| Philosophy quote band | Mary's published “My profession is my ministry” statement, with a concise contextual paraphrase | MaryMcNutt.com `/about-mary/` |
| Program options | Life Jumpstart, Total Life Transformation, Bronze/Silver/Gold, Elite VIP Life Experience | Center for Excellence Coaching Programs |
| Contact form | Static mailto workflow plus direct phone and email | Verified contact details from both sites |

## Verification decisions for the interior pages

1. The client directed the Pricing page to use the supplied reference plan prices: Starter $249, Professional $399, Expert $499, and Premium $549. The client subsequently set the no-plan introductory hour at $99 so it remains meaningfully distinct from the Starter plan.
2. The source sites use several degree labels (“coaching” and “counseling”). The interior copy uses the live Center for Excellence wording: Addiction Studies and Counseling; Psychology and Counseling, while preserving the institutions.
3. No success rate, intervention count, client total, award count, guarantee, medical license, office address, or testimonial was added.
4. “Global speaking experience” summarizes the verified national/international speaker claim and published talks in India and South Africa; no event count is asserted.
5. AI-created Mary portraits are derived from the user's supplied identity photographs, preserve her age and features, and are documented in the image ledger. Optimized WebP derivatives are used on the public pages; source PNGs remain archived under `research/ai-source-images/`.

## Specialist and resource migration — completed 15 September 2026

The archived specialist material now powers a local `/services/` directory and 19 responsive service detail pages. Recovery education is organized under `/resources/`, with local Serenity Prayer, Twelve Steps, and Twelve Traditions pages. Center for Excellence, Privacy Policy, and Disclaimer are also local. Visible links to the two legacy sites were replaced with equivalent internal destinations; canonical metadata continues to identify the intended production MaryMcNutt.com URLs.

## Remaining-pages implementation — 15 September 2026

| New route | Content used | Source and decision |
|---|---|---|
| `/blog/` | Five real editorial topics spanning personal transformation, intervention, addiction stages, Mary's Mumbai reflection, and addiction education | Archived MaryMcNutt.com article text in `research/text/`; demo screenshots used only for archive layout and density |
| `/blog/beautiful-transformation/` | Mary's short reflection on progress, resilience, and authentic transformation | `research/text/_beautiful-transformation.txt`; lightly structured without changing the core meaning |
| `/blog/what-is-an-intervention/` | Purpose, preparation, professional facilitation, dignity, and treatment direction | `research/text/_helping-stop-a-terrible-waste-of-human-talent-and-potential-2.txt`; unsupported legacy workplace multipliers omitted |
| `/blog/stages-of-addiction/` | Four-stage progression, warning signs, consequences, and treatment context | `research/text/messages-in-a-bottle-stages-of-addiction.txt`; condensed for an accessible editorial overview |
| `/blog/aloha-from-mumbai/` | Mary's international perspective, personal calling, Maui connection, and service orientation | `research/text/_aloha-and-greetings-from-mumbai-new-delhi.txt`; spiritual language summarized respectfully |
| `/blog/understanding-addiction/` | Addiction as a chronic, treatable disease; interacting risk factors; whole-person treatment; relapse | `research/text/what-is-addiction.txt`; condensed from the long archived educational resource |
| `/contact/` | Email, two published phone numbers, weekday hours, free confidential consultation, Maui regional connection | Archived contact page and Center for Excellence extracts; no street address, office pin, or timezone invented |
| `/pricing/` | $99 introductory hour plus Starter $249, Professional $399, Expert $499, and Premium $549 plans; self-pay/no insurance, payment methods, 24-hour cancellation request | Prices set at the client's direction using the supplied pricing screenshots and follow-up guidance |

### Image decisions for the new pages

The new pages reuse optimized WebP assets already documented in `research/image-ledger.json`. Mary's supplied portraits identify Mary; reference-demo photographs remain private-preview assets pending licensing confirmation. No new synthetic portrait was generated for this phase. Article imagery is distributed between relevant sections rather than collected into galleries.

### Information not verified

- No public office street address, service timezone, active social profiles beyond the documented Facebook page, or guaranteed remote-service territory was established.
- Original publication dates were not reliably present in the archived article output, so no dates were invented in visible copy or BlogPosting schema.
- Exact plan inclusions and availability should be confirmed with Mary; the displayed $249, $399, $499, and $549 prices follow the client's supplied pricing reference.

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
