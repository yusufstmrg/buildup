import { adminDb } from '../lib/firebase-admin.ts';
import { KnowledgeNode, KnowledgeEdge, BenchmarkSet } from './schema.ts';

export async function getKnowledgeGraph(): Promise<{ nodes: KnowledgeNode[], edges: KnowledgeEdge[] }> {
  const nodesSnap = await adminDb.collection('knowledge_nodes').get();
  const edgesSnap = await adminDb.collection('knowledge_edges').get();

  return {
    nodes: nodesSnap.docs.map(d => d.data() as KnowledgeNode),
    edges: edgesSnap.docs.map(d => d.data() as KnowledgeEdge)
  };
}

export async function getBenchmarks(industry: string): Promise<BenchmarkSet[]> {
  const snapshot = await adminDb
    .collection('benchmarks')
    .where('industry', '==', industry)
    .get();

  return snapshot.docs.map(doc => doc.data() as BenchmarkSet);
}