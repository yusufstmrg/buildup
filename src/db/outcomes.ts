import { adminDb } from '../lib/firebase-admin.ts';
import { OutcomeLedgerRecord } from './schema.ts';
import * as crypto from 'crypto';

export async function recordOutcome(
  orgId: string, 
  data: Omit<OutcomeLedgerRecord, 'id' | 'orgId' | 'recordedAt'>
): Promise<OutcomeLedgerRecord> {
  const id = `out_${crypto.randomUUID()}`;
  
  const outcome: OutcomeLedgerRecord = {
    ...data,
    id,
    orgId,
    recordedAt: new Date().toISOString()
  };

  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('outcomes')
    .doc(id)
    .set(outcome);

  return outcome;
}

export async function getOutcomes(orgId: string): Promise<OutcomeLedgerRecord[]> {
  const snapshot = await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('outcomes')
    .orderBy('recordedAt', 'desc')
    .get();

  return snapshot.docs.map(doc => doc.data() as OutcomeLedgerRecord);
}
