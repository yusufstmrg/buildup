import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';
import { BuildUpLogo } from '../components/BuildUpLogo';
import { LanguageSelector } from '../components/LanguageSelector';
import { useBuildUp } from '../context/BuildUpContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, enterDemoMode, t } = useBuildUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Silakan masukkan email korporat Anda.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/app');
    }, 400);
  };

  const handleDemo = () => {
    enterDemoMode();
    navigate('/app');
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
            to="/register"
            className="text-xs font-bold text-brand-textMuted hover:text-brand-textMain px-3 py-1.5 rounded-lg border border-brand-border hover:bg-brand-surface transition-colors"
          >
            {t('registerBusiness')}
          </Link>
        </div>
      </header>

      {/* Main Form Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-brand-navy/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-brand-textMain tracking-tight">Portal Klien Terenkripsi</h1>
            <p className="text-xs text-brand-textMuted mt-1.5">
              Akses khusus untuk Dewan Direksi, Komisaris, dan Tim Eksekutif
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-textMuted mb-1">Email Korporat *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-textMuted absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="direksi@perusahaan-anda.com"
                  className="w-full pl-9 pr-3.5 py-3 bg-slate-950 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-textMuted mb-1">Kata Sandi *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-textMuted absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-3 bg-slate-950 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-textMain focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-brand-gold via-amber-500 to-brand-gold text-slate-950 font-black text-sm rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="inline-block animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>Masuk ke Business Command Center</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-brand-navy px-3 text-[11px] font-bold text-brand-textMuted uppercase tracking-widest absolute">
              Atau Evaluasi
            </span>
          </div>

          {/* Demo Button */}
          <button
            type="button"
            onClick={handleDemo}
            className="w-full py-3 bg-brand-surface/90 hover:bg-brand-surface border border-brand-border text-brand-textMain hover:text-brand-textMain text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform" />
            <span>Buka Mode Demo Sandbox (Simulasi Interaktif)</span>
          </button>

          <p className="text-center text-xs text-brand-textMuted mt-6">
            Belum memiliki akun organisasi?{' '}
            <Link to="/register" className="text-brand-gold font-bold hover:underline">
              Daftar Akun Bisnis
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-[11px] text-brand-textMuted border-t border-slate-900">
        © 2026 BuildUp — AI-Native Business Transformation Partner. Enkripsi 256-Bit Bank-Grade.
      </footer>
    </div>
  );
}
