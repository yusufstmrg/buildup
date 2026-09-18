import { adminDb } from '../lib/firebase-admin.ts';
import { Entitlement, MeteringLog } from './schema.ts';
import * as crypto from 'crypto';

export async function getEntitlement(orgId: string): Promise<Entitlement | null> {
  const snapshot = await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('entitlements')
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Entitlement;
}

export async function logMetering(
  orgId: string,
  resourceType: MeteringLog['resourceType'],
  quantity: number,
  costEstimate: number
): Promise<void> {
  const log: MeteringLog = {
    id: `log_${crypto.randomUUID()}`,
    orgId,
    resourceType,
    quantity,
    costEstimate,
    timestamp: new Date().toISOString()
  };

  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('metering_logs')
    .doc(log.id)
    .set(log);
}