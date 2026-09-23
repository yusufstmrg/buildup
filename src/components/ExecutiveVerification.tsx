import React, { useState } from 'react';
import { CheckCircle2, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { auth } from '../firebaseConfig';
import { signInWithPopup, OAuthProvider, GoogleAuthProvider } from 'firebase/auth';

interface ExecutiveVerificationProps {
  onVerified?: (method: 'linkedin' | 'email') => void;
  className?: string;
}

export function ExecutiveVerification({ onVerified, className = "" }: ExecutiveVerificationProps) {
  const [method, setMethod] = useState<'linkedin' | 'email' | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedMethod, setVerifiedMethod] = useState<'linkedin' | 'email' | null>(null);

  const handleVerifyLinkedIn = async () => {
    if (isVerified) return;
    setMethod('linkedin');
    setIsVerifying(true);
    
    try {
      const provider = new OAuthProvider('linkedin.com');
      provider.addScope('r_liteprofile');
      provider.addScope('r_emailaddress');
      
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        setIsVerified(true);
        setVerifiedMethod('linkedin');
        onVerified?.('linkedin');
      }
    } catch (error: any) {
      console.error(error);
      alert('Gagal autentikasi LinkedIn: ' + error.message + '\n\nPastikan Anda sudah mengaktifkan LinkedIn Provider di Firebase Console > Authentication > Sign-in Method (Membutuhkan Client ID & Secret dari LinkedIn Developer Portal).');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (isVerified) return;
    setMethod('email');
    setIsVerifying(true);
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        setIsVerified(true);
        setVerifiedMethod('email');
        onVerified?.('email');
      }
    } catch (error: any) {
      console.error(error);
      alert('Gagal autentikasi Google: ' + error.message + '\n\nPastikan Anda sudah mengaktifkan Google Provider di Firebase Console > Authentication > Sign-in Method.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={`rounded-xl border ${isVerified ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-brand-surface/30 border-brand-border/60'} p-4 relative overflow-hidden transition-all ${className}`}>
      {isVerified && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
      )}
      
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isVerified ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-navy border border-brand-border text-brand-gold'}`}>
          {isVerified ? <CheckCircle2 className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-bold text-brand-textMain flex items-center gap-2">
            {isVerified ? 'Identitas Terverifikasi' : 'Verifikasi Eksekutif'}
            {isVerified && (
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-sm font-mono uppercase tracking-wider">
                {verifiedMethod === 'linkedin' ? 'via LinkedIn' : 'via SSO'}
              </span>
            )}
          </h4>
          
          <p className="text-[11px] text-brand-textMuted mt-1 leading-relaxed max-w-xs">
            {isVerified 
              ? 'Akses eksklusif Anda telah diotorisasi. Anda sekarang dapat melanjutkan ke platform.'
              : 'Untuk alasan keamanan dan kerahasiaan data korporasi, mohon verifikasi identitas Anda menggunakan LinkedIn atau Email Korporat (SSO/GoogleWorkspace).'
            }
          </p>

          {!isVerified && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleVerifyLinkedIn}
                disabled={isVerifying}
                className={"flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all " + (method === 'linkedin' ? "bg-[#0A66C2] text-white border-transparent" : "bg-brand-surface text-brand-textMain hover:bg-brand-deep border-brand-border hover:border-brand-gold")}
              >
                {method === 'linkedin' && isVerifying ? <div className="w-4 h-4 border-2 border-brand-deep border-t-transparent rounded-full animate-spin" /> : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                {method === 'linkedin' && isVerifying ? 'Verifying...' : 'LinkedIn'}
              </button>
              
              <button
                type="button"
                onClick={handleVerifyEmail}
                disabled={isVerifying}
                className={"flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all " + (method === 'email' ? "bg-emerald-600 text-white border-transparent" : "bg-brand-surface text-brand-textMain hover:bg-brand-deep border-brand-border hover:border-brand-gold")}
              >
                {method === 'email' && isVerifying ? <div className="w-4 h-4 border-2 border-brand-deep border-t-transparent rounded-full animate-spin" /> : <Mail className="w-4 h-4" />}
                {method === 'email' && isVerifying ? 'Verifying...' : 'Corporate Email'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
