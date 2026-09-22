import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../dist/', import.meta.url);
const excluded = new Set(['admin/index.html', 'blog/post/index.html', '404.html']);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

const rootPath = fileURLToPath(root);
let changed = 0;
for (const file of await walk(rootPath)) {
  const name = relative(rootPath, file).replaceAll(sep, '/');
  if (excluded.has(name)) continue;
  let html = await readFile(file, 'utf8');
  if (!html.includes('/assets/cms-public.css')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="/assets/cms-public.css">\n</head>');
  }
  if (!html.includes('/assets/cms-config.js')) {
    html = html.replace('</body>', '  <script src="/assets/cms-config.js?v=20260922"></script>\n  <script src="/assets/cms-client.js?v=20260922"></script>\n  <script src="/assets/cms-richtext.js?v=20260922-richtext"></script>\n  <script src="/assets/cms.js?v=20260922-richtext"></script>\n</body>');
  }
  await writeFile(file, html);
  changed += 1;
}
console.log(`CMS runtime linked from ${changed} public pages.`);
