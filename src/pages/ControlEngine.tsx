import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  FileCheck, 
  Lock, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  Search,
  Eye
} from 'lucide-react';
import { useBuildUp } from '../context/BuildUpContext';

interface ControlAlert {
  id: string;
  code: string;
  type: 'SoD Breach' | 'Duplicate Payment' | 'Threshold Override' | 'Tax Discrepancy';
  severity: 'Critical' | 'High' | 'Medium';
  title: string;
  details: string;
  userEntity: string;
  amount: string;
  status: 'Open Investigation' | 'Remediated' | 'Escalated to Audit Committee';
  timestamp: string;
}

const initialAlerts: ControlAlert[] = [
  {
    id: 'AL-01',
    code: 'SOD-2026-004',
    type: 'SoD Breach',
    severity: 'Critical',
    title: 'Dual Custody Violation: PO Creation & Payment Release by Same User',
    details: 'User ID FIN-OP-04 generated purchase order #PO-8821 (Rp 184.500.000) and subsequently signed off bank transfer voucher without secondary supervisor sign-off.',
    userEntity: 'User: FIN-OP-04 (Finance Ops)',
    amount: 'Rp 184.500.000',
    status: 'Open Investigation',
    timestamp: '42 mins ago'
  },
  {
    id: 'AL-02',
    code: 'DUP-2026-088',
    type: 'Duplicate Payment',
    severity: 'High',
    title: 'Potential Duplicate Invoice Submitted by Packaging Vendor',
    details: 'Invoice #INV-2901 matches invoice #INV-2844 on amount (Rp 48.200.000), date range, and PO line items. Payment hold automatically applied.',
    userEntity: 'Vendor: PT Sentosa Pack',
    amount: 'Rp 48.200.000',
    status: 'Remediated',
    timestamp: '2 hours ago'
  },
  {
    id: 'AL-03',
    code: 'TAX-2026-012',
    type: 'Tax Discrepancy',
    severity: 'Medium',
    title: 'PPh 23 Withholding Calculation Missing NPWP',
    details: 'Consultancy invoice processed with 2% withholding instead of statutory 4% rate for non-NPWP vendor. Auto-adjusted before tax filing.',
    userEntity: 'Consultant: Mitra Jaya',
    amount: 'Rp 4.500.000',
    status: 'Remediated',
    timestamp: '5 hours ago'
  },
];

export function ControlEngine() {
  const [alerts, setAlerts] = useState<ControlAlert[]>(initialAlerts);
  const [activeAlert, setActiveAlert] = useState<ControlAlert>(initialAlerts[0]);

  const handleRemediate = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Remediated' } : a));
    if (activeAlert.id === id) {
      setActiveAlert(prev => ({ ...prev, status: 'Remediated' }));
    }
  };

  const handleEscalate = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Escalated to Audit Committee' } : a));
    if (activeAlert.id === id) {
      setActiveAlert(prev => ({ ...prev, status: 'Escalated to Audit Committee' }));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-brand-textMain tracking-tight">Internal Control Engine™</h1>
            <span className="text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
              Section 11 · 24/7 Governance Audit
            </span>
          </div>
          <p className="text-xs text-brand-textMuted mt-1">
            Continuous transaction testing, Segregation of Duties (SoD) monitoring, duplicate payment blocking, and statutory tax compliance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-emerald-400 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Transactions Monitored
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-brand-textMuted">
            Audit Level: <strong>Tier-1 Readiness</strong>
          </span>
        </div>
      </div>

      {/* Top Threat & Vulnerability Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
          <div className="text-xs text-brand-textMuted uppercase font-semibold">Active Control Violations</div>
          <div className="text-2xl font-black text-red-400 mt-1">1 Critical Open</div>
          <div className="text-[11px] text-brand-textMuted mt-0.5">Dual-custody authorization breach</div>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
          <div className="text-xs text-brand-textMuted uppercase font-semibold">Duplicate Payments Prevented</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">Rp 142.800.000</div>
          <div className="text-[11px] text-brand-textMuted mt-0.5">Blocked prior to bank release YTD</div>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
          <div className="text-xs text-brand-textMuted uppercase font-semibold">Statutory Tax Health</div>
          <div className="text-2xl font-black text-brand-textMain mt-1">100% Compliant</div>
          <div className="text-[11px] text-brand-textMuted mt-0.5">PPh 21/23 & PPN electronic match</div>
        </div>
      </div>

      {/* Main Alert Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Alert List (5 cols) */}
        <div className="lg:col-span-5 bg-brand-surface border border-brand-border rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <h2 className="text-sm font-bold text-brand-textMain">Continuous Audit Log</h2>
            <span className="text-[10px] font-bold text-brand-textMuted uppercase">Real-Time</span>
          </div>

          <div className="space-y-2.5">
            {alerts.map((a) => {
              const isSelected = activeAlert.id === a.id;
              return (
                <div
                  key={a.id}
                  onClick={() => setActiveAlert(a)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-gold/10 border-brand-gold shadow-gold-sm'
                      : 'bg-brand-card/40 border-brand-border hover:border-brand-borderLight'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-extrabold text-brand-gold">{a.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      a.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      a.severity === 'High' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {a.severity}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-brand-textMain mb-1 leading-snug">
                    {a.title}
                  </h3>

                  <div className="flex items-center justify-between text-[10px] text-brand-textMuted mt-2">
                    <span className="text-brand-textMuted font-medium">{a.amount}</span>
                    <span className={a.status === 'Remediated' ? 'text-emerald-400 font-bold' : 'text-brand-textMuted'}>
                      {a.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Alert Dossier (7 cols) */}
        <div className="lg:col-span-7 bg-brand-surface border border-brand-border rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-brand-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-brand-gold">{activeAlert.code}</span>
                  <span className="text-[10px] font-bold bg-brand-navy border border-brand-border text-brand-textMuted px-2 py-0.5 rounded">
                    Type: {activeAlert.type}
                  </span>
                </div>
                <h2 className="text-base font-black text-brand-textMain">{activeAlert.title}</h2>
                <div className="text-xs text-brand-textMuted mt-1">{activeAlert.userEntity} · {activeAlert.timestamp}</div>
              </div>

              <div className="text-right">
                <span className="text-xs text-brand-textMuted">At-Risk Value</span>
                <div className="text-base font-black text-red-400">{activeAlert.amount}</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-1.5">
                Audit Trail Evidence & Findings
              </div>
              <div className="p-4 rounded-xl bg-brand-navy border border-brand-border text-xs text-brand-textMain leading-relaxed space-y-2">
                <p>{activeAlert.details}</p>
                <div className="pt-2 border-t border-brand-border text-[11px] text-brand-textMuted">
                  Policy Reference: <strong>Section 11.3 Materiality & Approval Threshold Policy</strong> (Requires non-overlapping operator and approver for any amount over Rp 50.000.000).
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-1.5">
                Automated Containment Status
              </div>
              <div className="p-3.5 rounded-xl bg-brand-card border border-brand-border text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ERP Transaction Token Temporarily Frozen
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Bank Disbursement Gate Intercepted
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-brand-border flex items-center gap-3">
            {activeAlert.status === 'Open Investigation' ? (
              <>
                <button
                  onClick={() => handleRemediate(activeAlert.id)}
                  className="flex-1 py-3 bg-gradient-to-r from-brand-gold to-brand-goldLight text-brand-deep font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-gold-sm transition-all"
                >
                  Revoke Role & Remediate Control Breach
                </button>
                <button
                  onClick={() => handleEscalate(activeAlert.id)}
                  className="px-4 py-3 bg-brand-card hover:bg-brand-border text-brand-textMuted font-bold text-xs rounded-xl border border-brand-border transition-colors"
                >
                  Escalate to Audit Committee
                </button>
              </>
            ) : (
              <div className="w-full py-3 text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                Remediation Status: {activeAlert.status}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
