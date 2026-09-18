import React from 'react';
import { Check, X, Sparkles, Minus } from 'lucide-react';
import { EditableText } from './admin/EditableText';

export function ComparisonSection() {
  const features = [
    {
      dimension: 'Waktu Mendapatkan Nilai (Time to Value)',
      buildup: 'Instant / < 48 Jam (Koneksi API)',
      big4: '3 - 6 Bulan (Wawancara Manual)',
      erp: '12 - 24 Bulan (Implementasi Lambat)',
      pointSaaS: '1 - 2 Minggu (Data Fragmented)'
    },
    {
      dimension: 'Diagnosis Kebocoran Kas (EBITDA Leakage)',
      buildup: '8 Dimensi Real-Time Otomatis',
      big4: 'Manual Audit Statis (Slide Deck)',
      erp: 'Hanya Laporan Buku Pasif',
      pointSaaS: 'Parsial (Hanya 1 Departemen)'
    },
    {
      dimension: 'Eksekusi Mandiri 24/7 (AI Workforce)',
      buildup: '12 Agen Eksekutif C-Level',
      big4: 'Perlu Junior Analyst Tambahan',
      erp: 'Tidak Ada (Harus Input Manual)',
      pointSaaS: 'Hanya Bot Notifikasi Biasa'
    },
    {
      dimension: 'Decision Engine Terverifikasi (Auditable)',
      buildup: 'Ya (Approval Chain & Bukti Audit)',
      big4: 'Opini Konsultan Non-Sistemik',
      erp: 'Approval Standar Tanpa AI',
      pointSaaS: 'Tidak Ada Governance Terpusat'
    },
    {
      dimension: 'Struktur Biaya',
      buildup: 'Biaya Terukur / Gain-Share ROI',
      big4: 'Rp 500 Juta - 3 Miliar per Proyek',
      erp: 'Capex Tinggi + Lisensi Tahunan',
      pointSaaS: 'Lisensi Per User Bertumpuk'
    }
  ];

  return (
    <section id="comparison" className="py-24 bg-brand-surface relative overflow-hidden border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy border border-brand-gold/30 text-xs font-bold text-brand-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <EditableText id="comparisonBadge" default="UNMATCHED VALUE & SPEED" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-textMain tracking-tight block">
            <EditableText
              id="comparisonTitle"
              default="Why BuildUp Replaces Outdated Alternatives"
              className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg p-2 resize-none"
            />
          </h2>
          <p className="text-sm sm:text-base text-brand-textMuted leading-relaxed block">
            <EditableText
              id="comparisonSubtitle"
              default="Compare traditional Big 4 management consulting and generic fragmented tools with BuildUp's integrated continuous operating system."
              className="w-full bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-brand-gold rounded-lg p-2 resize-none block min-h-[60px]"
            />
          </p>
        </div>

        {/* COMPARISON TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-brand-border bg-brand-navy shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-brand-border bg-brand-deep/80 text-brand-textMain">
                <th className="p-4 sm:p-5 font-bold w-1/3">Kapabilitas Operasional</th>
                <th className="p-4 sm:p-5 font-black text-brand-gold bg-brand-gold/10 border-x border-brand-gold/20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                    BuildUp Autonomous OS
                  </div>
                </th>
                <th className="p-4 sm:p-5 font-semibold text-brand-textMuted">Konsultan Big 4 Tradisional</th>
                <th className="p-4 sm:p-5 font-semibold text-brand-textMuted">Legacy ERP (SAP/Oracle saja)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {features.map((item, idx) => (
                <tr key={idx} className="hover:bg-brand-surface/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-brand-textMain">
                    {item.dimension}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-brand-textMain bg-brand-gold/5 border-x border-brand-gold/20">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <span>{item.buildup}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-brand-textMuted">
                    <div className="flex items-center gap-2 text-brand-textMuted">
                      <Minus className="w-4 h-4 flex-shrink-0 text-amber-500/70" />
                      <span>{item.big4}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-brand-textMuted">
                    <div className="flex items-center gap-2 text-brand-textMuted">
                      <X className="w-4 h-4 flex-shrink-0 text-red-400/70" />
                      <span>{item.erp}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
