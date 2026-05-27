'use client';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Clock, XCircle, CheckCircle2, Radio, Phone, Search, FileSearch, Plus } from 'lucide-react';
import { formatDate } from '@/lib/utils';

type Status = 'refunded' | 'monitoring' | 'rejected';

type FakeLead = {
  id: string;
  title: string;
  reportedAt: string;
  leadId: string;
  reason: string;
  status: Status;
  refund?: { amount: number; processedAt?: string; pending?: boolean };
  reportNote?: string;
  monitoring?: { start: string; end: string; remainingHours: number; pct: number };
  rejection?: string;
  timeline: { time: string; text: string; state: 'done' | 'active' | 'upcoming' }[];
};

const fakeLeads: FakeLead[] = [
  {
    id: 'fl1',
    title: 'Ramesh K. — Wrong Number',
    reportedAt: '2026-05-20',
    leadId: 'L-4821',
    reason: 'Number does not exist',
    status: 'refunded',
    refund: { amount: 150, processedAt: '20 May, 6:32 PM' },
    reportNote: 'Auto-verified — number invalid',
    timeline: [
      { time: '20 May, 2:10 PM', text: 'Artist submitted report — Wrong Number', state: 'done' },
      { time: '20 May, 2:15 PM', text: 'System checked the number — confirmed invalid', state: 'done' },
      { time: '20 May, 2:18 PM', text: '48-hour monitoring started (precaution)', state: 'done' },
      { time: '20 May, 6:32 PM', text: '₹150 credited back to your wallet', state: 'done' },
    ],
  },
  {
    id: 'fl2',
    title: 'Priya S. — Number Switched Off',
    reportedAt: '2026-05-22',
    leadId: 'L-4956',
    reason: 'Number not reachable',
    status: 'monitoring',
    refund: { amount: 150, pending: true },
    monitoring: { start: '22 May, 2:00 PM', end: '24 May, 2:00 PM', remainingHours: 26, pct: 46 },
    timeline: [
      { time: '22 May, 2:00 PM', text: 'Artist submitted report — Switched Off', state: 'done' },
      { time: '22 May, 2:05 PM', text: '48-hour monitoring window started', state: 'done' },
      { time: 'Now — Monitoring', text: 'Platform is actively tracking number activity', state: 'active' },
      { time: '24 May, 2:00 PM (expected)', text: 'Refund will release if no flags are triggered', state: 'upcoming' },
    ],
  },
  {
    id: 'fl3',
    title: 'Meena T. — Duplicate Claim',
    reportedAt: '2026-05-18',
    leadId: 'L-4733',
    reason: 'Reported as duplicate',
    status: 'rejected',
    rejection: 'System verified the number was not in your previous leads — it was a different customer. Trust Score reduced by 2 points.',
    timeline: [
      { time: '18 May, 11:30 AM', text: 'Artist submitted report — Duplicate', state: 'done' },
      { time: '18 May, 11:35 AM', text: 'System scan found no match in your history', state: 'done' },
      { time: '18 May, 12:10 PM', text: 'Report rejected · Refund denied', state: 'done' },
    ],
  },
];

const statusBadge: Record<Status, { label: string; bg: string; color: string; icon: typeof CheckCircle2 }> = {
  refunded: { label: 'Refunded', bg: 'bg-emerald-100', color: 'text-emerald-700', icon: CheckCircle2 },
  monitoring: { label: 'Monitoring', bg: 'bg-blue-100', color: 'text-blue-700', icon: Radio },
  rejected: { label: 'Rejected', bg: 'bg-red-100', color: 'text-red-700', icon: XCircle },
};

const cardBorder: Record<Status, string> = {
  refunded: 'border-cream-200',
  monitoring: 'border-blue-200',
  rejected: 'border-red-200',
};

export default function FakeLeadsPage() {
  const trustScore = 96;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <AlertTriangle size={22} /> Fake Lead Protection
        </h1>
        <p className="text-henna-400 text-sm">Report only genuine fake leads — abuse leads to permanent bans</p>
      </div>

      {/* Info banner */}
      <div className="rounded-2xl bg-cream-50 border border-cream-200 p-4 flex items-start gap-3 text-sm text-henna-700">
        <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-henna-800">Smart Fake Lead Protection.</span> Only report genuine fake leads. Platform monitors reports for 48 hours. Side deals will result in a permanent ban.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { value: 3, label: 'Total Reported', tone: 'text-henna-800' },
          { value: 2, label: 'Refunded', tone: 'text-emerald-600' },
          { value: 1, label: 'Under Review', tone: 'text-amber-600' },
          { value: '₹300', label: 'Total Refunded', tone: 'text-emerald-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-cream-200 p-4 text-center">
            <p className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${s.tone}`}>{s.value}</p>
            <p className="text-[11px] uppercase tracking-wider text-henna-400 mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Trust Score */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Your Trust Score</h2>
          <span className="text-[11px] uppercase tracking-wider text-henna-400">Reporting history</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Score ring */}
          <div className="relative w-28 h-28 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#F0ECD0" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#trustGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - trustScore / 100) }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="trustGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-emerald-600 tabular-nums">{trustScore}</span>
              <span className="text-[10px] uppercase tracking-wider text-henna-400">/100</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <p className="font-bold text-henna-800 font-[family-name:var(--font-heading)]">Excellent — Trusted Artist</p>
            <p className="text-sm text-henna-500 mt-1">All reports have been genuine. The platform gives you priority treatment.</p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                Fast refund priority
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                No penalty risk
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                <Radio size={11} /> 1 lead under monitoring
              </span>
            </div>
          </div>
        </div>

        {/* Score bars */}
        <div className="mt-5 space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-henna-500">Report Accuracy</span>
              <span className="font-semibold text-emerald-600">100%</span>
            </div>
            <div className="h-2 rounded-full bg-cream-100 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.7 }} className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-henna-500">Side-deal risk (last 90 days)</span>
              <span className="font-semibold text-emerald-600">0 flags</span>
            </div>
            <div className="h-2 rounded-full bg-cream-100 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '5%' }} transition={{ duration: 0.7, delay: 0.05 }} className="h-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* How it works */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">How the system works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Phone, title: 'Not Reachable Reports', body: 'Platform monitors the number for 48 hours. If it comes online and detects a call from your device, the report is rejected with a penalty.' },
            { icon: Search, title: 'Duplicate Reports', body: 'System auto-checks the phone number against your lead history. Match means instant refund. No match means rejection.' },
            { icon: ShieldCheck, title: 'Side-Deal Detection', body: 'Platform sends a feedback message to the client. If the client confirms a deal, the artist is banned and a legal notice is issued.' },
            { icon: FileSearch, title: 'Evidence', body: 'For claims, the artist must provide call recordings or supporting evidence to validate the report.' },
          ].map((it, i) => (
            <div key={i} className="bg-cream-50 border border-cream-200 rounded-2xl p-4">
              <div className="w-10 h-10 rounded-xl bg-white text-henna-700 border border-cream-200 flex items-center justify-center mb-3">
                <it.icon size={18} />
              </div>
              <p className="font-semibold text-henna-800 text-sm">{it.title}</p>
              <p className="text-xs text-henna-500 mt-1 leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reported leads list */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Reported Leads History</h2>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-henna-700 text-cream-100 hover:bg-henna-800">
            <Plus size={12} /> Report Lead
          </button>
        </div>

        <div className="space-y-4">
          {fakeLeads.map((l, idx) => {
            const Cfg = statusBadge[l.status];
            return (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl border ${cardBorder[l.status]} bg-white p-5`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-henna-800 text-sm">{l.title}</p>
                    <p className="text-xs text-henna-400 mt-0.5">
                      Reported {formatDate(l.reportedAt)} · Lead #{l.leadId} · {l.reason}
                    </p>
                  </div>
                  <span className={`shrink-0 inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full ${Cfg.bg} ${Cfg.color}`}>
                    <Cfg.icon size={12} /> {Cfg.label}
                  </span>
                </div>

                {/* Status-specific details */}
                {l.status === 'refunded' && l.refund && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-henna-700 mb-3">
                    <span>
                      Refund: <span className="font-semibold text-emerald-600">₹{l.refund.amount} (100%)</span>
                    </span>
                    <span>Processed: {l.refund.processedAt}</span>
                    <span className="text-emerald-600">Auto-verified — number invalid</span>
                  </div>
                )}

                {l.status === 'monitoring' && l.monitoring && (
                  <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 mb-3 text-xs text-blue-800">
                    <p className="font-semibold flex items-center gap-1.5">
                      <Clock size={12} /> 48-hour monitoring window: {l.monitoring.start} → {l.monitoring.end}
                    </p>
                    <div className="flex items-center justify-between text-[11px] mt-2 mb-1">
                      <span>Monitoring progress</span>
                      <span className="font-semibold">{l.monitoring.remainingHours} hours remaining</span>
                    </div>
                    <div className="h-2 rounded-full bg-blue-100 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${l.monitoring.pct}%` }} transition={{ duration: 0.7 }} className="h-full bg-blue-500" />
                    </div>
                    <p className="mt-2">
                      Refund of <span className="font-semibold">₹{l.refund?.amount} (pending)</span> releases when monitoring completes with no flags.
                    </p>
                  </div>
                )}

                {l.status === 'rejected' && l.rejection && (
                  <div className="rounded-xl bg-red-50 border border-red-100 p-3 mb-3 text-xs text-red-700">
                    <span className="font-semibold">Report rejected.</span> {l.rejection}
                  </div>
                )}

                {/* Timeline */}
                <div className="space-y-2">
                  {l.timeline.map((t, ti) => (
                    <div key={ti} className="flex items-start gap-3 text-xs">
                      <span
                        className={`mt-0.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                          t.state === 'done'
                            ? 'bg-emerald-500'
                            : t.state === 'active'
                              ? 'bg-blue-500 ring-4 ring-blue-100'
                              : 'bg-cream-300'
                        }`}
                      />
                      <span className="w-44 shrink-0 text-henna-400">{t.time}</span>
                      <span className={`${t.state === 'upcoming' ? 'text-henna-400' : 'text-henna-700'}`}>{t.text}</span>
                    </div>
                  ))}
                </div>

                {l.status === 'rejected' && (
                  <p className="mt-3 text-xs text-henna-500">
                    If you believe this was an error,{' '}
                    <button className="text-emerald-600 font-semibold hover:underline">contact support</button>.
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
