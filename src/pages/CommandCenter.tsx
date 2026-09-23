import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  Target, 
  BrainCircuit, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  DollarSign, 
  Clock, 
  Search,
  ArrowRight,
  Filter,
  BarChart3
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useBuildUp } from '../context/BuildUpContext';
import { Link } from 'react-router-dom';
import { PremiumLock } from '../components/PremiumLock';

export function CommandCenter() {
  const { 
    user,
    overallScore, 
    hasCompletedHealthCheck,
    hasPendingDiagnostic,
    setIsHealthCheckModalOpen, 
    decisionObjects, 
    approveDecision, 
    escalateDecision,
    formatMoney,
    currency,
    totalAnnualLeakageIdr,
    totalAnnualLeakageUsd,
    criticalSignals
  } = useBuildUp();

  const chartData = (user?.isSandbox || hasCompletedHealthCheck) ? [
    { week: 'W1', revenue: 4200, margin: 1250, cash: 3100 },
    { week: 'W2', revenue: 4800, margin: 1420, cash: 3050 },
    { week: 'W3', revenue: 4600, margin: 1380, cash: 2900 },
    { week: 'W4', revenue: 5100, margin: 1600, cash: 3400 },
    { week: 'W5', revenue: 5400, margin: 1720, cash: 3650 },
    { week: 'W6', revenue: 5900, margin: 1890, cash: 3950 },
    { week: 'W7', revenue: 6400, margin: 2150, cash: 4300 },
  ] : [];

  const [activeGraphNode, setActiveGraphNode] = useState<string>('Supplier');

  return (
    <div className="space-y-6">

      {/* Welcome Banner — shown after sign-up with pending diagnostic */}
      {hasPendingDiagnostic && (
        <div className="border border-brand-gold/50 bg-gradient-to-r from-brand-gold/10 via-brand-gold/5 to-transparent rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-2xl">🔥</div>
            <div className="flex-1">
              <div className="text-sm font-black text-brand-gold mb-1">Laporan Diagnosis Anda Sudah Tersimpan!</div>
              <p className="text-xs text-brand-textMuted">
                Selamat datang di BuildUp Command Center. Hasil audit bisnis Anda sudah terhubung ke dashboard — lihat BuildUp Score™ dan temuan kritis di bawah.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-black text-gold-gradient">{overallScore}<span className="text-sm font-normal text-brand-textMuted">/100</span></div>
              <div className="text-[10px] text-brand-textMuted">Business Health Score™</div>
            </div>
          </div>
          {criticalSignals.length > 0 && (
            <div className="mt-3 pt-3 border-t border-brand-gold/20 space-y-1">
              {criticalSignals.slice(0, 2).map((signal, i) => (
                <p key={i} className="text-xs text-brand-textMuted flex items-start gap-2">
                  <span className="text-amber-400 shrink-0 mt-0.5">⚠</span>
                  {signal}
                </p>
              ))}
              {criticalSignals.length > 2 && (
                <p className="text-[10px] text-brand-gold font-semibold">+{criticalSignals.length - 2} temuan lainnya tersimpan di laporan Anda</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-brand-textMain tracking-tight">Enterprise Command Center</h1>
            <span className="text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
              Live System
            </span>
          </div>
          <p className="text-xs text-brand-textMuted mt-1">
            Real-time cross-functional synthesis across Finance, Sales, Operations, and Governance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsHealthCheckModalOpen(true)}
            className="bg-gradient-to-r from-brand-gold to-brand-goldLight hover:from-brand-goldDark hover:to-brand-gold text-brand-deep font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-gold-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Run Health Check™</span>
          </button>

          <Link
            to="/planner"
            className="bg-brand-surface hover:bg-brand-card text-brand-textMain border border-brand-border px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <TrendingUp className="w-4 h-4 text-brand-gold" />
            <span>Simulate Scenario</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Score Card */}
        <div className="bg-brand-surface border border-brand-border hover:border-brand-gold/40 rounded-xl p-5 relative overflow-hidden transition-all group">
          <div className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-1">BuildUp Score™</div>
          <div className="text-3xl font-black text-gold-gradient tracking-tight mb-2">
            {user?.isSandbox || hasCompletedHealthCheck ? overallScore : '--'}<span className="text-sm font-normal text-brand-textMuted">/100</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> {(user?.isSandbox || hasCompletedHealthCheck) ? '+4 pts in 30d' : 'Needs Data'}
            </span>
            <button 
              onClick={() => setIsHealthCheckModalOpen(true)}
              className="text-[11px] text-brand-gold hover:underline font-bold"
            >
              Recalculate ↗
            </button>
          </div>
        </div>

        {/* Working Capital Card */}
        <div className="bg-brand-surface border border-brand-border hover:border-brand-gold/40 rounded-xl p-5 relative overflow-hidden transition-all group">
          <div className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-1">Working Capital Freed</div>
          <div className="text-2xl font-black text-brand-textMain tracking-tight mb-2">
            {user?.isSandbox || hasCompletedHealthCheck ? formatMoney(totalAnnualLeakageIdr * 1.2, totalAnnualLeakageUsd * 1.2) : formatMoney(0, 0)}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> {(user?.isSandbox || hasCompletedHealthCheck) ? 'DSO -17 Days' : 'DSO -- Days'}
            </span>
            <span className="text-brand-textMuted text-[11px]">AI CFO Active</span>
          </div>
        </div>

        {/* Active AI Workflows */}
        <div className="bg-brand-surface border border-brand-border hover:border-brand-gold/40 rounded-xl p-5 relative overflow-hidden transition-all group">
          <div className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-1">Active AI Workflows</div>
          <div className="text-2xl font-black text-brand-textMain tracking-tight mb-2">
            {user?.isSandbox || hasCompletedHealthCheck ? '18 / 18' : '0 / 18'} <span className="text-xs font-normal text-brand-textMuted">Autonomous</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {(user?.isSandbox || hasCompletedHealthCheck) ? '99.4% SLA' : '--% SLA'}
            </span>
            <Link to="/workforce" className="text-[11px] text-brand-gold hover:underline font-bold">
              Inspect ↗
            </Link>
          </div>
        </div>

        {/* Value Leakage Identified */}
        <div className="bg-brand-surface border border-brand-border hover:border-brand-gold/40 rounded-xl p-5 relative overflow-hidden transition-all group">
          <div className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-1">Recoverable Leakage</div>
          <div className="text-2xl font-black text-emerald-400 tracking-tight mb-2">
            {user?.isSandbox || hasCompletedHealthCheck ? formatMoney(totalAnnualLeakageIdr, totalAnnualLeakageUsd) : formatMoney(0, 0)}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-yellow-400 font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> {(user?.isSandbox || hasCompletedHealthCheck) ? `${criticalSignals.length || 0} Bottlenecks` : '0 Bottlenecks'}
            </span>
            <Link to="/diagnostics" className="text-[11px] text-brand-gold hover:underline font-bold">
              X-Ray Map ↗
            </Link>
          </div>
        </div>

      </div>

      {/* Interactive Business Context Graph Component */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-4 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-brand-textMain">Business Context Graph™</h2>
              <span className="text-[10px] font-bold bg-brand-navy border border-brand-border text-brand-silver px-2 py-0.5 rounded">
                Section 8.1: Connected Intelligence
              </span>
            </div>
            <p className="text-xs text-brand-textMuted mt-0.5">
              Click any node to reveal second-order financial & operational ripple effects.
            </p>
          </div>
          <div className="text-xs text-brand-textMuted">
            Selected Entity: <strong className="text-brand-gold">{activeGraphNode}</strong>
          </div>
        </div>

        {/* Graph Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { id: 'Customer', label: 'Customer', metric: user?.isSandbox ? '2,840 Active' : '0 Active', status: user?.isSandbox ? 'normal' : 'normal' },
            { id: 'SalesOrder', label: 'Sales Order', metric: user?.isSandbox ? 'Rp 48.2B YTD' : 'Rp 0', status: user?.isSandbox ? 'normal' : 'normal' },
            { id: 'Revenue', label: 'Revenue', metric: user?.isSandbox ? '+18.4% YoY' : '-- YoY', status: user?.isSandbox ? 'normal' : 'normal' },
            { id: 'Inventory', label: 'Inventory', metric: user?.isSandbox ? '14d Turn' : '--d Turn', status: user?.isSandbox ? 'normal' : 'normal' },
            { id: 'Supplier', label: 'Supplier', metric: user?.isSandbox ? '65% Top 2 (Alert)' : 'Needs Data', status: user?.isSandbox ? 'alert' : 'normal' },
            { id: 'Purchase', label: 'Purchase Order', metric: user?.isSandbox ? 'RFQ Active' : 'No Data', status: user?.isSandbox ? 'normal' : 'normal' },
            { id: 'Cash', label: 'Cash / DSO', metric: user?.isSandbox ? '61d Drag' : '--d Drag', status: user?.isSandbox ? 'warning' : 'normal' },
            { id: 'Margin', label: 'Margin / Profit', metric: user?.isSandbox ? '14.2% Net' : '--% Net', status: user?.isSandbox ? 'normal' : 'normal' },
          ].map((n) => {
            const isSelected = activeGraphNode === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setActiveGraphNode(n.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected 
                    ? 'bg-brand-gold/15 border-brand-gold shadow-gold-sm' 
                    : n.status === 'alert'
                    ? 'bg-red-500/10 border-red-500/40 text-red-300 hover:border-red-400'
                    : n.status === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-300 hover:border-yellow-400'
                    : 'bg-brand-card/40 border-brand-border text-brand-textMuted hover:border-brand-borderLight'
                }`}
              >
                <div className="text-[11px] font-bold text-brand-textMain truncate">{n.label}</div>
                <div className="text-[10px] text-brand-textMuted mt-1">{n.metric}</div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Context Detail Card */}
        <div className="mt-4 p-4 rounded-xl bg-brand-navy border border-brand-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">Graph Causal Trace:</span>
            <p className="text-xs text-brand-textMain mt-0.5">
              {activeGraphNode === 'Supplier' && "Supplier concentration in packaging -> 8.4% above benchmark quotation -> reduces gross margin by 1.2% -> inflates raw material cash burn."}
              {activeGraphNode === 'Cash' && "Customer payment delay (+18 days DSO) -> locks Rp 1.85B in uncollected working capital -> requires bank overdraft utilization."}
              {activeGraphNode === 'Customer' && "Top 20% of customers generate 74% of operating contribution. Low churn risk detected (96.2% retention score)."}
              {activeGraphNode === 'SalesOrder' && "Order fulfillment velocity averages 3.2 days. 92% of orders processed autonomously via Business OS."}
              {activeGraphNode === 'Revenue' && "Strong revenue trajectory pacing ahead of annual target (+18.4% YoY). Focus remains margin defense."}
              {activeGraphNode === 'Inventory' && "Safety stock levels optimized to 14-day turnover. Zero dead stock identified in last monthly close."}
              {activeGraphNode === 'Purchase' && "Automated 3-quote policy enforced for all POs exceeding Rp 25.000.000 threshold."}
              {activeGraphNode === 'Margin' && "Current net margin of 14.2%. Targeted expansion to 16.8% through procurement normalization and DSO recovery."}
            </p>
          </div>
          <Link
            to="/intelligence"
            className="text-xs font-bold text-brand-gold hover:text-brand-goldLight flex items-center gap-1.5 shrink-0"
          >
            <span>Open Intelligence Graph</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Chart + Decision Engine Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart Column (7 cols) */}
        <div className="lg:col-span-7 bg-brand-surface border border-brand-border rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-brand-textMain">Revenue, Margin & Cash Trajectory</h2>
              <p className="text-xs text-brand-textMuted">Weekly trajectory with BuildUp operational intervention</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-brand-textMuted">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" /> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-brand-textMuted">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Free Cash
              </span>
            </div>
          </div>

          <div className="h-72 w-full mt-2">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="emeraldArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E3550" vertical={false} />
                  <XAxis dataKey="week" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B1726', borderColor: '#1E3550', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2.5} fillOpacity={1} fill="url(#goldArea)" />
                  <Area type="monotone" dataKey="cash" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#emeraldArea)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-brand-textMuted border-2 border-dashed border-brand-border rounded-xl">
                <BarChart3 className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm font-semibold">Menunggu Integrasi Data</p>
                <p className="text-xs max-w-[250px] text-center mt-1">Sistem belum menerima aliran data historis Anda. Hubungkan ERP Anda untuk melihat statistik.</p>
              </div>
            )}
          </div>
        </div>

        {/* Decision Engine Pending Review Column (5 cols) */}
        <div className="lg:col-span-5">
        <PremiumLock featureName="Decision Engine" requiredPlan="Transformation Retainer">
        <div className="lg:col-span-5 bg-brand-surface border border-brand-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-brand-gold" />
                <h2 className="text-base font-bold text-brand-textMain">Decision Engine</h2>
              </div>
              <span className="text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                {decisionObjects.filter(d => d.status === 'Pending Review').length} Pending Review
              </span>
            </div>

            <div className="space-y-3">
              {decisionObjects.length > 0 ? (
                decisionObjects.slice(0, 2).map((dec) => (
                  <div key={dec.id} className="p-4 rounded-xl bg-brand-navy border border-brand-border space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-brand-gold">{dec.agent}</span>
                      <span className="text-[10px] text-brand-textMuted">{dec.timestamp}</span>
                    </div>
                    
                    <h3 className="text-xs font-bold text-brand-textMain leading-snug">
                      {dec.title}
                    </h3>

                    <p className="text-[11px] text-brand-textMuted leading-relaxed">
                      {dec.problem}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-brand-border/60">
                      <span className="text-emerald-400 font-semibold">{dec.financialImpact}</span>
                      <span className="text-brand-textMuted">{dec.confidence}% Confidence</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      {dec.status === 'Pending Review' ? (
                        <>
                          <button
                            onClick={() => approveDecision(dec.id)}
                            className="flex-1 py-1.5 rounded-lg bg-brand-gold hover:bg-brand-goldDark text-brand-deep font-bold text-[11px] transition-colors"
                          >
                            Approve & Execute
                          </button>
                          <button
                            onClick={() => escalateDecision(dec.id)}
                            className="py-1.5 px-3 rounded-lg bg-brand-card hover:bg-brand-border text-brand-textMuted text-[11px] font-semibold transition-colors"
                          >
                            Escalate
                          </button>
                        </>
                      ) : (
                        <div className="w-full py-1 text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-lg">
                          Status: {dec.status}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-brand-textMuted text-center">
                  <ShieldCheck className="w-8 h-8 mb-2 opacity-50 text-brand-gold" />
                  <p className="text-xs font-semibold">Belum Ada Keputusan Tertunda</p>
                  <p className="text-[10px] mt-1 max-w-[200px]">AI Gateway sedang memantau operasi Anda. Keputusan otomatis akan muncul di sini.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-brand-border">
            <Link
              to="/intelligence"
              className="text-xs font-bold text-brand-gold hover:underline flex items-center justify-center gap-1"
            >
              <span>View All Auditable Decision Objects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        </PremiumLock>
        </div>

      </div>

    </div>
  );
}

