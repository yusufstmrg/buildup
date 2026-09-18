import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Assessment_Key {
  id: UUIDString;
  __typename?: 'Assessment_Key';
}

export interface BusinessGenome_Key {
  id: UUIDString;
  __typename?: 'BusinessGenome_Key';
}

export interface BusinessProfile_Key {
  id: UUIDString;
  __typename?: 'BusinessProfile_Key';
}

export interface CreateInitiativeData {
  initiative_insert: Initiative_Key;
}

export interface CreateInitiativeVariables {
  orgId: UUIDString;
  title: string;
  description?: string | null;
  department: string;
  ownerId: string;
  expectedRoi?: number | null;
}

export interface CreateOrganizationData {
  org: Organization_Key;
  mem: Membership_Key;
}

export interface CreateOrganizationVariables {
  name: string;
  uid: string;
}

export interface GetBusinessGenomeData {
  businessGenomes: ({
    id: UUIDString;
    dimension: string;
    metricKey: string;
    metricValue?: number | null;
    confidence: number;
    provenance?: string | null;
    lastUpdated: TimestampString;
  } & BusinessGenome_Key)[];
}

export interface GetBusinessGenomeVariables {
  orgId: UUIDString;
}

export interface GetBusinessProfileData {
  businessProfiles: ({
    id: UUIDString;
    industry: string;
    revenueRange?: string | null;
    headcount?: number | null;
    currency: string;
  } & BusinessProfile_Key)[];
}

export interface GetBusinessProfileVariables {
  orgId: UUIDString;
}

export interface GetInitiativesData {
  initiatives: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    status: string;
    expectedRoi?: number | null;
    department: string;
    owner: {
      displayName?: string | null;
      email: string;
    };
  } & Initiative_Key)[];
}

export interface GetInitiativesVariables {
  orgId: UUIDString;
}

export interface GetUserOrganizationsData {
  memberships: ({
    id: UUIDString;
    role: string;
    organization: {
      id: UUIDString;
      name: string;
      createdAt: TimestampString;
    } & Organization_Key;
  } & Membership_Key)[];
}

export interface GetUserOrganizationsVariables {
  uid: string;
}

export interface Initiative_Key {
  id: UUIDString;
  __typename?: 'Initiative_Key';
}

export interface Membership_Key {
  id: UUIDString;
  __typename?: 'Membership_Key';
}

export interface Organization_Key {
  id: UUIDString;
  __typename?: 'Organization_Key';
}

export interface UpdateGenomeMetricData {
  businessGenome_insert: BusinessGenome_Key;
}

export interface UpdateGenomeMetricVariables {
  orgId: UUIDString;
  dimension: string;
  metricKey: string;
  metricValue: number;
  provenance?: string | null;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface CreateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
  operationName: string;
}
export const createOrganizationRef: CreateOrganizationRef;

export function createOrganization(vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;
export function createOrganization(dc: DataConnect, vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface UpdateGenomeMetricRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGenomeMetricVariables): MutationRef<UpdateGenomeMetricData, UpdateGenomeMetricVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateGenomeMetricVariables): MutationRef<UpdateGenomeMetricData, UpdateGenomeMetricVariables>;
  operationName: string;
}
export const updateGenomeMetricRef: UpdateGenomeMetricRef;

export function updateGenomeMetric(vars: UpdateGenomeMetricVariables): MutationPromise<UpdateGenomeMetricData, UpdateGenomeMetricVariables>;
export function updateGenomeMetric(dc: DataConnect, vars: UpdateGenomeMetricVariables): MutationPromise<UpdateGenomeMetricData, UpdateGenomeMetricVariables>;

interface CreateInitiativeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInitiativeVariables): MutationRef<CreateInitiativeData, CreateInitiativeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateInitiativeVariables): MutationRef<CreateInitiativeData, CreateInitiativeVariables>;
  operationName: string;
}
export const createInitiativeRef: CreateInitiativeRef;

export function createInitiative(vars: CreateInitiativeVariables): MutationPromise<CreateInitiativeData, CreateInitiativeVariables>;
export function createInitiative(dc: DataConnect, vars: CreateInitiativeVariables): MutationPromise<CreateInitiativeData, CreateInitiativeVariables>;

interface GetUserOrganizationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserOrganizationsVariables): QueryRef<GetUserOrganizationsData, GetUserOrganizationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserOrganizationsVariables): QueryRef<GetUserOrganizationsData, GetUserOrganizationsVariables>;
  operationName: string;
}
export const getUserOrganizationsRef: GetUserOrganizationsRef;

export function getUserOrganizations(vars: GetUserOrganizationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserOrganizationsData, GetUserOrganizationsVariables>;
export function getUserOrganizations(dc: DataConnect, vars: GetUserOrganizationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserOrganizationsData, GetUserOrganizationsVariables>;

interface GetBusinessProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBusinessProfileVariables): QueryRef<GetBusinessProfileData, GetBusinessProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetBusinessProfileVariables): QueryRef<GetBusinessProfileData, GetBusinessProfileVariables>;
  operationName: string;
}
export const getBusinessProfileRef: GetBusinessProfileRef;

export function getBusinessProfile(vars: GetBusinessProfileVariables, options?: ExecuteQueryOptions): QueryPromise<GetBusinessProfileData, GetBusinessProfileVariables>;
export function getBusinessProfile(dc: DataConnect, vars: GetBusinessProfileVariables, options?: ExecuteQueryOptions): QueryPromise<GetBusinessProfileData, GetBusinessProfileVariables>;

interface GetBusinessGenomeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBusinessGenomeVariables): QueryRef<GetBusinessGenomeData, GetBusinessGenomeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetBusinessGenomeVariables): QueryRef<GetBusinessGenomeData, GetBusinessGenomeVariables>;
  operationName: string;
}
export const getBusinessGenomeRef: GetBusinessGenomeRef;

export function getBusinessGenome(vars: GetBusinessGenomeVariables, options?: ExecuteQueryOptions): QueryPromise<GetBusinessGenomeData, GetBusinessGenomeVariables>;
export function getBusinessGenome(dc: DataConnect, vars: GetBusinessGenomeVariables, options?: ExecuteQueryOptions): QueryPromise<GetBusinessGenomeData, GetBusinessGenomeVariables>;

interface GetInitiativesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInitiativesVariables): QueryRef<GetInitiativesData, GetInitiativesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetInitiativesVariables): QueryRef<GetInitiativesData, GetInitiativesVariables>;
  operationName: string;
}
export const getInitiativesRef: GetInitiativesRef;

export function getInitiatives(vars: GetInitiativesVariables, options?: ExecuteQueryOptions): QueryPromise<GetInitiativesData, GetInitiativesVariables>;
export function getInitiatives(dc: DataConnect, vars: GetInitiativesVariables, options?: ExecuteQueryOptions): QueryPromise<GetInitiativesData, GetInitiativesVariables>;

