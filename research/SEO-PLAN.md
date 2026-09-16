# Mary McNutt — SEO and keyword plan

Research date: 14 September 2026. Target market: English-speaking United States; local targeting remains conditional on verified service locations and availability.

## Recommended keywords and page intent

| Priority | Keyword cluster | Search intent | Best destination |
|---|---|---|---|
| 1 | Mary McNutt; Mary McNutt coach; Mary Goldilocks McNutt | Find this specific person | Homepage and About |
| 1 | transformational life coach; transformational life coaching | Find purpose and make personal changes | Homepage and dedicated life-coaching page |
| 1 | life and business coach; business development coach; personal development coach | Align professional and personal goals | Homepage and existing personal-development/business-growth URL |
| 2 | life purpose coaching; personal growth coaching; life transition coach | Solve a specific personal-growth need | Focused life-coaching content |
| 2 | addiction recovery coach; recovery aftercare coaching; relapse prevention coaching | Find recovery support | Separate recovery and relapse-prevention pages |
| 2 | sober companion services; family recovery coaching | Find a specific service | Existing sober-companion and family pages |
| 2 | grief and loss coaching; family of origin coaching | Find support for a specific concern | Existing grief and family-of-origin pages |
| Conditional | online life coach; online business coaching | Find remote coaching | Use as a primary target only after Mary confirms remote availability and session format |
| Conditional | life coach Maui; life coach Hawaii; life coach Minneapolis | Find local services | Use only after exact active service areas/office details are confirmed |

Priority combines Mary's published services, search intent, and the Google Trends comparison below; it does not represent measured absolute keyword volume, difficulty, or ranking probability. No authenticated Google Ads Keyword Planner, Search Console, or paid keyword dataset was available. Broad “health coach” and nutrition/medical keywords are not primary targets: the sources substantiate transformation, business development, and recovery rather than a nutrition or medical practice.

## Verified Google Trends comparison

On 14 September 2026, compared **search terms** in the **United States**, **Past 12 months**, **Web Search**, **All categories**. The visible chart's average relative-interest scores were:

| Search term | Average relative interest |
|---|---:|
| life coach | 52 |
| business coach | 35 |
| transformational coaching | 1 |

Source: [Google Trends comparison](https://trends.google.com/trends/explore?date=today%2012-m&geo=US&q=life%20coach,business%20coach,transformational%20coaching). The rendered tables and page text are saved in `google-trends-2026-09-14.json`, including all 53 weekly observations. These normalized, sampled scores are **not monthly search counts**. The current partial week should not be compared with a completed week.

This supports emphasizing the recognizable **life coach** and **business coach** service terms while retaining **transformational** as Mary's authentic positioning. The chart does not show a sustained current rise: both broad terms were below their spring peaks in September. Do not label all recommended keywords “trending upward.” The related-query panel also surfaced leadership terms, but those are not automatic homepage targets because Mary's specific leadership offerings were not established. [Google Trends data interpretation](https://support.google.com/trends/answer/4365533?hl=en).

## Current market evidence

ICF's 2025 study describes expanding professional coaching demand and organizational investment. This supports foregrounding Mary's business and personal-development services as an editorial choice; it does not establish search-volume trends for individual keywords. [ICF study overview](https://coachingfederation.org/about/landing.cfm?ItemNumber=3936), [ICF analysis of coaching as a strategic advantage](https://coachingfederation.org/blog/coaching-as-a-strategic-advantage-what-the-2025-global-coaching-study-reveals/).

Next measurement step: validate the remaining service clusters and related queries in Keyword Planner, then use Mary's Search Console queries and actual consultation conversions to prioritize interior pages. Compare seasonality and baseline volume, not isolated spikes. Do not promise first-page placement.

## Homepage implementation

- Title: **Mary McNutt | Transformational Life & Business Coach**.
- Description: **Find purpose, confidence, and lasting growth with Mary McNutt, M.A. Explore transformational life, business, and recovery coaching. Book a free consultation.**
- One H1; semantic sections; descriptive headings and crawlable links.
- All essential content is in the initial HTML response. No React runtime or JavaScript-dependent copy.
- Canonical destination: `https://marymcnutt.com/`.
- `index, follow` and generous snippet/image preview directives replace the source site's `noindex`.
- JSON-LD: WebSite, WebPage, Person, Organization, and an OfferCatalog containing three Service descriptions. No fabricated ratings, medical licenses, street address, prices, or outcome claims.
- Open Graph and Twitter title/description metadata. A separate social-sharing image was not requested or generated.
- Descriptive image names, alt text, width/height, WebP compression, responsive portraits, lazy loading below the hero, font self-hosting, high-priority hero, and reduced-motion behavior.
- `sitemap.xml` contains only the new homepage and its three principal portraits. Deferred replacement pages must be added when they exist.
- `robots.txt` allows ordinary search crawlers and the named AI crawlers, including OAI-SearchBot and GPTBot, consistent with the request to allow AI access. OAI-SearchBot and GPTBot serve different purposes; allowing one does not replace configuring the other. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).
- `llms.txt` provides a small, optional factual discovery aid. It is not a standard ranking requirement.

## About page implementation

- Primary intent: branded biography queries, “Mary McNutt coach,” coaching philosophy, background, and experience.
- Title: **About Mary McNutt, M.A. | Transformational Coach**.
- Description: **Meet Mary McNutt, M.A., a transformational life and business coach with 25+ years of experience, dual master's degrees, and deep recovery expertise.**
- Canonical: `https://marymcnutt.com/about/`.
- JSON-LD: AboutPage, BreadcrumbList, and Person with only source-supported education and areas of expertise.
- Natural internal links connect Mary's method and experience to the coaching plan and its four focus areas.

## Coaching page implementation

- Primary intent: life coaching, business coaching, personal development coaching, transformational coaching, recovery aftercare, and program/process queries.
- Title: **Life & Business Coaching Programs | Mary McNutt**.
- Description: **Explore Mary McNutt's transformational life, business, personal development, and recovery coaching. See the coaching process and start with a free consultation.**
- Canonical: `https://marymcnutt.com/coaching/`.
- JSON-LD: WebPage, BreadcrumbList, Person, ProfessionalService, OfferCatalog, and four Service nodes expressed through Offers. No prices, ratings, reviews, guarantees, or address data are asserted.
- Program names are factual, but inconsistent published prices are deliberately excluded. A free consultation is the conversion action.

## Three-page technical update

- The sitemap now lists `/`, `/about/`, and `/coaching/` with principal Mary images.
- All three pages include unique titles, descriptions, canonical URLs, Open Graph metadata, X/Twitter metadata, and one descriptive H1.
- Homepage navigation and contextual calls to action now resolve to the new local routes. Legacy article and policy links remain pointed at their live equivalents.

Google says AI-search visibility follows ordinary SEO fundamentals: crawl access, useful text, internal links, accurate structured data, and good page experience. No special AI schema or new machine-readable file is required. [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

Use keywords naturally in titles, headings, introductory text, and descriptive link text. Avoid stuffing image alt text with search terms. Prioritize original, accurate, people-first information and recognizable expertise. [Google Search Essentials](https://developers.google.com/search/docs/essentials), [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## Launch sequence

1. Keep this preview private during review. The prepared HTML is indexable, but an authenticated private host cannot be crawled publicly.
2. Preserve the existing interior pages until their replacements are completed; homepage links currently point to them. Replacing the entire domain with only this folder would leave those legacy paths unavailable.
3. Confirm testimonial approval, stock-image licensing, program details, and current contact hours. Confirm exact service locations before adding LocalBusiness address data.
4. Deploy the complete approved site to MaryMcNutt.com over HTTPS. Set one canonical hostname; redirect HTTP and alternate hostname variants with permanent redirects.
5. Preserve existing paths or create individual 301 redirects from old to genuinely equivalent new pages. Do not redirect every missing service/article to the homepage.
6. Confirm there is no host-level `X-Robots-Tag: noindex`, password gate, or crawler block in production. Confirm the XML sitemap is served at the canonical domain.
7. Verify Search Console ownership, submit the sitemap, inspect representative URLs and structured data, and measure real mobile performance. Search inclusion is not guaranteed by metadata or static HTML alone.

## Remaining page keyword map — 15 September 2026

| Page | Primary search intent | Supporting terms |
|---|---|---|
| Pricing | coaching pricing and coaching options for Mary McNutt | personalized coaching plan, life coaching cost, business coaching options |
| Blog | Mary McNutt articles and practical coaching guidance | personal transformation, addiction recovery education, family support |
| Beautiful Transformation | personal transformation and lasting change | resilience, authentic growth, small steps |
| What Is an Intervention? | addiction intervention information | family intervention, professional interventionist, treatment support |
| Stages of Addiction | stages and warning signs of addiction | progressive addiction, family awareness, treatment |
| Aloha from Mumbai | Mary McNutt background and recovery mission | Mary McNutt Maui, addiction speaker, recovery purpose |
| Understanding Addiction | addiction education and relapse | chronic disease, cravings, whole-person treatment, recovery support |
| Contact | contact Mary McNutt and free coaching consultation | life coach consultation, recovery aftercare consultation, business coaching inquiry |

Every route has a unique title, description, canonical, Open Graph/X metadata, one H1, crawlable internal links, and valid page-specific JSON-LD. Article pages use BlogPosting plus BreadcrumbList without invented publication dates. Pricing schema follows the client-approved $99 introductory hour and $249/$399/$499/$549 fixed plans.

## Full service migration — 15 September 2026

The site now has dedicated, indexable destinations for 19 archived service topics, including personal and business development, sober companion support, family-of-origin healing, relapse prevention, family coaching, grief, trauma, process addictions, gambling, and interventions. Titles pair each specific search intent with Mary McNutt’s name; descriptions and body copy remain grounded in the saved original-site material. `/services/` and `/resources/` provide crawlable hubs, and all new routes are included in the sitemap.
