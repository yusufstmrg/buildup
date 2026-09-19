import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface NavItem {
  id: string;
  label: string;
  target: string;
}

export interface WorkforceRole {
  title: string;
  desc: string;
}

export interface CmsState {
  content: Record<string, string>;
  visibleSections: Record<string, boolean>;
  sectionOrder: string[];
  pricing: PricingPackage[];
  faqs: FaqItem[];
  aboutStages: AboutStage[];
  aboutComparisons: AboutComparison[];
  navItems: NavItem[];
  workforceRoles: WorkforceRole[];
  themeOverrides?: Partial<ThemeOverrides>;
  editMode: boolean;
}

export interface PricingPackage {
  id: string;
  label: string;
  name: string;
  priceIdr: number;
  priceUsd: number;
  description: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface AboutStage {
  num: string;
  title: string;
  desc: string;
}

export interface AboutComparison {
  feature: string;
  traditional: string;
  buildup: string;
}

export interface ThemeOverrides {
  primary: string;
  background: string;
  glow: string;
}

interface CmsContextProps {
  state: CmsState;
  updateContent: (id: string, html: string) => void;
  toggleSection: (key: string, visible: boolean) => void;
  reorderSections: (order: string[]) => void;
  setPricing: (tiers: PricingPackage[]) => void;
  setFaqs: (faqs: FaqItem[]) => void;
  setAboutStages: (stages: AboutStage[]) => void;
  setAboutComparisons: (comparisons: AboutComparison[]) => void;
  setNavItems: (items: NavItem[]) => void;
  setWorkforceRoles: (roles: WorkforceRole[]) => void;
  setThemeOverrides: (overrides: Partial<ThemeOverrides>) => void;
  toggleEditMode: (enabled: boolean) => void;
}

const defaultState: CmsState = {
  content: {},
  visibleSections: {
    hero: true, calculator: true, connectors: true, workforce: true, pricing: true, about: true, contact: true
  },
  sectionOrder: ['hero', 'calculator', 'connectors', 'workforce', 'pricing',
    'testimonials', 'about', 'contact'],
  pricing: [
    {
      id: 'starter', label: 'ENTRY DIAGNOSTIC', name: 'Starter / Basic', priceIdr: 0, priceUsd: 0,
      description: 'Fast, low-friction front door screening.', features: ['Overall Health Score', '8-Dimension scores'],
      buttonText: 'Request Diagnostic Audit', isPopular: false
    },
    {
      id: 'standard', label: 'MONITORING', name: 'Standard Business', priceIdr: 6000000, priceUsd: 390,
      description: 'Live continuous benchmark progression.', features: ['Pemantauan 8 Dimensi 24/7', 'Peringatan Dini'],
      buttonText: 'Start Monitoring', isPopular: false
    },
    {
      id: 'growth', label: 'ACTIVE OPTIMIZATION', name: 'Growth & Scale', priceIdr: 28000000, priceUsd: 1790,
      description: 'Full business OS replacement.', features: ['Semua Fitur Standard', 'Automated Decision Objects'],
      buttonText: 'Deploy Business OS', isPopular: true
    },
    {
      id: 'enterprise', label: 'CUSTOM ENGAGEMENT', name: 'Enterprise Custom', priceIdr: 120000000, priceUsd: 7900,
      description: 'For conglomerates and multi-entity holding groups.', features: ['Private VPC Deployment', 'Dedicated Architect'],
      buttonText: 'Talk to Sales', isPopular: false
    },
    {
      id: 'gainshare', label: 'PERFORMANCE-BASED', name: 'Gain-Share Partnership', priceIdr: 0, priceUsd: 0,
      description: 'Zero fixed cost, pure profit-share.', features: ['15-25% dari Peningkatan EBITDA', 'No-cure no-pay'],
      buttonText: 'Apply for Partnership', isPopular: false
    }
  ],
  faqs: [
    { q: 'Bagaimana BuildUp menjamin ROI?', a: 'Berdasarkan rekam jejak pada 120+ korporasi...' },
    { q: 'Berapa lama proses implementasi?', a: 'Tahap Diagnostic dapat selesai dalam hitungan menit...' }
  ],
  aboutStages: [
    { num: '01', title: 'Diagnostic Triage', desc: 'Pemindaian 8 dimensi...' },
    { num: '02', title: 'Root-Cause Discovery', desc: 'Menggali kelemahan...' },
    { num: '03', title: 'Orkestrasi', desc: 'Orkestrasi eksekusi multi-sistem secara otomatis.' }
  ],
    navItems: [
    { id: 'home', label: 'Home', target: 'home' },
    { id: 'about', label: 'About Us', target: 'about' },
    { id: 'connectors', label: 'Platform & Connectors', target: 'connectors' },
    { id: 'workforce', label: 'AI Workforce', target: 'workforce' },
    { id: 'pricing', label: 'Pricing & Tiers', target: 'pricing' },
    { id: 'contact', label: 'Contact Us', target: 'contact' }
  ],
  workforceRoles: [
    { title: 'AI CEO', desc: 'Sintesis gambaran besar, prioritas strategis, dan persetujuan keputusan berdampak tinggi.' },
    { title: 'AI CFO', desc: 'Pemodelan keuangan kompleks, proyeksi kas real-time, dan alokasi modal optimal.' },
    { title: 'AI Controller', desc: 'Rekonsiliasi harian otomatis, deteksi kebocoran pengeluaran, dan audit trail.' },
    { title: 'AI Procurement', desc: 'Negosiasi vendor, optimasi HPP, dan manajemen rantai pasok cerdas.' },
    { title: 'AI CRO (Revenue)', desc: 'Skoring prospek, prediksi penagihan, dan strategi diskon dinamis.' },
    { title: 'AI COO', desc: 'Orkestrasi proses lintas departemen, pemantauan SLA, dan penyeimbangan beban.' },
    { title: 'AI Risk & Control', desc: 'Identifikasi kerentanan fraud, pencegahan denda, dan stres-tes skenario.' },
    { title: 'AI HR', desc: 'Prediksi churn karyawan, analisis beban kerja, dan optimasi kompensasi.' },
    { title: 'AI Tax', desc: 'Analisis kewajiban pajak, identifikasi penghematan legal (tax shield).' },
    { title: 'AI Legal', desc: 'Review draf kontrak otomatis, ekstraksi klausal risiko, dan pemantauan regulasi.' },
    { title: 'AI Audit', desc: 'Pengujian kepatuhan 100% sampel (bukan acak) secara terus-menerus.' },
    { title: 'AI Strategy', desc: 'Analisis lanskap kompetitor, tren makroekonomi, dan simulasi ekspansi.' }
  ],
  aboutComparisons: [
    { feature: 'Model Pelayanan', traditional: 'Presentasi statis', buildup: 'Sistem operasi 24/7' },
    { feature: 'Dasar Bukti & Data', traditional: 'Wawancara subjektif', buildup: 'Membaca data nyata' }
  ],
  themeOverrides: undefined,
  editMode: false,
};

const CmsContext = createContext<CmsContextProps | undefined>(undefined);

export const CmsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CmsState>(defaultState);

  useEffect(() => {
    const saved = localStorage.getItem('buildup-cms-state-v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(prev => ({ ...defaultState, ...parsed, editMode: false }));
      } catch (e) {}
    } else {
      setState(defaultState);
      localStorage.setItem('buildup-cms-state-v2', JSON.stringify(defaultState));
    }

    const loadFromDb = async () => {
      try {
        const docRef = doc(db, 'cms', 'state');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const remoteData = snap.data();
          setState(prev => {
            const newState = { ...prev, ...remoteData, editMode: false };
            localStorage.setItem('buildup-cms-state-v2', JSON.stringify(newState));
            return newState;
          });
        }
      } catch (e) {
        console.warn('Firestore CMS read failed:', e);
      }
    };
    loadFromDb();
  }, []);

  useEffect(() => {
    localStorage.setItem('buildup-cms-state-v2', JSON.stringify(state));
  }, [state]);

  const syncToFirestore = async (newState: CmsState) => {
    try {
      const docRef = doc(db, 'cms', 'state');
      await setDoc(docRef, newState);
    } catch (e) {}
  };

  const updateContent = (id: string, html: string) => {
    const newState = { ...state, content: { ...state.content, [id]: html } };
    setState(newState);
    syncToFirestore(newState);
  };
  const toggleSection = (key: string, visible: boolean) => {
    const newState = { ...state, visibleSections: { ...state.visibleSections, [key]: visible } };
    setState(newState);
    syncToFirestore(newState);
  };
  const reorderSections = (order: string[]) => {
    const newState = { ...state, sectionOrder: order };
    setState(newState);
    syncToFirestore(newState);
  };
  const setPricing = (tiers: PricingPackage[]) => {
    const newState = { ...state, pricing: tiers };
    setState(newState);
    syncToFirestore(newState);
  };
  const setFaqs = (faqs: FaqItem[]) => {
    const newState = { ...state, faqs };
    setState(newState);
    syncToFirestore(newState);
  };
  const setAboutStages = (stages: AboutStage[]) => {
    const newState = { ...state, aboutStages: stages };
    setState(newState);
    syncToFirestore(newState);
  };
  const setAboutComparisons = (comps: AboutComparison[]) => {
    const newState = { ...state, aboutComparisons: comps };
    setState(newState);
    syncToFirestore(newState);
  };
  const setThemeOverrides = (overrides: Partial<ThemeOverrides>) => {
    const newState = { ...state, themeOverrides: { ...state.themeOverrides, ...overrides } };
    setState(newState);
    syncToFirestore(newState);
  };
  const toggleEditMode = (enabled: boolean) => {
    const newState = { ...state, editMode: enabled };
    setState(newState);
  };

  return (
    <CmsContext.Provider value={{ state, updateContent, toggleSection, reorderSections, setPricing, setFaqs, setAboutStages, setAboutComparisons,
    setNavItems: (items) => { const ns = {...state, navItems: items}; setState(ns); syncToFirestore(ns); },
    setWorkforceRoles: (roles) => { const ns = {...state, workforceRoles: roles}; setState(ns); syncToFirestore(ns); }, setThemeOverrides, toggleEditMode }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
};





