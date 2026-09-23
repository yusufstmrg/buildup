import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Search, FileText, BarChart, Rocket, Building2 } from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';
import { useCms } from '../context/CmsContext';
import * as Switch from '@radix-ui/react-switch';
import { EditableText } from '../components/admin/EditableText';

export function PricingSection() {
  const { setIsHealthCheckModalOpen, formatMoney } = useBuildUp();
  const { state } = useCms();
  const navigate = useNavigate();

  const [isAnnual, setIsAnnual] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getSaaSPrice = (monthlyIdr: number) => {
    if (monthlyIdr === 0) return "Custom Pricing";
    const actualPrice = isAnnual ? monthlyIdr * 0.8 : monthlyIdr;
    return formatMoney(actualPrice);
  };

  const { saasPlans, diagnosticProducts } = state;

  return (
    <section id="pricing" className="py-24 bg-brand-deep">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-32">
        
        {/* SEGMENT 1: JALUR TRANSFORMASI */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-brand-gold tracking-widest uppercase mb-3">Jalur Transformasi BuildUp</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-brand-textMain tracking-tight">
              Dari Insight ke Impact
            </h3>
            <p className="mt-4 text-base text-brand-textMuted max-w-2xl mx-auto">
              Mulai dari diagnosa gratis hingga transformasi skala besar, BuildUp mendampingi setiap tahap pertumbuhan bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-[60px] left-10 right-10 h-0.5 bg-brand-border z-0"></div>

            {[
              { step: 1, title: 'DISCOVER', name: 'Health Snapshot™', desc: 'Diagnosa awal bisnis secara gratis', price: 'Gratis', icon: <Search className="w-6 h-6 text-brand-gold" /> },
              { step: 2, title: 'DIAGNOSE', name: 'Business Health Check™', desc: 'Analisa lebih mendalam dengan AI', price: 'Rp 749.000 / sekali', icon: <FileText className="w-6 h-6 text-brand-gold" /> },
              { step: 3, title: 'DEEP DIVE', name: 'Business X-Ray™', desc: 'Analisa komprehensif dan value quantification', price: 'Mulai Rp 7.500.000', icon: <BarChart className="w-6 h-6 text-brand-gold" /> },
              { step: 4, title: 'TRANSFORM', name: 'BuildUp Platform', desc: 'Implementasi & otomatisasi dengan AI', price: 'Mulai Rp 299.000/bln', icon: <Rocket className="w-6 h-6 text-brand-gold" /> },
              { step: 5, title: 'SCALE', name: 'Enterprise', desc: 'Solusi custom untuk grup & korporasi', price: 'Hubungi Kami', icon: <Building2 className="w-6 h-6 text-brand-gold" /> }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center bg-brand-navy border border-brand-border rounded-2xl p-6 hover:border-brand-gold/50 transition-all group">
                <div className="w-6 h-6 rounded-full bg-brand-gold text-slate-900 text-xs font-bold flex items-center justify-center mb-4 absolute -top-3">
                  {item.step}
                </div>
                <div className="text-[10px] font-bold text-brand-textMuted tracking-wider mb-2">{item.title}</div>
                <div className="w-12 h-12 rounded-xl bg-brand-card flex items-center justify-center border border-brand-border mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-brand-textMain mb-2">{item.name}</h4>
                <p className="text-[11px] text-brand-textMuted leading-relaxed mb-4 flex-1">{item.desc}</p>
                <div className="w-full py-2 bg-brand-card rounded-lg text-xs font-semibold text-brand-gold border border-brand-gold/20">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* SEGMENT 2: PAKET LANGGANAN SAAS */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-brand-gold tracking-widest uppercase mb-3">Paket Langganan BuildUp</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-brand-textMain tracking-tight">
              Pilih Paket yang Sesuai dengan Kebutuhan Anda
            </h3>
            <p className="mt-4 text-sm text-brand-textMuted max-w-2xl mx-auto">
              Solusi fleksibel untuk setiap tahap pertumbuhan bisnis. Harga transparan, fitur jelas, nilai nyata.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-3 text-sm font-bold bg-brand-surface p-2 rounded-2xl border border-brand-border">
                <span className={"px-4 py-2 rounded-xl transition-colors " + (!isAnnual ? "bg-brand-navy text-brand-textMain shadow-sm" : "text-brand-textMuted cursor-pointer")} onClick={() => setIsAnnual(false)}>Bulanan</span>
                <Switch.Root
                  className="w-[42px] h-[25px] bg-brand-navy rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-brand-gold outline-none cursor-default"
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                >
                  <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                </Switch.Root>
                <span className={"px-4 py-2 rounded-xl transition-colors flex items-center gap-2 " + (isAnnual ? "bg-brand-navy text-brand-textMain shadow-sm" : "text-brand-textMuted cursor-pointer")} onClick={() => setIsAnnual(true)}>
                  Tahunan <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Hemat 20%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 items-end">
            {saasPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative flex flex-col bg-brand-navy rounded-2xl border transition-all ${
                  plan.isPopular 
                    ? 'border-brand-gold shadow-[0_0_30px_rgba(212,175,55,0.15)] md:-translate-y-4' 
                    : 'border-brand-border hover:border-brand-gold/50'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-slate-900 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">
                    Paling Populer
                  </div>
                )}
                <div className="p-6 md:p-5 lg:p-6 border-b border-brand-border/50">
                  <h4 className="text-xl font-bold text-brand-textMain">{plan.name}</h4>
                  <p className="text-xs text-brand-textMuted mt-2 h-8">{plan.targetAudience}</p>
                  <div className="mt-4 mb-2">
                    {plan.priceIdrMonthly === 0 ? (
                      <span className="text-2xl font-black text-brand-textMain">Custom Pricing</span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl lg:text-3xl font-black text-brand-textMain tracking-tight">
                          {getSaaSPrice(plan.priceIdrMonthly)}
                        </span>
                        <span className="text-xs text-brand-textMuted">/ bulan</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6 md:p-5 lg:p-6 flex-1 flex flex-col bg-brand-card/30 rounded-b-2xl">
                  <ul className="space-y-4 flex-1 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-textMuted leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => {
                      if (plan.id === 'enterprise' || plan.id === 'scale') {
                        navigate('/contact');
                      } else {
                        setIsHealthCheckModalOpen(true);
                      }
                    }}
                    className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      plan.isPopular 
                        ? 'bg-brand-gold text-slate-900 hover:opacity-90 shadow-gold-sm' 
                        : 'bg-brand-surface border border-brand-border text-brand-textMain hover:bg-brand-navy hover:border-brand-gold/50'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* SEGMENT 3: DIAGNOSTIC PRODUCTS */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {diagnosticProducts.map((prod) => (
            <div key={prod.id} className="bg-brand-navy border border-brand-border hover:border-brand-gold/30 transition-all rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-textMain text-[10px] font-bold uppercase tracking-wider">
                  <Search className="w-3 h-3 text-brand-gold" /> DIAGNOSTIC PRODUCT
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-textMain">{prod.name}</h3>
                <p className="text-sm text-brand-textMuted leading-relaxed max-w-xl">
                  {prod.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {prod.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-xs text-brand-textMain font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-72 shrink-0 bg-brand-card rounded-2xl p-6 text-center border border-brand-border flex flex-col justify-center items-center">
                <div className="text-brand-textMuted text-xs font-semibold mb-2">Investasi Satu Kali</div>
                <div className="text-2xl font-black text-brand-gold mb-6">{prod.priceText}</div>
                <button 
                  onClick={() => prod.id === 'health-check' ? setIsHealthCheckModalOpen(true) : navigate('/contact')}
                  className="w-full bg-brand-gold hover:opacity-90 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all shadow-gold-sm text-sm"
                >
                  {prod.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
