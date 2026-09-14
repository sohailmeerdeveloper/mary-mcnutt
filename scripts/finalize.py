from pathlib import Path
from html.parser import HTMLParser
from html import escape
from PIL import Image
import re, json, struct
root=Path(__file__).resolve().parents[1]
page=root/'dist/index.html'
html=page.read_text(encoding='utf-8-sig')
map_html='<a class="map-image-link" href="https://www.openstreetmap.org/#map=10/20.85/-156.43" target="_blank" rel="noopener" aria-label="Open interactive map of Maui"><img class="map-image" src="assets/images/maui-map.png" width="1200" height="680" loading="lazy" alt="OpenStreetMap showing Maui and the surrounding Hawaiian islands"></a><a class="map-attribution" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap contributors</a>'
html=re.sub(r'<iframe title="Map of Maui.*?</iframe>',map_html,html)
page.write_text(html,encoding='utf-8')
css=root/'dist/assets/styles.css'
style=css.read_text(encoding='utf-8-sig')
if '.map-image-link{' not in style:
 style+='\n.map-image-link{position:absolute;inset:0;display:block}.map-image{width:100%;height:100%;object-fit:cover;filter:grayscale(1);opacity:.75}.map-attribution{position:absolute;bottom:0;right:0;z-index:2;background:#ffffffd9;padding:3px 8px;font-size:11px;line-height:1.5;color:var(--forest)}\n'
css.write_text(style,encoding='utf-8')
class Images(HTMLParser):
 def __init__(self):super().__init__();self.images=[]
 def handle_starttag(self,tag,attrs):
  if tag=='img':self.images.append(dict(attrs))
parser=Images();parser.feed(html)
metadata=[]
for record in parser.images:
 variants=[record['src']]+[part.strip().split()[0] for part in record.get('srcset','').split(',') if part.strip()]
 for src in set(variants):
  f=root/'dist'/src
  if f.suffix!='.webp':continue
  raw=f.read_bytes();width,height=Image.open(f).size
  chunks=[];pos=12
  while pos+8<=len(raw):
   tag=raw[pos:pos+4];size=int.from_bytes(raw[pos+4:pos+8],'little');payload=raw[pos+8:pos+8+size];pos+=8+size+(size%2)
   if tag!=b'XMP ':chunks.append((tag,payload))
  is_ai=record.get('alt','').startswith('AI-created')
  title=f.stem.replace('-1920','').replace('-960','').replace('-',' ').title()
  xmp=('<?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?>'
       '<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">'
       '<rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/">'
       '<dc:title><rdf:Alt><rdf:li xml:lang="x-default">'+escape(title)+'</rdf:li></rdf:Alt></dc:title>'
       '<dc:description><rdf:Alt><rdf:li xml:lang="x-default">'+escape(record.get('alt',''))+'</rdf:li></rdf:Alt></dc:description>'
       +('<Iptc4xmpExt:DigitalSourceType>http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia</Iptc4xmpExt:DigitalSourceType>' if is_ai else '')
       +'</rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>').encode('utf-8')
  if chunks[0][0]==b'VP8X':
   vp=bytearray(chunks[0][1]);vp[0]|=4;chunks[0]=(b'VP8X',bytes(vp))
  else:
   chunks.insert(0,(b'VP8X',bytes([4,0,0,0])+(width-1).to_bytes(3,'little')+(height-1).to_bytes(3,'little')))
  chunks.append((b'XMP ',xmp))
  body=b'WEBP'+b''.join(tag+len(payload).to_bytes(4,'little')+payload+(b'\0' if len(payload)%2 else b'') for tag,payload in chunks)
  f.write_bytes(b'RIFF'+len(body).to_bytes(4,'little')+body)
  Image.open(f).verify()
  metadata.append({'file':src,'width':width,'height':height,'title':title,'description':record.get('alt'),'ai_created':is_ai,'xmp':True})
(root/'research/image-metadata.json').write_text(json.dumps(metadata,indent=2),encoding='utf-8')
print('Updated map and embedded descriptive XMP in',len(metadata),'WebP images without re-encoding pixels.')
