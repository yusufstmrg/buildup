import React, { useState } from 'react';
import { 
  Settings, 
  Workflow, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight,
  Filter,
  Check,
  X
} from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';

interface WorkflowItem {
  id: string;
  name: string;
  domain: string;
  trigger: string;
  status: 'Active' | 'Paused' | 'In Review';
  lastRun: string;
  successRate: number;
  actionsTotal: number;
}

interface ApprovalRequest {
  id: string;
  title: string;
  agent: string;
  amount: string;
  domain: string;
  rationale: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  timestamp: string;
}

const initialWorkflows: WorkflowItem[] = [
  { id: 'WF-01', name: 'Automated 3-Quote RFQ Normalization', domain: 'Procurement', trigger: 'PO creation > Rp 25M', status: 'Active', lastRun: '12 mins ago', successRate: 99.4, actionsTotal: 342 },
  { id: 'WF-02', name: 'Pre-Due Date DSO Reminder & Surat Jalan Sync', domain: 'Finance', trigger: 'Invoice due in 5 days', status: 'Active', lastRun: '28 mins ago', successRate: 98.8, actionsTotal: 820 },
  { id: 'WF-03', name: 'Continuous GL & Bank Statement Reconciliation', domain: 'Controller', trigger: 'Daily midnight bank feed', status: 'Active', lastRun: '6 hours ago', successRate: 100, actionsTotal: 1450 },
  { id: 'WF-04', name: 'ERP SoD Dual-Custody Approval Interceptor', domain: 'Risk & Governance', trigger: 'High-value payout release', status: 'Active', lastRun: '1 hour ago', successRate: 100, actionsTotal: 180 },
  { id: 'WF-05', name: 'Order-to-Warehouse Logistics Handshake', domain: 'Operations', trigger: 'Sales order status -> Approved', status: 'Active', lastRun: '4 mins ago', successRate: 97.6, actionsTotal: 690 },
];

const initialApprovals: ApprovalRequest[] = [
  { id: 'AP-101', title: 'Normalize Packaging Material Vendor Quotes', agent: 'AI Procurement', amount: 'Rp 420.000.000 / yr savings', domain: 'Procurement', rationale: 'Incumbent supplier billing 8.4% above benchmark. 4 quotes normalized; ready to award split volume.', status: 'Pending', timestamp: '14 mins ago' },
  { id: 'AP-102', title: 'Override 60-Day Payment Terms for B2B Client PT Megah', agent: 'AI CFO', amount: 'Rp 380.000.000 exposure', domain: 'Finance', rationale: 'Client requested Net 75 days. Current policy limit is Net 45. Require VP sign-off.', status: 'Pending', timestamp: '1 hour ago' },
  { id: 'AP-103', title: 'Revoke Conflicting ERP Role FIN-OP-04', agent: 'AI Risk', amount: 'Zero Fraud Exposure', domain: 'Governance', rationale: 'Remediates detected Segregation of Duties (SoD) vulnerability.', status: 'Pending', timestamp: '3 hours ago' },
];

export function BusinessOS() {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>(initialWorkflows);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(initialApprovals);

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' } : a));
  };

  const handleReject = (id: string) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, status: w.status === 'Active' ? 'Paused' : 'Active' };
      }
      return w;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-brand-textMain tracking-tight">BuildUp Business OS™</h1>
            <span className="text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
              Product Stage 07 · Orchestration Layer
            </span>
          </div>
          <p className="text-xs text-brand-textMuted mt-1">
            Section 9: The Governing Execution Engine. Universal data ingestion, multi-system workflows, and autonomous execution policies.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-emerald-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> 5 Active Workflows
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-brand-textMuted">
            Audit Trail: <strong>Immutable</strong>
          </span>
        </div>
      </div>

      {/* NEW: Universal Data Gateway Section */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[80px] pointer-events-none rounded-full" />
        
        <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-gold" />
            <h2 className="text-base font-bold text-brand-textMain">Universal Data Gateway & Native Core</h2>
          </div>
          <span className="text-xs text-brand-textMuted font-semibold">End-to-End Enterprise Solution</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Universal Connector */}
          <div className="p-4 rounded-xl bg-brand-navy border border-brand-border space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">1. Bring Your Own System</span>
            </div>
            <p className="text-xs text-brand-textMuted leading-relaxed">
              BuildUp is system-agnostic. We don't just connect to SAP, Oracle, or Odoo. We ingest and normalize <strong>everything your business uses</strong>:
            </p>
            <ul className="text-[11px] text-brand-textMuted space-y-1.5 pl-2 border-l border-brand-gold/30">
              <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-gold" /> Legacy ERPs & Specialized CRM (Salesforce, Hubspot)</li>
              <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-gold" /> Messy Excel Spreadsheets & CSV Extracts</li>
              <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-gold" /> Scanned PDFs, Invoices, and Legal Contracts</li>
              <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-gold" /> Biometric Attendance & IoT Sensor Data</li>
              <li className="flex items-center gap-2"><Check className="w-3 h-3 text-brand-gold" /> WhatsApp Logs & Internal Email Threads</li>
            </ul>
            <div className="mt-2 pt-2 border-t border-brand-border text-[10px] text-brand-textMuted font-semibold uppercase tracking-wide">
              Result: A single, unified Business Context Graph™
            </div>
          </div>

          {/* Native Core System */}
          <div className="p-4 rounded-xl bg-brand-navy border border-brand-gold/30 shadow-[0_0_15px_rgba(180,147,88,0.05)] space-y-3 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-[100px] text-brand-gold opacity-5 pointer-events-none">
              <ShieldCheck />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-brand-gold">2. BuildUp Native ERP Core</span>
            </div>
            <p className="text-xs text-brand-textMuted leading-relaxed">
              Don't have a system yet? Running your company purely on WhatsApp and paper? <strong>BuildUp provides a complete operational backbone out-of-the-box</strong>.
            </p>
            <ul className="text-[11px] text-brand-textMuted space-y-1.5 pl-2 border-l border-brand-gold/30">
              <li className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-400" /> General Ledger & Double-Entry Accounting</li>
              <li className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-400" /> Procurement, Inventory & WMS Module</li>
              <li className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-400" /> HR, Payroll & Performance Tracking</li>
              <li className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-400" /> B2B CRM & Pipeline Management</li>
            </ul>
            <div className="mt-2 pt-2 border-t border-brand-border text-[10px] text-brand-gold font-semibold uppercase tracking-wide">
              Instantly deployable. AI-Native from day one.
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals Queue */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
        <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            <h2 className="text-base font-bold text-brand-textMain">Executive Approval Queue (Human-In-The-Loop Gate)</h2>
          </div>
          <span className="text-xs text-brand-gold font-semibold">
            {approvals.filter(a => a.status === 'Pending').length} Action Items Require Sign-Off
          </span>
        </div>

        <div className="space-y-3">
          {approvals.map((req) => (
            <div key={req.id} className="p-4 rounded-xl bg-brand-navy border border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-textMain">{req.title}</span>
                  <span className="text-[10px] font-bold bg-brand-card text-brand-gold px-2 py-0.5 rounded border border-brand-border">
                    {req.agent}
                  </span>
                  <span className="text-[10px] text-brand-textMuted font-semibold">{req.timestamp}</span>
                </div>
                <p className="text-xs text-brand-textMuted leading-relaxed max-w-2xl">
                  {req.rationale}
                </p>
                <div className="text-[11px] text-emerald-400 font-bold">
                  Economic Impact: {req.amount}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {req.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-brand-deep font-black text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Check className="w-4 h-4" />
                      Approve Action
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="px-3 py-2 rounded-lg bg-brand-card hover:bg-red-500/20 text-brand-textMuted hover:text-red-400 border border-brand-border font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                ) : (
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${req.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    Action {req.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Orchestration Workflows */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
        <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-brand-gold" />
            <h2 className="text-base font-bold text-brand-textMain">Governed Business Workflows</h2>
          </div>
          <span className="text-xs text-brand-textMuted">Section 9.1: Connected Execution Engine</span>
        </div>

        <div className="space-y-3">
          {workflows.map((wf) => (
            <div key={wf.id} className="p-4 rounded-xl bg-brand-navy border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-brand-gold">{wf.id}</span>
                  <h3 className="text-sm font-bold text-brand-textMain">{wf.name}</h3>
                  <span className="text-[10px] font-bold bg-brand-card px-2 py-0.5 rounded text-brand-textMuted border border-brand-border">
                    {wf.domain}
                  </span>
                </div>
                <div className="text-xs text-brand-textMuted">
                  Trigger: <strong className="text-brand-textMain">{wf.trigger}</strong> · Last run {wf.lastRun}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right text-xs">
                  <div className="text-brand-textMuted">Execution Health</div>
                  <div className="font-bold text-emerald-400">{wf.successRate}% ({wf.actionsTotal} actions)</div>
                </div>

                <button
                  onClick={() => toggleWorkflowStatus(wf.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    wf.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                  }`}
                >
                  {wf.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{wf.status}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
