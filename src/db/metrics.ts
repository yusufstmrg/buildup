import { adminDb } from '../lib/firebase-admin.ts';
import { Metric } from './schema.ts';

export async function upsertMetric(orgId: string, metric: Omit<Metric, 'updatedAt'>): Promise<Metric> {
  const fullMetric: Metric = {
    ...metric,
    updatedAt: new Date().toISOString()
  };

  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('metrics')
    .doc(metric.id)
    .set(fullMetric);

  return fullMetric;
}

export async function getMetrics(orgId: string): Promise<Metric[]> {
  const snapshot = await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('metrics')
    .get();

  return snapshot.docs.map(doc => doc.data() as Metric);
}

export async function getMetric(orgId: string, metricId: string): Promise<Metric | null> {
  const doc = await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('metrics')
    .doc(metricId)
    .get();

  if (!doc.exists) return null;
  return doc.data() as Metric;
}
