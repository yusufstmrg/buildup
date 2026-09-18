import { adminDb } from '../lib/firebase-admin.ts';
import { DataConnector, ConnectorStatus, SyncJob } from './schema.ts';
import * as crypto from 'crypto';

export async function registerConnector(
  orgId: string, 
  type: DataConnector['type'], 
  name: string, 
  config: Record<string, any>
): Promise<DataConnector> {
  const connectorId = `conn_${crypto.randomUUID()}`;
  const connector: DataConnector = {
    id: connectorId,
    orgId,
    type,
    name,
    status: 'connected',
    config, // In a real app, encrypt sensitive fields here
    createdAt: new Date().toISOString()
  };

  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('connectors')
    .doc(connectorId)
    .set(connector);

  return connector;
}

export async function updateConnectorStatus(
  orgId: string, 
  connectorId: string, 
  status: ConnectorStatus
) {
  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('connectors')
    .doc(connectorId)
    .update({ status });
}

export async function logSyncJob(
  orgId: string, 
  connectorId: string, 
  status: SyncJob['status'], 
  recordsProcessed: number, 
  errorLog?: string
): Promise<SyncJob> {
  const jobId = `sync_${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  
  const job: SyncJob = {
    id: jobId,
    orgId,
    connectorId,
    status,
    recordsProcessed,
    startedAt: now,
    completedAt: status === 'success' || status === 'failed' ? now : undefined,
    errorLog
  };

  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('sync_jobs')
    .doc(jobId)
    .set(job);

  if (status === 'success') {
    await adminDb
      .collection('organizations')
      .doc(orgId)
      .collection('connectors')
      .doc(connectorId)
      .update({ lastSyncAt: now, status: 'connected' });
  }

  return job;
}
