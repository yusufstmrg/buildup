import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Zap, 
  Award, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { BuildUpLogo } from '../components/BuildUpLogo';
import { LanguageSelector } from '../components/LanguageSelector';
import { useBuildUp } from '../context/BuildUpContext';

export function PricingPage() {
  const { 
    currency, 
    setCurrency, 
    formatMoney, 
    setIsHealthCheckModalOpen, 
    setIsAuthModalOpen, 
    setAuthModalMode,
    t 
  } = useBuildUp();

  const plans = [
    {
      id: 'free',
      name: 'BuildUp Health Check™',
      badge: 'Akses Awal Gratis',
      priceIdr: 0,
      period: 'Gratis Selamanya',
      desc: 'Skrining awal komprehensif untuk mendeteksi potensi kebocoran nilai dan skor kesehatan 8 dimensi bisnis Anda.',
      features: [
        'Skrining 8 Dimensi Organisasi',
        'Estimasi Kebocoran Nilai (Value Leakage)',
        'Rekomendasi 3 Inisiatif Prioritas Utama',
        'Laporan Diagnostik Format Eksekutif',
        'Akses Tanpa Komitmen Pembayaran'
      ],
      cta: 'Mulai Health Check Gratis',
      action: () => setIsHealthCheckModalOpen(true),
      popular: false
    },
    {
      id: 'xray',
      name: 'Business X-Ray™ Diagnostic',
      badge: 'Audit Forensik Menyeluruh',
      priceIdr: 15000000,
      period: 'Satu Kali Pembayaran',
      desc: 'Analisis forensik mendalam oleh sistem dan konsultan senior untuk membedah seluruh celah inefisiensi operasional.',
      features: [
        'Analisis Data Riil ERP / Akuntansi (6-12 Bulan)',
        'Peta Rinci Titik Kebocoran Marjin & Kas',
        'Audit Segregation of Duties (SoD) & Fraud',
        '90-Day Transformation Execution Agenda',
        'Sesi Pemaparan Langsung ke Dewan Direksi',
        'Kredit 100% dialihkan jika upgrade ke Retainer'
      ],
      cta: 'Pesan Business X-Ray™',
      action: () => { setAuthModalMode('register'); setIsAuthModalOpen(true); },
      popular: false
    },
    {
      id: 'score-pro',
      name: 'BuildUp Score™ Pro',
      badge: 'Monitoring Berkelanjutan',
      priceIdr: 7500000,
      period: 'per bulan (ditagih tahunan)',
      desc: 'Sistem pengawasan kontinyu untuk memastikan seluruh KPI dan kesehatan operasional tetap berada di jalur hijau.',
      features: [
        'Pemantauan 8 Dimensi Bisnis 24/7',
        'Peringatan Dini Anomali Arus Kas & Marjin',
        'Benchmarking Industri Nasional & Regional',
        'Dashboard Eksekutif C-Level & Board',
        'Integrasi 2 Sistem ERP / Pembukuan',
        'Dukungan Teknis Prioritas via Concierge'
      ],
      cta: 'Mulai Berlangganan Pro',
      action: () => { setAuthModalMode('register'); setIsAuthModalOpen(true); },
      popular: false
    },
    {
      id: 'retainer',
      name: 'Transformation Retainer',
      badge: 'Paling Banyak Dipilih',
      priceIdr: 45000000,
      period: 'per bulan (komitmen 6 bulan)',
      desc: 'Mitra transformasi bisnis penuh dengan 12 AI Workforce Agents, Business OS, dan pendampingan Partner Senior.',
      features: [
        'Semua Fitur BuildUp Score™ Pro',
        '12 Agen Eksekutif AI Workforce Studio™',
        'Auditable Decision Engine™ dengan Gate Persetujuan',
        'Orkestrasi Alur Kerja Multi-Sistem Otomatis',
        'Pendampingan Bi-Weekly oleh Partner KAP / Ahli',
        'Jaminan ROI Terbukti (Target 10x ROI)',
        'Dukungan Kepatuhan Pajak & Kesiapan SP2DK'
      ],
      cta: 'Pilih Transformation Retainer',
      action: () => { setAuthModalMode('register'); setIsAuthModalOpen(true); },
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Conglomerate',
      badge: 'Solusi Khusus Holding',
      priceIdr: 500000000,
      period: 'per tahun (kustomisasi penuh)',
      desc: 'Dirancang khusus untuk grup konglomerasi multi-entitas dengan struktur multi-holding dan volume transaksi tinggi.',
      features: [
        'Koneksi Multi-Entity Business Context Graph™',
        'Opsi Instalasi On-Premise / Private Air-Gap VPC',
        'Integrasi ERP Kustom (SAP, Oracle, Dynamics)',
        'Tim Partner Konsultan Berdedikasi Penuh',
        'Pelatihan Khusus Seluruh Divisi Anak Perusahaan',
        'SLA Respon 1 Jam & Audit Forensik Berkala'
      ],
      cta: 'Hubungi Tim Korporat Enterprise',
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
      a: 'Tahap Health Check dapat selesai dalam 5 menit. Untuk integrasi penuh Business X-Ray dan Transformation Retainer, koneksi ke sistem ERP (seperti SAP, Accurate, Jurnal, Odoo) berlangsung antara 7 hingga 14 hari kerja tanpa mengganggu operasional harian tim Anda.'
    },
    {
      q: 'Apakah data rahasia perusahaan kami aman?',
      a: 'Sangat aman. Kami menerapkan enkripsi bank-grade AES-256 dan protokol zero data retention, yang memastikan data finansial Anda tidak pernah digunakan untuk melatih model AI publik atau dibagikan ke pihak ketiga mana pun. Klien konglomerasi juga dapat memilih instalasi privat on-premise.'
    },
    {
      q: 'Apakah sistem AI ini bisa mengambil keputusan sendiri tanpa izin direksi?',
      a: 'Tidak. BuildUp menganut prinsip Human-in-the-loop yang ketat melalui Auditable Decision Engine™. Seluruh keputusan bernilai material dirumuskan sebagai Decision Object yang membutuhkan persetujuan resmi (approval gate) dari direksi atau pimpinan yang berwenang sebelum dieksekusi.'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-navy text-slate-100 flex flex-col font-sans selection:bg-brand-gold/30">
      {/* Public Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-navy/90 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <BuildUpLogo size="md" variant="horizontal" showSubtitle={true} />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-brand-gold transition-colors">{t('navHome')}</Link>
            <Link to="/about" className="hover:text-brand-gold transition-colors">{t('navAbout')}</Link>
            <Link to="/pricing" className="text-brand-gold font-bold">{t('navPricing')}</Link>
            <Link to="/contact" className="hover:text-brand-gold transition-colors">{t('navContact')}</Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <button
              onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); }}
              className="px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all"
            >
              {t('clientPortalLogin')}
            </button>
            <button
              onClick={() => setIsHealthCheckModalOpen(true)}
              className="px-4 py-2 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold rounded-xl shadow-md hover:opacity-95 transition-all"
            >
              {t('freeHealthCheckCTA')}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparan & Berbasis Nilai Nyata (Value-Driven)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Pilihan Paket Transformasi Bisnis
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Pilih model keterlibatan yang sesuai dengan skala dan kompleksitas bisnis Anda — dari diagnosis awal hingga pendampingan penuh berbasis AI dan tenaga ahli senior.
          </p>

          {/* Currency Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => setCurrency('IDR')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currency === 'IDR'
                  ? 'bg-brand-gold text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              IDR (Rupiah Indonesia)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-brand-gold text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              USD (US Dollar)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {plans.slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-slate-900/80 border transition-all ${
                plan.popular 
                  ? 'border-brand-gold shadow-[0_0_40px_rgba(212,175,55,0.2)] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 ring-1 ring-brand-gold' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase bg-slate-800 text-brand-gold border border-slate-700 mb-4">
                  {plan.badge}
                </span>
                <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-2 min-h-[36px]">{plan.desc}</p>

                <div className="my-6 pt-4 border-t border-slate-800">
                  <div className="text-3xl font-black text-white tracking-tight">
                    {plan.priceIdr === 0 ? 'Gratis' : formatMoney(plan.priceIdr)}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">{plan.period}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={plan.action}
                className={`w-full py-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-brand-gold to-amber-500 text-slate-950 shadow-lg hover:opacity-95'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Highlighted Retainer & Enterprise Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Transformation Retainer */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-brand-gold shadow-[0_10px_50px_rgba(212,175,55,0.25)] relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-brand-gold text-slate-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              Rekomendasi Utama C-Level
            </div>
            <span className="text-xs font-bold text-brand-gold tracking-widest uppercase">Model Kemitraan Paling Efektif</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">Transformation Retainer</h3>
            <p className="text-xs text-slate-300 mt-2">
              Transformasi menyeluruh dengan orkestrasi 12 AI Workforce agents dan supervisi langsung dari Certified Expert Network (KAP & Konsultan Pajak Berizin).
            </p>

            <div className="my-6">
              <div className="text-4xl font-black text-white tracking-tight">
                {formatMoney(45000000)} <span className="text-sm font-normal text-slate-400">/ bulan</span>
              </div>
              <p className="text-xs text-emerald-400 font-semibold mt-1">Target atribusi penghematan & perputaran kas: 10x dari nilai retainer.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {plans[3].features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                  <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setAuthModalMode('register'); setIsAuthModalOpen(true); }}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold text-slate-950 font-black text-sm rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Daftarkan Perusahaan untuk Retainer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Enterprise Conglomerate */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4 text-brand-gold" />
                <span>Konglomerasi & Multi-Holding</span>
              </div>
              <h3 className="text-2xl font-black text-white">Enterprise Conglomerate</h3>
              <p className="text-xs text-slate-400 mt-2">
                Dirancang khusus untuk grup korporasi dengan anak perusahaan majemuk, regulasi ketat, dan volume transaksi masif.
              </p>

              <div className="my-6">
                <div className="text-3xl font-black text-white tracking-tight">
                  {formatMoney(500000000)} <span className="text-xs font-normal text-slate-400">/ tahun</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Kustomisasi menyeluruh & perjanjian tingkat layanan (SLA) perbankan.</p>
              </div>

              <div className="space-y-2.5 mb-6">
                {plans[4].features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all"
            >
              <span>Hubungi Tim Solusi Enterprise</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto border-t border-slate-800 pt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Segala hal yang perlu diketahui Direksi dan Dewan Komisaris sebelum bermitra dengan BuildUp.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed pl-6.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Public Footer */}
      <footer className="py-8 border-t border-slate-900 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BuildUpLogo size="sm" variant="horizontal" showSubtitle={false} />
          <p>© 2026 BuildUp Business Transformation Partner. {t('rightsReserved')}</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-white">Tentang Kami</Link>
            <Link to="/pricing" className="hover:text-white">Harga</Link>
            <Link to="/contact" className="hover:text-white">Kontak</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
