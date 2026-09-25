import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Share2,
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
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { BuildUpLogo } from "../components/BuildUpLogo";
import { LanguageSelector } from "../components/LanguageSelector";
import { ERPConnectorsSection } from "../components/ERPConnectorsSection";
import { useBuildUp } from "../context/BuildUpContext";
import { AboutSection } from "../components/AboutSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { AffiliateSection } from "../components/AffiliateSection";
import { PricingSection } from "../components/PricingSection";
import { ContactSection } from "../components/ContactSection";
import { EditableText } from "../components/admin/EditableText";
import { useCms } from "../context/CmsContext";

export function LandingPage() {
  const {
    user,
    setIsHealthCheckModalOpen,
    currency,
    setCurrency,
    formatMoney,
    language,
    t,
  } = useBuildUp();
  const { state } = useCms();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [revenue, setRevenue] = useState(50);
  const [headcount, setHeadcount] = useState(75);
  const [industry, setIndustry] = useState("Distribution & Trading");

  const revenueBase = revenue * 1000000000;
  // Standard Value Leakage Calculation based on Industry Benchmarks
  let leakageRate = 0.048;
  let dsoImpact = revenueBase * 0.015;
  let inventoryImpact = revenueBase * 0.012;
  let procurementImpact = revenueBase * 0.021;
  let laborInefficiency = revenueBase * 0.018;
  let complianceRisks = revenueBase * 0.004;

  if (industry.includes("Retail") || industry.includes("Trading")) {
    inventoryImpact = revenueBase * 0.025;
    procurementImpact = revenueBase * 0.025;
    laborInefficiency = revenueBase * 0.012;
    leakageRate = 0.061;
  } else if (industry.includes("Service") || industry.includes("Technology")) {
    inventoryImpact = 0;
    dsoImpact = revenueBase * 0.028;
    laborInefficiency = revenueBase * 0.022;
    complianceRisks = revenueBase * 0.008;
    leakageRate = 0.049;
  }

  const estimatedLeakageIdr =
    dsoImpact +
    inventoryImpact +
    procurementImpact +
    laborInefficiency +
    complianceRisks;
  const recoverableSavingsIdr = estimatedLeakageIdr * 0.68;

  // Smooth scroll helper
  const smoothScrollTo = useCallback((sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-deep text-brand-textMain selection:bg-brand-gold/30">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-brand-navy/95 backdrop-blur-md border-b border-brand-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center shrink-0"
            >
              <BuildUpLogo size="md" variant="horizontal" showSubtitle={true} />
            </button>
            <nav className="hidden xl:flex items-center gap-1 pl-4 border-l border-brand-border text-xs font-semibold tracking-wide">
              {(state.navItems || []).map((item) => (
                <button
                  key={item.id}
                  onClick={() => smoothScrollTo(item.target)}
                  className="hover:text-brand-gold hover:bg-brand-surface px-3 py-2 rounded-lg transition-all text-brand-textMuted"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <ThemeToggle />
            <LanguageSelector />

            <Link
              to="/affiliate"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold border border-brand-gold/30 font-bold text-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Affiliate Program
            </Link>

            <div className="hidden sm:flex items-center bg-brand-card border border-brand-border rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setCurrency("IDR")}
                className={`px-2 py-1 rounded font-bold text-[11px] transition-colors ${currency === "IDR" ? "bg-brand-gold text-white" : "text-brand-textMuted hover:text-brand-textMain"}`}
              >
                IDR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-2 py-1 rounded font-bold text-[11px] transition-colors ${currency === "USD" ? "bg-brand-gold text-white" : "text-brand-textMuted hover:text-brand-textMain"}`}
              >
                USD
              </button>
            </div>

            {user ? (
              <Link
                to="/app"
                className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-brand-gold hover:bg-brand-goldLight rounded-lg transition-all"
              >
                Go to OS
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-bold text-brand-textMuted hover:text-brand-textMain hover:bg-brand-surface border border-brand-border rounded-lg transition-all"
              >
                {t("clientPortalLogin")}
              </Link>
            )}
          </div>
        </div>
      </header>

      {state.sectionOrder.map((section) => {
        if (state.visibleSections[section] === false) return null;

        switch (section) {
          case "hero":
            return (
              <section
                key="hero"
                id="home"
                className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-radial-grid"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="text-center max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-navy border border-brand-gold/30 text-xs font-bold text-brand-gold shadow-gold-sm tracking-wider uppercase">
                      <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                      {t("heroBadge")}
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-textMain tracking-tight leading-[1.15]">
                      <EditableText
                        id="hero.title"
                        default={t("heroTitle")}
                        className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg p-2 resize-none"
                      />
                    </h1>
                    <p className="text-base sm:text-lg text-brand-textMuted max-w-3xl mx-auto font-normal leading-relaxed">
                      <EditableText
                        id="hero.subtitle"
                        default={t("heroSubtitle")}
                        className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg p-2 resize-none block"
                      />
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link
                        to={user ? "/app" : "/login"}
                        className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldDark text-slate-950 font-bold text-sm transition-all shadow-lg shadow-brand-gold/20 flex items-center gap-2"
                      >
                        {t("exploreOs")} <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setIsHealthCheckModalOpen(true)}
                        className="px-6 py-3 rounded-xl bg-brand-surface hover:bg-brand-card text-brand-textMain border border-brand-border font-bold text-sm transition-all flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-brand-gold" /> Run
                        Paid Diagnostic
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
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </section>
            );

          case "calculator":
            return (
              <section
                key="calculator"
                id="calculator"
                className="py-24 bg-brand-surface relative overflow-hidden border-t border-brand-border"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-black text-brand-textMain mb-4">
                      <EditableText
                        id="calc.title"
                        default="Calculate Your Value Leakage"
                      />
                    </h2>
                    <p className="text-brand-textMuted">
                      <EditableText
                        id="calc.subtitle"
                        default="Simulasi ini menghitung potensi kerugian finansial (Value Leakage) yang tidak disadari akibat inefisiensi operasional, proses manual, dan sistem yang tidak terintegrasi. Masukkan estimasi omzet Anda untuk melihat seberapa besar uang yang bisa diselamatkan oleh AI Workforce kami."
                      />
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="bg-brand-card border border-brand-border rounded-2xl p-8 shadow-sm">
                      <h3 className="text-lg font-bold text-brand-textMain mb-6 flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-brand-gold" /> Inputs
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-brand-textMuted mb-2">
                            {t("industryLabel")}
                          </label>
                          <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full bg-brand-surface/50 border border-brand-border rounded-xl px-4 py-2 text-sm text-brand-textMain outline-none focus:border-brand-gold/50"
                          >
                            <option value="Distribution & Trading">
                              Distribution & Trading
                            </option>
                            <option value="Retail & FMCG">Retail & FMCG</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Service & Technology">
                              Service & Technology
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-brand-textMuted mb-2">
                            {t("revenueLabel")} {revenue}B
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="1000"
                            value={revenue}
                            onChange={(e) => setRevenue(Number(e.target.value))}
                            className="w-full h-2 bg-brand-surface rounded-lg appearance-none cursor-pointer accent-brand-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-brand-textMuted mb-2">
                            {t("headcountLabel")} {headcount}
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="1000"
                            value={headcount}
                            onChange={(e) =>
                              setHeadcount(Number(e.target.value))
                            }
                            className="w-full h-2 bg-brand-surface rounded-lg appearance-none cursor-pointer accent-brand-gold"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-brand-navy border border-brand-border rounded-2xl p-8 shadow-sm relative overflow-hidden flex flex-col justify-between">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none"></div>
                      <h3 className="text-lg font-bold text-brand-textMain mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-brand-gold" /> Value
                        Leakage Calculator
                      </h3>

                      <div className="space-y-5 flex-1">
                        <div className="bg-brand-deep/50 rounded-xl p-4 border border-brand-border/50">
                          <p className="text-xs font-semibold text-brand-textMuted mb-1 uppercase tracking-wider">
                            {t("totalLeakage")}
                          </p>
                          <p className="text-2xl font-black text-brand-textMain">
                            {formatMoney(estimatedLeakageIdr)}
                          </p>

                          <div className="mt-3 pt-3 border-t border-brand-border/30 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-brand-textMuted">
                                {t("dsoLeakage")}
                              </span>
                              <span className="text-[10px] font-mono text-brand-textMain">
                                {formatMoney(dsoImpact)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-brand-textMuted">
                                {t("procurementLeakage")}
                              </span>
                              <span className="text-[10px] font-mono text-brand-textMain">
                                {formatMoney(procurementImpact)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-brand-textMuted">
                                {t("inventoryLeakage")}
                              </span>
                              <span className="text-[10px] font-mono text-brand-textMain">
                                {formatMoney(inventoryImpact)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-brand-surface rounded-xl p-5 border border-brand-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                          <p className="text-xs font-semibold text-brand-textMuted mb-1 uppercase tracking-wider">
                            {t("recoverable")}
                          </p>
                          <p className="text-3xl font-black text-brand-gold text-gold-gradient">
                            {formatMoney(recoverableSavingsIdr)}
                          </p>
                          <p className="text-[10px] text-brand-gold/70 mt-1 font-medium">
                            {t("recoverableDesc")}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsHealthCheckModalOpen(true)}
                        className="mt-6 w-full py-3 bg-brand-deep hover:bg-brand-surface border border-brand-border hover:border-brand-gold transition-all text-xs font-bold rounded-xl flex items-center justify-center gap-2 text-brand-textMain"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-brand-gold" />{" "}
                        {t("recalculate")}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );

          case "connectors":
            return <ERPConnectorsSection key="connectors" />;

          case "workforce":
            return (
              <section
                key="workforce"
                id="workforce"
                className="py-24 bg-brand-deep border-t border-brand-border"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-black text-brand-textMain mb-4">
                      <EditableText
                        id="workforce.title"
                        default="BuildUp AI Workforce"
                      />
                    </h2>
                    <p className="text-brand-textMuted">
                      <EditableText
                        id="workforce.subtitle"
                        default="12 Specialized Roles executing routines 24/7 across your systems."
                      />
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(state.workforceRoles || []).map((role, idx) => (
                      <div
                        key={idx}
                        className="bg-brand-card hover:bg-brand-surface hover:-translate-y-1 transition-all border border-brand-border p-5 rounded-2xl flex items-start gap-4 shadow-lg group"
                      >
                        <div className="p-3 bg-brand-navy rounded-xl border border-brand-gold/20 group-hover:border-brand-gold transition-colors">
                          <BrainCircuit className="w-6 h-6 text-brand-gold" />
                        </div>
                        <div>
                          <h3 className="font-bold text-brand-textMain text-sm mb-1">
                            {role.title}
                          </h3>
                          <p className="text-xs text-brand-textMuted leading-relaxed">
                            {role.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "pricing":
            return <PricingSection key="pricing" />;
            case "affiliate":
              return <AffiliateSection key="affiliate" />;
          case "testimonials":
            return <TestimonialsSection key="testimonials" />;
          case "about":
            return <AboutSection key="about" />;
          case "contact":
            return <ContactSection key="contact" />;
          default:
            return null;
        }
      })}

      {/* FOOTER */}
      <footer className="bg-brand-navy border-t border-brand-border py-12 text-center text-brand-textMuted text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <BuildUpLogo
            size="sm"
            variant="horizontal"
            showSubtitle={false}
            className="mb-4 opacity-50 grayscale"
          />
          <p className="mb-2">© 2026 BuildUp. All rights reserved.</p>
          <p className="font-medium">{t("footerText")}</p>
        </div>
      </footer>
    </div>
  );
}
