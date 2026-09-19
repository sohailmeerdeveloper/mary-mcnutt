-- Mary McNutt visual CMS
-- Run once in the Supabase SQL editor for project hqltzxmqrowllxcvejwe.

create extension if not exists pgcrypto;

create table if not exists public.cms_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_pages (
  path text primary key,
  title text not null,
  kind text not null default 'page' check (kind in ('page', 'article', 'system')),
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_content (
  page_path text not null references public.cms_pages(path) on delete cascade,
  element_key text not null,
  element_type text not null check (element_type in ('text', 'button', 'image')),
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  primary key (page_path, element_key)
);

create table if not exists public.cms_blocks (
  id uuid primary key default gen_random_uuid(),
  page_path text not null references public.cms_pages(path) on delete cascade,
  position integer not null default 0,
  kind text not null check (kind in ('title', 'subheading', 'text', 'image', 'button')),
  content jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.cms_media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  alt_text text not null default '',
  data_url text not null,
  width integer,
  height integer,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

create table if not exists public.cms_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subheading text not null default '',
  excerpt text not null default '',
  image_url text,
  image_alt text not null default '',
  body jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

create index if not exists cms_blocks_page_position_idx on public.cms_blocks(page_path, position);
create index if not exists cms_posts_published_idx on public.cms_posts(status, published_at desc);

create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.cms_admins where user_id = auth.uid()
  );
$$;

revoke all on function public.is_cms_admin() from public;
grant execute on function public.is_cms_admin() to authenticated;

alter table public.cms_admins enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_content enable row level security;
alter table public.cms_blocks enable row level security;
alter table public.cms_media enable row level security;
alter table public.cms_posts enable row level security;

drop policy if exists "Admins can view their access" on public.cms_admins;
create policy "Admins can view their access" on public.cms_admins
for select to authenticated using (user_id = auth.uid());

drop policy if exists "Public pages are readable" on public.cms_pages;
create policy "Public pages are readable" on public.cms_pages
for select to anon, authenticated using (published or public.is_cms_admin());
drop policy if exists "Admins manage pages" on public.cms_pages;
create policy "Admins manage pages" on public.cms_pages
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Content overrides are readable" on public.cms_content;
create policy "Content overrides are readable" on public.cms_content
for select to anon, authenticated using (true);
drop policy if exists "Admins manage content overrides" on public.cms_content;
create policy "Admins manage content overrides" on public.cms_content
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Published blocks are readable" on public.cms_blocks;
create policy "Published blocks are readable" on public.cms_blocks
for select to anon, authenticated using (published or public.is_cms_admin());
drop policy if exists "Admins manage blocks" on public.cms_blocks;
create policy "Admins manage blocks" on public.cms_blocks
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Media is readable" on public.cms_media;
create policy "Media is readable" on public.cms_media
for select to anon, authenticated using (true);
drop policy if exists "Admins manage media" on public.cms_media;
create policy "Admins manage media" on public.cms_media
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Published posts are readable" on public.cms_posts;
create policy "Published posts are readable" on public.cms_posts
for select to anon, authenticated using (status = 'published' or public.is_cms_admin());
drop policy if exists "Admins manage posts" on public.cms_posts;
create policy "Admins manage posts" on public.cms_posts
for all to authenticated using (public.is_cms_admin()) with check (public.is_cms_admin());

grant select on public.cms_pages, public.cms_content, public.cms_blocks, public.cms_media, public.cms_posts to anon;
grant select, insert, update, delete on public.cms_pages, public.cms_content, public.cms_blocks, public.cms_media, public.cms_posts to authenticated;
grant select on public.cms_admins to authenticated;

insert into public.cms_pages (path, title, kind) values
('/', 'Home', 'page'),
('/about/', 'About Mary', 'page'),
('/coaching/', 'Coaching', 'page'),
('/pricing/', 'Pricing', 'page'),
('/contact/', 'Contact', 'page'),
('/blog/', 'Blog', 'page'),
('/blog/aloha-from-mumbai/', 'Greetings from Mumbai', 'article'),
('/blog/beautiful-transformation/', 'Beautiful Transformation', 'article'),
('/blog/stages-of-addiction/', 'Stages of Addiction', 'article'),
('/blog/understanding-addiction/', 'Understanding Addiction', 'article'),
('/blog/what-is-an-intervention/', 'What Is an Intervention?', 'article'),
('/center-for-excellence/', 'Center for Excellence', 'page'),
('/services/', 'Services', 'page'),
('/services/compulsive-shopping/', 'Compulsive Shopping', 'page'),
('/services/conflict-resolution/', 'Conflict Resolution', 'page'),
('/services/couples-intensive-coaching/', 'Couples Intensive Coaching', 'page'),
('/services/drug-prevention-classes/', 'Drug Prevention Classes', 'page'),
('/services/eating-disorders/', 'Eating Disorders', 'page'),
('/services/family-coaching/', 'Family Coaching', 'page'),
('/services/family-of-origin-healing/', 'Family of Origin Healing', 'page'),
('/services/financial-disorder/', 'Financial Disorder', 'page'),
('/services/grief-and-loss/', 'Grief and Loss', 'page'),
('/services/interventions/', 'Interventions', 'page'),
('/services/parenting-support/', 'Parenting Support', 'page'),
('/services/personal-development-business-growth/', 'Personal Development & Business Growth', 'page'),
('/services/problem-compulsive-gambling/', 'Problem & Compulsive Gambling', 'page'),
('/services/process-addictions/', 'Process Addictions', 'page'),
('/services/relapse-prevention/', 'Relapse Prevention', 'page'),
('/services/relationship-grief-trauma/', 'Relationship, Grief & Trauma', 'page'),
('/services/sober-companion-services/', 'Sober Companion Services', 'page'),
('/services/trauma-resolution/', 'Trauma Resolution', 'page'),
('/services/womens-issues/', 'Women''s Issues', 'page'),
('/resources/', 'Resources', 'page'),
('/resources/serenity-prayer/', 'Serenity Prayer', 'page'),
('/resources/the-12-steps/', 'The 12 Steps', 'page'),
('/resources/the-twelve-traditions/', 'The Twelve Traditions', 'page'),
('/privacy-policy/', 'Privacy Policy', 'system'),
('/disclaimer/', 'Disclaimer', 'system')
on conflict (path) do update set title = excluded.title, kind = excluded.kind;

-- If the initial Auth user already exists, grant it CMS access.
insert into public.cms_admins (user_id, email)
select id, email from auth.users
where lower(email) = lower('Mary@MaryMcNutt.com')
on conflict (user_id) do update set email = excluded.email;

