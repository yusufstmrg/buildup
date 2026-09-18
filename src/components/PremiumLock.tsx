import React from 'react';
import { Lock, Crown } from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';

export function PremiumLock({ children, featureName, requiredPlan = 'Score Pro' }: { children: React.ReactNode, featureName: string, requiredPlan?: string }) {
  const { currentPlan } = useBuildUp();
  
  // Basic check for demo
  const isPremium = currentPlan === 'Enterprise' || currentPlan === 'Transformation Retainer' || currentPlan === 'Score Pro';
  
  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full rounded-2xl border border-brand-border bg-brand-surface/30 overflow-hidden group">
      {/* Blurred / Hidden Content */}
      <div className="opacity-20 blur-sm pointer-events-none p-4">
        {children}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-brand-navy/60 backdrop-blur-md transition-all">
        <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4 border border-brand-gold/40 shadow-gold-sm group-hover:scale-110 transition-transform">
          <Lock className="w-6 h-6 text-brand-gold" />
        </div>
        <h3 className="text-lg font-bold text-brand-textMain mb-2">{featureName} Dikunci</h3>
        <p className="text-xs text-brand-textMuted max-w-sm mb-6">
          Fitur analitik cerdas ini hanya tersedia untuk pengguna paket <span className="text-brand-gold font-semibold">{requiredPlan}</span> ke atas.
        </p>
        <button 
          onClick={() => window.location.href = '/pricing'} 
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-500 text-slate-950 text-xs font-black shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Crown className="w-4 h-4" />
          <span>Upgrade Paket Anda</span>
        </button>
      </div>
    </div>
  );
}
