import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export function ExecutiveVerification({ onVerified }: { onVerified: (method: string) => void }) {
  const [method, setMethod] = useState<'linkedin' | 'email' | 'none'>('none');
  const [verified, setVerified] = useState(false);

  const handleVerify = (selectedMethod: 'linkedin' | 'email') => {
    // In a real application, this would trigger an OAuth flow or email OTP
    setMethod(selectedMethod);
    setTimeout(() => {
      setVerified(true);
      onVerified(selectedMethod);
    }, 1500);
  };

  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-5 h-5 text-brand-gold" />
        <h4 className="text-sm font-bold text-brand-textMain">Executive Identity Verification</h4>
      </div>
      
      {!verified ? (
        <div className="space-y-3">
          <p className="text-xs text-brand-textMuted mb-4">
            To ensure secure and highly relevant executive briefings, please verify your C-Level/Director identity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleVerify('linkedin')}
              className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                method === 'linkedin' ? 'bg-brand-gold text-brand-deep border-brand-gold' : 'bg-brand-navy border-brand-border text-brand-textMain hover:border-brand-gold/50'
              }`}
            >
              {method === 'linkedin' ? <div className="w-4 h-4 border-2 border-brand-deep border-t-transparent rounded-full animate-spin" /> : null}
              Verify via LinkedIn
            </button>
            <button
              onClick={() => handleVerify('email')}
              className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                method === 'email' ? 'bg-brand-gold text-brand-deep border-brand-gold' : 'bg-brand-navy border-brand-border text-brand-textMain hover:border-brand-gold/50'
              }`}
            >
              {method === 'email' ? <div className="w-4 h-4 border-2 border-brand-deep border-t-transparent rounded-full animate-spin" /> : null}
              Corporate Email OTP
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
          <CheckCircle2 className="w-5 h-5" />
          <div className="text-xs">
            <span className="font-bold">Identity Verified</span>
            <span className="block text-emerald-500/80">Executive clearance granted.</span>
          </div>
        </div>
      )}
    </div>
  );
}
