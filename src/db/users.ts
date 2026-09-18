import { adminDb } from '../lib/firebase-admin.ts';

export async function getOrCreateUser(uid: string, email: string, name: string) {
  const userRef = adminDb.collection('users').doc(uid);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    // Create new user
    const newUser = {
      id: uid,
      email,
      name,
      createdAt: new Date().toISOString()
    };
    await userRef.set(newUser);
    return newUser;
  }
  return userSnap.data();
}

export async function getAllUsers() {
  const snapshot = await adminDb.collection('users').get();
  return snapshot.docs.map(doc => doc.data());
}

export async function createOrganization(orgId: string, name: string, ownerUid: string) {
  const orgRef = adminDb.collection('organizations').doc(orgId);
  const orgData = {
    id: orgId,
    name,
    createdAt: new Date().toISOString()
  };
  await orgRef.set(orgData);

  // Create membership
  const membershipRef = adminDb.collection('memberships').doc(`${ownerUid}_${orgId}`);
  await membershipRef.set({
    userId: ownerUid,
    orgId: orgId,
    role: 'owner',
    joinedAt: new Date().toISOString()
  });

  return orgData;
}

export async function getOrganizationsForUser(uid: string) {
  const membershipsSnap = await adminDb
    .collection('memberships')
    .where('userId', '==', uid)
    .get();
  
  if (membershipsSnap.empty) return [];
  
  const orgIds = membershipsSnap.docs.map(doc => doc.data().orgId);
  // Batch get organizations (assuming a user typically belongs to < 10 orgs)
  const orgs = await Promise.all(
    orgIds.map(async (orgId) => {
      const orgDoc = await adminDb.collection('organizations').doc(orgId).get();
      return orgDoc.data();
    })
  );
  
  return orgs.filter(Boolean);
}
