import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X, Zap, ChevronDown } from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';
import { BuildUpLogo } from '../components/BuildUpLogo';
import { LanguageSelector } from '../components/LanguageSelector';
import * as Accordion from '@radix-ui/react-accordion';
import * as Switch from '@radix-ui/react-switch';
import { ThemeToggle } from '../components/ThemeToggle';

export function PricingPage() {
  const { 
    setIsHealthCheckModalOpen, 
    currency, 
    setCurrency, 
    formatMoney,
    setIsAuthModalOpen,
    setAuthModalMode,
    t,
    language
  } = useBuildUp();

  const [isAnnual, setIsAnnual] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPrice = (monthlyIdr: number) => {
    if (isAnnual) {
      return (monthlyIdr * 0.8) * 12; // 20% discount for annual
    }
    return monthlyIdr;
  };

  const packages = [
    {
      id: 'starter',
      name: 'Starter / Basic',
      badge: 'Entry Diagnostic',
      monthlyIdr: 0,
      annualIdr: 0,
      desc: 'Fast, low-friction front door screening to measure company health and benchmark position.',
      features: [
        'Overall Health Score (0-100)',
        '8-Dimension performance scores',
        'Top 3 critical constraint signals',
        'Instant diagnostic summary PDF',
      ],
      cta: 'Request Diagnostic Audit',
      action: () => setIsHealthCheckModalOpen(true),
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard Business',
      badge: 'Monitoring',
      monthlyIdr: 7500000,
      desc: 'Live continuous benchmark progression, ongoing diagnostic tracking, and automated governance audit.',
      features: [
        'Pemantauan 8 Dimensi Bisnis 24/7',
        'Peringatan Dini Anomali Arus Kas & Marjin',
        'Benchmarking Industri Nasional & Regional',
        'Dashboard Eksekutif C-Level',
        'Integrasi 2 Sistem ERP / Pembukuan',
        'Dukungan Teknis Prioritas'
      ],
      cta: 'Mulai Berlangganan',
      action: () => { setAuthModalMode('register'); setIsAuthModalOpen(true); },
      popular: false
    },
    {
      id: 'growth',
      name: 'Growth / Expansion',
      badge: 'Paling Banyak Dipilih',
      monthlyIdr: 35000000,
      desc: 'Full AI Workforce deployment, continuous Business OS orchestration, and Certified Business Advisor guidance.',
      features: [
        'Semua Fitur Standard Business',
        '12 Agen Eksekutif AI Workforce',
        'Auditable Decision Engine™',
        'Orkestrasi Alur Kerja Multi-Sistem',
        'Pendampingan Certified Business Advisor',
        'Jaminan ROI Terbukti',
      ],
      cta: 'Pilih Growth Package',
      action: () => { setAuthModalMode('register'); setIsAuthModalOpen(true); },
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Conglomerate',
      badge: 'Solusi Khusus Holding',
      monthlyIdr: 150000000,
      desc: 'Multi-entity corporate groups, complex legacy systems, bank API connections, and private cloud deployments.',
      features: [
        'Koneksi Multi-Entity Business Context Graph™',
        'Instalasi On-Premise / Private VPC',
        'Integrasi ERP Kustom (SAP, Oracle)',
        'Tim Partner Konsultan Berdedikasi',
        'Pelatihan Khusus Divisi Anak Perusahaan',
        'SLA Respon 1 Jam'
      ],
      cta: 'Hubungi Tim Korporat',
      action: () => { window.location.href = '/contact'; },
      popular: false
    },
    {
      id: 'gain-share',
      name: 'Gain-Share Partnership',
      badge: 'Outcome-Based Pricing',
      isCustom: true,
      desc: 'We align with your success. A fixed implementation fee plus a percentage of verified cost savings and cash flow unlocked.',
      features: [
        'Fixed Base Price + 10% Fee on Recovered Value',
        'Full Platform & Native Core Access',
        'Focus on Procurement & DSO Recovery',
        'Certified by 3rd-party auditors',
        'True alignment with business owners'
      ],
      cta: 'Apply for Partnership',
      action: () => { window.location.href = '/contact'; },
      popular: false
    }
  ];

  const faqs = [
    {
      q: 'Bagaimana BuildUp menjamin ROI (Return on Investment)?',
      a: 'Berdasarkan rekam jejak pada 120+ korporasi di Indonesia, BuildUp rata-rata menemukan dan memulihkan kebocoran modal kerja serta inefisiensi biaya operasional sebesar Rp 1,4 Miliar per tahun. Hasil ini memberikan rata-rata ROI sebesar 10.6x dari nilai investasi langganan retainer kami.'
    },
    {
      q: 'Berapa lama proses implementasi dan integrasi data?',
      a: 'Tahap Diagnostic dapat selesai dalam hitungan menit. Untuk integrasi penuh Business X-Ray dan paket Growth, koneksi ke sistem ERP (seperti SAP, Accurate, Jurnal, Odoo) berlangsung antara 7 hingga 14 hari kerja tanpa mengganggu operasional harian tim Anda.'
    },
    {
      q: 'Apakah data rahasia perusahaan kami aman?',
      a: 'Sangat aman. Kami menerapkan enkripsi bank-grade AES-256 dan protokol zero data retention, yang memastikan data finansial Anda tidak pernah digunakan untuk melatih model AI publik atau dibagikan ke pihak ketiga mana pun. Klien konglomerasi juga dapat memilih instalasi privat on-premise.'
    },
    {
      q: 'Apakah sistem AI ini bisa mengambil keputusan sendiri tanpa izin direksi?',
      a: 'Tidak. BuildUp menganut prinsip Human-in-the-loop yang ketat melalui Auditable Decision Engine™. Seluruh keputusan bernilai material dirumuskan sebagai Decision Object yang membutuhkan persetujuan resmi (approval gate) dari direksi atau pimpinan yang berwenang sebelum dieksekusi.'
    },
    {
      q: 'Apa perbedaan Certified Business Advisor dengan Konsultan Pajak biasa?',
      a: 'Konsultan pajak umumnya berfokus pada kepatuhan fiskal historis. Certified Business Advisor kami bertindak sebagai mitra operasional strategis yang melihat seluruh dimensi bisnis (arus kas, rantai pasok, SDM, dll) untuk meningkatkan EBITDA secara holistik dan terukur.'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-deep text-brand-textMain flex flex-col font-sans selection:bg-brand-gold/30">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-deep/90 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <BuildUpLogo size="md" variant="horizontal" showSubtitle={true} />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-textMuted">
            <Link to="/" className="hover:text-brand-gold transition-colors">{t('navHome')}</Link>
            <Link to="/about" className="hover:text-brand-gold transition-colors">{t('navAbout')}</Link>
            <Link to="/pricing" className="text-brand-gold font-bold">{t('navPricing')}</Link>
            <Link to="/contact" className="hover:text-brand-gold transition-colors">{t('navContact')}</Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); }}
              className="px-3.5 py-2 text-xs font-bold text-brand-textMain bg-brand-surface border border-brand-border rounded-xl transition-all"
            >
              {t('clientPortalLogin')}
            </button>
            <button
              onClick={() => setIsHealthCheckModalOpen(true)}
              className="px-4 py-2 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold rounded-xl shadow-md transition-all"
            >
              {t('freeHealthCheckCTA')}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-brand-textMain tracking-tight">
            Transparent, Outcome-Led Pricing
          </h1>
          <p className="mt-4 text-base text-brand-textMuted">
            Select the engagement model that fits your scale.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-3 text-sm font-bold bg-brand-surface p-2 rounded-2xl border border-brand-border">
              <span className={`px-4 py-2 rounded-xl transition-colors ${!isAnnual ? 'bg-brand-navy text-brand-textMain shadow-sm' : 'text-brand-textMuted cursor-pointer'}`} onClick={() => setIsAnnual(false)}>Monthly</span>
              <Switch.Root
                className="w-[42px] h-[25px] bg-brand-navy rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-brand-gold outline-none cursor-default"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
              <span className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${isAnnual ? 'bg-brand-navy text-brand-textMain shadow-sm' : 'text-brand-textMuted cursor-pointer'}`} onClick={() => setIsAnnual(true)}>
                Yearly
                <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
              </span>
            </div>
            
            {/* Currency Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-brand-navy border border-brand-border mt-2">
              <button
                onClick={() => setCurrency('IDR')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === 'IDR'
                    ? 'bg-brand-gold text-brand-deep'
                    : 'text-brand-textMuted hover:text-brand-textMain'
                }`}
              >
                IDR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === 'USD'
                    ? 'bg-brand-gold text-brand-deep'
                    : 'text-brand-textMuted hover:text-brand-textMain'
                }`}
              >
                USD
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-brand-surface border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular 
                  ? 'border-brand-gold shadow-gold-glow lg:-translate-y-4 lg:scale-105 z-10' 
                  : 'border-brand-border hover:border-brand-gold/40'
              } ${pkg.isCustom ? 'lg:col-span-3 border-brand-gold/50 flex-row items-center flex-wrap gap-8' : ''}`}
            >
              {pkg.popular && !pkg.isCustom && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-gold text-brand-deep text-[11px] font-black rounded-full uppercase tracking-wider shadow-md">
                  {pkg.badge}
                </div>
              )}
              {pkg.isCustom && (
                <div className="absolute -top-3 left-8 px-3 py-1 bg-brand-gold text-brand-deep text-[10px] font-black rounded-full uppercase tracking-wider shadow-md">
                  {pkg.badge}
                </div>
              )}

              <div className={pkg.isCustom ? 'flex-1 min-w-[300px]' : ''}>
                {!pkg.popular && !pkg.isCustom && (
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-textMuted mb-2">
                    {pkg.badge}
                  </div>
                )}
                
                <h3 className="text-2xl font-black text-brand-textMain mb-4">{pkg.name}</h3>
                
                <div className="mb-6">
                  {pkg.isCustom ? (
                    <span className="text-3xl font-black text-brand-gold">Custom + 10% Fee</span>
                  ) : pkg.monthlyIdr === 0 ? (
                    <span className="text-4xl font-black text-brand-textMain">Waived</span>
                  ) : (
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-brand-textMain">
                        {isAnnual ? formatMoney(getPrice(pkg.monthlyIdr) / 12) : formatMoney(pkg.monthlyIdr)}
                      </span>
                      <span className="text-sm text-brand-textMuted mb-1 font-medium">/ month</span>
                    </div>
                  )}
                  {isAnnual && pkg.monthlyIdr > 0 && !pkg.isCustom && (
                    <div className="text-xs text-emerald-500 font-bold mt-1">
                      Billed {formatMoney(getPrice(pkg.monthlyIdr))} yearly
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-brand-textMuted leading-relaxed border-b border-brand-border pb-6 mb-6">
                  {pkg.desc}
                </p>
              </div>

              <div className={pkg.isCustom ? 'flex-1 min-w-[300px]' : ''}>
                <ul className="space-y-4 text-sm text-brand-textMain mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={pkg.isCustom ? 'w-full shrink-0 lg:w-auto' : 'mt-auto'}>
                <button
                  onClick={pkg.action}
                  className={`w-full py-4 px-8 rounded-xl font-bold text-sm tracking-wide transition-all ${
                    pkg.popular || pkg.isCustom
                      ? 'bg-gradient-to-r from-brand-gold to-brand-goldLight hover:from-brand-goldDark hover:to-brand-gold text-brand-deep shadow-gold-sm'
                      : 'bg-brand-navy hover:bg-brand-card text-brand-textMain border border-brand-border hover:border-brand-textMuted'
                  }`}
                >
                  {pkg.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-brand-textMain tracking-tight">Frequently Asked Questions</h2>
          </div>
          
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <Accordion.Item key={i} value={`faq-${i}`} className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-gold/50">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-navy/50 transition-colors group">
                    <span className="font-bold text-brand-textMain text-base pr-8">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-brand-textMuted group-data-[state=open]:rotate-180 transition-transform duration-300 ease-in-out shrink-0" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <div className="p-6 pt-0 text-sm text-brand-textMuted leading-relaxed">
                    {faq.a}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </main>

      <footer className="border-t border-brand-border bg-brand-deep py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs text-brand-textMuted">© 2026 BuildUp. AI-Native Business Orchestration.</span>
        </div>
      </footer>
    </div>
  );
}
