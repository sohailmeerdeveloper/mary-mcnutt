from pathlib import Path
from html import escape
import re

from build_remaining import DIST, ROOT, SITE_URL, head, header, footer, contract, write

TEXT = ROOT / "research" / "text"

SERVICES = [
    ("personal-development-business-growth", "personal-development-and-business-growth.txt", "Personal Development & Business Growth", "professional-development.webp"),
    ("sober-companion-services", "sober-companion-services.txt", "Sober Companion Services", "support-and-connection.webp"),
    ("family-of-origin-healing", "family-of-origin-issues.txt", "Family of Origin Healing", "family-balance.webp"),
    ("relapse-prevention", "relapse-prevention.txt", "Relapse Prevention", "new-beginnings.webp"),
    ("drug-prevention-classes", "drug-prevention-classes.txt", "Drug Prevention Classes", "purpose-and-learning.webp"),
    ("conflict-resolution", "conflict-resolution.txt", "Conflict Resolution", "coaching-community.webp"),
    ("grief-and-loss", "healthy-management-of-grief-and-loss.txt", "Healthy Management of Grief & Loss", "reflection-and-growth.webp"),
    ("relationship-grief-trauma", "relationship-grief-trauma-issues.txt", "Relationship, Grief & Trauma Support", "personal-reflection.webp"),
    ("parenting-support", "parenting-support.txt", "Parenting Support", "family-balance.webp"),
    ("family-coaching", "family-counseling.txt", "Family Coaching", "coaching-community.webp"),
    ("couples-intensive-coaching", "couples-intensive.txt", "Couples Intensive Coaching", "support-and-connection.webp"),
    ("eating-disorders", "eating-disorders.txt", "Eating Disorder Support", "personal-growth.webp"),
    ("compulsive-shopping", "shopping.txt", "Compulsive Shopping Support", "confidence-at-work.webp"),
    ("trauma-resolution", "trauma-resolution.txt", "Trauma Resolution", "steps-toward-change.webp"),
    ("financial-disorder", "financial-disorder.txt", "Financial Disorder Support", "business-coaching.webp"),
    ("process-addictions", "process-addictions.txt", "Process Addiction Support", "new-beginnings.webp"),
    ("problem-compulsive-gambling", "problem-and-compulsive-gambling.txt", "Problem & Compulsive Gambling", "personal-reflection.webp"),
    ("womens-issues", "womens-issue.txt", "Women's Issues Coaching", "personal-growth.webp"),
    ("interventions", "interventions.txt", "Intervention Guidance", "coaching-community.webp"),
]


def source_blocks(filename, title, stop="Our Services"):
    raw = (TEXT / filename).read_text(encoding="utf-8").replace("\xa0", " ")
    before = raw.split(stop, 1)[0]
    positions = [m.end() for m in re.finditer(rf"(?m)^{re.escape(title)}\s*$", before, re.I)]
    if positions:
        start = positions[-1]
    else:
        page_open = re.search(r"Contact Us\s*\n[^\n]+\nHOME[^\n]*\n[^\n]+\n\s*\n", before, re.I)
        start = page_open.end() if page_open else before.find("\n\n")
    body = before[start:].strip()
    blocks = [re.sub(r"\s+", " ", b.strip()) for b in re.split(r"\n\s*\n", body) if b.strip()]
    return blocks


def paragraphs(blocks):
    html = []
    for i, block in enumerate(blocks):
        if len(block) < 75 and not block.endswith("."):
            html.append(f"<h2>{escape(block)}</h2>")
        else:
            html.append(f'<p{(" class=\"article-lede\"" if i == 0 else "")}>{escape(block)}</p>')
    return "".join(html)


def build_services_hub():
    cards = "".join(f'<article><img src="/assets/images/{img}" width="900" height="600" loading="lazy" alt=""><div><p>Personalized support</p><h2>{escape(title)}</h2><a href="/services/{slug}/">Explore this service <span aria-hidden="true">→</span></a></div></article>' for slug, _, title, img in SERVICES)
    title = "Coaching & Recovery Support Services | Mary McNutt"
    desc = "Explore Mary McNutt's personal development, business growth, recovery aftercare, family coaching, grief, trauma, and intervention support services."
    page = head(title, desc, "/services/", "coaching-programs.webp") + '<body class="interior-page legacy-page services-hub">' + contract("A panoramic coaching image opens into a complete, filter-free service directory.", "Established editorial card system") + '<a class="skip-link" href="#main">Skip to content</a>' + header("coaching") + f'''<main id="main"><section class="legacy-hero"><img src="/assets/images/coaching-programs.webp" width="1672" height="940" alt="People in a supportive coaching workshop"><div class="wrap"><p class="breadcrumb"><a href="/">Home</a> / Services</p><h1>Coaching that meets<br><strong>the whole person</strong></h1><p>Mary’s archived services bring personal growth, practical structure, family support, and recovery experience into one confidential coaching relationship.</p></div></section><section class="legacy-intro wrap"><p class="eyebrow">Services with Mary McNutt</p><h2>Find the support that fits<br><strong>what you are facing now.</strong></h2><p>Each service below is rebuilt from Mary’s original published website content and presented in the same calm, responsive design as the rest of her new site.</p></section><section class="service-directory wrap">{cards}</section><section class="legacy-cta"><div class="wrap"><h2>Not sure which service fits?</h2><p>Start with a free, confidential conversation. Mary can help you identify the most useful next step.</p><a class="button white" href="/contact/">Talk with Mary</a></div></section></main>{footer()}</body></html>'''
    write("services", page)


def build_service(slug, filename, title, image):
    blocks = source_blocks(filename, title)
    if not blocks:
        blocks = source_blocks(filename, title.replace("Support", "Issues"))
    desc_text = next((b for b in blocks if len(b) > 90), f"Learn about {title.lower()} with Mary McNutt.")
    desc = re.sub(r"\s+", " ", desc_text)[:155].rsplit(" ", 1)[0] + "."
    related = [s for s in SERVICES if s[0] != slug][:3]
    related_html = "".join(f'<a href="/services/{s[0]}/"><span>{escape(s[2])}</span><b aria-hidden="true">→</b></a>' for s in related)
    page = head(f"{title} | Mary McNutt Coaching", desc, f"/services/{slug}/", image) + '<body class="interior-page legacy-page service-detail">' + contract("A photographic service hero establishes the topic before a readable source-faithful article and related routes.", "Reusable service detail template") + '<a class="skip-link" href="#main">Skip to content</a>' + header("coaching") + f'''<main id="main"><section class="legacy-hero service-hero"><img src="/assets/images/{image}" width="1672" height="940" alt="{escape(title)} with Mary McNutt"><div class="wrap"><p class="breadcrumb"><a href="/">Home</a> / <a href="/services/">Services</a></p><h1>{escape(title)}</h1><p>Personalized, compassionate support with Mary McNutt, M.A.</p></div></section><div class="service-reading wrap"><article><p class="eyebrow">Mary McNutt coaching service</p>{paragraphs(blocks)}<aside class="care-note"><strong>A note about care</strong><p>Coaching can complement appropriate professional care, but it does not replace medical, psychiatric, legal, or emergency services.</p></aside></article><aside class="service-rail"><div><h2>Related support</h2>{related_html}<a href="/services/"><span>View every service</span><b aria-hidden="true">→</b></a></div><div class="rail-card"><p>Begin privately</p><h2>Free consultation</h2><a class="button white" href="/contact/">Contact Mary</a></div></aside></div><section class="legacy-cta"><div class="wrap"><h2>Take the next step with clarity.</h2><p>Tell Mary what is happening and what you would like to change.</p><a class="button white" href="/contact/">Request a consultation</a></div></section></main>{footer()}</body></html>'''
    write(f"services/{slug}", page)


def build_resource_page(slug, filename, title):
    blocks = source_blocks(filename, title, "Useful Links")
    if slug == "the-12-steps":
        items = [line.strip() for line in (TEXT / filename).read_text(encoding="utf-8").split("The 12 Steps of Alcoholics Anonymous (AA) are as follows:", 1)[1].split("Useful Links", 1)[0].splitlines() if line.strip()]
        content = '<h2>What are the 12 Steps?</h2><p class="article-lede">The 12 Steps of Alcoholics Anonymous (AA) are as follows:</p><ol class="recovery-list">' + "".join(f"<li>{escape(item)}</li>" for item in items) + "</ol>"
    elif slug == "the-twelve-traditions":
        items = [
            "Our common welfare should come first; personal recovery depends upon A.A. unity.",
            "For our group purpose there is but one ultimate authority—a loving God as He may express Himself in our group conscience. Our leaders are but trusted servants; they do not govern.",
            "The only requirement for A.A. membership is a desire to stop drinking.",
            "Each group should be autonomous except in matters affecting other groups or A.A. as a whole.",
            "Each group has but one primary purpose—to carry its message to the alcoholic who still suffers.",
            "An A.A. group ought never endorse, finance, or lend the A.A. name to any related facility or outside enterprise, lest problems of money, property, and prestige divert us from our primary purpose.",
            "Every A.A. group ought to be fully self-supporting, declining outside contributions.",
            "Alcoholics Anonymous should remain forever nonprofessional, but our service centers may employ special workers.",
            "A.A., as such, ought never be organized; but we may create service boards or committees directly responsible to those they serve.",
            "Alcoholics Anonymous has no opinion on outside issues; hence the A.A. name ought never be drawn into public controversy.",
            "Our public relations policy is based on attraction rather than promotion; we need always maintain personal anonymity at the level of press, radio, and films.",
            "Anonymity is the spiritual foundation of all our Traditions, ever reminding us to place principles before personalities.",
        ]
        content = '<h2>The Twelve Traditions of Alcoholics Anonymous</h2><ol class="recovery-list">' + "".join(f"<li>{escape(item)}</li>" for item in items) + '</ol><p class="resource-attribution">Copyright © 1952, 1953, 1981 by A.A. Grapevine, Inc. and Alcoholics Anonymous Publishing (now known as Alcoholics Anonymous World Services, Inc.). All rights reserved. Rev. 10/14.</p>'
    elif slug == "serenity-prayer":
        clean = [b for b in blocks if not b.lower().startswith("reinhold niebuhr")]
        content = paragraphs(clean[:-1]) + f'<blockquote class="resource-prayer"><p>{escape(clean[-1])}</p><cite>Attributed to Reinhold Niebuhr</cite></blockquote>'
    else:
        content = paragraphs(blocks)
    desc = f"Read {title} and recovery guidance from Mary McNutt's archived educational resources."
    page = head(f"{title} | Mary McNutt Resources", desc, f"/resources/{slug}/", "purpose-and-learning.webp") + '<body class="interior-page legacy-page resource-detail">' + contract("A quiet learning hero leads into an accessible long-form recovery resource.", "Established editorial reading surface") + '<a class="skip-link" href="#main">Skip to content</a>' + header("") + f'''<main id="main"><section class="legacy-hero resource-hero"><img src="/assets/images/purpose-and-learning.webp" width="1672" height="940" alt="Books and notes for reflection"><div class="wrap"><p class="breadcrumb"><a href="/">Home</a> / <a href="/resources/">Resources</a></p><h1>{escape(title)}</h1><p>From Mary McNutt’s original recovery resource library.</p></div></section><div class="policy-reading wrap"><article>{content}</article><aside><h2>Keep exploring</h2><a href="/resources/">All resources</a><a href="/blog/understanding-addiction/">Understanding addiction</a><a href="/services/relapse-prevention/">Relapse prevention</a><a href="/contact/">Ask Mary a question</a></aside></div></main>{footer()}</body></html>'''
    write(f"resources/{slug}", page)


def build_resources():
    cards = [("understanding-addiction", "/blog/understanding-addiction/", "Understanding Addiction", "A clear introduction to addiction as a chronic, treatable disease."), ("serenity-prayer", "/resources/serenity-prayer/", "The Serenity Prayer", "A familiar recovery reflection preserved from Mary’s original resource page."), ("the-12-steps", "/resources/the-12-steps/", "The 12 Steps", "The complete educational text from Mary’s archived recovery resources."), ("the-twelve-traditions", "/resources/the-twelve-traditions/", "The Twelve Traditions of AA", "A preserved reference for people exploring recovery community principles."), ("relapse-prevention", "/services/relapse-prevention/", "Relapse Prevention", "Practical, individualized support for protecting recovery."), ("family-support", "/services/family-coaching/", "Family Support", "Communication, boundaries, understanding, and healthier family patterns.")]
    card_html = "".join(f'<article><p>Recovery &amp; growth</p><h2>{escape(t)}</h2><p>{escape(c)}</p><a href="{href}">Read or explore <span aria-hidden="true">→</span></a></article>' for _, href, t, c in cards)
    page = head("Recovery Resources & Education | Mary McNutt", "Explore Mary McNutt's recovery education, addiction information, 12 Steps, Serenity Prayer, family support, and relapse prevention resources.", "/resources/", "purpose-and-learning.webp") + '<body class="interior-page legacy-page resources-hub">' + contract("A learning-focused hero opens into a concise library of source-backed recovery material.", "Established editorial resource grid") + '<a class="skip-link" href="#main">Skip to content</a>' + header("") + f'''<main id="main"><section class="legacy-hero"><img src="/assets/images/purpose-and-learning.webp" width="1672" height="940" alt="Open books and notes for recovery learning"><div class="wrap"><p class="breadcrumb"><a href="/">Home</a> / Resources</p><h1>Knowledge for<br><strong>the next right step</strong></h1><p>Educational material from Mary’s original website, reorganized for easier reading and practical use.</p></div></section><section class="legacy-intro wrap"><p class="eyebrow">Recovery resources</p><h2>Understand more.<br><strong>Move forward with support.</strong></h2><p>These pages preserve Mary’s published guidance and connect it to the services available on this website.</p></section><section class="resource-grid wrap">{card_html}</section><section class="legacy-cta"><div class="wrap"><h2>Information is useful. Personal support can make it actionable.</h2><a class="button white" href="/contact/">Start a conversation</a></div></section></main>{footer()}</body></html>'''
    write("resources", page)


def build_center():
    page = head("Center for Excellence | Mary McNutt Coaching", "Discover the Center for Excellence approach to transformational coaching, personal development, recovery aftercare, and family-of-origin healing with Mary McNutt.", "/center-for-excellence/", "mary-mcnutt-original-brand-portrait.webp") + '<body class="interior-page legacy-page center-page">' + contract("Mary’s portrait and the Center mission share a premium split hero before values and services unfold.", "Established brand editorial surface") + '<a class="skip-link" href="#main">Skip to content</a>' + header("") + f'''<main id="main"><section class="center-hero"><div class="wrap"><div><p class="eyebrow">Center for Excellence</p><h1>Clarity, resilience,<br><strong>and purposeful change.</strong></h1><p>The Center for Excellence empowers individuals through holistic, compassionate coaching that fosters clarity, resilience, and purpose.</p><a class="button primary" href="/contact/">Begin a conversation</a></div><img src="/assets/images/mary-mcnutt-original-brand-portrait.webp" width="900" height="1000" alt="Mary McNutt smiling"></div></section><section class="center-mission wrap"><div><p class="eyebrow">Mission &amp; vision</p><h2>Build a life with greater<br><strong>intention and emotional freedom.</strong></h2></div><p>Mary’s Center for Excellence work brings inner clarity into practical life and professional decisions. The vision is growth with alignment: progress that respects the whole person and can be sustained beyond a single session.</p></section><section class="value-grid wrap"><article><b>01</b><h2>Integrity</h2><p>Confidential, honest guidance and clear professional boundaries.</p></article><article><b>02</b><h2>Compassion</h2><p>Empathy for the individual, family, and lived experience behind each goal.</p></article><article><b>03</b><h2>Accountability</h2><p>Practical structure that turns reflection into meaningful action.</p></article><article><b>04</b><h2>Holistic growth</h2><p>Support for the relationships between personal, professional, and recovery life.</p></article></section><section class="center-services"><div class="wrap"><p class="eyebrow">Areas of work</p><h2>Coaching through the<br><strong>Center for Excellence</strong></h2><div><a href="/coaching/#life-coaching">Transformational life coaching</a><a href="/services/personal-development-business-growth/">Business &amp; personal development</a><a href="/coaching/#recovery-coaching">Addiction recovery aftercare</a><a href="/services/sober-companion-services/">Sober companion services</a><a href="/services/family-of-origin-healing/">Family of origin healing</a></div></div></section><section class="legacy-cta"><div class="wrap"><h2>One website. One clear path to Mary.</h2><p>The Center’s services are now fully integrated into MaryMcNutt.com.</p><a class="button white" href="/services/">Explore all services</a></div></section></main>{footer()}</body></html>'''
    write("center-for-excellence", page)


def build_policy(slug, filename, title):
    blocks = source_blocks(filename, title, "Useful Links")
    page = head(f"{title} | Mary McNutt", f"Read the {title.lower()} for MaryMcNutt.com.", f"/{slug}/", "reflection-and-growth.webp") + '<body class="interior-page legacy-page policy-page">' + contract("A compact legal header moves immediately into highly readable policy copy.", "Established editorial policy surface") + '<a class="skip-link" href="#main">Skip to content</a>' + header("") + f'''<main id="main"><section class="policy-head"><div class="wrap"><p class="breadcrumb"><a href="/">Home</a> / {escape(title)}</p><h1>{escape(title)}</h1><p>MaryMcNutt.com</p></div></section><div class="policy-reading wrap"><article>{paragraphs(blocks)}</article><aside><h2>Website information</h2><a href="/contact/">Contact Mary</a><a href="/privacy-policy/">Privacy policy</a><a href="/disclaimer/">Disclaimer</a></aside></div></main>{footer()}</body></html>'''
    write(slug, page)


def rewrite_legacy_anchors():
    mapping = {
        "https://marymcnutt.com/personal-development-and-business-growth/": "/services/personal-development-business-growth/",
        "https://marymcnutt.com/family-counseling/": "/services/family-coaching/",
        "https://marymcnutt.com/relapse-prevention/": "/services/relapse-prevention/",
        "https://marymcnutt.com/addition-related-links/": "/resources/",
        "https://marymcnutt.com/beautiful-transformation/": "/blog/beautiful-transformation/",
        "https://marymcnutt.com/messages-in-a-bottle-stages-of-addiction/": "/blog/stages-of-addiction/",
        "https://marymcnutt.com/what-is-addiction/": "/blog/understanding-addiction/",
        "https://marymcnutt.com/aloha-and-greetings-from-mumbai-new-delhi/": "/blog/aloha-from-mumbai/",
        "https://marymcnutt.com/privacy-policy/": "/privacy-policy/",
        "https://marymcnutt.com/disclaimer/": "/disclaimer/",
        "https://center4excellence.com/": "/center-for-excellence/",
    }
    for file in DIST.rglob("*.html"):
        html = file.read_text(encoding="utf-8")
        for old, new in mapping.items():
            html = re.sub(rf'(<a\b[^>]*\bhref="){re.escape(old)}(")', rf'\1{new}\2', html, flags=re.I)
        file.write_text(html, encoding="utf-8")


def rebuild_sitemap():
    urls = []
    for file in sorted(DIST.rglob("index.html")):
        rel = file.parent.relative_to(DIST).as_posix()
        path = "/" if rel == "." else f"/{rel}/"
        urls.append(f"  <url><loc>{SITE_URL}{path}</loc></url>")
    (DIST / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + "\n</urlset>\n", encoding="utf-8")


if __name__ == "__main__":
    build_services_hub()
    for service in SERVICES:
        build_service(*service)
    build_resources()
    build_resource_page("serenity-prayer", "serenity-prayer.txt", "Serenity Prayer")
    build_resource_page("the-12-steps", "the-12-steps.txt", "The 12 Steps")
    build_resource_page("the-twelve-traditions", "the-twelve-traditions-of-aa.txt", "The Twelve Traditions of AA")
    build_center()
    build_policy("privacy-policy", "privacy-policy.txt", "Privacy Policy")
    build_policy("disclaimer", "disclaimer.txt", "Disclaimer")
    rewrite_legacy_anchors()
    rebuild_sitemap()
    print(f"Built {len(SERVICES)} service pages, hubs, resources, Center for Excellence, and policies.")
