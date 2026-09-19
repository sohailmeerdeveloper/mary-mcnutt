(() => {
  'use strict';

  const config = window.MARY_CMS;
  if (!config?.url || !config?.key || location.pathname.startsWith('/admin')) return;

  const pagePath = normalizePath(location.pathname);
  const editMode = new URLSearchParams(location.search).get('cms-edit') === '1';
  const session = readSession();
  const editableSelector = [
    'main h1', 'main h2', 'main h3', 'main h4', 'main p', 'main blockquote',
    'main li', 'main a.button', 'main a.text-link', 'main button', 'main img',
    'header a.button', 'footer h2', 'footer a', 'footer p'
  ].join(',');

  function normalizePath(path) {
    if (!path || path === '/index.html') return '/';
    return `/${path.replace(/^\/+|\/+$/g, '')}/`.replace('/index.html/', '/');
  }

  function readSession() {
    try { return JSON.parse(localStorage.getItem('mary_cms_session') || 'null'); }
    catch { return null; }
  }

  function headers(authenticated = false) {
    const output = { apikey: config.key, 'Content-Type': 'application/json' };
    if (authenticated && session?.access_token) output.Authorization = `Bearer ${session.access_token}`;
    return output;
  }

  async function request(table, query = '', options = {}) {
    const response = await fetch(`${config.url}/rest/v1/${table}${query}`, {
      ...options,
      headers: { ...headers(Boolean(options.authenticated)), ...(options.headers || {}) }
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(detail || `${response.status} ${response.statusText}`);
    }
    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  function editableElements() {
    return [...document.querySelectorAll(editableSelector)].filter(element => {
      if (element.closest('[data-cms-added-block], .cms-editor-ui')) return false;
      if (element.matches('a') && element.closest('h1,h2,h3,h4,p,li,blockquote')) return false;
      if (element.matches('p,li,blockquote') && element.querySelector('h1,h2,h3,h4,p,li,blockquote')) return false;
      return true;
    });
  }

  function elementType(element) {
    if (element.matches('img')) return 'image';
    if (element.matches('a,button')) return 'button';
    return 'text';
  }

  function annotateElements() {
    editableElements().forEach((element, index) => {
      const type = elementType(element);
      element.dataset.cmsKey = `${type}-${String(index + 1).padStart(3, '0')}`;
      element.dataset.cmsType = type;
    });
  }

  function applyValue(element, type, value) {
    if (!element || !value) return;
    if (type === 'image') {
      if (value.deleted) {
        element.hidden = true;
        return;
      }
      element.hidden = false;
      if (value.src) {
        element.src = value.src;
        element.removeAttribute('srcset');
        element.removeAttribute('sizes');
      }
      if (typeof value.alt === 'string') element.alt = value.alt;
      return;
    }
    if (typeof value.text === 'string') {
      if (type === 'button') {
        [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => node.remove());
        element.insertBefore(document.createTextNode(`${value.text} `), element.firstChild);
      } else {
        element.textContent = value.text;
      }
    }
    if (type === 'button' && element.matches('a') && value.href) element.href = value.href;
  }

  function renderAddedBlock(block, provisional = false) {
    const shell = document.createElement('section');
    shell.className = 'cms-added-block wrap';
    shell.dataset.cmsAddedBlock = block.id || 'preview';
    if (provisional) shell.dataset.provisional = 'true';
    const content = block.content || {};
    if (block.kind === 'title') shell.innerHTML = `<h2>${escapeHtml(content.text || 'New title')}</h2>`;
    if (block.kind === 'subheading') shell.innerHTML = `<h3>${escapeHtml(content.text || 'New subheading')}</h3>`;
    if (block.kind === 'text') shell.innerHTML = `<p>${linkify(content.text || 'New text block')}</p>`;
    if (block.kind === 'image') shell.innerHTML = `<figure><img src="${escapeAttr(content.src || '')}" alt="${escapeAttr(content.alt || '')}">${content.caption ? `<figcaption>${escapeHtml(content.caption)}</figcaption>` : ''}</figure>`;
    if (block.kind === 'button') shell.innerHTML = `<a class="button primary" href="${escapeAttr(safeUrl(content.href || '#'))}">${escapeHtml(content.text || 'Learn more')}</a>`;
    document.querySelector('main')?.append(shell);
    return shell;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  }

  function escapeAttr(value) { return escapeHtml(value); }

  function safeUrl(value) {
    try {
      const url = new URL(value, location.origin);
      return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) || url.origin === location.origin ? value : '#';
    } catch { return '#'; }
  }

  function linkify(value) {
    return escapeHtml(value).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>').replace(/\n/g, '<br>');
  }

  async function loadCms() {
    annotateElements();
    try {
      const [content, blocks] = await Promise.all([
        request('cms_content', `?page_path=eq.${encodeURIComponent(pagePath)}&select=element_key,element_type,value`),
        request('cms_blocks', `?page_path=eq.${encodeURIComponent(pagePath)}&published=eq.true&select=id,kind,content,position&order=position.asc`)
      ]);
      (content || []).forEach(item => applyValue(document.querySelector(`[data-cms-key="${CSS.escape(item.element_key)}"]`), item.element_type, item.value));
      (blocks || []).forEach(block => renderAddedBlock(block));
    } catch (error) {
      console.info('CMS content is not initialized yet.', error.message);
    }
    if (pagePath === '/blog/') await loadPublishedPosts();
    if (editMode) setupEditor();
  }

  async function loadPublishedPosts() {
    try {
      const posts = await request('cms_posts', '?status=eq.published&select=slug,title,subheading,excerpt,image_url,image_alt,published_at&order=published_at.desc');
      if (!posts?.length) return;
      const grid = document.querySelector('.blog-feed, .blog-grid, .journal-grid, [data-blog-grid]');
      if (!grid) return;
      posts.slice().reverse().forEach(post => {
        const article = document.createElement('article');
        article.className = 'blog-card cms-post-card';
        article.innerHTML = `${post.image_url ? `<a class="article-image" href="/blog/post/?slug=${encodeURIComponent(post.slug)}"><img src="${escapeAttr(post.image_url)}" alt="${escapeAttr(post.image_alt || '')}"></a>` : ''}<div class="article-copy"><span class="card-label">Latest from Mary</span><h2><a href="/blog/post/?slug=${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a></h2>${post.subheading ? `<p class="cms-post-subheading">${escapeHtml(post.subheading)}</p>` : ''}<p>${escapeHtml(post.excerpt || '')}</p><a class="text-link" href="/blog/post/?slug=${encodeURIComponent(post.slug)}">Read article</a></div>`;
        grid.prepend(article);
      });
    } catch { /* The static archive remains complete without CMS data. */ }
  }

  function setupEditor() {
    if (!session?.access_token) {
      top.location.href = '/admin/';
      return;
    }
    document.documentElement.classList.add('cms-editing');
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/assets/cms-editor.css';
    document.head.append(style);

    const toolbar = document.createElement('div');
    toolbar.className = 'cms-editor-ui cms-toolbar';
    toolbar.innerHTML = `<div><strong>Editing ${escapeHtml(document.title.replace(/\s*[|–-].*$/, ''))}</strong><span>Click text, a button, or an image to edit it.</span></div><div class="cms-toolbar-actions"><button type="button" data-cms-add>Add block</button><button type="button" data-cms-exit>Exit editor</button></div>`;
    document.body.append(toolbar);

    const inspector = document.createElement('aside');
    inspector.className = 'cms-editor-ui cms-inspector';
    inspector.hidden = true;
    document.body.append(inspector);

    let selected = null;
    let original = null;
    let dirty = false;

    const setDirty = value => {
      dirty = value;
      inspector.querySelector('[data-cms-save]')?.toggleAttribute('disabled', !value);
    };

    const serialize = element => {
      const type = element.dataset.cmsType;
      if (type === 'image') return { src: element.currentSrc || element.src, alt: element.alt || '', deleted: element.hidden };
      const data = { text: element.innerText.trim() };
      if (type === 'button' && element.matches('a')) data.href = element.getAttribute('href') || '';
      return data;
    };

    const closeInspector = () => {
      selected?.classList.remove('cms-selected');
      selected = null;
      original = null;
      dirty = false;
      inspector.hidden = true;
      inspector.innerHTML = '';
    };

    const saveCurrent = async () => {
      if (!selected || !dirty) return;
      const saveButton = inspector.querySelector('[data-cms-save]');
      saveButton.disabled = true;
      saveButton.textContent = 'Saving…';
      const payload = {
        page_path: pagePath,
        element_key: selected.dataset.cmsKey,
        element_type: selected.dataset.cmsType,
        value: serialize(selected),
        updated_at: new Date().toISOString(),
        updated_by: session.user?.id || null
      };
      try {
        await request('cms_content', '?on_conflict=page_path,element_key', {
          method: 'POST', authenticated: true, body: JSON.stringify(payload),
          headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }
        });
        setDirty(false);
        saveButton.textContent = 'Saved';
        setTimeout(() => { if (saveButton.isConnected) saveButton.textContent = 'Save changes'; }, 900);
      } catch (error) {
        saveButton.disabled = false;
        saveButton.textContent = 'Try saving again';
        inspector.querySelector('[data-cms-status]').textContent = friendlyError(error);
        throw error;
      }
    };

    const cancelCurrent = () => {
      if (selected && original) applyValue(selected, selected.dataset.cmsType, original);
      closeInspector();
    };

    const openInspector = element => {
      if (selected && dirty) cancelCurrent();
      selected?.classList.remove('cms-selected');
      selected = element;
      selected.classList.add('cms-selected');
      original = serialize(selected);
      const type = selected.dataset.cmsType;
      inspector.hidden = false;
      if (type === 'image') {
        inspector.innerHTML = `<div class="cms-inspector-head"><strong>Edit image</strong><button type="button" aria-label="Close" data-cms-close>×</button></div><label>Alternative text<input data-cms-alt value="${escapeAttr(original.alt)}"></label><label class="cms-file-control">Choose a new picture<input type="file" accept="image/*" data-cms-file></label><button type="button" class="cms-delete-image" data-cms-delete>Delete picture</button><div class="cms-save-row"><button type="button" class="cms-cancel" data-cms-cancel>Cancel</button><button type="button" class="cms-save" data-cms-save disabled>Save changes</button></div><p data-cms-status role="status"></p>`;
      } else {
        inspector.innerHTML = `<div class="cms-inspector-head"><strong>Edit ${type}</strong><button type="button" aria-label="Close" data-cms-close>×</button></div><label>${type === 'button' ? 'Button text' : 'Text'}<textarea rows="5" data-cms-text>${escapeHtml(original.text)}</textarea></label>${type === 'button' && selected.matches('a') ? `<label>Link<input data-cms-href value="${escapeAttr(original.href || '')}"></label>` : ''}<div class="cms-save-row"><button type="button" class="cms-cancel" data-cms-cancel>Cancel</button><button type="button" class="cms-save" data-cms-save disabled>Save changes</button></div><p data-cms-status role="status"></p>`;
      }
      inspector.querySelector('[data-cms-text]')?.addEventListener('input', event => { applyValue(selected, type, { text: event.target.value }); setDirty(true); });
      inspector.querySelector('[data-cms-href]')?.addEventListener('input', event => { selected.setAttribute('href', event.target.value); setDirty(true); });
      inspector.querySelector('[data-cms-alt]')?.addEventListener('input', event => { selected.alt = event.target.value; setDirty(true); });
      inspector.querySelector('[data-cms-file]')?.addEventListener('change', async event => {
        const file = event.target.files?.[0];
        if (!file) return;
        const data = await compressImage(file);
        applyValue(selected, 'image', { src: data.dataUrl, alt: selected.alt });
        setDirty(true);
      });
      inspector.querySelector('[data-cms-delete]')?.addEventListener('click', () => { selected.hidden = true; setDirty(true); });
      inspector.querySelector('[data-cms-save]').addEventListener('click', () => saveCurrent().catch(() => {}));
      inspector.querySelector('[data-cms-cancel]').addEventListener('click', cancelCurrent);
      inspector.querySelector('[data-cms-close]').addEventListener('click', cancelCurrent);
      inspector.querySelector('textarea,input')?.focus();
    };

    editableElements().forEach(element => element.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      openInspector(element);
    }, true));

    const imageTriggers = [...document.querySelectorAll('img[data-cms-key]')].map(image => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cms-editor-ui cms-image-trigger';
      button.textContent = 'Edit picture';
      button.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); openInspector(image); });
      document.body.append(button);
      return { image, button };
    });
    let triggerFrame = 0;
    const positionImageTriggers = () => {
      cancelAnimationFrame(triggerFrame);
      triggerFrame = requestAnimationFrame(() => imageTriggers.forEach(({ image, button }) => {
        const rect = image.getBoundingClientRect();
        button.hidden = image.hidden || rect.width < 80 || rect.height < 50;
        button.style.left = `${Math.max(8, rect.left + scrollX + 8)}px`;
        button.style.top = `${Math.max(84, rect.top + scrollY + 8)}px`;
      }));
    };
    addEventListener('scroll', positionImageTriggers, { passive: true });
    addEventListener('resize', positionImageTriggers);
    positionImageTriggers();

    toolbar.querySelector('[data-cms-add]').addEventListener('click', () => openBlockComposer(inspector, session, request, pagePath, renderAddedBlock));
    toolbar.querySelector('[data-cms-exit]').addEventListener('click', async () => {
      try { if (dirty) await saveCurrent(); } catch { return; }
      top.location.href = '/admin/';
    });
  }

  function friendlyError(error) {
    if (/relation .* does not exist/i.test(error.message) || /schema cache/i.test(error.message)) return 'The CMS database still needs its one-time setup migration.';
    if (/JWT|token|authorized|permission/i.test(error.message)) return 'Your login expired. Return to the dashboard and sign in again.';
    return 'This change could not be saved. Check your connection and try again.';
  }

  function openBlockComposer(inspector, sessionValue, requestFn, path, renderFn) {
    let preview = document.querySelector('[data-provisional="true"]');
    preview?.remove();
    inspector.hidden = false;
    inspector.innerHTML = `<div class="cms-inspector-head"><strong>Add a block</strong><button type="button" aria-label="Close" data-cms-close>×</button></div><label>Block type<select data-block-kind><option value="title">Title</option><option value="subheading">Subheading</option><option value="text">Text</option><option value="image">Image</option><option value="button">Button</option></select></label><label>Text or caption<textarea rows="5" data-block-text placeholder="Write the block content. Use [link text](https://example.com) to add a link."></textarea></label><label data-block-link-wrap hidden>Button link<input data-block-link placeholder="https://"></label><label class="cms-file-control" data-block-file-wrap hidden>Choose picture<input type="file" accept="image/*" data-block-file></label><label data-block-alt-wrap hidden>Alternative text<input data-block-alt></label><div class="cms-save-row"><button type="button" class="cms-cancel" data-cms-close>Cancel</button><button type="button" class="cms-save" data-block-save disabled>Add to page</button></div><p data-cms-status role="status"></p>`;
    const kind = inspector.querySelector('[data-block-kind]');
    const text = inspector.querySelector('[data-block-text]');
    const link = inspector.querySelector('[data-block-link]');
    const alt = inspector.querySelector('[data-block-alt]');
    const save = inspector.querySelector('[data-block-save]');
    let imageData = '';
    const updateFields = () => {
      const isImage = kind.value === 'image';
      inspector.querySelector('[data-block-file-wrap]').hidden = !isImage;
      inspector.querySelector('[data-block-alt-wrap]').hidden = !isImage;
      inspector.querySelector('[data-block-link-wrap]').hidden = kind.value !== 'button';
      text.closest('label').firstChild.textContent = isImage ? 'Caption' : 'Text or label';
      updatePreview();
    };
    const blockValue = () => ({
      kind: kind.value,
      content: kind.value === 'image' ? { src: imageData, alt: alt.value, caption: text.value } : kind.value === 'button' ? { text: text.value, href: link.value } : { text: text.value }
    });
    const updatePreview = () => {
      preview?.remove();
      const block = blockValue();
      const ready = kind.value === 'image' ? Boolean(imageData) : Boolean(text.value.trim());
      save.disabled = !ready;
      if (ready) preview = renderFn(block, true);
    };
    kind.addEventListener('change', updateFields);
    text.addEventListener('input', updatePreview);
    link.addEventListener('input', updatePreview);
    alt.addEventListener('input', updatePreview);
    inspector.querySelector('[data-block-file]').addEventListener('change', async event => {
      const file = event.target.files?.[0];
      if (file) { imageData = (await compressImage(file)).dataUrl; updatePreview(); }
    });
    inspector.querySelectorAll('[data-cms-close]').forEach(button => button.addEventListener('click', () => { preview?.remove(); inspector.hidden = true; }));
    save.addEventListener('click', async () => {
      const block = blockValue();
      save.disabled = true;
      save.textContent = 'Adding…';
      try {
        await requestFn('cms_blocks', '', {
          method: 'POST', authenticated: true,
          body: JSON.stringify({ page_path: path, position: Date.now(), kind: block.kind, content: block.content, published: true, updated_by: sessionValue.user?.id || null }),
          headers: { Prefer: 'return=representation' }
        });
        preview?.removeAttribute('data-provisional');
        inspector.hidden = true;
      } catch (error) {
        save.disabled = false;
        save.textContent = 'Try adding again';
        inspector.querySelector('[data-cms-status]').textContent = friendlyError(error);
      }
    });
    updateFields();
    text.focus();
  }

  async function compressImage(file) {
    const source = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const image = await new Promise((resolve, reject) => {
      const output = new Image();
      output.onload = () => resolve(output);
      output.onerror = reject;
      output.src = source;
    });
    const limit = 1600;
    const scale = Math.min(1, limit / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.round(image.naturalWidth * scale);
    const height = Math.round(image.naturalHeight * scale);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    return { dataUrl: canvas.toDataURL('image/webp', .82), width, height };
  }

  loadCms();
})();
