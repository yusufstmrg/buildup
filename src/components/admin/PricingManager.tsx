// src/components/admin/PricingManager.tsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const PricingManager: React.FC = () => {
  const { state, setPricing } = useCms();
  const [isOpen, setIsOpen] = useState(false);

  if (!state.editMode) return null;

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-brand-gold text-slate-900 px-4 py-2 rounded-lg font-bold shadow-lg z-[999] hover:bg-yellow-500 transition-colors"
      >
        Edit Pricing
      </button>
    );
  }

  const handleUpdate = (index: number, field: string, value: string) => {
    const newPricing = [...state.pricing];
    if (field === 'features') {
      newPricing[index].features = value.split(',').map(f => f.trim());
    } else {
      newPricing[index] = { ...newPricing[index], [field]: value };
    }
    setPricing(newPricing);
  };

  const handleAdd = () => {
    setPricing([
      ...state.pricing, 
      { id: `tier-${Date.now()}`, name: 'New Tier', price: '$0', features: ['Feature 1'] }
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 w-[28rem] max-h-[80vh] overflow-y-auto bg-slate-900 border border-brand-border rounded-xl shadow-2xl p-6 z-[999]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-brand-gold font-bold text-lg">Manage Pricing Tiers</h3>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
      </div>

      <div className="space-y-6">
        {state.pricing.map((tier, index) => (
          <div key={tier.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Name</label>
                <input 
                  type="text" 
                  value={tier.name}
                  onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-1.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Price</label>
                <input 
                  type="text" 
                  value={tier.price}
                  onChange={(e) => handleUpdate(index, 'price', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-1.5 text-sm text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Features (comma separated)</label>
              <textarea 
                value={tier.features.join(', ')}
                onChange={(e) => handleUpdate(index, 'features', e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-1.5 text-sm text-white min-h-[60px]"
              />
            </div>
            <button 
              onClick={() => {
                const newPricing = [...state.pricing];
                newPricing.splice(index, 1);
                setPricing(newPricing);
              }}
              className="mt-3 text-red-400 text-xs hover:text-red-300"
            >
              Remove Tier
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={handleAdd}
        className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-brand-gold border border-brand-gold/30 rounded-lg py-2 text-sm font-medium transition-colors"
      >
        + Add New Tier
      </button>
    </div>
  );
};
