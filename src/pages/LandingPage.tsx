import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, BrainCircuit, ShieldCheck, TrendingUp, Activity, Users, CheckCircle2, 
  ChevronRight, Building2, DollarSign, Sliders, Cpu, BarChart3, Lock, Workflow, AlertTriangle, 
  Award, Zap, ChevronDown
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { BuildUpLogo } from '../components/BuildUpLogo';
import { LanguageSelector } from '../components/LanguageSelector';
import { ERPConnectorsSection } from '../components/ERPConnectorsSection';
import { useBuildUp } from '../context/BuildUpContext';
import { AboutSection } from '../components/AboutSection';
import { PricingSection } from '../components/PricingSection';
import { ContactSection } from '../components/ContactSection';
import { EditableText } from '../components/admin/EditableText';
import { useCms } from '../context/CmsContext';

export function LandingPage() {
  const { 
    setIsHealthCheckModalOpen, 
    currency, 
    setCurrency, 
    formatMoney,
    language,
    t
  } = useBuildUp();
  const { state } = useCms();

  const [revenue, setRevenue] = useState(50);
  const [headcount, setHeadcount] = useState(75);
  const [industry, setIndustry] = useState('Distribution & Trading');

  const estimatedLeakageIdr = (revenue * 1000000000) * 0.048;
  const recoverableSavingsIdr = estimatedLeakageIdr * 0.68;

  // Smooth scroll helper
  const smoothScrollTo = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-deep text-brand-textMain selection:bg-brand-gold/30">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-brand-navy/95 backdrop-blur-md border-b border-brand-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center shrink-0">
              <BuildUpLogo size="md" variant="horizontal" showSubtitle={true} />
            </button>
            <nav className="hidden xl:flex items-center gap-1 pl-4 border-l border-brand-border text-xs font-semibold tracking-wide">
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand-gold hover:bg-brand-surface px-3 py-2 rounded-lg transition-all text-brand-textMuted">Home</button>
              <button onClick={() => smoothScrollTo('about')} className="hover:text-brand-gold hover:bg-brand-surface px-3 py-2 rounded-lg transition-all text-brand-textMuted">About Us</button>
              <button onClick={() => smoothScrollTo('connectors')} className="hover:text-brand-gold hover:bg-brand-surface px-3 py-2 rounded-lg transition-all text-brand-textMuted">Platform & Connectors</button>
              <button onClick={() => smoothScrollTo('workforce')} className="hover:text-brand-gold hover:bg-brand-surface px-3 py-2 rounded-lg transition-all text-brand-textMuted">AI Workforce</button>
              <button onClick={() => smoothScrollTo('pricing')} className="hover:text-brand-gold hover:bg-brand-surface px-3 py-2 rounded-lg transition-all text-brand-textMuted">Pricing & Tiers</button>
              <button onClick={() => smoothScrollTo('contact')} className="hover:text-brand-gold hover:bg-brand-surface px-3 py-2 rounded-lg transition-all text-brand-textMuted">Contact Us</button>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <ThemeToggle />
            <LanguageSelector />
            
            <div className="hidden sm:flex items-center bg-brand-card border border-brand-border rounded-lg p-0.5 text-xs">
              <button onClick={() => setCurrency('IDR')} className={`px-2 py-1 rounded font-bold text-[11px] transition-colors ${currency === 'IDR' ? 'bg-brand-gold text-white' : 'text-brand-textMuted hover:text-brand-textMain'}`}>IDR</button>
              <button onClick={() => setCurrency('USD')} className={`px-2 py-1 rounded font-bold text-[11px] transition-colors ${currency === 'USD' ? 'bg-brand-gold text-white' : 'text-brand-textMuted hover:text-brand-textMain'}`}>USD</button>
            </div>

            <Link to="/login" className="px-3 py-1.5 text-xs font-bold text-brand-textMuted hover:text-brand-textMain hover:bg-brand-surface border border-brand-border rounded-lg transition-all">{t('clientPortalLogin')}</Link>
          </div>
        </div>
      </header>

      {state.sectionOrder.map(section => {
        if (state.visibleSections[section] === false) return null;

        switch (section) {
          case 'hero':
            return (
              <section key="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-radial-grid">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="text-center max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-navy border border-brand-gold/30 text-xs font-bold text-brand-gold shadow-gold-sm tracking-wider uppercase">
                      <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                      {t('heroBadge')}
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-textMain tracking-tight leading-[1.15]">
                      <EditableText id="hero.title" default={t('heroTitle')} className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg p-2 resize-none" />
                    </h1>
                    <p className="text-base sm:text-lg text-brand-textMuted max-w-3xl mx-auto font-normal leading-relaxed">
                      <EditableText id="hero.subtitle" default={t('heroSubtitle')} className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg p-2 resize-none block" />
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button onClick={() => smoothScrollTo('connectors')} className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldDark text-white font-bold text-sm transition-all shadow-lg shadow-brand-gold/20 flex items-center gap-2">
                        Explore The OS <ArrowRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => setIsHealthCheckModalOpen(true)} className="px-6 py-3 rounded-xl bg-brand-surface hover:bg-brand-card text-brand-textMain border border-brand-border font-bold text-sm transition-all flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-gold" /> Run Paid Diagnostic
                      </button>
                    </div>
                  </div>

                  {/* VIDEO */}
                  <div className="mt-16 lg:mt-20 mx-auto max-w-4xl lg:max-w-3xl rounded-2xl overflow-hidden border border-brand-border/50 hover:border-brand-gold/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] lg:shadow-[0_0_80px_rgba(212,175,55,0.15)] relative aspect-video bg-brand-navy transition-all duration-700">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/foVUyGuqp_k?si=Y3EjxI6z7TqVBhqA" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>
              </section>
            );
          
          case 'calculator':
            return (
              <section key="calculator" id="calculator" className="py-24 bg-brand-surface relative overflow-hidden border-t border-brand-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-black text-brand-textMain mb-4">Calculate Your Value Leakage</h2>
                    <p className="text-brand-textMuted">Estimate how much cash is trapped in inefficient operations and disjointed systems.</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="bg-brand-card border border-brand-border rounded-2xl p-8 shadow-sm">
                      <h3 className="text-lg font-bold text-brand-textMain mb-6 flex items-center gap-2"><Sliders className="w-5 h-5 text-brand-gold" /> Inputs</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-brand-textMuted mb-2">Annual Revenue (Billion IDR): {revenue}B</label>
                          <input type="range" min="10" max="1000" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full h-2 bg-brand-surface rounded-lg appearance-none cursor-pointer accent-brand-gold" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-brand-textMuted mb-2">Total Headcount: {headcount}</label>
                          <input type="range" min="10" max="1000" value={headcount} onChange={(e) => setHeadcount(Number(e.target.value))} className="w-full h-2 bg-brand-surface rounded-lg appearance-none cursor-pointer accent-brand-gold" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-brand-navy border border-brand-border rounded-2xl p-8 shadow-sm relative overflow-hidden">
                      <h3 className="text-lg font-bold text-brand-textMain mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-brand-gold" /> Expected Recovery</h3>
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm font-semibold text-brand-textMuted mb-1">Estimated Annual Leakage (4.8%)</p>
                          <p className="text-3xl font-black text-brand-textMain">{formatMoney(estimatedLeakageIdr)}</p>
                        </div>
                        <div className="pt-4 border-t border-brand-border">
                          <p className="text-sm font-semibold text-brand-textMuted mb-1">Recoverable via BuildUp (68%)</p>
                          <p className="text-4xl font-black text-brand-gold text-gold-gradient">{formatMoney(recoverableSavingsIdr)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'connectors':
            return <ERPConnectorsSection key="connectors" />;

          case 'workforce':
            return (
              <section key="workforce" id="workforce" className="py-24 bg-brand-deep border-t border-brand-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-black text-brand-textMain mb-4">BuildUp AI Workforce</h2>
                    <p className="text-brand-textMuted">12 Specialized Roles executing routines 24/7 across your systems.</p>
                  </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { title: 'AI CEO', desc: 'Sintesis gambaran besar, prioritas strategis, dan persetujuan keputusan berdampak tinggi.' },
                        { title: 'AI CFO', desc: 'Pemodelan keuangan kompleks, proyeksi kas real-time, dan alokasi modal optimal.' },
                        { title: 'AI Controller', desc: 'Rekonsiliasi harian otomatis, deteksi kebocoran pengeluaran, dan audit trail.' },
                        { title: 'AI Procurement', desc: 'Negosiasi vendor, optimasi HPP, dan manajemen rantai pasok cerdas.' },
                        { title: 'AI CRO (Revenue)', desc: 'Skoring prospek, prediksi penagihan, dan strategi diskon dinamis.' },
                        { title: 'AI COO', desc: 'Orkestrasi proses lintas departemen, pemantauan SLA, dan penyeimbangan beban.' },
                        { title: 'AI Risk & Control', desc: 'Identifikasi kerentanan fraud, pencegahan denda, dan stres-tes skenario.' },
                        { title: 'AI HR', desc: 'Prediksi churn karyawan, analisis beban kerja, dan optimasi kompensasi.' },
                        { title: 'AI Tax', desc: 'Analisis kewajiban pajak, identifikasi penghematan legal (tax shield).' },
                        { title: 'AI Legal', desc: 'Review draf kontrak otomatis, ekstraksi klausal risiko, dan pemantauan regulasi.' },
                        { title: 'AI Audit', desc: 'Pengujian kepatuhan 100% sampel (bukan acak) secara terus-menerus.' },
                        { title: 'AI Strategy', desc: 'Analisis lanskap kompetitor, tren makroekonomi, dan simulasi ekspansi.' }
                      ].map(role => (
                        <div key={role.title} className="bg-brand-card hover:bg-brand-surface hover:-translate-y-1 transition-all border border-brand-border p-5 rounded-2xl flex items-start gap-4 shadow-lg group">
                          <div className="p-3 bg-brand-navy rounded-xl border border-brand-gold/20 group-hover:border-brand-gold transition-colors">
                            <BrainCircuit className="w-6 h-6 text-brand-gold" />
                          </div>
                          <div>
                            <h3 className="font-bold text-brand-textMain text-sm mb-1">{role.title}</h3>
                            <p className="text-xs text-brand-textMuted leading-relaxed">{role.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
            );

          case 'pricing':
            return <PricingSection key="pricing" />;
          case 'about':
            return <AboutSection key="about" />;
          case 'contact':
            return <ContactSection key="contact" />;
          default:
            return null;
        }
      })}

      {/* FOOTER */}
      <footer className="bg-brand-navy border-t border-brand-border py-12 text-center text-brand-textMuted text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <BuildUpLogo size="sm" variant="horizontal" showSubtitle={false} className="mb-4 opacity-50 grayscale" />
          <p className="mb-2">© 2026 BuildUp. All rights reserved.</p>
          <p className="font-medium">AI-Native Business Transformation Intelligence.</p>
        </div>
      </footer>
    </div>
  );
}


