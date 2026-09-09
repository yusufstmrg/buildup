import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  DollarSign, 
  Sliders, 
  Cpu, 
  BarChart3, 
  Lock,
  Workflow,
  AlertTriangle,
  Award,
  Zap,
  ChevronDown
} from 'lucide-react';
import { BuildUpLogo } from '../components/BuildUpLogo';
import { LanguageSelector } from '../components/LanguageSelector';
import { ERPConnectorsSection } from '../components/ERPConnectorsSection';
import { useBuildUp } from '../context/BuildUpContext';

export function LandingPage() {
  const { 
    setIsHealthCheckModalOpen, 
    currency, 
    setCurrency, 
    formatMoney,
    setIsAuthModalOpen,
    setAuthModalMode,
    language,
    t
  } = useBuildUp();

  // ROI Calculator state
  const [revenue, setRevenue] = useState(50); // in Miliar IDR (e.g. 50B IDR)
  const [headcount, setHeadcount] = useState(75);
  const [industry, setIndustry] = useState('Distribution & Trading');

  // Calculated leakage
  const estimatedLeakageIdr = (revenue * 1000000000) * 0.048; // 4.8% average leakage
  const recoverableSavingsIdr = estimatedLeakageIdr * 0.68; // 68% recoverable
  const roiMultiplier = ((recoverableSavingsIdr / (45000000 * 12))).toFixed(1);

  // Active Method Stage state
  const [activeMethod, setActiveMethod] = useState(0);

  const methodStages = [
    { title: '1. UNDERSTAND', role: 'Ingest & Context Map', desc: 'Connects to your SAP, Odoo, Accurate, Jurnal, CRM, and banking data without replacing your System of Record.' },
    { title: '2. ASSESS', role: 'Health Signal & Scoring', desc: 'Continuous automated scoring across 8 organizational dimensions against real Indonesian & regional industry benchmarks.' },
    { title: '3. DISCOVER', role: 'Evidence-Backed Root Cause', desc: 'Detects why cash is locked, where margins are bleeding, and which processes are slowing customer fulfillment.' },
    { title: '4. PRIORITIZE', role: 'Economic Agenda', desc: 'Ranks every challenge by Value × Urgency × Feasibility × Risk so executive leadership only focuses on top 5% highest-yield items.' },
    { title: '5. DESIGN', role: 'Transformation Blueprint', desc: 'Generates auditable Decision Objects with clear alternatives, projected EBITDA impact, confidence %, and authority gates.' },
    { title: '6. IMPLEMENT', role: 'AI Workforce + Business OS', desc: 'Dispatches routine workflows to coordinated AI Agents (AI CFO, AI Procurement, AI Controller) within governed policy limits.' },
    { title: '7. MEASURE', role: 'Outcome Attribution', desc: 'Measures exact verified financial savings, cash released from working capital, and cycle-time compression.' },
    { title: '8. IMPROVE', role: 'Continuous Loop', desc: 'Constantly recalibrates models and playbooks so the business gets smarter, leaner, and more profitable every week.' },
    { title: '9. SUSTAIN', role: 'Internal Control & Governance', desc: '24/7 Segregation of Duties (SoD) enforcement, duplicate payment blocking, and statutory compliance audit trails.' }
  ];

  const products = [
    { num: '01', name: 'BuildUp Health Check™', badge: 'Free / Low Friction', desc: 'Fast, high-signal business health screening across 8 dimensions. Generates your initial BuildUp Score™.' },
    { num: '02', name: 'BuildUp Business X-Ray™', badge: 'Paid Diagnostic', desc: 'Evidence-backed root cause analysis, value leakage quantification, and 90-day prioritized transformation agenda.' },
    { num: '03', name: 'BuildUp Score™ Pro', badge: 'Subscription', desc: 'Live continuous benchmark progression, ongoing diagnostic tracking, and automated governance audit.' },
    { num: '04', name: 'BuildUp 360™', badge: 'Premium Sprint', desc: 'Deep cross-functional assessment and comprehensive transformation blueprint across people, process & tech.' },
    { num: '05', name: 'BuildUp Transformation™', badge: 'Core Project', desc: 'End-to-end execution of prioritized operational and financial improvements with measured EBITDA milestones.' },
    { num: '06', name: 'BuildUp Intelligence™', badge: 'Recurring Intelligence', desc: 'The Business Context Graph & Decision Engine that sits above your existing software to uncover 2nd-order effects.' },
    { num: '07', name: 'BuildUp Business OS™', badge: 'Platform OS', desc: 'Governed workflow orchestration layer, multi-system approval gates, and autonomous execution policies.' },
    { num: '08', name: 'BuildUp AI Workforce', badge: 'Digital Organization', desc: '12 coordinated specialized digital roles: AI CEO, AI CFO, AI Controller, AI Procurement, AI CRO, AI COO, AI Risk.' },
    { num: '09', name: 'Enterprise Integration', badge: 'Custom Architecture', desc: 'Multi-entity corporate groups, complex legacy systems, bank API connections, and specialized private cloud deployments.' }
  ];

  return (
    <div className="min-h-screen bg-brand-deep text-slate-200 selection:bg-brand-gold/30">
      
      {/* 1. INSTITUTIONAL TOPBAR & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-brand-deep/90 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <BuildUpLogo size="md" variant="horizontal" showSubtitle={true} />
            </Link>
            <div className="hidden xl:flex items-center gap-1 pl-4 border-l border-brand-border text-xs font-semibold tracking-wide text-slate-300">
              <a href="#connectors" className="hover:text-brand-gold px-2.5 py-1.5 transition-colors">{t('navConnectors')}</a>
              <a href="#calculator" className="hover:text-brand-gold px-2.5 py-1.5 transition-colors">{t('navLeakageCalc')}</a>
              <a href="#methodology" className="hover:text-brand-gold px-2.5 py-1.5 transition-colors">{t('navMethodology')}</a>
              <a href="#workforce" className="hover:text-brand-gold px-2.5 py-1.5 transition-colors">{t('navAIWorkforce')}</a>
              <Link to="/about" className="hover:text-brand-gold px-2.5 py-1.5 transition-colors">{t('navAbout')}</Link>
              <Link to="/pricing" className="hover:text-brand-gold px-2.5 py-1.5 transition-colors">{t('navPricing')}</Link>
              <Link to="/contact" className="hover:text-brand-gold px-2.5 py-1.5 transition-colors">{t('navContact')}</Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Currency toggle */}
            <div className="hidden sm:flex items-center bg-brand-navy border border-brand-border rounded-lg p-0.5 text-xs">
              <button 
                onClick={() => setCurrency('IDR')}
                className={`px-2 py-1 rounded font-bold text-[11px] transition-colors ${currency === 'IDR' ? 'bg-brand-gold text-brand-deep' : 'text-slate-400 hover:text-white'}`}
              >
                IDR
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded font-bold text-[11px] transition-colors ${currency === 'USD' ? 'bg-brand-gold text-brand-deep' : 'text-slate-400 hover:text-white'}`}
              >
                USD
              </button>
            </div>

            {/* Login & Register Buttons */}
            <Link
              to="/login"
              className="px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 border border-brand-border rounded-xl transition-all"
            >
              {t('clientPortalLogin')}
            </Link>

            <Link
              to="/register"
              className="hidden md:inline-flex items-center px-3.5 py-2 text-xs font-black text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold rounded-xl hover:opacity-95 shadow-md transition-all"
            >
              {t('registerBusiness')}
            </Link>

            {/* CTA Buttons */}
            <button
              onClick={() => setIsHealthCheckModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-xs font-bold tracking-wide transition-all shadow-gold-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Health Check™</span>
            </button>

            <Link
              to="/app"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 hover:border-brand-gold/50 text-xs font-bold tracking-wide transition-all"
              title="Evaluasi platform dalam mode simulasi interaktif"
            >
              <span>{t('exploreDemoCTA')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-radial-grid">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-brand-card/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top Positioning Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-navy border border-brand-gold/30 text-xs font-bold text-brand-gold shadow-gold-sm tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
              {t('heroBadge')}
            </div>

            {/* Hero Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              {t('heroTitle')}
            </h1>

            {/* Hero Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Core Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsHealthCheckModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldLight hover:from-brand-goldDark hover:to-brand-gold text-brand-deep font-extrabold text-sm tracking-wide shadow-gold-glow transition-all flex items-center justify-center gap-3 group"
              >
                <Sparkles className="w-4 h-4 text-brand-deep group-hover:rotate-12 transition-transform" />
                <span>{t('freeHealthCheckCTA')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/app"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-card/80 hover:bg-brand-card text-white font-bold text-sm border border-brand-border hover:border-brand-gold/40 transition-all flex items-center justify-center gap-3"
              >
                <span>{t('exploreDemoCTA')}</span>
                <ChevronRight className="w-4 h-4 text-brand-gold" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              {[
                { label: 'Avg. Recovered Leakage', val: 'Rp 1.45 Miliar / yr', sub: 'Detected in first 90 days' },
                { label: 'Decision Engine Accuracy', val: '96.2%', sub: 'Auditable Decision Objects' },
                { label: 'Deployment Time', val: '< 7 Days', sub: 'Zero system replacement' },
                { label: 'Client Operating ROI', val: '10.6x Measured', sub: 'Outcome-based economics' },
              ].map((b, i) => (
                <div key={i} className="bg-brand-surface/70 border border-brand-border/70 rounded-xl p-4">
                  <div className="text-xs text-slate-400 font-medium">{b.label}</div>
                  <div className="text-lg font-black text-white mt-1 text-gold-gradient">{b.val}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{b.sub}</div>
                </div>
              ))}
            </div>

          </div>

          {/* 3. HERO INTERACTIVE PULSE SHOWCASE CARD */}
          <div className="mt-14 max-w-5xl mx-auto bg-gradient-to-b from-brand-card to-brand-navy rounded-2xl border border-brand-gold/25 p-6 shadow-2xl overflow-hidden relative">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-white tracking-wide uppercase">
                  {t('featContextGraph')}
                </span>
              </div>
              <span className="text-xs font-semibold text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded border border-brand-gold/20">
                {t('featModeOrchestrate')}
              </span>
            </div>

            {/* Context Graph Visualization */}
            <div className="py-6 overflow-x-auto">
              <div className="flex items-center justify-between min-w-[720px] gap-2">
                {[
                  { node: 'Customer', sub: '2,840 Active' },
                  { node: 'Sales Order', sub: 'Rp 48.2B YTD' },
                  { node: 'Revenue', sub: '+18.4% YoY' },
                  { node: 'Inventory', sub: '14d Turnover' },
                  { node: 'Supplier', sub: '65% Top 2 (Alert)' },
                  { node: 'Purchase', sub: 'RFQ Active' },
                  { node: 'Cash / DSO', sub: '61d (+18d drag)' },
                  { node: 'Margin / Profit', sub: '14.2% Net' }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all ${
                      item.node.includes('Supplier') || item.node.includes('Cash')
                        ? 'bg-brand-navy border-yellow-500/50 text-yellow-400 shadow-sm'
                        : 'bg-brand-surface border-brand-border text-slate-200'
                    }`}>
                      <div className="text-xs font-extrabold">{item.node}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{item.sub}</div>
                    </div>
                    {idx < 7 && <span className="text-brand-gold font-bold">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Instant AI Intervention Preview */}
            <div className="bg-brand-surface/90 border border-brand-border rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Decision Object #DEC-2026-089</span>
                    <span className="text-[10px] font-bold uppercase bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded">
                      Confidence 96%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    <strong>AI Procurement:</strong> Supplier price normalization will recover <strong>Rp 420.000.000 / year</strong> on raw materials. Ready for approval.
                  </p>
                </div>
              </div>
              <Link
                to="/intelligence"
                className="px-4 py-2 rounded-lg bg-brand-gold hover:bg-brand-goldDark text-brand-deep text-xs font-bold tracking-wide transition-colors shrink-0"
              >
                {t('featInspectObject')}
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3B. VIDEO TEASER */}
      <section className="relative py-16 border-t border-brand-border bg-brand-surface/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight">{t('videoTeaserHeading')}</h2>
            <p className="text-sm text-slate-400 mt-2">
              {t('videoTeaserSubheading')}
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-brand-gold/20 shadow-2xl bg-brand-navy aspect-video flex items-center justify-center group">
             <video 
               className="w-full h-full object-cover"
               controls
               autoPlay
               muted
               loop
               playsInline
               src="/promo-video.mp4"
             >
               Your browser does not support the video tag.
             </video>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE VALUE LEAKAGE & TRANSFORMATION ROI CALCULATOR */}
      <section id="calculator" className="py-20 border-t border-brand-border bg-brand-surface/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              {t('navLeakageCalc')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
              {t('calcHeading')}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              {t('calcSubheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-center">
            {/* Input Controls */}
            <div className="lg:col-span-6 bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-white mb-2">
                  <span>{t('calcRevenue')}</span>
                  <span className="text-brand-gold font-bold text-base">
                    {formatMoney(revenue * 1000000000)}
                  </span>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-brand-navy rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>Rp 5 Miliar</span>
                  <span>Rp 250 Miliar</span>
                  <span>Rp 500+ Miliar</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t('calcIndustry')}
                </label>
                <select 
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-brand-navy border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold"
                >
                  <option>Distribution & Trading</option>
                  <option>Manufacturing & FMCG</option>
                  <option>Retail & Multi-Outlet F&B</option>
                  <option>Construction & Engineering</option>
                  <option>Professional Services & IT</option>
                  <option>Healthcare & Pharmaceuticals</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-white mb-2">
                  <span>{t('calcEmployees')}</span>
                  <span className="text-brand-silverLight font-bold">{headcount}</span>
                </div>
                <input 
                  type="range"
                  min="15"
                  max="600"
                  step="5"
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  className="w-full h-2 bg-brand-navy rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
              </div>

              <div className="pt-2 border-t border-brand-border text-xs text-slate-400">
                💡 <em>Did you know?</em> Companies in <strong>{industry}</strong> lose an average of 4.8% of top-line revenue annually to unvetted supplier pricing, uncollected receivables, and manual invoice disputes.
              </div>
            </div>

            {/* Calculated Impact Card */}
            <div className="lg:col-span-6 bg-gradient-to-b from-brand-card to-brand-navy border border-brand-gold/40 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-1">
                {t('calcRecoverable')}
              </div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                {formatMoney(recoverableSavingsIdr)}
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {t('calcExplanation')}
              </p>

              <div className="space-y-3 mt-6 pt-6 border-t border-brand-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Procurement & Price Leakage:</span>
                  <span className="text-white font-semibold">{formatMoney(recoverableSavingsIdr * 0.42)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">DSO & Working Capital Recovery:</span>
                  <span className="text-white font-semibold">{formatMoney(recoverableSavingsIdr * 0.35)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Operational Handoff & Re-work:</span>
                  <span className="text-white font-semibold">{formatMoney(recoverableSavingsIdr * 0.23)}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-brand-border/60">
                  <span className="text-brand-gold">{t('calcRoiMultiplier')}</span>
                  <span className="text-brand-gold text-sm">{roiMultiplier}x</span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setIsHealthCheckModalOpen(true)}
                  className="w-full bg-gradient-to-r from-brand-gold to-brand-goldLight hover:from-brand-goldDark hover:to-brand-gold text-brand-deep font-extrabold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-gold-glow transition-all"
                >
                  {t('calcCtaBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4B. ERP & SYSTEM CONNECTIVITY LAYER */}
      <ERPConnectorsSection />

      {/* 5. THE BUILDUP METHOD™ OPERATING LOOP */}
      <section id="methodology" className="py-20 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              {t('navMethodology')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
              {t('methodologyHeading')}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              {t('methodologySubheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {methodStages.map((stage, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveMethod(idx)}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  activeMethod === idx 
                    ? 'bg-brand-surface border-brand-gold shadow-gold-sm' 
                    : 'bg-brand-card/50 border-brand-border hover:border-brand-borderLight'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-brand-gold tracking-wide">
                    {stage.title}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Stage {idx + 1}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{stage.role}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-brand-navy border border-brand-border text-center text-xs text-slate-400">
            <strong>Core Design Rule (Section 5.2):</strong> BuildUp never automates a bad process blindly. The platform first determines whether the constraint is process, people, policy, data, system, incentive, control, or execution. Only then does it execute automation.
          </div>
        </div>
      </section>

      {/* 6. PRODUCT & COMMERCIAL ARCHITECTURE MATRIX (STAGES 1 - 9) */}
      <section id="products" className="py-20 border-t border-brand-border bg-brand-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              {t('navSolutions')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
              {t('productsHeading')}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              {t('productsSubheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((prod, idx) => (
              <div 
                key={idx}
                className="bg-brand-surface border border-brand-border rounded-xl p-6 flex flex-col hover:border-brand-gold/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-black text-slate-600 group-hover:text-brand-gold transition-colors">{prod.num}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full border border-brand-gold/20">
                    {prod.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{prod.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-1">{prod.desc}</p>
                <div className="mt-4 pt-4 border-t border-brand-border">
                  <Link
                    to="/app"
                    className="text-xs font-semibold text-brand-gold hover:text-brand-goldLight inline-flex items-center gap-1.5"
                  >
                    <span>Inspect Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. THE COORDINATED AI WORKFORCE SHOWCASE */}
      <section id="workforce" className="py-20 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              {t('navAIWorkforce')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
              {t('workforceHeading')}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              {t('workforceSubheading')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { role: 'AI CEO', focus: 'Enterprise Synthesis & Priorities', deliverable: 'Daily executive brief, scenario trade-offs, material escalations' },
              { role: 'AI CFO', focus: 'Financial Performance & Liquidity', deliverable: '13-week cash forecast, budget variance, DSO acceleration' },
              { role: 'AI Controller', focus: 'Accounting Control & Integrity', deliverable: 'Fast close, automated reconciliations, variance review' },
              { role: 'AI Procurement', focus: 'Spend & Supplier Economics', deliverable: 'RFQ normalization, vendor price benchmarks, contract audits' },
              { role: 'AI CRO / Sales', focus: 'Revenue Pipeline & Velocity', deliverable: 'Lead scoring, pricing margin thresholds, win/loss analytics' },
              { role: 'AI COO', focus: 'Operations & Process SOPs', deliverable: 'Bottleneck detection, SLA tracking, delivery optimization' },
              { role: 'AI Risk & Control', focus: 'Internal Control & Audit', deliverable: 'Continuous transaction testing, SoD violations, fraud prevention' },
              { role: 'AI Strategy', focus: 'Planning & Scenarios', deliverable: 'Continuous reforecasting, market sensitivity, 90-day execution plans' },
            ].map((agent, i) => (
              <div key={i} className="bg-brand-surface border border-brand-border rounded-xl p-4 flex flex-col hover:border-brand-gold/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-bold text-xs mb-3">
                  AI
                </div>
                <h4 className="text-sm font-bold text-white">{agent.role}</h4>
                <div className="text-[11px] font-semibold text-brand-gold mt-0.5 mb-2">{agent.focus}</div>
                <p className="text-[11px] text-slate-400 leading-relaxed flex-1">{agent.deliverable}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/workforce"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy border border-brand-border hover:border-brand-gold/50 text-xs font-bold text-slate-200 transition-all"
            >
              <span>Explore All 12 AI Roles in Digital Workforce Studio</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. COMPETITIVE DISTINCTION TABLE */}
      <section className="py-20 border-t border-brand-border bg-brand-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              {t('strategicMoatHeading')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
              {t('strategicMoatTitle')}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              {t('strategicMoatSub')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-brand-border rounded-xl overflow-hidden">
              <thead className="bg-brand-navy text-slate-300 font-bold uppercase tracking-wider border-b border-brand-border">
                <tr>
                  <th className="p-4">Alternative</th>
                  <th className="p-4">Conventional Strength</th>
                  <th className="p-4 text-red-400">Structural Limitation</th>
                  <th className="p-4 text-brand-gold bg-brand-gold/5">BuildUp Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-slate-300">
                <tr>
                  <td className="p-4 font-bold text-white">Traditional Consulting (McKinsey / Big 4)</td>
                  <td className="p-4 text-slate-400">Deep domain prestige</td>
                  <td className="p-4 text-slate-400">High billing rate; labor-intensive; hand off slide decks without owning continuous execution</td>
                  <td className="p-4 font-semibold text-white bg-brand-gold/5">AI-native continuous delivery + measured economic outcome attribution</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">ERP Software Alone (SAP / Odoo / Accurate)</td>
                  <td className="p-4 text-slate-400">System of Record</td>
                  <td className="p-4 text-slate-400">Only records transactions; cannot diagnose why margins bleed or automate cross-system decisions</td>
                  <td className="p-4 font-semibold text-white bg-brand-gold/5">The Intelligence & Orchestration layer above ERP: "Your ERP runs the business. BuildUp makes it intelligent."</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Generic AI Chatbots & Employee Tools</td>
                  <td className="p-4 text-slate-400">Isolated text generation</td>
                  <td className="p-4 text-slate-400">Lacks company-wide Business Context Graph; cannot enforce governed financial approvals</td>
                  <td className="p-4 font-semibold text-white bg-brand-gold/5">Closed-loop: Context + Decision + Execution + Outcome with Human Expert Escalation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. COMMERCIAL PACKAGING & PRICING TIERS */}
      <section id="pricing" className="py-20 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              {t('commercialPackHeading')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
              {t('commercialPackTitle')}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              {t('commercialPackSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tier 1: Health Check (Free) */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Entry Diagnostic</div>
                <h3 className="text-xl font-bold text-white">BuildUp Health Check™</h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-white">Rp 0</span>
                  <span className="text-xs text-slate-400 ml-2">/ Free forever</span>
                </div>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Fast, low-friction front door screening to measure company health and benchmark position.
                </p>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Overall Health Score (0-100)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> 8-Dimension performance scores</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Top 3 critical constraint signals</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Instant diagnostic summary PDF</li>
                </ul>
              </div>
              <button
                onClick={() => setIsHealthCheckModalOpen(true)}
                className="mt-8 w-full py-3 rounded-xl bg-brand-navy hover:bg-brand-card text-white border border-brand-border font-bold text-xs tracking-wide transition-colors"
              >
                Run Free Health Check™
              </button>
            </div>

            {/* Tier 2: Business X-Ray™ (Paid Diagnostic) */}
            <div className="bg-gradient-to-b from-brand-card to-brand-navy border-2 border-brand-gold rounded-2xl p-6 flex flex-col justify-between relative shadow-gold-glow">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-gold text-brand-deep text-[10px] font-black uppercase tracking-wider">
                Most Popular Wedge
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-1">Paid Diagnostic Sprint</div>
                <h3 className="text-xl font-bold text-white">Business X-Ray™</h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-gold-gradient">
                    {currency === 'USD' ? '$990' : 'Rp 15.000.000'}
                  </span>
                  <span className="text-xs text-slate-400 ml-2">/ one-time sprint</span>
                </div>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  The evidence-backed diagnostic engine that pinpoints exact root causes and quantifies value leakage.
                </p>
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Complete Value Leakage quantification</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Evidence-backed bottleneck tree</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> 90-Day prioritized transformation agenda</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> 1-on-1 Executive Briefing with Expert Partner</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> 100% money-back if no leakage identified</li>
                </ul>
              </div>
              <Link
                to="/monetization"
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldLight hover:from-brand-goldDark hover:to-brand-gold text-brand-deep font-black text-xs tracking-wider uppercase transition-all text-center shadow-gold-sm"
              >
                Order Business X-Ray™
              </Link>
            </div>

            {/* Tier 3: Transformation Retainer & OS */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Ongoing Transformation</div>
                <h3 className="text-xl font-bold text-white">Transformation Retainer</h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-white">
                    {currency === 'USD' ? '$2,990' : 'Rp 45.000.000'}
                  </span>
                  <span className="text-xs text-slate-400 ml-2">/ month</span>
                </div>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Full AI Workforce deployment, continuous Business OS orchestration, and dedicated Human Expert escalation.
                </p>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> All 12 Coordinated AI Workforce roles</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Business Context Graph & Decision Engine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> 24/7 Internal Control & SoD Engine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Continuous Strategic Scenario Planner</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Dedicated Expert Partner escalation tier</li>
                </ul>
              </div>
              <Link
                to="/monetization"
                className="mt-8 w-full py-3 rounded-xl bg-brand-navy hover:bg-brand-card text-white border border-brand-border font-bold text-xs tracking-wide transition-colors text-center"
              >
                Schedule Executive Intake
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOUNDER DOCTRINE & VISION SECTION */}
      <section className="py-20 border-t border-brand-border bg-gradient-to-b from-brand-deep to-brand-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto text-brand-gold font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-brand-gold">
            {t('founderDoctrineHeading')}
          </div>
          <blockquote className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            {t('founderQuote')}
          </blockquote>
          <div className="pt-2">
            <div className="text-sm font-bold text-brand-gold">Yusuf</div>
            <div className="text-xs text-slate-400">{t('founderTitle')}</div>
          </div>
        </div>
      </section>

      {/* 11. ENTERPRISE FOOTER */}
      <footer className="border-t border-brand-border bg-brand-deep py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BuildUpLogo size="sm" variant="horizontal" showSubtitle={false} />
            <span className="text-xs text-slate-500">© 2026 BuildUp. AI-Native Business Transformation Partner. Terdaftar & Terlindungi.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
            <Link to="/about" className="hover:text-brand-gold transition-colors">{t('navAbout')}</Link>
            <Link to="/pricing" className="hover:text-brand-gold transition-colors">{t('navPricing')}</Link>
            <Link to="/contact" className="hover:text-brand-gold transition-colors">{t('navContact')}</Link>
            <Link to="/login" className="hover:text-brand-gold transition-colors">{t('clientPortalLogin')}</Link>
            <Link to="/register" className="hover:text-brand-gold transition-colors">{t('registerBusiness')}</Link>
            <Link to="/app" className="hover:text-brand-gold transition-colors font-semibold text-brand-gold">{t('exploreDemoCTA')}</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
