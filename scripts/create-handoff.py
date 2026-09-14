"""Package the static homepage and archived source material for handoff."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
target = root / 'Mary-McNutt-homepage-and-research.zip'
with ZipFile(target, 'w', ZIP_DEFLATED) as bundle:
    for folder in ('dist', 'research', 'scripts', '.impeccable'):
        for path in sorted((root / folder).rglob('*')):
            if not path.is_file() or any(part in ('qa', 'raw', '__pycache__') for part in path.relative_to(root).parts):
                continue
            bundle.write(path, path.relative_to(root).as_posix())
    for name in ('README.md', 'PRODUCT.md', 'DESIGN.md', 'DESIGN.md.json'):
        path = root / name
        if path.is_file():
            bundle.write(path, name)
with ZipFile(target) as bundle:
    assert bundle.testzip() is None
    assert 'dist/index.html' in bundle.namelist()
    print(f'{target.name}: {len(bundle.namelist())} files, {target.stat().st_size:,} bytes')
