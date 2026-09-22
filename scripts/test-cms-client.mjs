import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const source = await readFile(new URL('../dist/assets/cms-client.js', import.meta.url), 'utf8');
const fresh = { access_token: 'new-token', refresh_token: 'new-refresh', expires_at: 4102444800, user: { id: 'test-user' } };
function fixture(session, fetch) {
  const storage = new Map(session ? [['mary_cms_session', JSON.stringify(session)]] : []);
  const context = { window: { MARY_CMS: { url: 'https://example.test', key: 'public-test-key' } }, navigator: {}, localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) }, fetch, Date, TypeError };
  vm.runInNewContext(source, context);
  return context.window.MaryCmsClient;
}
test('expired session refreshes once for concurrent saves and persists rotated tokens', async () => {
  let refreshes = 0, writes = 0;
  const client = fixture({ ...fresh, access_token: 'old-token', expires_at: 1 }, async (url, options) => {
    if (url.includes('/auth/')) { refreshes++; return Response.json(fresh); }
    writes++;
    assert.equal(options.headers.Authorization, 'Bearer new-token');
    assert.equal(options.cache, 'no-store');
    return Response.json([{ id: 'saved' }]);
  });
  await Promise.all(['cms_content', 'cms_media', 'cms_posts'].map(table => client.request(table, '', { method: 'POST', authenticated: true })));
  assert.equal(refreshes, 1); assert.equal(writes, 3);
  assert.equal(client.readSession().refresh_token, 'new-refresh');
});
test('401 refreshes and retries once; permission errors never retry writes', async () => {
  let writes = 0, refreshes = 0;
  const client = fixture({ ...fresh, access_token: 'rejected-token' }, async (url, options) => {
    if (url.includes('/auth/')) { refreshes++; return Response.json(fresh); }
    writes++;
    if (writes === 1) return Response.json({ message: 'JWT expired', code: 'PGRST301' }, { status: 401 });
    assert.equal(options.headers.Authorization, 'Bearer new-token');
    return Response.json({ message: 'new row violates row-level security policy', code: '42501' }, { status: 403 });
  });
  await assert.rejects(client.request('cms_posts', '', { method: 'POST', authenticated: true }), error => error.code === '42501');
  assert.equal(writes, 2); assert.equal(refreshes, 1);
});
test('invalid refresh stops before any save; transient refresh failure preserves the session', async () => {
  for (const status of [400, 503]) {
    let calls = 0;
    const client = fixture({ ...fresh, expires_at: 1 }, async url => {
      calls++; assert.match(url, /\/auth\//);
      return Response.json({ message: 'refresh failed' }, { status });
    });
    await assert.rejects(client.request('cms_content', '', { authenticated: true }));
    assert.equal(calls, 1);
    assert.equal(Boolean(client.readSession()), status === 503);
  }
});
test('public reads never send the admin token or try to refresh it', async () => {
  const client = fixture({ ...fresh, expires_at: 1 }, async (url, options) => {
    assert.match(url, /\/rest\/v1\/cms_posts/);
    assert.equal(options.headers.Authorization, undefined);
    return Response.json([]);
  });
  assert.equal((await client.request('cms_posts')).length, 0);
});
test('backend codes and useful messages survive the request layer', async () => {
  const client = fixture(fresh, async () => Response.json({ code: '23502', message: 'null value in column "id" violates not-null constraint' }, { status: 400 }));
  try { await client.request('cms_content', '', { authenticated: true }); assert.fail('must reject'); }
  catch (error) { assert.match(client.friendlyError(error), /null value.*23502/); }
});
test('logout includes the access token', async () => {
  const client = fixture(fresh, async (url, options) => {
    assert.match(url, /logout$/); assert.equal(options.headers.Authorization, 'Bearer new-token');
    return new Response(null, { status: 204 });
  });
  await client.authRequest('logout', {}, fresh.access_token);
});
