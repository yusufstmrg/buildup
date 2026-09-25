import React from 'react';
import { Lock, Crown } from 'lucide-react';
import { useBuildUp, UserSubscriptionInfo } from '../context/BuildUpContext';

interface PremiumLockProps {
  children: React.ReactNode;
  featureName: string;
  requiredPlan: UserSubscriptionInfo['planId'];
  requiredPlanName: string;
}

export function PremiumLock({ children, featureName, requiredPlan, requiredPlanName }: PremiumLockProps) {
  const { hasAccess } = useBuildUp();
  
  const isUnlocked = hasAccess(requiredPlan);
  
  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full rounded-2xl border border-brand-border bg-brand-surface/30 overflow-hidden group max-h-[70vh]">
      {/* Blurred / Hidden Content */}
      <div className="opacity-20 blur-sm pointer-events-none p-4 select-none h-full overflow-hidden">
        {children}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-32 sm:pt-48 px-6 pb-6 text-center bg-gradient-to-b from-brand-navy/90 via-brand-navy/80 to-brand-navy/95 backdrop-blur-md transition-all">
        <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4 border border-brand-gold/40 shadow-gold-sm group-hover:scale-110 transition-transform">
          <Lock className="w-6 h-6 text-brand-gold" />
        </div>
        <h3 className="text-xl font-bold text-brand-textMain mb-2">{featureName}</h3>
        <p className="text-sm text-brand-textMuted max-w-sm mb-8">
          Fitur analitik cerdas ini eksklusif untuk pengguna paket <span className="text-brand-gold font-semibold uppercase">{requiredPlanName}</span> ke atas.
        </p>
        <button 
          onClick={() => window.location.href = '/#pricing'} 
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-500 text-slate-950 text-sm font-black shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Crown className="w-4 h-4" />
          <span>Lihat Paket Berlangganan</span>
        </button>
      </div>
    </div>
  );
}
