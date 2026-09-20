import React, { useState } from 'react';
import { ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

interface ExecutiveVerificationProps {
  onVerified?: (method: 'linkedin' | 'email') => void;
}

export function ExecutiveVerification({ onVerified }: ExecutiveVerificationProps = {}) {
  const [method, setMethod] = useState<'linkedin' | 'email' | 'none'>('none');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedMethod, setVerifiedMethod] = useState<'linkedin' | 'email' | 'none'>('none');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleVerifyLinkedIn = () => {
    if (isVerified) return;
    setMethod('linkedin');
    setIsVerifying(true);
    
    // Simulate LinkedIn OAuth popup delay
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setVerifiedMethod('linkedin');
      onVerified?.('linkedin');
    }, 2500);
  };

  const handleSendOtp = () => {
    if (isVerified) return;
    setMethod('email');
    setIsVerifying(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsVerifying(false);
      setOtpSent(true);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otpCode.length < 6) return;
    setIsVerifying(true);
    
    // Simulate verifying code
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setVerifiedMethod('email');
      onVerified?.('email');
    }, 1500);
  };

  return (
    <div className="p-5 rounded-2xl bg-brand-deep/80 border border-brand-border backdrop-blur-md">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-brand-navy border border-brand-border flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-4 h-4 text-brand-gold" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-brand-textMain">Verifikasi Eksekutif C-Level</h4>
          <p className="text-[11px] text-brand-textMuted leading-relaxed">
            Untuk menjaga eksklusivitas, kami mewajibkan verifikasi profil bisnis.
          </p>
        </div>
      </div>

      {isVerified ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold block">Verifikasi Berhasil</span>
            <span>Profil Anda telah tervalidasi via {verifiedMethod === 'linkedin' ? 'LinkedIn' : 'Corporate Email'}.</span>
          </div>
        </div>
      ) : otpSent ? (
        <div className="flex flex-col gap-3 animate-fade-in">
          <p className="text-xs text-brand-textMuted">Masukkan 6-digit OTP yang dikirim ke email Anda (Gunakan 123456 untuk simulasi):</p>
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              placeholder="••••••" 
              className="flex-1 bg-brand-navy border border-brand-border px-4 py-2.5 rounded-xl text-center tracking-widest font-mono text-brand-textMain focus:outline-none focus:border-brand-gold" 
            />
            <button 
              type="button"
              onClick={handleVerifyOtp}
              disabled={isVerifying || otpCode.length < 6}
              className="px-6 py-2.5 bg-brand-gold text-brand-deep font-bold text-xs rounded-xl disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : 'Validasi'}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleVerifyLinkedIn}
            disabled={isVerifying}
            className={"flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all " + (method === 'linkedin' ? "bg-[#0A66C2] text-white border-transparent" : "bg-brand-surface text-brand-textMain hover:bg-brand-deep border-brand-border hover:border-brand-gold")}
          >
            {method === 'linkedin' && isVerifying ? <div className="w-4 h-4 border-2 border-brand-deep border-t-transparent rounded-full animate-spin" /> : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
            {method === 'linkedin' && isVerifying ? 'Membuka LinkedIn...' : 'LinkedIn'}
          </button>
          
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={isVerifying}
            className={"flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all " + (method === 'linkedin' ? "bg-[#0A66C2] text-white border-transparent" : "bg-brand-surface text-brand-textMain hover:bg-brand-deep border-brand-border hover:border-brand-gold")}
          >
            {method === 'email' && isVerifying ? <div className="w-4 h-4 border-2 border-brand-deep border-t-transparent rounded-full animate-spin" /> : <Mail className="w-4 h-4" />}
            {method === 'email' && isVerifying ? 'Sending OTP...' : 'Corporate Email'}
          </button>
        </div>
      )}
    </div>
  );
}



