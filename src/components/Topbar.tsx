import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Globe, Sparkles, ArrowUpRight, LogOut, Building2, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBuildUp } from '../context/BuildUpContext';
import { LanguageSelector } from './LanguageSelector';

export function Topbar() {
  const navigate = useNavigate();
  const { 
    overallScore, 
    currency, 
    setCurrency, 
    setIsHealthCheckModalOpen, 
    user, 
    isSandbox, 
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
    t
  } = useBuildUp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { title: 'Decision Object Ready', desc: 'AI Procurement prepared normalized RFQ for packaging suppliers.', time: '14m ago', unread: true },
    { title: 'SoD Conflict Detected', desc: 'User FIN-OP-04 attempted dual approval on payment release.', time: '1h ago', unread: true },
    { title: 'Receivables Milestone', desc: 'Rp 450.000.000 collected through automated reminder workflow.', time: '3h ago', unread: false }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex flex-col shrink-0 relative z-30">
      {/* Interactive Sandbox Alert Banner if in Demo Mode */}
      {isSandbox && (
        <div className="bg-gradient-to-r from-amber-600 via-brand-gold to-amber-600 text-slate-950 px-4 py-1.5 flex items-center justify-between text-xs font-bold shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Mode Sandbox Interaktif (Simulasi Data: {user?.companyName || 'PT Global Distribusi Nusantara'}).</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setAuthModalMode('register'); setIsAuthModalOpen(true); }}
              className="px-2.5 py-0.5 bg-slate-950 hover:bg-brand-navy text-brand-gold hover:text-brand-textMain rounded-lg text-[11px] font-extrabold transition-colors"
            >
              Hubungkan Data Nyata ERP
            </button>
          </div>
        </div>
      )}

      {/* Main Topbar */}
      <div className="h-16 bg-brand-surface border-b border-brand-border flex items-center justify-between px-6">
        {/* Search & Natural Language Query */}
        <div className="flex-1 flex items-center max-w-xl">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-brand-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask BuildUp Intelligence (e.g. 'Why did EBITDA dip in Q3?' or 'Show top 5 vendor leaks')"
              className="w-full bg-brand-navy border border-brand-border rounded-xl pl-10 pr-4 py-2 text-xs text-brand-textMain placeholder:text-brand-textMuted focus:outline-none focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/50 transition-all"
            />
          </div>
        </div>
        
        {/* Right Controls */}
        <div className="flex items-center gap-3 ml-4">
          {/* Multi-Language Selector */}
          <LanguageSelector />

          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center bg-brand-navy border border-brand-border rounded-lg p-0.5 text-xs">
            <button 
              onClick={() => setCurrency('IDR')}
              className={`px-2 py-0.5 rounded font-bold text-[11px] transition-colors ${currency === 'IDR' ? 'bg-brand-gold text-brand-deep' : 'text-brand-textMuted hover:text-brand-textMain'}`}
            >
              IDR
            </button>
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-2 py-0.5 rounded font-bold text-[11px] transition-colors ${currency === 'USD' ? 'bg-brand-gold text-brand-deep' : 'text-brand-textMuted hover:text-brand-textMain'}`}
            >
              USD
            </button>
          </div>

          {/* Live Score Pill */}
          <button
            onClick={() => setIsHealthCheckModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy border border-brand-border hover:border-brand-gold/40 transition-colors text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-brand-textMuted">Score:</span>
            <span className="font-extrabold text-brand-gold">{overallScore}/100</span>
          </button>

          {/* Back to Public Site */}
          <Link
            to="/"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-navy hover:bg-brand-card text-brand-textMuted hover:text-brand-gold border border-brand-border text-xs font-semibold transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-brand-gold" />
            <span>Portal Publik</span>
            <ArrowUpRight className="w-3 h-3 text-brand-textMuted" />
          </Link>
          
          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotificationModal(!showNotificationModal)}
              className="relative p-2 text-brand-textMuted hover:text-brand-textMain hover:bg-brand-navy rounded-lg transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-gold"></span>
            </button>

            {showNotificationModal && (
              <div className="absolute right-0 mt-2 w-80 bg-brand-surface border border-brand-border rounded-xl shadow-2xl p-3 space-y-2 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                  <span className="text-xs font-bold text-brand-textMain uppercase tracking-wider">Enterprise Alerts</span>
                  <span className="text-[10px] text-brand-gold font-bold">2 Unread</span>
                </div>
                <div className="space-y-1.5">
                  {notifications.map((n, i) => (
                    <div key={i} className={`p-2 rounded-lg text-xs ${n.unread ? 'bg-brand-navy border border-brand-border/80' : 'bg-transparent'}`}>
                      <div className="font-semibold text-brand-textMain">{n.title}</div>
                      <div className="text-[11px] text-brand-textMuted leading-snug mt-0.5">{n.desc}</div>
                      <div className="text-[9px] text-brand-textMuted mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="h-6 w-px bg-brand-border"></div>
          
          {/* Executive User Profile with Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-brand-navy/60 transition-colors text-left"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-brand-textMain leading-none">
                  {user?.name || 'Eksekutif BuildUp'}
                </div>
                <div className="text-[10px] text-brand-gold font-semibold mt-1">
                  {user?.role || 'Chief Executive Officer'}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                {(user?.name || 'B').charAt(0)}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-brand-textMuted transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-brand-navy border border-brand-border/80 rounded-2xl shadow-2xl p-3 z-50 animate-fade-in backdrop-blur-xl">
                <div className="pb-3 mb-2 border-b border-slate-800">
                  <p className="text-xs font-extrabold text-brand-textMain truncate">{user?.companyName || 'PT Global Distribusi Nusantara'}</p>
                  <p className="text-[11px] text-brand-textMuted truncate mt-0.5">{user?.email || 'director@nusantara-group.co.id'}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Paket: {user?.plan || 'Transformation Retainer'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    to="/monetization"
                    onClick={() => setShowUserMenu(false)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-brand-textMuted hover:text-brand-textMain hover:bg-brand-surface rounded-lg transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Kelola Langganan & Tagihan</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      setAuthModalMode('register');
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-brand-textMuted hover:text-brand-textMain hover:bg-brand-surface rounded-lg transition-colors text-left"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Daftarkan Entitas / Unit Baru</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-950/40 rounded-lg transition-colors text-left font-semibold mt-2 pt-2 border-t border-slate-800"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar dari Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
