import React, { useEffect } from "react";
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
import { ThemeToggle } from '../components/ThemeToggle';
import { EditableText } from '../components/admin/EditableText';
import { useCms } from '../context/CmsContext';

export function AboutSection() {
  
  const { setIsHealthCheckModalOpen, setIsAuthModalOpen, setAuthModalMode, t } = useBuildUp();
  const { state } = useCms();

  const comparisonPoints = state.aboutComparisons;
  const nineStages = state.aboutStages;

  return (
    <section id="about" className="py-24">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-brand-navy via-brand-surface to-brand-navy">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('aboutHeroBadge') || 'Misi & Filosofi BuildUp'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-textMain leading-tight">
            {t('aboutHeroTitle') || 'Kami Menggantikan Model Konsultasi Lama dengan'} <span className="text-[#D4AF37] font-black drop-shadow-md">AI-Native Business Transformation Intelligence � Direct Internal System Connectivity</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-brand-textMuted leading-relaxed max-w-3xl mx-auto">
            {t('aboutHeroSubtitle') || 'Dunia bisnis bergerak setiap detik, namun pendekatan transformasi bisnis tradisional masih terjebak pada dokumen slide 6 bulanan yang mahal dan berdebu. BuildUp hadir sebagai mitra operasi cerdas yang terhubung langsung ke denyut nadi data perusahaan Anda.'}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsHealthCheckModalOpen(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-brand-gold to-amber-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
            >
              <span>{t('aboutTestHealth') || 'Uji Kesehatan Bisnis Perusahaan Anda'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className="px-6 py-3.5 bg-brand-surface/90 hover:bg-brand-surface border border-brand-border text-brand-textMain font-bold text-sm rounded-xl transition-all"
            >
              {t('aboutSchedule') || 'Jadwalkan Diskusi dengan Partner Ahli'}
            </button>
          </div>
        </div>
      </section>

            {/* Founder Doctrine */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-brand-border bg-brand-deep">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-2xl"></div>
              <img src="/founder.png" alt="Yusuf B. Situmorang" className="relative z-10 w-64 h-auto object-cover rounded-2xl border-4 border-brand-gold/30 shadow-2xl" />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-bold text-brand-gold uppercase tracking-widest mb-6">Founder Doctrine &middot; Core Transformation Values</h2>
            <blockquote className="text-2xl sm:text-3xl font-medium text-brand-textMain leading-relaxed mb-8 italic">
              "Understand the business as one system. Find what matters. Automate what can be automated. Escalate what requires expertise. Measure what changed. Repeat until the business is materially stronger."
            </blockquote>
            <div>
              <p className="text-lg font-bold text-brand-textMain">Yusuf B. Situmorang</p>
              <p className="text-sm text-brand-gold font-medium">Founder & Chief Architect, BuildUp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Matrix: Traditional vs BuildUp */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-brand-border bg-brand-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-textMain">
              {t('aboutWhyTitle') || 'Mengapa Korporasi Modern Beralih ke BuildUp?'}
            </h2>
            <p className="text-sm text-brand-textMuted mt-2">
              {t('aboutWhySubtitle') || 'Perbandingan fundamental antara konsultan manajemen warisan (legacy) dengan arsitektur sistem operasi BuildUp.'}
            </p>
          </div>

          <div className="space-y-4">
            {(comparisonPoints || []).map((item, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 rounded-2xl bg-brand-navy/80 border border-brand-border hover:border-brand-border transition-colors items-center"
              >
                <div className="md:col-span-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    {item.feature}
                  </span>
                </div>
                <div className="md:col-span-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700 text-xs text-brand-textMuted">
                  <span className="font-bold text-slate-400 block mb-1">Konsultan Tradisional (Big 4):</span>
                  {item.traditional}
                </div>
                <div className="md:col-span-5 p-3.5 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-xs text-brand-textMain shadow-sm">
                  <span className="font-bold text-brand-gold flex items-center gap-1.5 mb-1">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-brand-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-xs font-semibold text-brand-textMuted mb-3">
              <Layers className="w-3.5 h-3.5 text-brand-gold" />
              <span>Metodologi Eksklusif</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-textMain">
              <EditableText id="about.stages.title" default="Siklus 9 Tahap Transformasi Bisnis Berkelanjutan" />
            </h2>
            <p className="text-sm text-brand-textMuted mt-2">
              <EditableText id="about.stages.subtitle" default="Satu-satunya kerangka kerja yang menghubungkan identifikasi kebocoran nilai dengan orkestrasi eksekusi multi-sistem secara otomatis." className="block" />
            </p>
          </div>

        <div className="max-w-5xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(nineStages || []).map((stage, index) => (
              <div 
                key={stage.num} 
                className="relative bg-brand-navy/80 backdrop-blur-md border border-brand-border p-6 rounded-2xl transition-all shadow-lg hover:shadow-brand-gold/10 hover:border-brand-gold/40 flex flex-col h-full group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-deep border-2 border-brand-gold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-300 flex-shrink-0">
                    <span className="font-mono text-lg font-black text-brand-gold group-hover:text-brand-deep">{stage.num}</span>
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-brand-textMain leading-snug group-hover:text-brand-gold transition-colors">
                    {stage.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-brand-textMuted leading-relaxed flex-grow">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
          </div>
        </section>

      {/* Security & Bank-Grade Compliance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-brand-border bg-brand-deep">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-brand-card via-brand-navy to-brand-deep border border-brand-border/80 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock className="w-64 h-64 text-brand-gold" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-brand-gold text-xs font-bold mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Standar Keamanan Korporat & Perbankan</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-brand-textMain">
                <EditableText id="about.security.title" default="Kerahasiaan Data Bisnis Anda Adalah Fondasi Kami" />
              </h2>

              <p className="mt-3 text-sm text-brand-textMuted max-w-2xl leading-relaxed">
                <EditableText id="about.security.desc" default="Kami memahami bahwa data keuangan, margin, dan transaksi pelanggan adalah rahasia dagang paling berharga. BuildUp dirancang dengan prinsip pertahanan berlapis (defense-in-depth):" className="block w-full" />
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface/60 border border-brand-border">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-textMain">Zero Data Retention untuk Pelatihan AI</h4>
                    <p className="text-[11px] text-brand-textMuted mt-1">Data Anda tidak pernah digunakan untuk melatih model AI publik.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface/60 border border-brand-border">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-textMain">Enkripsi AES-256 & TLS 1.3</h4>
                    <p className="text-[11px] text-brand-textMuted mt-1">Standar enkripsi tingkat militer pada saat transit maupun saat tersimpan.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface/60 border border-brand-border">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-textMain">Kepatuhan UU Perlindungan Data Pribadi (PDP)</h4>
                    <p className="text-[11px] text-brand-textMuted mt-1">Sesuai regulasi UU No. 27 Tahun 2022 dan ISO/IEC 27001.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface/60 border border-brand-border">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-textMain">Opsi Deployment On-Premise / Private VPC</h4>
                    <p className="text-[11px] text-brand-textMuted mt-1">Tersedia instalasi di server privat atau private cloud konglomerasi Anda.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 px-4 text-center border-t border-brand-border bg-brand-navy">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-textMain">
            <EditableText id="about.cta.title" default="Siap Memulai Transformasi Bisnis Bersama BuildUp?" />
          </h2>
          <p className="text-sm text-brand-textMuted mt-2">
            <EditableText id="about.cta.subtitle" default="Ikuti ratusan pimpinan bisnis yang telah menghentikan kebocoran margin dan mempercepat perputaran modal kerja." className="block w-full" />
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
              className="px-6 py-3 bg-brand-surface hover:bg-brand-surface text-brand-textMain font-bold text-sm rounded-xl border border-brand-border"
            >
              Hubungi Konsultan Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Public Footer */}
    </section>
  );
}











