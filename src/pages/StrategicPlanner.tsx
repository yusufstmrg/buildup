import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sliders, 
  Target, 
  DollarSign, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  BarChart3,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';

export function StrategicPlanner() {
  const { formatMoney, user } = useBuildUp();

  // Scenario parameters
  const [revenueGrowth, setRevenueGrowth] = useState<number>(20); // +20%
  const [cogsReduction, setCogsReduction] = useState<number>(5); // -5%
  const [dsoImprovement, setDsoImprovement] = useState<number>(15); // -15 days
  const [selectedScenario, setSelectedScenario] = useState<'Base' | 'Upside' | 'Downside' | 'Stress'>('Base');

  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Baseline financials (PT Nusantara Jaya Abadi - IDR 50B baseline)
  const baseRevenue = 50000000000;
  const baseCogs = 32000000000;
  const baseOpex = 10500000000;
  const baseEbitda = baseRevenue - baseCogs - baseOpex; // Rp 7.5B (15%)

  // Recalculations based on sliders
  const simRevenue = baseRevenue * (1 + revenueGrowth / 100);
  const simCogs = baseCogs * (1 - cogsReduction / 100) * (1 + (revenueGrowth * 0.7) / 100);
  const simOpex = baseOpex * 1.05; // 5% scale inflation
  const simEbitda = simRevenue - simCogs - simOpex;
  const ebitdaGain = simEbitda - baseEbitda;
  const cashReleased = (simRevenue / 365) * dsoImprovement;

  const handleScenarioChange = (scenario: 'Base' | 'Upside' | 'Downside' | 'Stress') => {
    setSelectedScenario(scenario);
    if (scenario === 'Base') {
      setRevenueGrowth(15);
      setCogsReduction(4);
      setDsoImprovement(12);
    } else if (scenario === 'Upside') {
      setRevenueGrowth(35);
      setCogsReduction(8);
      setDsoImprovement(22);
    } else if (scenario === 'Downside') {
      setRevenueGrowth(5);
      setCogsReduction(2);
      setDsoImprovement(5);
    } else if (scenario === 'Stress') {
      setRevenueGrowth(-10);
      setCogsReduction(0);
      setDsoImprovement(0);
    }
    setAiAnalysis(null);
  };

  const runAiAnalysis = async () => {
    setLoadingAi(true);
    setAiError(null);
    try {
      const scenarioQuery = `We are modeling a ${selectedScenario} scenario. Target top-line growth is ${revenueGrowth}%. We aim to squeeze COGS by ${cogsReduction}% through vendor renegotiation, and accelerate DSO by ${dsoImprovement} days. Baseline revenue is Rp 50B with 15% EBITDA margin. Evaluate the operational viability and risks of executing this plan over the next 90 days.`;
      
      const res = await fetch('/api/ai/strategic-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: scenarioQuery,
          companyContext: {
            industry: 'Distribution & B2B Trade',
            revenue: 'IDR 50 Billion',
            employeeCount: '150'
          }
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate analysis');
      
      setAiAnalysis(data.analysis);
    } catch (err: any) {
      setAiError(err.message);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-brand-textMain tracking-tight">Strategic Business Planner™</h1>
            <span className="text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
              Section 11 · Scenario Engine
            </span>
          </div>
          <p className="text-xs text-brand-textMuted mt-1">
            Continuous reforecasting, market sensitivity simulations, and dynamic capital allocation.
          </p>
        </div>

        {/* Scenario Toggle */}
        <div className="flex items-center bg-brand-surface border border-brand-border rounded-xl p-1 text-xs">
          {(['Base', 'Upside', 'Downside', 'Stress'] as const).map((sc) => (
            <button
              key={sc}
              onClick={() => handleScenarioChange(sc)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedScenario === sc
                  ? sc === 'Stress' ? 'bg-red-500 text-brand-textMain shadow-sm' : 'bg-brand-gold text-brand-deep shadow-sm'
                  : 'text-brand-textMuted hover:text-brand-textMain'
              }`}
            >
              {sc} Case
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulator & Outcomes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders Console (6 cols) */}
        <div className="lg:col-span-6 bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-brand-gold" />
              <h2 className="text-base font-bold text-brand-textMain">Interactive Scenario Levers</h2>
            </div>
            <span className="text-xs text-brand-textMuted">Baseline Revenue: Rp 50 Miliar</span>
          </div>

          {/* Lever 1: Revenue Target */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-brand-textMain mb-2">
              <span>Top-Line Revenue Growth Target</span>
              <span className="text-brand-gold font-bold text-sm">+{revenueGrowth}%</span>
            </div>
            <input
              type="range"
              min="-20"
              max="60"
              step="5"
              value={revenueGrowth}
              onChange={(e) => setRevenueGrowth(Number(e.target.value))}
              className="w-full h-2 bg-brand-navy rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />
            <div className="flex justify-between text-[10px] text-brand-textMuted mt-1">
              <span>-20% Stress</span>
              <span>+20% Base</span>
              <span>+60% Aggressive</span>
            </div>
          </div>

          {/* Lever 2: Procurement & COGS Optimization */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-brand-textMain mb-2">
              <span>COGS & Procurement Price Optimization</span>
              <span className="text-emerald-400 font-bold text-sm">-{cogsReduction}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={cogsReduction}
              onChange={(e) => setCogsReduction(Number(e.target.value))}
              className="w-full h-2 bg-brand-navy rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />
            <div className="flex justify-between text-[10px] text-brand-textMuted mt-1">
              <span>0% Current</span>
              <span>5% RFQ Target</span>
              <span>15% Dual-Sourcing Max</span>
            </div>
          </div>

          {/* Lever 3: DSO Working Capital Improvement */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-brand-textMain mb-2">
              <span>Debtor Days (DSO) Acceleration</span>
              <span className="text-brand-silver font-bold text-sm">{dsoImprovement} Days Faster</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="2"
              value={dsoImprovement}
              onChange={(e) => setDsoImprovement(Number(e.target.value))}
              className="w-full h-2 bg-brand-navy rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />
            <div className="flex justify-between text-[10px] text-brand-textMuted mt-1">
              <span>0 Days</span>
              <span>15 Days</span>
              <span>30 Days (Cash Rush)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-brand-navy border border-brand-border text-xs text-brand-textMuted">
            <strong>Section 11.2 Sensitivity Insight:</strong> In mid-market distribution, improving DSO by 15 days produces more operational liquidity than a +10% revenue expansion without working capital discipline.
          </div>
        </div>

        {/* Projected Financial Results (6 cols) */}
        <div className="lg:col-span-6 bg-gradient-to-b from-brand-card to-brand-navy border border-brand-gold/40 rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
          <div className="space-y-6">
            <div className="pb-3 border-b border-brand-border">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-1">
                Simulated Financial Outcome
              </div>
              <div className="text-2xl font-black text-brand-textMain">
                Projected Operating EBITDA: <span className="text-emerald-400">{formatMoney(simEbitda)}</span>
              </div>
              <div className="text-xs text-brand-textMuted mt-0.5">
                Baseline: {formatMoney(baseEbitda)} (EBITDA Expansion: <strong>+{formatMoney(ebitdaGain)}</strong>)
              </div>
            </div>

            {/* Metric Tiles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-surface/80 border border-brand-border rounded-xl p-4">
                <div className="text-xs text-brand-textMuted">Total Simulated Revenue</div>
                <div className="text-lg font-bold text-brand-textMain mt-1">{formatMoney(simRevenue)}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">+{revenueGrowth}% over baseline</div>
              </div>

              <div className="bg-brand-surface/80 border border-brand-border rounded-xl p-4">
                <div className="text-xs text-brand-textMuted">Cash Released from DSO</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">{formatMoney(cashReleased)}</div>
                <div className="text-[10px] text-brand-textMuted mt-0.5">Permanent balance sheet buffer</div>
              </div>

              <div className="bg-brand-surface/80 border border-brand-border rounded-xl p-4">
                <div className="text-xs text-brand-textMuted">Operating EBITDA Margin</div>
                <div className="text-lg font-bold text-brand-gold mt-1">
                  {((simEbitda / simRevenue) * 100).toFixed(1)}%
                </div>
                <div className="text-[10px] text-brand-textMuted mt-0.5">vs 15.0% current baseline</div>
              </div>

              <div className="bg-brand-surface/80 border border-brand-border rounded-xl p-4">
                <div className="text-xs text-brand-textMuted">Enterprise Value Added</div>
                <div className="text-lg font-bold text-brand-textMain mt-1">
                  +{formatMoney(ebitdaGain * 7)}
                </div>
                <div className="text-[10px] text-brand-textMuted mt-0.5">Based on 7.0x EBITDA multiple</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-border mt-4 space-y-3">
            <button 
              onClick={runAiAnalysis}
              disabled={loadingAi}
              className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-brand-navy border border-brand-gold/30 hover:bg-brand-surface text-brand-gold font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {loadingAi ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing 10k+ variables...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Ask Gemini AI to Analyze Scenario</>
              )}
            </button>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldLight hover:from-brand-goldDark hover:to-brand-gold text-brand-deep font-extrabold text-xs uppercase tracking-wider shadow-gold-sm transition-all">
              Commit Scenario as Active 90-Day Execution Target
            </button>
          </div>
        </div>

      </div>

      {/* AI Output Rendering */}
      {aiError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
          Error generating insights: {aiError}
        </div>
      )}

      {aiAnalysis && (
        <div className="bg-brand-navy border border-brand-gold/40 rounded-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-500 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[80px] pointer-events-none rounded-full" />
          
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-brand-gold" />
            <h2 className="text-xl font-black text-brand-textMain tracking-tight">Gemini Strategy Brief</h2>
          </div>

          <div className="space-y-8 relative z-10">
            {/* Executive Summary */}
            <div>
              <h3 className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-2">Executive Summary</h3>
              <p className="text-sm text-brand-textMain leading-relaxed font-medium bg-brand-surface border border-brand-border p-4 rounded-xl">
                {aiAnalysis.executiveSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Financial Impact */}
              <div>
                <h3 className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-2">Quantified Impact</h3>
                <div className="bg-brand-surface border border-brand-border rounded-xl p-4 space-y-4">
                  <div>
                    <div className="text-[10px] text-brand-textMuted uppercase font-bold mb-1">EBITDA Projection</div>
                    <div className="text-sm text-brand-gold font-bold">{aiAnalysis.financialImpact.ebitdaImpact}</div>
                  </div>
                  <div className="h-px bg-brand-border" />
                  <div>
                    <div className="text-[10px] text-brand-textMuted uppercase font-bold mb-1">Liquidity & Working Capital</div>
                    <div className="text-sm text-emerald-400 font-bold">{aiAnalysis.financialImpact.cashflowImpact}</div>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div>
                <h3 className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-2">Risk Matrix</h3>
                <div className="space-y-2">
                  {aiAnalysis.riskAssessment?.map((r: any, i: number) => (
                    <div key={i} className="bg-brand-surface border border-brand-border rounded-xl p-3 flex justify-between items-center">
                      <span className="text-xs text-brand-textMuted">{r.risk}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        r.severity === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        r.severity === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {r.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div>
              <h3 className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-3">Immediate AI Execution Directives</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {aiAnalysis.recommendedActions?.map((action: any, i: number) => (
                  <div key={i} className="bg-brand-surface border border-brand-border hover:border-brand-gold/40 transition-colors rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-brand-textMuted uppercase font-bold">{action.department}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        action.priority === 'CRITICAL' ? 'text-red-400 bg-red-500/10' :
                        'text-brand-gold bg-brand-gold/10'
                      }`}>{action.priority}</span>
                    </div>
                    <p className="text-xs text-brand-textMain">{action.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
