from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
from PIL import Image
import json,re,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1];dist=root/'dist'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.elements=[];self.json_scripts=[];self.current_json=None
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);self.elements.append((tag,a))
  if tag=='script' and a.get('type')=='application/ld+json':self.current_json=''
 def handle_data(self,data):
  if self.current_json is not None:self.current_json+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.current_json is not None:self.json_scripts.append(self.current_json);self.current_json=None
html=(dist/'index.html').read_text(encoding='utf-8');p=Page();p.feed(html)
issues=[];refs=set();ids={a['id'] for t,a in p.elements if 'id'in a}
for tag,a in p.elements:
 if tag=='img':
  for required in ['alt','width','height']:
   if not a.get(required):issues.append(f'Image missing {required}: {a}')
 if tag=='a':
  href=a.get('href','')
  if href in ['', '#']:issues.append('Empty link destination')
  if href.startswith('#') and href[1:] not in ids:issues.append('Missing anchor: '+href)
 for k in ['src','href']:
  url=a.get(k,'')
  if not url or url.startswith(('http:','https:','data:','mailto:','tel:','#')) or url=='./':continue
  refs.add(url.split('?')[0])
 if 'srcset'in a:
  refs.update(x.strip().split()[0] for x in a['srcset'].split(','))
for ref in refs:
 if not (dist/ref.lstrip('/')).is_file():issues.append('Missing local asset: '+ref)
for f in (dist/'assets/images').iterdir():
 try:Image.open(f).verify()
 except Exception as e:issues.append(f'Invalid image {f.name}: {e}')
for f in (dist/'assets/fonts').glob('*.woff2'):
 if f.read_bytes()[:4]!=b'wOF2':issues.append('Wrong font format: '+f.name)
if sum(t=='h1' for t,a in p.elements)!=1:issues.append('Homepage must contain one H1')
for s in p.json_scripts:json.loads(s)
canonical=[a.get('href') for t,a in p.elements if t=='link' and a.get('rel')=='canonical']
if canonical!=['https://marymcnutt.com/']:issues.append('Wrong canonical')
robots=[a.get('content','') for t,a in p.elements if t=='meta' and a.get('name')=='robots']
if not robots or 'noindex'in robots[0]:issues.append('Homepage not indexable')
site=ET.parse(dist/'sitemap.xml');urls=[x.text for x in site.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
if urls!=['https://marymcnutt.com/']:issues.append('Sitemap contains deferred routes')
css=(dist/'assets/styles.css').read_text(encoding='utf-8')
for ref in re.findall(r'url\([\'"]?([^\)\'\"]+)',css):
 if not ref.startswith(('data:','http')) and not (dist/'assets'/ref).is_file():issues.append('Missing CSS asset: '+ref)
report={'checks':'Local references, anchors, image decoding, image alt/dimensions, fonts, one H1, structured data JSON, canonical, robots and sitemap','issues':issues,'local_references':len(refs),'images':sum(t=='img' for t,a in p.elements),'schema_nodes':sum(len(json.loads(s).get('@graph',[])) for s in p.json_scripts),'public_bytes':sum(f.stat().st_size for f in dist.rglob('*') if f.is_file())}
(root/'research/validation.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
raise SystemExit(bool(issues))
