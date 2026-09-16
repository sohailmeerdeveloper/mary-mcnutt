from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote
from PIL import Image
import json
import re
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
page_files = sorted(dist.glob('**/index.html'))
expected_canonicals = {}
for page_file in page_files:
    route = page_file.parent.relative_to(dist).as_posix()
    expected_canonicals[page_file] = 'https://marymcnutt.com/' if route == '.' else f'https://marymcnutt.com/{route}/'


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.elements = []
        self.json_scripts = []
        self.current_json = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        self.elements.append((tag, attributes))
        if tag == 'script' and attributes.get('type') == 'application/ld+json':
            self.current_json = ''

    def handle_data(self, data):
        if self.current_json is not None:
            self.current_json += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.current_json is not None:
            self.json_scripts.append(self.current_json)
            self.current_json = None


def resolve_local(page_file, value):
    clean = unquote(value.split('#', 1)[0].split('?', 1)[0])
    if not clean:
        return page_file
    target = dist / clean.lstrip('/') if clean.startswith('/') else page_file.parent / clean
    target = target.resolve()
    if target.is_dir() or clean.endswith('/'):
        target = target / 'index.html'
    return target


issues = []
local_refs = set()
image_count = 0
schema_nodes = 0

for page_file in page_files:
    html = page_file.read_text(encoding='utf-8')
    page = Page()
    page.feed(html)
    ids = {attrs['id'] for _, attrs in page.elements if 'id' in attrs}
    page_name = page_file.relative_to(dist).as_posix()

    if sum(tag == 'h1' for tag, _ in page.elements) != 1:
        issues.append(f'{page_name}: expected exactly one H1')

    canonical = [attrs.get('href') for tag, attrs in page.elements if tag == 'link' and attrs.get('rel') == 'canonical']
    if canonical != [expected_canonicals[page_file]]:
        issues.append(f'{page_name}: wrong canonical {canonical}')

    robots = [attrs.get('content', '') for tag, attrs in page.elements if tag == 'meta' and attrs.get('name') == 'robots']
    if not robots or 'noindex' in robots[0]:
        issues.append(f'{page_name}: page is not indexable')

    for script in page.json_scripts:
        data = json.loads(script)
        schema_nodes += len(data.get('@graph', []))

    for tag, attrs in page.elements:
        if tag == 'img':
            image_count += 1
            if 'alt' not in attrs:
                issues.append(f'{page_name}: image missing alt: {attrs.get("src")}')
            for required in ('width', 'height'):
                if not attrs.get(required):
                    issues.append(f'{page_name}: image missing {required}: {attrs.get("src")}')

        if tag == 'a':
            href = attrs.get('href', '')
            if href in ('', '#'):
                issues.append(f'{page_name}: empty link destination')
            if href.startswith('#') and href[1:] not in ids:
                issues.append(f'{page_name}: missing anchor {href}')

        for attribute in ('src', 'href'):
            value = attrs.get(attribute, '')
            if not value or value.startswith(('http:', 'https:', 'data:', 'mailto:', 'tel:', '#')):
                continue
            target = resolve_local(page_file, value)
            local_refs.add(target)
            if not target.is_file():
                issues.append(f'{page_name}: missing local target {value}')

        if 'srcset' in attrs:
            for source in [item.strip().split()[0] for item in attrs['srcset'].split(',')]:
                target = resolve_local(page_file, source)
                local_refs.add(target)
                if not target.is_file():
                    issues.append(f'{page_name}: missing srcset target {source}')

for image_file in (dist / 'assets/images').iterdir():
    try:
        if image_file.suffix == '.svg':
            svg = ET.parse(image_file)
            assert svg.getroot().tag == '{http://www.w3.org/2000/svg}svg'
        else:
            Image.open(image_file).verify()
    except Exception as exc:
        issues.append(f'Invalid image {image_file.name}: {exc}')

for font_file in (dist / 'assets/fonts').glob('*.woff2'):
    if font_file.read_bytes()[:4] != b'wOF2':
        issues.append(f'Wrong font format: {font_file.name}')

site = ET.parse(dist / 'sitemap.xml')
urls = [node.text for node in site.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
expected_urls = list(expected_canonicals.values())
if set(urls) != set(expected_urls):
    issues.append(f'Sitemap URLs differ. Missing: {sorted(set(expected_urls)-set(urls))}; extra: {sorted(set(urls)-set(expected_urls))}')

css = (dist / 'assets/styles.css').read_text(encoding='utf-8')
for ref in re.findall(r'url\([\'\"]?([^\)\'\"]+)', css):
    if not ref.startswith(('data:', 'http')) and not (dist / 'assets' / ref).is_file():
        issues.append(f'Missing CSS asset: {ref}')

report = {
    'checks': 'All indexable pages, local links and anchors, image decoding and dimensions, fonts, one H1 per page, JSON-LD, canonicals, robots, and sitemap',
    'pages': len(page_files),
    'issues': sorted(set(issues)),
    'local_references': len(local_refs),
    'images': image_count,
    'schema_nodes': schema_nodes,
    'public_bytes': sum(file.stat().st_size for file in dist.rglob('*') if file.is_file()),
}
(root / 'research/validation.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
raise SystemExit(bool(issues))
