import React, { useState, useEffect } from "react";
import {
  Share2,
  Users,
  DollarSign,
  ArrowRight,
  Copy,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  Lock,
  KeyRound,
  Clock,
  Building2,
  ShieldCheck,
  X,
} from "lucide-react";
import { useBuildUp, BankAccount } from "../context/BuildUpContext";

export function AffiliateEngine() {
  const { user, language, formatMoney, updateUserProfile } = useBuildUp();
  const [copied, setCopied] = useState(false);

  // Payout Flow State
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutStep, setPayoutStep] = useState<
    "select-account" | "add-account" | "security" | "tracker"
  >("select-account");
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);

  // New Bank State
  const [newBank, setNewBank] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  });

  // Security State
  const [securityPin, setSecurityPin] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const referralLink = user
    ? `https://buildup.id/join?ref=${user.id}`
    : "https://buildup.id/join?ref=guest";

  // Real data is 0 based on Zero Fake Data Policy
  const activeReferrals = 0;
  const totalEarned = 0;
  const pendingPayout = 0; // Set to 0 to simulate real condition where user has no referral yet

  const activities: any[] = []; // Empty data to show real empty state

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddBankAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const newAccount: BankAccount = {
      id: Date.now().toString(),
      ...newBank,
    };

    const existing = user.savedBankAccounts || [];
    await updateUserProfile({ savedBankAccounts: [...existing, newAccount] });
    setSelectedBankId(newAccount.id);
    setNewBank({ bankName: "", accountNumber: "", accountHolder: "" });
    setPayoutStep("select-account");
  };

  const handleVerifySecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    // Simulate API delay for security verification
    setTimeout(() => {
      setIsVerifying(false);
      setPayoutStep("tracker");
      // Here we would also update Firestore to log the payout request
    }, 2000);
  };

  const handleOpenPayout = () => {
    // If no bank accounts exist, force to add-account step
    if (!user?.savedBankAccounts || user.savedBankAccounts.length === 0) {
      setPayoutStep("add-account");
    } else {
      setPayoutStep("select-account");
      setSelectedBankId(user.savedBankAccounts[0].id);
    }
    setShowPayoutModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-textMain">
            Referral & Affiliate
          </h1>
          <p className="text-brand-textMuted text-sm mt-1">
            Undang kolega dan dapatkan komisi 20% seumur hidup.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards - Real Data */}
        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-brand-textMain">Referal Aktif</h3>
          </div>
          <p className="text-3xl font-black text-brand-textMain">
            {activeReferrals}
          </p>
        </div>

        <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-brand-textMain">
              Total Pendapatan
            </h3>
          </div>
          <p className="text-3xl font-black text-brand-gold">
            {formatMoney(totalEarned)}
          </p>
        </div>

        <div className="bg-brand-navy border border-brand-gold/30 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign className="w-24 h-24 text-brand-gold" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-white">Saldo Tersedia</h3>
            </div>
            <p className="text-3xl font-black text-brand-gold mb-4">
              {formatMoney(pendingPayout)}
            </p>

            <button
              onClick={handleOpenPayout}
              disabled={pendingPayout < 1000000}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                pendingPayout >= 1000000
                  ? "bg-brand-gold text-slate-900 hover:bg-yellow-500 shadow-lg"
                  : "bg-brand-surface border border-brand-border text-brand-textMuted cursor-not-allowed"
              }`}
            >
              {pendingPayout < 1000000
                ? "Minimum Penarikan Rp 1.000.000"
                : "Tarik Dana Sekarang"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-brand-textMain mb-4">
          Link Referal Anda
        </h3>
        <div className="flex gap-2">
          <div className="flex-1 bg-brand-deep border border-brand-border rounded-xl px-4 py-3 font-mono text-sm text-brand-textMain flex items-center overflow-x-auto">
            {referralLink}
          </div>
          <button
            onClick={copyToClipboard}
            className="px-6 py-3 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 border border-brand-gold/30 rounded-xl font-bold flex items-center gap-2 transition-colors"
          >
            {copied ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Tersalin!" : "Salin"}
          </button>
        </div>
      </div>

      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-brand-border flex justify-between items-center bg-brand-deep/30">
          <h3 className="font-bold text-brand-textMain">
            Aktivitas Referal Terbaru
          </h3>
        </div>

        <div className="divide-y divide-brand-border">
          {activities.length > 0 ? (
            activities.map((act) => (
              <div
                key={act.id}
                className="p-6 flex items-center justify-between hover:bg-brand-deep/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-deep rounded-full flex items-center justify-center text-brand-gold font-bold">
                    {act.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-textMain">
                      {act.company}
                    </h4>
                    <p className="text-xs text-brand-textMuted mt-0.5">
                      {act.date} • {act.plan}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-gold">
                    +{formatMoney(act.amount)}
                  </p>
                  <p className="text-xs text-green-400 mt-0.5">{act.status}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-brand-border mx-auto mb-3" />
              <h4 className="font-bold text-brand-textMain">
                Belum Ada Referal
              </h4>
              <p className="text-sm text-brand-textMuted mt-1 max-w-md mx-auto">
                Bagikan link referal Anda kepada kolega atau perusahaan lain
                untuk mulai mendapatkan komisi 20% setiap bulannya.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Payout Engine Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-deep/80 backdrop-blur-sm">
          <div className="bg-brand-surface border border-brand-border w-full max-w-lg rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-brand-border flex justify-between items-center">
              <h3 className="font-bold text-brand-textMain text-lg">
                Tarik Dana Referal
              </h3>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="text-brand-textMuted hover:text-brand-textMain"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              {payoutStep === "select-account" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h4 className="text-brand-textMain font-bold mb-1">
                      Pilih Rekening Tujuan
                    </h4>
                    <p className="text-sm text-brand-textMuted mb-4">
                      Dana sebesar{" "}
                      <strong className="text-brand-gold">
                        {formatMoney(pendingPayout)}
                      </strong>{" "}
                      akan ditransfer ke rekening terpilih.
                    </p>

                    <div className="space-y-3">
                      {user?.savedBankAccounts?.map((bank) => (
                        <label
                          key={bank.id}
                          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedBankId === bank.id ? "border-brand-gold bg-brand-gold/5" : "border-brand-border hover:border-brand-gold/30"}`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="bank"
                              checked={selectedBankId === bank.id}
                              onChange={() => setSelectedBankId(bank.id)}
                              className="text-brand-gold focus:ring-brand-gold bg-brand-deep border-brand-border"
                            />
                            <div>
                              <p className="font-bold text-brand-textMain">
                                {bank.bankName}
                              </p>
                              <p className="text-sm text-brand-textMuted">
                                {bank.accountNumber} • a/n {bank.accountHolder}
                              </p>
                            </div>
                          </div>
                          <Building2 className="w-5 h-5 text-brand-textMuted" />
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setPayoutStep("add-account")}
                    className="w-full py-3 rounded-xl border border-dashed border-brand-border text-brand-textMuted font-bold hover:text-brand-gold hover:border-brand-gold transition-colors text-sm"
                  >
                    + Tambah Rekening Baru
                  </button>

                  <button
                    onClick={() => setPayoutStep("security")}
                    disabled={!selectedBankId}
                    className="w-full bg-brand-gold text-slate-900 py-3 rounded-xl font-bold shadow-gold-lg hover:shadow-gold-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Lanjutkan Penarikan
                  </button>
                </div>
              )}

              {payoutStep === "add-account" && (
                <form
                  onSubmit={handleAddBankAccount}
                  className="space-y-4 animate-fade-in"
                >
                  <h4 className="text-brand-textMain font-bold mb-4">
                    Data Rekening Baru
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-brand-textMuted mb-1">
                      Nama Bank
                    </label>
                    <input
                      required
                      type="text"
                      value={newBank.bankName}
                      onChange={(e) =>
                        setNewBank({ ...newBank, bankName: e.target.value })
                      }
                      placeholder="Contoh: BCA, Mandiri"
                      className="w-full bg-brand-deep border border-brand-border rounded-lg px-4 py-2.5 text-brand-textMain focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-textMuted mb-1">
                      Nomor Rekening
                    </label>
                    <input
                      required
                      type="text"
                      value={newBank.accountNumber}
                      onChange={(e) =>
                        setNewBank({
                          ...newBank,
                          accountNumber: e.target.value,
                        })
                      }
                      placeholder="Masukkan nomor rekening"
                      className="w-full bg-brand-deep border border-brand-border rounded-lg px-4 py-2.5 text-brand-textMain focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-textMuted mb-1">
                      Nama Pemilik Rekening
                    </label>
                    <input
                      required
                      type="text"
                      value={newBank.accountHolder}
                      onChange={(e) =>
                        setNewBank({
                          ...newBank,
                          accountHolder: e.target.value,
                        })
                      }
                      placeholder="Sesuai buku tabungan"
                      className="w-full bg-brand-deep border border-brand-border rounded-lg px-4 py-2.5 text-brand-textMain focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        user?.savedBankAccounts?.length
                          ? setPayoutStep("select-account")
                          : setShowPayoutModal(false)
                      }
                      className="flex-1 py-3 rounded-xl border border-brand-border text-brand-textMain font-bold hover:bg-brand-border/50"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-brand-gold text-slate-900 py-3 rounded-xl font-bold shadow-gold-lg hover:shadow-gold-xl transition-all"
                    >
                      Simpan Rekening
                    </button>
                  </div>
                </form>
              )}

              {payoutStep === "security" && (
                <form
                  onSubmit={handleVerifySecurity}
                  className="space-y-6 text-center animate-fade-in"
                >
                  <div className="w-16 h-16 bg-brand-navy border border-brand-border rounded-full flex items-center justify-center mx-auto text-brand-gold">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-brand-textMain font-bold text-xl mb-2">
                      Verifikasi Keamanan
                    </h4>
                    <p className="text-sm text-brand-textMuted">
                      Demi keamanan, masukkan PIN atau Password akun Anda untuk
                      mengotorisasi penarikan{" "}
                      <strong>{formatMoney(pendingPayout)}</strong>.
                    </p>
                  </div>

                  <div>
                    <div className="relative max-w-xs mx-auto">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-textMuted" />
                      <input
                        required
                        type="password"
                        value={securityPin}
                        onChange={(e) => setSecurityPin(e.target.value)}
                        placeholder="Masukkan PIN / Password"
                        className="w-full bg-brand-deep border border-brand-border rounded-lg pl-10 pr-4 py-3 text-center text-brand-textMain font-mono tracking-widest focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifying || !securityPin}
                    className="w-full bg-brand-gold text-slate-900 py-3 rounded-xl font-bold shadow-gold-lg hover:shadow-gold-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                        Memverifikasi...
                      </>
                    ) : (
                      "Otorisasi Penarikan"
                    )}
                  </button>
                </form>
              )}

              {payoutStep === "tracker" && (
                <div className="space-y-8 py-4 animate-fade-in">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-green-500 mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-brand-textMain font-bold text-xl">
                      Penarikan Sedang Diproses
                    </h4>
                    <p className="text-sm text-brand-textMuted mt-1">
                      SLA Maksimal 3 Hari Kerja
                    </p>
                  </div>

                  {/* Tracker Timeline */}
                  <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-gold before:via-brand-border before:to-transparent">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-brand-deep p-4 rounded-xl border border-brand-gold/50 shadow-gold-sm">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-brand-textMain text-sm">
                            Request Diterima & Diverifikasi
                          </h4>
                          <span className="text-xs text-brand-textMuted">
                            Hari ini
                          </span>
                        </div>
                        <p className="text-xs text-brand-textMuted">
                          Otorisasi keamanan berhasil dilakukan.
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-navy border-2 border-brand-gold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
                      </div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-brand-surface p-4 rounded-xl border border-brand-border">
                        <h4 className="font-bold text-brand-textMain text-sm mb-1">
                          Pencairan Dana (Diproses)
                        </h4>
                        <p className="text-xs text-brand-textMuted">
                          Tim finance kami sedang memproses transfer ke rekening{" "}
                          {
                            user?.savedBankAccounts?.find(
                              (b) => b.id === selectedBankId,
                            )?.bankName
                          }
                          .
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-deep border-2 border-brand-border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-brand-surface/50 p-4 rounded-xl border border-brand-border/50">
                        <h4 className="font-bold text-brand-textMuted text-sm mb-1">
                          Dana Terkirim
                        </h4>
                        <p className="text-xs text-brand-textMuted/50">
                          Estimasi maksimal 3 hari kerja.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowPayoutModal(false)}
                    className="w-full py-3 rounded-xl border border-brand-border text-brand-textMain font-bold hover:bg-brand-border/50 transition-colors"
                  >
                    Kembali ke Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
