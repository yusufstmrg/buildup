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
  plan: 'Free Health Check' | 'Business X-Ray' | 'Score Pro' | 'Transformation Retainer' | 'Enterprise';
}

interface BuildUpContextType {
  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['id']) => string;
  industries: IndustryOption[];

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
  dimensions: HealthDimension[];
  criticalSignals: string[];
  totalAnnualLeakageIdr: number;
  totalAnnualLeakageUsd: number;
  updateScoreFromAnswers: (answers: number[]) => void;
  setGlobalHealthScore: (score: number, findings: string[], rec: string) => void;
  resetHealthCheck: () => void;

  // Decision Objects
  decisionObjects: DecisionObject[];
  approveDecision: (id: string) => void;
  escalateDecision: (id: string) => void;

  // Currency & Plan
  currency: 'IDR' | 'USD';
  setCurrency: (c: 'IDR' | 'USD') => void;
  currentPlan: 'Free Health Check' | 'Business X-Ray' | 'Score Pro' | 'Transformation Retainer' | 'Enterprise';
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
  { name: 'Finance & Cash Flow', score: 78, benchmark: 82, status: 'Warning', findings: 'DSO extended by 18 days; working capital locked in unbilled receivables.', bottleneck: 'Delayed invoicing cycle & loose credit terms' },
  { name: 'Sales & Growth', score: 86, benchmark: 75, status: 'Healthy', findings: 'Pipeline healthy (+24% YoY), but closing cycle drags in enterprise deals.', bottleneck: 'Sales follow-up friction & custom pricing quotes' },
  { name: 'Operations & SOP', score: 72, benchmark: 80, status: 'Warning', findings: 'Manual data handoffs between ERP and warehouse logistics.', bottleneck: 'Unintegrated inventory records & dispatch bottleneck' },
  { name: 'Procurement & Spend', score: 64, benchmark: 78, status: 'Critical', findings: '65% spend concentrated on 2 unvetted suppliers; missing quotation normalization.', bottleneck: 'Price leakage & single-supplier dependency' },
  { name: 'People & HRGA', score: 81, benchmark: 79, status: 'Healthy', findings: 'Clear headcount capacity, though talent onboarding cycle is 42 days.', bottleneck: 'Slow CV pre-screening & assessment verification' },
  { name: 'Risk & Governance', score: 68, benchmark: 85, status: 'Critical', findings: 'Segregation of Duties (SoD) breach detected in manual PO-to-Payment approval.', bottleneck: 'Single-approver override on expenditures' },
  { name: 'Technology & AI', score: 70, benchmark: 76, status: 'Warning', findings: 'Legacy ERP running without automated data reconciliation or context graphs.', bottleneck: 'Data silos between finance, CRM, and inventory' },
  { name: 'Strategic Execution', score: 82, benchmark: 80, status: 'Healthy', findings: 'Strategic objectives defined, but 90-day review cadence is reactive.', bottleneck: 'Static quarterly reforecasting instead of continuous' }
];

const initialDecisions: DecisionObject[] = [
  {
    id: 'dec-1',
    code: 'DEC-2026-089',
    title: 'Supplier Spend Concentration & Price Normalization',
    domain: 'Procurement',
    problem: '65% of raw packaging materials spend is concentrated on 2 suppliers, resulting in 8.4% price premium over validated market benchmarks.',
    evidence: [
      'ERP PO logs: 142 orders over past 6 months totaling Rp 4.850.000.000',
      'Benchmark price database: Market rate is Rp 1.450/unit vs current Rp 1.580/unit',
      'Supplier delivery SLA compliance: 91.2% on-time'
    ],
    options: [
      { label: 'Option A: Trigger automated RFQ to 4 qualified regional suppliers with normalized quotation parsing', impact: 'Estimated annual savings of Rp 420.000.000', risk: 'Low' },
      { label: 'Option B: Re-negotiate volume discount with incumbent using AI-prepared pricing teardown', impact: 'Estimated annual savings of Rp 280.000.000', risk: 'Low' }
    ],
    financialImpact: '+Rp 420.000.000 / year',
    confidence: 96,
    recommendation: 'Execute Option A. Pre-qualify 2 backup suppliers to eliminate single-point supply chain vulnerability.',
    authority: 'VP Procurement / COO Approval Required',
    status: 'Pending Review',
    timestamp: '28 mins ago',
    agent: 'AI Procurement'
  },
  {
    id: 'dec-2',
    code: 'DEC-2026-090',
    title: 'Working Capital Recovery — Receivables Acceleration',
    domain: 'Finance',
    problem: 'Average Days Sales Outstanding (DSO) increased from 42 to 61 days across top 15 B2B clients, locking Rp 1.850.000.000 in excess working capital.',
    evidence: [
      'Aging schedule: Rp 1.2B in 30-60 day bucket, Rp 650M in 60-90 day bucket',
      'Invoice dispute log: 80% of payment delays caused by missing delivery receipts (Surat Jalan)',
      'Customer payment behavioral trend: Reminders sent after due date instead of 5 days prior'
    ],
    options: [
      { label: 'Option 1: Autonomous pre-due date reminder workflows + digital Surat Jalan auto-attachment', impact: 'Reduce DSO to 44 days; unlock Rp 1.150.000.000 cash in 30 days', risk: 'Low' },
      { label: 'Option 2: 2/10 Net 30 prompt payment incentive', impact: 'Fast cash recovery with 2% margin haircut', risk: 'Medium' }
    ],
    financialImpact: 'Rp 1.150.000.000 cash unlocked',
    confidence: 94,
    recommendation: 'Deploy Option 1 via AI CFO and automated billing workflows to eliminate reconciliation friction.',
    authority: 'CFO / Finance Director',
    status: 'Pending Review',
    timestamp: '1 hour ago',
    agent: 'AI CFO'
  },
  {
    id: 'dec-3',
    code: 'DEC-2026-091',
    title: 'Segregation of Duties (SoD) Internal Control Remediation',
    domain: 'Risk',
    problem: 'AI Risk Engine detected 3 instances where user ID "FIN-OP-04" created purchase orders and subsequently approved vendor payment releases.',
    evidence: [
      'Transaction hash TX-98401, TX-98442, TX-98501 totaling Rp 184.500.000',
      'System permission log: Role conflict in ERP user authorization matrix',
      'Policy reference: Section 11.3 Materiality & Approval Threshold Policy'
    ],
    options: [
      { label: 'Option A: Revoke payment authorization from operator role and enforce mandatory dual-custody approval gate', impact: 'Zero fraud exposure; total compliance with governance policy', risk: 'Low' }
    ],
    financialImpact: 'Eliminates Rp 500M+ fraud vulnerability',
    confidence: 99,
    recommendation: 'Instantly revoke conflicting ERP permissions and escalate audit trail to Audit Committee.',
    authority: 'CEO / Audit Committee Sign-Off',
    status: 'Pending Review',
    timestamp: '3 hours ago',
    agent: 'AI Risk & Internal Control'
  }
];

const defaultDemoUser: UserProfile = {
  id: 'usr-demo-01',
  name: 'Direksi Eksekutif',
  email: 'director@nusantara-group.co.id',
  role: 'Chief Executive Officer',
  companyName: 'PT Global Distribusi Nusantara',
  industry: 'Distribusi, Grosir & Supply Chain',
  revenueBracket: 'Rp 50 Miliar - Rp 250 Miliar',
  employeeCount: '150 - 500 Karyawan',
  connectedERP: 'SAP Business One & Accurate Cloud',
  isSandbox: true,
  isLoggedIn: true,
  plan: 'Business X-Ray'
};

const BuildUpContext = createContext<BuildUpContextType | undefined>(undefined);

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
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthModalOpen(false);
      // Let onAuthStateChanged handle setIsAuthLoading(false)
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

      setUser(newUserProfile);
      setIsAuthModalOpen(false);
      // Let onAuthStateChanged handle setIsAuthLoading(false)
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
      } else {
        // Fallback to initialDecisions for demo
        setDecisionObjects(initialDecisions);
      }
    }
    fetchBackendData();
  }, [user]);

  const criticalSignals = [
    'Procurement single-supplier dependency (>60% spend on 2 vendors)',
    'DSO working capital drag locking ~Rp 1.85 Miliar in receivables',
    'SoD dual-custody authorization violation in ERP approval chain',
    'Unintegrated logistics handoffs causing 14% dispatch delay'
  ];

  const totalAnnualLeakageIdr = 1450000000;
  const totalAnnualLeakageUsd = 96000;

  const setGlobalHealthScore = (score: number, findings: string[], rec: string) => {
    setOverallScore(score);
    setHasCompletedHealthCheck(true);
    localStorage.setItem('bu_score', score.toString());
    // Update the first dimension with the findings as a hack for demo
    const updated = [...dimensions];
    updated[0].score = score;
    updated[0].findings = findings.join(' | ');
    updated[0].bottleneck = rec;
    setDimensions(updated);
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

  return (
    <BuildUpContext.Provider
      value={{
        language,
        setLanguage,
        t,
        industries: COMPREHENSIVE_INDUSTRIES,
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
        dimensions,
        criticalSignals,
        totalAnnualLeakageIdr,
        totalAnnualLeakageUsd,
        updateScoreFromAnswers,
        setGlobalHealthScore,
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

