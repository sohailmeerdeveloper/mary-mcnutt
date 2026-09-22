// Local-only CMS integration fixture. Never deploy this server or its test session.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.resolve('dist');
const state = { cms_content: [], cms_blocks: [], cms_media: [], cms_posts: [], cms_admins: [{ user_id: 'test-user' }] };
const fresh = { access_token: 'test-token', refresh_token: 'test-refresh', user: { id: 'test-user', email: 'cms-test@example.test' }, expires_at: 4102444800 };
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:4174');
  const json = (body, status = 200) => { res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); };
  let body = ''; for await (const chunk of req) body += chunk;
  if (url.pathname === '/__richtext-tests__/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end(fs.readFileSync(new URL('./test-richtext.html', import.meta.url)));
  }
  if (url.pathname.startsWith('/auth/')) return json(fresh);
  if (url.pathname.startsWith('/rest/v1/')) {
    const table = url.pathname.split('/').at(-1);
    if (!state[table]) return json({ code: 'PGRST205', message: 'Unknown table' }, 404);
    const matches = row => [...url.searchParams].every(([key, value]) => !value.startsWith('eq.') || String(row[key]) === value.slice(3));
    if (req.method !== 'GET' && req.headers.authorization !== 'Bearer test-token') return json({ message: 'JWT expired' }, 401);
    if (req.method === 'POST') {
      const data = JSON.parse(body);
      if (data.page_path?.includes('//')) return json({ code: '23503', message: 'insert or update violates foreign key constraint cms_content_page_path_fkey' }, 409);
      if (table === 'cms_blocks' && data.position > 2147483647) return json({ code: '22003', message: 'integer out of range' }, 400);
      if (table === 'cms_posts' && state[table].some(row => row.slug === data.slug)) return json({ code: '23505', message: 'duplicate slug' }, 409);
      const existing = table === 'cms_content' && state[table].find(row => row.page_path === data.page_path && row.element_key === data.element_key);
      if (existing) Object.assign(existing, data);
      else state[table].push({ id: crypto.randomUUID(), ...data });
      return json([existing || state[table].at(-1)]);
    }
    const rows = state[table].filter(matches);
    if (req.method === 'PATCH') rows.forEach(row => Object.assign(row, JSON.parse(body)));
    if (req.method === 'DELETE') state[table] = state[table].filter(row => !matches(row));
    return json(table === 'cms_posts' && !req.headers.authorization ? rows.filter(row => row.status === 'published') : rows);
  }
  const target = path.resolve(root, '.' + url.pathname + (url.pathname.endsWith('/') ? 'index.html' : ''));
  if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) return json({}, 404);
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml' };
  let data = fs.readFileSync(target);
  if (target.endsWith('cms-config.js')) data = Buffer.from(`window.MARY_CMS={url:location.origin,key:'test-key'};if(!localStorage.getItem('mary_cms_session'))localStorage.setItem('mary_cms_session',${JSON.stringify(JSON.stringify({ ...fresh, expires_at: 1 }))});`);
  res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(data);
}).listen(4174, '127.0.0.1', () => console.log('CMS integration fixture: http://127.0.0.1:4174'));
