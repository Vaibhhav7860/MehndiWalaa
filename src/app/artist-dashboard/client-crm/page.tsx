'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, Phone, MapPin, Star, MessageSquare, FileText, Bell, Save, Plus, Crown } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

type ClientTag = 'VIP' | 'Repeat' | 'New';
type ServiceTag = 'Bridal' | 'Party' | 'Engagement' | 'Karva Chauth';

type Booking = {
  date: string;
  service: string;
  amount: number;
  rating: number;
};

type ClientRecord = {
  id: string;
  name: string;
  initial: string;
  phone: string;
  city: string;
  bookings: number;
  totalSpend: number;
  tags: ClientTag[];
  service?: ServiceTag;
  history?: Booking[];
  notes?: string;
  insight?: string;
  followUpReason?: string;
  accent: 'gold' | 'emerald' | 'purple' | 'rose';
};

const clients: ClientRecord[] = [
  {
    id: 'c1',
    name: 'Priya Sharma',
    initial: 'P',
    phone: '+91 98765 43210',
    city: 'Andheri West, Mumbai',
    bookings: 5,
    totalSpend: 38500,
    tags: ['VIP'],
    service: 'Bridal',
    accent: 'gold',
    history: [
      { date: '10 May 2026', service: 'Bridal Full — Arabic Style', amount: 12000, rating: 5 },
      { date: '28 Oct 2025', service: 'Karva Chauth — Rajasthani', amount: 5500, rating: 5 },
      { date: 'Jun 2025', service: 'Engagement — Mughal', amount: 8000, rating: 5 },
    ],
    notes:
      'Prefers Arabic style. Wants both hands and feet. No allergies. Available after 3 PM. Will book again for elder daughter\'s wedding.',
  },
  {
    id: 'c2',
    name: 'Anita Desai',
    initial: 'A',
    phone: '+91 91234 56789',
    city: 'Bandra, Mumbai',
    bookings: 2,
    totalSpend: 9000,
    tags: ['Repeat'],
    service: 'Party',
    accent: 'emerald',
    insight: 'Anita booked last October too — message her early for Karva Chauth (Oct 28).',
  },
  {
    id: 'c3',
    name: 'Sunita Joshi',
    initial: 'S',
    phone: '+91 99887 76655',
    city: 'Borivali, Mumbai',
    bookings: 1,
    totalSpend: 3200,
    tags: ['New'],
    accent: 'purple',
    followUpReason: 'No review yet — send a review request after the service.',
  },
];

const accentClasses: Record<ClientRecord['accent'], { left: string; avatar: string; avatarBg: string }> = {
  gold: { left: 'border-l-4 border-l-gold-500', avatar: 'text-gold-700', avatarBg: 'bg-gold-100' },
  emerald: { left: 'border-l-4 border-l-emerald-500', avatar: 'text-emerald-700', avatarBg: 'bg-emerald-100' },
  purple: { left: 'border-l-4 border-l-purple-500', avatar: 'text-purple-700', avatarBg: 'bg-purple-100' },
  rose: { left: 'border-l-4 border-l-rose-500', avatar: 'text-rose-700', avatarBg: 'bg-rose-100' },
};

const tagStyles: Record<ClientTag, string> = {
  VIP: 'bg-gold-50 text-gold-700 border border-gold-100',
  Repeat: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  New: 'bg-cream-100 text-henna-600 border border-cream-200',
};

const serviceStyles: Record<ServiceTag, string> = {
  Bridal: 'bg-rose-50 text-rose-600 border border-rose-100',
  Party: 'bg-purple-50 text-purple-600 border border-purple-100',
  Engagement: 'bg-blue-50 text-blue-600 border border-blue-100',
  'Karva Chauth': 'bg-amber-50 text-amber-700 border border-amber-100',
};

const filters: { key: 'all' | 'repeat' | 'bridal' | 'party' | 'vip'; label: string }[] = [
  { key: 'all', label: 'All Clients' },
  { key: 'repeat', label: 'Repeat' },
  { key: 'bridal', label: 'Bridal' },
  { key: 'party', label: 'Party' },
  { key: 'vip', label: 'VIP (₹10k+)' },
];

export default function ClientCRMPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<typeof filters[number]['key']>('all');

  const filtered = useMemo(() => {
    return clients.filter(c => {
      if (query) {
        const q = query.toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !c.phone.includes(q)) return false;
      }
      switch (filter) {
        case 'repeat': return c.tags.includes('Repeat') || c.tags.includes('VIP');
        case 'bridal': return c.service === 'Bridal';
        case 'party': return c.service === 'Party';
        case 'vip': return c.totalSpend >= 10000;
        default: return true;
      }
    });
  }, [query, filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Sparkles size={22} /> Client CRM
        </h1>
        <p className="text-henna-400 text-sm">Track every client, their history and what to do next</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { value: '47', label: 'Total Clients', tone: 'text-henna-800' },
          { value: '18', label: 'Repeat Clients', tone: 'text-emerald-600' },
          { value: '₹8.2K', label: 'Avg Order Value', tone: 'text-gold-700' },
          { value: '4.8★', label: 'Avg Rating', tone: 'text-amber-600' },
          { value: '3', label: 'Follow-up Needed', tone: 'text-rose-600' },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-cream-200 p-4 text-center">
            <p className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${k.tone}`}>{k.value}</p>
            <p className="text-[11px] uppercase tracking-wider text-henna-400 mt-1 font-medium">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-henna-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by client name or phone..."
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map(f => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
                  active ? 'bg-henna-700 text-cream-100 border-henna-700' : 'bg-white text-henna-600 border-cream-200 hover:bg-cream-50'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <button className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-henna-800">
          <Plus size={14} /> New Client
        </button>
      </div>

      {/* Client cards */}
      <div className="space-y-4">
        {filtered.map((c, i) => {
          const accent = accentClasses[c.accent];
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl border border-cream-200 ${accent.left} p-5`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${accent.avatarBg} ${accent.avatar} flex items-center justify-center text-lg font-bold flex-shrink-0`}>
                  {c.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-henna-800 text-base">{c.name}</p>
                    {c.tags.map(t => (
                      <span key={t} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagStyles[t]} flex items-center gap-1`}>
                        {t === 'VIP' && <Crown size={10} />} {t}
                      </span>
                    ))}
                    {c.service && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${serviceStyles[c.service]}`}>{c.service}</span>
                    )}
                  </div>
                  <p className="text-xs text-henna-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="inline-flex items-center gap-1"><Phone size={11} /> {c.phone}</span>
                    <span className="inline-flex items-center gap-1"><MapPin size={11} /> {c.city}</span>
                    <span>{c.bookings} {c.bookings === 1 ? 'booking' : 'bookings'}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-600 font-[family-name:var(--font-heading)] tabular-nums">{formatPrice(c.totalSpend)}</p>
                  <p className="text-[11px] text-henna-400 uppercase tracking-wider">Total Spend</p>
                </div>
              </div>

              {c.history && c.history.length > 0 && (
                <div className="mt-4 bg-cream-50 border border-cream-200 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-henna-400 mb-2">Booking history</p>
                  <ul className="space-y-1.5">
                    {c.history.map((b, bi) => (
                      <li key={bi} className="flex items-center gap-3 text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold whitespace-nowrap">{b.date}</span>
                        <span className="flex-1 text-henna-700 truncate">{b.service}</span>
                        <span className="font-semibold text-emerald-600 tabular-nums">{formatPrice(b.amount)}</span>
                        <span className="text-amber-500 inline-flex items-center gap-0.5">
                          {Array.from({ length: b.rating }).map((_, si) => <Star key={si} size={11} className="fill-amber-400 text-amber-400" />)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {c.notes && (
                <div className="mt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-henna-400 mb-1.5">Private notes</p>
                  <p className="text-sm text-henna-700 bg-amber-50 border border-amber-100 rounded-xl p-3 leading-relaxed">{c.notes}</p>
                </div>
              )}

              {c.insight && (
                <div className="mt-3 bg-cream-50 border border-cream-200 rounded-xl p-3 text-xs text-henna-600">
                  <span className="font-semibold text-henna-800">AI Insight:</span> {c.insight}
                </div>
              )}

              {c.followUpReason && (
                <div className="mt-3 bg-rose-50 border border-rose-100 rounded-xl p-3 text-xs text-rose-700">
                  ⚠ {c.followUpReason}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100">
                  <MessageSquare size={12} /> WhatsApp
                </button>
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                  <FileText size={12} /> New Invoice
                </button>
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                  <Bell size={12} /> Set Follow-up
                </button>
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                  <Save size={12} /> Save Note
                </button>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center">
            <p className="font-semibold text-henna-800">No matching clients</p>
            <p className="text-sm text-henna-400 mt-1">Try a different search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
