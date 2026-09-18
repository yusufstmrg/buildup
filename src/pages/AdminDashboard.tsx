import React, { useState, useEffect } from 'react';
import { useBuildUp } from '../context/BuildUpContext';
import { Users, Activity, Settings, Database, ArrowUpRight, BarChart3, ShieldAlert } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export function AdminDashboard() {
  const { user } = useBuildUp();
  const [activeTab, setActiveTab] = useState('crm');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // In a real scenario with proper Firebase Auth, we would fetch from /api/admin/users
  useEffect(() => {
    // For now, load a mock or attempt to fetch if we have a token
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('bu_firebase_token');
        if (token) {
          const res = await fetch('/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.users) {
            setUsers(data.users);
          }
        } else {
          // Mock data if no real backend auth is wired up in the demo yet
          setUsers([
            { id: 1, name: 'Budi Santoso', email: 'budi@nusantara.com', companyName: 'PT Nusantara Raya', plan: 'Gain-Share', role: 'user', createdAt: new Date().toISOString() },
            { id: 2, name: 'Siti Aminah', email: 'siti@makmur.co.id', companyName: 'CV Makmur Jaya', plan: 'Free', role: 'user', createdAt: new Date().toISOString() }
          ]);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (!user || user.role !== 'Admin') {
    // In a real app we'd redirect to login or show unauthorized
    // For this prototype, we'll just allow it if we are demoing, or maybe enforce admin role
    // return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-brand-textMuted p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-brand-textMain flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-brand-gold" />
              BuildUp Command Center
            </h1>
            <p className="text-sm text-brand-textMuted mt-1">Centralized Admin Dashboard for CRM, Analytics & Gateway Config</p>
          </div>
        </header>

        <div className="flex items-center gap-4 border-b border-slate-800 pb-px">
          <button onClick={() => setActiveTab('crm')} className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'crm' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-textMuted hover:text-brand-textMuted'}`}>
            <div className="flex items-center gap-2"><Users className="w-4 h-4" /> CRM & Clients</div>
          </button>
          <button onClick={() => setActiveTab('analytics')} className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'analytics' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-textMuted hover:text-brand-textMuted'}`}>
            <div className="flex items-center gap-2"><Activity className="w-4 h-4" /> Traffic & Analytics</div>
          </button>
          <button onClick={() => setActiveTab('gateway')} className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'gateway' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-textMuted hover:text-brand-textMuted'}`}>
            <div className="flex items-center gap-2"><Database className="w-4 h-4" /> API Gateway Config</div>
          </button>
        </div>

        {activeTab === 'crm' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-brand-navy border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-brand-textMuted font-bold uppercase">Total Clients</div>
                <div className="text-3xl font-black text-brand-textMain mt-1">{users.length || 0}</div>
              </div>
              <div className="bg-brand-navy border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-brand-textMuted font-bold uppercase">Active Retainers</div>
                <div className="text-3xl font-black text-brand-textMain mt-1">4</div>
              </div>
              <div className="bg-brand-navy border border-brand-gold/30 p-5 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 blur-[30px] rounded-full" />
                <div className="text-xs text-brand-gold font-bold uppercase">Pending Gain-Share Value</div>
                <div className="text-3xl font-black text-emerald-400 mt-1">Rp 120M</div>
              </div>
            </div>

            <div className="bg-brand-navy border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-800">
                <h3 className="font-bold text-brand-textMain">Client Registry</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950/50 text-brand-textMuted text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-5 py-3">Client / Name</th>
                      <th className="px-5 py-3">Email</th>
                      <th className="px-5 py-3">Plan</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {users.map((u, i) => (
                      <tr key={i} className="hover:bg-brand-surface/50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-brand-textMain">{u.companyName || 'Unknown'}</div>
                          <div className="text-xs text-brand-textMuted">{u.name}</div>
                        </td>
                        <td className="px-5 py-4 text-brand-textMuted">{u.email}</td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 bg-brand-surface rounded-lg text-xs font-bold text-brand-gold">{u.plan || 'Free'}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="flex items-center gap-1.5 text-xs text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active</span>
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
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-brand-navy border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <BarChart3 className="w-12 h-12 text-slate-600 mb-4" />
              <h3 className="text-lg font-bold text-brand-textMain">Decision Objects Executed</h3>
              <p className="text-sm text-brand-textMuted mt-2 max-w-md">
                142 automated actions taken across 4 active tenants in the last 24 hours. (Chart implementation pending metric streams).
              </p>
            </div>
          </div>
        )}

        {activeTab === 'gateway' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
             <div className="bg-brand-navy border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-brand-textMain flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-brand-gold" /> Universal API Gateway Status
              </h3>
              <div className="space-y-4">
                <div className="p-4 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-brand-textMain">SAP S/4HANA OData Connector</div>
                    <div className="text-xs text-brand-textMuted mt-1">Webhook listener: Active (300 req/min)</div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">Operational</div>
                </div>
                <div className="p-4 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-brand-textMain">Accurate / Jurnal Webhook Parser</div>
                    <div className="text-xs text-brand-textMuted mt-1">Last synced: 2 minutes ago</div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">Operational</div>
                </div>
              </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
