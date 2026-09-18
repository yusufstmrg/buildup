import React, { useState } from 'react';
import { 
  Database, 
  Link2, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Search, 
  Layers, 
  ArrowUpRight, 
  Activity, 
  FileSpreadsheet, 
  RefreshCw, 
  Check, 
  AlertCircle,
  Building,
  Server,
  Lock
} from 'lucide-react';
import { ERP_CONNECTORS, ERPConnectorSpec } from '../lib/diagnosticQuestions';
import { useBuildUp } from '../context/BuildUpContext';

export function ERPConnectorsSection() {
  const { language, t } = useBuildUp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedConnector, setSelectedConnector] = useState<ERPConnectorSpec | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [simulationComplete, setSimulationComplete] = useState(false);

  const categories = [
    { id: 'all', label: language === 'id' ? 'Semua Sistem' : language === 'zh' ? '全部系统' : language === 'ja' ? '全システム' : language === 'ar' ? 'كافة الأنظمة' : 'All Systems' },
    { id: 'Tier 1 Global ERP', label: 'Tier 1 Global ERP (SAP / Oracle)' },
    { id: 'SME & Regional ERP', label: 'SME & Regional ERP (Accurate / Jurnal / Odoo)' },
    { id: 'Cash & Banking API', label: language === 'id' ? 'Bank & Rekening Giro (BCA / Mandiri)' : 'Cash & Banking API' },
    { id: 'Tax & Compliance', label: language === 'id' ? 'Pajak & Kepatuhan (Coretax)' : 'Tax & Compliance' },
  ];

  const filtered = selectedCategory === 'all' 
    ? ERP_CONNECTORS 
    : ERP_CONNECTORS.filter(c => c.category === selectedCategory);

  const startSimulation = (connector: ERPConnectorSpec) => {
    setSelectedConnector(connector);
    setIsSimulating(true);
    setSimulationComplete(false);
    setSimulationLogs([]);

    const steps = [
      language === 'id' ? `[0.1s] Membuka secure read-only handshake ke ${connector.name}...` : `[0.1s] Establishing secure read-only handshake with ${connector.name}...`,
      language === 'id' ? `[0.4s] Otentikasi TLS 1.3 / AES-256 berhasil. Memverifikasi hak akses zero-write...` : `[0.4s] TLS 1.3 / AES-256 authenticated. Verifying read-only zero-write boundary...`,
      language === 'id' ? `[0.9s] Menarik skema data: General Ledger, AR/AP Aging, PO Master, dan Mutasi...` : `[0.9s] Ingesting schema entities: General Ledger, AR/AP Aging, PO Master, and Bank feeds...`,
      language === 'id' ? `[1.4s] Membangun Business Context Graph™: 14.820 entri transaksi dinormalisasi.` : `[1.4s] Building Business Context Graph™: 14,820 transaction entities normalized.`,
      language === 'id' ? `[2.1s] Menjalankan Health Diagnostic Engine: Mendeteksi 3 kebocoran modal kerja tersembunyi.` : `[2.1s] Executing Health Diagnostic Engine: 3 latent working capital value leaks uncovered!`,
      language === 'id' ? `[2.7s] Selesai! Health Signal & Decision Object siap ditinjau Direksi.` : `[2.7s] Complete! Verified Health Signal & Decision Object generated for Executive review.`
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimulationLogs(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setIsSimulating(false);
          setSimulationComplete(true);
        }
      }, (index + 1) * 650);
    });
  };

  return (
    <section id="connectors" className="py-24 bg-gradient-to-b from-brand-deep via-brand-surface/70 to-brand-deep relative overflow-hidden border-t border-brand-border">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4 shadow-gold-sm">
            <Database className="w-3.5 h-3.5" />
            <span>{t('erpBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-textMain tracking-tight leading-tight">
            {t('erpHeading')}
          </h2>

          <p className="mt-5 text-base sm:text-lg text-brand-textMuted leading-relaxed">
            {t('erpSubheading')}
          </p>

          {/* Value props badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-brand-textMuted">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-card/80 border border-brand-border">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Read-Only & Zero Data Mutation</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-card/80 border border-brand-border">
              <Lock className="w-4 h-4 text-brand-gold" />
              <span>AES-256 & ISO 27001 Certified</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-card/80 border border-brand-border">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Live Health Diagnostic &lt; 3 Detik</span>
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-gold text-slate-950 shadow-md shadow-brand-gold/20'
                  : 'bg-brand-navy/60 text-brand-textMuted hover:text-brand-textMain hover:bg-brand-card border border-brand-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Connectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((connector) => (
            <div
              key={connector.id}
              className="bg-brand-surface/90 border border-brand-border hover:border-brand-gold/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-gold/5 flex flex-col justify-between group"
            >
              <div>
                {/* Header card */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy border border-brand-border flex items-center justify-center text-brand-gold group-hover:scale-105 transition-transform">
                      <Server className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-brand-textMain group-hover:text-brand-gold transition-colors">
                        {connector.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-brand-textMuted">
                        {connector.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Live Ingest
                  </span>
                </div>

                <p className="text-xs text-brand-textMuted leading-relaxed mb-4">
                  {connector.description[language] || connector.description.en}
                </p>

                {/* Data Read Capabilities */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-textMuted mb-2 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-brand-gold" />
                    <span>Data Read Capabilities:</span>
                  </div>
                  <ul className="space-y-1">
                    {(connector.dataReadCapabilities[language] || connector.dataReadCapabilities.en).slice(0, 3).map((item, i) => (
                      <li key={i} className="text-xs text-brand-textMuted flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Typical Diagnostic Highlight */}
                <div className="p-3 rounded-xl bg-brand-navy/80 border border-brand-border text-xs mb-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1 mb-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Contoh Temuan Diagnostik:</span>
                  </div>
                  <p className="text-brand-textMuted text-[11px] leading-tight">
                    {(connector.typicalDiagnosticsUncovered[language] || connector.typicalDiagnosticsUncovered.en)[0]}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-brand-border flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-brand-textMuted">
                  {connector.latency}
                </span>
                <button
                  onClick={() => startSimulation(connector)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-slate-950 border border-brand-gold/30 text-xs font-bold transition-all shadow-sm"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>{t('erpSimulateSyncBtn')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Simulation Modal / Drawer */}
        {selectedConnector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-brand-surface border border-brand-gold/30 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">
              <div className="h-1.5 bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight" />
              
              <div className="p-6">
                <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy border border-brand-border flex items-center justify-center text-brand-gold">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-brand-textMain">
                        {selectedConnector.name} — Live Ingestion Simulation
                      </h3>
                      <p className="text-xs text-brand-textMuted">
                        Zero-invasive read-only extraction into BuildUp Business Context Graph™
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedConnector(null)}
                    className="text-brand-textMuted hover:text-brand-textMain text-xs px-2.5 py-1 rounded-lg border border-brand-border hover:bg-brand-card"
                  >
                    Esc
                  </button>
                </div>

                {/* Simulated Terminal Window */}
                <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-emerald-400 border border-slate-800 space-y-2 min-h-[200px]">
                  {simulationLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed animate-in fade-in duration-150">
                      {log}
                    </div>
                  ))}
                  {isSimulating && (
                    <div className="flex items-center gap-2 text-brand-gold animate-pulse">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Streaming data blocks & running multi-dimensional forensic algorithms...</span>
                    </div>
                  )}
                </div>

                {/* Simulation Completed Insights Box */}
                {simulationComplete && (
                  <div className="mt-4 p-4 rounded-xl bg-brand-navy border border-emerald-500/30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Simulasi Diagnostik Selesai dengan Data Riil</span>
                    </div>
                    <div className="text-xs text-brand-textMain space-y-1.5">
                      <p className="font-semibold text-brand-textMain">
                        Hasil Analisis Otomatis BuildUp pada Transaksi:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-brand-textMuted">
                        <li>
                          <strong className="text-amber-400">Kebocoran Modal Kerja:</strong> Rata-rata Days Sales Outstanding (DSO) mencapai 64 hari (standar industri: 45 hari), mengunci modal kerja sebesar ~Rp 1,8 Miliar.
                        </li>
                        <li>
                          <strong className="text-amber-400">Anomali Pengadaan:</strong> Terdeteksi 3 vendor dengan variasi harga 7,2% di atas benchmark pasar untuk kategori raw packaging.
                        </li>
                        <li>
                          <strong className="text-emerald-400">Potensi Pemulihan EBITDA:</strong> Estimasi penghematan dapat dieksekusi dalam 90 hari pertama sebesar Rp 540 Juta.
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-end gap-3">
                      <button
                        onClick={() => setSelectedConnector(null)}
                        className="px-4 py-2 rounded-xl bg-brand-gold text-slate-950 font-bold text-xs hover:opacity-95 shadow-md"
                      >
                        Tutup Simulasi
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
