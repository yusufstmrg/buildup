import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X, Zap, ChevronDown } from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';
import { BuildUpLogo } from '../components/BuildUpLogo';
import { LanguageSelector } from '../components/LanguageSelector';
import * as Accordion from '@radix-ui/react-accordion';
import * as Switch from '@radix-ui/react-switch';
import { ThemeToggle } from '../components/ThemeToggle';
import { useCms } from '../context/CmsContext';
import { EditableText } from './admin/EditableText';

export function PricingSection() {
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

  const { state } = useCms();
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
    <section id="pricing" className="py-24">
      

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
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
          {[
            {
              id: 'xray',
              name: 'BuildUp Business X-Ray™',
              priceIdr: 45000000,
              priceUsd: 2900,
              description: 'Deep diagnostic, root-cause analysis, and 90-day transformation blueprint.',
              features: ['Evidence-backed bottlenecks', 'Value leakage mapping', '90-day transformation agenda', 'Recommended automation opportunities']
            },
            {
              id: 'transformation',
              name: 'BuildUp Transformation™',
              priceIdr: 150000000,
              priceUsd: 9800,
              description: 'Implementation and measurable improvement through AI & expert escalation.',
              features: ['Execution of prioritized change', 'Human Expert Network escalation', 'Change management & orchestration', 'Measurable ROI & EBITDA improvement']
            },
            {
              id: 'business_os',
              name: 'BuildUp Business OS™',
              priceIdr: 90000000,
              priceUsd: 5900,
              description: 'Continuous intelligence, AI Workforce, and governed workflow orchestration.',
              features: ['BuildUp Intelligence™ layer', 'AI Workforce (12 specialized agents)', 'Continuous Internal Control Engine', 'Strategic Business Planner']
            }
          ].map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-brand-surface border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 border-brand-border hover:border-brand-gold/40`}
            >

              <div className={''}>
                <h3 className="text-2xl font-black text-brand-textMain mb-4">{pkg.name}</h3>
                
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-brand-textMain">
                      {currency === 'IDR' ? formatMoney(pkg.priceIdr) : `$${pkg.priceUsd.toLocaleString()}`}
                    </span>
                    <span className="text-sm text-brand-textMuted mb-1 font-medium">/project</span>
                  </div>
                </div>
                <p className="text-sm text-brand-textMuted leading-relaxed border-b border-brand-border pb-6 mb-6">
                  {pkg.description}
                </p>
              </div>

              <div className={''}>
                <ul className="space-y-4 text-sm text-brand-textMain mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={'mt-auto'}>
                <button
                  onClick={() => setIsHealthCheckModalOpen(true)}
                  className={`w-full py-4 px-8 rounded-xl font-bold text-sm tracking-wide transition-all bg-brand-navy hover:bg-brand-card text-brand-textMain border border-brand-border hover:border-brand-textMuted`}
                >
                  Start Diagnostic
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
      </div>
    </section>
  );
}
