begin;
DO $$
declare r record;
begin
  for r in
    select policyname, tablename
    from pg_policies
    where schemaname='public' and roles='{public}' and cmd='SELECT'
      and tablename in ('agent_runs','audit_events','business_entities','business_profiles','context_relationships','decision_evidence','decisions','integration_events','intelligence_insights','memberships','organizations','partner_assignments','project_tasks','projects','score_assessments','score_answers','system_connections','workflow_runs')
  loop execute format('drop policy if exists %I on public.%I',r.policyname,r.tablename); end loop;
end $$;
create policy agent_runs_member_read_auth on public.agent_runs for select to authenticated using (is_org_member(organization_id));
create policy audit_member_read_auth on public.audit_events for select to authenticated using ((organization_id is null) or is_org_member(organization_id));
create policy business_entities_member_read_auth on public.business_entities for select to authenticated using (is_org_member(organization_id));
create policy business_profile_member_read_auth on public.business_profiles for select to authenticated using (is_org_member(organization_id));
create policy context_relationships_member_read_auth on public.context_relationships for select to authenticated using (is_org_member(organization_id));
create policy decision_evidence_member_read_auth on public.decision_evidence for select to authenticated using (exists(select 1 from public.decisions d where d.id=decision_evidence.decision_id and is_org_member(d.organization_id)));
create policy decisions_member_read_auth on public.decisions for select to authenticated using (is_org_member(organization_id));
create policy integration_events_member_read_auth on public.integration_events for select to authenticated using (is_org_member(organization_id));
create policy insights_member_read_auth on public.intelligence_insights for select to authenticated using (is_org_member(organization_id));
create policy memberships_self_read_auth on public.memberships for select to authenticated using (user_id=auth.uid());
create policy organizations_member_read_auth on public.organizations for select to authenticated using (is_org_member(id));
create policy assignments_member_read_auth on public.partner_assignments for select to authenticated using (exists(select 1 from public.projects p where p.id=partner_assignments.project_id and is_org_member(p.organization_id)));
create policy project_tasks_member_read_auth on public.project_tasks for select to authenticated using (exists(select 1 from public.projects p where p.id=project_tasks.project_id and is_org_member(p.organization_id)));
create policy projects_member_read_auth on public.projects for select to authenticated using (is_org_member(organization_id));
create policy score_member_read_auth on public.score_assessments for select to authenticated using ((organization_id is not null) and is_org_member(organization_id));
create policy score_answers_member_read_auth on public.score_answers for select to authenticated using (exists(select 1 from public.score_assessments s where s.id=score_answers.assessment_id and s.organization_id is not null and is_org_member(s.organization_id)));
create policy connections_member_read_auth on public.system_connections for select to authenticated using (is_org_member(organization_id));
create policy workflow_runs_member_read_auth on public.workflow_runs for select to authenticated using (is_org_member(organization_id));
commit;
