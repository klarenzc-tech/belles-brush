-- Belle's Brush — starter schema for Phase 2 (NOT used in Version 1)
-- Mirrors src/types/content.ts so src/lib/content.ts can switch to Supabase
-- without changing any page.

create type artwork_category as enum ('landscapes', 'mountains-forests', 'water-reflections', 'creative-explorations');
create type artwork_availability as enum ('available', 'sold', 'not-for-sale', 'private-collection');
create type content_status as enum ('draft', 'published');

create table artworks (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  category      artwork_category not null,
  excerpt       text not null,
  story         text[] not null default '{}',
  medium        text,
  dimensions    text,
  year          int,
  availability  artwork_availability,
  image_path    text,           -- Supabase Storage path
  image_width   int,
  image_height  int,
  alt           text not null,
  featured      boolean not null default false,
  status        content_status not null default 'draft',
  published_at  date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table posts (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  excerpt          text not null,
  body             jsonb not null default '[]',  -- array of {type, text, cite?} blocks
  tags             text[] not null default '{}',
  reading_minutes  int not null default 3,
  cover_path       text,
  cover_alt        text not null default '',
  status           content_status not null default 'draft',
  published_at     date,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text not null,
  message     text not null,
  artwork_id  uuid references artworks(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- Public can read published content only; writes are for authenticated admins.
alter table artworks  enable row level security;
alter table posts     enable row level security;
alter table enquiries enable row level security;

create policy "Published artworks are public" on artworks for select using (status = 'published');
create policy "Published posts are public"    on posts    for select using (status = 'published');
-- Add admin policies (e.g. based on an `is_admin` claim) when authentication is introduced.
