import React, { useState } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  FileSearch, 
  PieChart, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  Download, 
  Layers, 
  Target,
  BarChart3,
  Clock,
  DollarSign
} from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';

export function Diagnostics() {
  const { 
    overallScore, 
    dimensions, 
    setIsHealthCheckModalOpen, 
    formatMoney, 
    totalAnnualLeakageIdr, 
    totalAnnualLeakageUsd 
  } = useBuildUp();

  const [activeTab, setActiveTab] = useState<'dimensions' | 'leakage' | 'roadmap'>('dimensions');

  const leakageBreakdown = [
    { category: 'Procurement Price Variance', amount: 480000000, desc: 'Overpaying for raw packaging materials due to lack of normalized supplier quotations.', agent: 'AI Procurement', severity: 'Critical' },
    { category: 'Unbilled Receivables (DSO Drag)', amount: 420000000, desc: '18-day average delay in customer payment cycle due to manual Surat Jalan matching.', agent: 'AI CFO', severity: 'High' },
    { category: 'Operational Re-work & Dispatch Waste', amount: 310000000, desc: 'Manual CSV handoffs between sales orders and warehouse logistics causing mis-shipments.', agent: 'AI COO', severity: 'Medium' },
    { category: 'Internal Control & Maverick Spend', amount: 240000000, desc: 'Purchases made outside approved vendor lists without competitive RFQ verification.', agent: 'AI Risk & Control', severity: 'High' },
  ];

  const roadmap90Day = [
    { phase: 'Days 1 - 30: Quick Cash Recovery', target: 'Recover Rp 500M+ Liquidity', tasks: [
      'Automate invoice delivery with digital delivery receipt attachments (Surat Jalan)',
      'Enforce strict 3-quote policy on top 20 packaging & raw materials vendors',
      'Revoke conflicting ERP permissions to resolve Segregation of Duties (SoD) breaches'
    ]},
    { phase: 'Days 31 - 60: Operating Margin Defense', target: 'Expand EBITDA by 1.8%', tasks: [
      'Deploy autonomous AI Procurement RFQ normalization engine',
      'Integrate warehouse logistics dispatch directly with ERP sales order status',
      'Institute weekly rolling 13-week liquidity forecasting with automated debtor scoring'
    ]},
    { phase: 'Days 61 - 90: Autonomous Scale & Control', target: 'Institutionalize Continuous OS', tasks: [
      'Activate 24/7 autonomous transaction anomaly and duplicate payment testing',
      'Establish dynamic sales pricing approval gates based on live gross margin thresholds',
      'Conduct 90-day transformation review with BuildUp Certified Partner & Board'
    ]}
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Diagnostics & Business X-Ray™</h1>
            <span className="text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
              Product Stages 01 - 04
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evidence-backed root cause analysis, value leakage quantification, and prioritized 90-day transformation agenda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsHealthCheckModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldLight text-brand-deep font-bold text-xs shadow-gold-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Retake 8-Dimension Screening</span>
          </button>
        </div>
      </div>

      {/* Top Banner: Score & Total Leakage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-brand-surface border border-brand-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center font-black text-xl text-gold-gradient shrink-0">
            {overallScore}
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase">BuildUp Health Score™</div>
            <div className="text-base font-bold text-white">
              {overallScore >= 80 ? 'Robust · Growth Ready' : overallScore >= 65 ? 'Moderate · Leakage Present' : 'Vulnerable · Action Required'}
            </div>
            <div className="text-[10px] text-slate-500">Benchmark: 80/100 (Regional Mid-Market)</div>
          </div>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase">Quantified Value Leakage</div>
            <div className="text-base font-bold text-emerald-400">
              {formatMoney(totalAnnualLeakageIdr, totalAnnualLeakageUsd)} / year
            </div>
            <div className="text-[10px] text-slate-500">Identified across 4 operational domains</div>
          </div>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase">Transformation Window</div>
            <div className="text-base font-bold text-white">90-Day Execution Sprint</div>
            <div className="text-[10px] text-slate-500">Recover 68% of leakage within 90 days</div>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-brand-border">
        <button
          onClick={() => setActiveTab('dimensions')}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'dimensions'
              ? 'border-brand-gold text-brand-gold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          8 Organizational Dimensions
        </button>
        <button
          onClick={() => setActiveTab('leakage')}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'leakage'
              ? 'border-brand-gold text-brand-gold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Quantified Value Leakage Map
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'roadmap'
              ? 'border-brand-gold text-brand-gold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          90-Day Transformation Agenda
        </button>
      </div>

      {/* Tab 1: 8 Dimensions */}
      {activeTab === 'dimensions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensions.map((dim, idx) => (
            <div key={idx} className="bg-brand-surface border border-brand-border rounded-xl p-5 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wide">{dim.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    dim.status === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    dim.status === 'Warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {dim.status}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-black text-gold-gradient">{dim.score}</span>
                  <span className="text-xs text-slate-500">/ 100</span>
                  <span className="text-[11px] text-slate-400 ml-auto">Benchmark: {dim.benchmark}</span>
                </div>

                <div className="h-1.5 w-full bg-brand-navy rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-goldDark to-brand-gold rounded-full"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  {dim.findings}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-brand-navy border border-brand-border text-[11px] text-slate-400">
                <strong className="text-brand-gold">Root Bottleneck:</strong> {dim.bottleneck}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Quantified Leakage */}
      {activeTab === 'leakage' && (
        <div className="space-y-4">
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1">Value Leakage Quantification</h2>
            <p className="text-xs text-slate-400 mb-6">
              Empirical calculation of recoverable capital across pricing, working capital, and operational waste.
            </p>

            <div className="space-y-3">
              {leakageBreakdown.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-brand-navy border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{item.category}</span>
                      <span className="text-[9px] font-bold uppercase bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                      {item.desc}
                    </p>
                    <div className="text-[11px] text-brand-gold font-medium">
                      Assigned Agent: {item.agent}
                    </div>
                  </div>

                  <div className="text-right sm:shrink-0">
                    <div className="text-xs text-slate-400">Estimated Annual Loss</div>
                    <div className="text-lg font-black text-red-400">{formatMoney(item.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 90-Day Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="space-y-4">
          {roadmap90Day.map((phase, idx) => (
            <div key={idx} className="bg-brand-surface border border-brand-border rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-brand-gold/15 text-brand-gold font-bold flex items-center justify-center text-xs">
                    0{idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-white">{phase.phase}</h3>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Target: {phase.target}
                </span>
              </div>

              <ul className="space-y-2">
                {phase.tasks.map((task, tidx) => (
                  <li key={tidx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
