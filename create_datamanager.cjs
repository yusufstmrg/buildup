const fs = require('fs');

const code = 
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const DataManager: React.FC = () => {
  const { state, setPricing, setFaqs, setAboutStages, setAboutComparisons } = useCms();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'pricing'|'faqs'|'stages'|'comparisons'>('pricing');

  if (!state.editMode) return null;

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-brand-gold text-slate-900 px-4 py-2 rounded-lg font-bold shadow-lg z-[999] hover:bg-yellow-500 transition-colors"
      >
        Manage Data Arrays
      </button>
    );
  }

  const renderPricing = () => (
    <div className="space-y-4">
      {state.pricing.map((tier, index) => (
        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={tier.name} onChange={e => { const n = [...state.pricing]; n[index].name = e.target.value; setPricing(n); }} placeholder="Package Name" />
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" type="number" value={tier.priceIdr} onChange={e => { const n = [...state.pricing]; n[index].priceIdr = Number(e.target.value); setPricing(n); }} placeholder="Price IDR" />
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" type="number" value={tier.priceUsd} onChange={e => { const n = [...state.pricing]; n[index].priceUsd = Number(e.target.value); setPricing(n); }} placeholder="Price USD" />
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={tier.description} onChange={e => { const n = [...state.pricing]; n[index].description = e.target.value; setPricing(n); }} placeholder="Description" />
          <textarea className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={tier.features.join(', ')} onChange={e => { const n = [...state.pricing]; n[index].features = e.target.value.split(',').map(s=>s.trim()); setPricing(n); }} placeholder="Features (comma separated)" />
        </div>
      ))}
    </div>
  );

  const renderFaqs = () => (
    <div className="space-y-4">
      {state.faqs.map((faq, index) => (
        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={faq.q} onChange={e => { const n = [...state.faqs]; n[index].q = e.target.value; setFaqs(n); }} placeholder="Question" />
          <textarea className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={faq.a} onChange={e => { const n = [...state.faqs]; n[index].a = e.target.value; setFaqs(n); }} placeholder="Answer" />
        </div>
      ))}
    </div>
  );

  const renderStages = () => (
    <div className="space-y-4">
      {state.aboutStages.map((st, index) => (
        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={st.num} onChange={e => { const n = [...state.aboutStages]; n[index].num = e.target.value; setAboutStages(n); }} placeholder="Number (01)" />
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={st.title} onChange={e => { const n = [...state.aboutStages]; n[index].title = e.target.value; setAboutStages(n); }} placeholder="Title" />
          <textarea className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={st.desc} onChange={e => { const n = [...state.aboutStages]; n[index].desc = e.target.value; setAboutStages(n); }} placeholder="Description" />
        </div>
      ))}
    </div>
  );

  const renderComparisons = () => (
    <div className="space-y-4">
      {state.aboutComparisons.map((c, index) => (
        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={c.feature} onChange={e => { const n = [...state.aboutComparisons]; n[index].feature = e.target.value; setAboutComparisons(n); }} placeholder="Feature" />
          <textarea className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={c.traditional} onChange={e => { const n = [...state.aboutComparisons]; n[index].traditional = e.target.value; setAboutComparisons(n); }} placeholder="Traditional" />
          <textarea className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={c.buildup} onChange={e => { const n = [...state.aboutComparisons]; n[index].buildup = e.target.value; setAboutComparisons(n); }} placeholder="BuildUp" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 w-[28rem] max-h-[80vh] flex flex-col bg-slate-900 border border-brand-border rounded-xl shadow-2xl z-[999] overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-slate-800">
        <h3 className="text-brand-gold font-bold text-lg">Manage Data Arrays</h3>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white font-bold">X</button>
      </div>
      
      <div className="flex gap-2 p-4 border-b border-slate-800 overflow-x-auto text-sm">
        <button className={activeTab === 'pricing' ? 'text-brand-gold font-bold' : 'text-slate-400'} onClick={() => setActiveTab('pricing')}>Pricing</button>
        <button className={activeTab === 'faqs' ? 'text-brand-gold font-bold' : 'text-slate-400'} onClick={() => setActiveTab('faqs')}>FAQs</button>
        <button className={activeTab === 'stages' ? 'text-brand-gold font-bold' : 'text-slate-400'} onClick={() => setActiveTab('stages')}>Stages</button>
        <button className={activeTab === 'comparisons' ? 'text-brand-gold font-bold' : 'text-slate-400'} onClick={() => setActiveTab('comparisons')}>Comparisons</button>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        {activeTab === 'pricing' && renderPricing()}
        {activeTab === 'faqs' && renderFaqs()}
        {activeTab === 'stages' && renderStages()}
        {activeTab === 'comparisons' && renderComparisons()}
      </div>
    </div>
  );
};
\;

fs.writeFileSync('src/components/admin/DataManager.tsx', code);
