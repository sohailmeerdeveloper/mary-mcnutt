from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"

SITE_URL = "https://marymcnutt.com"
PHONE = "(808) 662-3784"
PHONE_HREF = "+18086623784"
EMAIL = "Mary@MaryMcNutt.com"

POSTS = [
    {
        "slug": "beautiful-transformation",
        "title": "Beautiful Transformation",
        "category": "Personal growth",
        "description": "Mary McNutt reflects on transformation as a gradual practice of growth, healing, resilience, and authentic change.",
        "image": "personal-growth.webp",
        "alt": "A woman walking through a sunlit green landscape",
        "body": """
          <p class="article-lede">Transformation is not just about change. It is about growth, healing, and becoming more fully yourself.</p>
          <p>A beautiful transformation begins when challenges are met as opportunities to learn rather than proof that we have failed. Setbacks can become stepping stones toward strength when we are willing to listen to what they are showing us.</p>
          <figure><img src="/assets/images/reflection-and-growth.webp" width="900" height="600" loading="lazy" alt="A quiet journal and tea arranged for personal reflection"><figcaption>Lasting change is often built in quiet, repeatable moments of reflection.</figcaption></figure>
          <h2>From self-doubt to self-confidence</h2>
          <p>The journey may move from pain toward peace, from fear toward freedom, or from uncertainty toward a clearer sense of direction. True transformation begins within and becomes visible in the way we think, feel, choose, and relate to the world around us.</p>
          <blockquote><p>Transformation is not about perfection. It is about progress, resilience, and the courage to build a life that feels authentic.</p></blockquote>
          <h2>Small steps still change a life</h2>
          <p>Every small step forward, every useful lesson, and every new beginning contributes to the larger unfolding. The work becomes sustainable when it is personal, practical, and grounded in what matters most to you.</p>
        """,
    },
    {
        "slug": "what-is-an-intervention",
        "title": "What Is an Intervention?",
        "category": "Recovery & family",
        "description": "Understand the purpose of a professionally facilitated addiction intervention and why early, respectful action can protect human potential.",
        "image": "support-and-connection.webp",
        "alt": "Two people sharing a supportive conversation",
        "body": """
          <p class="article-lede">Families and workplaces often call for help when substance use has created pain, uncertainty, or a crisis that can no longer be ignored.</p>
          <p>An intervention does not have to wait for someone to “hit bottom.” Early, thoughtful action can protect health, relationships, work, and the human potential that addiction places at risk.</p>
          <figure><img src="/assets/images/coaching-community.webp" width="900" height="600" loading="lazy" alt="People gathering around a table for a careful conversation"><figcaption>Preparation gives every participant a clear, respectful role in the conversation.</figcaption></figure>
          <h2>What a professional interventionist does</h2>
          <p>A qualified interventionist prepares the important people involved, facilitates the meeting, and keeps the conversation focused on the substance-use problem and the path toward appropriate treatment. This preparation helps participants avoid cross-talk, blame, and improvisation during an emotionally charged moment.</p>
          <p>Mary helps families and organizations understand the process and identify an appropriately licensed, experienced intervention professional when that level of care is needed.</p>
          <h2>Dignity instead of shame</h2>
          <p>A well-run intervention is direct, but it is not a public trial. The conversation should be carried out with dignity, respect, sound judgment, and compassion. The practical purpose is to help the person accept treatment and begin moving toward safety and recovery.</p>
          <blockquote><p>The goal is honest action: name the problem, protect the person’s dignity, and create a clear route to help.</p></blockquote>
        """,
    },
    {
        "slug": "stages-of-addiction",
        "title": "Messages in a Bottle: The Stages of Addiction",
        "category": "Addiction education",
        "description": "A clear overview of the progressive stages of addiction, early warning signs, consequences, and why treatment can still interrupt the process.",
        "image": "steps-toward-change.webp",
        "alt": "A path through green grass representing stages of change",
        "body": """
          <p class="article-lede">Addiction is progressive. Its effects may begin quietly, then spread through health, relationships, work, judgment, and daily life.</p>
          <p>Thinking in stages can help families recognize that a problem does not need to reach its most severe form before it deserves attention. The earlier the pattern is recognized, the more life remains available to protect.</p>
          <figure><img src="/assets/images/new-beginnings.webp" width="900" height="600" loading="lazy" alt="A person standing in morning light at the beginning of a path"><figcaption>Recognition and treatment can interrupt progression at any stage.</figcaption></figure>
          <h2>Stage I: mood change and growing preoccupation</h2>
          <p>The first stage begins with the use of a mood-altering substance and the experience of relief, euphoria, energy, or a sense that the world has become more manageable. Warning signs can include craving, counting pills, worrying about supply, increasing a dose without medical direction, or combining substances to change their effect.</p>
          <h2>Stage II: consequences begin to appear</h2>
          <p>Problems become visible in one or more areas of life: family, work or school, social functioning, legal status, or health. A person may still appear outwardly functional while performance, reliability, relationships, or physical well-being begin to deteriorate.</p>
          <figure><img src="/assets/images/personal-reflection.webp" width="900" height="600" loading="lazy" alt="A person pausing for honest personal reflection"><figcaption>Families often recognize consequences before the person using substances is ready to name them.</figcaption></figure>
          <h2>Stage III: major losses and physical dependence</h2>
          <p>Preoccupation intensifies and the consequences become harder to contain. Family relationships may end, employment or education may be lost, legal problems may emerge, and withdrawal or hospitalization may occur.</p>
          <h2>Stage IV: addiction affects the whole life</h2>
          <p>Late-stage addiction can involve severe, overlapping problems across health, housing, relationships, work, cognition, and safety. Even here, treatment matters: interrupting the destructive process can improve both life expectancy and quality of life.</p>
          <blockquote><p>No stage is a reason to give up. It is a reason to match the seriousness of the disease with appropriate care.</p></blockquote>
        """,
    },
    {
        "slug": "aloha-from-mumbai",
        "title": "Aloha and Greetings from Mumbai",
        "category": "Mary’s story",
        "description": "Mary McNutt shares the personal calling behind her work in addiction, recovery, healing, and service.",
        "image": "mary-mcnutt-original-brand-portrait.webp",
        "alt": "Mary McNutt smiling in a bright pink dress",
        "body": """
          <p class="article-lede">An international experience in Mumbai gave Mary a wider view of a truth she had already witnessed closely: substance-use problems reach across families, communities, professions, and borders.</p>
          <p>Mary Ellen Mackenna McNutt, M.A., has described her path into addiction and recovery work as both deeply personal and spiritual. Her family’s experience of crisis, healing, and unexpected grace shaped a lasting commitment to help others find their own route toward recovery.</p>
          <figure><img src="/assets/images/mary-mcnutt-original-portrait.webp" width="900" height="1000" loading="lazy" alt="Portrait of Mary McNutt against a dark background"><figcaption>Mary McNutt, M.A.</figcaption></figure>
          <h2>A calling grounded in lived experience</h2>
          <p>Mary’s study of addiction became more than a professional interest. It grew into a vocation: to bring education, structure, candor, and compassion to people whose lives have been disrupted by substance use.</p>
          <p>Her connection to Maui also became part of that story—a place she associates with healing, transition, and the possibility of beginning again.</p>
          <h2>From personal purpose to practical service</h2>
          <p>That sense of purpose now informs work that spans recovery aftercare, family support, personal development, and speaking. The setting may change, but the central intention remains consistent: meet people honestly, protect their dignity, and help them move toward a life with greater clarity and stability.</p>
        """,
    },
    {
        "slug": "understanding-addiction",
        "title": "Understanding Addiction",
        "category": "Addiction education",
        "description": "An accessible introduction to addiction as a chronic, treatable disease involving brain, behavior, environment, and the whole person.",
        "image": "purpose-and-learning.webp",
        "alt": "An open book and notebook representing learning and understanding",
        "body": """
          <p class="article-lede">Addiction is a chronic, treatable disease—not a simple failure of character or willpower.</p>
          <p>Repeated exposure to alcohol or other drugs can change the brain systems involved in reward, motivation, judgment, and impulse control. These changes help explain why a person may continue using despite consequences they can clearly see.</p>
          <figure><img src="/assets/images/purpose-and-learning.webp" width="900" height="600" loading="lazy" alt="Books and notes arranged for learning"><figcaption>Understanding the disease helps replace blame with appropriate action.</figcaption></figure>
          <h2>Risk is shaped by more than one factor</h2>
          <p>Genetics, mental health, early exposure, social environment, trauma, stress, and access to substances can interact in complicated ways. No single factor tells the whole story, and people differ in both vulnerability and resilience.</p>
          <h2>Treatment should consider the whole person</h2>
          <p>Effective care may include medical support, behavioral therapy, recovery communities, family work, and attention to co-occurring mental-health concerns. When several substances or conditions are involved, care should address them together rather than in isolation.</p>
          <figure><img src="/assets/images/support-and-connection.webp" width="900" height="600" loading="lazy" alt="Supportive hands resting together during a recovery conversation"><figcaption>Recovery is strengthened by treatment, practical support, and human connection.</figcaption></figure>
          <h2>Relapse calls for renewed care</h2>
          <p>Relapse can occur in the course of a chronic illness. It is a signal to return to treatment, revise the recovery plan, and strengthen support—not proof that change is impossible. Ongoing attention to triggers, cravings, stress, relationships, and daily structure can help protect long-term recovery.</p>
          <blockquote><p>People can recover. Clear information, timely treatment, and sustained support make that possibility practical.</p></blockquote>
        """,
    },
]


def icon_defs():
    return """<svg class="icon-defs" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="m5 3 4 4-2 3c2 3 4 5 7 7l3-2 4 4-2 3C10 22 2 14 2 5Z"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="1"/><path d="m3 5 9 8 9-8"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M7 2v6m10-6v6M3 11h18M7 15h3m4 0h3m-10 3h3"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6"/></symbol>
    <symbol id="i-location" viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></symbol>
    <symbol id="i-chat" viewBox="0 0 24 24"><path d="M3 4h18v13H9l-6 4Z"/><path d="M7 9h10M7 13h7"/></symbol>
    </defs></svg>"""


def head(title, description, path, image, og_type="website", schema=None):
    canonical = f"{SITE_URL}{path}"
    payload = schema or {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "WebPage", "@id": canonical + "#webpage", "url": canonical, "name": title, "description": description, "isPartOf": {"@id": SITE_URL + "/#website"}, "about": {"@id": SITE_URL + "/#mary"}, "inLanguage": "en-US"},
            {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/"}, {"@type": "ListItem", "position": 2, "name": title.split(" |")[0], "item": canonical}]},
        ],
    }
    return f"""<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{escape(title)}</title>
  <meta name="description" content="{escape(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="author" content="Mary McNutt">
  <meta name="theme-color" content="#052e28">
  <link rel="canonical" href="{canonical}">
  <link rel="icon" type="image/svg+xml" href="/assets/images/mary-mcnutt-dragonfly-logo.svg">
  <meta property="og:type" content="{og_type}">
  <meta property="og:site_name" content="Mary McNutt">
  <meta property="og:title" content="{escape(title)}">
  <meta property="og:description" content="{escape(description)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{SITE_URL}/assets/images/{image}">
  <meta property="og:image:alt" content="Mary McNutt coaching editorial">
  <meta property="og:locale" content="en_US">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{escape(title)}">
  <meta name="twitter:description" content="{escape(description)}">
  <meta name="twitter:image" content="{SITE_URL}/assets/images/{image}">
  <link rel="preload" href="/assets/fonts/roboto-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/styles.css">
  <script src="/assets/site.js" defer></script>
  <script type="application/ld+json">{json.dumps(payload, ensure_ascii=False)}</script>
</head>"""


def header(current):
    links = [("Home", "/", "home"), ("About", "/about/", "about"), ("Coaching", "/coaching/", "coaching"), ("Pricing", "/pricing/", "pricing"), ("Blog", "/blog/", "blog"), ("Contact", "/contact/", "contact")]
    nav = "".join(f'<a href="{href}"{(" aria-current=\"page\"" if key == current else "")}>{label}</a>' for label, href, key in links)
    return f"""{icon_defs()}
  <header class="site-header interior-header">
    <div class="topbar"><div class="wrap topbar-inner"><div><a href="tel:{PHONE_HREF}"><svg class="icon"><use href="#i-phone"/></svg>{PHONE}</a><a href="mailto:{EMAIL}"><svg class="icon"><use href="#i-mail"/></svg>{EMAIL}</a></div><div><a href="/pricing/"><svg class="icon"><use href="#i-calendar"/></svg>Coaching options</a><a href="/contact/">Let's connect</a></div></div></div>
    <div class="navigation"><div class="wrap nav-inner">
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-controls="main-nav" aria-expanded="false"><span></span><span></span><span></span></button>
      <a class="brand" href="/" aria-label="Mary McNutt home"><img class="brand-logo" src="/assets/images/mary-mcnutt-dragonfly-logo.svg" width="64" height="64" alt="Mary McNutt dragonfly logo"><span>Mary <strong>McNutt</strong></span></a>
      <nav id="main-nav" aria-label="Main navigation">{nav}</nav>
      <a class="nav-contact" href="tel:{PHONE_HREF}" aria-label="Call Mary"><svg class="icon"><use href="#i-phone"/></svg></a>
    </div></div>
  </header>"""


def footer():
    return f"""<footer class="footer"><div class="wrap"><div class="footer-top"><a class="brand" href="/"><img class="brand-logo" src="/assets/images/mary-mcnutt-dragonfly-logo.svg" width="64" height="64" alt="Mary McNutt dragonfly logo"><span>Mary <strong>McNutt</strong></span></a><a class="footer-social" href="https://www.facebook.com/goldilockswisdom" target="_blank" rel="noopener">Follow Goldilocks' Wisdom <span aria-hidden="true">f</span></a></div><div class="footer-grid"><div><h2>Contact Mary</h2><a href="tel:{PHONE_HREF}">{PHONE}</a><a href="tel:+16127203470">(612) 720-3470</a><a href="mailto:{EMAIL}">{EMAIL}</a><p>Monday-Friday<br>10AM-4PM</p></div><div><h2>Explore</h2><a href="/about/">About Mary</a><a href="/coaching/">Coaching</a><a href="/services/">All services</a><a href="/pricing/">Pricing &amp; options</a><a href="/contact/">Contact</a></div><div><h2>Services &amp; support</h2><a href="/services/personal-development-business-growth/">Personal &amp; business growth</a><a href="/services/family-coaching/">Family coaching</a><a href="/services/relapse-prevention/">Relapse prevention</a><a href="/center-for-excellence/">Center for Excellence</a></div><div><h2>Resources</h2><a href="/blog/">Mary's journal</a><a href="/resources/">Recovery resources</a><a href="/resources/the-12-steps/">The 12 Steps</a><a href="/resources/serenity-prayer/">Serenity Prayer</a><a href="/blog/understanding-addiction/">Understanding addiction</a></div></div></div><div class="footer-bottom"><div class="wrap"><span>© 2026 Mary McNutt. All rights reserved.</span><div><a href="/privacy-policy/">Privacy policy</a><a href="/disclaimer/">Disclaimer</a><a href="#main">Back to top</a></div></div></div></footer>"""


def contract(first_viewport, form):
    return f"""<!--
  THESIS: Mary’s new interior pages extend one calm green coaching editorial, never a disconnected template.
  OWN-WORLD: Forest and living green fields, white space, square panels, personal photography, light Roboto headings and readable Nunito Sans copy.
  STORY: Understand the subject, encounter useful evidence, then move naturally toward a confidential conversation with Mary.
  FIRST VIEWPORT: {first_viewport}
  FORM: {form}; seed supplied-reference-extension-20260915.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
  -->"""


def hero(kind, title, intro, image, alt, current):
    return f"""{header(current)}
  <main id="main">
    <section class="interior-hero {kind}-hero" aria-labelledby="page-title"><img src="/assets/images/{image}" width="1672" height="940" alt="{escape(alt)}" fetchpriority="high"><div class="wrap interior-hero-copy"><p class="breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span> {escape(title)}</p><h1 id="page-title">{escape(title)}</h1><p>{escape(intro)}</p></div></section>"""


def write(path, content):
    target = DIST / path / "index.html" if path else DIST / "index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")


def card(post, featured=False):
    cls = " blog-card-featured" if featured else ""
    return f"""<article class="blog-card{cls}"><a class="blog-card-image" href="/blog/{post['slug']}/"><img src="/assets/images/{post['image']}" width="900" height="600" loading="lazy" alt="{escape(post['alt'])}"></a><div class="blog-card-copy"><p class="article-topic">{escape(post['category'])}</p><h2><a href="/blog/{post['slug']}/">{escape(post['title'])}</a></h2><p>{escape(post['description'])}</p><div class="blog-card-meta"><span>By Mary McNutt</span><a class="button primary small" href="/blog/{post['slug']}/">Continue reading <svg class="icon"><use href="#i-arrow"/></svg></a></div></div></article>"""


def build_blog():
    title = "Mary McNutt's Blog | Personal Growth & Recovery Insights"
    desc = "Read practical reflections from Mary McNutt on personal transformation, addiction recovery, family support, purpose, and meaningful change."
    schema = {"@context": "https://schema.org", "@graph": [{"@type": "Blog", "@id": SITE_URL + "/blog/#blog", "url": SITE_URL + "/blog/", "name": "Mary McNutt's Blog", "description": desc, "author": {"@id": SITE_URL + "/#mary"}, "blogPost": [{"@type": "BlogPosting", "headline": p["title"], "url": f"{SITE_URL}/blog/{p['slug']}/"} for p in POSTS]}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/"}, {"@type": "ListItem", "position": 2, "name": "Blog", "item": SITE_URL + "/blog/"}]}]}
    cards = card(POSTS[0], True) + "".join(card(p) for p in POSTS[1:])
    page = head(title, desc, "/blog/", "personal-growth.webp", schema=schema) + """<body class="interior-page blog-page">""" + contract("A panoramic green landscape introduces Mary’s journal before a large lead story and a measured archive column.", "Reference-faithful Read surface using the supplied blog archive compositions") + """<a class="skip-link" href="#main">Skip to content</a>""" + hero("blog", "Blog", "Thoughtful guidance on personal growth, recovery, relationships, purpose, and the work of lasting change.", "personal-growth.webp", "A sunlit green landscape opening Mary's coaching journal", "blog") + f"""
      <section class="blog-intro wrap" aria-labelledby="journal-title"><div><h2 id="journal-title"><strong>From Mary’s journal</strong><br>ideas for the life in front of you</h2><p>Mary’s published writing brings together personal reflection, addiction education, family support, and practical encouragement. These articles have been edited for clarity while preserving their original meaning.</p></div><a class="button outline" href="/contact/">Ask Mary a question</a></section>
      <div class="blog-shell wrap"><section class="blog-feed" aria-label="Articles">{cards}</section><aside class="blog-sidebar" aria-label="Blog topics"><div class="sidebar-block"><h2>Explore topics</h2><a href="/blog/beautiful-transformation/">Personal growth</a><a href="/blog/understanding-addiction/">Addiction education</a><a href="/blog/what-is-an-intervention/">Recovery &amp; family</a><a href="/blog/aloha-from-mumbai/">Mary’s story</a></div><div class="sidebar-portrait"><img src="/assets/images/mary-mcnutt-original-brand-portrait.webp" width="900" height="1000" loading="lazy" alt="Mary McNutt smiling"><p><strong>Mary McNutt, M.A.</strong><br>Transformational life and business coach with deep experience in recovery and personal development.</p><a href="/about/">Meet Mary</a></div></aside></div>
      <section class="journal-cta"><div class="wrap"><h2>Ready for a more personal <strong>conversation?</strong></h2><p>Talk with Mary about the change, recovery, or professional direction you are considering.</p><a class="button white" href="/contact/">Request a free consultation</a></div></section>
    </main>{footer()}</body></html>"""
    write("blog", page)


def build_contact():
    title = "Contact Mary McNutt | Free Coaching Consultation"
    desc = "Contact Mary McNutt, M.A. for a free, confidential conversation about life coaching, business development, recovery aftercare, or family support."
    schema = {"@context": "https://schema.org", "@graph": [{"@type": "ContactPage", "@id": SITE_URL + "/contact/#webpage", "url": SITE_URL + "/contact/", "name": title, "description": desc, "about": {"@id": SITE_URL + "/#mary"}}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/"}, {"@type": "ListItem", "position": 2, "name": "Contact", "item": SITE_URL + "/contact/"}]}]}
    page = head(title, desc, "/contact/", "mary-mcnutt-consultation-1920.webp", schema=schema) + """<body class="interior-page contact-page">""" + contract("A photographic coaching conversation fills the hero; a direct promise sits low and left, leading immediately into verified contact routes below.", "Reference-faithful Persuade surface using the supplied contact compositions") + """<a class="skip-link" href="#main">Skip to content</a>""" + hero("contact", "Whenever you need support", "Mary is here to listen, ask the useful question, and help you identify a clear next step.", "mary-mcnutt-consultation-1920.webp", "Mary McNutt in a supportive one-to-one coaching conversation", "contact") + f"""
      <section class="contact-main wrap" aria-labelledby="contact-title"><div class="contact-form-copy"><h2 id="contact-title">Get in <strong>touch</strong></h2><p>Begin with a free, confidential conversation about life coaching, business or personal development, recovery aftercare, family support, grief, or a speaking opportunity.</p><form class="inquiry-form" action="mailto:{EMAIL}" method="post" enctype="text/plain"><div class="form-row"><div><label for="contact-name">Name <span>(required)</span></label><input id="contact-name" name="Name" type="text" autocomplete="name" required></div><div><label for="contact-email">Email <span>(required)</span></label><input id="contact-email" name="Email" type="email" autocomplete="email" required></div></div><label for="contact-phone">Phone <span>(optional)</span></label><input id="contact-phone" name="Phone" type="tel" autocomplete="tel"><label for="contact-focus">What can Mary help you with?</label><select id="contact-focus" name="Coaching interest"><option value="">Select an area</option><option>Life coaching</option><option>Business or personal development</option><option>Recovery aftercare</option><option>Family, grief or emotional support</option><option>Speaking or another inquiry</option></select><label for="contact-message">Message <span>(required)</span></label><textarea id="contact-message" name="Message" rows="7" required></textarea><p class="form-note">Submitting opens your email application so you can review the message before sending. No information is stored by this website.</p><button class="button primary" type="submit">Prepare email <svg class="icon"><use href="#i-arrow"/></svg></button></form></div><aside class="contact-details" aria-label="Direct contact details"><div><svg aria-hidden="true"><use href="#i-phone"/></svg><h3>Call Mary</h3><a href="tel:{PHONE_HREF}">{PHONE}</a><a href="tel:+16127203470">(612) 720-3470</a></div><div><svg aria-hidden="true"><use href="#i-mail"/></svg><h3>Email</h3><a href="mailto:{EMAIL}">{EMAIL}</a></div><div><svg aria-hidden="true"><use href="#i-calendar"/></svg><h3>Working hours</h3><p>Monday-Friday<br>10AM-4PM</p></div><div><svg aria-hidden="true"><use href="#i-location"/></svg><h3>Service area</h3><p>Mary has a published connection to Maui. Confirm current location, session format, and availability directly.</p></div></aside></section>
      <section class="contact-map-panel" aria-labelledby="location-title"><div class="wrap"><div><h2 id="location-title"><strong>Start where you are.</strong><br>Build what comes next.</h2><p>Mary’s coaching is personal by design. The first conversation is simply a chance to understand your situation and decide whether working together feels right.</p><div class="button-row"><a class="button primary" href="tel:{PHONE_HREF}">Call Mary</a><a class="button outline" href="mailto:{EMAIL}?subject=Free%20confidential%20consultation">Email for a consultation</a></div></div><figure><img src="/assets/images/maui-map.png" width="900" height="650" loading="lazy" alt="Map of the Maui region"><figcaption>Regional reference only; no public office street address has been verified. Map © OpenStreetMap contributors.</figcaption></figure></div></section>
      <section class="contact-closing"><img src="/assets/images/mary-mcnutt-studio-portrait.webp" width="1672" height="940" loading="lazy" alt="Mary McNutt in a bright coaching studio"><div class="wrap"><h2>Get started now<br><strong>with life coaching</strong></h2><p>Bring the question you are carrying. Mary will help you make the next step clearer.</p><a class="button primary" href="mailto:{EMAIL}?subject=Free%20coaching%20consultation">Request a consultation</a></div></section>
    </main>{footer()}</body></html>"""
    write("contact", page)


def build_pricing():
    title = "Coaching Pricing & Options | Mary McNutt"
    desc = "Review Mary McNutt's coaching options, published hourly rate, payment information, and ways to begin a personalized life, business, or recovery coaching plan."
    offers = [{"@type": "Offer", "name": "Introductory coaching session", "price": "99", "priceCurrency": "USD", "unitText": "hour", "url": SITE_URL + "/pricing/"}] + [{"@type": "Offer", "name": name + " Consultation", "price": str(price), "priceCurrency": "USD", "url": SITE_URL + "/pricing/"} for name, price in [("Starter", 249), ("Professional", 399), ("Expert", 499), ("Premium", 549)]]
    schema = {"@context": "https://schema.org", "@graph": [{"@type": "WebPage", "@id": SITE_URL + "/pricing/#webpage", "url": SITE_URL + "/pricing/", "name": title, "description": desc, "about": {"@id": SITE_URL + "/#mary"}}, {"@type": "Service", "name": "Personalized coaching with Mary McNutt", "provider": {"@id": SITE_URL + "/#mary"}, "offers": offers}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/"}, {"@type": "ListItem", "position": 2, "name": "Pricing", "item": SITE_URL + "/pricing/"}]}]}
    focuses = [("personal-growth.webp", "Life coaching", "Purpose, confidence, life transitions, and a clearer relationship with what matters."), ("business-coaching.webp", "Business development", "Values-led professional growth, decision-making, leadership, and meaningful work."), ("new-beginnings.webp", "Recovery aftercare", "Relapse prevention, stable routines, sober companion support, and whole-life recovery."), ("family-balance.webp", "Family support", "Family patterns, relationships, grief, loss, and emotional healing through change.")]
    focus_html = "".join(f'<article><img src="/assets/images/{img}" width="900" height="600" loading="lazy" alt=""><div><h3>{title}</h3><p>{copy}</p></div></article>' for img, title, copy in focuses)
    options = [("Starter", 249, "A focused starting plan for clarifying priorities and building momentum.", ["Personal coaching guidance", "Goal and direction setting", "A practical path forward"]), ("Professional", 399, "More structured support for clients ready to work consistently toward meaningful change.", ["Ongoing one-to-one guidance", "Accountability between milestones", "Personalized coaching focus"]), ("Expert", 499, "A deeper consultation plan for complex goals, transitions, or sustained personal development.", ["Expanded coaching support", "Deeper strategy and reflection", "Progress-focused guidance"]), ("Premium", 549, "The most comprehensive plan shown in the supplied pricing reference.", ["Highest level of plan support", "Personalized coaching direction", "Designed for sustained momentum"])]
    option_html = "".join(f'<article class="pricing-plan"><div><h3>{name}<br><span>Consultation</span></h3><p>{copy}</p></div><div class="plan-price"><sup>$</sup><strong>{price}</strong></div><ul>{"".join(f"<li>{item}</li>" for item in items)}</ul><a class="button white small" href="/contact/">Choose {name}</a></article>' for name, price, copy, items in options)
    page = head(title, desc, "/pricing/", "mary-mcnutt-coaching-session.webp", schema=schema) + """<body class="interior-page pricing-page">""" + contract("A panoramic hands-and-conversation image introduces the pricing page, followed by the single-session rate and the four supplied fixed-price plans.", "Reference-faithful Persuade surface using the supplied pricing compositions") + """<a class="skip-link" href="#main">Skip to content</a>""" + hero("pricing", "Pricing & coaching options", "Choose a single session or the level of ongoing support that feels right for you.", "mary-mcnutt-coaching-session.webp", "A supportive coaching conversation representing personalized planning", "pricing") + f"""
      <section class="pricing-focus wrap" aria-labelledby="visit-title"><div class="section-heading"><div><h2 id="visit-title">Let’s talk about<br><strong>the support you need</strong></h2><p>Mary’s work can focus on one part of life or the relationship between several of them.</p></div><a class="button outline" href="/coaching/">How coaching works</a></div><div class="pricing-focus-grid">{focus_html}</div></section>
      <section class="pricing-rate" aria-labelledby="rate-title"><div class="wrap"><div><h2 id="rate-title">Try one session<br><strong>before choosing a plan</strong></h2><p>If you are not sure you want to move forward with a package, begin with one introductory hour. Use it to discuss your goals, experience Mary’s approach, and decide what—if anything—comes next.</p></div><div class="rate-display"><span>Introductory coaching session</span><strong><sup>$</sup>99</strong><p>for one hour · no plan required</p><a class="button white" href="/contact/">Book one hour</a></div></div></section>
      <section class="coaching-options wrap" aria-labelledby="options-title"><div class="centered-heading"><h2 id="options-title"><strong>Choose one of</strong><br>the coaching plans</h2><p>These fixed prices follow the supplied pricing reference. Choose the level that best matches the amount of support you want.</p></div><div class="coaching-options-grid">{option_html}</div></section>
      <section class="pricing-facts"><img src="/assets/images/mary-mcnutt-coaching-philosophy-1920.webp" width="1672" height="940" loading="lazy" alt="Mary McNutt discussing a personal coaching plan"><div class="wrap"><h2><strong>Coaching in context</strong><br>what is verified</h2><div class="pricing-fact-grid"><div><strong>25+</strong><span>years of coaching, counseling, and transformation experience</span></div><div><strong>2</strong><span>master’s degrees supporting a psychologically informed approach</span></div><div><strong>1:1</strong><span>personal guidance shaped around the individual</span></div><div><strong>Free</strong><span>initial confidential consultation by phone or email</span></div></div></div></section>
      <section class="payment-info wrap" aria-labelledby="payment-title"><div><h2 id="payment-title">Payment &amp; <strong>practical details</strong></h2><p>Mary’s published information states that she is a self-pay private practitioner and does not accept insurance.</p></div><dl><div><dt>Accepted payment</dt><dd>Cash, PayPal, Apple Cash, Square, Zelle, Visa, and Mastercard.</dd></div><div><dt>Cancellation</dt><dd>A 24-hour cancellation notice is requested. The published policy states that sessions without notice may be charged.</dd></div><div><dt>Choosing a plan</dt><dd>You can begin with one introductory hour for $99 or select a $249, $399, $499, or $549 coaching plan. Contact Mary if you want help deciding.</dd></div></dl></section>
      <section class="pricing-closing"><div class="wrap"><h2>Get started now<br><strong>with a clear conversation</strong></h2><p>Tell Mary what you want to change. Together, you can discuss the right focus, format, and current cost before you commit.</p><a class="button primary" href="/contact/">Request a free consultation</a></div><img src="/assets/images/mary-mcnutt-original-brand-portrait.webp" width="900" height="1000" loading="lazy" alt="Mary McNutt smiling"></section>
    </main>{footer()}</body></html>"""
    write("pricing", page)


def build_article(post):
    path = f"/blog/{post['slug']}/"
    title = f"{post['title']} | Mary McNutt"
    canonical = SITE_URL + path
    schema = {"@context": "https://schema.org", "@graph": [{"@type": "BlogPosting", "@id": canonical + "#article", "url": canonical, "headline": post["title"], "description": post["description"], "author": {"@type": "Person", "@id": SITE_URL + "/#mary", "name": "Mary McNutt"}, "publisher": {"@type": "Organization", "@id": SITE_URL + "/#organization", "name": "Mary McNutt"}, "mainEntityOfPage": {"@id": canonical + "#webpage"}, "image": SITE_URL + "/assets/images/" + post["image"], "articleSection": post["category"], "inLanguage": "en-US"}, {"@type": "WebPage", "@id": canonical + "#webpage", "url": canonical, "name": post["title"], "isPartOf": {"@id": SITE_URL + "/#website"}, "breadcrumb": {"@id": canonical + "#breadcrumb"}}, {"@type": "BreadcrumbList", "@id": canonical + "#breadcrumb", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/"}, {"@type": "ListItem", "position": 2, "name": "Blog", "item": SITE_URL + "/blog/"}, {"@type": "ListItem", "position": 3, "name": post["title"], "item": canonical}]}]}
    other = [p for p in POSTS if p["slug"] != post["slug"]]
    related = "".join(f'<article><a href="/blog/{p["slug"]}/"><img src="/assets/images/{p["image"]}" width="900" height="600" loading="lazy" alt="{escape(p["alt"])}"><span>{escape(p["title"])}</span></a></article>' for p in other[:3])
    recent = "".join(f'<a href="/blog/{p["slug"]}/"><img src="/assets/images/{p["image"]}" width="120" height="80" loading="lazy" alt=""><span>{escape(p["title"])}</span></a>' for p in other[:4])
    page = head(title, post["description"], path, post["image"], "article", schema) + """<body class="interior-page article-page">""" + contract("A full-width photographic story header carries the topic, title, and Mary’s authorship; the body opens in a generous editorial column with a practical sidebar.", "Reusable Read template derived from the supplied article compositions") + """<a class="skip-link" href="#main">Skip to content</a>""" + header("blog") + f"""
      <main id="main"><article class="article-layout"><header class="article-hero"><img src="/assets/images/{post['image']}" width="1672" height="940" alt="{escape(post['alt'])}" fetchpriority="high"><div class="wrap"><p class="article-topic">{escape(post['category'])}</p><h1>{escape(post['title'])}</h1><p class="article-byline">By <a href="/about/">Mary McNutt, M.A.</a> <span aria-hidden="true">•</span> Originally published on MaryMcNutt.com</p></div></header><div class="article-shell wrap"><div class="article-content">{post['body']}<div class="article-source"><strong>Editorial note</strong><p>This article is based on Mary McNutt’s archived published writing and has been structured for readability without changing its core meaning.</p></div><section class="article-cta"><h2>Would a conversation help?</h2><p>Mary offers a free, confidential consultation for people considering coaching, recovery aftercare, or family support.</p><a class="button white" href="/contact/">Talk with Mary</a></section><section class="author-card"><img src="/assets/images/mary-mcnutt-original-portrait.webp" width="900" height="1000" loading="lazy" alt="Mary McNutt, M.A."><div><h2>Mary McNutt, M.A.</h2><p>Mary is a transformational life and business development coach with more than 25 years of experience and deep expertise in addiction recovery aftercare.</p><a href="/about/">Learn more about Mary</a></div></section><section class="related-posts" aria-labelledby="related-title"><h2 id="related-title">Related articles</h2><div>{related}</div></section></div><aside class="article-sidebar" aria-label="More from Mary's blog"><div class="sidebar-block"><h2>Recent articles</h2>{recent}</div><div class="sidebar-help"><h2>Looking for support?</h2><p>Explore Mary’s coaching process or start a private conversation.</p><a href="/coaching/">Explore coaching</a><a href="/contact/">Contact Mary</a></div></aside></div></article></main>{footer()}</body></html>"""
    write(f"blog/{post['slug']}", page)


if __name__ == "__main__":
    build_blog()
    build_contact()
    build_pricing()
    for post in POSTS:
        build_article(post)
    print(f"Built 3 new main pages and {len(POSTS)} reusable article pages.")
