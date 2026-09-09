import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { BuildUpLogo } from '../components/BuildUpLogo';
import { LanguageSelector } from '../components/LanguageSelector';
import { useBuildUp } from '../context/BuildUpContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, enterDemoMode, industries, language, t } = useBuildUp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('distribution');
  const [customIndustry, setCustomIndustry] = useState('');
  const [revenueBracket, setRevenueBracket] = useState('Rp 50 Miliar - Rp 250 Miliar');
  const [role, setRole] = useState('Chief Executive Officer / Direktur Utama');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !companyName) {
      setError('Lengkapi seluruh data wajib bertanda bintang (*).');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const industryName = selectedIndustry === 'other'
        ? (customIndustry || 'Sektor Lainnya')
        : (industries.find(i => i.id === selectedIndustry)?.name[language] || selectedIndustry);

      register({
        fullName,
        email,
        companyName,
        industry: industryName,
        customIndustry: selectedIndustry === 'other' ? customIndustry : undefined,
        revenueBracket,
        role,
        password
      });

      setIsLoading(false);
      navigate('/app');
    }, 450);
  };

  return (
    <div className="min-h-screen bg-brand-navy text-slate-100 flex flex-col justify-between font-sans selection:bg-brand-gold/30">
      {/* Topbar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
        <Link to="/">
          <BuildUpLogo size="md" variant="horizontal" showSubtitle={true} />
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link
            to="/login"
            className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors"
          >
            {t('clientPortalLogin')}
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold mb-3">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">{t('registerTitle')}</h1>
            <p className="text-xs text-slate-400 mt-1.5">{t('registerSubtitle')}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('fullNameLabel')} *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Bambang Soediro, M.M."
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('executiveRoleLabel')} *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold"
                >
                  <option value="Chief Executive Officer / Direktur Utama">Chief Executive Officer / Direktur Utama</option>
                  <option value="Chief Financial Officer / Direktur Keuangan">Chief Financial Officer / Direktur Keuangan</option>
                  <option value="Chief Operating Officer / Direktur Operasional">Chief Operating Officer / Direktur Operasional</option>
                  <option value="Founder / Pemilik Perusahaan">Founder / Pemilik Perusahaan</option>
                  <option value="Komisaris / Board Member">Komisaris / Board Member</option>
                  <option value="VP Strategy / General Manager">VP Strategy / General Manager</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{t('companyNameLabel')} *</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="PT Samudera Logistik Makmur"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            {/* Comprehensive Industry Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{t('industryLabel')} *</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold"
              >
                {industries.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.name[language] || ind.name['id']}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Other Industry Input */}
            {selectedIndustry === 'other' && (
              <div className="p-3.5 bg-brand-gold/10 border border-brand-gold/40 rounded-xl animate-fade-in">
                <label className="block text-xs font-bold text-brand-gold mb-1">
                  {t('customIndustryLabel')} *
                </label>
                <input
                  type="text"
                  required
                  value={customIndustry}
                  onChange={(e) => setCustomIndustry(e.target.value)}
                  placeholder={t('customIndustryPlaceholder')}
                  className="w-full px-3 py-2 bg-slate-900 border border-brand-gold/50 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold"
                />
                <p className="text-[11px] text-amber-200/80 mt-1">
                  Model ontologi bisnis dan parameter benchmark akan otomatis disesuaikan dengan profil sektor khusus Anda.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('emailLabel')} *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="bambang@samudera.co.id"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('passwordLabel')} *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{t('annualRevenueLabel')}</label>
              <select
                value={revenueBracket}
                onChange={(e) => setRevenueBracket(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold"
              >
                <option value="< Rp 10 Miliar / tahun">&lt; Rp 10 Miliar / tahun</option>
                <option value="Rp 10 Miliar - Rp 50 Miliar">Rp 10 Miliar - Rp 50 Miliar</option>
                <option value="Rp 50 Miliar - Rp 250 Miliar">Rp 50 Miliar - Rp 250 Miliar (Mid-Market)</option>
                <option value="Rp 250 Miliar - Rp 1 Triliun">Rp 250 Miliar - Rp 1 Triliun (Enterprise)</option>
                <option value="> Rp 1 Triliun / tahun">&gt; Rp 1 Triliun / tahun (Konglomerasi)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-brand-gold via-amber-500 to-brand-gold text-slate-950 font-black text-sm rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <span className="inline-block animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>{t('registerBusiness')} & Inisialisasi</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6 flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest absolute">
              Atau
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              enterDemoMode();
              navigate('/app');
            }}
            className="w-full py-3 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>Coba Dahulu dalam Mode Demo Sandbox</span>
          </button>

          <p className="text-center text-xs text-slate-400 mt-6">
            Sudah memiliki akun resmi?{' '}
            <Link to="/login" className="text-brand-gold font-bold hover:underline">
              Masuk ke Portal Klien
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-[11px] text-slate-400 border-t border-slate-900">
        © 2026 BuildUp — AI-Native Business Transformation Partner.
      </footer>
    </div>
  );
}
