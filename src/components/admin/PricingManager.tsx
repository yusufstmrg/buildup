import React, { useState } from 'react';
import { useCms, SaasPlan } from '../../context/CmsContext';

export const PricingManager: React.FC = () => {
  const { state, setSaasPlans } = useCms();
  const [isOpen, setIsOpen] = useState(false);

  if (!state.editMode) return null;

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-brand-gold text-slate-900 px-4 py-2 rounded-lg font-bold shadow-lg z-[999] hover:bg-yellow-500 transition-colors"
      >
        Edit SaaS Plans
      </button>
    );
  }

  const handleUpdate = (index: number, field: string, value: string | number | boolean) => {
    const newPlans = [...state.saasPlans];
    if (field === 'features' && typeof value === 'string') {
      newPlans[index].features = value.split(',').map(f => f.trim());
    } else {
      newPlans[index] = { ...newPlans[index], [field]: value };
    }
    setSaasPlans(newPlans);
  };

  return (
    <div className="fixed bottom-4 right-4 w-[28rem] max-h-[80vh] overflow-y-auto bg-slate-900 border border-brand-border rounded-xl shadow-2xl p-6 z-[999]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-brand-gold font-bold text-lg">Manage SaaS Plans</h3>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
      </div>

      <div className="space-y-6">
        {state.saasPlans.map((plan, index) => (
          <div key={plan.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Name</label>
                <input 
                  type="text" 
                  value={plan.name}
                  onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-1.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Monthly Price (IDR)</label>
                <input 
                  type="number" 
                  value={plan.priceIdrMonthly}
                  onChange={(e) => handleUpdate(index, 'priceIdrMonthly', Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-1.5 text-sm text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Features (comma separated)</label>
              <textarea 
                value={plan.features.join(', ')}
                onChange={(e) => handleUpdate(index, 'features', e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white h-24"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
