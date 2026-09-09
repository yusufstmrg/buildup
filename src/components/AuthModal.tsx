import React, { useState } from 'react';
import { X, Lock, Building2, Mail, User, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';
import { BuildUpLogo } from './BuildUpLogo';

export function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    enterDemoMode,
    industries,
    language,
    t
  } = useBuildUp();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('distribution');
  const [customIndustry, setCustomIndustry] = useState('');
  const [revenueBracket, setRevenueBracket] = useState('Rp 50 Miliar - Rp 250 Miliar');
  const [executiveRole, setExecutiveRole] = useState('Chief Executive Officer / Direktur Utama');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        if (authModalMode === 'login') {
          if (!email) {
            setErrorMessage('Silakan masukkan email korporat Anda.');
            setIsSubmitting(false);
            return;
          }
          login(email, password);
        } else {
          if (!email || !companyName || !fullName) {
            setErrorMessage('Lengkapi nama, email, dan nama perusahaan Anda.');
            setIsSubmitting(false);
            return;
          }
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
            role: executiveRole,
            password
          });
        }
      } catch (err: any) {
        setErrorMessage(err.message || 'Terjadi kendala saat memproses.');
      } finally {
        setIsSubmitting(false);
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-6 md:p-8 text-white my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <BuildUpLogo size="md" variant="horizontal" showSubtitle={true} className="mb-3" />
          <h2 className="text-2xl font-extrabold tracking-tight text-white mt-1">
            {authModalMode === 'login' ? t('loginTitle') : t('registerTitle')}
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-md">
            {authModalMode === 'login' ? t('loginSubtitle') : t('registerSubtitle')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-800/80 border border-slate-700/60 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => { setAuthModalMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${
              authModalMode === 'login'
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-sm border border-slate-600/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('clientPortalLogin')}
          </button>
          <button
            type="button"
            onClick={() => { setAuthModalMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${
              authModalMode === 'register'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-slate-950 shadow-sm font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('registerBusiness')}
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-xs text-red-300">
            {errorMessage}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'register' && (
            <>
              {/* Full Name & Executive Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('fullNameLabel')} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Budi Santoso, S.E., M.B.A."
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold/80 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('executiveRoleLabel')} *
                  </label>
                  <select
                    value={executiveRole}
                    onChange={(e) => setExecutiveRole(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold/80 transition-colors"
                  >
                    <option value="Chief Executive Officer / Direktur Utama">Chief Executive Officer / Direktur Utama</option>
                    <option value="Chief Financial Officer / Direktur Keuangan">Chief Financial Officer / Direktur Keuangan</option>
                    <option value="Chief Operating Officer / Direktur Operasional">Chief Operating Officer / Direktur Operasional</option>
                    <option value="Founder / Owner / Pemilik Perusahaan">Founder / Owner / Pemilik Perusahaan</option>
                    <option value="Komisaris / Board of Commissioners">Komisaris / Board of Commissioners</option>
                    <option value="VP Transformation / Head of Strategy">VP Transformation / Head of Strategy</option>
                  </select>
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('companyNameLabel')} *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="PT Sumber Makmur Nusantara Group"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold/80 transition-colors"
                  />
                </div>
              </div>

              {/* Industry Selector with Comprehensive 22 Sectors + Other */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('industryLabel')} *
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold/80 transition-colors"
                >
                  {industries.map((ind) => (
                    <option key={ind.id} value={ind.id}>
                      {ind.name[language] || ind.name['id']}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Input if "Other" is chosen */}
              {selectedIndustry === 'other' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl animate-fade-in">
                  <label className="block text-xs font-bold text-amber-300 mb-1">
                    {t('customIndustryLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customIndustry}
                    onChange={(e) => setCustomIndustry(e.target.value)}
                    placeholder={t('customIndustryPlaceholder')}
                    className="w-full px-3 py-2 bg-slate-950 border border-amber-500/50 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  <p className="text-[11px] text-amber-200/70 mt-1">
                    Tim arsitek BuildUp akan menyesuaikan model ontologi bisnis khusus untuk sektor spesifik Anda.
                  </p>
                </div>
              )}

              {/* Revenue Bracket */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('annualRevenueLabel')}
                </label>
                <select
                  value={revenueBracket}
                  onChange={(e) => setRevenueBracket(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold/80 transition-colors"
                >
                  <option value="< Rp 10 Miliar / tahun">&lt; Rp 10 Miliar / tahun (Growth Stage)</option>
                  <option value="Rp 10 Miliar - Rp 50 Miliar">Rp 10 Miliar - Rp 50 Miliar (Mid-Market)</option>
                  <option value="Rp 50 Miliar - Rp 250 Miliar">Rp 50 Miliar - Rp 250 Miliar (Established Corporate)</option>
                  <option value="Rp 250 Miliar - Rp 1 Triliun">Rp 250 Miliar - Rp 1 Triliun (Large Enterprise)</option>
                  <option value="> Rp 1 Triliun / tahun">&gt; Rp 1 Triliun / tahun (Conglomerate / Group)</option>
                </select>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t('emailLabel')} *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="ceo@perusahaan-anda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold/80 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {t('passwordLabel')} *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-brand-gold/80 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-brand-gold via-amber-500 to-brand-gold hover:opacity-95 text-slate-950 font-extrabold text-sm rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <span className="inline-block animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full" />
            ) : (
              <>
                <span>{authModalMode === 'login' ? t('clientPortalLogin') : t('registerBusiness')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest absolute">
            Atau Evaluasi
          </span>
        </div>

        {/* Demo Mode Sandbox Button */}
        <button
          type="button"
          onClick={enterDemoMode}
          className="w-full py-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-brand-gold/60 text-slate-200 hover:text-white text-xs md:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform" />
          <span>{t('exploreDemoCTA')}</span>
        </button>

        {/* Trust Badges */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Enkripsi 256-Bit Bank-Grade</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
            <span>Zero Data Retention Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
