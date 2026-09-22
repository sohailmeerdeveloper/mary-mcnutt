(() => {
  'use strict';
  const config = window.MARY_CMS;
  const sessionKey = 'mary_cms_session';
  let refreshing;

  function readSession() {
    try { return JSON.parse(localStorage.getItem(sessionKey) || 'null'); }
    catch { return null; }
  }
  function saveSession(session) {
    if (session) {
      if (!session.expires_at && session.expires_in) session.expires_at = Math.floor(Date.now() / 1000) + session.expires_in;
      localStorage.setItem(sessionKey, JSON.stringify(session));
    } else localStorage.removeItem(sessionKey);
    return session;
  }
  async function decode(response) {
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }
    if (!response.ok) {
      const error = new Error(data?.message || data?.msg || data?.error_description || `Request failed (${response.status}).`);
      error.status = response.status;
      error.code = data?.code || data?.error_code || '';
      throw error;
    }
    return data;
  }
  async function authRequest(path, body, token) {
    return decode(await fetch(`${config.url}/auth/v1/${path}`, {
      method: 'POST', headers: { apikey: config.key, 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body)
    }));
  }
  function expiredSession() { return Object.assign(new Error('Your login expired. Sign in again in another tab, then retry here. Your unsaved changes are still on this page.'), { code: 'SESSION_EXPIRED' }); }
  async function getSession(rejectedToken) {
    const initial = readSession();
    if (!initial?.access_token) throw expiredSession();
    if ((!rejectedToken || initial.access_token !== rejectedToken) && initial.expires_at * 1000 > Date.now() + 60000) return initial;
    if (!refreshing) {
      const refresh = async () => {
        const current = readSession();
        if (!current?.access_token) throw expiredSession();
        if ((!rejectedToken || current.access_token !== rejectedToken) && current.expires_at * 1000 > Date.now() + 60000) return current;
        if (!current.refresh_token) throw expiredSession();
        try {
          const next = await authRequest('token?grant_type=refresh_token', { refresh_token: current.refresh_token });
          if (readSession()?.refresh_token !== current.refresh_token) throw expiredSession();
          return saveSession(next);
        } catch (error) {
          if ([400, 401, 403].includes(error.status)) {
            if (readSession()?.refresh_token === current.refresh_token) saveSession(null);
            throw expiredSession();
          }
          throw error;
        }
      };
      refreshing = (navigator.locks ? navigator.locks.request('mary-cms-session', refresh) : refresh()).finally(() => { refreshing = null; });
    }
    return refreshing;
  }
  async function request(table, query = '', options = {}) {
    const { authenticated = false, ...init } = options;
    const send = session => fetch(`${config.url}/rest/v1/${table}${query}`, {
      ...init, cache: 'no-store', headers: { apikey: config.key, 'Content-Type': 'application/json', ...(init.headers || {}), ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}) }
    });
    const session = authenticated ? await getSession() : null;
    let response = await send(session);
    if (authenticated && response.status === 401) response = await send(await getSession(session.access_token));
    return decode(response);
  }
  function friendlyError(error) {
    if (error.code === 'SESSION_EXPIRED') return error.message;
    if (/Invalid login credentials/i.test(error.message)) return 'The email or password is not correct.';
    if (error.code === '42501' || error.status === 403) return 'Your account does not have permission to save this change. Ask the site administrator to check CMS access.';
    if (error.code === '23503') return 'This page is missing from the CMS page list. The database page setup needs to be repaired.';
    if (error.code === '23505') return 'An article with this address already exists. Choose a different title for the new article.';
    if (/schema cache|relation .* does not exist/i.test(error.message)) return 'The website code and database setup do not match. Please check the CMS migration.';
    if (error instanceof TypeError) return 'The database could not be reached. Check your connection and try again. Your changes have not been discarded.';
    return `${error.message}${error.code ? ` (${error.code})` : ''}`;
  }
  async function compressImage(file) {
    if (!file?.type?.startsWith('image/')) throw new Error('Please choose an image file.');
    if (file.size > 20 * 1024 * 1024) throw new Error('Please choose a picture smaller than 20 MB.');
    const source = await new Promise((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error('This picture could not be read.')); reader.readAsDataURL(file);
    });
    const image = await new Promise((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error('This picture format could not be opened. Try a JPEG, PNG, or WebP image.')); image.src = source;
    });
    const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.round(image.naturalWidth * scale), height = Math.round(image.naturalHeight * scale);
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    return { dataUrl: canvas.toDataURL('image/webp', .82), width, height };
  }
  window.MaryCmsClient = Object.freeze({ readSession, saveSession, getSession, authRequest, request, friendlyError, compressImage });
})();
