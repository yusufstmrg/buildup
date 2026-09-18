import React, { useState } from 'react';
import { 
  Coins, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  CreditCard, 
  Download, 
  FileText, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';

export function MonetizationHub() {
  const { currentPlan, setCurrentPlan, currency, setCurrency, formatMoney } = useBuildUp();
  const [selectedPlanToUpgrade, setSelectedPlanToUpgrade] = useState<string | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const plans = [
    {
      id: 'Free Health Check',
      name: 'BuildUp Health Check™',
      priceIdr: 0,
      priceUsd: 0,
      period: 'Forever free',
      badge: 'Entry Lead Magnet',
      desc: 'Screen company health across 8 dimensions. Generates official Health Score™ and critical constraint signals.',
      features: [
        'BuildUp Score™ (0-100)',
        '8 Organizational Dimension scores',
        'Top 3-5 Critical Warning signals',
        'Benchmark comparison vs regional peers',
        'Directional Value Leakage estimate'
      ]
    },
    {
      id: 'Business X-Ray',
      name: 'BuildUp Business X-Ray™',
      priceIdr: 15000000,
      priceUsd: 990,
      period: 'One-time sprint',
      badge: 'Diagnostic Sprint',
      highlight: true,
      desc: 'Evidence-backed root cause analysis, value leakage quantification, and 90-day prioritized transformation agenda.',
      features: [
        'Full Value Leakage Quantification',
        'Evidence-backed bottleneck tree across systems',
        '90-Day Prioritized Transformation Roadmap',
        'Executive Briefing with Senior Partner',
        '100% Fee Credited toward Transformation Retainer'
      ]
    },
    {
      id: 'Score Pro',
      name: 'BuildUp Score™ Pro',
      priceIdr: 7500000,
      priceUsd: 490,
      period: 'per month',
      badge: 'Continuous Audit',
      desc: 'Live continuous benchmark progression, ongoing diagnostic tracking, and automated governance audit.',
      features: [
        'Continuous automated health scoring',
        'Monthly benchmark recalibration',
        'Automated monthly governance PDF export',
        'Variance tracking across 8 dimensions'
      ]
    },
    {
      id: 'Transformation Retainer',
      name: 'Transformation Retainer',
      priceIdr: 45000000,
      priceUsd: 2990,
      period: 'per month',
      badge: 'Core Engine',
      desc: 'Full AI Workforce deployment, continuous Business OS orchestration, and dedicated Human Expert escalation.',
      features: [
        'All 12 Coordinated AI Workforce roles',
        'Business Context Graph & Decision Engine',
        'Business OS Workflow Orchestration',
        '24/7 Internal Control & SoD Enforcement',
        'Continuous Scenario Simulator',
        'Direct Human Expert Escalation access'
      ]
    },
    {
      id: 'Enterprise',
      name: 'Enterprise Group Transformation',
      priceIdr: 500000000,
      priceUsd: 35000,
      period: 'per year',
      badge: 'Conglomerate License',
      desc: 'Multi-entity corporate groups, complex legacy systems, bank API connections, and dedicated on-premise private clouds.',
      features: [
        'Multi-company consolidated Intelligence',
        'Custom ERP & proprietary bank API bridges',
        'Dedicated Private VPC / Sovereign Cloud setup',
        'On-site Executive Transformation Partner',
        'Custom internal audit SLA & board reporting'
      ]
    }
  ];

  const handleOpenCheckout = (planId: string) => {
    setSelectedPlanToUpgrade(planId);
    setShowCheckoutModal(true);
    setCheckoutSuccess(false);
  };

  const handleConfirmCheckout = () => {
    if (selectedPlanToUpgrade) {
      setCurrentPlan(selectedPlanToUpgrade as any);
      setCheckoutSuccess(true);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-brand-textMain tracking-tight">Commercial & Monetization Engine</h1>
            <span className="text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
              Section 16 · Revenue Architecture
            </span>
          </div>
          <p className="text-xs text-brand-textMuted mt-1">
            BuildUp monetization packages, client value attribution, and instant contract generation.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center bg-brand-surface border border-brand-border rounded-xl p-1 text-xs">
          <button
            onClick={() => setCurrency('IDR')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${currency === 'IDR' ? 'bg-brand-gold text-brand-deep shadow-sm' : 'text-brand-textMuted hover:text-brand-textMain'}`}
          >
            IDR (Rupiah)
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${currency === 'USD' ? 'bg-brand-gold text-brand-deep shadow-sm' : 'text-brand-textMuted hover:text-brand-textMain'}`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Value Realization & Client ROI Statement */}
      <div className="bg-gradient-to-r from-brand-card to-brand-navy border border-brand-gold/40 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full border border-brand-gold/20">
              Active Client Attribution Statement
            </span>
            <h2 className="text-xl font-black text-brand-textMain mt-2">
              Measured Value Unlocked This Quarter: <span className="text-emerald-400">{formatMoney(480000000, 31000)}</span>
            </h2>
            <p className="text-xs text-brand-textMuted mt-1 max-w-2xl">
              You invested in <strong>{currentPlan}</strong>. BuildUp's automated supplier quotation normalization and DSO acceleration workflows have directly recovered 10.6x your investment.
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs text-brand-textMuted font-semibold">Attributed ROI</div>
            <div className="text-3xl font-black text-gold-gradient">10.6x Return</div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Audited by AI Controller</div>
          </div>
        </div>
      </div>

      {/* Pricing Matrix */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-brand-textMain">Commercial Tier Packaging</h2>
          <span className="text-xs text-brand-textMuted">Section 16.1 Product Pricing Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((p) => {
            const isCurrent = currentPlan === p.id;
            return (
              <div
                key={p.id}
                className={`bg-brand-surface border rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                  p.highlight
                    ? 'border-brand-gold shadow-gold-glow ring-1 ring-brand-gold'
                    : 'border-brand-border hover:border-brand-borderLight'
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-deep text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
                    Recommended Wedge
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-textMuted">{p.badge}</span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded uppercase">
                        Active Plan
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-brand-textMain mb-2">{p.name}</h3>

                  <div className="my-3">
                    <span className="text-2xl font-black text-brand-textMain">
                      {p.priceIdr === 0 ? 'Free' : formatMoney(p.priceIdr, p.priceUsd)}
                    </span>
                    <span className="text-xs text-brand-textMuted ml-2">/ {p.period}</span>
                  </div>

                  <p className="text-xs text-brand-textMuted leading-relaxed mb-6">{p.desc}</p>

                  <div className="space-y-2.5 pt-4 border-t border-brand-border">
                    <div className="text-[10px] font-extrabold uppercase text-brand-gold tracking-wider">
                      Included Capabilities:
                    </div>
                    {p.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-brand-textMuted">
                        <Check className="w-3.5 h-3.5 text-brand-gold mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-border">
                  <button
                    onClick={() => handleOpenCheckout(p.id)}
                    className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      isCurrent
                        ? 'bg-brand-navy border border-brand-border text-brand-textMuted cursor-default'
                        : p.highlight
                        ? 'bg-gradient-to-r from-brand-gold to-brand-goldLight text-brand-deep shadow-gold-sm hover:from-brand-goldDark hover:to-brand-gold'
                        : 'bg-brand-card hover:bg-brand-border text-brand-textMain border border-brand-border'
                    }`}
                  >
                    {isCurrent ? 'Current Active Subscription' : `Upgrade to ${p.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Checkout & Invoicing Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-deep/80 backdrop-blur-md">
          <div className="bg-brand-surface border border-brand-gold/40 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
            {!checkoutSuccess ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-textMain">Commercial Order & Invoice Generation</h3>
                    <p className="text-xs text-brand-textMuted">Plan Selected: <strong>{selectedPlanToUpgrade}</strong></p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-navy border border-brand-border text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-brand-textMuted">Organization:</span>
                    <span className="text-brand-textMain font-semibold">PT Nusantara Jaya Abadi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-textMuted">Billing Cycle:</span>
                    <span className="text-brand-textMain font-semibold">Contractual / Monthly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-textMuted">Payment Gateway:</span>
                    <span className="text-brand-gold font-semibold">BCA Corporate Virtual Account / Mandiri</span>
                  </div>
                  <div className="pt-2 border-t border-brand-border flex justify-between font-bold text-sm">
                    <span className="text-brand-textMain">Total Payable:</span>
                    <span className="text-emerald-400">
                      {selectedPlanToUpgrade === 'Business X-Ray' ? formatMoney(15000000, 990) :
                       selectedPlanToUpgrade === 'Score Pro' ? formatMoney(7500000, 490) :
                       selectedPlanToUpgrade === 'Transformation Retainer' ? formatMoney(45000000, 2990) :
                       selectedPlanToUpgrade === 'Enterprise' ? formatMoney(500000000, 35000) : 'Rp 0'}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-brand-textMuted leading-relaxed">
                  Upon execution, automated tax invoice (Faktur Pajak) and signed transformation service agreement are generated and dispatched to your corporate email.
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleConfirmCheckout}
                    className="flex-1 py-3 bg-gradient-to-r from-brand-gold to-brand-goldLight text-brand-deep font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-gold-sm transition-all"
                  >
                    Confirm & Activate Service
                  </button>
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    className="px-4 py-3 bg-brand-card hover:bg-brand-border text-brand-textMuted font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-brand-textMain">Subscription Activated!</h4>
                <p className="text-xs text-brand-textMuted max-w-sm mx-auto">
                  Your organization is now officially operating on <strong>{currentPlan}</strong>. Pro-Forma Invoice #INV-BU-2026-0812 has been issued to accounting.
                </p>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="mt-4 px-6 py-2 bg-brand-navy border border-brand-border text-brand-textMain text-xs font-semibold rounded-lg"
                >
                  Return to Hub
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
