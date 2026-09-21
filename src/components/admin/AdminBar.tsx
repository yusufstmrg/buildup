// src/components/admin/AdminBar.tsx
import React, { useState, useEffect } from "react";
import { useCms } from "../../context/CmsContext";
import { useTheme } from "../../context/ThemeContext";

export const AdminBar: React.FC = () => {
  const { state, toggleEditMode, setThemeOverrides, updateContent, toggleSection, reorderSections, setPricing } = useCms();
  const { theme, setTheme } = useTheme();
  
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('admin') === 'true');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        const newIsAdmin = !isAdmin;
        setIsAdmin(newIsAdmin);
        if (newIsAdmin) {
          localStorage.setItem('admin', 'true');
        } else {
          localStorage.removeItem('admin');
          toggleEditMode(false); // Automatically exit edit mode when hiding admin bar
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin, toggleEditMode]);

  const handleEditToggle = () => {
    toggleEditMode(!state.editMode);
  };

  if (!isAdmin) return null;

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "buildup_cms_config.json");
    dlAnchorElem.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const config = JSON.parse(event.target?.result as string);
        if (config.themeOverrides) setThemeOverrides(config.themeOverrides);
        if (config.content) Object.keys(config.content).forEach(k => updateContent(k, config.content[k]));
        if (config.visibleSections) {
          Object.entries(config.visibleSections).forEach(([k, v]) => toggleSection(k, v as boolean));
        }
        if (config.sectionOrder) reorderSections(config.sectionOrder);
        if (config.pricing) setPricing(config.pricing);
        alert("Configuration imported successfully!");
      } catch (err) {
        alert("Failed to parse config file");
      }
    };
    reader.readAsText(file);
  };

  const applyPreset = (preset: 'gold' | 'emerald') => {
    if (preset === 'gold') {
      setThemeOverrides({ primary: '#d4af37', background: '#0f172a', glow: '#d4af3733' });
    } else {
      setThemeOverrides({ primary: '#10b981', background: '#022c22', glow: '#10b98133' });
    }
  };

  const handleClearCache = () => {
    if (window.confirm("This will clear all local edits and reload default content. Are you sure?")) {
      localStorage.removeItem('buildup-cms-state-v2');
      window.location.reload();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-slate-900 border-b border-brand-gold/30 text-white p-2 flex justify-between items-center shadow-lg text-xs md:text-sm">
      <div className="flex items-center gap-4">
        <span className="font-bold text-brand-gold uppercase tracking-wider hidden sm:inline">BuildUp Studio</span>
        <button 
          onClick={handleEditToggle}
          className={"px-3 py-1 rounded transition-colors font-medium " + (state.editMode ? "bg-brand-gold text-slate-900" : "bg-slate-800 hover:bg-slate-700")}
        >
          {state.editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        </button>
        <div className="hidden md:flex gap-2 border-l border-slate-700 pl-4">
          <button onClick={() => applyPreset('gold')} className="px-2 hover:text-brand-gold">Gold Theme</button>
          <button onClick={() => applyPreset('emerald')} className="px-2 hover:text-emerald-500">Emerald Theme</button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded transition-colors">
          Import
          <input type="file" accept=".json" className="hidden" onChange={handleImport} />
        </label>
        <button onClick={handleExport} className="bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded transition-colors hidden sm:block">Export</button>
        <button onClick={handleClearCache} className="bg-red-900/50 hover:bg-red-800 text-red-200 px-3 py-1 rounded transition-colors">Reset</button>
      </div>
    </div>
  );
};
