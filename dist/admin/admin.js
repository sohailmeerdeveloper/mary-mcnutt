(() => {
  'use strict';
  const config = window.MARY_CMS;
  const pages = [
    ['/', 'Home', 'Main page'], ['/about/', 'About Mary', 'Main page'], ['/coaching/', 'Coaching', 'Main page'], ['/pricing/', 'Pricing', 'Main page'], ['/contact/', 'Contact', 'Main page'],
    ['/blog/', 'Blog', 'Blog archive'], ['/blog/aloha-from-mumbai/', 'Greetings from Mumbai', 'Article'], ['/blog/beautiful-transformation/', 'Beautiful Transformation', 'Article'], ['/blog/stages-of-addiction/', 'Stages of Addiction', 'Article'], ['/blog/understanding-addiction/', 'Understanding Addiction', 'Article'], ['/blog/what-is-an-intervention/', 'What Is an Intervention?', 'Article'],
    ['/center-for-excellence/', 'Center for Excellence', 'Main page'], ['/services/', 'Services', 'Directory'], ['/services/compulsive-shopping/', 'Compulsive Shopping', 'Service'], ['/services/conflict-resolution/', 'Conflict Resolution', 'Service'], ['/services/couples-intensive-coaching/', 'Couples Intensive Coaching', 'Service'], ['/services/drug-prevention-classes/', 'Drug Prevention Classes', 'Service'], ['/services/eating-disorders/', 'Eating Disorders', 'Service'], ['/services/family-coaching/', 'Family Coaching', 'Service'], ['/services/family-of-origin-healing/', 'Family of Origin Healing', 'Service'], ['/services/financial-disorder/', 'Financial Disorder', 'Service'], ['/services/grief-and-loss/', 'Grief and Loss', 'Service'], ['/services/interventions/', 'Interventions', 'Service'], ['/services/parenting-support/', 'Parenting Support', 'Service'], ['/services/personal-development-business-growth/', 'Personal Development & Business Growth', 'Service'], ['/services/problem-compulsive-gambling/', 'Problem & Compulsive Gambling', 'Service'], ['/services/process-addictions/', 'Process Addictions', 'Service'], ['/services/relapse-prevention/', 'Relapse Prevention', 'Service'], ['/services/relationship-grief-trauma/', 'Relationship, Grief & Trauma', 'Service'], ['/services/sober-companion-services/', 'Sober Companion Services', 'Service'], ['/services/trauma-resolution/', 'Trauma Resolution', 'Service'], ['/services/womens-issues/', "Women's Issues", 'Service'],
    ['/resources/', 'Resources', 'Directory'], ['/resources/serenity-prayer/', 'Serenity Prayer', 'Resource'], ['/resources/the-12-steps/', 'The 12 Steps', 'Resource'], ['/resources/the-twelve-traditions/', 'The Twelve Traditions', 'Resource'], ['/privacy-policy/', 'Privacy Policy', 'Legal'], ['/disclaimer/', 'Disclaimer', 'Legal']
  ];
  let session = readSession();
  let currentPostImage = '';
  let postsCache = [];

  const loginView = document.querySelector('#login-view');
  const studioView = document.querySelector('#studio-view');
  const loginForm = document.querySelector('#login-form');
  const setupNotice = document.querySelector('#setup-notice');
  const postForm = document.querySelector('#post-form');

  function readSession() {
    try { return JSON.parse(localStorage.getItem('mary_cms_session') || 'null'); }
    catch { return null; }
  }
  function saveSession(value) {
    session = value;
    if (value) localStorage.setItem('mary_cms_session', JSON.stringify(value));
    else localStorage.removeItem('mary_cms_session');
  }
  function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]); }
  function slugify(value) { return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80); }
  function safeUrl(value) { try { const url = new URL(value, location.origin); return ['http:','https:','mailto:','tel:'].includes(url.protocol) ? value : '#'; } catch { return '#'; } }
  function markdown(value) { return escapeHtml(value).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>').replace(/\n/g, '<br>'); }
  function friendlyError(error) {
    if (/relation .* does not exist/i.test(error.message) || /schema cache/i.test(error.message) || /404/.test(error.message)) return 'The CMS database needs its one-time setup migration.';
    if (/Invalid login credentials/i.test(error.message)) return 'The email or password is not correct.';
    if (/JWT|token|authorized|permission/i.test(error.message)) return 'Your session expired. Sign in again and retry.';
    return 'Something went wrong. Check your connection and try again.';
  }

  async function authRequest(path, body) {
    const response = await fetch(`${config.url}/auth/v1/${path}`, { method:'POST', headers:{ apikey:config.key, 'Content-Type':'application/json' }, body:JSON.stringify(body) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.msg || data.message || `${response.status}`);
    return data;
  }
  async function api(table, query = '', options = {}) {
    const headers = { apikey:config.key, 'Content-Type':'application/json', ...(options.headers || {}) };
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
    const response = await fetch(`${config.url}/rest/v1/${table}${query}`, { ...options, headers });
    const text = await response.text();
    if (!response.ok) throw new Error(text || `${response.status}`);
    return text ? JSON.parse(text) : null;
  }
  async function refreshSessionIfNeeded() {
    if (!session?.refresh_token) return;
    if ((session.expires_at || 0) * 1000 > Date.now() + 60000) return;
    const data = await authRequest('token?grant_type=refresh_token', { refresh_token:session.refresh_token });
    data.expires_at = Math.floor(Date.now()/1000) + data.expires_in;
    saveSession(data);
  }

  function showStudio() {
    loginView.hidden = true;
    studioView.hidden = false;
    document.querySelector('#admin-email').textContent = session?.user?.email || '';
    renderPages(pages);
    checkSetup();
  }
  function showLogin() { studioView.hidden = true; loginView.hidden = false; }

  loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    const status = document.querySelector('#login-status');
    const submit = loginForm.querySelector('button[type="submit"]');
    status.textContent = '';
    submit.disabled = true;
    submit.textContent = 'Signing in…';
    const fields = new FormData(loginForm);
    try {
      const data = await authRequest('token?grant_type=password', { email:fields.get('email'), password:fields.get('password') });
      data.expires_at = Math.floor(Date.now()/1000) + data.expires_in;
      saveSession(data);
      showStudio();
    } catch (error) { status.textContent = friendlyError(error); }
    finally { submit.disabled = false; submit.textContent = 'Sign in'; }
  });

  async function checkSetup() {
    try {
      await refreshSessionIfNeeded();
      const admins = await api('cms_admins', '?select=user_id&limit=1');
      if (!admins?.length) throw new Error('permission denied');
      setupNotice.hidden = true;
      if (!document.querySelector('#media-view').hidden) loadMedia();
      if (!document.querySelector('#blog-view').hidden) loadPosts();
    } catch (error) {
      setupNotice.hidden = false;
      if (/JWT|token/i.test(error.message)) { saveSession(null); showLogin(); }
    }
  }

  document.querySelector('#retry-setup').addEventListener('click', checkSetup);
  document.querySelector('#sign-out').addEventListener('click', async () => {
    try { if (session?.access_token) await authRequest('logout', {}); } catch {}
    saveSession(null);
    showLogin();
    loginForm.reset();
  });

  document.querySelectorAll('.studio-rail [data-view]').forEach(button => button.addEventListener('click', () => switchView(button.dataset.view)));
  function switchView(name) {
    const copy = {
      pages:['Pages','Choose a page, then edit it exactly as visitors see it.'],
      media:['Media','Keep the pictures used across your website in one place.'],
      blog:['Blog','Write, preview, and publish articles for your readers.']
    };
    document.querySelectorAll('.studio-rail [data-view]').forEach(button => button.classList.toggle('is-active', button.dataset.view === name));
    document.querySelectorAll('.studio-view-panel').forEach(panel => { panel.hidden = panel.id !== `${name}-view`; });
    document.querySelector('#view-title').textContent = copy[name][0];
    document.querySelector('#view-description').textContent = copy[name][1];
    if (name === 'media') loadMedia();
    if (name === 'blog') loadPosts();
  }

  function renderPages(items) {
    const list = document.querySelector('#page-list');
    list.innerHTML = items.map(([path,title,type]) => `<article class="page-row"><div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(path)}</p></div><span class="page-type">${escapeHtml(type)}</span><div class="page-actions"><a href="${escapeHtml(path)}?cms-edit=1">Edit page</a><a href="${escapeHtml(path)}" target="_blank" rel="noopener">View</a></div></article>`).join('');
    document.querySelector('#page-count').textContent = `${items.length} page${items.length === 1 ? '' : 's'}`;
  }
  document.querySelector('#page-search').addEventListener('input', event => {
    const query = event.target.value.toLowerCase().trim();
    renderPages(pages.filter(item => `${item[0]} ${item[1]} ${item[2]}`.toLowerCase().includes(query)));
  });

  document.querySelector('#media-upload').addEventListener('change', async event => {
    const files = [...(event.target.files || [])];
    if (!files.length) return;
    const status = document.querySelector('#media-status');
    status.textContent = `Preparing ${files.length} picture${files.length === 1 ? '' : 's'}…`;
    try {
      for (const file of files) {
        const image = await compressImage(file);
        await api('cms_media', '', { method:'POST', body:JSON.stringify({ name:file.name, alt_text:file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '), data_url:image.dataUrl, width:image.width, height:image.height, created_by:session.user?.id }), headers:{ Prefer:'return=minimal' } });
      }
      status.textContent = 'Pictures uploaded.';
      event.target.value = '';
      loadMedia();
    } catch (error) { status.textContent = friendlyError(error); }
  });
  async function loadMedia() {
    const grid = document.querySelector('#media-grid');
    try {
      const items = await api('cms_media', '?select=id,name,alt_text,data_url,width,height,created_at&order=created_at.desc');
      grid.innerHTML = items?.length ? items.map(item => `<article class="media-card"><img src="${item.data_url}" alt="${escapeHtml(item.alt_text)}"><div class="media-card-body"><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.alt_text || 'No description yet')}</p><button type="button" data-delete-media="${item.id}">Delete picture</button></div></article>`).join('') : '<p class="empty-state">No uploaded pictures yet. Your existing website pictures remain available on their pages.</p>';
      grid.querySelectorAll('[data-delete-media]').forEach(button => button.addEventListener('click', async () => {
        if (!confirm('Delete this picture from the media library? Pictures already saved on a page will remain there.')) return;
        try { await api('cms_media', `?id=eq.${button.dataset.deleteMedia}`, { method:'DELETE' }); loadMedia(); }
        catch (error) { document.querySelector('#media-status').textContent = friendlyError(error); }
      }));
    } catch (error) { grid.innerHTML = `<p class="empty-state">${escapeHtml(friendlyError(error))}</p>`; }
  }

  const postFields = ['title','subheading','excerpt','image_alt','body'];
  function updatePostPreview() {
    const data = new FormData(postForm);
    document.querySelector('#preview-title').textContent = data.get('title') || 'Your article title';
    document.querySelector('#preview-subheading').textContent = data.get('subheading') || '';
    document.querySelector('#preview-excerpt').textContent = data.get('excerpt') || 'Your summary will appear here.';
    document.querySelector('#preview-body').innerHTML = String(data.get('body') || '').split(/\n\s*\n/).filter(Boolean).map(paragraph => `<p>${markdown(paragraph)}</p>`).join('');
    const image = document.querySelector('#preview-image');
    image.hidden = !currentPostImage;
    if (currentPostImage) image.src = currentPostImage;
    postForm.querySelector('button[type="submit"]').disabled = !data.get('title')?.trim() || !data.get('excerpt')?.trim() || !data.get('body')?.trim();
  }
  postFields.forEach(name => postForm.elements[name]?.addEventListener('input', updatePostPreview));
  postForm.elements.image.addEventListener('change', async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const image = await compressImage(file);
    currentPostImage = image.dataUrl;
    document.querySelector('#post-image-name').textContent = file.name;
    updatePostPreview();
  });
  document.querySelector('#insert-link').addEventListener('click', () => {
    const label = document.querySelector('#link-label').value.trim();
    const url = document.querySelector('#link-url').value.trim();
    if (!label || safeUrl(url) === '#') { document.querySelector('#post-status').textContent = 'Add both a link label and a full https:// address.'; return; }
    const body = postForm.elements.body;
    const addition = `[${label}](${url})`;
    const start = body.selectionStart || body.value.length;
    body.setRangeText(addition, start, body.selectionEnd || start, 'end');
    document.querySelector('#link-label').value = '';
    document.querySelector('#link-url').value = '';
    document.querySelector('#post-status').textContent = '';
    updatePostPreview();
    body.focus();
  });

  postForm.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(postForm);
    const submit = postForm.querySelector('button[type="submit"]');
    const status = document.querySelector('#post-status');
    const id = data.get('id');
    const state = data.get('status');
    const payload = {
      slug:slugify(data.get('title')), title:data.get('title').trim(), subheading:data.get('subheading').trim(), excerpt:data.get('excerpt').trim(),
      image_url:currentPostImage || null, image_alt:data.get('image_alt').trim(), body:String(data.get('body')).split(/\n\s*\n/).filter(Boolean).map(text => ({ type:'paragraph', text })),
      status:state, published_at:state === 'published' ? new Date().toISOString() : null, updated_at:new Date().toISOString(), created_by:session.user?.id
    };
    submit.disabled = true; submit.textContent = 'Saving…'; status.textContent = '';
    try {
      if (id) await api('cms_posts', `?id=eq.${encodeURIComponent(id)}`, { method:'PATCH', body:JSON.stringify(payload), headers:{ Prefer:'return=minimal' } });
      else await api('cms_posts', '', { method:'POST', body:JSON.stringify(payload), headers:{ Prefer:'return=minimal' } });
      status.textContent = state === 'published' ? 'Article published. It is now visible on the Blog page.' : 'Draft saved.';
      clearPostForm();
      loadPosts();
    } catch (error) { status.textContent = friendlyError(error); }
    finally { submit.textContent = 'Save article'; updatePostPreview(); }
  });

  async function loadPosts() {
    const list = document.querySelector('#post-list');
    try {
      postsCache = await api('cms_posts', '?select=*&order=updated_at.desc');
      list.innerHTML = postsCache?.length ? postsCache.map(post => `<article class="post-row"><strong>${escapeHtml(post.title)}</strong><span>${escapeHtml(post.status)}</span><button type="button" data-edit-post="${post.id}">Edit</button></article>`).join('') : '<p class="empty-state">No CMS articles yet. Use the form above to write the first one.</p>';
      list.querySelectorAll('[data-edit-post]').forEach(button => button.addEventListener('click', () => editPost(button.dataset.editPost)));
    } catch (error) { list.innerHTML = `<p class="empty-state">${escapeHtml(friendlyError(error))}</p>`; }
  }
  function editPost(id) {
    const post = postsCache.find(item => item.id === id); if (!post) return;
    postForm.elements.id.value = post.id;
    postForm.elements.title.value = post.title;
    postForm.elements.subheading.value = post.subheading || '';
    postForm.elements.excerpt.value = post.excerpt || '';
    postForm.elements.image_alt.value = post.image_alt || '';
    postForm.elements.body.value = (post.body || []).map(block => block.text || '').join('\n\n');
    postForm.elements.status.value = post.status;
    currentPostImage = post.image_url || '';
    document.querySelector('#post-image-name').textContent = currentPostImage ? 'Current article picture' : 'No picture selected';
    document.querySelector('#post-form-title').textContent = 'Edit article';
    updatePostPreview();
    postForm.scrollIntoView({ behavior:'smooth', block:'start' });
  }
  function clearPostForm() {
    postForm.reset(); currentPostImage = '';
    postForm.elements.id.value = '';
    document.querySelector('#post-form-title').textContent = 'Write a new article';
    document.querySelector('#post-image-name').textContent = 'No picture selected';
    updatePostPreview();
  }
  document.querySelector('#clear-post').addEventListener('click', clearPostForm);

  async function compressImage(file) {
    const source = await new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload=()=>resolve(reader.result); reader.onerror=reject; reader.readAsDataURL(file); });
    const image = await new Promise((resolve,reject) => { const img = new Image(); img.onload=()=>resolve(img); img.onerror=reject; img.src=source; });
    const limit = 1600, scale = Math.min(1, limit / Math.max(image.naturalWidth,image.naturalHeight));
    const width = Math.round(image.naturalWidth*scale), height = Math.round(image.naturalHeight*scale);
    const canvas = document.createElement('canvas'); canvas.width=width; canvas.height=height; canvas.getContext('2d').drawImage(image,0,0,width,height);
    return { dataUrl:canvas.toDataURL('image/webp',.82), width, height };
  }

  (async () => {
    if (!config) return showLogin();
    try { await refreshSessionIfNeeded(); } catch { saveSession(null); }
    if (session?.access_token) showStudio(); else showLogin();
    updatePostPreview();
  })();
})();

