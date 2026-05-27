'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, XCircle, Eye, AlertOctagon, Clock } from 'lucide-react';

type FlrStatus = 'open' | 'resolved' | 'history';

type Report = {
  id: string;
  date: string;
  reportedBy: string;
  leadClient: string;
  leadCity: string;
  occasion: string;
  reason: string;
  status: FlrStatus;
  resolution?: 'Confirmed Fake' | 'Dismissed' | 'User Warned';
};

const reports: Report[] = [
  { id: 'FLR-001', date: '2026-05-17', reportedBy: 'Ritu Verma', leadClient: 'Priya Malhotra', leadCity: 'Mumbai', occasion: 'Bridal', reason: 'Out of Service Area', status: 'open' },
  { id: 'FLR-002', date: '2026-05-16', reportedBy: 'Nisha Kapoor', leadClient: 'Sameer Khan', leadCity: 'Ahmedabad', occasion: 'Party', reason: 'Duplicate Lead', status: 'open' },
  { id: 'FLR-003', date: '2026-05-15', reportedBy: 'Meera Singh', leadClient: 'Unknown User', leadCity: 'Jaipur', occasion: 'Karva Chauth', reason: 'Other — Client never responded after 3 follow-ups, likely spam', status: 'open' },
  { id: 'FLR-004', date: '2026-05-12', reportedBy: 'Aarti Meena', leadClient: 'Rohit Singh', leadCity: 'Delhi', occasion: 'Engagement', reason: 'Number not reachable', status: 'resolved', resolution: 'Confirmed Fake' },
  { id: 'FLR-005', date: '2026-05-08', reportedBy: 'Heena Qureshi', leadClient: 'Kavya Joshi', leadCity: 'Ahmedabad', occasion: 'Bridal', reason: 'Duplicate Lead', status: 'resolved', resolution: 'Dismissed' },
  { id: 'FLR-006', date: '2026-04-28', reportedBy: 'Isha Malhotra', leadClient: 'Test User', leadCity: 'Delhi', occasion: 'Party', reason: 'Spam test', status: 'history', resolution: 'User Warned' },
];

const tabs: { key: FlrStatus; label: string }[] = [
  { key: 'open', label: 'Open' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'history', label: 'History' },
];

const resolutionTone = {
  'Confirmed Fake': 'bg-rose-50 text-rose-700 border border-rose-100',
  'Dismissed': 'bg-cream-100 text-henna-600 border border-cream-200',
  'User Warned': 'bg-amber-50 text-amber-700 border border-amber-100',
};

export default function FakeLeadReportsPage() {
  const [tab, setTab] = useState<FlrStatus>('open');
  const visible = useMemo(() => reports.filter(r => r.status === tab), [tab]);
  const counts = {
    open: reports.filter(r => r.status === 'open').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    history: reports.filter(r => r.status === 'history').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <AlertTriangle size={22} /> Fake Lead Reports
        </h1>
        <p className="text-henna-400 text-sm">Review and resolve artist-submitted reports within 48 hours</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                active ? 'bg-henna-700 text-cream-100 border-henna-700' : 'bg-white text-henna-600 border-cream-200 hover:bg-cream-50'
              }`}
            >
              {t.label}
              <span className={`min-w-[1.25rem] px-1.5 rounded-full text-[10px] leading-4 text-center ${
                active ? 'bg-cream-100/20 text-cream-100' : 'bg-cream-100 text-henna-500'
              }`}>{counts[t.key]}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {visible.map((r, i) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl border border-cream-200 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-henna-400 font-semibold flex items-center gap-2">
                    {r.id} · {r.date}
                    {r.status === 'open' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                        <Clock size={10} /> Open
                      </span>
                    )}
                  </p>
                  <p className="font-semibold text-henna-800 mt-1">Reported by: {r.reportedBy}</p>
                  <p className="text-xs text-henna-500 mt-1">
                    Lead: <span className="font-semibold text-henna-800">{r.leadClient}</span> · {r.leadCity} · {r.occasion}
                  </p>
                  <p className="text-sm text-henna-700 mt-1.5 leading-relaxed"><span className="font-semibold text-henna-800">Reason:</span> {r.reason}</p>
                </div>
                {r.resolution && (
                  <span className={`inline-flex items-center text-[11px] font-semibold px-3 py-1 rounded-full ${resolutionTone[r.resolution]}`}>
                    {r.resolution}
                  </span>
                )}
              </div>

              {r.status === 'open' && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white">
                    <AlertOctagon size={12} /> Confirm Fake
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                    <XCircle size={12} /> Dismiss
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-henna-800">
                    <AlertTriangle size={12} /> Warn User
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                    <Eye size={12} /> View Lead Details
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {visible.length === 0 && (
          <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center">
            <p className="font-semibold text-henna-800">No reports here</p>
            <p className="text-sm text-henna-400 mt-1">Switch tabs to see {tab === 'open' ? 'resolved or history' : tab === 'resolved' ? 'open or history' : 'open or resolved'} entries.</p>
          </div>
        )}
      </div>
    </div>
  );
}
