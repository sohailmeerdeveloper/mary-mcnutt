-- Register the Goldilocks Story route in the existing CMS.
-- Safe to run more than once.
insert into public.cms_pages (path, title, kind, published)
values ('/goldilocks-story/', 'The Goldilocks Story', 'page', true)
on conflict (path) do update
set title = excluded.title,
    kind = excluded.kind,
    published = excluded.published,
    updated_at = now();
