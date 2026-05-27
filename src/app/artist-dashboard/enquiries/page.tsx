'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, Phone, MessageSquare, FileText, Zap, Flame, AlertTriangle, Eye, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { mockLeads } from '@/data/mock';
import { formatDate } from '@/lib/utils';

const filters: { key: 'all' | 'new' | 'unlocked' | 'contacted' | 'pending'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'unlocked', label: 'Unlocked' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'pending', label: 'Pending' },
];

const statusBadge: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border border-blue-100',
  unlocked: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  contacted: 'bg-amber-50 text-amber-700 border border-amber-100',
};

const quickReplies = [
  '👋 Namaste! I am available on that date. Full bridal at ₹10,000 — interested?',
  '💰 Pricing — Arabic full hands+feet ₹5,000 · Bridal Full ₹10,000. Which one would you prefer?',
  '📸 Could you share a reference design photo? I will recommend the best fit.',
];

export default function EnquiriesPage() {
  const [filter, setFilter] = useState<typeof filters[number]['key']>('all');
  const [expandedReplies, setExpandedReplies] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (filter === 'all') return mockLeads;
    if (filter === 'pending') return mockLeads.filter(l => l.status === 'new');
    return mockLeads.filter(l => l.status === filter);
  }, [filter]);

  const counts = {
    all: mockLeads.length,
    new: mockLeads.filter(l => l.status === 'new').length,
    unlocked: mockLeads.filter(l => l.status === 'unlocked').length,
    contacted: mockLeads.filter(l => l.status === 'contacted').length,
    pending: mockLeads.filter(l => l.status === 'new').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Inbox size={22} /> Enquiries & Leads
        </h1>
        <p className="text-henna-400 text-sm">Reply fast — hot leads usually book within an hour</p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                active ? 'bg-henna-700 text-cream-100 border-henna-700' : 'bg-white text-henna-600 border-cream-200 hover:bg-cream-50'
              }`}
            >
              {f.label}
              <span className={`min-w-[1.25rem] px-1.5 rounded-full text-[10px] leading-4 text-center ${
                active ? 'bg-cream-100/20 text-cream-100' : 'bg-cream-100 text-henna-500'
              }`}>{counts[f.key]}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <div className="space-y-4">
          {visible.map((l, i) => {
            const isHot = l.isUrgent;
            const repliesOpen = expandedReplies === l.id;
            return (
              <motion.div
                key={l.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.04 }}
                className={`rounded-2xl border bg-white p-5 ${l.isUrgent ? 'border-rose-200' : 'border-cream-200'}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      l.isUrgent ? 'bg-rose-100 text-rose-700' : 'bg-gold-100 text-gold-700'
                    }`}>
                      {l.userName[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-henna-800 flex flex-wrap items-center gap-2">
                        {l.userName}
                        {isHot && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100 text-[10px] font-bold">
                            <Flame size={10} /> HOT Lead
                          </span>
                        )}
                        {l.isUrgent && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-bold">
                            <Zap size={10} /> Urgent
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-henna-400 mt-0.5">
                        {l.occasion} · {l.city} · {formatDate(l.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap ${statusBadge[l.status] ?? 'bg-cream-100 text-henna-600'}`}>
                    {l.status[0].toUpperCase() + l.status.slice(1)}
                  </span>
                </div>

                <p className="text-sm text-henna-700 leading-relaxed mb-3">{l.message}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-henna-500 mb-4">
                  <span>Budget: <strong className="text-henna-800">{l.budget}</strong></span>
                  <span>Event: <strong className="text-henna-800">{formatDate(l.eventDate)}</strong></span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {l.status === 'new' ? (
                    <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-henna-700 hover:bg-henna-800 text-cream-100">
                      <Eye size={12} /> Unlock Lead — ₹50
                    </button>
                  ) : (
                    <>
                      <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100">
                        <Phone size={12} /> {l.userPhone}
                      </button>
                      <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                        <MessageSquare size={12} /> Chat
                      </button>
                      <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100">
                        <ImageIcon size={12} /> WhatsApp
                      </button>
                      <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                        <FileText size={12} /> Create Invoice
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setExpandedReplies(repliesOpen ? null : l.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-gold-50 text-gold-700 border border-gold-100 hover:bg-gold-100"
                  >
                    <Zap size={12} /> Quick Reply
                    {repliesOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-rose-600 border border-rose-100 bg-rose-50 hover:bg-rose-100">
                    <AlertTriangle size={12} /> Report Fake
                  </button>
                </div>

                {repliesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-xl bg-cream-50 border border-cream-200 p-3"
                  >
                    <p className="text-[11px] uppercase tracking-wider text-henna-400 font-bold mb-2">Smart Reply Templates</p>
                    <div className="space-y-2">
                      {quickReplies.map((qr, qi) => (
                        <button
                          key={qi}
                          className="w-full text-left text-xs px-3 py-2 rounded-lg border border-cream-200 bg-white hover:bg-cream-50 text-henna-700"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {visible.length === 0 && (
            <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center">
              <p className="font-semibold text-henna-800">No enquiries here</p>
              <p className="text-sm text-henna-400 mt-1">Try a different filter to see more.</p>
            </div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
