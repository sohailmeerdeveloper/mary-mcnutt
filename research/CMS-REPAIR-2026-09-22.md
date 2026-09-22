# CMS repair verification — September 22, 2026

## Cause and deployment

The homepage editor normalized `/` to `//`. The database registers the homepage as `/`, so content upserts failed the page foreign key with SQLSTATE 23503. This was reproduced on https://marymcnutt.com/?cms-edit=1 after a fresh administrator login. The database was reachable and the administrator membership check passed.

The repair normalizes `/`, `/index.html`, and directory index aliases correctly. It was pushed to GitHub `main` and deployed by the existing HostGator FTP workflow. No database migration or expanded database permissions were needed.

## Related fixes

- A shared client renews expired sessions before authenticated page, media, and blog requests; concurrent refreshes share one request, with a browser lock across tabs where supported.
- A rejected access token gets one refresh/retry. Permission failures retain the edit and report the failure.
- Saves request database confirmation instead of reporting success after an unverified empty response.
- Image saves use the assigned source rather than a potentially stale `currentSrc`, and cannot save while the replacement image is being prepared.
- New page blocks use seconds for their integer position instead of an overflowing millisecond timestamp.
- Blog title edits retain the existing URL and publication timestamp. Article pictures can be removed.
- Sign-out sends the session token. Errors distinguish setup, access, duplicate article addresses, and network failures.

## Checks completed

Seven automated client/path regression tests pass with `node --test scripts/test-cms-client.mjs`. JavaScript syntax and Git whitespace checks pass.

Browser checks against the local, in-memory fixture (`node scripts/serve-cms-test.mjs`, port 4174) verified:

- Session renewal, text save, and persistence after reload.
- Photo upload/replacement and deletion, both persisting after reload.
- Media-library upload and deletion.
- Blog draft creation, editing, publishing, public listing, article rendering, and URL stability after a title edit.
- Adding a block and persistence after reload.

Live checks verified:

- Saving the homepage testimonial succeeds; the original public wording was retained.
- Saving the homepage image succeeds; its original source and description were retained.
- Anonymous database reads confirm both saved homepage records.
- Creating and editing an unpublished blog draft persist after reload.
- Anonymous requests cannot read the draft (zero post rows returned).

The live blog library contains one clearly labeled `CMS verification — unpublished draft` used for these checks. It was never published. Public blog publishing and destructive image changes were exercised in the local fixture, not against visitor-facing production content.
