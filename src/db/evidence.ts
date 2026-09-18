import { adminDb } from '../lib/firebase-admin.ts';
import { Evidence } from './schema.ts';
import * as crypto from 'crypto';

export async function uploadEvidenceRecord(
  orgId: string, 
  evidence: Omit<Evidence, 'id' | 'orgId' | 'uploadedAt'>
): Promise<Evidence> {
  const id = `evd_${crypto.randomUUID()}`;
  const fullEvidence: Evidence = {
    ...evidence,
    id,
    orgId,
    uploadedAt: new Date().toISOString()
  };

  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('evidence')
    .doc(id)
    .set(fullEvidence);

  return fullEvidence;
}

export async function getEvidenceRecord(orgId: string, evidenceId: string): Promise<Evidence | null> {
  const doc = await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('evidence')
    .doc(evidenceId)
    .get();

  if (!doc.exists) return null;
  return doc.data() as Evidence;
}

export async function getAllEvidence(orgId: string): Promise<Evidence[]> {
  const snapshot = await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('evidence')
    .get();

  return snapshot.docs.map(doc => doc.data() as Evidence);
}
