import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  Database, 
  Cpu, 
  Filter,
  Search,
  ChevronRight,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useBuildUp, DecisionObject } from '../context/BuildUpContext';

export function Intelligence() {
  const { decisionObjects, approveDecision, escalateDecision } = useBuildUp();
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [activeDecision, setActiveDecision] = useState<DecisionObject>(decisionObjects[0]);
  const [selectedEntity, setSelectedEntity] = useState<string>('Procurement');

  const filteredDecisions = selectedDomain === 'All'
    ? decisionObjects
    : decisionObjects.filter(d => d.domain === selectedDomain);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">BuildUp Intelligence™</h1>
            <span className="text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
              Product Stage 06
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Connected Business Context Graph & Auditable Decision Engine. The brain above your existing systems.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-slate-300">
            Active Context Graph: <strong>4,829 entities</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-emerald-400 font-semibold">
            Inference Latency: <strong>48ms</strong>
          </span>
        </div>
      </div>

      {/* Part 1: Connected Business Context Graph */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-gold" />
            <h2 className="text-base font-bold text-white">Cross-Functional Context Graph</h2>
          </div>
          <span className="text-xs text-slate-400">Section 8.1: Entity & Relationship Mapping</span>
        </div>

        {/* Visual Graph Relationship Bar */}
        <div className="p-4 rounded-xl bg-brand-navy border border-brand-border overflow-x-auto">
          <div className="flex items-center justify-between min-w-[760px] text-center gap-2">
            {[
              { id: 'Customer', name: 'Customer', count: '2,840', sub: 'Accounts Receivable' },
              { id: 'SalesOrder', name: 'Sales Order', count: '8,410', sub: 'Contract Commitments' },
              { id: 'Revenue', name: 'Revenue', count: 'Rp 48.2B', sub: 'General Ledger' },
              { id: 'Inventory', name: 'Inventory', count: '320 SKUs', sub: 'Warehouse / Supply' },
              { id: 'Procurement', name: 'Supplier & PO', count: '142 Vendors', sub: 'Accounts Payable', highlight: true },
              { id: 'Cash', name: 'Cash & Bank', count: '5 Accounts', sub: 'Treasury Liquidity', highlight: true },
              { id: 'Margin', name: 'EBITDA Margin', count: '14.2%', sub: 'P&L Bottom Line' }
            ].map((node, i) => (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedEntity(node.id)}
                  className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                    selectedEntity === node.id
                      ? 'bg-brand-gold/20 border-brand-gold shadow-gold-sm'
                      : node.highlight
                      ? 'bg-brand-card/70 border-yellow-500/40 text-yellow-300'
                      : 'bg-brand-card/40 border-brand-border text-slate-300'
                  }`}
                >
                  <div className="text-[11px] font-bold text-white">{node.name}</div>
                  <div className="text-xs font-black text-brand-gold mt-0.5">{node.count}</div>
                  <div className="text-[9px] text-slate-400 mt-1">{node.sub}</div>
                </button>
                {i < 6 && <span className="text-brand-gold font-black">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-brand-gold" />
          <span>Continuous context indexing detects second-order impacts across inventory delays, pricing leakage, and uncollected invoices.</span>
        </div>
      </div>

      {/* Part 2: Decision Engine (Auditable Decision Objects) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Decision Objects List (5 cols) */}
        <div className="lg:col-span-5 bg-brand-surface border border-brand-border rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-brand-gold" />
              <h2 className="text-sm font-bold text-white">Decision Objects Queue</h2>
            </div>
            <span className="text-[10px] text-slate-400">Auditable Decisional Layer</span>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pb-2">
            {['All', 'Procurement', 'Finance', 'Risk'].map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedDomain === domain 
                    ? 'bg-brand-gold text-brand-deep font-bold' 
                    : 'bg-brand-navy border border-brand-border text-slate-400 hover:text-white'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Decision Cards */}
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredDecisions.map((dec) => {
              const isSelected = activeDecision.id === dec.id;
              return (
                <div
                  key={dec.id}
                  onClick={() => setActiveDecision(dec)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-gold/10 border-brand-gold shadow-gold-sm'
                      : 'bg-brand-card/40 border-brand-border hover:border-brand-borderLight'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-extrabold text-brand-gold">{dec.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      dec.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' :
                      dec.status === 'Escalated to Expert' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {dec.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white mb-1 leading-snug">
                    {dec.title}
                  </h3>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span className="text-emerald-400 font-semibold">{dec.financialImpact}</span>
                    <span>{dec.confidence}% Confidence</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Decision Object Dossier (7 cols) */}
        <div className="lg:col-span-7 bg-brand-surface border border-brand-border rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-5">
            
            {/* Dossier Header */}
            <div className="flex items-start justify-between pb-4 border-b border-brand-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-brand-gold">{activeDecision.code}</span>
                  <span className="text-[10px] font-bold bg-brand-navy border border-brand-border text-slate-300 px-2 py-0.5 rounded">
                    Domain: {activeDecision.domain}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {activeDecision.confidence}% AI Confidence
                  </span>
                </div>
                <h2 className="text-lg font-black text-white">{activeDecision.title}</h2>
                <div className="text-[11px] text-slate-400 mt-0.5">Authoring Agent: <strong>{activeDecision.agent}</strong> · {activeDecision.timestamp}</div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Projected Impact</div>
                <div className="text-sm font-black text-emerald-400">{activeDecision.financialImpact}</div>
              </div>
            </div>

            {/* Problem Statement */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Problem Statement
              </div>
              <div className="p-3.5 rounded-xl bg-brand-navy border border-brand-border text-xs text-slate-200 leading-relaxed">
                {activeDecision.problem}
              </div>
            </div>

            {/* Evidence Base */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-brand-gold" />
                Evidence Base (Cross-System Verification)
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeDecision.evidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2 bg-brand-card/30 p-2.5 rounded-lg border border-brand-border/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold mt-0.5 shrink-0" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Evaluated Options */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Evaluated Options
              </div>
              <div className="space-y-2">
                {activeDecision.options.map((opt, i) => (
                  <div key={i} className="p-3 rounded-xl bg-brand-navy border border-brand-border flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">{opt.label}</div>
                      <div className="text-[11px] text-emerald-400 mt-0.5">{opt.impact}</div>
                    </div>
                    <span className="text-[10px] font-bold bg-brand-card px-2 py-0.5 rounded text-slate-400 border border-brand-border">
                      Risk: {opt.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation & Authority Gate */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-brand-card to-brand-navy border border-brand-gold/30">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-gold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Model Recommendation
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {activeDecision.recommendation}
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                Required Authority Gate: <strong className="text-white">{activeDecision.authority}</strong>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between gap-3">
            {activeDecision.status === 'Pending Review' ? (
              <>
                <button
                  onClick={() => approveDecision(activeDecision.id)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldLight text-brand-deep font-extrabold text-xs uppercase tracking-wider shadow-gold-sm hover:from-brand-goldDark hover:to-brand-gold transition-all"
                >
                  Approve & Dispatch Autonomous Execution
                </button>
                <button
                  onClick={() => escalateDecision(activeDecision.id)}
                  className="px-5 py-3 rounded-xl bg-brand-card hover:bg-brand-border text-slate-200 font-bold text-xs border border-brand-border transition-colors flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-brand-gold" />
                  <span>Escalate to Human Partner</span>
                </button>
              </>
            ) : (
              <div className="w-full py-3 text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                Decision Object Status: {activeDecision.status}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
