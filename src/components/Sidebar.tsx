import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  ActivitySquare, 
  Users, 
  Settings, 
  TrendingUp,
  ShieldAlert,
  Globe,
  Coins,
  Sparkles,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  X
} from 'lucide-react';
import { BuildUpLogo } from './BuildUpLogo';
import { useBuildUp } from '../context/BuildUpContext';

const navigation = [
  { name: 'Command Center', href: '/app', icon: LayoutDashboard },
  { name: 'BuildUp Intelligence™', href: '/intelligence', icon: BrainCircuit, badge: 'Active Graph' },
  { name: 'Diagnostics & X-Ray™', href: '/diagnostics', icon: ActivitySquare },
  { name: 'AI Workforce', href: '/workforce', icon: Users, badge: '12 Roles' },
  { name: 'Business OS™', href: '/business-os', icon: Settings },
  { name: 'Strategic Planner', href: '/planner', icon: TrendingUp },
  { name: 'Internal Control Engine', href: '/control', icon: ShieldAlert, badge: '3 Alerts' },
  { name: 'Commercial & Monetization', href: '/monetization', icon: Coins, highlight: true },
  { name: 'Admin Dashboard', href: '/admin', icon: ShieldAlert, badge: 'Admin' },
];

export function Sidebar() {
  const location = useLocation();
  const { overallScore, setIsHealthCheckModalOpen } = useBuildUp();
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [expertSubmitted, setExpertSubmitted] = useState(false);

  return (
    <>
      <aside className="w-64 bg-brand-surface border-r border-brand-border flex flex-col h-full shrink-0 select-none">
        
        {/* Logo Section */}
        <div className="h-20 flex items-center px-5 border-b border-brand-border">
          <Link to="/" className="w-full">
            <BuildUpLogo size="sm" showSubtitle={true} />
          </Link>
        </div>

        {/* Public Landing Page Quick Toggle */}
        <div className="px-4 pt-4 pb-2">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-brand-navy border border-brand-border hover:border-brand-gold/40 text-xs font-semibold text-brand-textMuted hover:text-brand-textMain transition-all group"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-brand-gold group-hover:rotate-12 transition-transform" />
              <span>Public Landing Page</span>
            </div>
            <span className="text-[10px] text-brand-gold font-bold">View →</span>
          </Link>
        </div>
        
        {/* Navigation List */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-extrabold text-brand-textMuted uppercase tracking-wider px-3 py-2">
            Enterprise Navigation
          </div>

          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive 
                    ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30 shadow-gold-sm' 
                    : item.highlight
                    ? 'text-brand-gold hover:bg-brand-gold/10'
                    : 'text-brand-textMuted hover:text-brand-textMain hover:bg-brand-card/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-gold' : item.highlight ? 'text-brand-gold' : 'text-brand-textMuted group-hover:text-brand-textMain'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.badge.includes('Alert') 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-brand-navy border border-brand-border text-brand-textMuted'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Health Check Launcher Card */}
        <div className="p-3 border-t border-brand-border">
          <div className="bg-brand-navy rounded-xl p-3 border border-brand-border text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-brand-textMuted font-medium">BuildUp Score™</span>
              <span className="text-brand-gold font-black text-sm">{overallScore}/100</span>
            </div>
            <button
              onClick={() => setIsHealthCheckModalOpen(true)}
              className="w-full mt-1 py-1.5 px-2 rounded-lg bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold border border-brand-gold/30 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              Retake Health Check
            </button>
          </div>
        </div>

        {/* Human Expert Network Escalation Footer */}
        <div className="p-3 bg-brand-deep/50 border-t border-brand-border">
          <div className="rounded-xl p-3 bg-gradient-to-b from-brand-card/60 to-brand-navy border border-brand-border">
            <div className="flex items-center gap-2 mb-1">
              <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-[11px] font-bold text-brand-textMain uppercase tracking-wider">Human Expert Escalation</span>
            </div>
            <p className="text-[10px] text-brand-textMuted mb-2 leading-relaxed">
              Connect to licensed Indonesian KAP Auditors, Tax Advisors, and Corporate Counsel.
            </p>
            <button 
              onClick={() => setShowExpertModal(true)}
              className="w-full bg-brand-surface hover:bg-brand-card text-brand-gold text-[11px] font-bold py-1.5 rounded-lg border border-brand-gold/30 transition-colors shadow-sm"
            >
              Escalate to Partner
            </button>
          </div>
        </div>

      </aside>

      {/* Expert Escalation Modal */}
      {showExpertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-deep/80 backdrop-blur-sm">
          <div className="bg-brand-surface border border-brand-gold/40 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
            <button 
              onClick={() => { setShowExpertModal(false); setExpertSubmitted(false); }}
              className="absolute top-4 right-4 text-brand-textMuted hover:text-brand-textMain"
            >
              <X className="w-5 h-5" />
            </button>

            {!expertSubmitted ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-textMain">Escalate to BuildUp Expert Partner</h3>
                    <p className="text-xs text-brand-textMuted">Section 12: Certified Human Expert Network</p>
                  </div>
                </div>

                <p className="text-xs text-brand-textMuted leading-relaxed">
                  BuildUp pairs autonomous AI execution with top-tier human professionals when material judgment or statutory sign-off is required.
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-brand-textMuted font-semibold mb-1">Matter Category</label>
                    <select className="w-full bg-brand-navy border border-brand-border rounded-lg p-2.5 text-brand-textMain">
                      <option>KAP Audit / Financial Statement Sign-Off</option>
                      <option>Indonesian Tax Advisory (SP2DK / Tax Audit Defense)</option>
                      <option>Corporate Legal & Cross-Border Contracts</option>
                      <option>Supply Chain & Strategic Sourcing Negotiation</option>
                      <option>Family Business Succession & Governance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand-textMuted font-semibold mb-1">Urgency Level</label>
                    <select className="w-full bg-brand-navy border border-brand-border rounded-lg p-2.5 text-brand-textMain">
                      <option>Standard Review (Within 48 hours)</option>
                      <option>High Priority (Within 24 hours)</option>
                      <option>Immediate / Audit Defense (Same-Day Response)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setExpertSubmitted(true)}
                    className="w-full py-3 bg-gradient-to-r from-brand-gold to-brand-goldLight text-brand-deep font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-gold-sm"
                  >
                    Confirm Partner Escalation
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-brand-textMain">Escalation Request Dispatched</h4>
                <p className="text-xs text-brand-textMuted max-w-sm mx-auto">
                  A certified BuildUp Partner (Senior Advisory Partner) has received the contextual dossier and Decision Object audit trail. Expect direct contact within 2 hours.
                </p>
                <button
                  onClick={() => { setShowExpertModal(false); setExpertSubmitted(false); }}
                  className="mt-4 px-6 py-2 bg-brand-navy border border-brand-border text-brand-textMain text-xs font-semibold rounded-lg"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
