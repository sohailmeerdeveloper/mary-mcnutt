from pathlib import Path
from PIL import Image
import json, shutil, re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist/assets/images'
OUT.mkdir(parents=True, exist_ok=True)
manifest = json.loads(Path(r'C:/Users/sohai/AppData/Local/Temp/browser-use/assets/6a84cd6c-df65-4d42-8488-ae549120f1c2/manifest.json').read_text())
assets = manifest['assets']
mapping = {
 'life-coach-excerpt-01-1280x854.jpg':'personal-growth',
 'life-coach-excerpt-02-1280x854.jpg':'business-coaching',
 'life-coach-excerpt-03-1280x854.jpg':'family-balance',
 'life-coach-excerpt-04-1280x854.jpg':'new-beginnings',
 'bgn-coaching-principles.jpg':'coaching-community',
 'bgn-courses.jpg':'coaching-programs',
 'img-blog-post-01-640x427.jpg':'reflection-and-growth',
 'img-blog-post-02-640x427.jpg':'support-and-connection',
 'img-blog-post-03-640x427.jpg':'steps-toward-change',
 'img-box-01.jpg':'personal-reflection',
 'img-box-02.jpg':'purpose-and-learning',
 'img-box-03.jpg':'professional-development',
 'img-box-04.jpg':'confidence-at-work',
}
ledger=[]
for a in assets:
 if a['name'] in mapping:
  dest=OUT/(mapping[a['name']]+'.webp')
  im=Image.open(a['path']).convert('RGB'); im.thumbnail((1920,1200) if 'bgn-' in a['name'] else (900,900))
  im.save(dest,'WEBP',quality=86,method=6)
  ledger.append({'file':dest.relative_to(ROOT).as_posix(),'source':a['url'],'type':'Reference demo photography','license':'Demo source; confirm reusable stock license before public launch.'})

gen=Path(r'C:/Users/sohai/.codex/generated_images/01a09f8f-6474-70c3-8439-05177ec22bc0')
for src,name in [('exec-003eee72-8166-41c0-8953-6f975ebb4f9a.png','mary-mcnutt-life-business-coach'),('exec-526f8fbd-d8f7-47f6-971c-8f7111bdde94.png','mary-mcnutt-coaching-philosophy'),('exec-f3443057-9932-4e5e-a87b-2408670de052.png','mary-mcnutt-consultation')]:
 im=Image.open(gen/src).convert('RGB')
 for width in [960,1920]:
  copy=im.copy(); copy.thumbnail((width,width)); dest=OUT/f'{name}-{width}.webp'; copy.save(dest,'WEBP',quality=88,method=6)
  ledger.append({'file':dest.relative_to(ROOT).as_posix(),'source':'Built-in image_gen, supplied identity references','type':'AI-generated portrait of Mary McNutt','digitalSourceType':'trainedAlgorithmicMedia','promptFile':'research/image-generation-prompts.md'})
for src,name in [(r'C:/Users/sohai/Downloads/IMG_1872.jpg','mary-mcnutt-original-portrait'),(r'C:/Users/sohai/Downloads/demo1-slide01-Picsart-AiImageEnhancer.png','mary-mcnutt-original-brand-portrait')]:
 im=Image.open(src).convert('RGB'); im.thumbnail((900,1000)); im.save(OUT/(name+'.webp'),'WEBP',quality=88,method=6)
 ledger.append({'file':'dist/assets/images/'+name+'.webp','source':src,'type':'User-supplied portrait'})
(ROOT/'research/image-ledger.json').write_text(json.dumps(ledger,indent=2))
shutil.copyfile(r'C:/Users/sohai/.codex/visualizations/2026/09/14/01a09f8c-2c6d-74d0-8804-009ef1dfcadc/mary-portrait-prompts.md',ROOT/'research/image-generation-prompts.md')
print(f'Prepared {len(ledger)} local image assets.')
