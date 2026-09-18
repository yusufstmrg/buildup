import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, name?: string) {
  try {
    const result = await db.insert(users)
      .values({ uid, email, name: name || 'BuildUp User' })
      .onConflictDoUpdate({
        target: users.uid,
        set: { email },
      })
      .returning();
    return result[0];
  } catch (error: any) {
    console.error("Database query failed:", error);
    throw new Error(`Database query failed. Please try again later. ${error?.message || ''}`);
  }
}

export async function getAllUsers() {
  try {
    return await db.select().from(users);
  } catch (error: any) {
    console.error("Database query failed:", error);
    throw new Error(`Database query failed. ${error?.message || ''}`);
  }
}
