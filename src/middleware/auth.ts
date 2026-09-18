import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../lib/firebase-admin.ts';
import { DecodedIdToken } from 'firebase-admin/auth';

export interface AuthRequest extends Request {
  user?: DecodedIdToken;
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export const requireAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // First ensure they are authenticated
  await requireAuth(req, res, async () => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const { adminDb } = await import('../lib/firebase-admin.ts');
      const userSnap = await adminDb.collection('users').doc(req.user.uid).get();
      if (!userSnap.exists || userSnap.data()?.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
      }
      next();
    } catch (err) {
      console.error('Admin check failed:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
};
