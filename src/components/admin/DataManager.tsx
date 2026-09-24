import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const DataManager: React.FC = () => {
  const { state, setFaqs, setAboutStages, setAboutComparisons, setNavItems, setWorkforceRoles } = useCms();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'faqs'|'stages'|'comparisons'|'nav'|'workforce'>('nav');

  if (!state.editMode) return null;

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 bg-brand-gold text-slate-900 px-4 py-2 rounded-lg font-bold shadow-lg z-[999] hover:bg-yellow-500 transition-colors"
      >
        Manage Data Arrays
      </button>
    );
  }

  const renderNavItems = () => (
    <div className="space-y-4">
      {(state.navItems || []).map((item, index) => (
        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={item.label} onChange={e => { const n = [...state.navItems]; n[index].label = e.target.value; setNavItems(n); }} placeholder="Menu Label" />
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={item.target} onChange={e => { const n = [...state.navItems]; n[index].target = e.target.value; setNavItems(n); }} placeholder="Scroll Target ID" />
        </div>
      ))}
    </div>
  );

  const renderWorkforce = () => (
    <div className="space-y-4">
      {(state.workforceRoles || []).map((role, index) => (
        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={role.title} onChange={e => { const n = [...state.workforceRoles]; n[index].title = e.target.value; setWorkforceRoles(n); }} placeholder="Role Title" />
          <textarea className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={role.desc} onChange={e => { const n = [...state.workforceRoles]; n[index].desc = e.target.value; setWorkforceRoles(n); }} placeholder="Description" />
        </div>
      ))}
    </div>
  );

  
  const renderFaqs = () => (
    <div className="space-y-4">
      {(state.faqs || []).map((faq, index) => (
        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={faq.q} onChange={e => { const n = [...state.faqs]; n[index].q = e.target.value; setFaqs(n); }} placeholder="Question" />
          <textarea className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={faq.a} onChange={e => { const n = [...state.faqs]; n[index].a = e.target.value; setFaqs(n); }} placeholder="Answer" />
        </div>
      ))}
    </div>
  );

  const renderStages = () => (
    <div className="space-y-4">
      {(state.aboutStages || []).map((st, index) => (
        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={st.num} onChange={e => { const n = [...state.aboutStages]; n[index].num = e.target.value; setAboutStages(n); }} placeholder="Number" />
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={st.title} onChange={e => { const n = [...state.aboutStages]; n[index].title = e.target.value; setAboutStages(n); }} placeholder="Title" />
          <textarea className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={st.desc} onChange={e => { const n = [...state.aboutStages]; n[index].desc = e.target.value; setAboutStages(n); }} placeholder="Description" />
        </div>
      ))}
    </div>
  );

  const renderComparisons = () => (
    <div className="space-y-4">
      {(state.aboutComparisons || []).map((comp, index) => (
        <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <input className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={comp.feature} onChange={e => { const n = [...state.aboutComparisons]; n[index].feature = e.target.value; setAboutComparisons(n); }} placeholder="Feature" />
          <textarea className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={comp.traditional} onChange={e => { const n = [...state.aboutComparisons]; n[index].traditional = e.target.value; setAboutComparisons(n); }} placeholder="Traditional Method" />
          <textarea className="w-full mb-2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white" value={comp.buildup} onChange={e => { const n = [...state.aboutComparisons]; n[index].buildup = e.target.value; setAboutComparisons(n); }} placeholder="BuildUp Platform" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed bottom-20 right-4 w-96 max-h-[80vh] flex flex-col bg-slate-900 border border-brand-gold rounded-xl shadow-2xl z-[999] overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-800">
        <h3 className="text-brand-gold font-bold">Data Manager</h3>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">&times;</button>
      </div>
      
      <div className="flex overflow-x-auto bg-slate-800 border-b border-slate-700 p-2 gap-2 hide-scrollbar">
        {['nav', 'workforce', 'faqs', 'stages', 'comparisons'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap capitalize transition-colors ${activeTab === tab ? 'bg-brand-gold text-slate-900 font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        {activeTab === 'nav' && renderNavItems()}
        {activeTab === 'workforce' && renderWorkforce()}
        
        {activeTab === 'faqs' && renderFaqs()}
        {activeTab === 'stages' && renderStages()}
        {activeTab === 'comparisons' && renderComparisons()}
      </div>
    </div>
  );
};
