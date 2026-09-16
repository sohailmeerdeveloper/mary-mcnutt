"""Integrate identity-preserving images; route heroes are unique, cards follow their destination."""
from pathlib import Path
from lxml import html, etree
from PIL import Image
from urllib.parse import urljoin, urlparse
import json, shutil, re

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
OUT = DIST / 'assets/images'
TEMP = Path(r'C:/Users/sohai/AppData/Local/Temp')

def cls(name): return f'contains(concat(" ",normalize-space(@class)," ")," {name} ")'

rows = json.loads((ROOT / 'research/core-image-manifest.json').read_text(encoding='utf-8'))
for name in ['recovery', 'relationship', 'editorial']:
    source = TEMP / f'mary-{name}-images.json'
    shutil.copy2(source, ROOT / f'research/{name}-image-manifest.json')
    data = json.loads(source.read_text(encoding='utf-8'))
    if isinstance(data, dict): data = data.get('images', data.get('assets', data.get('items', data)))
    if isinstance(data, dict): data = [dict(value, key=key) for key, value in data.items()]
    rows.extend(data)

assets = {}
descriptions = {
 'about':'Mary McNutt reflecting at a desk in a bright study',
 'coaching':'Mary McNutt listening during a one-to-one coaching conversation',
 'pricing':'Mary McNutt discussing coaching options at a desk',
 'contact':'Mary McNutt preparing for an online coaching consultation',
 'services':'Mary McNutt preparing a welcoming coaching room',
 'life-reflection':'Mary McNutt journaling on a garden veranda',
 'personal-development-business-growth':'Mary McNutt working on professional goals in a bright office',
 'family-coaching':'Mary McNutt listening to family members in a coaching conversation',
 'family-of-origin-healing':'Mary McNutt exploring family patterns with a client',
 'couples-intensive-coaching':'Mary McNutt supporting a conversation between partners',
 'parenting-support':'Mary McNutt reviewing practical parenting ideas with a parent',
 'conflict-resolution':'Mary McNutt supporting attentive listening at a round table',
 'grief-and-loss':'Mary McNutt listening quietly in a garden sitting area',
 'relationship-grief-trauma':'Mary McNutt supporting reflective journaling',
 'womens-issues':'Mary McNutt facilitating a women’s coaching conversation',
 'center-for-excellence':'Mary McNutt preparing workshop materials in a learning room',
 'interventions':'Mary McNutt facilitating a supportive adult conversation',
 'sober-companion-services':'Mary McNutt walking with an adult on a leafy path',
 'relapse-prevention':'Mary McNutt planning supportive daily routines at a table',
 'process-addictions':'Mary McNutt reflecting on habits with a journal and closed phone',
 'problem-compulsive-gambling':'Mary McNutt reviewing mindful spending habits',
 'compulsive-shopping':'Mary McNutt discussing mindful shopping and spending choices',
 'financial-disorder':'Mary McNutt organizing financial goals with a calculator and binder',
 'eating-disorders':'Mary McNutt listening with care in a quiet sitting room',
 'drug-prevention-classes':'Mary McNutt leading an adult prevention education discussion',
 'trauma-resolution':'Mary McNutt supporting a calm grounding exercise',
 'blog':'Mary McNutt writing reflections at an airy desk',
 'beautiful-transformation':'Mary McNutt tending young plants in a sunny garden',
 'stages-of-addiction':'Mary McNutt discussing stages of change using a sequence of cards',
 'understanding-addiction':'Mary McNutt studying reference books in a library',
 'what-is-an-intervention':'Mary McNutt preparing a room for a supportive family meeting',
 'aloha-from-mumbai':'Illustrative scene of Mary McNutt reflecting on travel in an Indian garden',
 'resources':'Mary McNutt organizing coaching and recovery workbooks',
 'serenity-prayer':'Mary McNutt reflecting quietly in a coastal garden',
 'the-12-steps':'Mary McNutt writing in a recovery journal',
 'the-twelve-traditions':'Mary McNutt arranging a community meeting space',
}
for row in rows:
    key = row.get('key') or row.get('scene_key') or row.get('name')
    source = Path(row.get('path') or row.get('image_path') or row.get('source_path'))
    assert key in descriptions, key
    image = Image.open(source).convert('RGB')
    files = []
    for width in [768, 1536]:
        copy = image.copy()
        copy.thumbnail((width, int(width * image.height/image.width)))
        dest = OUT / f'mary-ai-{key}-{width}.webp'
        xmp = b'<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" Iptc4xmpExt:DigitalSourceType="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"/></rdf:RDF></x:xmpmeta>'
        copy.save(dest, 'WEBP', quality=86, method=6, xmp=xmp)
        files.append('/assets/images/' + dest.name)
    assets[key] = {'key':key, 'small':files[0], 'large':files[1], 'width':image.width, 'height':image.height,
                   'alt':'AI-generated illustration: ' + descriptions[key], 'prompt':row.get('prompt'), 'source':str(source)}
assert len(assets) == 36, len(assets)

route_key = {}
for file in DIST.rglob('index.html'):
    route = '/' + file.parent.relative_to(DIST).as_posix().strip('.')
    route = route.rstrip('/') + '/'
    key = route.strip('/').split('/')[-1]
    if key in assets: route_key[route] = key

legacy = {
 'personal-growth.webp':'beautiful-transformation', 'business-coaching.webp':'personal-development-business-growth',
 'family-balance.webp':'family-coaching', 'new-beginnings.webp':'sober-companion-services',
 'coaching-community.webp':'womens-issues', 'coaching-programs.webp':'center-for-excellence',
 'reflection-and-growth.webp':'life-reflection', 'support-and-connection.webp':'what-is-an-intervention',
 'steps-toward-change.webp':'stages-of-addiction', 'personal-reflection.webp':'relationship-grief-trauma',
 'purpose-and-learning.webp':'resources', 'professional-development.webp':'financial-disorder',
 'confidence-at-work.webp':'conflict-resolution',
 'mary-mcnutt-original-brand-portrait.webp':'about', 'mary-mcnutt-original-portrait.webp':'about',
 'mary-mcnutt-about-portrait.webp':'life-reflection', 'mary-mcnutt-studio-portrait.webp':'about',
 'mary-mcnutt-coaching-session.webp':'coaching',
}
# Each photo within these page narratives serves a different action/context.
page_sequences = {
 '/about/':['about','life-reflection','center-for-excellence','beautiful-transformation','personal-development-business-growth','sober-companion-services','family-coaching'],
 '/coaching/':['coaching','contact','life-reflection','personal-development-business-growth','resources','relapse-prevention','womens-issues'],
 '/pricing/':['pricing','beautiful-transformation','personal-development-business-growth','sober-companion-services','family-coaching','center-for-excellence','about'],
 '/contact/':['contact','about'],
 '/blog/beautiful-transformation/':['beautiful-transformation','life-reflection'],
 '/blog/stages-of-addiction/':['stages-of-addiction','relapse-prevention','process-addictions'],
 '/blog/understanding-addiction/':['understanding-addiction','drug-prevention-classes','sober-companion-services'],
 '/blog/what-is-an-intervention/':['what-is-an-intervention','interventions'],
 '/blog/aloha-from-mumbai/':['aloha-from-mumbai','life-reflection'],
}
audit = []
for file in sorted(DIST.rglob('index.html')):
    route = '/' + file.parent.relative_to(DIST).as_posix().strip('.')
    route = route.rstrip('/') + '/'
    doc = html.fromstring(file.read_text(encoding='utf-8'))
    photos = [img for img in doc.xpath('//main//img') if not img.get('src','').endswith('.svg') and 'maui-map' not in img.get('src','')]
    assignments = []
    for index, img in enumerate(photos):
        old = Path(img.get('src', '')).name
        key = None
        if route == '/' and index == 1: key = 'life-reflection'
        elif route in page_sequences and index < len(page_sequences[route]): key = page_sequences[route][index]
        elif index == 0 and route in route_key: key = route_key[route]
        else:
            links = img.xpath('ancestor::a[@href]')
            if links:
                linked = urlparse(urljoin('https://marymcnutt.com' + route, links[-1].get('href'))).path
                key = route_key.get(linked)
            # Service directory thumbnails are siblings of their destination links.
            if route == '/services/' and index > 0:
                cards = img.xpath('ancestor::article')
                if cards:
                    links = cards[0].xpath('.//a[@href]')
                    if links: key = route_key.get(links[-1].get('href'))
            key = key or legacy.get(old)
        if not key: continue # Existing AI homepage hero/call-to-action and genuine map remain.
        asset = assets[key]
        img.set('src', asset['large'])
        img.set('srcset', f'{asset["small"]} 768w, {asset["large"]} 1536w')
        hero = index == 0 and route != '/'
        img.set('sizes', '100vw' if hero else '(max-width: 800px) 100vw, 50vw')
        img.set('width', str(asset['width']))
        img.set('height', str(asset['height']))
        img.set('alt', asset['alt'])
        if hero:
            img.attrib.pop('loading', None)
            img.set('fetchpriority', 'high')
        else: img.set('loading', 'lazy')
        assignments.append({'key':key,'src':asset['large']})
    # Remove redundant thumbnail repetition on the same page; retain the article links.
    seen = set()
    for img in doc.xpath('//main//img'):
        src = img.get('src')
        if src in seen and img.xpath(f'ancestor::*[{cls("sidebar-portrait")}]'):
            img.getparent().remove(img)
        else: seen.add(src)
    for preload in doc.xpath('//link[@rel="preload"][@as="image"]'):
        if route in route_key: preload.set('href', assets[route_key[route]]['large'])
    if route in route_key:
        asset = assets[route_key[route]]
        for meta in doc.xpath('//meta[@property="og:image"] | //meta[@name="twitter:image"]'):
            meta.set('content', 'https://marymcnutt.com' + asset['large'])
        for meta in doc.xpath('//meta[@property="og:image:alt"]'): meta.set('content', asset['alt'])
        for script in doc.xpath('//script[@type="application/ld+json"]'):
            data = json.loads(script.text)
            def update_images(node):
                if isinstance(node, dict):
                    for key, val in list(node.items()):
                        if key in ('image', 'primaryImageOfPage'):
                            node[key] = {'@type':'ImageObject','url':'https://marymcnutt.com'+asset['large'],'caption':asset['alt']}
                        elif isinstance(val, (dict,list)): update_images(val)
                elif isinstance(node,list):
                    for val in node: update_images(val)
            update_images(data)
            script.text = json.dumps(data, ensure_ascii=False, separators=(',',':'))
    if route == '/blog/aloha-from-mumbai/':
        for caption in doc.xpath('//figcaption'):
            caption.text = 'AI-generated editorial illustration inspired by Mary’s reflections; not a photograph from her original trip.'
    footer = doc.xpath(f'//footer/*[{cls("wrap")}]')
    if footer and not doc.xpath(f'//*[{cls("image-note")}]'):
        note = etree.SubElement(footer[0], 'p', {'class':'image-note'})
        note.text = 'Coaching scenes are AI-generated illustrations of Mary McNutt. Other people shown are fictional.'
    file.write_text('<!doctype html>\n'+html.tostring(doc, encoding='unicode', method='html'), encoding='utf-8')
    audit.append({'route':route,'images':assignments})

(ROOT/'research/ai-image-library.json').write_text(json.dumps(list(assets.values()),indent=2,ensure_ascii=False),encoding='utf-8')
(ROOT/'research/image-route-audit.json').write_text(json.dumps(audit,indent=2),encoding='utf-8')
prompt_text = '# September 16, 2026 image library\n\nBuilt-in ImageGen; 36 original page-specific scenes based on the supplied identity references. Optimized project assets are in dist/assets/images/mary-ai-*.webp.\n\n'
for key, asset in assets.items(): prompt_text += f'## {key}\n\n{asset["prompt"]}\n\nAsset: `{asset["large"]}`\n\n'
(ROOT/'research/image-generation-prompts-2026-09-16.md').write_text(prompt_text,encoding='utf-8')
print(f'Integrated {len(assets)} new scenes across {len(audit)} pages.')
