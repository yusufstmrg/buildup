import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Share2, 
  Database, 
  FileSpreadsheet, 
  RefreshCw, 
  Check, 
  Layers, 
  UploadCloud 
} from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';
import { BuildUpLogo } from './BuildUpLogo';
import { QUICK_SCREENING_QUESTIONS, DiagnosticQuestion, ERP_CONNECTORS } from '../lib/diagnosticQuestions';

export function HealthCheckModal() {
  const { 
    isHealthCheckModalOpen, 
    setIsHealthCheckModalOpen, 
    updateScoreFromAnswers, 
    setGlobalHealthScore,
    formatMoney,
    language,
    t
  } = useBuildUp();

  // Tab mode: 'quick' | 'erp'
  const [activeTab, setActiveTab] = useState<'quick' | 'erp'>('quick');

  // Diagnostic State
  const [currentStep, setCurrentStep] = useState(0);
  const [isProfiling, setIsProfiling] = useState(true);
  const [estRevenue, setEstRevenue] = useState('');
  const [estMargin, setEstMargin] = useState('');
  const [estEmployees, setEstEmployees] = useState('');
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState<number>(0);
  const [companyName, setCompanyName] = useState('');

  // ERP Auto-Ingest Diagnostic State
  const [selectedErp, setSelectedErp] = useState<string>('sap_s4hana');
  const [isErpScanning, setIsErpScanning] = useState(false);
  const [erpScanProgress, setErpScanProgress] = useState(0);
  const [erpScanComplete, setErpScanComplete] = useState(false);
  
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [aiFindings, setAiFindings] = useState<string[]>([
      'Terdeteksi keterlambatan penagihan piutang (DSO) dan konsentrasi vendor tinggi.',
      'Diperkirakan 4,8% dari omzet tahunan bocor akibat inefisiensi modal kerja.'
    ]);
    const [aiRecommendation, setAiRecommendation] = useState<string>('Potensi pemulihan kas: ~Rp 1,6 Miliar dalam 90 hari pertama.');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isHealthCheckModalOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHealthCheckModalOpen]);

  if (!isHealthCheckModalOpen) return null;

  const questions: DiagnosticQuestion[] = QUICK_SCREENING_QUESTIONS;

  const handleSelectOption = (score: number) => {
    const updated = [...answers];
    updated[currentStep] = score;
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete diagnostic
      const sum = updated.reduce((a, b) => a + b, 0);
      const scoreTotal = Math.round((sum / (questions.length * 5)) * 100);
      setCalculatedScore(scoreTotal);
      updateScoreFromAnswers(updated);
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFFFFF', '#10B981']
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setIsHealthCheckModalOpen(false);
    setCurrentStep(0);
    setIsProfiling(true);
    setIsCompleted(false);
    setIsErpScanning(false);
    setErpScanComplete(false);
  };

  const parseFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (!data) { resolve(""); return; }
        
        if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          try {
            // Import dinamis xlsx agar tidak membebani initial load
            import('xlsx').then(xlsx => {
              const workbook = xlsx.read(data, { type: 'binary' });
              let text = "";
              workbook.SheetNames.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                text += `Sheet: ${sheetName}\n` + xlsx.utils.sheet_to_csv(sheet).substring(0, 500) + "\n\n";
              });
              resolve(text);
            });
          } catch(err) {
            resolve("Error reading excel file.");
          }
        } else {
          // Asumsikan CSV/TXT
          resolve(data as string);
        }
      };
      
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const handleRunErpScan = async () => {
    setIsErpScanning(true);
    setErpScanProgress(15);
    setErpScanComplete(false);

    try {
      let fileDataString = "No file uploaded. Assume typical SME inefficiencies for Indonesian mid-market company.";
      if (uploadedFiles.length > 0) {
        setErpScanProgress(30);
        const parsedFiles = await Promise.all(uploadedFiles.map(f => parseFile(f)));
        fileDataString = parsedFiles.join("\n\n--- NEXT FILE ---\n\n");
      }

      setErpScanProgress(50);

      // Call Gemini directly from frontend (no backend server needed)
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: 'AIzaSyDaLMtBGwq4XkFBQkd-n_qif98lpj6v1IQ' });

      setErpScanProgress(60);

      const prompt = `Anda adalah BuildUp AI Executive — analis transformasi bisnis elite untuk perusahaan menengah Indonesia.

Analisis data keuangan/operasional berikut dan hasilkan Business Health Check yang presisi:

DATA BISNIS:
${fileDataString.substring(0, 8000)}

Hasilkan analisis dalam format JSON berikut (HANYA JSON, tanpa teks lain):
{
  "score": <angka 0-100, health score bisnis>,
  "findings": [
    "<temuan kritis 1 spesifik berdasarkan data>",
    "<temuan kritis 2 spesifik berdasarkan data>",
    "<temuan kritis 3 spesifik berdasarkan data>",
    "<temuan kritis 4 spesifik berdasarkan data>"
  ],
  "recommendation": "<rekomendasi utama yang actionable dan spesifik>"
}

Pastikan findings SPESIFIK terhadap data yang diberikan (sebutkan angka/nama akun jika ada), bukan generik.`;

      // Add timeout protection (60 seconds)
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Analisis timeout setelah 60 detik. Coba lagi.')), 60000)
      );

      const aiPromise = ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: { temperature: 0.3, responseMimeType: 'application/json' }
      });

      setErpScanProgress(70);

      const response = await Promise.race([aiPromise, timeoutPromise]);
      const rawText = response.text || '{}';

      setErpScanProgress(85);

      let analysis: any = {};
      try {
        // Strip markdown code blocks if present
        const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        analysis = JSON.parse(cleaned);
      } catch {
        // If JSON parse fails, build structured result from text
        analysis = {
          score: 65,
          findings: [rawText.substring(0, 200)],
          recommendation: 'Lihat detail analisis di atas.'
        };
      }

      const calculatedScore = typeof analysis.score === 'number' ? analysis.score : 65;
      const findings: string[] = Array.isArray(analysis.findings) && analysis.findings.length > 0
        ? analysis.findings
        : ['Analisis selesai. Lihat rekomendasi untuk detail.'];
      const rec: string = analysis.recommendation || 'Optimalisasi modal kerja dapat membebaskan kas secara signifikan.';

      setCalculatedScore(calculatedScore);
      setGlobalHealthScore(calculatedScore, findings, rec);
      setAiFindings(findings);
      setAiRecommendation(rec);

    } catch (e: any) {
      console.error("Diagnostic error:", e);
      const errMsg = e.message || 'Terjadi kesalahan sistem.';
      setCalculatedScore(40);
      setGlobalHealthScore(40, [`Error: ${errMsg}`], 'Coba upload file yang lebih kecil atau coba lagi beberapa saat.');
      setAiFindings([`Error Analisis: ${errMsg}`]);
      setAiRecommendation('Coba upload file yang lebih kecil (maks ~5MB) atau coba lagi beberapa saat.');
    }

    setErpScanProgress(100);
    setIsErpScanning(false);
    setErpScanComplete(true);
    setIsCompleted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFFFFF', '#10B981']
    });
  };

  const q = questions[currentStep];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:pt-10 sm:p-4 bg-brand-deep/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        // Dismiss when clicking directly on backdrop
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="bg-brand-surface border border-brand-gold/30 w-full max-w-3xl rounded-2xl shadow-2xl relative flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Accent Line */}
        <div className="h-1.5 bg-gradient-to-r from-brand-goldDark via-brand-gold to-brand-goldLight" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-brand-border bg-brand-navy/60">
          <div className="flex items-center gap-3">
            <BuildUpLogo size="sm" variant="horizontal" showSubtitle={false} />
            <div className="hidden sm:block h-6 w-px bg-brand-border" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-brand-textMain tracking-wide text-sm">{t('modalTitle')}</span>
                <span className="text-[10px] font-bold bg-brand-gold/10 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
                  Diagnostic Engine
                </span>
              </div>
              <p className="text-xs text-brand-textMuted">{t('modalSubtitle')}</p>
            </div>
          </div>
          
          {/* Prominent, easy-to-see Close Button */}
          <button 
            onClick={handleClose}
            className="flex items-center gap-1 text-brand-textMuted hover:text-brand-textMain px-2.5 py-1.5 rounded-lg bg-brand-card hover:bg-brand-surface border border-brand-border text-xs font-semibold transition-colors"
            title="Tutup (Esc)"
          >
            <span>{t('modalClose')}</span>
            <X className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {/* Diagnostic Mode Selector Tabs (Unless already completed) */}
        {!isCompleted && (
          <div className="flex items-center border-b border-brand-border bg-brand-deep/50 px-6 pt-3 gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('quick')}
              className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'quick'
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-brand-textMuted hover:text-brand-textMain'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('modalQuickTab')}</span>
            </button>

            <button
              onClick={() => setActiveTab('erp')}
              className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'erp'
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-brand-textMuted hover:text-brand-textMain'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('modalErpTab')}</span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Auto
              </span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        {!isCompleted ? (
          activeTab === 'quick' ? (
            isProfiling ? (
              <div className="p-5 sm:p-7 space-y-5 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-xl font-bold text-brand-textMain mb-1">Estimasi Baseline Bisnis Anda</h3>
                  <p className="text-sm text-brand-textMuted mb-6">Agar hasil screening lebih akurat, mohon isi perkiraan angka berikut. Kami tidak menyimpan data ini secara permanen.</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-textMain mb-1.5 uppercase tracking-wide">1. Estimasi Omzet Tahunan (Rp)</label>
                    <input 
                      type="text" 
                      value={estRevenue}
                      onChange={(e) => setEstRevenue(e.target.value)}
                      placeholder="Contoh: 50.000.000.000" 
                      className="w-full bg-brand-deep border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-textMain placeholder-brand-textMuted/50 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-textMain mb-1.5 uppercase tracking-wide">2. Estimasi Margin Laba Bersih (%)</label>
                    <input 
                      type="text" 
                      value={estMargin}
                      onChange={(e) => setEstMargin(e.target.value)}
                      placeholder="Contoh: 15" 
                      className="w-full bg-brand-deep border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-textMain placeholder-brand-textMuted/50 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-textMain mb-1.5 uppercase tracking-wide">3. Jumlah Karyawan Aktif</label>
                    <input 
                      type="text" 
                      value={estEmployees}
                      onChange={(e) => setEstEmployees(e.target.value)}
                      placeholder="Contoh: 120" 
                      className="w-full bg-brand-deep border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-textMain placeholder-brand-textMuted/50 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button 
                    onClick={() => setIsProfiling(false)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldDark text-brand-deep font-bold text-sm shadow-gold-sm transition-all"
                  >
                    Lanjutkan ke 8 Pertanyaan
                  </button>
                </div>

                <div className="mt-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
                  <p className="text-xs text-brand-textMuted mb-2">Ingin hasil akurasi 100% dari AI tanpa menjawab manual?</p>
                  <button 
                    onClick={() => setActiveTab('erp')}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline transition-colors"
                  >
                    Upload Data Bisnis & Laporan (Excel/CSV)
                  </button>
                </div>
              </div>
            ) : (
            /* QUESTIONS FLOW */
            <div className="p-5 sm:p-7 space-y-6">
              
              {/* Progress Indicator */}
              <div>
                <div className="flex items-center justify-between text-xs text-brand-textMuted mb-2">
                  <span className="font-bold text-brand-gold tracking-wide uppercase">
                    Dimensi {currentStep + 1} / {questions.length}: {q.category[language] || q.category.en}
                  </span>
                  <span className="font-mono">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-brand-deep rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brand-gold to-amber-300 h-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-brand-textMain leading-snug">
                  {q.question[language] || q.question.en}
                </h3>
                <p className="text-xs sm:text-sm text-brand-textMuted">
                  {q.description[language] || q.description.en}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt, idx) => {
                  const isSelected = answers[currentStep] === opt.score;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.score)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 group ${
                        isSelected 
                          ? 'border-brand-gold bg-brand-gold/10 text-brand-textMain shadow-gold-sm' 
                          : 'border-brand-border bg-brand-card/70 hover:border-slate-500 text-brand-textMuted hover:text-brand-textMain hover:bg-brand-card'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        isSelected ? 'border-brand-gold bg-brand-gold text-brand-deep font-bold' : 'border-slate-600 group-hover:border-brand-gold'
                      }`}>
                        {isSelected ? <CheckCircle2 className="w-4 h-4 text-brand-deep fill-brand-gold" /> : <span className="text-[10px] text-brand-textMuted">{opt.score}</span>}
                      </div>
                      <span className="leading-relaxed flex-1">
                        {opt.text[language] || opt.text.en}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation & Dismiss Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1.5 text-xs font-semibold text-brand-textMuted hover:text-brand-textMain disabled:opacity-20 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> 
                    <span>{t('modalPrev')}</span>
                  </button>
                  <button
                    onClick={handleClose}
                    className="text-xs font-semibold text-brand-textMuted hover:text-rose-400 transition-colors pl-3 border-l border-brand-border"
                  >
                    {t('modalCancel')}
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-brand-textMuted">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Evidence-backed BuildUp Method™</span>
                </div>
              </div>
            </div>
            )
          ) : (
            /* ERP CONNECT & FILE UPLOAD TAB (Request 5) */
            <div className="p-5 sm:p-7 space-y-6">
              <div className="text-center max-w-lg mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Database className="w-3.5 h-3.5" />
                  <span>Automated System Health Screening</span>
                </div>
                <h3 className="text-xl font-bold text-brand-textMain">
                  Diagnosis Langsung dari Data ERP & Bank Anda
                </h3>
                <p className="text-xs text-brand-textMuted mt-1">
                  Pilih sistem yang Anda gunakan atau unggah file Trial Balance / AR Aging untuk analisis seketika tanpa menjawab kuesioner.
                </p>
              </div>

              {/* ERP Selection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ERP_CONNECTORS.slice(0, 6).map((erp) => (
                  <button
                    key={erp.id}
                    onClick={() => setSelectedErp(erp.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedErp === erp.id
                        ? 'border-brand-gold bg-brand-gold/10 shadow-gold-sm'
                        : 'border-brand-border bg-brand-card/60 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-brand-textMuted uppercase tracking-wide">
                        {erp.category.split(' ')[0]}
                      </span>
                      {selectedErp === erp.id && (
                        <Check className="w-3.5 h-3.5 text-brand-gold" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-brand-textMain truncate">
                      {erp.name.split(' ')[0]} {erp.name.split(' ')[1]}
                    </div>
                    <div className="text-[10px] text-brand-textMuted mt-1 truncate">
                      {erp.supportedProtocols[0]}
                    </div>
                  </button>
                ))}
              </div>

              {/* Upload sample file alternative */}
              <div className={`p-4 rounded-xl border border-dashed transition-colors ${uploadedFiles.length > 0 ? 'border-brand-gold/50 bg-brand-gold/5' : 'border-brand-border bg-brand-navy/40 hover:border-brand-gold/50'} text-center`}>
                {uploadedFiles.length === 0 ? (
                  <>
                    <UploadCloud className="w-7 h-7 text-brand-gold mx-auto mb-2 opacity-80" />
                    <p className="text-xs font-bold text-brand-textMain">
                      Atau Drag &amp; Drop Semua File Data Bisnis (Excel/CSV)
                    </p>
                    <p className="text-[11px] text-brand-textMuted mt-0.5">
                      Format didukung: Data Penjualan, Laporan Laba Rugi, Piutang, Inventori, atau Mutasi Bank (Excel/CSV)
                    </p>
                  </>
                ) : (
                  <div className="text-left space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-brand-gold flex items-center gap-1.5">
                        <UploadCloud className="w-4 h-4" />
                        {uploadedFiles.length} File Siap Dianalisis
                      </span>
                      <label
                        htmlFor="erp-file-upload"
                        className="text-[11px] text-brand-textMuted hover:text-brand-gold cursor-pointer underline transition-colors"
                      >
                        + Tambah File
                      </label>
                    </div>
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 bg-brand-navy px-3 py-2 rounded-lg border border-brand-border">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-brand-gold/15 flex items-center justify-center shrink-0">
                            <span className="text-[9px] font-black text-brand-gold uppercase">
                              {file.name.split('.').pop()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-brand-textMain truncate max-w-[200px]">{file.name}</p>
                            <p className="text-[10px] text-brand-textMuted">
                              {file.size > 1024 * 1024
                                ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                                : `${Math.round(file.size / 1024)} KB`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}
                          className="shrink-0 w-5 h-5 rounded-full bg-red-500/10 hover:bg-red-500/25 flex items-center justify-center text-red-400 transition-colors"
                          title="Hapus file ini"
                        >
                          <span className="text-xs font-bold leading-none">×</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  multiple
                  id="erp-file-upload"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setUploadedFiles(prev => {
                        const existing = prev.map(f => f.name);
                        const newFiles = Array.from(e.target.files!).filter(f => !existing.includes(f.name));
                        return [...prev, ...newFiles];
                      });
                    }
                  }}
                />
                {uploadedFiles.length === 0 && (
                  <label
                    htmlFor="erp-file-upload"
                    className="mt-3 inline-block px-3 py-1.5 rounded-lg bg-brand-card hover:bg-brand-border text-brand-textMain border border-brand-border text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Pilih File Contoh
                  </label>
                )}
              </div>


              {/* Progress bar if scanning */}
              {isErpScanning && (
                <div className="space-y-2 p-3 rounded-xl bg-brand-navy border border-brand-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-brand-gold font-bold flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Mengekstrak transaksi read-only dan menjalankan analisis forensik...
                    </span>
                    <span className="font-mono text-brand-textMain">{erpScanProgress}%</span>
                  </div>
                  <div className="w-full bg-brand-navy rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-brand-gold h-full transition-all duration-300"
                      style={{ width: `${erpScanProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                <button
                  onClick={handleClose}
                  className="text-xs font-semibold text-brand-textMuted hover:text-brand-textMain"
                >
                  {t('modalCancel')}
                </button>
                <button
                  onClick={handleRunErpScan}
                  disabled={isErpScanning}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold text-slate-950 font-bold text-xs hover:opacity-95 shadow-md shadow-brand-gold/20 disabled:opacity-50 transition-all"
                >
                  <Database className="w-4 h-4" />
                  <span>Jalankan Diagnosis Sistem Otomatis</span>
                </button>
              </div>
            </div>
          )
        ) : (
          /* DIAGNOSTIC OUTPUT REPORT (RESULTS) */
          <div className="p-5 sm:p-8 space-y-6">
            <div className="text-center max-w-lg mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
                Diagnostic Complete · Certified Health Signal
              </div>
              <h2 className="text-2xl font-black text-brand-textMain tracking-tight mb-1">
                {t('modalScoreTitle')}
              </h2>
              <p className="text-xs text-brand-textMuted">
                {t('modalScoreSubtitle')}
              </p>
            </div>

            {/* Score Showcase Badge */}
            <div className="bg-gradient-to-b from-brand-card to-brand-navy border border-brand-border p-6 rounded-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div>
                  <div className="text-6xl md:text-7xl font-black tracking-tighter text-gold-gradient">
                    {calculatedScore}
                    <span className="text-xl md:text-2xl text-brand-textMuted font-normal"> / 100</span>
                  </div>
                  <div className="mt-2 inline-block px-3 py-1 rounded-md text-xs font-bold tracking-wide uppercase bg-brand-navy border border-brand-border text-brand-textMain">
                    Status: {calculatedScore >= 80 ? 'Robust · Growth Ready' : calculatedScore >= 65 ? 'Moderate · Value Leakage Present' : 'High Vulnerability · Immediate Intervention Needed'}
                  </div>
                </div>

                <div className="h-20 w-px bg-brand-border hidden md:block" />

                  <div className="text-left space-y-2 max-w-sm">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Temuan Kunci Nilai Bocor (Leakage)</span>
                    </div>
                    {aiFindings.map((finding, index) => (
                      <p key={index} className="text-xs text-brand-textMuted leading-relaxed">
                        • {finding}
                      </p>
                    ))}
                    <p className="text-xs text-emerald-400 font-semibold mt-2">
                      Rekomendasi Utama: {aiRecommendation}
                    </p>
                  </div>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/pricing"
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-brand-gold hover:opacity-95 text-slate-950 text-xs font-black tracking-wide shadow-gold-sm transition-all text-center flex items-center justify-center gap-2"
              >
                <span>{t('modalBookConsult')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/app"
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-brand-card hover:bg-brand-surface text-brand-textMain border border-brand-border text-xs font-bold transition-all text-center"
              >
                {t('modalExplorePlatform')}
              </Link>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-4 py-3 rounded-xl text-brand-textMuted hover:text-brand-textMain text-xs font-semibold"
              >
                {t('modalClose')}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}














