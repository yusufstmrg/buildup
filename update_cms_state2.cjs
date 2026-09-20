const fs = require('fs');

const cmsPath = 'D:/Bisnis/BuildUp/src/context/CmsContext.tsx';
let code = fs.readFileSync(cmsPath, 'utf8');

const newDefaultState = \
const defaultState: CmsState = {
  content: {},
  visibleSections: {
    hero: true, calculator: true, connectors: true, workforce: true, pricing: true, testimonials: true, about: true, contact: true
  },
  sectionOrder: ['hero', 'calculator', 'connectors', 'workforce', 'pricing', 'testimonials', 'about', 'contact'],
  navItems: [
    { id: 'home', label: 'Home', target: 'hero' },
    { id: 'about', label: 'About Us', target: 'about' },
    { id: 'connectors', label: 'Platform & Connectors', target: 'connectors' },
    { id: 'workforce', label: 'AI Workforce', target: 'workforce' },
    { id: 'pricing', label: 'Pricing & Tiers', target: 'pricing' },
    { id: 'contact', label: 'Contact Us', target: 'contact' }
  ],
  workforceRoles: [
    { title: 'AI CEO', desc: 'Sintesis gambaran besar, prioritas strategis, dan persetujuan keputusan berdampak tinggi.' },
    { title: 'AI CFO', desc: 'Pemodelan keuangan kompleks, proyeksi kas real-time, dan alokasi modal optimal.' },
    { title: 'AI Controller', desc: 'Rekonsiliasi harian otomatis, deteksi kebocoran pengeluaran, dan audit trail.' },
    { title: 'AI Procurement', desc: 'Negosiasi vendor, optimasi HPP, dan manajemen rantai pasok cerdas.' },
    { title: 'AI CRO (Revenue)', desc: 'Skoring prospek, prediksi penagihan, dan strategi diskon dinamis.' },
    { title: 'AI COO', desc: 'Orkestrasi proses lintas departemen, pemantauan SLA, dan penyeimbangan beban.' },
    { title: 'AI Risk & Control', desc: 'Identifikasi kerentanan fraud, pencegahan denda, dan stres-tes skenario.' },
    { title: 'AI HR', desc: 'Prediksi churn karyawan, analisis beban kerja, dan optimasi kompensasi.' },
    { title: 'AI Tax', desc: 'Analisis kewajiban pajak, identifikasi penghematan legal (tax shield).' },
    { title: 'AI Legal', desc: 'Review draf kontrak otomatis, ekstraksi klausal risiko, dan pemantauan regulasi.' },
    { title: 'AI Audit', desc: 'Pengujian kepatuhan 100% sampel (bukan acak) secara terus-menerus.' },
    { title: 'AI Strategy', desc: 'Analisis lanskap kompetitor, tren makroekonomi, dan simulasi ekspansi.' }
  ],
  pricing: [
    {
      id: 'starter', label: 'ENTRY DIAGNOSTIC', name: 'Starter / Basic', priceIdr: 0, priceUsd: 0,
      description: 'Fast, low-friction front door screening to measure company health and benchmark position.',
      features: ['Overall Health Score (0-100)', '8-Dimension performance scores', 'Top 3 critical constraint signals', 'Instant diagnostic summary PDF'],
      buttonText: 'Request Diagnostic Audit', isPopular: false
    },
    {
      id: 'standard', label: 'MONITORING', name: 'Standard Business', priceIdr: 6000000, priceUsd: 390,
      description: 'Live continuous benchmark progression, ongoing diagnostic tracking, and automated governance audit.',
      features: ['Pemantauan 8 Dimensi Bisnis 24/7', 'Peringatan Dini Anomali Arus Kas & Marjin', 'Benchmarking Industri Nasional & Regional', 'Dashboard Eksekutif C-Level', 'Integrasi 2 Sistem ERP / Pembukuan', 'Dukungan Teknis Prioritas'],
      buttonText: 'Mulai Berlangganan', isPopular: false
    },
    {
      id: 'growth', label: 'ACTIVE OPTIMIZATION', name: 'Growth / Expansion', priceIdr: 28000000, priceUsd: 1790,
      description: 'Full AI Workforce deployment, continuous Business OS orchestration, and Certified Business Advisor guidance.',
      features: ['Semua Fitur Standard Business', '12 Agen Eksekutif AI Workforce', 'Auditable Decision Engine™', 'Orkestrasi Alur Kerja Multi-Sistem', 'Pendampingan Certified Business Advisor', 'Jaminan ROI Terbukti'],
      buttonText: 'Pilih Growth Package', isPopular: true
    },
    {
      id: 'enterprise', label: 'CUSTOM ENGAGEMENT', name: 'Enterprise Custom', priceIdr: 120000000, priceUsd: 7900,
      description: 'For conglomerates, multi-entity holding groups, and complex legacy system environments.',
      features: ['Semua Fitur & Benefit Growth & Scale', 'Private VPC & On-Premise Deployment Options', 'Dedicated Enterprise Solutions Architect', 'Custom AI Model Fine-tuning', 'Unlimited API & Integration Limits', '24/7 SLA dengan Response Time < 1 Jam'],
      buttonText: 'Talk to Sales', isPopular: false
    }
  ],
  faqs: [
    { q: 'Bagaimana BuildUp menjamin ROI?', a: 'Sistem kami langsung menargetkan kebocoran nilai (value leakage) yang terukur. Kami menggunakan metodologi yang transparan di mana setiap perbaikan langsung tercermin pada margin.' },
    { q: 'Apakah ini akan menggantikan sistem ERP saya yang sudah ada?', a: 'Tidak. BuildUp bukan ERP. BuildUp adalah "Intelligence Layer" yang duduk di atas sistem ERP Anda (SAP, Oracle, Accurate, Jurnal) untuk membaca data, menganalisis, dan memberikan rekomendasi keputusan tanpa mengubah data asli Anda.' },
    { q: 'Seberapa aman data perusahaan kami?', a: 'Sangat aman. Kami menggunakan enkripsi AES-256 dan ISO 27001 compliance. Operasi kami bersifat Read-Only & Zero Data Mutation untuk paket standar.' },
    { q: 'Berapa lama proses implementasi?', a: 'Untuk paket Standard dan Growth, integrasi dapat diselesaikan dalam waktu kurang dari 7 hari berkat konektor native kami. Untuk Enterprise, tergantung kompleksitas.' },
    { q: 'Apakah ada kontrak jangka panjang?', a: 'Kami menawarkan fleksibilitas berlangganan secara bulanan (Monthly) atau tahunan (Yearly) dengan potongan harga khusus untuk komitmen tahunan.' }
  ],
  aboutStages: [
    { num: '1', title: 'Data Ingestion & Normalization', desc: 'Mengekstrak dan menstandardisasi data dari berbagai silo (ERP, CRM, HRIS) secara real-time.' },
    { num: '2', title: '8-Dimensional Health Scan', desc: 'Melakukan diagnostik komprehensif terhadap 8 pilar utama bisnis untuk menemukan kelemahan tersembunyi.' },
    { num: '3', title: 'Constraint Identification', desc: 'Mengidentifikasi leher botol (bottlenecks) operasional yang menahan pertumbuhan dan profitabilitas.' },
    { num: '4', title: 'Value Leakage Calculation', desc: 'Mengkalkulasi secara presisi berapa banyak kas yang terbuang akibat inefisiensi.' },
    { num: '5', title: 'AI Workforce Assignment', desc: 'Menugaskan Agen AI spesialis (CEO, CFO, dll) untuk menangani masalah spesifik.' },
    { num: '6', title: 'Actionable Orchestration', desc: 'Menyusun langkah perbaikan sistematis dengan prioritas berdasarkan dampak finansial terbesar.' },
    { num: '7', title: 'Automated Execution', desc: 'Mengeksekusi alur kerja perbaikan melintasi berbagai sistem internal secara otomatis.' },
    { num: '8', title: 'Real-time Audit & Governance', desc: 'Memastikan setiap tindakan mematuhi regulasi dan kebijakan internal (100% sampel audit).' },
    { num: '9', title: 'Continuous Compounding', desc: 'Mengukur hasil, mempelajari pola baru, dan mengulangi siklus untuk pertumbuhan eksponensial.' }
  ],
  aboutComparisons: [
    { feature: 'Kecepatan Analisa', traditional: 'Berminggu-minggu via Konsultan', buildup: 'Real-time < 3 Detik' },
    { feature: 'Cakupan Audit', traditional: 'Sampling Acak (5-10%)', buildup: 'Populasi Penuh (100%)' },
    { feature: 'Rekomendasi', traditional: 'Laporan Statis (PDF/Excel)', buildup: 'Keputusan yang Dapat Dieksekusi (Actionable)' }
  ],
  editMode: false
};
\;

code = code.replace(/const defaultState: CmsState = \{[\s\S]*?\};\s*(?=export const CmsProvider)/, newDefaultState);
fs.writeFileSync(cmsPath, code);
