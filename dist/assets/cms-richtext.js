(() => {
  'use strict';
  const templates = new WeakMap();
  const tags = new Set(['STRONG', 'B', 'EM', 'I', 'U', 'BR', 'SPAN', 'A', 'SMALL', 'SUP', 'SUB', 'S', 'CODE']);
  const blocked = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'SVG', 'MATH', 'IMG', 'INPUT', 'BUTTON', 'TEMPLATE']);
  const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
  const safeHref = value => {
    try { return ['http:', 'https:', 'mailto:', 'tel:'].includes(new URL(value, location.href).protocol) ? value : '#'; }
    catch { return '#'; }
  };

  // All database HTML passes this allowlist on both editing and visitor pages.
  function sanitize(html) {
    const source = document.createElement('template'); source.innerHTML = String(html || '');
    const output = document.createElement('div');
    const copy = (node, parent) => {
      if (node.nodeType === Node.TEXT_NODE) return parent.append(document.createTextNode(node.data));
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      if (blocked.has(node.tagName)) return;
      if (node.tagName === 'SPAN' && /^\d+$/.test(node.getAttribute('data-cms-slot') || '')) {
        const slot = document.createElement('span'); slot.dataset.cmsSlot = node.dataset.cmsSlot; parent.append(slot); return;
      }
      if (!tags.has(node.tagName)) {
        if (['DIV', 'P', 'LI'].includes(node.tagName) && parent.lastChild && parent.lastChild.nodeName !== 'BR') parent.append(document.createElement('br'));
        [...node.childNodes].forEach(child => copy(child, parent));
        if (['DIV', 'P', 'LI'].includes(node.tagName) && node.nextSibling) parent.append(document.createElement('br'));
        return;
      }
      const clean = document.createElement(node.tagName.toLowerCase());
      for (const attribute of ['class', 'title', 'lang', 'dir']) {
        if (node.hasAttribute(attribute)) clean.setAttribute(attribute, node.getAttribute(attribute));
      }
      if (node.tagName === 'A') {
        clean.setAttribute('href', safeHref(node.getAttribute('href') || '#'));
        if (node.getAttribute('target') === '_blank') { clean.target = '_blank'; clean.rel = 'noopener noreferrer'; }
      }
      // Native formatting may emit spans when turning an inherited style off.
      const permitted = { fontWeight: /^(normal|bold|[1-9]00)$/, fontStyle: /^(normal|italic)$/, textDecorationLine: /^(none|underline|line-through)( (underline|line-through))?$/ };
      for (const [property, pattern] of Object.entries(permitted)) {
        if (pattern.test(node.style[property])) clean.style[property] = node.style[property];
      }
      [...node.childNodes].forEach(child => copy(child, clean)); parent.append(clean);
    };
    [...source.content.childNodes].forEach(node => copy(node, output));
    return output.innerHTML;
  }
  function encode(element) {
    const clone = element.cloneNode(true), slots = [];
    for (const node of [...clone.querySelectorAll('svg,img,[aria-hidden="true"]')]) {
      if (!clone.contains(node)) continue;
      const placeholder = document.createElement('span'); placeholder.dataset.cmsSlot = slots.length;
      slots.push(node.cloneNode(true)); node.replaceWith(placeholder);
    }
    return { html: sanitize(clone.innerHTML), slots };
  }
  function capture(element) {
    if (!templates.has(element)) templates.set(element, encode(element));
    return templates.get(element);
  }
  function plain(html) {
    const node = document.createElement('div'); node.innerHTML = sanitize(html);
    node.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    return node.textContent.trim();
  }
  function read(element) {
    const html = encode(element).html;
    return { text: plain(html), html };
  }
  function restoreSlots(root, slots, editing = false) {
    root.querySelectorAll('[data-cms-slot]').forEach(slot => {
      const original = slots[Number(slot.dataset.cmsSlot)];
      if (!original) { slot.remove(); return; }
      if (editing) {
        slot.contentEditable = 'false'; slot.className = 'cms-rich-slot';
        slot.setAttribute('aria-label', 'Website icon'); slot.append(original.cloneNode(true));
      } else slot.replaceWith(original.cloneNode(true));
    });
  }

  // Recover legacy plain-text saves by aligning words to the authored text nodes.
  // Matching emphasis, links, spans, and line breaks keep their original wrappers.
  function mergePlain(root, value) {
    const entries = [], nodes = [];
    const visit = node => {
      if (node.nodeType === Node.TEXT_NODE) {
        nodes.push(node);
        for (const token of node.data.match(/\s+|\S+/g) || []) entries.push({ token, node });
      } else if (node.nodeName === 'BR') entries.push({ token: '\n', node: null });
      else if (!node.matches?.('[data-cms-slot]')) [...node.childNodes].forEach(visit);
    };
    visit(root);
    const incoming = String(value).match(/\s+|\S+/g) || [];
    const equal = (a, b) => a === b || (/^\s+$/.test(a) && /^\s+$/.test(b));
    if (entries.length === incoming.length && entries.every((entry, i) => equal(entry.token, incoming[i]))) return;
    if (!nodes.length) { root.append(document.createTextNode(value)); return; }
    // Bound memory for unusually long content; retain its wrappers with a text range edit.
    if (entries.length * incoming.length > 2000000) {
      nodes[0].data = value; nodes.slice(1).forEach(node => { node.data = ''; }); return;
    }
    const dp = Array.from({ length: entries.length + 1 }, () => new Uint32Array(incoming.length + 1));
    for (let i = entries.length - 1; i >= 0; i--) for (let j = incoming.length - 1; j >= 0; j--) {
      dp[i][j] = equal(entries[i].token, incoming[j]) ? 1 + dp[i + 1][j + 1] : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
    const values = new Map(nodes.map(node => [node, '']));
    const append = (node, text) => { if (node) values.set(node, values.get(node) + text); };
    let i = 0, j = 0, previous = null;
    while (i < entries.length || j < incoming.length) {
      if (i < entries.length && j < incoming.length && equal(entries[i].token, incoming[j])) {
        append(entries[i].node, incoming[j]); if (entries[i].node) previous = entries[i].node; i++; j++; continue;
      }
      const removed = [], added = [];
      while ((i < entries.length || j < incoming.length) && !(i < entries.length && j < incoming.length && equal(entries[i].token, incoming[j]))) {
        if (i < entries.length && (j === incoming.length || dp[i + 1][j] >= dp[i][j + 1])) removed.push(entries[i++]);
        else added.push(incoming[j++]);
      }
      const owner = removed.find(entry => entry.node)?.node || previous || entries[i]?.node || nodes[0];
      append(owner, added.join('')); previous = owner;
    }
    for (const [node, text] of values) node.data = text;
  }
  function apply(element, value) {
    const template = capture(element);
    const container = document.createElement('div');
    container.innerHTML = sanitize(typeof value.html === 'string' ? value.html : template.html);
    if (typeof value.html !== 'string' && typeof value.text === 'string') mergePlain(container, value.text);
    restoreSlots(container, template.slots);
    element.replaceChildren(...container.childNodes);
  }

  function markup(label = 'Text', attribute = 'data-cms-text') {
    return `<div class="cms-rich-field"><div class="cms-rich-label">${escape(label)}</div><div class="cms-format-toolbar" role="group" aria-label="Text formatting">${[['bold','Bold','B'],['italic','Italic','I'],['underline','Underline','U']].map(([command, name, key]) => `<button type="button" data-format="${command}" aria-label="${name}" aria-pressed="false" aria-keyshortcuts="Control+${key} Meta+${key}" title="${name} (Ctrl+${key})">${name}</button>`).join('')}</div><div class="cms-rich-input" ${attribute} contenteditable="true" role="textbox" aria-label="${escape(label)}" aria-multiline="true" spellcheck="true"></div><p class="cms-rich-hint">Select words to format them, or turn on a style before typing.</p></div>`;
  }
  function mount(field, value, onChange, slots = []) {
    const editor = field.querySelector('[contenteditable="true"]');
    editor.innerHTML = sanitize(value.html ?? escape(value.text || '').replace(/\n/g, '<br>'));
    restoreSlots(editor, slots, true);
    let selectionRange = null;
    const valueNow = () => { const html = sanitize(editor.innerHTML); return { html, text: plain(html) }; };
    const buttons = [...field.querySelectorAll('[data-format]')];
    const remember = () => {
      const selection = window.getSelection();
      if (!selection?.rangeCount || !editor.contains(selection.anchorNode) || !editor.contains(selection.focusNode)) return;
      selectionRange = selection.getRangeAt(0).cloneRange();
      buttons.forEach(button => button.setAttribute('aria-pressed', String(document.queryCommandState(button.dataset.format))));
    };
    const changed = () => { remember(); onChange(valueNow()); };
    const focusSelection = () => {
      editor.focus();
      const selection = window.getSelection();
      const range = selectionRange?.commonAncestorContainer && editor.contains(selectionRange.commonAncestorContainer) ? selectionRange : document.createRange();
      if (range !== selectionRange) { range.selectNodeContents(editor); range.collapse(false); }
      selection.removeAllRanges(); selection.addRange(range);
    };
    const format = command => {
      remember();
      focusSelection();
      document.execCommand('styleWithCSS', false, false);
      document.execCommand(command, false, null);
      changed();
    };
    buttons.forEach(button => {
      button.addEventListener('mousedown', event => event.preventDefault());
      button.addEventListener('click', () => format(button.dataset.format));
    });
    editor.addEventListener('input', changed);
    editor.addEventListener('keydown', event => {
      const command = { b:'bold', i:'italic', u:'underline' }[event.key.toLowerCase()];
      if ((event.ctrlKey || event.metaKey) && command && !event.altKey) { event.preventDefault(); format(command); }
      if (event.key === 'Enter' && !event.isComposing) { event.preventDefault(); document.execCommand('insertLineBreak'); changed(); }
    });
    editor.addEventListener('paste', event => {
      event.preventDefault(); document.execCommand('insertText', false, event.clipboardData.getData('text/plain')); changed();
    });
    editor.addEventListener('drop', event => { event.preventDefault(); });
    editor.addEventListener('click', event => { if (event.target.closest('a')) event.preventDefault(); });
    document.addEventListener('selectionchange', remember);
    return { value: valueNow, focus: () => editor.focus(), destroy: () => document.removeEventListener('selectionchange', remember) };
  }
  window.MaryRichText = Object.freeze({ sanitize, capture, read, apply, mergePlain, markup, mount, plain });
})();
