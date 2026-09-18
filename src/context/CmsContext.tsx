// src/context/CmsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../firebaseConfig'; // optional Firestore instance
import { doc, setDoc } from 'firebase/firestore';

// Types for editable content and layout
export interface CmsState {
  // map of element ids to HTML content
  content: Record<string, string>;
  // visibility flags for sections (by key)
  visibleSections: Record<string, boolean>;
  // ordered list of section keys
  sectionOrder: string[];
  // pricing configuration
  pricing: PricingTier[];
  // optional theme overrides
  themeOverrides?: Partial<ThemeOverrides>;
  // live‑edit mode flag
  editMode: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  features: string[];
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
  setPricing: (tiers: PricingTier[]) => void;
  setThemeOverrides: (overrides: Partial<ThemeOverrides>) => void;
  toggleEditMode: (enabled: boolean) => void;
}

const defaultState: CmsState = {
  content: {},
  visibleSections: {},
  sectionOrder: [],
  pricing: [],
  themeOverrides: undefined,
  editMode: false,
};

const CmsContext = createContext<CmsContextProps | undefined>(undefined);

export const CmsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CmsState>(defaultState);

  // Load persisted state on mount
  useEffect(() => {
    const saved = localStorage.getItem('cmsState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // Migration: If the old dummy pricing 'basic' is still in localStorage, overwrite it.
        let loadedPricing = parsed.pricing;
        if (loadedPricing && loadedPricing.length > 0 && loadedPricing[0].id === 'basic') {
          loadedPricing = [
            { id: 'diagnostic', name: 'Diagnostic Retainer', price: 'Rp 15.000.000', features: ['8-Dimension Context Graph Analysis', 'Value Leakage Pinpointing', 'Executive Strategic Report', '1-Month Delivery Time'] },
            { id: 'xray', name: 'Business X-Ray', price: 'Rp 45.000.000', features: ['Deep ERP & Banking Integration', 'Automated Decision Objects', 'Continuous KPI Monitoring', 'Monthly Evaluation Session'] },
            { id: 'growth', name: 'Growth & Scale', price: 'Rp 90.000.000', features: ['Full Autonomous Workflow Agents', 'Strategic Re-Forecasting & Sandbox', 'On-Premise/VPC Deployment Option', 'Dedicated Enterprise Architect'] },
          ];
        } else if (!loadedPricing || loadedPricing.length === 0) {
          loadedPricing = [
            { id: 'diagnostic', name: 'Diagnostic Retainer', price: 'Rp 15.000.000', features: ['8-Dimension Context Graph Analysis', 'Value Leakage Pinpointing', 'Executive Strategic Report', '1-Month Delivery Time'] },
            { id: 'xray', name: 'Business X-Ray', price: 'Rp 45.000.000', features: ['Deep ERP & Banking Integration', 'Automated Decision Objects', 'Continuous KPI Monitoring', 'Monthly Evaluation Session'] },
            { id: 'growth', name: 'Growth & Scale', price: 'Rp 90.000.000', features: ['Full Autonomous Workflow Agents', 'Strategic Re-Forecasting & Sandbox', 'On-Premise/VPC Deployment Option', 'Dedicated Enterprise Architect'] },
          ];
        }

        setState(prevState => ({
          ...defaultState,
          ...parsed,
          content: { ...defaultState.content, ...(parsed.content || {}) },
          visibleSections: { ...defaultState.visibleSections, ...(parsed.visibleSections || {}) },
          sectionOrder: parsed.sectionOrder || ['hero', 'calculator', 'connectors', 'workforce', 'pricing', 'about', 'contact'],
          pricing: loadedPricing,
          themeOverrides: parsed.themeOverrides || undefined
        }));
      } catch (e) {
        // Fallback
        setState(defaultState);
      }
    } else {
      // Initialise with sensible defaults
      const init: CmsState = {
        ...defaultState,
        visibleSections: { 
          hero: true, 
          calculator: true,
          connectors: true,
          workforce: true,
          pricing: true, 
          about: true,
          contact: true 
        },
        sectionOrder: ['hero', 'calculator', 'connectors', 'workforce', 'pricing', 'about', 'contact'],
        pricing: [
          { id: 'diagnostic', name: 'Diagnostic Retainer', price: 'Rp 15.000.000', features: ['8-Dimension Context Graph Analysis', 'Value Leakage Pinpointing', 'Executive Strategic Report', '1-Month Delivery Time'] },
          { id: 'xray', name: 'Business X-Ray', price: 'Rp 45.000.000', features: ['Deep ERP & Banking Integration', 'Automated Decision Objects', 'Continuous KPI Monitoring', 'Monthly Evaluation Session'] },
          { id: 'growth', name: 'Growth & Scale', price: 'Rp 90.000.000', features: ['Full Autonomous Workflow Agents', 'Strategic Re-Forecasting & Sandbox', 'On-Premise/VPC Deployment Option', 'Dedicated Enterprise Architect'] },
        ],
      };
      setState(init);
      localStorage.setItem('cmsState', JSON.stringify(init));
    }
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cmsState', JSON.stringify(state));
  }, [state]);

  // Optional Firestore sync (fails silently if not configured)
  const syncToFirestore = async (newState: CmsState) => {
    try {
      const docRef = doc(db, 'cms', 'state');
      await setDoc(docRef, newState);
    } catch (e) {
      // ignore – Firestore may be absent in local dev
    }
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

  const setPricing = (tiers: PricingTier[]) => {
    const newState = { ...state, pricing: tiers };
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
    syncToFirestore(newState);
  };

  return (
    <CmsContext.Provider
      value={{
        state,
        updateContent,
        toggleSection,
        reorderSections,
        setPricing,
        setThemeOverrides,
        toggleEditMode,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
};
