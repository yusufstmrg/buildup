import React, { useState } from 'react';
import { 
  Briefcase, 
  Calculator, 
  Scale, 
  FileText, 
  ShoppingCart, 
  TrendingUp, 
  Megaphone, 
  Users, 
  Building, 
  ShieldAlert, 
  Target, 
  Laptop,
  CheckCircle2,
  Sliders,
  Send,
  Sparkles,
  Bot,
  Activity,
  Terminal
} from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';

interface AgentRole {
  name: string;
  role: string;
  icon: any;
  status: 'Active' | 'Orchestrating' | 'Standby';
  autonomyMode: 'Assist' | 'Recommend' | 'Approve' | 'Orchestrate' | 'Autonomous';
  tasksCompleted: number;
  accuracy: number;
  desc: string;
  samplePrompt: string;
  sampleResponse: string;
}

const initialAgents: AgentRole[] = [
  { 
    name: 'AI CEO', 
    role: 'Enterprise Synthesis & Priorities', 
    icon: Briefcase, 
    status: 'Active', 
    autonomyMode: 'Orchestrate',
    tasksCompleted: 412,
    accuracy: 98.4,
    desc: 'Synthesizes cross-functional performance into single operating priorities, evaluates strategic trade-offs, and enforces executive accountability.',
    samplePrompt: 'Summarize top 3 cross-functional constraints for this week.',
    sampleResponse: 'Top 3 constraints: 1) Packaging supplier concentration (65% on 2 vendors) exposing gross margin to 8.4% price premium. 2) B2B DSO extension to 61 days locking Rp 1.85B in working capital. 3) ERP SoD permission conflict between PO creation and payment release. Recommendation: Authorize AI Procurement RFQ and activate automated invoice matching.'
  },
  { 
    name: 'AI CFO', 
    role: 'Capital, Cash & Margin Defense', 
    icon: Calculator, 
    status: 'Active', 
    autonomyMode: 'Autonomous',
    tasksCompleted: 890,
    accuracy: 99.1,
    desc: 'Runs continuous 13-week rolling cash forecasts, monitors bank balances across accounts, accelerates receivables collections, and protects gross margins.',
    samplePrompt: 'What is our liquidity runway and working capital position?',
    sampleResponse: 'Liquidity runway is currently 4.8 months at current burn rate. Working capital is constrained by Rp 1.85B in unbilled receivables (DSO 61 days). Deploying pre-due date reminders and Surat Jalan digital attachments is projected to unlock Rp 1.15B in free cash over the next 30 days.'
  },
  { 
    name: 'AI Procurement', 
    role: 'Spend & Supplier Economics', 
    icon: ShoppingCart, 
    status: 'Active', 
    autonomyMode: 'Recommend',
    tasksCompleted: 640,
    accuracy: 97.2,
    desc: 'Ingests quotes from WhatsApp, email, and PDFs, normalizes line items against market benchmarks, and prevents supplier price gouging.',
    samplePrompt: 'Analyze recent packaging material quotes.',
    sampleResponse: 'Analyzed 142 POs totaling Rp 4.85B. Vendor PT Sentosa Packaging is billing Rp 1.580/unit (+8.4% above verified market benchmark of Rp 1.450/unit). Prepared automated RFQ package to 4 pre-qualified regional converters to capture Rp 420M annual price recovery.'
  },
  { 
    name: 'AI Controller', 
    role: 'Accounting Close & Integrity', 
    icon: Scale, 
    status: 'Active', 
    autonomyMode: 'Autonomous',
    tasksCompleted: 1240,
    accuracy: 99.8,
    desc: 'Conducts 24/7 continuous bank reconciliations, flags ledger anomalies, and prepares fast monthly financial close without spreadsheet friction.',
    samplePrompt: 'Are there any unreconciled transactions in the GL?',
    sampleResponse: '99.4% of GL entries reconciled automatically. 3 manual journal entries flagged for missing supporting invoices totaling Rp 42.500.000. Reversal audit trail generated for Controller sign-off.'
  },
  { 
    name: 'AI Risk & Internal Control', 
    role: 'Continuous Testing & SoD Audit', 
    icon: ShieldAlert, 
    status: 'Active', 
    autonomyMode: 'Approve',
    tasksCompleted: 580,
    accuracy: 99.6,
    desc: 'Continuously monitors transaction logs for Segregation of Duties (SoD) breaches, duplicate vendor payments, and threshold policy compliance.',
    samplePrompt: 'Audit ERP access permissions for fraud vulnerability.',
    sampleResponse: 'Detected 1 critical role overlap: User ID FIN-OP-04 currently holds both PO Creation and Payment Release authority. 3 transactions totaling Rp 184.5M executed under this overlap. Immediate revocation and dual-custody gate recommended.'
  },
  { 
    name: 'AI CRO / Sales', 
    role: 'Revenue Pipeline & Pricing Margin', 
    icon: TrendingUp, 
    status: 'Active', 
    autonomyMode: 'Recommend',
    tasksCompleted: 510,
    accuracy: 96.5,
    desc: 'Tracks B2B pipeline velocity, audits discount leakage, ensures contract margin compliance, and automates sales follow-ups.',
    samplePrompt: 'Which enterprise deals are currently stalled?',
    sampleResponse: '4 enterprise deals totaling Rp 1.2B in pipeline have been inactive for >14 days. Bottleneck identified as custom pricing schedule review. Prepared approved margin tier schedule (min 22% gross margin) to accelerate closing.'
  },
  { 
    name: 'AI COO', 
    role: 'Operations & Process SOPs', 
    icon: Building, 
    status: 'Active', 
    autonomyMode: 'Orchestrate',
    tasksCompleted: 730,
    accuracy: 97.8,
    desc: 'Uncovers warehouse and fulfillment bottlenecks, tracks cross-departmental SLA compliance, and automates handoffs between ERP and logistics.',
    samplePrompt: 'Where are we losing time in customer order fulfillment?',
    sampleResponse: 'Order-to-dispatch cycle time is currently 3.2 days. Bottleneck is located at manual CSV transfer between ERP and warehouse logistics, causing 14% dispatch delay. API webhook bridge configured to compress cycle to 1.1 days.'
  },
  { 
    name: 'AI Tax & Compliance', 
    role: 'Indonesian Statutory Tax Oversight', 
    icon: FileText, 
    status: 'Active', 
    autonomyMode: 'Assist',
    tasksCompleted: 340,
    accuracy: 99.2,
    desc: 'Monitors PPh 21, PPh 23, and PPN compliance, prepares electronic withholding evidence, and compiles audit-ready dossiers for SP2DK defense.',
    samplePrompt: 'Check tax withholding compliance for monthly vendor payouts.',
    sampleResponse: 'Verified 48 vendor payments. All required PPh 23 Bukti Potong generated. 2 service invoices flagged for missing NPWP data, withholding rate adjusted to non-NPWP 4% statutory rate in compliance with Dirjen Pajak regulation.'
  },
  { 
    name: 'AI Strategy', 
    role: 'Dynamic Scenario & Initiative Modeling', 
    icon: Target, 
    status: 'Active', 
    autonomyMode: 'Recommend',
    tasksCompleted: 290,
    accuracy: 96.0,
    desc: 'Simulates business outcomes under varying macroeconomic, price, and demand conditions to guide 90-day capital allocation.',
    samplePrompt: 'Run 10% raw material inflation stress test.',
    sampleResponse: 'A 10% inflation in raw packaging materials without pricing adjustment compresses operating EBITDA by 2.4% (Rp 1.15B loss). Countermeasure: Deploy AI Procurement dual-supplier sourcing to insulate 65% of volume at fixed 6-month contract.'
  },
  { 
    name: 'AI CHRO / People', 
    role: 'Workforce Leverage & CV Screening', 
    icon: Users, 
    status: 'Active', 
    autonomyMode: 'Assist',
    tasksCompleted: 420,
    accuracy: 95.8,
    desc: 'Screens incoming candidate profiles, balances department headcount workload, and evaluates employee KPI scorecard achievement.',
    samplePrompt: 'Analyze sales team headcount productivity.',
    sampleResponse: 'Average revenue contribution per sales executive is Rp 480M/quarter. Top quartile produces Rp 920M while bottom quartile produces Rp 180M due to delayed onboarding. AI Onboarding playbook deployed to reduce ramp time from 42 to 14 days.'
  },
  { 
    name: 'AI Marketing', 
    role: 'Demand Funnel & CAC / LTV Analytics', 
    icon: Megaphone, 
    status: 'Active', 
    autonomyMode: 'Recommend',
    tasksCompleted: 380,
    accuracy: 95.2,
    desc: 'Monitors commercial demand generation, analyzes customer acquisition cost (CAC) payback, and attributes revenue to specific channels.',
    samplePrompt: 'Audit customer acquisition payback across channels.',
    sampleResponse: 'B2B referral and partner channels show 2.4 month CAC payback with 6.2x LTV/CAC ratio. Digital paid acquisition payback is 7.8 months. Recommending shifting Rp 45M monthly budget to partner co-marketing.'
  },
  { 
    name: 'AI CTO', 
    role: 'Systems Architecture & Tech Portfolio', 
    icon: Laptop, 
    status: 'Active', 
    autonomyMode: 'Orchestrate',
    tasksCompleted: 310,
    accuracy: 98.9,
    desc: 'Audits software stack sprawl, maintains API connectors to ERP/CRM/Banking, and ensures enterprise data security compliance.',
    samplePrompt: 'Review enterprise data security and connector uptime.',
    sampleResponse: 'ERP connector (Odoo/SAP) running with 99.98% uptime. Zero unauthorized access tokens detected. End-to-end TLS 1.3 encryption verified across all Business OS autonomous webhook calls.'
  },
];

export function AIWorkforce() {
  const [agents, setAgents] = useState<AgentRole[]>(initialAgents);
  const [activeAgent, setActiveAgent] = useState<AgentRole>(initialAgents[1]); // AI CFO
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'agent'; text: string }[]>([
    { role: 'user', text: initialAgents[1].samplePrompt },
    { role: 'agent', text: initialAgents[1].sampleResponse }
  ]);

  const handleSelectAgent = (agent: AgentRole) => {
    setActiveAgent(agent);
    setChatHistory([
      { role: 'user', text: agent.samplePrompt },
      { role: 'agent', text: agent.sampleResponse }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');

    // Realistic synthesis reply from selected agent
    setTimeout(() => {
      let reply = `[${activeAgent.name}]: I have ingested your request against live company data. `;
      if (userText.toLowerCase().includes('leakage') || userText.toLowerCase().includes('cash')) {
        reply += `Our live working capital model identifies Rp 1.45B in recoverable leakage. DSO is 61 days. Recommended action is activating automated pre-due date reminders and Surat Jalan attachments.`;
      } else if (userText.toLowerCase().includes('supplier') || userText.toLowerCase().includes('vendor')) {
        reply += `Current supplier spend concentration is 65% on top 2 vendors. Price variance is 8.4% above market benchmark. Normalized RFQ is ready for dispatch.`;
      } else {
        reply += `Analysis completed with 98% confidence. The Business Context Graph confirms no negative second-order side-effects on gross margin or customer SLA. Ready to execute upon your sign-off.`;
      }
      setChatHistory(prev => [...prev, { role: 'agent', text: reply }]);
    }, 600);
  };

  const handleAutonomyChange = (agentName: string, mode: any) => {
    setAgents(prev => prev.map(a => {
      if (a.name === agentName) {
        return { ...a, autonomyMode: mode };
      }
      return a;
    }));
    if (activeAgent.name === agentName) {
      setActiveAgent(prev => ({ ...prev, autonomyMode: mode }));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-brand-textMain tracking-tight">AI Workforce Studio™</h1>
            <span className="text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
              Product Stage 08 · 12 Digital Roles
            </span>
          </div>
          <p className="text-xs text-brand-textMuted mt-1">
            Section 10: The Coordinated Digital Organization. Governed, evidence-backed digital executives executing business operations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-emerald-400 font-semibold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> 12/12 Roles Deployed
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-brand-textMuted">
            Avg Accuracy: <strong>97.9%</strong>
          </span>
        </div>
      </div>

      {/* Interactive Agent Terminal & Chat Console */}
      <div className="bg-brand-surface border border-brand-gold/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-brand-border mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
              <activeAgent.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-brand-textMain">{activeAgent.name}</h3>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded">
                  {activeAgent.status}
                </span>
              </div>
              <p className="text-xs text-brand-gold font-semibold">{activeAgent.role}</p>
            </div>
          </div>

          {/* Autonomy Level Slider / Selector */}
          <div className="flex items-center gap-2 bg-brand-navy p-1 rounded-xl border border-brand-border text-xs">
            <span className="text-[10px] font-bold text-brand-textMuted uppercase px-2">Autonomy Mode:</span>
            {(['Assist', 'Recommend', 'Approve', 'Orchestrate', 'Autonomous'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => handleAutonomyChange(activeAgent.name, mode)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                  activeAgent.autonomyMode === mode
                    ? 'bg-brand-gold text-brand-deep shadow-sm'
                    : 'text-brand-textMuted hover:text-brand-textMain'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Box */}
        <div className="bg-brand-navy border border-brand-border rounded-xl p-4 h-64 overflow-y-auto space-y-3 font-sans text-xs">
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'agent' && (
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-[10px] font-bold text-brand-gold shrink-0 mt-0.5">
                  AI
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-xl leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-gold/20 text-brand-textMain border border-brand-gold/40'
                    : 'bg-brand-card/80 text-brand-textMain border border-brand-border'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={`Instruct or question ${activeAgent.name} (e.g. "${activeAgent.samplePrompt}")`}
            className="flex-1 bg-brand-navy border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-textMain placeholder:text-brand-textMuted focus:outline-none focus:border-brand-gold"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldLight text-brand-deep font-extrabold text-xs flex items-center gap-1.5 shadow-gold-sm hover:from-brand-goldDark hover:to-brand-gold transition-all"
          >
            <span>Command</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* 12 Digital Roles Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-brand-textMain">All 12 Coordinated Digital Roles</h2>
          <span className="text-xs text-brand-textMuted">Click any role to inspect or command</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent) => {
            const isSelected = activeAgent.name === agent.name;
            const Icon = agent.icon;
            return (
              <div
                key={agent.name}
                onClick={() => handleSelectAgent(agent)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-brand-surface border-brand-gold shadow-gold-sm ring-1 ring-brand-gold'
                    : 'bg-brand-surface/70 border-brand-border hover:border-brand-borderLight hover:bg-brand-surface'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-brand-gold text-brand-deep' : 'bg-brand-navy text-brand-gold border border-brand-border'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                      {agent.autonomyMode}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-brand-textMain">{agent.name}</h3>
                  <div className="text-[11px] font-semibold text-brand-gold/90 mt-0.5 mb-2">{agent.role}</div>
                  <p className="text-[11px] text-brand-textMuted leading-relaxed line-clamp-3">{agent.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between text-[10px] text-brand-textMuted">
                  <span>{agent.tasksCompleted} Tasks Done</span>
                  <span className="text-emerald-400 font-semibold">{agent.accuracy}% Accuracy</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
