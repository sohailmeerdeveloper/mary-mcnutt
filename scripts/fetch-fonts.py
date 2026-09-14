from pathlib import Path
import re, urllib.request, json
root=Path(__file__).resolve().parents[1]
url='https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..900&family=Roboto:wght@100..900&display=swap'
def get(url):
 return urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}),timeout=30).read()
css=(root/'research/fonts-modern.css').read_text(encoding='utf-8-sig') if (root/'research/fonts-modern.css').exists() else get(url).decode()
(root/'research/font-source.css').write_text(css)
records=[]
for name,file in [('Roboto','roboto-latin.woff2'),('Nunito Sans','nunito-sans-latin.woff2')]:
 blocks=re.findall(r'/\* latin \*/\s*(@font-face\s*\{.*?\})',css,re.S)
 match=next((b for b in blocks if "font-family: '"+name+"'" in b),None)
 if match is None:
  blocks=re.findall(r'@font-face\s*\{.*?\}',css,re.S)
  match=next(b for b in blocks if "font-family: '"+name+"'" in b)
 src=re.search(r'url\((.*?)\)',match).group(1)
 font=get(src)
 (root/'dist/assets/fonts'/file).write_bytes(font)
 records.append({'family':name,'source':src,'bytes':len(font),'format':font[:4].decode('ascii',errors='replace')})
(root/'research/font-ledger.json').write_text(json.dumps(records,indent=2))
print(json.dumps(records,indent=2))
