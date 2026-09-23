import React, { useState, useEffect } from 'react';
import { useBuildUp } from '../../context/BuildUpContext';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Building2, 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  Loader2,
  Lock
} from 'lucide-react';
import { BuildUpLogo } from '../BuildUpLogo';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

type PaymentMethod = 'qris' | 'va' | 'cc' | 'ewallet' | null;

export function CheckoutModal() {
  const { isCheckoutModalOpen, closeCheckout, checkoutItem, processPaymentSuccess, formatMoney } = useBuildUp();
  const [step, setStep] = useState<'summary' | 'payment_method' | 'processing' | 'success'>('summary');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const navigate = useNavigate();

  // Reset state when modal opens
  useEffect(() => {
    if (isCheckoutModalOpen) {
      setStep('summary');
      setSelectedMethod(null);
    }
  }, [isCheckoutModalOpen]);

  if (!isCheckoutModalOpen || !checkoutItem) return null;

  // Calculate prices
  const basePrice = checkoutItem.price;
  const isAnnual = checkoutItem.isAnnual;
  const multiplier = isAnnual ? 12 : 1;
  const totalPrice = basePrice * multiplier; 
  // VAT excluded as per instruction (PT. Perorangan / Non-PKP)

  const handlePay = () => {
    if (!selectedMethod) return;
    setStep('processing');
    
    // Simulate API call & payment processing
    setTimeout(() => {
      setStep('success');
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#10B981', '#1E3550']
      });

      // Update state in background
      let newPlanId: any = checkoutItem.id;
      if (checkoutItem.type === 'diagnostic') {
        newPlanId = 'health-check';
      }
      processPaymentSuccess(newPlanId, checkoutItem.name);
    }, 2500);
  };

  const handleFinish = () => {
    closeCheckout();
    // Jika diagnostic, kita bisa redirect ke halaman laporan/dashboard
    if (checkoutItem.type === 'diagnostic') {
       // Opsional: buka HealthCheckModal yg sudah ter-unlock
       // Tapi user sudah ada di dashboard
       navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-brand-deep/80 backdrop-blur-sm">
      <div 
        className="absolute inset-0"
        onClick={() => step !== 'processing' && closeCheckout()}
      />
      
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header - Midtrans/Xendit Style */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-brand-gold font-black text-sm">B</span>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Merchant</div>
              <div className="text-sm font-bold text-gray-900">BuildUp Technologies</div>
            </div>
          </div>
          {step !== 'processing' && step !== 'success' && (
            <button 
              onClick={closeCheckout}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {step === 'summary' && (
            <div className="space-y-6">
              <div className="text-center space-y-1 pb-6 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-500">Total Tagihan</div>
                <div className="text-3xl font-black text-gray-900">{formatMoney(totalPrice)}</div>
                <div className="text-xs text-gray-400 flex items-center justify-center gap-1 mt-2">
                  <Lock className="w-3 h-3" /> Transaksi Aman & Terenkripsi
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-bold text-gray-900">Detail Pesanan</div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{checkoutItem.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {checkoutItem.type === 'saas' 
                          ? `Paket Langganan ${isAnnual ? 'Tahunan (Diskon 20%)' : 'Bulanan'}` 
                          : 'One-time Payment'}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{formatMoney(totalPrice)}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('payment_method')}
                className="w-full bg-brand-navy hover:bg-brand-deep text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-6"
              >
                Pilih Metode Pembayaran
              </button>
            </div>
          )}

          {step === 'payment_method' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold text-gray-900">Metode Pembayaran</div>
                <div className="text-sm font-black text-brand-navy">{formatMoney(totalPrice)}</div>
              </div>

              <div className="space-y-3">
                {/* VA */}
                <button 
                  onClick={() => setSelectedMethod('va')}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${selectedMethod === 'va' ? 'border-brand-navy bg-brand-navy/5' : 'border-gray-100 hover:border-brand-navy/30'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedMethod === 'va' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-brand-navy/10 group-hover:text-brand-navy'}`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${selectedMethod === 'va' ? 'text-brand-navy' : 'text-gray-900'}`}>Virtual Account Bank</div>
                      <div className="text-xs text-gray-500">BCA, Mandiri, BNI, BRI</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${selectedMethod === 'va' ? 'text-brand-navy' : 'text-gray-300'}`} />
                </button>

                {/* QRIS */}
                <button 
                  onClick={() => setSelectedMethod('qris')}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${selectedMethod === 'qris' ? 'border-brand-navy bg-brand-navy/5' : 'border-gray-100 hover:border-brand-navy/30'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedMethod === 'qris' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-brand-navy/10 group-hover:text-brand-navy'}`}>
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${selectedMethod === 'qris' ? 'text-brand-navy' : 'text-gray-900'}`}>QRIS</div>
                      <div className="text-xs text-gray-500">Scan dari aplikasi e-Wallet / M-Banking</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${selectedMethod === 'qris' ? 'text-brand-navy' : 'text-gray-300'}`} />
                </button>

                {/* Credit Card */}
                <button 
                  onClick={() => setSelectedMethod('cc')}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${selectedMethod === 'cc' ? 'border-brand-navy bg-brand-navy/5' : 'border-gray-100 hover:border-brand-navy/30'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedMethod === 'cc' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-brand-navy/10 group-hover:text-brand-navy'}`}>
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${selectedMethod === 'cc' ? 'text-brand-navy' : 'text-gray-900'}`}>Kartu Kredit / Debit</div>
                      <div className="text-xs text-gray-500">Visa, Mastercard, JCB</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${selectedMethod === 'cc' ? 'text-brand-navy' : 'text-gray-300'}`} />
                </button>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => setStep('summary')}
                  className="px-4 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={handlePay}
                  disabled={!selectedMethod}
                  className="flex-1 bg-brand-navy hover:bg-brand-deep disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md"
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-12 h-12 text-brand-navy animate-spin" />
              <div>
                <div className="text-lg font-bold text-gray-900 mb-1">Memproses Pembayaran...</div>
                <div className="text-sm text-gray-500">Mohon jangan tutup halaman ini.</div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20" />
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              
              <div>
                <div className="text-2xl font-black text-gray-900 mb-2">Pembayaran Berhasil!</div>
                <div className="text-sm text-gray-500">
                  Terima kasih, pembayaran untuk <span className="font-bold text-gray-900">{checkoutItem.name}</span> telah kami terima.
                </div>
              </div>

              <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Nomor Referensi</span>
                  <span className="font-mono font-bold text-gray-900">INV-BU-{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Waktu Pembayaran</span>
                  <span className="font-bold text-gray-900">{new Date().toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-500">Total</span>
                  <span className="font-bold text-gray-900">{formatMoney(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-brand-gold hover:opacity-90 text-brand-deep font-bold py-3.5 px-4 rounded-xl transition-all shadow-gold-sm"
              >
                Lanjutkan ke Dashboard
              </button>
            </div>
          )}

        </div>
        
        {/* Footer */}
        {step !== 'processing' && step !== 'success' && (
          <div className="bg-gray-50 p-4 flex items-center justify-center gap-2 border-t border-gray-100">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Secured by BuildUp Payment</span>
          </div>
        )}
      </div>
    </div>
  );
}
