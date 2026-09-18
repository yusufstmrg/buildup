import { adminDb } from '../lib/firebase-admin.ts';
import { BusinessGenome } from './schema.ts';

export async function getBusinessGenome(orgId: string): Promise<BusinessGenome | null> {
  const snapshot = await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('genomes')
    .orderBy('version', 'desc')
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as BusinessGenome;
}

export async function updateBusinessGenome(orgId: string, updates: Partial<BusinessGenome>): Promise<BusinessGenome> {
  const current = await getBusinessGenome(orgId);
  const newVersion = current ? current.version + 1 : 1;
  
  const newGenome: BusinessGenome = {
    orgId,
    version: newVersion,
    updatedAt: new Date().toISOString(),
    businessModel: updates.businessModel || current?.businessModel || '',
    coreWorkflows: updates.coreWorkflows || current?.coreWorkflows || [],
    keyRisks: updates.keyRisks || current?.keyRisks || [],
    strategicObjectives: updates.strategicObjectives || current?.strategicObjectives || [],
    supplyChainStructure: updates.supplyChainStructure || current?.supplyChainStructure,
    competitors: updates.competitors || current?.competitors,
    marketPosition: updates.marketPosition || current?.marketPosition,
  };

  await adminDb
    .collection('organizations')
    .doc(orgId)
    .collection('genomes')
    .doc(`v${newVersion}`)
    .set(newGenome);

  return newGenome;
}