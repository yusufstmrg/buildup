import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { BuildUpLogo } from '../components/BuildUpLogo';
import { LanguageSelector } from '../components/LanguageSelector';
import { useBuildUp } from '../context/BuildUpContext';

export function ContactPage() {
  const { industries, language, t, setIsAuthModalOpen, setAuthModalMode, setIsHealthCheckModalOpen } = useBuildUp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('distribution');
  const [customIndustry, setCustomIndustry] = useState('');
  const [revenueScale, setRevenueScale] = useState('Rp 50 Miliar - Rp 250 Miliar');
  const [primaryChallenge, setPrimaryChallenge] = useState('Kebocoran Marjin & Inefisiensi Biaya');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

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
            <Link to="/pricing" className="hover:text-brand-gold transition-colors">{t('navPricing')}</Link>
            <Link to="/contact" className="text-brand-gold font-bold">{t('navContact')}</Link>
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
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Konsultasi Strategis & Kemitraan</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Diskusikan Kebutuhan Transformasi Perusahaan Anda
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Konsultan senior dan arsitek transformasi BuildUp siap menganalisis struktur data operasional, mengidentifikasi kebocoran nilai, dan merancang peta jalan eksekusi khusus untuk perusahaan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">Permintaan Terjadwal</h3>
                <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                  Terima kasih, <strong>{fullName}</strong>. Tim Partner Senior BuildUp telah menerima profil perusahaan <strong>{companyName}</strong> dan akan menghubungi Anda dalam waktu kurang dari 2 jam kerja.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl"
                  >
                    Kirim Permintaan Tambahan
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">Formulir Pengajuan Briefing Eksekutif</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap & Gelar *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ir. H. Hendra Wijaya, M.M."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Kerja Korporat *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hendra@perusahaan.co.id"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor WhatsApp / Telepon *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+62 811-XXXX-XXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Perusahaan / Grup Bisnis *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="PT Nusantara Indo Mandiri"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                {/* Sektor Industri dengan Opsi Lengkap + Other */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Sektor Industri Utama *</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold"
                  >
                    {industries.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.name[language] || ind.name['id']}
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
                      className="w-full px-3 py-2 bg-slate-900 border border-brand-gold/50 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Kisaran Omzet Tahunan</label>
                    <select
                      value={revenueScale}
                      onChange={(e) => setRevenueScale(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold"
                    >
                      <option value="< Rp 10 Miliar / thn">&lt; Rp 10 Miliar / thn</option>
                      <option value="Rp 10 Miliar - Rp 50 Miliar">Rp 10 Miliar - Rp 50 Miliar</option>
                      <option value="Rp 50 Miliar - Rp 250 Miliar">Rp 50 Miliar - Rp 250 Miliar (Mid-Market)</option>
                      <option value="Rp 250 Miliar - Rp 1 Triliun">Rp 250 Miliar - Rp 1 Triliun (Enterprise)</option>
                      <option value="> Rp 1 Triliun / thn">&gt; Rp 1 Triliun / thn (Konglomerasi)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Fokus Tantangan Utama</label>
                    <select
                      value={primaryChallenge}
                      onChange={(e) => setPrimaryChallenge(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold"
                    >
                      <option value="Kebocoran Marjin & Inefisiensi Biaya">Kebocoran Marjin & Inefisiensi Biaya</option>
                      <option value="Piutang Lambat (DSO) & Defisit Kas">Piutang Lambat (DSO) & Defisit Kas</option>
                      <option value="Kepatuhan Pajak, SP2DK & Rekonsiliasi Faktur">Kepatuhan Pajak, SP2DK & Rekonsiliasi</option>
                      <option value="Pencegahan Fraud & Segregation of Duties (SoD)">Pencegahan Fraud & Audit Internal</option>
                      <option value="Integrasi ERP & Business Context Graph">Integrasi Data ERP & AI Workforce</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Catatan Tambahan / Kebutuhan Khusus</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ceritakan gambaran singkat sistem ERP saat ini dan target percepatan bisnis yang ingin dicapai..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold"
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
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Direct Executive Concierge</h4>
                  <p className="text-xs text-emerald-300/80">Respon instan untuk Direksi & C-Level</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
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
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand-gold" />
                <span>Kantor Pusat & Pusat Operasi</span>
              </h4>

              <div className="flex items-start gap-3 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">BuildUp Transformation Hub — SCBD Jakarta</p>
                  <p className="mt-0.5 text-slate-400">District 8 Treasury Tower, Level 38</p>
                  <p className="text-slate-400">Jl. Jend. Sudirman Kav. 52-53, SCBD Lot 28</p>
                  <p className="text-slate-400">Jakarta Selatan, DKI Jakarta 12190, Indonesia</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>executive@buildup.business</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Senin - Jumat: 08:30 - 18:00 WIB (Concierge 24/7 untuk Klien Retainer)</span>
              </div>
            </div>

            {/* SLA Badge */}
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" />
              <span>
                <strong>SLA Respon Eksekutif:</strong> Seluruh permintaan dari Direksi dan C-Level dijamin mendapatkan tanggapan dalam waktu kurang dari 2 jam kerja.
              </span>
            </div>
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
