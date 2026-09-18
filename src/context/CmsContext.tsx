import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface CmsState {
  content: Record<string, string>;
  visibleSections: Record<string, boolean>;
  sectionOrder: string[];
  pricing: PricingPackage[];
  faqs: FaqItem[];
  aboutStages: AboutStage[];
  aboutComparisons: AboutComparison[];
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
  setThemeOverrides: (overrides: Partial<ThemeOverrides>) => void;
  toggleEditMode: (enabled: boolean) => void;
}

const defaultState: CmsState = {
  content: {},
  visibleSections: {
    hero: true, calculator: true, connectors: true, workforce: true, pricing: true, about: true, contact: true
  },
  sectionOrder: ['hero', 'calculator', 'connectors', 'workforce', 'pricing', 'about', 'contact'],
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
    <CmsContext.Provider value={{ state, updateContent, toggleSection, reorderSections, setPricing, setFaqs, setAboutStages, setAboutComparisons, setThemeOverrides, toggleEditMode }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
};

