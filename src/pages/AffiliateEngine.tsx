import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowRight,
  Gift,
  Award,
  Wallet,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';

export function AffiliateEngine() {
  const { user, language, formatMoney } = useBuildUp();
  const [copied, setCopied] = useState(false);
  const [payoutRequested, setPayoutRequested] = useState(false);

  // Mock Data for the Affiliate Engine
  const referralLink = `https://buildup-os.web.app/r/${user?.uid || 'user123'}`;
  const totalEarnings = 12500000;
  const pendingPayout = 4500000;
  const totalReferrals = 14;
  const activeSubscribers = 6;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recentReferrals = [
    { id: 1, company: 'PT Teknologi Digital...', date: '2026-09-20', status: 'Active', plan: 'BuildUp Score™ Pro', commission: 1500000 },
    { id: 2, company: 'CV Maju Bersama', date: '2026-09-18', status: 'Pending', plan: 'Free Health Check', commission: 0 },
    { id: 3, company: 'PT Distribusi Logistik', date: '2026-09-15', status: 'Active', plan: 'Business X-Ray™ Sprint', commission: 3000000 },
  ];

  const t = {
    title: language === 'id' ? 'Kemitraan & Afiliasi' : 'Referral & Affiliate Engine',
    subtitle: language === 'id' ? 'Bagikan tautan Anda dan dapatkan komisi recurring seumur hidup untuk setiap bisnis yang bergabung dengan BuildUp.' : 'Share your link and earn lifetime recurring commissions for every business that joins BuildUp.',
    yourLink: language === 'id' ? 'Tautan Afiliasi Unik Anda' : 'Your Unique Affiliate Link',
    copyBtn: language === 'id' ? 'Salin Tautan' : 'Copy Link',
    copied: language === 'id' ? 'Tersalin!' : 'Copied!',
    metricsTotalEarnings: language === 'id' ? 'Total Pendapatan' : 'Total Earnings',
    metricsPending: language === 'id' ? 'Saldo Tersedia' : 'Available Balance',
    metricsReferrals: language === 'id' ? 'Total Referal' : 'Total Referrals',
    metricsActive: language === 'id' ? 'Pelanggan Aktif' : 'Active Subscribers',
    requestPayout: language === 'id' ? 'Tarik Dana' : 'Request Payout',
    payoutDesc: language === 'id' ? 'Minimal penarikan Rp 1.000.000' : 'Minimum payout Rp 1,000,000',
    commissionStructure: language === 'id' ? 'Struktur Komisi' : 'Commission Structure',
    recentActivity: language === 'id' ? 'Aktivitas Referal Terbaru' : 'Recent Referral Activity',
    tableCompany: language === 'id' ? 'Perusahaan' : 'Company',
    tableDate: language === 'id' ? 'Tanggal' : 'Date',
    tableStatus: language === 'id' ? 'Status' : 'Status',
    tablePlan: language === 'id' ? 'Paket' : 'Plan',
    tableCommission: language === 'id' ? 'Komisi' : 'Commission',
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-brand-surface p-8 rounded-3xl border border-brand-border relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 pointer-events-none">
          <Share2 className="w-96 h-96 text-brand-gold" />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-brand-textMain mb-2">{t.title}</h1>
          <p className="text-brand-textMuted max-w-xl text-sm leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="relative z-10 w-full md:w-auto bg-brand-navy border border-brand-border p-4 rounded-xl shadow-lg">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">{t.yourLink}</p>
          <div className="flex items-center gap-2">
            <code className="bg-brand-deep px-3 py-2 rounded-lg text-brand-textMain text-sm border border-brand-border/50 truncate max-w-[200px] sm:max-w-xs">
              {referralLink}
            </code>
            <button 
              onClick={handleCopy}
              className="bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? t.copied : t.copyBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t.metricsTotalEarnings, value: formatMoney(totalEarnings), icon: Award, color: 'text-brand-gold' },
          { label: t.metricsPending, value: formatMoney(pendingPayout), icon: Wallet, color: 'text-emerald-400' },
          { label: t.metricsReferrals, value: totalReferrals, icon: Users, color: 'text-blue-400' },
          { label: t.metricsActive, value: activeSubscribers, icon: TrendingUp, color: 'text-purple-400' },
        ].map((metric, i) => (
          <div key={i} className="bg-brand-surface border border-brand-border p-6 rounded-2xl flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-brand-navy border border-brand-border ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-brand-textMuted uppercase tracking-wider">{metric.label}</p>
            </div>
            <p className="text-2xl font-black text-brand-textMain mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left 2 cols */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-brand-textMain">{t.recentActivity}</h2>
              <button className="text-xs text-brand-gold hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-border text-brand-textMuted">
                    <th className="pb-3 font-semibold">{t.tableCompany}</th>
                    <th className="pb-3 font-semibold">{t.tableDate}</th>
                    <th className="pb-3 font-semibold">{t.tablePlan}</th>
                    <th className="pb-3 font-semibold text-right">{t.tableCommission}</th>
                    <th className="pb-3 font-semibold text-center">{t.tableStatus}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-brand-textMain">
                  {recentReferrals.map(ref => (
                    <tr key={ref.id} className="hover:bg-brand-navy/30 transition-colors">
                      <td className="py-4 font-medium">{ref.company}</td>
                      <td className="py-4 text-brand-textMuted text-xs">{ref.date}</td>
                      <td className="py-4 text-xs">{ref.plan}</td>
                      <td className="py-4 text-right font-bold text-brand-gold">{formatMoney(ref.commission)}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          ref.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            : 'bg-brand-border/30 text-brand-textMuted border border-brand-border'
                        }`}>
                          {ref.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar - Right 1 col */}
        <div className="space-y-6">
          {/* Withdrawal Card */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
            <h3 className="text-sm font-bold text-brand-textMuted uppercase tracking-wider mb-4">{t.requestPayout}</h3>
            <p className="text-3xl font-black text-brand-textMain mb-1">{formatMoney(pendingPayout)}</p>
            <p className="text-xs text-brand-textMuted mb-6">{t.payoutDesc}</p>
            
            <button 
              onClick={() => setPayoutRequested(true)}
              disabled={payoutRequested || pendingPayout < 1000000}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                payoutRequested 
                  ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed'
                  : 'bg-brand-gold text-slate-900 hover:bg-yellow-500 shadow-gold-sm'
              }`}
            >
              {payoutRequested ? <CheckCircle2 className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
              {payoutRequested ? (language === 'id' ? 'Permintaan Diproses' : 'Request Processing') : t.requestPayout}
            </button>
          </div>

          {/* Commission Structure */}
          <div className="bg-brand-navy border border-brand-border rounded-2xl p-6">
            <h3 className="text-sm font-bold text-brand-textMuted uppercase tracking-wider mb-4">{t.commissionStructure}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 p-1 bg-brand-gold/10 rounded text-brand-gold">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-textMain">20% Recurring Commission</p>
                  <p className="text-xs text-brand-textMuted leading-relaxed">Dapatkan 20% dari setiap pembayaran bulanan/tahunan pelanggan SaaS yang Anda referensikan, seumur hidup.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 p-1 bg-brand-gold/10 rounded text-brand-gold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-textMain">Rp 3.000.000 Bonus X-Ray</p>
                  <p className="text-xs text-brand-textMuted leading-relaxed">Bonus instan untuk setiap klien yang mengambil paket konsultasi Business X-Ray™ Sprint.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
