import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';
import * as Accordion from '@radix-ui/react-accordion';
import * as Switch from '@radix-ui/react-switch';
import { EditableText } from '../components/admin/EditableText';

export function PricingSection() {
  const { 
    setIsHealthCheckModalOpen, 
    currency, 
    setCurrency, 
    formatMoney
  } = useBuildUp();

  const [isAnnual, setIsAnnual] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPriceIdr = (monthlyIdr: number) => {
    return monthlyIdr;
  };
  
  const getBilledYearlyIdr = (monthlyIdr: number) => {
    return monthlyIdr * 12;
  };

  const getPriceUsd = (monthlyUsd: number) => {
    return monthlyUsd;
  };
  
  const getBilledYearlyUsd = (monthlyUsd: number) => {
    return monthlyUsd * 12;
  };

  const formatPrice = (value: number) => {
    if (value === 0) return "Waived";
    if (value >= 1000000000) {
      return "Rp " + (value / 1000000000).toFixed(2).replace(".", ",") + " Miliar";
    }
    if (value >= 1000000) {
      return "Rp " + (value / 1000000) + " Juta";
    }
    return formatMoney(value);
  };

  const faqs = [
    {
      q: "Bagaimana BuildUp menjamin ROI (Return on Investment)?",
      a: "Berdasarkan rekam jejak pada 120+ korporasi di Indonesia, BuildUp rata-rata menemukan dan memulihkan kebocoran modal kerja serta inefisiensi biaya operasional sebesar Rp 1,4 Miliar per tahun. Hasil ini memberikan rata-rata ROI sebesar 10.6x dari nilai investasi langganan retainer kami."
    },
    {
      q: "Berapa lama proses implementasi dan integrasi data?",
      a: "Tahap Diagnostic dapat selesai dalam hitungan menit. Untuk integrasi penuh Business X-Ray dan paket Growth, koneksi ke sistem ERP (seperti SAP, Accurate, Jurnal, Odoo) berlangsung antara 7 hingga 14 hari kerja tanpa mengganggu operasional harian tim Anda."
    },
    {
      q: "Apakah data rahasia perusahaan kami aman?",
      a: "Sangat aman. Kami menerapkan enkripsi bank-grade AES-256 dan protokol zero data retention, yang memastikan data finansial Anda tidak pernah digunakan untuk melatih model AI publik atau dibagikan ke pihak ketiga mana pun. Klien konglomerasi juga dapat memilih instalasi privat on-premise."
    },
    {
      q: "Apakah sistem AI ini bisa mengambil keputusan sendiri tanpa izin direksi?",
      a: "Tidak. BuildUp menganut prinsip Human-in-the-loop yang ketat melalui Auditable Decision Engine™. Seluruh keputusan bernilai material dirumuskan sebagai Decision Object yang membutuhkan persetujuan resmi (approval gate) dari direksi atau pimpinan yang berwenang sebelum dieksekusi."
    },
    {
      q: "Apa perbedaan Certified Business Advisor dengan Konsultan Pajak biasa?",
      a: "Konsultan pajak umumnya berfokus pada kepatuhan fiskal historis. Certified Business Advisor kami bertindak sebagai mitra operasional strategis yang melihat seluruh dimensi bisnis (arus kas, rantai pasok, SDM, dll) untuk meningkatkan EBITDA secara holistik dan terukur."
    }
  ];

  const packages = [
    {
      id: "starter",
      label: "ENTRY DIAGNOSTIC",
      name: "Starter / Basic",
      priceIdr: 0,
      priceUsd: 0,
      description: "Fast, low-friction front door screening to measure company health and benchmark position.",
      features: [
        "Overall Health Score (0–100)",
        "8-Dimension performance scores",
        "Top 3 critical constraint signals",
        "Instant diagnostic summary PDF"
      ],
      buttonText: "Request Diagnostic Audit",
      isPopular: false
    },
    {
      id: "standard",
      label: "MONITORING",
      name: "Standard Business",
      priceIdr: 6000000,
      priceUsd: 390,
      description: "Live continuous benchmark progression, ongoing diagnostic tracking, and automated governance audit.",
      features: [
        "Pemantauan 8 Dimensi Bisnis 24/7",
        "Peringatan Dini Anomali Arus Kas & Marjin",
        "Benchmarking Industri Nasional & Regional",
        "Dashboard Eksekutif C-Level",
        "Integrasi 2 Sistem ERP / Pembukuan",
        "Dukungan Teknis Prioritas"
      ],
      buttonText: "Mulai Berlangganan",
      isPopular: false
    },
    {
      id: "growth",
      label: "RECOMMENDED",
      name: "Growth / Expansion",
      priceIdr: 28000000,
      priceUsd: 1800,
      description: "Full AI Workforce deployment, continuous Business OS orchestration, and Certified Business Advisor guidance.",
      features: [
        "Semua Fitur Standard Business",
        "12 Agen Eksekutif AI Workforce",
        "Auditable Decision Engine™",
        "Orkestrasi Alur Kerja Multi-Sistem",
        "Pendampingan Certified Business Advisor",
        "Jaminan ROI Terbukti"
      ],
      buttonText: "Pilih Growth Package",
      isPopular: true
    },
    {
      id: "enterprise",
      label: "SOLUSI KHUSUS HOLDING",
      name: "Enterprise Conglomerate",
      priceIdr: 120000000,
      priceUsd: 7800,
      description: "Multi-entity corporate groups, complex legacy systems, bank API connections, and private cloud deployments.",
      features: [
        "Koneksi Multi-Entity Business Context Graph™",
        "Instalasi On-Premise / Private VPC",
        "Integrasi ERP Kustom (SAP, Oracle)",
        "Tim Partner Konsultan Berdedikasi",
        "Pelatihan Khusus Divisi Anak Perusahaan",
        "SLA Respon 1 Jam"
      ],
      buttonText: "Hubungi Tim Korporat",
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-brand-deep">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-brand-textMain tracking-tight">
            <EditableText id="pricing.title" default="Transparent, Outcome-Led Pricing" />
          </h1>
          <p className="mt-4 text-base text-brand-textMuted">
            <EditableText id="pricing.subtitle" default="Select the engagement model that fits your scale." className="block" />
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-3 text-sm font-bold bg-brand-surface p-2 rounded-2xl border border-brand-border">
              <span className={"px-4 py-2 rounded-xl transition-colors " + (!isAnnual ? "bg-brand-navy text-brand-textMain shadow-sm" : "text-brand-textMuted cursor-pointer")} onClick={() => setIsAnnual(false)}>Monthly</span>
              <Switch.Root
                className="w-[42px] h-[25px] bg-brand-navy rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-brand-gold outline-none cursor-default"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
              <span className={"px-4 py-2 rounded-xl transition-colors flex items-center gap-2 " + (isAnnual ? "bg-brand-navy text-brand-textMain shadow-sm" : "text-brand-textMuted cursor-pointer")} onClick={() => setIsAnnual(true)}>
                Yearly
                <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">SAVE 20%</span>
              </span>
            </div>
            
            <div className="inline-flex items-center p-1 rounded-xl bg-brand-navy border border-brand-border mt-2">
              <button
                onClick={() => setCurrency("IDR")}
                className={"px-3 py-1 rounded-lg text-xs font-bold transition-all " + (
                  currency === "IDR"
                    ? "bg-brand-gold text-brand-deep"
                    : "text-brand-textMuted hover:text-brand-textMain"
                )}
              >
                IDR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={"px-3 py-1 rounded-lg text-xs font-bold transition-all " + (
                  currency === "USD"
                    ? "bg-brand-gold text-brand-deep"
                    : "text-brand-textMuted hover:text-brand-textMain"
                )}
              >
                USD
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={"relative bg-brand-surface border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 " + (pkg.isPopular ? "border-brand-gold border-2 shadow-[0_0_30px_rgba(234,179,8,0.1)] scale-[1.02] z-10" : "border-brand-border hover:border-brand-gold/40")}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-deep font-black text-[10px] uppercase tracking-wider py-1 px-4 rounded-full">
                  PALING BANYAK DIPILIH
                </div>
              )}

              <div>
                <p className="text-[10px] font-bold text-brand-textMuted uppercase tracking-wider mb-2">{pkg.label}</p>
                <h3 className="text-xl font-black text-brand-textMain mb-4">{pkg.name}</h3>
                
                <div className="mb-6">
                  {pkg.priceIdr === 0 ? (
                    <div className="text-4xl font-black text-brand-textMain">Waived</div>
                  ) : (
                    <>
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-black text-brand-textMain">
                          {currency === "IDR" ? formatPrice(getPriceIdr(pkg.priceIdr)) : "$" + getPriceUsd(pkg.priceUsd)}
                        </span>
                        <span className="text-sm text-brand-textMuted mb-1 font-medium">/ month</span>
                      </div>
                      {isAnnual && (
                        <div className="text-xs font-bold text-emerald-500 mt-1">
                          Billed {currency === "IDR" ? formatPrice(getBilledYearlyIdr(pkg.priceIdr)) : "$" + getBilledYearlyUsd(pkg.priceUsd)} yearly
                        </div>
                      )}
                    </>
                  )}
                </div>
                <p className="text-sm text-brand-textMuted leading-relaxed border-b border-brand-border pb-6 mb-6">
                  {pkg.description}
                </p>
              </div>

              <div>
                <ul className="space-y-4 text-sm text-brand-textMain mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => setIsHealthCheckModalOpen(true)}
                  className={"w-full py-3 px-6 rounded-xl font-bold text-sm tracking-wide transition-all " + (pkg.isPopular ? "bg-brand-gold text-brand-deep hover:bg-[#FACC15]" : "bg-brand-navy hover:bg-brand-card text-brand-textMain border border-brand-border hover:border-brand-textMuted")}
                >
                  {pkg.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Gain-Share Partnership Tier */}
        <div className="mt-8 relative bg-brand-surface border border-brand-border hover:border-brand-gold/40 rounded-2xl p-8 flex flex-col md:flex-row gap-8 transition-all duration-300">
           <div className="absolute -top-3 left-8 bg-brand-gold text-brand-deep font-black text-[10px] uppercase tracking-wider py-1 px-4 rounded-full">
              OUTCOME-BASED PRICING
           </div>
           
           <div className="md:w-1/3 flex flex-col justify-center">
             <h3 className="text-2xl font-black text-brand-textMain mb-4">Gain-Share Partnership</h3>
             <div className="text-3xl font-black text-brand-gold mb-4">Custom + 10% Fee</div>
             <p className="text-sm text-brand-textMuted leading-relaxed">
               We align with your success. A fixed implementation fee plus a percentage of verified cost savings and cash flow unlocked.
             </p>
           </div>
           
           <div className="hidden md:block w-px bg-brand-border"></div>
           
           <div className="md:w-2/3 flex flex-col justify-between">
             <ul className="space-y-4 text-sm text-brand-textMain mb-8 grid sm:grid-cols-2 gap-x-4 gap-y-2">
               {[
                 "Fixed Base Price + 10% Fee on Recovered Value",
                 "Full Platform & Native Core Access",
                 "Focus on Procurement & DSO Recovery",
                 "Certified by 3rd-party auditors",
                 "True alignment with business owners"
               ].map((feature, idx) => (
                 <li key={idx} className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                   <span className="font-medium">{feature}</span>
                 </li>
               ))}
             </ul>
             
             <div className="flex justify-start">
               <button
                  onClick={() => setIsHealthCheckModalOpen(true)}
                  className="py-3 px-8 rounded-xl font-bold text-sm tracking-wide transition-all bg-brand-gold text-brand-deep hover:bg-[#FACC15]"
                >
                  Apply for Partnership
               </button>
             </div>
           </div>
        </div>

        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-brand-textMain tracking-tight"><EditableText id="pricing.faq.title" default="Frequently Asked Questions" /></h2>
          </div>
          
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <Accordion.Item key={i} value={"faq-" + i} className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-gold/50">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-navy/50 transition-colors group">
                    <span className="font-bold text-brand-textMain text-base pr-8">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-brand-textMuted group-data-[state=open]:rotate-180 transition-transform duration-300 ease-in-out shrink-0" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 pb-6 text-brand-textMuted text-sm leading-relaxed data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  {faq.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}

