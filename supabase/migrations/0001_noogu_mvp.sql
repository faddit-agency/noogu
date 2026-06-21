-- NOOGU MVP / Supabase PostgreSQL schema
create extension if not exists "pgcrypto";
create extension if not exists "citext";

create type public.event_visibility as enum ('public', 'private', 'approval');
create type public.participant_status as enum ('pending', 'approved', 'rejected', 'checked_in');
create type public.connection_status as enum ('pending', 'connected', 'blocked');
create type public.email_status as enum ('queued', 'sent', 'failed');
create type public.org_role as enum ('owner', 'admin', 'staff', 'viewer');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext not null unique,
  display_name text,
  avatar_url text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  handle citext not null unique check (handle ~ '^[a-z0-9][a-z0-9_-]{2,29}$'),
  name text not null,
  company text,
  job_title text,
  phone text,
  public_email citext,
  website text,
  sns jsonb not null default '{}'::jsonb,
  headline text check (char_length(headline) <= 120),
  bio text check (char_length(bio) <= 2000),
  business_card_front_url text,
  business_card_back_url text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug citext not null unique,
  logo_url text,
  brand_color text check (brand_color is null or brand_color ~ '^#[0-9A-Fa-f]{6}$'),
  created_by uuid not null references public.users(id),
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role public.org_role not null default 'staff',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  slug citext not null unique,
  name text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at > starts_at),
  venue_name text,
  venue_address text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  cover_image_url text,
  logo_url text,
  brand_color text check (brand_color is null or brand_color ~ '^#[0-9A-Fa-f]{6}$'),
  visibility public.event_visibility not null default 'approval',
  landing_content jsonb not null default '{"program":[],"faq":[],"contact":{}}'::jsonb,
  published_at timestamptz,
  created_by uuid not null references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.event_participants (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  name text not null,
  company text,
  job_title text,
  email citext not null,
  phone text,
  interests text[] not null default '{}',
  introduction text,
  business_card_url text,
  status public.participant_status not null default 'pending',
  checkin_token_hash text not null default encode(gen_random_bytes(32), 'hex'),
  networking_token_hash text not null default encode(gen_random_bytes(32), 'hex'),
  approved_by uuid references public.users(id),
  approved_at timestamptz,
  rejected_reason text,
  applied_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (event_id, email)
);

create table public.event_checkins (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  participant_id uuid not null references public.event_participants(id) on delete cascade,
  checked_in_by uuid not null references public.users(id),
  method text not null default 'qr' check (method in ('qr', 'manual')),
  checked_in_at timestamptz not null default now(),
  unique (event_id, participant_id)
);

create table public.connections (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  requester_id uuid not null references public.users(id) on delete cascade,
  recipient_id uuid not null references public.users(id) on delete cascade,
  status public.connection_status not null default 'connected',
  venue_snapshot text,
  connected_at timestamptz not null default now(),
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  check (requester_id <> recipient_id)
);

create unique index connections_unique_pair_event
on public.connections (least(requester_id, recipient_id), greatest(requester_id, recipient_id), coalesce(event_id, '00000000-0000-0000-0000-000000000000'::uuid));
create index connections_requester_idx on public.connections(requester_id, connected_at desc);
create index connections_recipient_idx on public.connections(recipient_id, connected_at desc);

create table public.connection_notes (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null references public.connections(id) on delete cascade,
  author_id uuid not null references public.users(id) on delete cascade,
  body text not null check (char_length(body) <= 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(connection_id, author_id)
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 30),
  color text,
  created_at timestamptz not null default now(),
  unique(owner_id, name)
);

create table public.connection_tags (
  connection_id uuid not null references public.connections(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  tagged_by uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(connection_id, tag_id, tagged_by)
);

create table public.emails (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  recipient citext not null,
  template text not null,
  payload jsonb not null default '{}'::jsonb,
  provider_message_id text,
  status public.email_status not null default 'queued',
  sent_at timestamptz,
  error text,
  created_at timestamptz not null default now()
);

create table public.activity_logs (
  id bigint generated always as identity primary key,
  organization_id uuid references public.organizations(id) on delete cascade,
  actor_id uuid references public.users(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_hash text,
  created_at timestamptz not null default now()
);

-- Utility functions
create or replace function public.is_org_member(org_id uuid, minimum_role public.org_role default 'viewer')
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.organization_members m
    where m.organization_id = org_id and m.user_id = auth.uid()
    and case minimum_role
      when 'viewer' then m.role in ('viewer','staff','admin','owner')
      when 'staff' then m.role in ('staff','admin','owner')
      when 'admin' then m.role in ('admin','owner')
      when 'owner' then m.role = 'owner'
    end
  );
$$;

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users(id, email, display_name)
  values(new.id, new.email, coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)));
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.handle_new_organization() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.organization_members(organization_id, user_id, role) values(new.id, new.created_by, 'owner');
  return new;
end;
$$;
create trigger on_organization_created after insert on public.organizations for each row execute function public.handle_new_organization();

create or replace function public.handle_checkin() returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.event_participants set status = 'checked_in' where id = new.participant_id and status = 'approved';
  return new;
end;
$$;
create trigger on_participant_checkin after insert on public.event_checkins for each row execute function public.handle_checkin();

create or replace function public.queue_participant_status_email() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.status is distinct from old.status and new.status in ('approved', 'rejected') then
    insert into public.emails(event_id, recipient, template, payload)
    values(new.event_id, new.email, 'participant_' || new.status::text, jsonb_build_object('participantId', new.id, 'name', new.name));
  end if;
  return new;
end;
$$;
create trigger on_participant_status_changed after update on public.event_participants for each row execute function public.queue_participant_status_email();

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger users_touch before update on public.users for each row execute function public.touch_updated_at();
create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();
create trigger events_touch before update on public.events for each row execute function public.touch_updated_at();
create trigger participants_touch before update on public.event_participants for each row execute function public.touch_updated_at();
create trigger notes_touch before update on public.connection_notes for each row execute function public.touch_updated_at();

-- RLS
alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.events enable row level security;
alter table public.event_participants enable row level security;
alter table public.event_checkins enable row level security;
alter table public.connections enable row level security;
alter table public.connection_notes enable row level security;
alter table public.tags enable row level security;
alter table public.connection_tags enable row level security;
alter table public.emails enable row level security;
alter table public.activity_logs enable row level security;

create policy users_self_select on public.users for select using (id = auth.uid());
create policy users_self_update on public.users for update using (id = auth.uid()) with check (id = auth.uid());
create policy profiles_public_read on public.profiles for select using (is_public or user_id = auth.uid());
create policy profiles_self_write on public.profiles for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy organizations_member_read on public.organizations for select using (public.is_org_member(id));
create policy organizations_owner_write on public.organizations for all using (public.is_org_member(id, 'owner')) with check (created_by = auth.uid());
create policy members_member_read on public.organization_members for select using (public.is_org_member(organization_id));
create policy members_admin_write on public.organization_members for all using (public.is_org_member(organization_id, 'admin')) with check (public.is_org_member(organization_id, 'admin'));

create policy events_public_or_member_read on public.events for select using ((published_at is not null and visibility <> 'private') or public.is_org_member(organization_id));
create policy events_admin_insert on public.events for insert with check (public.is_org_member(organization_id, 'admin') and created_by = auth.uid());
create policy events_admin_update on public.events for update using (public.is_org_member(organization_id, 'admin')) with check (public.is_org_member(organization_id, 'admin'));
create policy events_admin_delete on public.events for delete using (public.is_org_member(organization_id, 'admin'));

create policy participants_self_or_staff_read on public.event_participants for select using (
  user_id = auth.uid() or exists(select 1 from public.events e where e.id=event_id and public.is_org_member(e.organization_id,'staff'))
);
create policy participants_public_apply on public.event_participants for insert with check (status = 'pending' and (user_id is null or user_id = auth.uid()));
create policy participants_self_update_pending on public.event_participants for update using (user_id = auth.uid() and status = 'pending');
create policy participants_staff_update on public.event_participants for update using (exists(select 1 from public.events e where e.id=event_id and public.is_org_member(e.organization_id,'staff')));

create policy checkins_self_or_staff_read on public.event_checkins for select using (
  exists(select 1 from public.event_participants p where p.id=participant_id and p.user_id=auth.uid())
  or exists(select 1 from public.events e where e.id=event_id and public.is_org_member(e.organization_id,'staff'))
);
create policy checkins_staff_insert on public.event_checkins for insert with check (
  checked_in_by=auth.uid() and exists(select 1 from public.events e where e.id=event_id and public.is_org_member(e.organization_id,'staff'))
);

create policy connections_party_access on public.connections for select using (requester_id=auth.uid() or recipient_id=auth.uid());
create policy connections_request on public.connections for insert with check (requester_id=auth.uid());
create policy connections_party_update on public.connections for update using (requester_id=auth.uid() or recipient_id=auth.uid());
create policy notes_author_access on public.connection_notes for all using (author_id=auth.uid()) with check (
  author_id=auth.uid() and exists(select 1 from public.connections c where c.id=connection_id and (c.requester_id=auth.uid() or c.recipient_id=auth.uid()))
);
create policy tags_owner_access on public.tags for all using (owner_id=auth.uid()) with check (owner_id=auth.uid());
create policy connection_tags_owner_access on public.connection_tags for all using (tagged_by=auth.uid()) with check (tagged_by=auth.uid());
create policy emails_staff_read on public.emails for select using (exists(select 1 from public.events e where e.id=event_id and public.is_org_member(e.organization_id,'staff')));
create policy activity_admin_read on public.activity_logs for select using (public.is_org_member(organization_id,'admin'));

-- Storage buckets and policies
insert into storage.buckets (id, name, public) values
  ('avatars', 'avatars', true), ('event-assets', 'event-assets', true),
  ('business-cards', 'business-cards', false), ('exports', 'exports', false), ('nametags', 'nametags', false)
on conflict (id) do nothing;

create policy avatars_public_read on storage.objects for select using (bucket_id = 'avatars');
create policy avatars_owner_write on storage.objects for all using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy event_assets_public_read on storage.objects for select using (bucket_id = 'event-assets');
create policy event_assets_staff_write on storage.objects for all using (
  bucket_id = 'event-assets' and public.is_org_member(((storage.foldername(name))[1])::uuid, 'staff')
) with check (bucket_id = 'event-assets' and public.is_org_member(((storage.foldername(name))[1])::uuid, 'staff'));
create policy business_cards_owner_access on storage.objects for all using (bucket_id = 'business-cards' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'business-cards' and (storage.foldername(name))[1] = auth.uid()::text);
create policy exports_owner_read on storage.objects for select using (bucket_id = 'exports' and (storage.foldername(name))[1] = auth.uid()::text);
create policy nametags_staff_read on storage.objects for select using (
  bucket_id = 'nametags' and public.is_org_member(((storage.foldername(name))[1])::uuid, 'staff')
);
