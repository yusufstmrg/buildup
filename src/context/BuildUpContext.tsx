import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS, COMPREHENSIVE_INDUSTRIES, IndustryOption } from '../lib/i18n';
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface DecisionObject {
  id: string;
  code: string;
  title: string;
  domain: 'Procurement' | 'Finance' | 'Operations' | 'Sales' | 'Tax & Compliance' | 'Lainnya' | 'Risk';
  problem: string;
  evidence: string[];
  options: { label: string; impact: string; risk: 'Low' | 'Medium' | 'High' }[];
  financialImpact: string;
  confidence: number;
  recommendation: string;
  authority: string;
  status: 'Pending Review' | 'Approved' | 'Executed' | 'Escalated to Expert';
  timestamp: string;
  agent: string;
}

export interface HealthDimension {
  name: string;
  score: number;
  benchmark: number;
  status: 'Critical' | 'Warning' | 'Healthy' | 'Optimized';
  findings: string;
  bottleneck: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  companyName: string;
  industry: string;
  customIndustry?: string;
  revenueBracket: string;
  employeeCount?: string;
  connectedERP?: string;
  isSandbox: boolean;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  login: (email: string, password?: string, asDemo?: boolean) => Promise<void>;
  plan: UserSubscriptionInfo['planId'];
}

export interface UsageMetric {
  used: number;
  limit: number;
  label: string;
}

export interface UserSubscriptionInfo {
  planId: 'snapshot' | 'health-check' | 'starter' | 'business' | 'growth' | 'scale' | 'enterprise';
  planName: string;
  metrics: {
    aiInsights: UsageMetric;
    integrations: UsageMetric;
    workflows: UsageMetric;
  };
}

export interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  type: 'saas' | 'diagnostic';
  isAnnual?: boolean;
}

interface BuildUpContextType {
  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['id']) => string;
  industries: IndustryOption[];

  // User Subscription & Checkout
  subscription: UserSubscriptionInfo;
  isCheckoutModalOpen: boolean;
  checkoutItem: CheckoutItem | null;
  openCheckout: (item: CheckoutItem) => void;
  closeCheckout: () => void;
  processPaymentSuccess: (planId: UserSubscriptionInfo['planId'], planName: string) => void;

  // Authentication & Org State
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  login: (email: string, password?: string, asDemo?: boolean) => Promise<void>;
  isSandbox: boolean;
  
  register: (data: {
    fullName: string;
    email: string;
    companyName: string;
    industry: string;
    customIndustry?: string;
    revenueBracket: string;
    role: string;
    password?: string;
  }) => void;
  logout: () => void;
  enterDemoMode: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;

  // Score & Diagnostics
  overallScore: number;
  hasCompletedHealthCheck: boolean;
  hasPendingDiagnostic: boolean;
  dimensions: HealthDimension[];
  criticalSignals: string[];
  totalAnnualLeakageIdr: number;
  totalAnnualLeakageUsd: number;
  updateScoreFromAnswers: (answers: number[]) => void;
  setGlobalHealthScore: (score: number, findings: string[], rec: string) => void;
  saveDiagnosticToSession: (score: number, findings: string[], rec: string) => void;
  resetHealthCheck: () => void;

  // Decision Objects
  decisionObjects: DecisionObject[];
  approveDecision: (id: string) => void;
  escalateDecision: (id: string) => void;

  // Currency & Plan
  currency: 'IDR' | 'USD';
  setCurrency: (c: 'IDR' | 'USD') => void;
  hasAccess: (requiredPlanId: UserSubscriptionInfo['planId']) => boolean;
  setCurrentPlan: (p: any) => void;

  // Modal open states
  isHealthCheckModalOpen: boolean;
  setIsHealthCheckModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;

  // Format currency helper
  formatMoney: (idr: number, usd?: number) => string;
}

const initialDimensions: HealthDimension[] = [
  { name: 'Finance & Cash Flow', score: 0, benchmark: 0, status: 'Pending', findings: 'Belum ada data mendetail', bottleneck: 'Menunggu integrasi sistem' },
  { name: 'Sales & Growth', score: 0, benchmark: 0, status: 'Pending', findings: 'Belum ada data mendetail', bottleneck: 'Menunggu integrasi sistem' },
  { name: 'Operations & SOP', score: 0, benchmark: 0, status: 'Pending', findings: 'Belum ada data mendetail', bottleneck: 'Menunggu integrasi sistem' },
  { name: 'Procurement & Spend', score: 0, benchmark: 0, status: 'Pending', findings: 'Belum ada data mendetail', bottleneck: 'Menunggu integrasi sistem' },
  { name: 'People & HRGA', score: 0, benchmark: 0, status: 'Pending', findings: 'Belum ada data mendetail', bottleneck: 'Menunggu integrasi sistem' },
  { name: 'Risk & Governance', score: 0, benchmark: 0, status: 'Pending', findings: 'Belum ada data mendetail', bottleneck: 'Menunggu integrasi sistem' },
  { name: 'Technology & AI', score: 0, benchmark: 0, status: 'Pending', findings: 'Belum ada data mendetail', bottleneck: 'Menunggu integrasi sistem' },
  { name: 'Strategic Execution', score: 0, benchmark: 0, status: 'Pending', findings: 'Belum ada data mendetail', bottleneck: 'Menunggu integrasi sistem' }
];

const initialDecisions: DecisionObject[] = [];

const defaultDemoUser: UserProfile = {
  id: 'usr-demo-01',
  name: 'Direksi Eksekutif',
  email: 'director@nusantara-group.co.id',
  role: 'Chief Executive Officer',
  companyName: 'PT Global Distribusi Nusantara',
  industry: 'Distribusi, Grosir & Supply Chain',
  revenueBracket: 'Rp 50 Miliar - Rp 250 Miliar',
  employeeCount: '150 - 500 Karyawan',
  isSandbox: false,
  isLoggedIn: false,
  plan: 'Free Health Check'
};

const BuildUpContext = createContext<BuildUpContextType | undefined>(undefined);

export const PLAN_TIERS: Record<UserSubscriptionInfo['planId'], number> = {
  'snapshot': 0,
  'health-check': 10,
  'x-ray': 20,
  'starter': 30,
  'business': 40,
  'growth': 50,
  'scale': 60,
  'enterprise': 70
};

export function BuildUpProvider({ children }: { children: React.ReactNode }) {
  // Language (Indonesian is default target market)
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bu_lang') as Language;
    return saved && ['id', 'en', 'zh', 'ja', 'ar'].includes(saved) ? saved : 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bu_lang', lang);
  };

  const t = (key: keyof typeof TRANSLATIONS['id']): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['id'];
    return (langDict as any)[key] || TRANSLATIONS['id'][key] || key;
  };

  // User Authentication
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const userData = userSnap.data() as UserProfile;
            setUser({ ...userData, isLoggedIn: true, id: firebaseUser.uid });
          } else {
            // Fallback if document doesn't exist yet (e.g. midway through registration)
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email || '',
              role: 'User',
              companyName: 'Company',
              industry: 'Other',
              revenueBracket: 'Unknown',
              isSandbox: false,
              isLoggedIn: true,
              plan: 'Free Health Check'
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
        }
        setIsAuthLoading(false);
      });
      return () => unsubscribe();
    }, []);

  const login = async (email: string, password?: string, asDemo?: boolean) => {
    try {
      setIsAuthLoading(true);
      if (asDemo) {
        setUser(defaultDemoUser);
        setIsAuthModalOpen(false);
        setIsAuthLoading(false);
        return;
      }
      if (!password) throw new Error("Password is required");
      const cred = await signInWithEmailAndPassword(auth, email, password);
      
      const userDocRef = doc(db, 'users', cred.user.uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        const userData = userSnap.data() as UserProfile;
        setUser({ ...userData, isLoggedIn: true, id: cred.user.uid });
      } else {
        setUser({
          id: cred.user.uid,
          name: cred.user.displayName || email.split('@')[0] || 'User',
          email: email,
          role: 'User',
          companyName: 'Company',
          industry: 'Other',
          revenueBracket: 'Unknown',
          isSandbox: false,
          isLoggedIn: true,
          plan: 'Free Health Check'
        });
      }

      setIsAuthModalOpen(false);
      setIsAuthLoading(false);
    } catch (error: any) {
      setIsAuthLoading(false);
      console.error("Login error:", error);
      throw error; // Throw so the component can show the error
    }
  };

  const register = async (data: {
    fullName: string;
    email: string;
    companyName: string;
    industry: string;
    customIndustry?: string;
    revenueBracket: string;
    role: string;
    password?: string;
  }) => {
    try {
      setIsAuthLoading(true);
      if (!data.password) throw new Error("Password is required");
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const uid = userCredential.user.uid;
      const orgId = `org-${Date.now()}`;

      const safeCustomIndustry = data.customIndustry || "";
      
      await setDoc(doc(db, 'organizations', orgId), {
        id: orgId,
        name: data.companyName,
        industry: data.industry,
        customIndustry: safeCustomIndustry,
        revenueBracket: data.revenueBracket,
        createdAt: new Date().toISOString()
      });

      const newUserProfile: UserProfile = {
        id: uid,
        name: data.fullName,
        email: data.email,
        role: data.role || 'Managing Director',
        companyName: data.companyName,
        industry: data.industry,
        customIndustry: safeCustomIndustry,
        revenueBracket: data.revenueBracket,
        isSandbox: false,
        isLoggedIn: true,
        plan: 'Free Health Check'
      };

      await setDoc(doc(db, 'users', uid), newUserProfile);
      
      await setDoc(doc(db, 'memberships', `${uid}_${orgId}`), {
        userId: uid,
        orgId: orgId,
        role: 'owner',
        joinedAt: new Date().toISOString()
      });

      // Restore pending diagnostic from session if exists
      const pendingRaw = sessionStorage.getItem('bu_pending_diagnostic');
      if (pendingRaw) {
        try {
          const pending = JSON.parse(pendingRaw);
          await setDoc(doc(db, 'users', uid, 'diagnostics', 'latest'), {
            ...pending,
            restoredAt: new Date().toISOString()
          });
          // Apply to live state immediately
          setOverallScore(pending.score);
          setHasCompletedHealthCheck(true);
          localStorage.setItem('bu_score', pending.score.toString());
          setCriticalSignals(pending.findings || []);
          const leakage = (100 - pending.score) * 25000000;
          setTotalAnnualLeakageIdr(leakage);
          setTotalAnnualLeakageUsd(Math.round(leakage / 15000));
          sessionStorage.removeItem('bu_pending_diagnostic');
          setHasPendingDiagnostic(true);
        } catch (e) {
          console.warn('Could not restore pending diagnostic:', e);
        }
      }

      setUser(newUserProfile);
      setIsAuthModalOpen(false);
      setIsAuthLoading(false);
    } catch (error: any) {
      setIsAuthLoading(false);
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const enterDemoMode = () => {
    setUser(defaultDemoUser);
    setIsAuthModalOpen(false);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    try {
      await setDoc(doc(db, 'users', user.id), updated, { merge: true });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Diagnostics & Scores
  const [overallScore, setOverallScore] = useState<number>(() => {
    const saved = localStorage.getItem('bu_score');
    return saved ? parseInt(saved, 10) : 78;
  });
  const [hasCompletedHealthCheck, setHasCompletedHealthCheck] = useState<boolean>(() => {
    return !!localStorage.getItem('bu_score');
  });
  const [hasPendingDiagnostic, setHasPendingDiagnostic] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<HealthDimension[]>(initialDimensions);
  const [decisionObjects, setDecisionObjects] = useState<DecisionObject[]>(initialDecisions);
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('USD');
  const [currentPlan, setCurrentPlan] = useState<'Free Health Check' | 'Business X-Ray' | 'Score Pro' | 'Transformation Retainer' | 'Enterprise'>('Business X-Ray');
  const [isHealthCheckModalOpen, setIsHealthCheckModalOpen] = useState(false);

  useEffect(() => {
    async function fetchBackendData() {
      if (user && !user.isSandbox && user.isLoggedIn) {
        try {
          const token = await auth.currentUser?.getIdToken();
          if (token) {
            const res = await fetch('/api/decisions', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if (res.ok) {
              const data = await res.json();
              if (data.decisions && data.decisions.length > 0) {
                // Map backend format to frontend format (rough mapping for now)
                const mappedDecisions = data.decisions.map((d: any) => ({
                  id: d.id,
                  code: d.id.substring(0, 12).toUpperCase(),
                  title: d.title || 'AI Decision',
                  domain: 'Operations', // Fallback
                  problem: d.problemStatement || 'Identified by AI Gateway',
                  evidence: d.evidenceIds || [],
                  options: (d.options || []).map((o: any) => ({
                    label: o.description,
                    impact: o.financialImpactAbs || 'TBD',
                    risk: o.riskLevel || 'Low'
                  })),
                  financialImpact: 'Varies',
                  confidence: d.confidence || 90,
                  recommendation: d.recommendation || '',
                  authority: d.approvalAuthority || 'Manager',
                  status: d.status || 'Pending Review',
                  timestamp: new Date().toLocaleTimeString(),
                  agent: 'AI Gateway'
                }));
                setDecisionObjects(mappedDecisions);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching decisions from backend:", error);
        }
      } else if (user?.isSandbox) {
        // Fallback to initialDecisions for demo only
        setDecisionObjects(initialDecisions);
      } else {
        setDecisionObjects([]);
      }
    }
    fetchBackendData();
  }, [user]);

  const [criticalSignals, setCriticalSignals] = useState<string[]>(() => {
    return user?.isSandbox ? [
      'Procurement single-supplier dependency (>60% spend on 2 vendors)',
      'DSO working capital drag locking ~Rp 1.85 Miliar in receivables',
      'SoD dual-custody authorization violation in ERP approval chain',
      'Unintegrated logistics handoffs causing 14% dispatch delay'
    ] : [];
  });

  const [totalAnnualLeakageIdr, setTotalAnnualLeakageIdr] = useState<number>(() => user?.isSandbox ? 1450000000 : 0);
  const [totalAnnualLeakageUsd, setTotalAnnualLeakageUsd] = useState<number>(() => user?.isSandbox ? 96000 : 0);

  const setGlobalHealthScore = (score: number, findings: string[], rec: string) => {
    setOverallScore(score);
    setHasCompletedHealthCheck(true);
    localStorage.setItem('bu_score', score.toString());
    
    // Connect AI findings directly to the Command Center dashboard
    setCriticalSignals(findings);
    
    // Estimate leakage based on score (lower score = higher leakage)
    const estimatedLeakageIdr = (100 - score) * 25000000;
    setTotalAnnualLeakageIdr(estimatedLeakageIdr);
    setTotalAnnualLeakageUsd(Math.round(estimatedLeakageIdr / 15000));

    // Update the first dimension with the findings
    const updated = [...dimensions];
    updated[0].score = score;
    updated[0].findings = findings[0] || 'Terdapat inefisiensi terdeteksi';
    updated[0].bottleneck = rec;
    setDimensions(updated);
  };

  // Save diagnostic results to sessionStorage for guest users (before sign up)
  const saveDiagnosticToSession = (score: number, findings: string[], rec: string) => {
    sessionStorage.setItem('bu_pending_diagnostic', JSON.stringify({
      score, findings, rec, timestamp: new Date().toISOString()
    }));
  };

  const updateScoreFromAnswers = (answers: number[]) => {
    const sum = answers.reduce((a, b) => a + b, 0);
    const calculated = Math.round((sum / (answers.length * 5)) * 100);
    setOverallScore(calculated);
    setHasCompletedHealthCheck(true);
    localStorage.setItem('bu_score', calculated.toString());

    setDimensions(prev => prev.map((dim, idx) => {
      const val = answers[idx] || 3;
      const dimScore = Math.min(100, Math.max(35, val * 20 - Math.floor(Math.random() * 8)));
      return {
        ...dim,
        score: dimScore,
        status: dimScore < 65 ? 'Critical' : dimScore < 80 ? 'Warning' : 'Healthy'
      };
    }));
  };

  const resetHealthCheck = () => {
    localStorage.removeItem('bu_score');
    setOverallScore(78);
    setHasCompletedHealthCheck(false);
    setDimensions(initialDimensions);
  };

  const approveDecision = (id: string) => {
    setDecisionObjects(prev => prev.map(dec => {
      if (dec.id === id) {
        return { ...dec, status: 'Approved' };
      }
      return dec;
    }));
  };

  const escalateDecision = (id: string) => {
    setDecisionObjects(prev => prev.map(dec => {
      if (dec.id === id) {
        return { ...dec, status: 'Escalated to Expert' };
      }
      return dec;
    }));
  };

  const formatMoney = (idr: number, usd?: number) => {
    if (currency === 'USD') {
      const u = usd || Math.round(idr / 15500);
      return `$${u.toLocaleString('en-US')}`;
    }
    if (idr >= 1000000000) {
      return `Rp ${(idr / 1000000000).toFixed(2)} Miliar`;
    }
    if (idr >= 1000000) {
      return `Rp ${(idr / 1000000).toFixed(0)} Juta`;
    }
    return `Rp ${idr.toLocaleString('id-ID')}`;
  };

  const [subscription, setSubscription] = useState<UserSubscriptionInfo>({
    planId: 'snapshot',
    planName: 'Health Snapshot™ (Free)',
    metrics: {
      aiInsights: { used: 3, limit: 3, label: 'AI Business Insights' },
      integrations: { used: 0, limit: 1, label: 'System Integrations' },
      workflows: { used: 0, limit: 0, label: 'Automated Workflows' }
    }
  });

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);

  const openCheckout = (item: CheckoutItem) => {
    setCheckoutItem(item);
    setIsCheckoutModalOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutModalOpen(false);
    setTimeout(() => setCheckoutItem(null), 300);
  };

  const hasAccess = (requiredPlanId: UserSubscriptionInfo['planId']) => {
    const userTier = PLAN_TIERS[subscription.planId] || 0;
    const requiredTier = PLAN_TIERS[requiredPlanId] || 0;
    return userTier >= requiredTier;
  };

  const processPaymentSuccess = (planId: UserSubscriptionInfo['planId'], planName: string) => {
    // Simulasi upgrade: unlock limits
    setSubscription(prev => ({
      ...prev,
      planId,
      planName,
      metrics: {
        aiInsights: { ...prev.metrics.aiInsights, limit: planId === 'health-check' ? 10 : 100 },
        integrations: { ...prev.metrics.integrations, limit: planId === 'health-check' ? 3 : 10 },
        workflows: { ...prev.metrics.workflows, limit: planId === 'health-check' ? 1 : 25 }
      }
    }));
  };

  return (
    <BuildUpContext.Provider
      value={{
        language,
        setLanguage,
        t,
        industries: COMPREHENSIVE_INDUSTRIES,
        subscription,
        isCheckoutModalOpen,
        checkoutItem,
        openCheckout,
        closeCheckout,
        hasAccess,
        processPaymentSuccess,
        user,
        isLoggedIn: !!user?.isLoggedIn,
        isSandbox: !!user?.isSandbox,
        isAuthLoading,
        login,
        register,
        logout,
        enterDemoMode,
        updateUserProfile,
        overallScore,
        hasCompletedHealthCheck,
        hasPendingDiagnostic,
        dimensions,
        criticalSignals,
        totalAnnualLeakageIdr,
        totalAnnualLeakageUsd,
        updateScoreFromAnswers,
        setGlobalHealthScore,
        saveDiagnosticToSession,
        resetHealthCheck,
        decisionObjects,
        approveDecision,
        escalateDecision,
        currency,
        setCurrency,
        currentPlan,
        setCurrentPlan,
        isHealthCheckModalOpen,
        setIsHealthCheckModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        formatMoney
      }}
    >
      {children}
    </BuildUpContext.Provider>
  );
}

export function useBuildUp() {
  const context = useContext(BuildUpContext);
  if (!context) {
    throw new Error('useBuildUp must be used within a BuildUpProvider');
  }
  return context;
}

