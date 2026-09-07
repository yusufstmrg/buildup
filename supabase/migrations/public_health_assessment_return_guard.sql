begin;
create policy score_public_recent_return on public.score_assessments
for select to anon
using (organization_id is null and source='web' and created_at >= now() - interval '2 minutes');
commit;
