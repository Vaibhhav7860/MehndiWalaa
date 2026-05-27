'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Inbox, Phone, Search, MapPin, UserPlus, RotateCcw, Eye, X, Calendar } from 'lucide-react';

type Status = 'Unassigned' | 'Assigned' | 'Closed';

type Lead = {
  id: string;
  name: string;
  phoneMasked: string;
  city: string;
  area: string;
  occasion: string;
  status: Status;
  budget: string;
  preferredDate?: string;
  notes?: string;
  daysAgo: number;
  assignedTo?: string;
  assignedOn?: string;
  noResponse?: boolean;
  previous?: { name: string; on: string };
};

const leads: Lead[] = [
  { id: 'DL-2026-0518-001', name: 'Neha Kapoor', phoneMasked: '98●●●●●●10', city: 'Delhi', area: 'Greater Kailash II', occasion: 'Bridal', status: 'Unassigned', budget: '₹25,000 – ₹45,000', preferredDate: '2026-11-12', notes: 'Need full bridal for both hands and feet. Prefers an artist who does Arabic fusion.', daysAgo: 9 },
  { id: 'DL-2026-0518-002', name: 'Priya Shah', phoneMasked: '98●●●●●●45', city: 'Ahmedabad', area: 'Satellite', occasion: 'Karva Chauth', status: 'Unassigned', budget: '₹2,000 – ₹5,000', preferredDate: '2026-10-28', notes: 'Group booking for 4 sisters on the same day.', daysAgo: 9 },
  { id: 'DL-2026-0517-003', name: 'Anita Meena', phoneMasked: '99●●●●●●55', city: 'Jaipur', area: 'Vaishali Nagar', occasion: 'Party', status: 'Assigned', budget: '₹1,500 – ₹4,000', notes: 'College freshers party — trendy minimal designs.', daysAgo: 10, assignedTo: 'Meera Singh', assignedOn: '5/17/2026' },
  { id: 'DL-2026-0517-004', name: 'Rohit Verma', phoneMasked: '91●●●●●●89', city: 'Delhi', area: 'Rohini', occasion: 'Bridal', status: 'Assigned', budget: '₹18,000 – ₹35,000', preferredDate: '2026-12-01', notes: 'Destination wedding in Udaipur — artist needs to travel (discuss fee).', daysAgo: 10, assignedTo: 'Ritu Verma', assignedOn: '5/17/2026', noResponse: true },
  { id: 'DL-2026-0516-006', name: 'Sunita Rao', phoneMasked: '90●●●●●●78', city: 'Jaipur', area: 'Malviya Nagar', occasion: 'Teej', status: 'Unassigned', budget: '₹800 – ₹2,500', daysAgo: 11 },
  { id: 'DL-2026-0516-005', name: 'Kiran Desai', phoneMasked: '97●●●●●●09', city: 'Ahmedabad', area: 'Bopal', occasion: 'Bridal', status: 'Closed', budget: '₹12,000 – ₹28,000', notes: 'Gujarati wedding — needs sangeet + wedding day.', daysAgo: 11 },
  { id: 'DL-2026-0515-007', name: 'Megha Joshi', phoneMasked: '93●●●●●●01', city: 'Delhi', area: 'Dwarka', occasion: 'Party', status: 'Unassigned', budget: '₹3,000 – ₹8,000', preferredDate: '2026-06-20', notes: 'Corporate annual day — 25 people, quick designs.', daysAgo: 12 },
  { id: 'DL-2026-0515-008', name: 'Fatima Khan', phoneMasked: '94●●●●●●12', city: 'Ahmedabad', area: 'Maninagar', occasion: 'Eid', status: 'Assigned', budget: '₹1,000 – ₹3,500', notes: 'Home visit preferred.', daysAgo: 12, assignedTo: 'Heena Qureshi', assignedOn: '5/15/2026', noResponse: true },
  { id: 'DL-2026-0514-009', name: 'Lakshmi Nair', phoneMasked: '95●●●●●●23', city: 'Delhi', area: 'Lajpat Nagar', occasion: 'Bridal', status: 'Unassigned', budget: '₹30,000 – ₹55,000', preferredDate: '2027-01-15', notes: 'South Indian bridal — temple-style motifs.', daysAgo: 12 },
  { id: 'DL-2026-0514-010', name: 'Divya Patel', phoneMasked: '96●●●●●●34', city: 'Jaipur', area: 'C-Scheme', occasion: 'Rajasthani Bridal', status: 'Closed', budget: '₹15,000 – ₹40,000', notes: 'Traditional full hand required.', daysAgo: 13 },
  { id: 'DL-2026-0513-011', name: 'Arjun Singh', phoneMasked: '97●●●●●●45', city: 'Delhi', area: 'Pitampura', occasion: 'Karva Chauth', status: 'Assigned', budget: '₹1,500 – ₹3,000', notes: 'First time booking via the platform.', daysAgo: 14, assignedTo: 'Aarti Meena', assignedOn: '5/13/2026', previous: { name: 'Tanvi Agarwal', on: '5/13/2026, 10:00 AM' } },
  { id: 'DL-2026-0512-012', name: 'Shreya Iyer', phoneMasked: '98●●●●●●56', city: 'Ahmedabad', area: 'Thaltej', occasion: 'Bridal', status: 'Unassigned', budget: '₹10,000 – ₹22,000', preferredDate: '2026-09-05', notes: 'Intimate wedding — small gathering.', daysAgo: 15 },
];

const statusTone: Record<Status, string> = {
  Unassigned: 'bg-amber-50 text-amber-700 border border-amber-100',
  Assigned: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  Closed: 'bg-cream-100 text-henna-500 border border-cream-200',
};

const cityOptions = ['All', 'Delhi', 'Jaipur', 'Ahmedabad', 'Mumbai'];
const occasionOptions = ['All', 'Bridal', 'Karva Chauth', 'Party', 'Eid', 'Teej', 'Engagement'];
const statusOptions: ('All' | Status)[] = ['All', 'Unassigned', 'Assigned', 'Closed'];

export default function DirectLeadsPage() {
  const [city, setCity] = useState('All');
  const [occasion, setOccasion] = useState('All');
  const [status, setStatus] = useState<'All' | Status>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => leads.filter(l => {
    if (city !== 'All' && l.city !== city) return false;
    if (occasion !== 'All' && l.occasion !== occasion) return false;
    if (status !== 'All' && l.status !== status) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!l.name.toLowerCase().includes(q) && !l.id.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [city, occasion, status, query]);

  const counts = {
    unassigned: leads.filter(l => l.status === 'Unassigned').length,
    assignedToday: leads.filter(l => l.status === 'Assigned' && l.assignedOn?.includes('5/17/2026')).length,
    total: leads.length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Inbox size={22} /> Direct Leads
        </h1>
        <p className="text-henna-400 text-sm">Homepage enquiries — assign manually to artists</p>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Unassigned Leads" value={counts.unassigned} tone="amber" />
        <Stat label="Assigned Today" value={counts.assignedToday} tone="emerald" />
        <Stat label="Total This Month" value={counts.total} tone="henna" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-cream-200 p-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-henna-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name or lead ID..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
          />
        </div>
        <Select label="City" value={city} onChange={setCity} options={cityOptions} />
        <Select label="Occasion" value={occasion} onChange={setOccasion} options={occasionOptions} />
        <Select label="Status" value={status} onChange={v => setStatus(v as 'All' | Status)} options={statusOptions} />
      </div>

      <div className="space-y-3">
        {filtered.map((l, i) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="bg-white rounded-2xl border border-cream-200 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-henna-400 font-semibold">{l.id} · {l.daysAgo} days ago</p>
                <p className="font-semibold text-henna-800 text-base mt-0.5">{l.name}</p>
                <p className="text-xs text-henna-500 mt-0.5 flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1"><Phone size={11} /> {l.phoneMasked}</span>
                  <span className="inline-flex items-center gap-1"><MapPin size={11} /> {l.city} · {l.area}</span>
                  <span>Occasion: <span className="font-semibold text-henna-700">{l.occasion}</span></span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`inline-flex items-center text-[11px] font-semibold px-3 py-1 rounded-full ${statusTone[l.status]}`}>
                  {l.status}
                </span>
                {l.noResponse && (
                  <span className="inline-flex items-center text-[10px] font-semibold text-rose-700">No Response — Reassign</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-henna-600 mb-3">
              <p><span className="text-henna-400">Budget:</span> <span className="font-semibold text-henna-800">{l.budget}</span></p>
              {l.preferredDate && (
                <p className="inline-flex items-center gap-1.5">
                  <Calendar size={11} className="text-henna-400" />
                  <span className="text-henna-400">Preferred:</span> <span className="font-semibold text-henna-800">{l.preferredDate}</span>
                </p>
              )}
            </div>

            {l.notes && (
              <p className="text-sm text-henna-700 bg-cream-50 border border-cream-200 rounded-xl p-3 leading-relaxed mb-3">
                <span className="font-semibold text-henna-800">Notes:</span> {l.notes}
              </p>
            )}

            {l.assignedTo && (
              <p className="text-xs text-henna-500 mb-3">
                Assigned to <span className="font-semibold text-henna-800">{l.assignedTo}</span> · {l.assignedOn}
                {l.previous && <span className="ml-2 text-henna-400">(prev: {l.previous.name} · {l.previous.on})</span>}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {l.status === 'Closed' ? (
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                  <Eye size={12} /> View Full Details
                </button>
              ) : l.status === 'Unassigned' ? (
                <>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-henna-700 text-cream-100 hover:bg-henna-800">
                    <UserPlus size={12} /> Assign to Artist
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100">
                    <X size={12} /> Close Lead
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                    <Eye size={12} /> View Full Details
                  </button>
                </>
              ) : (
                <>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-henna-800">
                    <RotateCcw size={12} /> Reassign
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                    <X size={12} /> Close Lead
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                    <Eye size={12} /> View Full Details
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: 'amber' | 'emerald' | 'henna' }) {
  const tones = {
    amber: 'text-amber-700',
    emerald: 'text-emerald-700',
    henna: 'text-henna-800',
  };
  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-4 text-center">
      <p className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${tones[tone]} tabular-nums`}>{value}</p>
      <p className="text-[11px] uppercase tracking-wider text-henna-400 mt-1 font-medium">{label}</p>
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="text-sm font-medium px-3 py-2 rounded-xl border border-cream-300 bg-white text-henna-700 focus:outline-none focus:ring-2 focus:ring-gold-300"
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}
