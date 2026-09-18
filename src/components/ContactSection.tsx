import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, Building2, MapPin, CheckCircle2, MessageSquare, Briefcase, Clock, ShieldCheck, Calendar } from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';
import { ExecutiveVerification } from '../components/ExecutiveVerification';

const industries = [
  { id: 'fin', name: { id: 'Perbankan & Jasa Keuangan', en: 'Banking & Financial Services' } },
  { id: 'mfg', name: { id: 'Manufaktur & Otomotif', en: 'Manufacturing & Automotive' } },
  { id: 'ret', name: { id: 'Ritel & FMCG', en: 'Retail & FMCG' } },
  { id: 'log', name: { id: 'Logistik & Supply Chain', en: 'Logistics & Supply Chain' } },
  { id: 'eng', name: { id: 'Energi & Pertambangan', en: 'Energy & Mining' } },
  { id: 'hth', name: { id: 'Kesehatan & Farmasi', en: 'Healthcare & Pharmaceuticals' } },
  { id: 'prop', name: { id: 'Properti & Konstruksi', en: 'Property & Construction' } },
  { id: 'other', name: { id: 'Lainnya (Tuliskan Spesifik)', en: 'Other (Please Specify)' } }
];

export function ContactSection() {
  const { language } = useBuildUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('fin');
  const [customIndustry, setCustomIndustry] = useState('');
  const [revenueScale, setRevenueScale] = useState('');
  const [primaryChallenge, setPrimaryChallenge] = useState('Kebocoran Margin & Inefisiensi Biaya');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call to CRM
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-brand-surface relative">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Konsultasi Strategis & Kemitraan</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-textMain tracking-tight">
            Diskusikan Kebutuhan Transformasi Perusahaan Anda
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-textMuted">
            Konsultan senior dan arsitek transformasi BuildUp siap menganalisis struktur data operasional, mengidentifikasi kebocoran nilai, dan merancang peta jalan eksekusi khusus untuk perusahaan Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-brand-surface/40 backdrop-blur-xl p-8 rounded-3xl border border-brand-border relative shadow-2xl">
            <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1.5 bg-brand-gold text-slate-950 text-xs font-black rounded-full shadow-lg">
              Priority Access
            </div>

            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-brand-textMain mb-4">Pengajuan Berhasil Diterima</h3>
                <p className="text-brand-textMuted text-sm max-w-md">
                  Executive Concierge kami akan menghubungi Anda dalam waktu kurang dari 2 jam kerja untuk mengonfirmasi jadwal Executive Briefing Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <ExecutiveVerification onVerified={(method: 'linkedin' | 'email') => console.log('Verified via', method)} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-textMuted mb-1">Nama Lengkap & Gelar *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Budi Santoso, MBA"
                      className="w-full px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-xs md:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-textMuted mb-1">Email Korporat Valid *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="budi.s@nusantara-indo.co.id"
                      className="w-full px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-xs md:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-textMuted mb-1">Nomor Direct / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+62 811-XXXX-XXXX"
                      className="w-full px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-xs md:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-textMuted mb-1">Nama Perusahaan / Grup Bisnis *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="PT Nusantara Indo Mandiri"
                      className="w-full px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-xs md:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted mb-1">Sektor Industri Utama *</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-xs md:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold appearance-none"
                  >
                    {industries.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {(ind.name as Record<string, string>)[language] || ind.name['id']}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedIndustry === 'other' && (
                  <div className="p-3 bg-brand-gold/10 border border-brand-gold/40 rounded-xl animate-fade-in">
                    <label className="block text-xs font-bold text-brand-gold mb-1">
                      Sebutkan Sektor Industri Perusahaan Anda *
                    </label>
                    <input
                      type="text"
                      required
                      value={customIndustry}
                      onChange={(e) => setCustomIndustry(e.target.value)}
                      placeholder="Contoh: Logistik Alat Berat & Pertambangan Laut..."
                      className="w-full px-3 py-2 bg-brand-navy border border-brand-gold/50 rounded-lg text-xs md:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-textMuted mb-1">Kisaran Omzet Tahunan</label>
                    <select
                      value={revenueScale}
                      onChange={(e) => setRevenueScale(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-xs md:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold appearance-none"
                    >
                        <option value="">Pilih Kisaran</option>
                        <option value="< Rp 1 Miliar">&lt; Rp 1 Miliar / thn</option>
                        <option value="Rp 1 Miliar - Rp 10 Miliar">Rp 1 Miliar - Rp 10 Miliar / thn</option>
                        <option value="Rp 10 Miliar - Rp 50 Miliar">Rp 10 Miliar - Rp 50 Miliar / thn</option>
                        <option value="Rp 50 Miliar - Rp 100 Miliar">Rp 50 Miliar - Rp 100 Miliar / thn</option>
                        <option value="Rp 100 Miliar - Rp 1 Triliun">Rp 100 Miliar - Rp 1 Triliun / thn</option>
                        <option value="> Rp 1 Triliun">&gt; Rp 1 Triliun / thn (Konglomerasi)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-textMuted mb-1">Fokus Tantangan Utama</label>
                    <select
                      value={primaryChallenge}
                      onChange={(e) => setPrimaryChallenge(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-xs md:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold"
                    >
                      <option value="Kebocoran Margin & Inefisiensi Biaya">Kebocoran Margin & Inefisiensi Biaya</option>
                      <option value="Piutang Lambat (DSO) & Defisit Kas">Piutang Lambat (DSO) & Defisit Kas</option>
                      <option value="Kepatuhan Pajak, SP2DK & Rekonsiliasi Faktur">Kepatuhan Pajak, SP2DK & Rekonsiliasi</option>
                      <option value="Pencegahan Fraud & Segregation of Duties (SoD)">Pencegahan Fraud & Audit Internal</option>
                      <option value="Integrasi ERP & Business Context Graph">Integrasi Data ERP & AI Workforce</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-textMuted mb-1">Catatan Tambahan / Kebutuhan Khusus</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ceritakan gambaran singkat sistem ERP saat ini dan target percepatan bisnis yang ingin dicapai..."
                    className="w-full px-3.5 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-xs md:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-gold via-amber-500 to-brand-gold text-slate-950 font-extrabold text-sm rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <span>Jadwalkan Konsultasi dengan Partner Senior</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Concierge, Offices, Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct WhatsApp Concierge */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-surface via-brand-deep to-brand-deep border border-emerald-500/40 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-textMain">Direct Executive Concierge</h4>
                  <p className="text-xs text-emerald-300/80">Respon instan untuk Direksi & C-Level</p>
                </div>
              </div>
              <p className="text-xs text-brand-textMuted leading-relaxed mb-6">
                Untuk pertanyaan mendesak atau koordinasi penjadwalan presentasi ke Dewan Direksi / Komisaris, hubungi concierge eksekutif kami secara langsung melalui WhatsApp resmi:
              </p>
              <a
                href="https://wa.me/6281119992026?text=Halo%20BuildUp%2C%20saya%20ingin%20berkonsultasi%20mengenai%20solusi%20transformasi%20bisnis%20BuildUp%20untuk%20perusahaan%20kami."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Hubungi via WhatsApp Resmi (+62 811-1999-2026)</span>
              </a>
            </div>

            {/* Headquarters Address */}
            <div className="p-6 sm:p-8 rounded-3xl bg-brand-navy/80 border border-brand-border space-y-5">
              <h4 className="text-base font-bold text-brand-textMain flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand-gold" />
                <span>Kantor Pusat & Pusat Operasi</span>
              </h4>

              <div className="flex items-start gap-3 text-xs text-brand-textMuted">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-brand-textMain">BuildUp Transformation Hub — SCBD Jakarta</p>
                  <p className="mt-0.5 text-brand-textMuted">District 8 Treasury Tower, Level 38</p>
                  <p className="text-brand-textMuted">Jl. Jend. Sudirman Kav. 52-53, SCBD Lot 28</p>
                  <p className="text-brand-textMuted">Jakarta Selatan, DKI Jakarta 12190, Indonesia</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-brand-textMuted">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>executive@buildup.business</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-brand-textMuted">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Senin - Jumat: 08:30 - 18:00 WIB (Concierge 24/7 untuk Klien Retainer)</span>
              </div>
            </div>

            {/* SLA Badge */}
            <div className="p-4 rounded-2xl bg-brand-navy/40 border border-brand-border flex items-center gap-3 text-xs text-brand-textMuted">
              <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" />
              <span>
                <strong>SLA Respon Eksekutif:</strong> Seluruh permintaan dari Direksi dan C-Level dijamin mendapatkan tanggapan dalam waktu kurang dari 2 jam kerja.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

