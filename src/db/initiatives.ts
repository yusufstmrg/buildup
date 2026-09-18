import { adminDb } from '../lib/firebase-admin.ts';
import { Initiative, WorkflowTask } from './schema.ts';
import * as crypto from 'crypto';

export async function createInitiative(
  orgId: string, 
  data: Omit<Initiative, 'id' | 'orgId' | 'status' | 'createdAt' | 'updatedAt' | 'tasks'>
): Promise<Initiative> {
  const id = `init_${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  
  const initiative: Initiative = {
    ...data,
    id,
    orgId,
    status: 'Planning',
    tasks: [],
    createdAt: now,
    updatedAt: now
  };

  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('initiatives')
    .doc(id)
    .set(initiative);

  return initiative;
}

export async function getInitiatives(orgId: string): Promise<Initiative[]> {
  const snapshot = await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('initiatives')
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map(doc => doc.data() as Initiative);
}
