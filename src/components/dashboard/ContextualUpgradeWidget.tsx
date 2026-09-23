import React from 'react';
import { useBuildUp } from '../../context/BuildUpContext';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Zap, Lock, ArrowRight, BarChart2 } from 'lucide-react';

export function ContextualUpgradeWidget() {
  const { subscription, totalAnnualLeakageIdr, formatMoney, openCheckout } = useBuildUp();
  const navigate = useNavigate();

  // Hitung persentase pemakaian
  const getProgress = (used: number, limit: number) => {
    if (limit === 0) return 100; // Locked state
    return Math.min(100, Math.round((used / limit) * 100));
  };

  const getProgressColor = (used: number, limit: number) => {
    if (limit === 0) return 'bg-slate-700'; // Locked
    const percentage = (used / limit) * 100;
    if (percentage >= 100) return 'bg-rose-500'; // Limit reached
    if (percentage >= 80) return 'bg-amber-500'; // Warning
    return 'bg-brand-gold'; // Normal
  };

  const isFreeTier = subscription.planId === 'snapshot';

  return (
    <div className="bg-brand-navy border border-brand-border rounded-2xl overflow-hidden flex flex-col h-full shadow-lg">
      <div className="p-5 border-b border-brand-border bg-gradient-to-r from-brand-surface to-transparent">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-bold tracking-wider text-brand-textMuted uppercase mb-1">Paket Saat Ini</div>
            <div className="text-lg font-black text-brand-textMain flex items-center gap-2">
              {subscription.planName}
              {isFreeTier && (
                <span className="bg-rose-500/10 text-rose-400 text-[10px] px-2 py-0.5 rounded-full border border-rose-500/20">
                  Aksi Diperlukan
                </span>
              )}
            </div>
          </div>
          <ShieldAlert className={`w-8 h-8 ${isFreeTier ? 'text-rose-400/50' : 'text-emerald-400/50'}`} />
        </div>

        {isFreeTier && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 flex items-start gap-3 mt-4">
            <Zap className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-rose-400 mb-1">Potensi Kebocoran Nilai Terdeteksi</div>
              <div className="text-sm text-brand-textMain font-medium">
                {totalAnnualLeakageIdr > 0 ? (
                  <>Sekitar <span className="font-black text-rose-400">{formatMoney(totalAnnualLeakageIdr)} / tahun</span></>
                ) : (
                  "Diagnosa lebih lanjut diperlukan."
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 space-y-5">
        <div className="text-xs font-bold text-brand-textMuted uppercase mb-2">Batas Penggunaan</div>
        
        {Object.entries(subscription.metrics).map(([key, metric]) => {
          const isLocked = metric.limit === 0;
          const isMaxed = metric.used >= metric.limit && !isLocked;
          return (
            <div key={key} className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-brand-textMain flex items-center gap-1.5">
                  {isLocked && <Lock className="w-3 h-3 text-slate-500" />}
                  {metric.label}
                </span>
                <span className={isMaxed ? 'text-rose-400 font-bold' : isLocked ? 'text-slate-500' : 'text-brand-textMuted'}>
                  {isLocked ? 'Locked' : `${metric.used} / ${metric.limit}`}
                </span>
              </div>
              <div className="w-full h-1.5 bg-brand-surface rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(metric.used, metric.limit)}`}
                  style={{ width: `${getProgress(metric.used, metric.limit)}%` }}
                />
              </div>
              {isMaxed && (
                <div className="text-[10px] text-rose-400 mt-1">Batas telah tercapai. Upgrade untuk melanjutkan.</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-5 bg-brand-surface border-t border-brand-border">
        {isFreeTier ? (
          <div className="space-y-3">
            <div className="text-[10px] text-brand-textMuted">Rekomendasi Tindakan:</div>
            <button 
              onClick={() => openCheckout({
                id: 'health-check',
                name: 'Business Health Check™',
                price: 749000,
                type: 'diagnostic',
                isAnnual: false
              })}
              className="w-full bg-brand-gold hover:opacity-90 text-slate-900 font-bold py-2.5 px-4 rounded-xl transition-all shadow-gold-sm text-sm flex items-center justify-center gap-2"
            >
              <BarChart2 className="w-4 h-4" />
              Unlock Business Health Check™
            </button>
            <button 
              onClick={() => navigate('/#pricing')}
              className="w-full bg-brand-navy hover:bg-slate-800 text-brand-textMain border border-brand-border font-medium py-2 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2"
            >
              Lihat Paket SaaS
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/#pricing')}
            className="w-full bg-brand-gold hover:opacity-90 text-slate-900 font-bold py-2.5 px-4 rounded-xl transition-all shadow-gold-sm text-sm flex items-center justify-center gap-2"
          >
            Upgrade ke Paket Selanjutnya
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
