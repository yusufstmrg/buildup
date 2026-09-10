import { Language } from './i18n';

export interface DiagnosticQuestion {
  id: string;
  dimensionId: string;
  category: Record<Language, string>;
  question: Record<Language, string>;
  description: Record<Language, string>;
  benchmarkNote?: Record<Language, string>;
  options: {
    text: Record<Language, string>;
    score: number;
    impactDescription?: Record<Language, string>;
  }[];
}

// 1. QUICK SCREENING QUESTIONS (8 DIMENSIONS — 1 PER DIMENSION)
export const QUICK_SCREENING_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'q_fin_1',
    dimensionId: 'finance',
    category: {
      id: 'KEUANGAN & ARUS KAS',
      en: 'FINANCE & CASH FLOW',
      zh: '财务与现金流管控',
      ja: '財務・キャッシュフロー管理',
      ar: 'المالية وإدارة التدفق النقدي'
    },
    question: {
      id: 'Seberapa terstruktur peramalan arus kas (cash flow forecast) dan manajemen modal kerja Anda?',
      en: 'How structured is your cash flow forecasting and working capital management?',
      zh: '企业的现金流预测与营运资金管理体系成熟度如何？',
      ja: 'キャッシュフロー予測と運転資本管理はどの程度構造化されていますか？',
      ar: 'ما مدى تنظيم توقعات التدفق النقدي وإدارة رأس المال العامل في شركتك؟'
    },
    description: {
      id: 'Menilai prediktabilitas likuiditas, penagihan piutang (DSO), dan beban modal kerja macet.',
      en: 'Assesses predictability of cash, debtor collections (DSO), and inventory drag.',
      zh: '评估资金流动性预测、应收账款回收周期(DSO)及沉淀营运资金。',
      ja: '資金予測性、売掛金回収日数（DSO）、運転資本の滞留を評価します。',
      ar: 'تقييم دقة التنبؤ بالسيولة، ومعدل تحصيل المستحقات، ورأس المال العامل المحتجز.'
    },
    options: [
      {
        text: {
          id: 'Informal / Reaktif — saldo rekening dicek manual saat butuh bayar; sering krisis kas',
          en: 'Informal / Reactive — bank balance checked manually; frequent cash crunches',
          zh: '非正式/被动应对——仅在需要付款时核查网银；经常面临流动性紧张',
          ja: '非公式・後手対応——残高確認は手動、頻繁に資金不足が発生',
          ar: 'غير رسمي / رد فعل — فحص رصيد البنك يدويًا عند الحاجة؛ أزمات سيولة متكررة'
        },
        score: 1
      },
      {
        text: {
          id: 'Spreadsheet Dasar — diupdate mingguan/bulanan, sering beda angka dengan bank',
          en: 'Basic Spreadsheets — updated weekly or monthly with frequent reconciliation discrepancies',
          zh: '基础Excel表格——按周或月更新，与银行对账经常出现差异',
          ja: '簡易スプレッドシート——週次・月次更新、銀行残高との照合差異が頻発',
          ar: 'جداول بيانات أساسية — تحديث أسبوعي أو شهري مع فروقات متكررة'
        },
        score: 2
      },
      {
        text: {
          id: 'Sistem ERP / Akuntansi Aktif — tutup buku bulanan ada, tapi belum ada rolling forecast 13-minggu',
          en: 'ERP / Accounting System in place — periodic monthly closes, but no automated rolling forecast',
          zh: '具备ERP/财务软件——有常规月结，但缺乏动态的13周滚动现金预测',
          ja: 'ERP/会計ソフト導入済——月次決算はあるが、13週ローリング予測は未整備',
          ar: 'نظام محاسبي / ERP مطبق — إغلاق شهري ولكن بدون تنبؤ تدحرج لـ 13 أسبوعًا'
        },
        score: 3
      },
      {
        text: {
          id: 'Manajemen Terstruktur — rolling forecast 13-minggu dan monitoring aging piutang berjalan tertib',
          en: 'Structured Management — 13-week rolling cash flow and aged debtor monitoring active',
          zh: '结构化管理——常态化运行13周滚动资金预测，严格管控逾期应收',
          ja: '構造化された管理体制——13週ローリング予測と売掛債権エイジングを統制',
          ar: 'إدارة منظمة — توقعات تدفق نقدي أسبوعية ومراقبة دقيقة لمستحقات العملاء'
        },
        score: 4
      },
      {
        text: {
          id: 'Optimasi AI-Native — terhubung real-time ke mutasi bank & ERP, early warning defisit otomatis',
          en: 'AI-Native Optimization — continuous real-time liquidity forecasting with automated collection alerts',
          zh: 'AI原生实时优化——直连网银API与ERP，自动化预测流动性盈缺与催收预警',
          ja: 'AIネイティブ最適化——銀行API・ERPと常時連携、流動性不足を自動検知',
          ar: 'تحسين ذكي مدعوم بالذكاء الاصطناعي — اتصال فوري بالبنوك والأنظمة وتنبيهات سيولة استباقية'
        },
        score: 5
      }
    ]
  },
  {
    id: 'q_sales_1',
    dimensionId: 'sales',
    category: {
      id: 'PENJUALAN & MARJIN HARGA',
      en: 'SALES & PRICING MARGIN',
      zh: '销售漏斗与定价利润率',
      ja: '営業パイプライン・価格マージン',
      ar: 'المبيعات وهوامش التسعير'
    },
    question: {
      id: 'Seberapa disiplin pengendalian diskon penjualan, akurasi pipeline, dan margin laba per transaksi?',
      en: 'How consistently do you track customer pipeline velocity, pricing margin, and sales follow-up?',
      zh: '企业在销售管线推进速度、折扣让利合规及单笔订单毛利把控方面表现如何？',
      ja: '営業進捗の可視性、値引き統制、案件ごとの利益率管理は徹底されていますか？',
      ar: 'ما مدى انضباط التحكم في الخصومات ومتابعة الصفقات وحماية هوامش الربح؟'
    },
    description: {
      id: 'Mendeteksi kebocoran marjin akibat diskon tanpa izin, follow-up prospek lambat, dan piutang macet penjualan.',
      en: 'Evaluates revenue predictability, pricing discipline, and sales leakage.',
      zh: '识别擅自越权打折、商机跟进脱节及潜在线索流失导致的毛利回落。',
      ja: '過度な値引き、案件放置、失注原因の未分析による利益流出を測定します。',
      ar: 'الكشف عن تآكل الهوامش بسبب الخصومات غير المعتمدة وضعف متابعة العملاء.'
    },
    options: [
      {
        text: {
          id: 'Catatan sales di WhatsApp / buku pribadi; diskon diputuskan sepihak oleh salesman',
          en: 'Sales in chat/personal notes; discounts granted ad-hoc by sales reps',
          zh: '商机记录在微信/个人记事本；业务员可随意口头承诺折扣',
          ja: '案件はチャットや個別メモ管理、値引きは営業担当者の独断',
          ar: 'سجلات المبيعات في المحادثات والملاحظات الشخصية؛ الخصومات عشوائية'
        },
        score: 1
      },
      {
        text: {
          id: 'Daftar leads di Excel; status prospek jarang diupdate, margin laba hanya dikira-kira',
          en: 'Static Excel lead list; deal stages rarely updated on time, gross margin estimated roughly',
          zh: 'Excel记录线索；阶段更新滞后，单单毛利仅凭经验估算',
          ja: 'Excelで案件リスト管理、更新が滞りがちで案件マージンは概算のみ',
          ar: 'قوائم Excel غير محدثة، وهوامش الربح يتم تقديرها تقريبياً'
        },
        score: 2
      },
      {
        text: {
          id: 'CRM / Sales Modul ERP aktif; target omzet dipantau, tapi belum ada proteksi batas marjin otomatis',
          en: 'CRM/ERP in place with targets, but no automated margin floor guardrails',
          zh: '已上线CRM/ERP销售模块；监控回款目标，但未设置自动化毛利下限锁',
          ja: 'CRM/ERP導入済——売上目標は管理されているが、最低利益率の自動制約なし',
          ar: 'نظام CRM مطبق لمتابعة المبيعات ولكن بدون قيود حماية تلقائية للهوامش'
        },
        score: 3
      },
      {
        text: {
          id: 'Governance Pipeline Ketat — otorisasi diskon berjenjang dan kalkulasi marjin per pesanan sudah baku',
          en: 'Governed sales pipeline with conversion metrics and formal margin approval thresholds',
          zh: '严格的管线治理——具备多级折扣审批流，每笔订单均测算毛利率',
          ja: '厳格なパイプライン統制——多段階値引き承認と案件利益率検証が定着',
          ar: 'حوكمة صارمة للمبيعات — مستويات معتمدة للخصومات وتدقيق مسبق للأرباح'
        },
        score: 4
      },
      {
        text: {
          id: 'Revenue Intelligence Terkoneksi — rekomendasi harga dinamis AI, prediksi churn, dan peringatan marjin bocor',
          en: 'Connected Revenue Intelligence — automated quote optimization, follow-up, and margin leak alerts',
          zh: '智能收入中枢——AI动态报价建议、客户流失预测与毛利偏离实时警报',
          ja: 'インテリジェント・レベニュー——AIによる最適価格算出・解約予兆検知・利益流出即時警告',
          ar: 'ذكاء إيرادات متكامل — تسعير ديناميكي ذكي وتنبيهات فورية لتسرب الهوامش'
        },
        score: 5
      }
    ]
  },
  {
    id: 'q_ops_1',
    dimensionId: 'operations',
    category: {
      id: 'OPERASIONAL & WORKFLOW SOP',
      en: 'OPERATIONS & WORKFLOW SOP',
      zh: '生产运营与标准流程(SOP)',
      ja: '業務プロセス・SOP・物流',
      ar: 'العمليات وسلاسل الإمداد وإجراءات التشغيل'
    },
    question: {
      id: 'Bagaimana standarisasi proses operasional dan otomatisasi serah-terima antar divisi (antar gudang, pabrik & sales)?',
      en: 'How standardized and automated are your core operational and delivery processes?',
      zh: '跨部门协作（销售、采购、仓储、生产）的业务交接标准化与自动化水平如何？',
      ja: '部門間（営業・購買・倉庫・製造）の業務引き継ぎの標準化と自動化はどの程度ですか？',
      ar: 'ما مدى توحيد وأتمتة إجراءات تسليم العمليات بين المستودعات والمصانع والمبيعات؟'
    },
    description: {
      id: 'Menganalisis kemacetan proses (bottleneck), entri data berulang (re-entry), dan ketergantungan pada figur kunci.',
      en: 'Analyzes process bottlenecks, manual data re-entry, and dependency on key individuals.',
      zh: '分析流程瓶颈、跨系统重复录入及对核心关键员工的过度依赖。',
      ja: '業務ボトルネック、手作業での二重入力、特定個人への業務依存度を分析します。',
      ar: 'تحليل اختناقات الإجراءات، وإعادة إدخال البيانات يدويًا، والاعتماد المفرط على أفراد.'
    },
    options: [
      {
        text: {
          id: 'Tergantung figur kunci / owner; setiap hari kebakaran jenggot dan miskomunikasi antar divisi',
          en: 'Heavy tribal knowledge; daily firefights and extreme reliance on founders/managers',
          zh: '依赖核心元老经验；日常救火频发，部门间信息脱节严重',
          ja: '属人化が極めて強い——毎日のトラブル対応、創業社長・幹部に過度依存',
          ar: 'اعتماد تام على أفراد محددين؛ أزمات تشغيلية يومية وسوء تواصل بين الأقسام'
        },
        score: 1
      },
      {
        text: {
          id: 'SOP tertulis ada di PDF/kertas, tapi di lapangan jarang dipatuhi secara konsisten',
          en: 'Written SOPs exist on paper or PDFs, but team rarely adheres to them systematically',
          zh: '有纸质或PDF版SOP文件，但实际执行大打折扣',
          ja: 'SOP書類は存在するが形骸化しており、現場では遵守されていない',
          ar: 'إجراءات مكتوبة في ملفات PDF ولكن نادرًا ما يلتزم بها الفريق عمليًا'
        },
        score: 2
      },
      {
        text: {
          id: 'Proses operasional berjalan di software terpisah; masih banyak ketik ulang manual antar modul',
          en: 'Standard operational workflows, but multiple manual handoffs between departments',
          zh: '各部门使用独立系统；模块之间仍需大量人工导出、录入和比对',
          ja: '標準業務はシステム化されているが、部門間で手作業のデータ転記が発生',
          ar: 'أنظمة تشغيل منفصلة مع استمرار الحاجة لإعادة إدخال البيانات يدويًا'
        },
        score: 3
      },
      {
        text: {
          id: 'Alur Terintegrasi & Terukur — SLA antar divisi jelas, tracking pesanan real-time dari PO sampai DO',
          en: 'Digitized processes with SLA tracking and clear cross-functional accountability',
          zh: '全流程数字化——跨部门SLA明确，订单从生成到出库全程节点受控',
          ja: 'デジタル化された統合フロー——部門間SLAが明確、受注から出荷まで追跡可能',
          ar: 'إجراءات رقمية موحدة مع اتفاقيات مستوى خدمة واضحة وتتبع دقيق للمسار'
        },
        score: 4
      },
      {
        text: {
          id: 'Autonomous Orchestration — serah terima otomatis, deteksi bottleneck seketika, dan rute eskalasi pintar',
          en: 'Autonomous Orchestration — automated handoffs, exception routing, and live bottleneck detection',
          zh: '自主调度闭环——异常任务智能路由、秒级瓶颈预警与自动协同调度',
          ja: '自律オーケストレーション——例外自動振り分け、リアルタイム障害検知、AI自動最適化',
          ar: 'تنسيق ذاتي ذكي — توجيه تلقائي للاستثناءات وكشف فوري لاختناقات العمليات'
        },
        score: 5
      }
    ]
  },
  {
    id: 'q_proc_1',
    dimensionId: 'procurement',
    category: {
      id: 'PENGADAAN & PENGELUARAN VENDOR',
      en: 'PROCUREMENT & SUPPLIER SPEND',
      zh: '采购管理与供应商支出',
      ja: '調達・購買・サプライヤー管理',
      ar: 'المشتريات وإدارة إنفاق الموردين'
    },
    question: {
      id: 'Bagaimana konsentrasi vendor utama Anda, standarisasi komparasi harga (3 quotes), dan audit pembayaran ganda?',
      en: 'How effectively do you monitor supplier concentration, quotation normalization, and spend leakage?',
      zh: '企业如何管控核心供应商集中度、三方比价标准化以及避免重复付款与采购溢价？',
      ja: '主要仕入先への依存度、3社相見積もりの標準化、過大・重複支払いの監視状況は？',
      ar: 'كيف تراقب تركيز الموردين ومقارنة عروض الأسعار وتفادي ازدواجية الدفع؟'
    },
    description: {
      id: 'Mendeteksi pembelian kemahalan, maverick buying (pembelian tanpa PO), dan risiko ketergantungan 1 supplier.',
      en: 'Detects overpayment, maverick spending, and vendor dependency risks.',
      zh: '排查采购溢价、无单采购（Maverick Buying）及单一供应商卡脖子风险。',
      ja: '仕入れ価格の乖離、未承認発注、サプライチェーン単一依存リスクを検出します。',
      ar: 'كشف المغالاة في الأسعار، والمشتريات العشوائية، ومخاطر الاعتماد على مورد واحد.'
    },
    options: [
      {
        text: {
          id: 'Pesan barang via telepon / WA; tidak ada komparasi harga formal; harga naik tidak terpantau',
          en: 'Orders placed over WhatsApp/phone without standardized RFQ comparisons',
          zh: '通过微信/电话非正式采购；无正规比价，供应商涨价难以及时识别',
          ja: 'チャットや電話で発注、相見積もりなし、仕入れ価格の変動を把握できていない',
          ar: 'الطلبات تتم بالهاتف أو الواتساب دون مقارنة رسمية؛ زيادات الأسعار غير مراقبة'
        },
        score: 1
      },
      {
        text: {
          id: 'Ada beberapa supplier tapi tidak ada evaluasi performa atau benchmarking harga pasar',
          en: 'Multiple suppliers used, but no price benchmark comparison or formal vendor evaluations',
          zh: '有合作供应商名单，但缺乏市场基准价对比及定期的绩效评审机制',
          ja: '複数業者があるが、市場相場との比較や仕入先評価が制度化されていない',
          ar: 'تعدد في الموردين دون تقييم دوري للأداء أو مقارنة بالأسعار السائدة في السوق'
        },
        score: 2
      },
      {
        text: {
          id: 'Sistem PO aktif; kebijakan 3 penawaran berjalan untuk barang besar, tapi barang rutin lolos',
          en: 'PO-based purchasing system, but top suppliers hold high price leverage',
          zh: '具备采购订单(PO)流程；重大资产有三方比价，但日常耗材与辅料存在审批盲区',
          ja: '発注管理(PO)はあるが、主要サプライヤーに対する価格交渉力が弱い',
          ar: 'نظام أوامر شراء رسمي مع فجوات في مراقبة المشتريات المتكررة ذات القيمة الأقل'
        },
        score: 3
      },
      {
        text: {
          id: 'Aturan 3-Quotes Tertib & Rekanan Terdaftar — analisis konsentrasi supplier dipantau per kuartal',
          en: 'Structured 3-quote policy with approved vendor list and periodic payment terms review',
          zh: '严格合规的三方比价库与合格供应商名录，按季度审视集中度与账期',
          ja: '3社相見積もりの徹底、承認済ベンダー管理、定期的な支払条件見直し',
          ar: 'سياسة صارمة لـ 3 عروض أسعار وقائمة موردين معتمدين ومراجعة دورية للشروط'
        },
        score: 4
      },
      {
        text: {
          id: 'Intelligent Spend Engine — audit PO vs Faktur otomatis, deteksi anomali harga AI, negosiasi terarah',
          en: 'Intelligent Spend Management — automated RFQ normalization, price auditing, and contract analytics',
          zh: 'AI智能采购风控——报价单结构化比对、三单匹配自动核验、价格异常秒级预警',
          ja: 'インテリジェント調達管理——AI自動相見積照合・三面突合検知・契約単価モニタリング',
          ar: 'إدارة مشتريات ذكية — تدقيق تلقائي ثلاثي للأسعار والفواتير وكشف استباقي للهدر'
        },
        score: 5
      }
    ]
  },
  {
    id: 'q_hr_1',
    dimensionId: 'people',
    category: {
      id: 'SDM, PRODUKTIVITAS & STRUKTUR',
      en: 'PEOPLE & HR CAPACITY',
      zh: '组织效能与人才梯队',
      ja: '組織能力・人的生産性・人事',
      ar: 'الموارد البشرية والإنتاجية المؤسسية'
    },
    question: {
      id: 'Seberapa jelas metrik kinerja (KPI), kejelasan job description, dan kecepatan proses rekrutmen karyawan?',
      en: 'How clearly are organizational capacity, performance KPIs, and talent workflows managed?',
      zh: '企业的组织产能规划、关键绩效指标(KPI)量化度及关键岗位招聘交付周期表现如何？',
      ja: '組織の人員配置、成果KPIの客観性、採用・育成プロセスの効率は適正ですか？',
      ar: 'ما مدى وضوح مؤشرات الأداء (KPIs) وسرعة وكفاءة استقطاب وتوظيف الكفاءات؟'
    },
    description: {
      id: 'Menilai produktivitas per karyawan (revenue per head), kelebihan beban kerja, dan risiko turn-over staf kunci.',
      en: 'Assesses employee productivity, hiring bottlenecks, and operational leverage.',
      zh: '衡量人均产值（Revenue per Head）、人员负荷超限及核心技术人才流失风险。',
      ja: '一人当たり売上高、残業過多による離職リスク、採用リードタイムを評価します。',
      ar: 'تقييم إنتاجية الموظف، والاختناقات في التوظيف، واستقرار الكفاءات المحورية.'
    },
    options: [
      {
        text: {
          id: 'Jobdesc kabur / serabutan; rekrutmen reaktif saat sudah darurat; penilaian sangat subjektif',
          en: 'Roles are fluid and undefined; hiring is reactive to sudden emergencies',
          zh: '权责边界模糊；缺人才紧急招人；绩效全凭主观好恶',
          ja: '職務定義が曖昧、人手不足が危機的になってから採用活動、評価は主観的',
          ar: 'الأدوار غير محددة بدقة، والتوظيف رد فعل للأزمات، وتقييم الأداء ذاتي'
        },
        score: 1
      },
      {
        text: {
          id: 'Ada uraian tugas, tapi KPI jarang diukur; rekrutmen butuh 2-3 bulan untuk posisi penting',
          en: 'Job descriptions exist, but performance metrics (KPIs) are subjective or rarely reviewed',
          zh: '有岗位说明书，但考核缺少客观数据支撑；关键岗位招募周期长达2-3个月',
          ja: '職務記述書はあるがKPI未連動、主要ポジションの採用に2〜3ヶ月要する',
          ar: 'بطاقات وصف وظيفي متوفرة لكن المؤشرات غير مرتبطة بالبيانات والتوظيف بطيء'
        },
        score: 2
      },
      {
        text: {
          id: 'KPI bulanan berjalan; HRIS digunakan untuk absensi dan payroll, tapi belum terhubung produktivitas riil',
          en: 'Monthly KPI reviews conducted, but onboarding and recruiting processes remain slow',
          zh: '定期开展月度KPI考评；使用人事系统算薪与考勤，但未直接挂钩业务单元实际产出',
          ja: '月次KPI運用あり、勤怠・給与計算はシステム化、しかし実務生産性との連動は不十分',
          ar: 'مراجعات شهرية للأداء ونظام موارد بشرية للمرتبات دون ارتباط بالإنتاجية الفعلية'
        },
        score: 3
      },
      {
        text: {
          id: 'Sistem Scorecard Baku — target revenue per headcount dipantau, talent band dan jenjang karier jelas',
          en: 'Transparent scorecard system with regular accountability reviews and clear talent bands',
          zh: '透明的平衡计分卡体系——监控人均产值与效能指标，职级晋升与薪酬体系成熟',
          ja: '体系的スコアカード導入——従業員1人当たり収益性を監視、評価と報酬が連動',
          ar: 'بطاقة أداء متوازنة شفافة، ومراقبة دقيقة لمتوسط إنتاجية الفرد ومسارات واضحة'
        },
        score: 4
      },
      {
        text: {
          id: 'Talent Intelligence Berkelanjutan — AI screening kandidat instan, penyeimbang beban kerja otomatis',
          en: 'Optimized Talent Intelligence — AI-assisted CV screening, capacity balancing, and skill mapping',
          zh: '持续人才智能中枢——AI秒级简历画像匹配、各产线工时负载动态平衡与技能图谱',
          ja: 'タレント・インテリジェンス——AI書類スクリーニング・負荷分散自動化・スキルマップ連動',
          ar: 'منظومة ذكاء موارد بشرية — فحص ذكي فوري للسير الذاتية وتوازن تلقائي لأعباء العمل'
        },
        score: 5
      }
    ]
  },
  {
    id: 'q_risk_1',
    dimensionId: 'risk',
    category: {
      id: 'PENGENDALIAN INTERNAL & KEPATUHAN (SoD)',
      en: 'RISK, INTERNAL CONTROL & SoD',
      zh: '内部控制、不相容职务分离(SoD)与合规',
      ja: '内部統制・職務分掌(SoD)・法令順守',
      ar: 'الرقابة الداخلية والامتثال وفصل المهام'
    },
    question: {
      id: 'Bagaimana penegakan Segregation of Duties (SoD) dan proteksi fraud dalam persetujuan pengeluaran uang?',
      en: 'How mature are your internal controls, Segregation of Duties (SoD), and fraud prevention policies?',
      zh: '企业在资金支出、采购审批中的不相容职务分离(SoD)及防舞弊内控机制健全程度如何？',
      ja: '支出承認や購買における職務分掌（SoD）の徹底、不正防止ガバナンスの成熟度は？',
      ar: 'ما مدى نضج ضوابط الرقابة الداخلية وفصل المهام (SoD) لمنع الاحتيال وتكرار الصرف؟'
    },
    description: {
      id: 'Mencegah 1 orang bisa membuat PO, menyetujui faktur, dan mentransfer uang tanpa otorisasi independen.',
      en: 'Ensures capital protection, audit readiness, and prevention of single-point approvals.',
      zh: '杜绝同一个人既能建单、又能审核发票并最终对外打款的重大内控高危漏洞。',
      ja: '発注・検収・請求承認・出金が同一人物によって処理されるガバナンスリスクを排除します。',
      ar: 'منع قيام شخص واحد بإنشاء أمر الشراء واعتماد الفاتورة وتنفيذ التحويل البنكي.'
    },
    options: [
      {
        text: {
          id: 'Satu orang memegang kendali penuh dari buat PO sampai transfer bank; rawan fraud',
          en: 'Single person can create PO, approve invoice, and release payment with minimal review',
          zh: '同一人掌握从制单、审单到网银转账的全流程；存在严重舞弊隐患',
          ja: '1名の担当者が発注から送金承認まで兼任、重大な不正リスクが存在',
          ar: 'شخص واحد يتحكم في المسار من إنشاء الطلب حتى الصرف البنكي دون تدقيق مستقل'
        },
        score: 1
      },
      {
        text: {
          id: 'Tanda tangan ganda hanya untuk nominal besar; transaksi rutin tidak dicek silang secara formal',
          en: 'Basic dual-signatures required only on checks or transfers exceeding arbitrary limits',
          zh: '仅对大额支出要求双签；日常高频小额支付缺乏严谨的三单独立勾稽',
          ja: '高額決済のみ二重承認、日常の経常出金は実質ノーチェックで処理',
          ar: 'توقيع مزدوج فقط للمبالغ الكبيرة، بينما تمر المدفوعات الدورية دون تدقيق كافٍ'
        },
        score: 2
      },
      {
        text: {
          id: 'Kebijakan internal control ada, namun audit hanya dilakukan 1 tahun sekali oleh KAP eksternal',
          en: 'Standard internal control policies in place, but reviewed only once a year during external audit',
          zh: '具备内控文本，但通常仅在年终外部审计时由会计师事务所抽查',
          ja: '内部統制方針はあるが、年1回の外部監査時にのみ形骸的に検証される',
          ar: 'سياسات رقابية موجودة ولكن يتم مراجعتها مرة واحدة سنويًا عبر المدقق الخارجي'
        },
        score: 3
      },
      {
        text: {
          id: 'Role Matrix ERP Ketat — pembuat PO terpisah mutlak dari pelepas dana bank; review berkala berjalan',
          en: 'Enforced role-based ERP access with Segregation of Duties (SoD) on material expenditures',
          zh: '系统强制权限隔离——制单岗与网银出纳岗严格物理分离，每季度开展SoD权限审计',
          ja: '権限マトリックスの徹底——発注者と出金責任者の完全分離、四半期レビュー実施',
          ar: 'صلاحيات ERP صارمة — فصل قاطع بين مدخل الطلب ومسؤول التحويل مع تدقيق دوري'
        },
        score: 4
      },
      {
        text: {
          id: 'Continuous Internal Control AI — audit anomali transaksi 24/7, blokir invoice dobel seketika',
          en: 'Continuous Internal Control Engine — 24/7 autonomous anomaly, duplicate, and policy testing',
          zh: '连续内控AI引擎——7x24小时全量扫描交易流水、瞬时阻断重复发票与阴阳合同',
          ja: '常時内部統制エンジン——24時間全件トランザクション異常検知、二重請求を自動遮断',
          ar: 'محرك رقابة مستمر بالذكاء الاصطناعي — فحص فوري 24/7 وحظر تلقائي لأي ازدواجية'
        },
        score: 5
      }
    ]
  },
  {
    id: 'q_tech_1',
    dimensionId: 'technology',
    category: {
      id: 'KONEKTIVITAS SISTEM & DATA (ERP, BANK & PAJAK)',
      en: 'SYSTEM & DATA FABRIC (ERP, BANKING & TAX)',
      zh: '系统与数据中枢 (ERP、银行及税务集成)',
      ja: 'システム連携・データファブリック (ERP・銀行・税務)',
      ar: 'تكامل الأنظمة والبيانات (ERP، البنوك، والضرائب)'
    },
    question: {
      id: 'Bagaimana integrasi antara sistem utama perusahaan Anda (SAP/ERP, Rekening Bank, DJP Pajak, CRM, WMS)?',
      en: 'How unified and connected are your core business systems (ERP, CRM, Banking, POS, HR)?',
      zh: '企业核心业务软件（SAP/ERP、企业网银、电子税务局、CRM、仓储WMS）的数据贯通度如何？',
      ja: '中核システム（SAP/ERP、銀行、税務、CRM、在庫管理）の連携・統合状況は？',
      ar: 'ما مدى تكامل وتوحيد الأنظمة الرئيسية لشركتك (ERP، الحسابات البنكية، الضرائب، والمستودعات)؟'
    },
    description: {
      id: 'Mendeteksi data silos, waktu habis untuk rekonsiliasi manual, dan ketidakterhubungan antara pembukuan dengan mutasi bank.',
      en: 'Detects data silos, manual reconciliation hours, and software sprawl.',
      zh: '识别信息孤岛、财务手工对账耗时及账面与银行实际流水脱节问题。',
      ja: 'データサイロ、手作業による残高突合コスト、帳簿と銀行明細の不整合を検出します。',
      ar: 'كشف جزر البيانات المنعزلة، وإهدار الوقت في المطابقة اليدوية بين الدفاتر وكشوف البنك.'
    },
    options: [
      {
        text: {
          id: 'Data terisolasi total — tiap tim pakai software / file Excel terpisah; tidak ada sinkronisasi',
          en: 'Complete data silos — each team uses disconnected tools and personal spreadsheets',
          zh: '数据完全割裂——各部门使用不同软件或私有Excel，信息互不相通',
          ja: '完全なデータ分断——各部署が個別スプレッドシートを使用、連携なし',
          ar: 'انعزال تام للبيانات — كل قسم يعمل بجداول بيانات منفصلة بدون مزامنة'
        },
        score: 1
      },
      {
        text: {
          id: 'Ada software akuntansi, tapi butuh export-import file CSV/Excel manual berjam-jam setiap hari',
          en: 'Central accounting software exists, but manual CSV exports/imports required daily',
          zh: '有基础财务软件，但每天需人工导出/导入大量CSV报表才能拼凑全貌',
          ja: '会計ソフトはあるが、毎日手作業でCSVエクスポート・インポートを実施',
          ar: 'برنامج محاسبة موجود، لكن تجميع التقارير يتطلب تصدير واستيراد يدوي يومي'
        },
        score: 2
      },
      {
        text: {
          id: 'ERP berjalan, tapi manajemen kesulitan melihat laporan konsolidasi lintas divisi secara cepat',
          en: 'ERP runs the business, but management cannot get cross-functional insights easily',
          zh: '已上线ERP，但管理层难以快速调阅跨业务部门的全局穿透分析报表',
          ja: 'ERPは稼働しているが、経営陣が部門横断のリアルタイム経営指標を把握しにくい',
          ar: 'نظام ERP يعمل، لكن الإدارة تواجه صعوبة في استخراج رؤية موحدة وسريعة عبر الأقسام'
        },
        score: 3
      },
      {
        text: {
          id: 'Koneksi API Terintegrasi — sinkronisasi harian otomatis antara ERP, mutasi bank, dan sistem POS/Sales',
          en: 'Integrated API connections between major systems with automated daily sync',
          zh: '主流系统API打通——ERP、银行对账、销售系统每日自动化夜间跑批同步',
          ja: 'APIによる主要システム統合——ERP・銀行口座・販売管理が日次自動同期',
          ar: 'تكامل عبر واجهات برمجة التطبيقات (APIs) ومزامنة يومية مؤتمتة بين الأنظمة والمصارف'
        },
        score: 4
      },
      {
        text: {
          id: 'BuildUp Context Graph™ — lapisan kecerdasan vendor-agnostic di atas seluruh sistem secara real-time',
          en: 'BuildUp Business Context Graph — vendor-agnostic real-time intelligence layer above all software',
          zh: 'BuildUp商业上下文图谱——跨系统非侵入式实时数据中枢，实现多系统因果穿透诊断',
          ja: 'BuildUp コンテキストグラフ——既存システムを活かした全社リアルタイム自律分析基盤',
          ar: 'نظام ربط ذكي موحد — طبقة ذكاء أعمال تعلو جميع الأنظمة وتوفر تشخيصًا فوريًا شاملاً'
        },
        score: 5
      }
    ]
  },
  {
    id: 'q_strat_1',
    dimensionId: 'strategy',
    category: {
      id: 'EKSEKUSI STRATEGIS & SIMULASI EBITDA',
      en: 'STRATEGIC EXECUTION & EBITDA SIMULATION',
      zh: '战略执行力与EBITDA测算',
      ja: '戦略実行・EBITDAシミュレーション',
      ar: 'التنفيذ الاستراتيجي ومحاكاة الأرباح'
    },
    question: {
      id: 'Seberapa tangkas manajemen dalam mensimulasikan skenario bisnis (Base/Upside/Downside) dan mengawal eksekusi 90-hari?',
      en: 'How dynamically do you model scenarios and translate strategic goals into daily actions?',
      zh: '管理层在动态模拟经营场景（基础/上行/下行压力）并将战略目标拆解至90天执行闭环的敏捷度如何？',
      ja: '事業シナリオ（楽観・基本・悲観）のシミュレーションと90日変革ロードマップの実行力は？',
      ar: 'ما مدى مرونة الإدارة في نمذجة سيناريوهات الأعمال وترجمة الأهداف إلى خطة تنفيذية لمدة 90 يومًا؟'
    },
    description: {
      id: 'Mengukur kepastian pencapaian target profitabilitas, adaptasi terhadap guncangan pasar, dan koordinasi jajaran direksi.',
      en: 'Measures agility, continuous reforecasting, and alignment across leadership.',
      zh: '衡量目标利润达成的确定性、应对宏观市场波动的敏捷度及高管团队的战略共识。',
      ja: '目標利益達成の確実性、市場変動への適応スピード、経営幹部の足並みを測定します。',
      ar: 'قياس دقة تحقيق أهداف الربحية، والقدرة على التكيف مع تقلبات السوق، ومواءمة القيادة.'
    },
    options: [
      {
        text: {
          id: 'Tidak ada dokumen strategi baku; eksekusi bersifat reaktif dari minggu ke minggu',
          en: 'No formal strategy document; reactive execution based on weekly survival priorities',
          zh: '缺乏正式战略规划；完全依据每周临时突发事件被动应对',
          ja: '明文化された戦略なし、日々の短期案件に追われる場当たり的経営',
          ar: 'غياب وثيقة استراتيجية رسمية؛ التنفيذ يعتمد على أولويات البقاء الأسبوعية'
        },
        score: 1
      },
      {
        text: {
          id: 'Rapat kerja tahunan ada, tapi dokumen rencana bisnis diarsipkan dan jarang dipantau setelah Q1',
          en: 'Annual strategic planning meeting done once, but document forgotten after Q1',
          zh: '有年度战略经营会，但规划方案在第一季度后往往被搁置、缺乏复盘',
          ja: '年1回の経営合宿はあるが、策定した事業計画はQ1以降放置されがち',
          ar: 'اجتماع سنوي للتخطيط الاستراتيجي، لكن الخطة توضع في الأدراج بعد الربع الأول'
        },
        score: 2
      },
      {
        text: {
          id: 'Review target kuartalan ada, tapi terpisah dari data keuangan dan operasional harian di lapangan',
          en: 'Quarterly OKR or KPI reviews, but disconnected from live financial and operational data',
          zh: '进行季度目标复盘，但复盘会议与日常真实的财务与业务流水数据严重脱节',
          ja: '四半期レビューは実施するが、現場の財務・業務実態データと乖離している',
          ar: 'مراجعة ربع سنوية للأهداف، لكنها منفصلة عن بيانات العمليات والمالية اليومية'
        },
        score: 3
      },
      {
        text: {
          id: 'Roadmap Eksekusi 90-Hari Terstruktur — pemantauan target berkala dengan review deviasi yang ketat',
          en: 'Active 90-day execution roadmap with disciplined milestone tracking and variance review',
          zh: '结构化90天推进路线图——关键里程碑定期穿透审查，偏差原因限期归因整改',
          ja: '90日変革ロードマップの定着——進捗マイルストーンを厳格に追跡・差異分析',
          ar: 'خطة تنفيذية ربع سنوية (90 يومًا) واضحة مع تتبع منضبط للمعالم والفروقات'
        },
        score: 4
      },
      {
        text: {
          id: 'Continuous Strategic Business Engine — simulasi dampak EBITDA live, linked ke Decision Engine otomatis',
          en: 'Continuous Strategic Business Planner — live scenario simulations linked to execution engine',
          zh: '自适应战略规划引擎——动态测算EBITDA影响并联动决策对象自动下发任务',
          ja: '継続的戦略プランナー——EBITDA影響を即座にシミュレーション、意思決定と直結',
          ar: 'محرك استراتيجي مستمر — محاكاة فورية لتأثيرات الأرباح وربطها المباشر بقرارات التنفيذ'
        },
        score: 5
      }
    ]
  }
];

// ERP & Client Systems Data Catalog for Request 5
export interface ERPConnectorSpec {
  id: string;
  name: string;
  category: 'Tier 1 Global ERP' | 'SME & Regional ERP' | 'Cash & Banking API' | 'Tax & Compliance' | 'Supply Chain & POS';
  description: Record<Language, string>;
  logoIcon: string;
  dataReadCapabilities: Record<Language, string[]>;
  typicalDiagnosticsUncovered: Record<Language, string[]>;
  supportedProtocols: string[];
  latency: string;
  isPopularInID: boolean;
}

export const ERP_CONNECTORS: ERPConnectorSpec[] = [
  {
    id: 'sap_s4hana',
    name: 'SAP S/4HANA & SAP ECC 6.0',
    category: 'Tier 1 Global ERP',
    description: {
      id: 'Koneksi non-invasif ke modul SAP FI/CO, MM, SD, dan PP via SAP NetWeaver RFC / OData API aman.',
      en: 'Non-invasive connector to SAP FI/CO, MM, SD, and PP via secure SAP NetWeaver RFC / OData APIs.',
      zh: '通过高安全SAP NetWeaver RFC及OData API，非侵入式直连SAP FI/CO、MM、SD与PP模块。',
      ja: '安全なNetWeaver RFC/OData API経由でSAP FI/CO、MM、SD、PPモジュールに非侵入接続。',
      ar: 'اتصال آمن غير اختراقي بوحدات SAP المالية والمشتريات والمبيعات عبر NetWeaver RFC و OData.'
    },
    logoIcon: 'sap',
    dataReadCapabilities: {
      id: ['General Ledger & Trial Balance', 'Aging Piutang AR & Hutang AP', 'Purchase Orders (PO) & 3-Way Match', 'Master Data Vendor & Material'],
      en: ['General Ledger & Trial Balance', 'AR/AP Aging Schedules', 'Purchase Orders & 3-Way Match Logs', 'Vendor & Material Master Data'],
      zh: ['总账与科目余额表', '应收应付账龄分析表', '采购订单及三单匹配日志', '供应商及物料主数据'],
      ja: ['総勘定元帳・試算表', '売掛金・買掛金エイジング', '購買発注(PO)・3面突合ログ', '仕入先・品目マスタ'],
      ar: ['دفتر الأستاذ العام وميزان المراجعة', 'أعمار الديون والمستحقات', 'أوامر الشراء ومطابقة الفواتير', 'بيانات الموردين والمواد']
    },
    typicalDiagnosticsUncovered: {
      id: ['Kebocoran modal kerja akibat payment terms tidak simetris', 'Faktur ganda lolos kliring', 'Diskon sales tidak tercatat di Master'],
      en: ['Asymmetric payment terms trapping cash', 'Duplicate invoices escaping clearing', 'Unapproved sales discounting not on master'],
      zh: ['上下游账期不对称导致的营运资金被占', '漏过核销检查的重复采购发票', '未经主数据授权的线下特批折扣'],
      ja: ['回収・支払サイトの歪みによる資金滞留', '消込漏れの二重請求書', '未承認の個別値引きによる利益毀損'],
      ar: ['فخ السيولة الناتج عن عدم اتساق شروط الدفع', 'فواتير مكررة تجاوزت الفحص', 'خصومات مبيعات غير معتمدة']
    },
    supportedProtocols: ['SAP OData v4', 'RFC / BAPI', 'Certified Secure Gateway', 'Encrypted SFTP Batch'],
    latency: 'Real-time (< 3s) / Batch',
    isPopularInID: true
  },
  {
    id: 'oracle_netsuite',
    name: 'Oracle NetSuite & Cloud ERP',
    category: 'Tier 1 Global ERP',
    description: {
      id: 'Sinkronisasi read-only multi-entitas anak perusahaan, bill of materials, dan rekonsiliasi mata uang asing.',
      en: 'Multi-subsidiary read-only synchronization for entities, bills of materials, and multi-currency ledger.',
      zh: '多子公司实体、物料清单(BOM)及多币种账务的只读自动化穿透同步。',
      ja: 'グループ複数法人、部品表(BOM)、多通貨帳簿の自動読み取り同期。',
      ar: 'مزامنة للقراءة فقط للشركات التابعة المتعددة، وجداول المواد، والعملات المتعددة.'
    },
    logoIcon: 'oracle',
    dataReadCapabilities: {
      id: ['Multi-subsidiary Consolidation', 'Inventory Valuation FIFO/Average', 'Sales Order to Fulfillment Audit', 'Intercompany Balances'],
      en: ['Multi-subsidiary Consolidation', 'Inventory Valuation FIFO/Average', 'Sales Order to Fulfillment Audit', 'Intercompany Balances'],
      zh: ['多子公司集团合并报表', '存货计价与库龄分析', '销售订单到交付全生命周期', '内部交易往来核对'],
      ja: ['複数子会社連結データ', '在庫評価・滞留在庫分析', '受注から出荷までの統制追跡', 'グループ内取引相殺照合'],
      ar: ['توحيد القوائم للشركات التابعة', 'تقييم المخزون وتحليل الأعمار', 'تدقيق دورة الطلب حتى التسليم', 'مطابقة الحسابات البينية']
    },
    typicalDiagnosticsUncovered: {
      id: ['Persediaan dead-stock terpendam di gudang cabang', 'Eliminasi transaksi antar-entitas tidak balance', 'Biaya pengiriman menyedot margin'],
      en: ['Hidden dead-stock accumulated in branch warehouses', 'Unbalanced intercompany elimination', 'Logistics freight eating margins'],
      zh: ['分仓隐性滞销死库占用资金', '内部交易未抵销导致的虚增利润', '隐藏物流运费侵蚀实际到手毛利'],
      ja: ['地方倉庫に滞留するデッドストック', '内部取引相殺のアンバランス', '運送費負担による粗利の圧迫'],
      ar: ['مخزون راكد غير متحرك في الفروع', 'فروقات في مطابقة المعاملات الداخلية', 'تكاليف الشحن غير المحسوبة تأكل الهوامش']
    },
    supportedProtocols: ['SuiteTalk REST API', 'SuiteTalk SOAP', 'TBA (Token-Based Auth)'],
    latency: 'Near Real-time (5s)',
    isPopularInID: true
  },
  {
    id: 'accurate_online',
    name: 'Accurate Online & Desktop',
    category: 'SME & Regional ERP',
    description: {
      id: 'Sistem akuntansi dan ERP paling populer di Indonesia untuk perusahaan bertumbuh dan distributor nasional.',
      en: 'The most widely deployed accounting & ERP software in Indonesia for growing mid-market distributors.',
      zh: '印尼中型企业与全国分销商使用率极高的主流本土财税与进销存ERP系统。',
      ja: 'インドネシアの中堅流通・卸売企業で最も普及している代表的会計・ERPシステム。',
      ar: 'النظام المحاسبي وERP الأكثر انتشارًا في إندونيسيا للشركات التجارية والمتوسطة.'
    },
    logoIcon: 'accurate',
    dataReadCapabilities: {
      id: ['Faktur Penjualan & Pembelian', 'Jurnal Umum & Buku Besar', 'Kartu Stok & Mutasi Antar Gudang', 'Pajak PPN & PPh Keluaran/Masukan'],
      en: ['Sales & Purchase Invoices', 'General Journal & GL Ledger', 'Stock Cards & Warehouse Transfers', 'VAT / PPN & Withholding Tax Records'],
      zh: ['销售与采购原始发票', '总账与通用日记账', '库存台账与调拨单', '增值税PPN与预扣税抵扣记录'],
      ja: ['売上・仕入請求書明細', '総勘定元帳・仕訳帳', '在庫台帳・倉庫間移動記録', '付加価値税(PPN)・源泉税データ'],
      ar: ['فواتير المبيعات والمشتريات', 'دفاتر اليومية والأستاذ العام', 'بطاقات المخزون وحركة المستودعات', 'سجلات ضريبة القيمة المضافة والاستقطاع']
    },
    typicalDiagnosticsUncovered: {
      id: ['Piutang distributor macet di atas 90 hari tanpa denda', 'Stok selisih fisik vs sistem', 'Klaim diskon promosi ganda oleh toko'],
      en: ['Distributor receivables overdue >90 days unpenalized', 'Physical vs system stock variances', 'Duplicate promotional discount claims'],
      zh: ['分销商逾期超90天未收回且无滞纳约束', '账实不符与盘点损耗差异', '下游渠道重复申请促销费用折让'],
      ja: ['90日超の販売代理店売掛焦げ付き', '帳簿在庫と実地棚卸の重大な差異', '取引先による販促リベートの二重請求'],
      ar: ['ديون تجارية متأخرة لأكثر من 90 يومًا بدون غرامات', 'فروقات بين المخزون الدفتري والفعلي', 'مطالبات خصم ترويجي مكررة']
    },
    supportedProtocols: ['Accurate Open API OAuth2', 'Secure Webhook', 'CSV Scheduled Connector'],
    latency: 'Real-time Webhook',
    isPopularInID: true
  },
  {
    id: 'jurnal_mekari',
    name: 'Jurnal by Mekari',
    category: 'SME & Regional ERP',
    description: {
      id: 'Platform cloud accounting modern terintegrasi dengan ekosistem perbankan Indonesia dan Talenta HR.',
      en: 'Modern cloud accounting platform integrated with Indonesian banking rails and payroll ecosystem.',
      zh: '深度连接印尼银行业生态与本地薪酬考勤的现代化云财务中台。',
      ja: 'インドネシアの銀行決済網や給与計算と直結したモダンクラウド会計基盤。',
      ar: 'منصة محاسبة سحابية حديثة متصلة بالقنوات البنكية الإندونيسية ومسيرات الرواتب.'
    },
    logoIcon: 'mekari',
    dataReadCapabilities: {
      id: ['Laporan Laba Rugi Riil & Cash Flow', 'Daftar Tagihan Jatuh Tempo', 'Rekonsiliasi Bank Otomatis', 'Beban Gaji & Tunjangan Operasional'],
      en: ['Live P&L & Cash Flow Statements', 'Aging Invoices Due', 'Bank Feed Reconciliation Status', 'Payroll & Operational Expense Runs'],
      zh: ['实时利润表与资金流量表', '到期应付款与待催款项', '网银流水自动对账状态', '薪酬福利与日常经营性支出'],
      ja: ['リアルタイム損益計算書・CF計算書', '期日到来請求書リスト', '自動銀行照合ステータス', '人件費・経費精算データ'],
      ar: ['قوائم الأرباح والخسائر والتدفق النقدي الحية', 'الفواتير المستحقة للتحصيل', 'حالة المطابقة البنكية التلقائية', 'بيانات الرواتب والمصروفات']
    },
    typicalDiagnosticsUncovered: {
      id: ['Beban langganan software SaaS ganda', 'Keterlambatan penagihan invoice rata-rata 14 hari', 'Biaya entertainment tanpa bukti pengeluaran'],
      en: ['Redundant shadow SaaS subscriptions', '14-day average delay in issuing client invoices', 'Travel/entertainment expenses lacking receipts'],
      zh: ['重复购买的无用SaaS软件订阅支出', '客户发票开具平均滞后14天', '缺乏合规原始凭证的差旅招待费用'],
      ja: ['重複契約された不要なSaaSサブスク', '請求書発行の平均14日遅延', '領収書不備の交際費・出張経費'],
      ar: ['اشتراكات برمجيات سحابية مكررة غير مستغلة', 'تأخر إصدار الفواتير بمتوسط 14 يومًا', 'مصاريف نثرية وترفيه بدون مستندات إثبات']
    },
    supportedProtocols: ['Mekari Open API OAuth2', 'REST API Bearer Token'],
    latency: 'Real-time',
    isPopularInID: true
  },
  {
    id: 'odoo_erp',
    name: 'Odoo Enterprise & Community',
    category: 'SME & Regional ERP',
    description: {
      id: 'Sistem modular open ERP untuk manufaktur, logistik, perhotelan, ritel, dan jasa profesional.',
      en: 'Modular ERP for manufacturing, multi-warehouse logistics, retail, and professional services.',
      zh: '广泛应用于离散制造、多仓跨境物流、零售及专业服务业的模块化ERP。',
      ja: '製造業、複数拠点物流、リテール、プロフェッショナルサービス向け統合型ERP。',
      ar: 'نظام تخطيط موارد معياري للصناعة، وإدارة المستودعات، والتجزئة، والخدمات المهنية.'
    },
    logoIcon: 'odoo',
    dataReadCapabilities: {
      id: ['Manufacturing Work Orders & BOM', 'Inventory Valuation & Scrap Rate', 'Procurement RFQ & Purchase Orders', 'Customer CRM & Sales pipeline'],
      en: ['Manufacturing Work Orders & BOM', 'Inventory Valuation & Scrap Rate', 'Procurement RFQ & Purchase Orders', 'Customer CRM & Sales Pipeline'],
      zh: ['生产工单执行与BOM损耗率', '库存估值与报废率', '采购询价与采购合同', '客户CRM与商机推进漏斗'],
      ja: ['製造作業指示・BOM歩留まり率', '在庫評価額・廃棄ロス率', '調達相見積もり・発注書', '顧客CRM・営業パイプライン'],
      ar: ['أوامر الإنتاج الصناعي ومعدلات الهدر', 'تقييم المخزون ونسب التلف', 'طلبات عروض الأسعار وعقود التوريد', 'إدارة علاقات العملاء وفرص البيع']
    },
    typicalDiagnosticsUncovered: {
      id: ['Scrap / limbah produksi melebihi batas standar 4%', 'Lead time pemenuhan pesanan tertahan di approval', 'Lead CRM tidak pernah di-follow-up'],
      en: ['Production scrap rates exceeding 4% benchmark', 'Order fulfillment lead-time stalled in approval', 'Inbound CRM leads abandoned without contact'],
      zh: ['生产废品率与材料损耗超标4%以上', '订单交付周期受困于多级冗余审批', '市场投放进线线索逾期无人跟进'],
      ja: ['製造不良率・端材ロスが基準値4%を超過', '承認待ちによるリードタイムの異常長期化', 'フォローされずに放置された見込み客'],
      ar: ['نسب هدر وتلف المواد تتجاوز المعدل الطبيعي 4%', 'تأخر دورة تسليم الطلبات بسبب اعتمادات معلقة', 'فرص بيعية واردة مهملة بدون متابعة']
    },
    supportedProtocols: ['Odoo XML-RPC', 'JSON-RPC', 'PostgreSQL Direct Read-Replica'],
    latency: 'Sub-second / Direct',
    isPopularInID: true
  },
  {
    id: 'bca_klikbca_bisnis',
    name: 'KlikBCA Bisnis & Cash Management API',
    category: 'Cash & Banking API',
    description: {
      id: 'Koneksi API perbankan langsung ke rekening giro korporat BCA, Mandiri, BRI, dan BNI untuk rekonsiliasi kas.',
      en: 'Direct corporate banking API integration with BCA, Mandiri, BRI, and BNI cash management systems.',
      zh: '印尼最大私立及国有银行（BCA、Mandiri、BRI、BNI）企业资金池直连与对账。',
      ja: 'インドネシア大手銀行（BCA・Mandiri・BRI・BNI）の法人口座・入出金明細API直結。',
      ar: 'اتصال مباشر بحسابات البنوك الكبرى (BCA، Mandiri، وغيرها) لإدارة ومطابقة السيولة.'
    },
    logoIcon: 'bank',
    dataReadCapabilities: {
      id: ['Mutasi Rekening Giro Real-time', 'Status Pembayaran Payroll & VA', 'Status Kliring Giro Bilyet', 'Deposito & Fasilitas Pinjaman Plafon'],
      en: ['Real-time Current Account Statements', 'Payroll & Virtual Account (VA) Settlement', 'Cheque / Bilyet Giro Clearing Status', 'Time Deposits & Credit Facility Drawdowns'],
      zh: ['对公结算账户实时交易明细', '员工代发薪资与虚拟账号(VA)到账', '支票及期票(Bilyet Giro)承兑状态', '定期存单及银行授信额度动用率'],
      ja: ['当座預金リアルタイム入出金明細', '給与振込・バーチャル口座決済確認', '手形・期日小切手の取立・決済状況', '定期預金残高・銀行融資枠の実行状況'],
      ar: ['كشوف الحسابات الجارية لحظة بلحظة', 'تسوية المدفوعات وحسابات التحصيل الافتراضية', 'حالة مقاصة الشيكات البنكية', 'الودائع والتسهيلات الائتمانية المستخدمة']
    },
    typicalDiagnosticsUncovered: {
      id: ['Uang kas mengendap tidak berbunga (idle cash drag)', 'Pembayaran konsumen masuk tanpa keterangan faktur', 'Biaya bunga pinjaman akibat overdraft tidak terpantau'],
      en: ['Idle cash drag yielding near-zero returns', 'Unidentified deposits sitting without invoice match', 'Unexpected overdraft interest and bank penalty fees'],
      zh: ['大额沉淀闲置资金未能产生理财收益', '未注明发票单号的不明汇入款挂账', '透支额度未及时归还产生的高昂利息罚息'],
      ja: ['低利回りのまま滞留するアイドルキャッシュ', '請求書と未突合の不明入金残高', '当座貸越の返済遅延による無駄な利息支払い'],
      ar: ['سيولة نقدية راكدة غير مستثمرة', 'إيداعات عملاء مجهولة غير مرتبطة بفواتير', 'فوائد سحب على المكشوف وغرامات بنكية غير مبررة']
    },
    supportedProtocols: ['SNAP BI (Standar Nasional Open API Pembayaran)', 'ISO 20022 MT940', 'Encrypted Host-to-Host (H2H)'],
    latency: 'Real-time (< 1s)',
    isPopularInID: true
  },
  {
    id: 'djp_efaktur',
    name: 'Coretax & Tax Compliance Engine',
    category: 'Tax & Compliance',
    description: {
      id: 'Verifikasi kepatuhan pajak otomatis antara faktur komersial perusahaan dengan sistem Coretax Indonesia.',
      en: 'Automated tax compliance verification matching commercial billing against Coretax Indonesia.',
      zh: '印尼国家税务总局（DJP）电子发票直连——自动化核验商业发票与纳税申报记录。',
      ja: 'インドネシア国税総局（DJP）e-Faktur直結——商業請求書と税務申告の突合自動化。',
      ar: 'ربط مباشر مع منظومة الفوترة الضريبية الإلكترونية للتحقق من سلامة الإقرارات.'
    },
    logoIcon: 'tax',
    dataReadCapabilities: {
      id: ['Faktur Pajak Masukan & Keluaran', 'Validasi NPWP & Status PKP Rekanan', 'Rekonsiliasi SPT Masa PPN 1111', 'Monitoring Bukti Potong PPh 23/21'],
      en: ['Input & Output Tax Invoices', 'Partner Tax ID (NPWP) & VAT Status', 'SPT Masa PPN Reconciliation', 'Withholding Tax Proof PPh 21/23/4(2)'],
      zh: ['进项税与销项税发票凭据', '交易对手税号(NPWP)及合规资质', '增值税月度纳税申报核对', '企业预扣所得税完税凭证'],
      ja: ['仕入税額・売上税額控除証明', '取引先納税者番号(NPWP)適格性', '付加価値税(PPN)月次申告突合', '源泉税(PPh)納付証明追跡'],
      ar: ['فواتير ضريبة المدخلات والمخرجات', 'التحقق من الرقم الضريبي للموردين والعملاء', 'مطابقة إقرارات ضريبة القيمة المضافة', 'شهادات الخصم والتحصيل الضريبي']
    },
    typicalDiagnosticsUncovered: {
      id: ['Faktur pajak masukan kadaluarsa belum dikreditkan', 'Vendor non-PKP memungut PPN ilegal', 'Risiko surat teguran SP2DK akibat selisih omzet laporan'],
      en: ['Uncredited input tax vouchers expiring past 3 months', 'Non-registered vendors unlawfully charging VAT', 'SP2DK tax inquiry risk due to turnover reconciliation gap'],
      zh: ['逾期未抵扣导致作废的进项发票税额损失', '无一般纳税人资质的供应商非法加收税款', '收入申报口径与银行流水不一致引发的税务问询SP2DK风险'],
      ja: ['期限切れにより税額控除不能となった仕入税額', '不適格業者による不正なPPN上乗せ', '申告売上と銀行入金乖離による税務署SP2DK照会リスク'],
      ar: ['فواتير ضريبة مدخلات منتهية الصلاحية لم تُسترد', 'موردون غير مسجلين يفرضون ضرائب غير قانونية', 'مخاطر استدعاء ضريبي (SP2DK) بسبب فروقات الإيرادات']
    },
    supportedProtocols: ['DJP Host-to-Host (PJAP Certified)', 'REST XML Schema', 'QR Code OCR Ingestion'],
    latency: 'Batch / Daily',
    isPopularInID: true
  }
];
