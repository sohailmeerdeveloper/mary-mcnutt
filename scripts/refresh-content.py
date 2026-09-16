"""Apply the reviewed September 2026 search and motion content map."""
from pathlib import Path
from lxml import html, etree
import json, re, shutil

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
RESEARCH = ROOT / 'research'
SOURCE = Path(r'C:/Users/sohai/AppData/Local/Temp/Mary-McNutt-SEO-20260916')
shutil.copy2(SOURCE / 'seo-recommendations.json', RESEARCH / 'seo-page-map.json')
shutil.copy2(SOURCE / 'SEO-RESEARCH.md', RESEARCH / 'SEO-RESEARCH-2026-09-16.md')
mapping = {r['route']: r for r in json.loads((SOURCE / 'seo-recommendations.json').read_text(encoding='utf-8'))}

def cls(name):
    return f'contains(concat(" ",normalize-space(@class)," ")," {name} ")'

def text(el, value):
    for child in list(el): el.remove(child)
    el.text = value

def update_schema(node, row):
    if isinstance(node, list):
        for item in node: update_schema(item, row)
    elif isinstance(node, dict):
        types = node.get('@type', [])
        if isinstance(types, str): types = [types]
        if any(t in ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage', 'Article', 'BlogPosting'] for t in types):
            node['name'] = row['title']
            node['description'] = row['description']
            if any(t in ['Article', 'BlogPosting'] for t in types): node['headline'] = row['h1']
        for value in list(node.values()):
            if isinstance(value, (dict, list)): update_schema(value, row)

for file in sorted(DIST.rglob('index.html')):
    route = '/' + file.parent.relative_to(DIST).as_posix().strip('.')
    route = route.rstrip('/') + '/'
    doc = html.fromstring(file.read_text(encoding='utf-8'))
    if not doc.xpath('//link[@href="/assets/refresh.css"]'):
        etree.SubElement(doc.find('head'), 'link', {'rel': 'stylesheet', 'href': '/assets/refresh.css'})
    row = mapping.get(route)
    if row:
        text(doc.find('.//title'), row['title'])
        text(doc.find('.//h1'), row['h1'])
        for meta in doc.xpath('//meta'):
            name = meta.get('property') or meta.get('name')
            if name in ('og:title', 'twitter:title'): meta.set('content', row['title'])
            if name in ('description', 'og:description', 'twitter:description'): meta.set('content', row['description'])
        for schema in doc.xpath('//script[@type="application/ld+json"]'):
            data = json.loads(schema.text)
            update_schema(data, row)
            schema.text = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
        if route.startswith('/services/') and route != '/services/':
            for lead in doc.xpath(f'//*[ {cls("service-hero")} ]/div/p[last()]'):
                text(lead, row['description'])

    # Static final labels remain accessible; only the decorative copy counts up.
    for strong in doc.xpath('//main//strong'):
        value = (strong.text or '').strip()
        if len(strong) or value not in ('25+', '2', '1:1', '4', 'Free'): continue
        if strong.getparent().tag != 'div': continue
        strong.set('class', 'stat-ring')
        strong.set('data-stat', value)
        count = re.fullmatch(r'(\d+)(\+?)', value)
        if count:
            strong.set('data-count', count.group(1))
            strong.set('data-suffix', count.group(2))
        strong.text = None
        fragment = html.fragment_fromstring('<span><svg class="stat-ring-art" viewBox="0 0 120 120" aria-hidden="true"><circle class="stat-ring-track" cx="60" cy="60" r="55"/><circle class="stat-ring-fill" cx="60" cy="60" r="55" pathLength="100"/></svg><span class="stat-number" aria-hidden="true"></span><span class="visually-hidden"></span></span>')
        fragment[1].text = value
        fragment[2].text = value
        for child in list(fragment): strong.append(child)

    # Related reading already includes article photography: keep recent links text-only.
    for img in doc.xpath(f'//*[{cls("article-sidebar")}]//img | //*[{cls("author-card")}]//img'):
        img.getparent().remove(img)
    for card in doc.xpath(f'//*[{cls("author-card")}]'):
        card.set('class', card.get('class') + ' author-card-text')

    # Preserve source meaning while accurately separating coaching from clinical treatment.
    if route == '/services/family-coaching/':
        for el in doc.xpath('//main//p'):
            if el.text:
                el.text = el.text.replace('Family Coaching is a form of therapy', 'Family coaching is a collaborative process').replace('the therapist helps', 'Mary helps')
    if route == '/services/couples-intensive-coaching/':
        ps = doc.xpath(f'//*[{cls("service-reading")}]/article/p')
        replacements = [
            'Couples intensive coaching offers focused time to explore relationship challenges, strengthen communication, and agree on practical next steps. Extended conversations can help partners step away from daily interruptions and give recurring concerns their full attention. Ask Mary about the format and whether it fits your situation.',
            'During couples coaching, partners can explore recurring conflicts, communication patterns, and unmet needs. Mary supports open conversation, careful listening, and practical reflection so both people have space to describe what matters to them. Coaching does not replace couples therapy or other appropriate professional care.',
            'Couples may seek coaching during a life transition, when they feel disconnected, or when they want to invest in their relationship. The work can focus on clearer expectations, everyday communication, and shared goals. A consultation is the place to discuss your needs and the appropriate kind of support.'
        ]
        ps = [p for p in ps if 'eyebrow' not in p.get('class', '')]
        for el, value in zip(ps, replacements): text(el, value)

    # Explicitly explain the real mail-client handoff and provide a copy fallback.
    for form in doc.xpath('//form[starts-with(@action,"mailto:")]'):
        form.set('data-email-form', '')
        if not form.xpath('.//*[@data-email-status]'):
            status = etree.SubElement(form, 'p', {'class': 'form-note', 'data-email-status': '', 'role': 'status', 'aria-live': 'polite'})
            status.text = ''
            fallback = etree.SubElement(form, 'div', {'class': 'email-fallback', 'hidden': 'hidden'})
            label = etree.SubElement(fallback, 'label', {'for': 'email-draft'})
            label.text = 'Your message, ready to copy'
            draft = etree.SubElement(fallback, 'textarea', {'id': 'email-draft', 'rows': '6', 'readonly': 'readonly'})
            button = etree.SubElement(fallback, 'button', {'type': 'button', 'class': 'button primary small', 'data-copy-email': ''})
            button.text = 'Copy message'

    file.write_text('<!doctype html>\n' + html.tostring(doc, encoding='unicode', method='html'), encoding='utf-8')
print(f'Updated {len(mapping)} interior titles; homepage title and H1 preserved.')
