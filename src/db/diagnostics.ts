import { adminDb } from '../lib/firebase-admin.ts';
import { DiagnosticAssessment } from './schema.ts';
import * as crypto from 'crypto';

export async function saveDiagnostic(
  orgId: string, 
  data: Omit<DiagnosticAssessment, 'id' | 'orgId' | 'createdAt'>
): Promise<DiagnosticAssessment> {
  const id = `diag_${crypto.randomUUID()}`;
  const diagnostic: DiagnosticAssessment = {
    ...data,
    id,
    orgId,
    createdAt: new Date().toISOString()
  };

  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('diagnostics')
    .doc(id)
    .set(diagnostic);

  return diagnostic;
}

export async function getDiagnostics(orgId: string): Promise<DiagnosticAssessment[]> {
  const snapshot = await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('diagnostics')
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map(doc => doc.data() as DiagnosticAssessment);
}