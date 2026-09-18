// src/db/schema.ts
// Canonical Domain Model for BuildUp Intelligence Platform

export interface Organization {
  id: string;
  name: string;
  industry: string;
  customIndustry?: string;
  revenueBracket: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Membership {
  userId: string;
  orgId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: string;
}

export interface BusinessGenome {
  orgId: string;
  version: number;
  updatedAt: string;
  businessModel: string;
  coreWorkflows: string[];
  keyRisks: string[];
  strategicObjectives: string[];
  supplyChainStructure?: string;
  competitors?: string[];
  marketPosition?: string;
}

export type ConnectorStatus = 'disconnected' | 'connecting' | 'connected' | 'error' | 'syncing';

export interface DataConnector {
  id: string;
  orgId: string;
  type: 'sap_s4hana' | 'oracle_netsuite' | 'xero' | 'accurate' | 'google_workspace' | 'custom_api' | 'sftp';
  name: string;
  status: ConnectorStatus;
  lastSyncAt?: string;
  config: Record<string, any>; // Encrypted or safe config metadata
  createdAt: string;
}

export interface SyncJob {
  id: string;
  orgId: string;
  connectorId: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  recordsProcessed: number;
  startedAt: string;
  completedAt?: string;
  errorLog?: string;
}

export interface Provenance {
  sourceType: 'connector' | 'manual' | 'evidence' | 'ai_inference';
  sourceId: string; // e.g., SyncJob ID or Evidence ID
  timestamp: string;
}

export interface Metric {
  id: string;
  orgId: string;
  name: string; // e.g., 'Days Sales Outstanding'
  category: 'Finance' | 'Sales' | 'Operations' | 'Procurement' | 'People' | 'Risk' | 'Technology' | 'Growth';
  value: number;
  unit: string;
  benchmarkValue?: number;
  trend?: string; // e.g., '+5%', '-2 days'
  confidenceScore: number; // 0.0 to 1.0
  provenance: Provenance;
  updatedAt: string;
}

export interface Evidence {
  id: string;
  orgId: string;
  type: 'document' | 'system_log' | 'user_upload' | 'transaction';
  title: string;
  storageUrl?: string; // URL to Google Cloud Storage
  parsedText?: string;
  classification: string;
  uploadedAt: string;
  uploadedBy?: string;
}

// ---------------------------------------------------------
// P2: AI Intelligence & Gateway Models
// ---------------------------------------------------------

export interface RootCauseNode {
  id: string;
  symptom: string;
  evidenceIds: string[];
  cause: string;
  driver: string;
  confidence: number;
}

export interface DiagnosticAssessment {
  id: string;
  orgId: string;
  type: 'health_check' | 'financial_audit' | 'operational_review';
  score: number;
  findings: string[];
  rootCauses: RootCauseNode[];
  createdAt: string;
}

export interface DecisionOption {
  label: string;
  financialImpact: string;
  risk: 'Low' | 'Medium' | 'High';
  effort: 'Low' | 'Medium' | 'High';
}

export interface DecisionObject {
  id: string;
  orgId: string;
  title: string;
  domain: string;
  problemContext: string;
  options: DecisionOption[];
  recommendation: string;
  confidence: number;
  approvalAuthority: 'Manager' | 'Director' | 'C-Level' | 'Board';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Executed';
  createdAt: string;
  updatedAt: string;
}

export interface AgentRun {
  id: string;
  orgId: string;
  taskType: string;
  modelUsed: string;
  promptTokens: number;
  completionTokens: number;
  costEstimate: number;
  durationMs: number;
  status: 'success' | 'error';
  timestamp: string;
}

// ---------------------------------------------------------
// P3: Transformation OS & Outcome Ledger Models
// ---------------------------------------------------------

export interface WorkflowTask {
  id: string;
  initiativeId: string;
  title: string;
  assignedTo?: string;
  status: 'Pending' | 'In Progress' | 'Blocked' | 'Completed' | 'Escalated';
  dueDate?: string;
  retries: number;
}

export interface Initiative {
  id: string;
  orgId: string;
  decisionId: string;
  title: string;
  owner: string;
  budget: number;
  baselineMetricId: string;
  targetValue: number;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Failed';
  tasks: WorkflowTask[];
  createdAt: string;
  updatedAt: string;
}

export interface OutcomeLedgerRecord {
  id: string;
  orgId: string;
  initiativeId: string;
  metricId: string;
  type: 'Estimated Value' | 'Realized Value' | 'Avoided Loss' | 'Cash Realized';
  currency: string;
  amount: number;
  measurementPeriodStart: string;
  measurementPeriodEnd: string;
  confidence: number;
  attributionLogic: string;
  evidenceIds: string[];
  recordedAt: string;
}

// ---------------------------------------------------------
// P4: Knowledge & Benchmarks Models
// ---------------------------------------------------------

export interface KnowledgeNode {
  id: string;
  type: 'concept' | 'metric' | 'intervention' | 'failure_mode';
  label: string;
  description: string;
  tags: string[];
}

export interface KnowledgeEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationship: 'causes' | 'mitigates' | 'requires' | 'improves';
  weight: number; // learned confidence
}

export interface BenchmarkSet {
  id: string;
  industry: string;
  metricId: string;
  period: string;
  percentiles: {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  };
  sampleSize: number;
  updatedAt: string;
}

// ---------------------------------------------------------
// P5: Commercial & Scale Models
// ---------------------------------------------------------

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  monthlyPrice: number;
  features: string[];
}

export interface Entitlement {
  id: string;
  orgId: string;
  planId: string;
  status: 'Active' | 'Past Due' | 'Canceled';
  currentPeriodEnd: string;
}

export interface MeteringLog {
  id: string;
  orgId: string;
  resourceType: 'AI_Tokens' | 'Data_Sync' | 'Workflow_Execution';
  quantity: number;
  costEstimate: number;
  timestamp: string;
}

