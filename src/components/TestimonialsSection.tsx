import React from 'react';
import { Award, Quote, TrendingUp, Building2, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    metric: '18% Margin Expansion',
    quote: 'BuildUp essentially gave us a digital nervous system. Within one quarter, their AI Controller identified duplicate vendor payments and optimized our working capital in ways our traditional ERP completely missed.',
    author: 'Hendrik T.',
    role: 'Chief Financial Officer',
    company: 'Nexus Manufacturing Group'
  },
  {
    id: '2',
    metric: '$2.4M Recovered',
    quote: 'The real value isn\'t just the dashboard—it\'s the autonomous agents. The AI Procurement role renegotiated three of our major supplier contracts before I even had my morning coffee. Truly next-generation.',
    author: 'Sarah L.',
    role: 'VP of Operations',
    company: 'Global Retail Logistics'
  },
  {
    id: '3',
    metric: 'Zero-Day Compliance',
    quote: 'As a multi-entity holding company, audit season was a nightmare. BuildUp\'s continuous sampling and automated reconciliation turned a 3-month grueling process into a seamless, real-time dashboard.',
    author: 'Michael R.',
    role: 'Head of Audit & Risk',
    company: 'Vertex Capital Holdings'
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-brand-deep border-t border-brand-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy border border-brand-gold/30 text-xs font-bold text-brand-gold">
            <Award className="w-3.5 h-3.5" />
            <span>SOVEREIGN ENTERPRISE PROOF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-textMain tracking-tight block">
            Trusted by Leaders Orchestrating Billions in Volume
          </h2>
          <p className="text-sm sm:text-base text-brand-textMuted leading-relaxed block">
            Proven bottom-line impact measured across manufacturing, retail distribution, logistics, and multi-entity holdings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-brand-card hover:bg-brand-surface border border-brand-border hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between shadow-lg group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-brand-gold/30 group-hover:text-brand-gold transition-colors" />
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {item.metric}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-brand-textMain leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-navy border border-brand-gold/30 flex items-center justify-center font-black text-sm text-brand-gold flex-shrink-0">
                  {item.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-textMain">{item.author}</h4>
                  <p className="text-[11px] text-brand-textMuted">{item.role}</p>
                  <p className="text-[10px] text-brand-gold font-medium mt-0.5">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
