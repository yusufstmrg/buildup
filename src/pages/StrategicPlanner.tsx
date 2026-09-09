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
  ArrowRight
} from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';

export function StrategicPlanner() {
  const { formatMoney } = useBuildUp();

  // Scenario parameters
  const [revenueGrowth, setRevenueGrowth] = useState<number>(20); // +20%
  const [cogsReduction, setCogsReduction] = useState<number>(5); // -5%
  const [dsoImprovement, setDsoImprovement] = useState<number>(15); // -15 days
  const [selectedScenario, setSelectedScenario] = useState<'Base' | 'Upside' | 'Downside' | 'Stress'>('Base');

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
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Strategic Business Planner™</h1>
            <span className="text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
              Section 11 · Scenario Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
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
                  ? sc === 'Stress' ? 'bg-red-500 text-white shadow-sm' : 'bg-brand-gold text-brand-deep shadow-sm'
                  : 'text-slate-400 hover:text-white'
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
              <h2 className="text-base font-bold text-white">Interactive Scenario Levers</h2>
            </div>
            <span className="text-xs text-slate-400">Baseline Revenue: Rp 50 Miliar</span>
          </div>

          {/* Lever 1: Revenue Target */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
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
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-20% Stress</span>
              <span>+20% Base</span>
              <span>+60% Aggressive</span>
            </div>
          </div>

          {/* Lever 2: Procurement & COGS Optimization */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
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
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0% Current</span>
              <span>5% RFQ Target</span>
              <span>15% Dual-Sourcing Max</span>
            </div>
          </div>

          {/* Lever 3: DSO Working Capital Improvement */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
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
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0 Days</span>
              <span>15 Days</span>
              <span>30 Days (Cash Rush)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-brand-navy border border-brand-border text-xs text-slate-300">
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
              <div className="text-2xl font-black text-white">
                Projected Operating EBITDA: <span className="text-emerald-400">{formatMoney(simEbitda)}</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Baseline: {formatMoney(baseEbitda)} (EBITDA Expansion: <strong>+{formatMoney(ebitdaGain)}</strong>)
              </div>
            </div>

            {/* Metric Tiles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-surface/80 border border-brand-border rounded-xl p-4">
                <div className="text-xs text-slate-400">Total Simulated Revenue</div>
                <div className="text-lg font-bold text-white mt-1">{formatMoney(simRevenue)}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">+{revenueGrowth}% over baseline</div>
              </div>

              <div className="bg-brand-surface/80 border border-brand-border rounded-xl p-4">
                <div className="text-xs text-slate-400">Cash Released from DSO</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">{formatMoney(cashReleased)}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Permanent balance sheet buffer</div>
              </div>

              <div className="bg-brand-surface/80 border border-brand-border rounded-xl p-4">
                <div className="text-xs text-slate-400">Operating EBITDA Margin</div>
                <div className="text-lg font-bold text-brand-gold mt-1">
                  {((simEbitda / simRevenue) * 100).toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">vs 15.0% current baseline</div>
              </div>

              <div className="bg-brand-surface/80 border border-brand-border rounded-xl p-4">
                <div className="text-xs text-slate-400">Enterprise Value Added</div>
                <div className="text-lg font-bold text-white mt-1">
                  +{formatMoney(ebitdaGain * 7)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Based on 7.0x EBITDA multiple</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-border mt-4">
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldLight hover:from-brand-goldDark hover:to-brand-gold text-brand-deep font-extrabold text-xs uppercase tracking-wider shadow-gold-sm transition-all">
              Commit Scenario as Active 90-Day Execution Target
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
