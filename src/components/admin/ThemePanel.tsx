// src/components/admin/ThemePanel.tsx
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { useCms } from '../../context/CmsContext';

export const ThemePanel: React.FC = () => {
  const { state, setThemeOverrides } = useCms();
  
  if (!state.editMode) return null;

  const currentPrimary = state.themeOverrides?.primary || '#d4af37';
  const currentBackground = state.themeOverrides?.background || '#0f172a';
  const currentGlow = state.themeOverrides?.glow || '#d4af3733';

  return (
    <div className="fixed right-4 top-16 w-80 bg-slate-900 border border-brand-border rounded-xl shadow-2xl p-4 z-[999] overflow-y-auto max-h-[80vh]">
      <h3 className="text-brand-gold font-bold text-lg mb-4">Theme Configuration</h3>
      
      <div className="mb-6">
        <label className="block text-sm text-slate-300 mb-2">Primary Color</label>
        <HexColorPicker 
          color={currentPrimary} 
          onChange={(color) => setThemeOverrides({ primary: color })} 
          className="w-full"
        />
        <div className="mt-2 text-xs text-slate-400">Current: {currentPrimary}</div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-slate-300 mb-2">Background Color</label>
        <HexColorPicker 
          color={currentBackground} 
          onChange={(color) => setThemeOverrides({ background: color })} 
          className="w-full"
        />
        <div className="mt-2 text-xs text-slate-400">Current: {currentBackground}</div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-slate-300 mb-2">Glow/Accent Color</label>
        <HexColorPicker 
          color={currentGlow} 
          onChange={(color) => setThemeOverrides({ glow: color })} 
          className="w-full"
        />
        <div className="mt-2 text-xs text-slate-400">Current: {currentGlow}</div>
      </div>
      
      <p className="text-xs text-slate-500 italic mt-4">
        Changes are saved automatically and persist locally.
      </p>
    </div>
  );
};
