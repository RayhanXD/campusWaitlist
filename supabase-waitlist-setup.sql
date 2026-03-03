-- Run this in Supabase: SQL Editor → New query.
-- Create the table first in Table Editor (see README below), then run this script.
--
-- If you get "permission denied for schema public" on CREATE TABLE:
-- 1. In Supabase Dashboard go to Table Editor → New table.
-- 2. Name: waitlist
-- 3. Add columns:
--    - id (type: uuid, Primary key, Default value: gen_random_uuid())
--    - full_name (type: text, Not null)
--    - phone_number (type: text, Not null)
--    - created_at (type: timestamptz, Default value: now())
-- 4. Save. Then run this SQL (no CREATE TABLE needed).

-- Grant table permissions to anon
grant usage on schema public to anon;
grant insert on public.waitlist to anon;
grant select on public.waitlist to anon;

-- Enable RLS
alter table public.waitlist enable row level security;

-- Policies for anon
drop policy if exists "Allow anon to insert waitlist" on public.waitlist;
drop policy if exists "Allow anon to select waitlist" on public.waitlist;

create policy "Allow anon to insert waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);

create policy "Allow anon to select waitlist"
  on public.waitlist
  for select
  to anon
  using (true);
