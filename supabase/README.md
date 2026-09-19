# Supabase CMS setup

The browser receives only the publishable key. The secret key is intentionally not stored in this repository.

1. Open the Supabase SQL Editor for project `hqltzxmqrowllxcvejwe`.
2. Run `migrations/20260919000000_cms.sql` once.
3. Confirm that the `cms_pages`, `cms_content`, `cms_blocks`, `cms_media`, `cms_posts`, and `cms_admins` tables appear.
4. Sign in at `/admin/` with the administrator account.

The migration is idempotent and can be rerun safely. Public visitors can read published CMS content; only users listed in `cms_admins` can write.

