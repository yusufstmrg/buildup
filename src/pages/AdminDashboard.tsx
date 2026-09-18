import React, { useState, useEffect } from 'react';
import { useBuildUp } from '../context/BuildUpContext';
import { Users, Activity, Settings, Database, ArrowUpRight, BarChart3, ShieldAlert, RefreshCw } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

export function AdminDashboard() {
  const { user } = useBuildUp();
  const [activeTab, setActiveTab] = useState('crm');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(true);

  // In a real scenario with proper Firebase Auth, we would fetch from /api/admin/users
  useEffect(() => {
    // Simulate initial ERP Syncing & Boot-up
    setTimeout(() => {
      setSyncing(false);
    }, 2500);

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = await auth.currentUser?.getIdToken();
        if (token) {
          const res = await fetch('/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.users) {
            setUsers(data.users);
          }
        } else {
          // Professional Mock data
          setUsers([
            { id: 1, name: 'Budi Santoso', email: 'budi@nusantararaya.com', companyName: 'PT Nusantara Raya', plan: 'Business X-Ray', role: 'admin', status: 'Live Sync', erp: 'SAP S/4HANA', createdAt: new Date().toISOString() },
            { id: 2, name: 'Siti Aminah', email: 'siti@makmurgroup.co.id', companyName: 'Makmur Group Holding', plan: 'Diagnostic Retainer', role: 'user', status: 'Pending Review', erp: 'Oracle NetSuite', createdAt: new Date().toISOString() },
            { id: 3, name: 'William', email: 'william@techcorp.id', companyName: 'TechCorp Indonesia', plan: 'Growth & Scale', role: 'user', status: 'Live Sync', erp: 'Microsoft Dynamics 365', createdAt: new Date().toISOString() }
          ]);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (syncing) {
    return (
      <div className="min-h-screen bg-brand-surface flex flex-col items-center justify-center p-6 text-center animate-pulse">
        <RefreshCw className="w-12 h-12 text-brand-gold animate-spin mb-4" />
        <h2 className="text-xl font-bold text-brand-textMain mb-2">Syncing with Live Enterprise Data...</h2>
        <p className="text-sm text-brand-textMuted max-w-sm">Establishing secure webhook connections with SAP, Oracle, and accurate accounting ledgers.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-surface text-brand-textMuted p-6 md:p-8 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-brand-textMain flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-brand-gold" />
              BuildUp Command Center
            </h1>
            <p className="text-sm text-brand-textMuted mt-1">Live Intelligence, Client Portfolio & Analytics Dashboard</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            System Live & Connected
          </div>
        </header>

        <div className="flex items-center gap-4 border-b border-brand-border pb-px overflow-x-auto">
          <button onClick={() => setActiveTab('crm')} className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'crm' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-textMuted hover:text-brand-textMain'}`}>
            <div className="flex items-center gap-2"><Users className="w-4 h-4" /> Client Portfolio</div>
          </button>
          <button onClick={() => setActiveTab('analytics')} className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'analytics' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-textMuted hover:text-brand-textMain'}`}>
            <div className="flex items-center gap-2"><Activity className="w-4 h-4" /> Business Intelligence</div>
          </button>
          <button onClick={() => setActiveTab('gateway')} className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'gateway' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-textMuted hover:text-brand-textMain'}`}>
            <div className="flex items-center gap-2"><Database className="w-4 h-4" /> Gateway Config</div>
          </button>
        </div>

        {activeTab === 'crm' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-brand-navy border border-brand-border p-5 rounded-2xl flex flex-col justify-between">
                <div className="text-xs text-brand-textMuted font-bold uppercase">Enterprise Clients</div>
                <div className="text-3xl font-black text-brand-textMain mt-2">{users.length}</div>
              </div>
              <div className="bg-brand-navy border border-brand-border p-5 rounded-2xl flex flex-col justify-between">
                <div className="text-xs text-brand-textMuted font-bold uppercase">Total ARR Managed</div>
                <div className="text-3xl font-black text-brand-textMain mt-2">Rp 4.2B</div>
              </div>
              <div className="bg-brand-navy border border-brand-border p-5 rounded-2xl flex flex-col justify-between">
                <div className="text-xs text-brand-textMuted font-bold uppercase">EBITDA Leakage Detected</div>
                <div className="text-3xl font-black text-rose-400 mt-2">Rp 31.5B</div>
              </div>
              <div className="bg-brand-navy border border-brand-gold/30 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-gold-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 blur-[30px] rounded-full" />
                <div className="text-xs text-brand-gold font-bold uppercase relative z-10">Value Recovered (Gain-Share)</div>
                <div className="text-3xl font-black text-emerald-400 mt-2 relative z-10">Rp 12.8B</div>
              </div>
            </div>

            <div className="bg-brand-navy border border-brand-border rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-brand-border flex items-center justify-between">
                <h3 className="font-bold text-brand-textMain">Live Client Registry</h3>
                <button className="text-xs text-brand-gold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-surface/50 text-brand-textMuted text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-5 py-3">Client / Organization</th>
                      <th className="px-5 py-3">Plan Tier</th>
                      <th className="px-5 py-3">ERP Source</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {users.map((u, i) => (
                      <tr key={i} className="hover:bg-brand-surface/50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-brand-textMain">{u.companyName}</div>
                          <div className="text-xs text-brand-textMuted">{u.name} ({u.email})</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 bg-brand-surface border border-brand-border rounded-lg text-xs font-bold text-brand-gold">{u.plan}</span>
                        </td>
                        <td className="px-5 py-4 text-xs font-mono text-slate-300">
                          {u.erp}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`flex w-fit items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold ${u.status === 'Live Sync' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Live Sync' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {u.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-brand-navy border border-brand-border rounded-2xl p-6">
                <h3 className="text-lg font-bold text-brand-textMain mb-4">Cash Flow Anomaly Detection</h3>
                <div className="h-48 border border-dashed border-brand-border rounded-xl flex items-center justify-center bg-brand-surface/50">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-brand-gold mx-auto mb-2 opacity-50" />
                    <p className="text-xs text-brand-textMuted">Data Stream Initializing...</p>
                  </div>
                </div>
              </div>
              <div className="bg-brand-navy border border-brand-border rounded-2xl p-6">
                <h3 className="text-lg font-bold text-brand-textMain mb-4">AI Workforce Decisions</h3>
                <div className="space-y-3">
                  {[
                    { agent: 'Accounts Receivable Copilot', action: 'Drafted 42 overdue reminder emails', time: '10 mins ago' },
                    { agent: 'Procurement Guard', action: 'Flagged 2 POs above historical threshold', time: '45 mins ago' },
                    { agent: 'Cash Flow Forecaster', action: 'Updated Q3 liquidity projections', time: '2 hours ago' }
                  ].map((log, idx) => (
                    <div key={idx} className="p-3 border border-brand-border rounded-xl bg-brand-surface/50 flex items-start gap-3">
                      <ShieldAlert className="w-4 h-4 text-brand-gold mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-brand-textMain">{log.agent}</div>
                        <div className="text-xs text-brand-textMuted mt-0.5">{log.action}</div>
                      </div>
                      <div className="ml-auto text-[10px] text-brand-textMuted">{log.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gateway' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
             <div className="bg-brand-navy border border-brand-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-brand-textMain flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-brand-gold" /> Universal API Gateway Status
              </h3>
              <p className="text-sm text-brand-textMuted mb-6">Real-time status of webhook listeners and scheduled extraction pipelines.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-brand-border rounded-xl hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-brand-textMain">SAP S/4HANA OData Connector</div>
                    <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/20 uppercase">Connected</div>
                  </div>
                  <div className="text-xs text-brand-textMuted">Sync Rate: 342 req/min</div>
                  <div className="text-[10px] text-brand-textMuted mt-1">Last Payload: 2s ago</div>
                </div>
                
                <div className="p-4 border border-brand-border rounded-xl hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-brand-textMain">Oracle NetSuite RESTlet</div>
                    <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/20 uppercase">Connected</div>
                  </div>
                  <div className="text-xs text-brand-textMuted">Sync Rate: 128 req/min</div>
                  <div className="text-[10px] text-brand-textMuted mt-1">Last Payload: 15s ago</div>
                </div>

                <div className="p-4 border border-brand-border rounded-xl hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-brand-textMain">Xero / Accurate Parser</div>
                    <div className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-bold rounded border border-amber-500/20 uppercase">Syncing</div>
                  </div>
                  <div className="text-xs text-brand-textMuted">Scheduled Batch Job</div>
                  <div className="text-[10px] text-brand-textMuted mt-1">Next Run: in 14 mins</div>
                </div>
              </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}

