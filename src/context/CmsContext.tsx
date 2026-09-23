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
      description: 'Pemindaian awal untuk menemukan kebocoran finansial tanpa risiko.', features: ['Full 8-Dimension Diagnostic Scan', 'Root Cause Identification', 'Initial AI Value Leakage Report', 'Basic System Integration (1 ERP)', '1-on-1 Consultation Session'],
      buttonText: 'Request Diagnostic Audit', isPopular: false
    },
    {
      id: 'standard', label: 'MONITORING', name: 'Standard Business', priceIdr: 6000000, priceUsd: 390,
      description: 'Pemantauan indikator kesehatan bisnis secara real-time dan terus menerus.', features: ['Pemantauan 8 Dimensi 24/7', 'Peringatan Dini (Early Warning System)', 'Akses Dashboard Real-Time', 'Integrasi hingga 3 Sistem Internal', 'Weekly Executive Report', 'Email Support'],
      buttonText: 'Start Monitoring', isPopular: false
    },
    {
      id: 'growth', label: 'ACTIVE OPTIMIZATION', name: 'Growth & Scale', priceIdr: 28000000, priceUsd: 1790,
      description: 'Solusi transformasi menyeluruh: Sistem operasi bisnis berbasis AI yang mandiri.', features: ['Semua Fitur Standard', 'Automated Decision Objects', 'Full AI Workforce Orchestration', 'Unlimited Systems Integration', 'Prediksi Arus Kas Jangka Panjang', 'Otomatisasi Penagihan & Procurement', 'Dedicated Customer Success Manager'],
      buttonText: 'Deploy Business OS', isPopular: true
    },
    {
      id: 'enterprise', label: 'CUSTOM ENGAGEMENT', name: 'Enterprise Custom', priceIdr: 120000000, priceUsd: 7900,
      description: 'Untuk konglomerasi multinasional dengan infrastruktur tertutup dan kustomisasi ekstrem.', features: ['Semua Fitur & Benefit Growth & Scale', 'Private VPC / On-Premise Deployment', 'Dedicated Enterprise Architect', 'White-glove SLA 99.99%', 'Custom AI Model Training', 'Audit Keamanan Militer', 'Board-Level Strategic Reporting'],
      buttonText: 'Talk to Sales', isPopular: false
    }
  ],
  faqs: [
    { q: 'Bagaimana BuildUp menjamin ROI?', a: 'Berdasarkan rekam jejak pada 120+ korporasi, klien kami mencatat ROI positif dalam 90 hari pertama karena AI kami secara presisi menutup kebocoran (value leakage) di procurement, inventory, dan piutang. Jika dalam 6 bulan tidak tercapai, kami akan memberikan konsultasi optimasi gratis.' },
    { q: 'Berapa lama proses implementasi?', a: 'Tahap Diagnostic dapat selesai dalam hitungan menit sejak Anda mengunggah file. Untuk integrasi penuh ke ERP Anda, rata-rata membutuhkan waktu 3-7 hari kerja tergantung kompleksitas sistem internal Anda.' },
    { q: 'Apakah data saya aman?', a: 'Sangat aman. Kami menggunakan enkripsi end-to-end setara perbankan militer (AES-256). Data Anda hanya digunakan untuk analisis spesifik perusahaan Anda dan tidak pernah dibagikan, dijual, atau dipakai untuk melatih AI pihak ketiga tanpa izin eksplisit.' },
    { q: 'Apakah ini akan menggantikan karyawan saya?', a: 'Tidak. BuildUp bertindak sebagai "Copilot" tingkat eksekutif. Sistem kami mengotomatisasi pekerjaan repetitif (rekonsiliasi, penagihan, pengumpulan data), membebaskan karyawan Anda untuk fokus pada strategi, negosiasi tingkat tinggi, dan inovasi bisnis.' },
    { q: 'Sistem ERP apa saja yang didukung?', a: 'Kami mendukung integrasi out-of-the-box dengan SAP S/4HANA, Oracle NetSuite, Odoo, Accurate, Jurnal by Mekari, Microsoft Dynamics, hingga custom database SQL/PostgreSQL melalui konektor API standar industri.' }
  ],
  aboutStages: [
    { num: '01', title: 'Diagnostic Triage', desc: 'Pemindaian 8 dimensi kesehatan bisnis secara instan menggunakan data finansial historis.' },
    { num: '02', title: 'Root-Cause Discovery', desc: 'Menggali kelemahan operasional, menemukan sumber "value leakage" (kebocoran nilai) terbesar.' },
    { num: '03', title: 'AI Modeling', desc: 'Memodelkan arsitektur data internal perusahaan untuk diajarkan pada AI Brain BuildUp.' },
    { num: '04', title: 'Workflow Injection', desc: 'Mengintegrasikan alur kerja otomatis ke dalam ERP dan sistem yang sudah ada.' },
    { num: '05', title: 'Live Synchronization', desc: 'Konektivitas 2 arah (2-way sync) dengan ERP/Bank untuk mendapatkan data real-time.' },
    { num: '06', title: 'Orchestration', desc: 'Orkestrasi eksekusi multi-sistem, mengotomatisasi tugas di lintas departemen.' },
    { num: '07', title: 'Active Optimization', desc: 'Optimalisasi aktif berkelanjutan; AI akan terus beradaptasi dan meningkatkan efisiensi.' },
    { num: '08', title: 'Executive Reporting', desc: 'Dashboard level C-Suite yang menampilkan ROI, mitigasi risiko, dan metrik kunci.' },
    { num: '09', title: 'Scale & Expand', desc: 'Duplikasi sistem ke anak perusahaan atau entitas baru secara instan.' }
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
    { feature: 'Model Diagnostik', traditional: 'Audit manual berbasis wawancara subjektif yang memakan waktu berbulan-bulan.', buildup: 'Sistem operasi cerdas 24/7 dengan koneksi API langsung (Real-Time).' },
    { feature: 'Akurasi Rekomendasi', traditional: 'Mengandalkan intuisi konsultan junior dengan margin of error tinggi.', buildup: 'Didukung oleh 12 Agen AI Eksekutif C-Level dengan akurasi data-driven.' },
    { feature: 'Waktu Mendapatkan Nilai', traditional: 'Implementasi ERP atau inisiatif strategis membutuhkan 1-2 tahun.', buildup: 'Tindakan mitigasi kebocoran kas dalam 48 jam pertama.' },
    { feature: 'Biaya Solusi', traditional: 'Membayar jutaan dolar di muka tanpa jaminan hasil yang konkret.', buildup: 'Langganan fleksibel (Pay-as-you-go) dengan transparansi Return on Investment (ROI).' },
    { feature: 'Eksekusi & Monitoring', traditional: 'Berakhir dengan slide presentasi 100 halaman (Laporan pasif).', buildup: 'Otomatisasi perbaikan dan monitoring interaktif via Command Center 2 arah.' }
  ],
  themeOverrides: undefined,
  editMode: false,
};

const CmsContext = createContext<CmsContextProps | undefined>(undefined);

export const CmsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CmsState>(defaultState);

  useEffect(() => {
    const saved = localStorage.getItem('buildup-cms-state-v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(prev => ({ ...defaultState, ...parsed, editMode: false }));
      } catch (e) {}
    } else {
      setState(defaultState);
      localStorage.setItem('buildup-cms-state-v4', JSON.stringify(defaultState));
    }

    const loadFromDb = async () => {
      try {
        const docRef = doc(db, 'cms', 'state');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const remoteData = snap.data();
          setState(prev => {
            const newState = { ...prev, ...remoteData, editMode: false };
            localStorage.setItem('buildup-cms-state-v4', JSON.stringify(newState));
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
    localStorage.setItem('buildup-cms-state-v4', JSON.stringify(state));
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






