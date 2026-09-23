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
  diagnosticProducts: DiagnosticProduct[]; saasPlans: SaasPlan[];
  faqs: FaqItem[];
  aboutStages: AboutStage[];
  aboutComparisons: AboutComparison[];
  navItems: NavItem[];
  workforceRoles: WorkforceRole[];
  themeOverrides?: Partial<ThemeOverrides>;
  editMode: boolean;
}

export interface DiagnosticProduct {
  id: string;
  name: string;
  priceText: string;
  priceIdr: number;
  description: string;
  features: string[];
  buttonText: string;
}

export interface SaasPlan {
  id: string;
  name: string;
  targetAudience: string;
  priceIdrMonthly: number;
  features: string[];
  isPopular: boolean;
  buttonText: string;
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
  setDiagnosticProducts: (products: DiagnosticProduct[]) => void;
  setSaasPlans: (plans: SaasPlan[]) => void;
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
  
  diagnosticProducts: [
    {
      id: 'health-check', name: 'Business Health Check™', priceText: 'Rp 749.000', priceIdr: 749000,
      description: 'Analisa lebih mendalam untuk bisnis Anda. Laporan komprehensif dengan rekomendasi prioritas.',
      features: ['Analisa 8 Dimensi Lengkap', 'Value Leakage Estimation', 'Root-Cause Indication', 'Priority Matrix', 'Executive Report (PDF)'],
      buttonText: 'Pesan Sekarang'
    },
    {
      id: 'x-ray', name: 'Business X-Ray™', priceText: 'Mulai Rp 7.500.000', priceIdr: 7500000,
      description: 'Temukan Akar Masalah dan Nilai yang Hilang. Analisa mendalam menggunakan data sistem perusahaan.',
      features: ['Integrasi data multi-sistem', 'Value Leakage Quantification', 'Cross-functional Analysis', '90-Day Transformation Roadmap', 'Executive Presentation'],
      buttonText: 'Jadwalkan Konsultasi'
    }
  ],
  saasPlans: [
    {
      id: 'starter', name: 'Starter', targetAudience: 'Untuk UMKM & bisnis pemula', priceIdrMonthly: 299000,
      features: ['Business Health Score', 'Dashboard dasar', '1 integrasi sistem', 'AI Business Advisor', 'Laporan bulanan', '1 user'],
      isPopular: false, buttonText: 'Mulai Sekarang'
    },
    {
      id: 'business', name: 'Business', targetAudience: 'Untuk bisnis kecil dan menengah', priceIdrMonthly: 1490000,
      features: ['Semua di Starter', 'Analytics lanjutan', '3 integrasi sistem', '3 AI Agents', 'KPI monitoring', '5 users'],
      isPopular: false, buttonText: 'Mulai Sekarang'
    },
    {
      id: 'growth', name: 'Growth', targetAudience: 'Untuk bisnis berkembang', priceIdrMonthly: 4990000,
      features: ['Semua di Business', '10 integrasi sistem', '10 AI Agents', 'Workflow automation', 'Predictive analytics', '10 users'],
      isPopular: true, buttonText: 'Mulai Sekarang'
    },
    {
      id: 'scale', name: 'Scale', targetAudience: 'Untuk perusahaan menengah', priceIdrMonthly: 14900000,
      features: ['Semua di Growth', '25+ integrasi sistem', '25 AI Agents', 'Advanced BI & simulation', 'Multi-entity support', '25 users'],
      isPopular: false, buttonText: 'Hubungi Sales'
    },
    {
      id: 'enterprise', name: 'Enterprise', targetAudience: 'Untuk grup & korporasi', priceIdrMonthly: 0, // Custom
      features: ['Solusi fully custom', 'Unlimited integrasi', 'Custom AI Agenton', 'Priority deployment', 'Dedicated team', 'SLA & enterprise support'],
      isPopular: false, buttonText: 'Hubungi Sales'
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
  const setDiagnosticProducts = (products: DiagnosticProduct[]) => {
    const newState = { ...state, diagnosticProducts: products };
    setState(newState);
    syncToFirestore(newState);
  };
  const setSaasPlans = (plans: SaasPlan[]) => {
    const newState = { ...state, saasPlans: plans };
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
    <CmsContext.Provider value={{ state, updateContent, toggleSection, reorderSections, setDiagnosticProducts, setSaasPlans, setFaqs, setAboutStages, setAboutComparisons,
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






