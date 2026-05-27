'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, BadgeCheck, ShieldCheck, ShieldAlert, Crown, Sparkles, Eye, MoreHorizontal } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

type Plan = 'Free' | 'Starter' | 'Professional' | 'Premium';
type Status = 'Active' | 'Suspended';

type Row = {
  id: string;
  name: string;
  city: string;
  plan: Plan;
  bookings: number;
  earnings: number;
  status: Status;
  verified: boolean;
  recommended: boolean;
  flagged: boolean;
};

const artists: Row[] = [
  { id: 'MW-DEL-001', name: 'Ritu Verma', city: 'Delhi', plan: 'Premium', bookings: 42, earnings: 12500, status: 'Active', verified: true, recommended: true, flagged: false },
  { id: 'MW-JAI-002', name: 'Meera Singh', city: 'Jaipur', plan: 'Professional', bookings: 28, earnings: 8200, status: 'Active', verified: true, recommended: false, flagged: false },
  { id: 'MW-AHM-003', name: 'Divya Shah', city: 'Ahmedabad', plan: 'Starter', bookings: 15, earnings: 3400, status: 'Active', verified: false, recommended: false, flagged: false },
  { id: 'MW-DEL-004', name: 'Pooja Reddy', city: 'Delhi', plan: 'Professional', bookings: 35, earnings: 1500, status: 'Suspended', verified: true, recommended: false, flagged: true },
  { id: 'MW-AHM-005', name: 'Nisha Kapoor', city: 'Ahmedabad', plan: 'Premium', bookings: 55, earnings: 22000, status: 'Active', verified: true, recommended: true, flagged: false },
  { id: 'MW-DEL-006', name: 'Isha Malhotra', city: 'Delhi', plan: 'Professional', bookings: 31, earnings: 9800, status: 'Active', verified: true, recommended: true, flagged: false },
  { id: 'MW-JAI-007', name: 'Aarti Meena', city: 'Jaipur', plan: 'Premium', bookings: 68, earnings: 18500, status: 'Active', verified: true, recommended: true, flagged: false },
  { id: 'MW-AHM-008', name: 'Heena Qureshi', city: 'Ahmedabad', plan: 'Starter', bookings: 18, earnings: 4500, status: 'Active', verified: false, recommended: false, flagged: false },
  { id: 'MW-DEL-009', name: 'Shreya Nair', city: 'Delhi', plan: 'Professional', bookings: 22, earnings: 6700, status: 'Active', verified: true, recommended: false, flagged: false },
  { id: 'MW-JAI-010', name: 'Komal Rathore', city: 'Jaipur', plan: 'Starter', bookings: 12, earnings: 800, status: 'Suspended', verified: false, recommended: false, flagged: true },
];

const planTone: Record<Plan, string> = {
  Free: 'bg-cream-100 text-henna-600 border border-cream-200',
  Starter: 'bg-blue-50 text-blue-700 border border-blue-100',
  Professional: 'bg-gold-50 text-gold-700 border border-gold-100',
  Premium: 'bg-henna-50 text-henna-800 border border-henna-100',
};

const statusTone: Record<Status, string> = {
  Active: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  Suspended: 'bg-rose-50 text-rose-700 border border-rose-100',
};

const cities = ['All Cities', 'Delhi', 'Jaipur', 'Ahmedabad', 'Mumbai'];
const plans = ['All Plans', 'Free', 'Starter', 'Professional', 'Premium'];
const statuses = ['All Status', 'Active', 'Suspended'];

export default function AllArtistsPage() {
  const [city, setCity] = useState('All Cities');
  const [plan, setPlan] = useState('All Plans');
  const [status, setStatus] = useState('All Status');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return artists.filter(a => {
      if (city !== 'All Cities' && a.city !== city) return false;
      if (plan !== 'All Plans' && a.plan !== plan) return false;
      if (status !== 'All Status' && a.status !== status) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!a.name.toLowerCase().includes(q) && !a.id.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [city, plan, status, query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Users size={22} /> All Artists
        </h1>
        <p className="text-henna-400 text-sm">{filtered.length} of {artists.length} artists shown</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-cream-200 p-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-henna-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name or ID..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
          />
        </div>
        <FilterSelect value={city} onChange={setCity} options={cities} />
        <FilterSelect value={plan} onChange={setPlan} options={plans} />
        <FilterSelect value={status} onChange={setStatus} options={statuses} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-50 text-[11px] uppercase tracking-wider text-henna-400 border-b border-cream-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium">ID</th>
                <th className="text-left py-3 px-4 font-medium">Artist</th>
                <th className="text-left py-3 px-4 font-medium">City</th>
                <th className="text-left py-3 px-4 font-medium">Plan</th>
                <th className="text-right py-3 px-4 font-medium">Bookings</th>
                <th className="text-right py-3 px-4 font-medium">Earnings</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Badges</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-cream-100 last:border-0 hover:bg-cream-50/40"
                >
                  <td className="py-3 px-4 font-semibold text-henna-700">{a.id}</td>
                  <td className="py-3 px-4 text-henna-800 font-semibold">{a.name}</td>
                  <td className="py-3 px-4 text-henna-600">{a.city}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${planTone[a.plan]}`}>
                      {a.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums text-henna-800">{a.bookings}</td>
                  <td className="py-3 px-4 text-right tabular-nums font-semibold text-emerald-600">{formatPrice(a.earnings)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusTone[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      {a.verified && <BadgeCheck size={14} className="text-emerald-600" aria-label="Verified" />}
                      {a.recommended && <Crown size={14} className="text-gold-600" aria-label="Recommended" />}
                      {a.flagged && <ShieldAlert size={14} className="text-rose-600" aria-label="Flagged" />}
                      {!a.verified && !a.recommended && !a.flagged && <span className="text-henna-300 text-xs">—</span>}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-cream-100 text-henna-600" aria-label="View">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-cream-100 text-henna-600" aria-label="More">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-sm text-henna-400">No artists match these filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-cream-100">
          {filtered.map(a => (
            <div key={a.id} className="p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <p className="font-semibold text-henna-800">{a.name}</p>
                  <p className="text-[11px] text-henna-400">{a.id} · {a.city}</p>
                </div>
                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${statusTone[a.status]}`}>{a.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                <div>
                  <p className="text-henna-400">Plan</p>
                  <span className={`inline-flex text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${planTone[a.plan]}`}>{a.plan}</span>
                </div>
                <div>
                  <p className="text-henna-400">Bookings</p>
                  <p className="font-semibold text-henna-800">{a.bookings}</p>
                </div>
                <div>
                  <p className="text-henna-400">Earnings</p>
                  <p className="font-semibold text-emerald-600">{formatPrice(a.earnings)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="text-sm font-medium px-3 py-2 rounded-xl border border-cream-300 bg-white text-henna-700 focus:outline-none focus:ring-2 focus:ring-gold-300"
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}
