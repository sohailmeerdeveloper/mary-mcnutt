(() => {
  'use strict';
  const config = window.MARY_CMS;
  const slug = new URLSearchParams(location.search).get('slug');
  const status = document.querySelector('#cms-post-status');
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
  const markdown = value => escapeHtml(value).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>').replace(/\n/g, '<br>');
  if (!slug) { status.textContent = 'This article address is incomplete.'; return; }
  fetch(`${config.url}/rest/v1/cms_posts?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=*&limit=1`, { headers:{ apikey:config.key } })
    .then(async response => { if (!response.ok) throw new Error(await response.text()); return response.json(); })
    .then(([post]) => {
      if (!post) throw new Error('not found');
      document.title = `${post.title} | Mary McNutt`;
      document.querySelector('#cms-post-title').textContent = post.title;
      document.querySelector('#cms-post-subheading').textContent = post.subheading || '';
      document.querySelector('#cms-post-excerpt').textContent = post.excerpt || '';
      const figure = document.querySelector('#cms-post-figure');
      if (post.image_url) { const image = document.querySelector('#cms-post-image'); image.src = post.image_url; image.alt = post.image_alt || ''; figure.hidden = false; }
      document.querySelector('#cms-post-body').innerHTML = (post.body || []).map(block => block.type === 'heading' ? `<h2>${escapeHtml(block.text)}</h2>` : `<p>${markdown(block.text)}</p>`).join('');
    })
    .catch(() => { document.querySelector('#cms-post-title').textContent = 'Article not found'; status.textContent = 'This article is not available. Return to Mary’s journal to continue reading.'; });
})();

