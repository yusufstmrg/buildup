import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';
import { useCms } from '../context/CmsContext';
import * as Accordion from '@radix-ui/react-accordion';
import * as Switch from '@radix-ui/react-switch';
import { EditableText } from '../components/admin/EditableText';

export function PricingSection() {
  const { 
    setIsHealthCheckModalOpen, 
    currency, 
    setCurrency, 
    formatMoney
  } = useBuildUp();
  const { state } = useCms();

  const [isAnnual, setIsAnnual] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPriceIdr = (monthlyIdr: number) => {
    return isAnnual ? monthlyIdr * 0.8 : monthlyIdr;
  };
  
  const getBilledYearlyIdr = (monthlyIdr: number) => {
    return monthlyIdr * 12;
  };

  const getPriceUsd = (monthlyUsd: number) => {
    return isAnnual ? monthlyUsd * 0.8 : monthlyUsd;
  };
  
  const getBilledYearlyUsd = (monthlyUsd: number) => {
    return monthlyUsd * 12;
  };

  const formatPrice = (value: number) => {
    if (value === 0) return "Free";
    if (value >= 1000000000) {
      return "Rp " + (value / 1000000000).toFixed(2).replace(".", ",") + " Miliar";
    }
    if (value >= 1000000) {
      return "Rp " + (value / 1000000) + " Juta";
    }
    return formatMoney(value);
  };

  const faqs = state.faqs;
  const packages = state.pricing;

  return (
    <section id="pricing" className="py-24 bg-brand-deep">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-brand-textMain tracking-tight">
            <EditableText id="pricing.title" default="Transparent, Outcome-Led Pricing" />
          </h1>
          <p className="mt-4 text-base text-brand-textMuted">
            <EditableText id="pricing.subtitle" default="Select the engagement model that fits your scale." className="block" />
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-3 text-sm font-bold bg-brand-surface p-2 rounded-2xl border border-brand-border">
              <span className={"px-4 py-2 rounded-xl transition-colors " + (!isAnnual ? "bg-brand-navy text-brand-textMain shadow-sm" : "text-brand-textMuted cursor-pointer")} onClick={() => setIsAnnual(false)}>Monthly</span>
              <Switch.Root
                className="w-[42px] h-[25px] bg-brand-navy rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-brand-gold outline-none cursor-default"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
              <span className={"px-4 py-2 rounded-xl transition-colors flex items-center gap-2 " + (isAnnual ? "bg-brand-navy text-brand-textMain shadow-sm" : "text-brand-textMuted cursor-pointer")} onClick={() => setIsAnnual(true)}>
                Yearly
                <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">SAVE 20%</span>
              </span>
            </div>
            
            <div className="inline-flex items-center p-1 rounded-xl bg-brand-navy border border-brand-border mt-2">
              <button
                onClick={() => setCurrency("IDR")}
                className={"px-3 py-1 rounded-lg text-xs font-bold transition-all " + (
                  currency === "IDR"
                    ? "bg-brand-gold text-brand-deep"
                    : "text-brand-textMuted hover:text-brand-textMain"
                )}
              >
                IDR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={"px-3 py-1 rounded-lg text-xs font-bold transition-all " + (
                  currency === "USD"
                    ? "bg-brand-gold text-brand-deep"
                    : "text-brand-textMuted hover:text-brand-textMain"
                )}
              >
                USD
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(packages || []).map((pkg) => (
            <div
              key={pkg.id}
              className={"relative bg-brand-surface border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 " + (pkg.isPopular ? "border-brand-gold border-2 shadow-[0_0_30px_rgba(234,179,8,0.1)] scale-[1.02] z-10" : "border-brand-border hover:border-brand-gold/40")}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-deep font-black text-[10px] uppercase tracking-wider py-1 px-4 rounded-full">
                  PALING BANYAK DIPILIH
                </div>
              )}

              <div>
                <p className="text-[10px] font-bold text-brand-textMuted uppercase tracking-wider mb-2">{pkg.label}</p>
                <h3 className="text-xl font-black text-brand-textMain mb-4">{pkg.name}</h3>
                
                <div className="mb-6">
                  {pkg.priceIdr === 0 ? (
                    <div className="text-4xl font-black text-brand-textMain">Waived</div>
                  ) : (
                    <>
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-black text-brand-textMain">
                          {currency === "IDR" ? formatPrice(getPriceIdr(pkg.priceIdr)) : "$" + getPriceUsd(pkg.priceUsd)}
                        </span>
                        <span className="text-sm text-brand-textMuted mb-1 font-medium">/ month</span>
                      </div>
                      {isAnnual && (
                        <div className="text-xs font-bold text-emerald-500 mt-1">
                          Billed {currency === "IDR" ? formatPrice(getBilledYearlyIdr(pkg.priceIdr)) : "$" + getBilledYearlyUsd(pkg.priceUsd)} yearly
                        </div>
                      )}
                    </>
                  )}
                </div>
                <p className="text-sm text-brand-textMuted leading-relaxed border-b border-brand-border pb-6 mb-6">
                  {pkg.description}
                </p>
              </div>

              <div>
                <ul className="space-y-4 text-sm text-brand-textMain mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => setIsHealthCheckModalOpen(true)}
                  className={"w-full py-3 px-6 rounded-xl font-bold text-sm tracking-wide transition-all " + (pkg.isPopular ? "bg-brand-gold text-brand-deep hover:bg-[#FACC15]" : "bg-brand-navy hover:bg-brand-card text-brand-textMain border border-brand-border hover:border-brand-textMuted")}
                >
                  {pkg.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Gain-Share Partnership Tier */}
        <div className="mt-8 relative bg-brand-surface border border-brand-border hover:border-brand-gold/40 rounded-2xl p-8 flex flex-col md:flex-row gap-8 transition-all duration-300">
           <div className="absolute -top-3 left-8 bg-brand-gold text-brand-deep font-black text-[10px] uppercase tracking-wider py-1 px-4 rounded-full">
              OUTCOME-BASED PRICING
           </div>
           
           <div className="md:w-1/3 flex flex-col justify-center">
             <h3 className="text-2xl font-black text-brand-textMain mb-4">Gain-Share Partnership</h3>
             <div className="text-3xl font-black text-brand-gold mb-4">Custom + 10% Fee</div>
             <p className="text-sm text-brand-textMuted leading-relaxed">
               We align with your success. A fixed implementation fee plus a percentage of verified cost savings and cash flow unlocked.
             </p>
           </div>
           
           <div className="hidden md:block w-px bg-brand-border"></div>
           
           <div className="md:w-2/3 flex flex-col justify-between">
             <ul className="space-y-4 text-sm text-brand-textMain mb-8 grid sm:grid-cols-2 gap-x-4 gap-y-2">
               {[
                 "Fixed Base Price + 10% Fee on Recovered Value",
                 "Full Platform & Native Core Access",
                 "Focus on Procurement & DSO Recovery",
                 "Certified by 3rd-party auditors",
                 "True alignment with business owners"
               ].map((feature, idx) => (
                 <li key={idx} className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                   <span className="font-medium">{feature}</span>
                 </li>
               ))}
             </ul>
             
             <div className="flex justify-start">
               <button
                  onClick={() => setIsHealthCheckModalOpen(true)}
                  className="py-3 px-8 rounded-xl font-bold text-sm tracking-wide transition-all bg-brand-gold text-brand-deep hover:bg-[#FACC15]"
                >
                  Apply for Partnership
               </button>
             </div>
           </div>
        </div>

        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-brand-textMain tracking-tight"><EditableText id="pricing.faq.title" default="Frequently Asked Questions" /></h2>
          </div>
          
          <Accordion.Root type="single" collapsible className="space-y-4">
            {(faqs || []).map((faq, i) => (
              <Accordion.Item key={i} value={"faq-" + i} className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-gold/50">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-navy/50 transition-colors group">
                    <span className="font-bold text-brand-textMain text-base pr-8">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-brand-textMuted group-data-[state=open]:rotate-180 transition-transform duration-300 ease-in-out shrink-0" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 pb-6 text-brand-textMuted text-sm leading-relaxed data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  {faq.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}



