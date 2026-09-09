import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Cpu, 
  Lock, 
  FileCheck, 
  Users, 
  Zap,
  Clock,
  Sparkles,
  Layers,
  BarChart3
} from 'lucide-react';
import { BuildUpLogo } from '../components/BuildUpLogo';
import { LanguageSelector } from '../components/LanguageSelector';
import { useBuildUp } from '../context/BuildUpContext';

export function AboutPage() {
  const { setIsHealthCheckModalOpen, setIsAuthModalOpen, setAuthModalMode, t } = useBuildUp();

  const comparisonPoints = [
    {
      feature: 'Model Pelayanan',
      traditional: 'Presentasi slide PowerPoint statis, durasi 3-6 bulan, setelah proyek selesai konsultan pergi.',
      buildup: 'Sistem operasi cerdas (Business OS) yang aktif 24/7 di dalam perusahaan Anda, terus memantau dan memperbaiki.'
    },
    {
      feature: 'Dasar Bukti & Data',
      traditional: 'Wawancara subjektif dan sampel survei terbatas yang cepat kedaluwarsa.',
      buildup: 'Business Context Graph™ membaca data transaksi nyata dari ERP, penjualan, dan rekening bank secara real-time.'
    },
    {
      feature: 'Tanggung Jawab Eksekusi',
      traditional: 'Klien dibebani mengeksekusi rekomendasi tebal tanpa alat orkestrasi.',
      buildup: 'Auditable Decision Engine™ & 12 AI Workforce Agents menyiapkan draft aksi siap eksekusi (Human-in-the-loop).'
    },
    {
      feature: 'Biaya & Pengembalian Modal (ROI)',
      traditional: 'Biaya retainer miliaran rupiah tanpa jaminan peningkatan EBITDA terukur.',
      buildup: 'Biaya terjangkau dengan atribusi ROI terbukti rata-rata 10.6x atas biaya investasi.'
    }
  ];

  const nineStages = [
    { num: '01', title: 'Deep Context Ingestion', desc: 'Menghubungkan data ERP, jurnal akuntansi, invoice, dan kontrak ke dalam ontologi cerdas.' },
    { num: '02', title: 'Baseline 8-Dimension X-Ray', desc: 'Pemindaian menyeluruh terhadap kas, marjin, SOP, vendor, pajak, dan tata kelola.' },
    { num: '03', title: 'Value Leakage Pinpointing', desc: 'Menemukan titik kebocoran marjin, penumpukan stok mati, dan penagihan piutang lambat.' },
    { num: '04', title: 'Decision Object Formation', desc: 'Merumuskan rekomendasi keputusan berbasis bukti lengkap dengan proyeksi dampak finansial.' },
    { num: '05', title: 'Human Authority Gate', desc: 'Direksi dan manajemen memiliki kontrol penuh untuk menyetujui atau mengeskalasi aksi.' },
    { num: '06', title: 'Autonomous Multi-System Workflow', desc: 'Eksekusi otomatis ke sistem terkait (pembaharuan PO, reminder penagihan, validasi pajak).' },
    { num: '07', title: 'Continuous KPI Monitoring', desc: 'Pengawasan real-time terhadap indikator kinerja utama dan peringatan dini anomali.' },
    { num: '08', title: 'Strategic Re-Forecasting', desc: 'Simulasi skenario bisnis dinamis terhadap perubahan harga bahan baku dan fluktuasi pasar.' },
    { num: '09', title: 'Enterprise Value Accretion', desc: 'Peningkatan EBITDA yang tervalidasi dan peningkatan valuasi korporasi secara terukur.' }
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
            <Link to="/about" className="text-brand-gold font-bold">{t('navAbout')}</Link>
            <Link to="/pricing" className="hover:text-brand-gold transition-colors">{t('navPricing')}</Link>
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

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-brand-navy via-slate-900 to-brand-navy">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Misi & Filosofi BuildUp</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Kami Menggantikan Model Konsultasi Lama dengan <span className="bg-gradient-to-r from-[#FFF5C6] via-[#F2C54D] to-[#B37C0C] bg-clip-text text-transparent">AI-Native Transformation Partner</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Dunia bisnis bergerak setiap detik, namun pendekatan transformasi bisnis tradisional masih terjebak pada dokumen slide 6 bulanan yang mahal dan berdebu. BuildUp hadir sebagai mitra operasi cerdas yang terhubung langsung ke denyut nadi data perusahaan Anda.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsHealthCheckModalOpen(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-brand-gold to-amber-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
            >
              <span>Uji Kesehatan Bisnis Perusahaan Anda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm rounded-xl transition-all"
            >
              Jadwalkan Diskusi dengan Partner Ahli
            </Link>
          </div>
        </div>
      </section>

      {/* Comparative Matrix: Traditional vs BuildUp */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Mengapa Korporasi Modern Beralih ke BuildUp?
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Perbandingan fundamental antara konsultan manajemen warisan (legacy) dengan arsitektur sistem operasi BuildUp.
            </p>
          </div>

          <div className="space-y-4">
            {comparisonPoints.map((item, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors items-center"
              >
                <div className="md:col-span-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    {item.feature}
                  </span>
                </div>
                <div className="md:col-span-4 p-3 rounded-xl bg-red-950/20 border border-red-900/30 text-xs text-slate-300">
                  <span className="font-bold text-red-400 block mb-1">Konsultan Tradisional (Big 4):</span>
                  {item.traditional}
                </div>
                <div className="md:col-span-5 p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/40 text-xs text-emerald-100 shadow-sm">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    BuildUp AI-Native Partner:
                  </span>
                  {item.buildup}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 9-Stage Transformation Engine */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 mb-3">
              <Layers className="w-3.5 h-3.5 text-brand-gold" />
              <span>Metodologi Eksklusif</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Siklus 9 Tahap Transformasi Bisnis Berkelanjutan
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Satu-satunya kerangka kerja yang menghubungkan identifikasi kebocoran nilai dengan orkestrasi eksekusi multi-sistem secara otomatis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nineStages.map((stage) => (
              <div key={stage.num} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-brand-gold/40 transition-all group">
                <span className="text-3xl font-black text-slate-700 group-hover:text-brand-gold transition-colors font-mono">
                  {stage.num}
                </span>
                <h3 className="text-base font-bold text-white mt-2 mb-1.5 group-hover:text-brand-gold transition-colors">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Bank-Grade Compliance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-950/60">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock className="w-64 h-64 text-brand-gold" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Standar Keamanan Korporat & Perbankan</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Kerahasiaan Data Bisnis Anda Adalah Fondasi Kami
              </h2>

              <p className="mt-3 text-sm text-slate-300 max-w-2xl leading-relaxed">
                Kami memahami bahwa data keuangan, margin, dan transaksi pelanggan adalah rahasia dagang paling berharga. BuildUp dirancang dengan prinsip pertahanan berlapis (defense-in-depth):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Zero Data Retention untuk Pelatihan AI</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Data Anda tidak pernah digunakan untuk melatih model AI publik.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Enkripsi AES-256 & TLS 1.3</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Standar enkripsi tingkat militer pada saat transit maupun saat tersimpan.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Kepatuhan UU Perlindungan Data Pribadi (PDP)</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Sesuai regulasi UU No. 27 Tahun 2022 dan ISO/IEC 27001.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Opsi Deployment On-Premise / Private VPC</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Tersedia instalasi di server privat atau private cloud konglomerasi Anda.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 px-4 text-center border-t border-slate-800 bg-brand-navy">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Siap Memulai Transformasi Bisnis Bersama BuildUp?
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Ikuti ratusan pimpinan bisnis yang telah menghentikan kebocoran marjin dan mempercepat perputaran modal kerja.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsHealthCheckModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-brand-gold to-amber-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg hover:opacity-95"
            >
              {t('freeHealthCheckCTA')}
            </button>
            <Link
              to="/contact"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700"
            >
              Hubungi Konsultan Kami
            </Link>
          </div>
        </div>
      </section>

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
