import React from "react";
import { Share2, ArrowRight, Gift, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBuildUp } from "../context/BuildUpContext";

export function AffiliateSection() {
  const navigate = useNavigate();
  const { language } = useBuildUp();

  const handleJoinClick = () => {
    navigate("/affiliate");
  };

  const t = {
    badge:
      language === "id" ? "KEMITRAAN & AFILIASI" : "PARTNERSHIP & AFFILIATE",
    title:
      language === "id"
        ? "Tumbuh Bersama BuildUp"
        : "Grow Together with BuildUp",
    desc:
      language === "id"
        ? "Dapatkan komisi seumur hidup dengan mereferensikan bisnis, klien, atau kolega Anda untuk menggunakan BuildUp OS. Proses transparan, pencairan cepat."
        : "Earn lifetime recurring commissions by referring businesses, clients, or colleagues to BuildUp OS. Transparent process, fast payouts.",
    recurringTitle:
      language === "id" ? "Komisi 20% Seumur Hidup" : "20% Lifetime Recurring",
    recurringDesc:
      language === "id"
        ? "Dapatkan 20% dari setiap pembayaran langganan SaaS dari perusahaan yang Anda referensikan, setiap bulan/tahun."
        : "Earn 20% from every SaaS subscription payment made by your referred company, every month/year.",
    bonusTitle: language === "id" ? "Bonus Rp 3.000.000" : "Rp 3,000,000 Bonus",
    bonusDesc:
      language === "id"
        ? "Bonus instan ketika referal Anda mengambil layanan konsultasi tingkat lanjut seperti Business X-Ray™ Sprint."
        : "Instant bonus when your referral takes advanced consulting services like Business X-Ray™ Sprint.",
    cta:
      language === "id"
        ? "Daftar Menjadi Mitra Sekarang"
        : "Join as Partner Now",
  };

  return (
    <section
      id="affiliate"
      className="py-24 bg-brand-deep relative overflow-hidden border-t border-brand-border"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Text Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-widest">
              <Share2 className="w-4 h-4" />
              {t.badge}
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-brand-textMain leading-tight">
              {t.title}
            </h2>

            <p className="text-lg text-brand-textMuted max-w-2xl mx-auto lg:mx-0">
              {t.desc}
            </p>

            <div className="pt-4 flex justify-center lg:justify-start">
              <button
                onClick={handleJoinClick}
                className="group flex items-center gap-3 bg-brand-gold text-slate-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-yellow-500 transition-all shadow-gold-lg hover:shadow-gold-xl hover:-translate-y-1"
              >
                {t.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none grid gap-6">
            <div className="bg-brand-surface border border-brand-border p-8 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-brand-gold/50 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp className="w-24 h-24 text-brand-gold" />
              </div>
              <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center border border-brand-gold/30 mb-6 relative z-10">
                <Gift className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-black text-brand-textMain mb-3 relative z-10">
                {t.recurringTitle}
              </h3>
              <p className="text-brand-textMuted leading-relaxed relative z-10">
                {t.recurringDesc}
              </p>
            </div>

            <div className="bg-brand-navy border border-brand-border p-8 rounded-3xl shadow-xl relative overflow-hidden group hover:border-brand-gold/50 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Award className="w-24 h-24 text-brand-gold" />
              </div>
              <div className="w-14 h-14 bg-brand-surface rounded-2xl flex items-center justify-center border border-brand-border mb-6 relative z-10">
                <Award className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-black text-brand-textMain mb-3 relative z-10">
                {t.bonusTitle}
              </h3>
              <p className="text-brand-textMuted leading-relaxed relative z-10">
                {t.bonusDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
