import { adminDb } from '../lib/firebase-admin.ts';
import { DecisionObject } from './schema.ts';
import * as crypto from 'crypto';

export async function createDecision(
  orgId: string, 
  data: Omit<DecisionObject, 'id' | 'orgId' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<DecisionObject> {
  const id = `dec_${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  
  const decision: DecisionObject = {
    ...data,
    id,
    orgId,
    status: 'Pending',
    createdAt: now,
    updatedAt: now
  };

  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('decisions')
    .doc(id)
    .set(decision);

  return decision;
}

export async function updateDecisionStatus(
  orgId: string,
  decisionId: string,
  status: DecisionObject['status']
): Promise<void> {
  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('decisions')
    .doc(decisionId)
    .update({ 
      status, 
      updatedAt: new Date().toISOString() 
    });
}

export async function getDecisions(orgId: string): Promise<DecisionObject[]> {
  const snapshot = await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('decisions')
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map(doc => doc.data() as DecisionObject);
}