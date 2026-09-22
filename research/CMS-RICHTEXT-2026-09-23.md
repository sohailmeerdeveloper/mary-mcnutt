# CMS text formatting repair

The previous inline editor used `textContent` to preview and restore text, and saved only a plain `text` string. This removed authored `strong`, `em`, links, spans, and line breaks. Even Cancel could flatten the original markup.

Page text and button-label editors now preserve sanitized inline HTML in the existing JSON `value` alongside plain text. A contenteditable field provides Bold, Italic, and Underline controls, selection-state feedback, and Ctrl/Cmd+B/I/U shortcuts. Formatting can be applied to selected words or enabled before typing. Existing outer element classes, fonts, sizes, colors, and layout remain owned by the site stylesheet. New bold text uses `b`, so it does not accidentally pick up layout rules intended for authored `strong` phrases.

The shared renderer sanitizes saved HTML on both the editor and public pages. Pasting inserts plain text; scripts, event handlers, unsafe URLs, arbitrary CSS, and active embeds are not accepted. Authored decorative icons are preserved through indexed placeholders rather than accepting SVG or image markup from stored rich text.

For earlier plain-text saves, the public renderer aligns saved words with the original authored text nodes. This restores the homepage's existing `strong` phrase and preserves matching original formatting and links without replacing the saved wording. Formatting deliberately changed in new HTML saves takes precedence. A database migration is not required.

Verification:

- Seven existing path/session/API regression checks pass.
- Eleven browser regression checks pass at `/__richtext-tests__/` on the local CMS fixture, covering legacy restoration, word insertion, links, line breaks, icon preservation, sanitization, individual formatting commands, and Cancel snapshots.
- The homepage editor was exercised by inserting a new word before the original light-weight phrase, then saving and reloading. Its original bold phrase remained intact.
- Bold, Italic, and Underline were applied together to one selected word. The saved payload contained all three tags and retained the separate original `strong` phrase.
- Desktop and 390px mobile editor layouts were inspected.

Run `node scripts/serve-cms-test.mjs`, open `http://127.0.0.1:4174/__richtext-tests__/`, and click “Run formatting checks” to repeat the DOM regression suite. The fixture and test page are outside `dist/` and are never deployed to HostGator.
