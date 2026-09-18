// src/components/admin/AdminBar.tsx
import React from "react";
import { useCms } from "../../context/CmsContext";
import { useTheme } from "../../context/ThemeContext";

export const AdminBar: React.FC = () => {
  const { state, toggleEditMode, setThemeOverrides, updateContent, toggleSection, reorderSections, setPricing } = useCms();
  const { theme, setTheme } = useTheme();

  const handleEditToggle = () => {
    toggleEditMode(!state.editMode);
  };

  const isAdmin = localStorage.getItem('admin') === 'true';

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
      setThemeOverrides({ primary: '#10b981', background: '#064e3b', glow: '#10b98133' });
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all configurations to their default values?")) {
      localStorage.removeItem('buildup-cms');
      window.location.reload();
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "48px",
      background: "var(--color-primary, #d4af37)",
      color: "#1e293b",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      zIndex: 1000,
      fontWeight: "bold"
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span>BuildUp Admin Live Editor</span>
        <button onClick={handleExport} className="px-2 py-1 bg-white/20 rounded text-sm hover:bg-white/30">Export</button>
        <label className="px-2 py-1 bg-white/20 rounded text-sm hover:bg-white/30 cursor-pointer">
          Import
          <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
        </label>
        <select onChange={(e) => applyPreset(e.target.value as any)} defaultValue="" className="px-2 py-1 bg-white/20 rounded text-sm text-slate-900 border-none outline-none">
          <option value="" disabled>Presets...</option>
          <option value="gold">Executive Gold</option>
          <option value="emerald">Emerald Wealth</option>
        </select>
        <button onClick={handleReset} className="px-2 py-1 bg-red-500/20 text-red-900 rounded text-sm hover:bg-red-500/40">Reset to Defaults</button>
      </div>
      <div>
        <button onClick={handleEditToggle} style={{ marginRight: 8 }} className="px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30">
          {state.editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        </button>
      </div>
    </div>
  );
};
