'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Download, FileText, Timer, Bell, Clock, CheckCircle2, XCircle, ChevronDown } from 'lucide-react';
import { mockBookings } from '@/data/mock';
import { formatPrice, formatDate } from '@/lib/utils';

const statusOptions: { key: string; label: string }[] = [
  { key: 'enquiry_sent', label: 'Enquiry Sent' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'booking_confirmed', label: 'Confirmed' },
  { key: 'service_in_progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const statusBadge: Record<string, string> = {
  enquiry_sent: 'bg-blue-50 text-blue-700 border border-blue-100',
  contacted: 'bg-amber-50 text-amber-700 border border-amber-100',
  booking_confirmed: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  service_in_progress: 'bg-purple-50 text-purple-700 border border-purple-100',
  completed: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-700 border border-rose-100',
};

const filters: { key: 'all' | 'upcoming' | 'completed' | 'cancelled'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const upcomingStatuses = ['enquiry_sent', 'contacted', 'booking_confirmed', 'service_in_progress'];

export default function ArtistBookingsPage() {
  const [filter, setFilter] = useState<typeof filters[number]['key']>('all');

  const visible = useMemo(() => {
    if (filter === 'all') return mockBookings;
    if (filter === 'upcoming') return mockBookings.filter(b => upcomingStatuses.includes(b.status));
    if (filter === 'completed') return mockBookings.filter(b => b.status === 'completed');
    return mockBookings.filter(b => b.status === 'cancelled');
  }, [filter]);

  const counts = {
    all: mockBookings.length,
    upcoming: mockBookings.filter(b => upcomingStatuses.includes(b.status)).length,
    completed: mockBookings.filter(b => b.status === 'completed').length,
    cancelled: mockBookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <CalendarIcon size={22} /> Manage Bookings
          </h1>
          <p className="text-henna-400 text-sm">Track every booking from enquiry to completion</p>
        </div>
        <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
          <Download size={13} /> Export
        </button>
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

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {visible.map((b, i) => (
            <motion.div
              key={b.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl border border-cream-200 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <p className="font-semibold text-henna-800">Booking #{b.id.toUpperCase()} · {b.artistName}</p>
                  <p className="text-xs text-henna-400 mt-0.5">{b.occasion} · {formatDate(b.serviceDate)} · {b.address}</p>
                </div>
                <span className={`inline-flex items-center text-[11px] font-semibold px-3 py-1 rounded-full ${statusBadge[b.status] ?? 'bg-cream-100 text-henna-600'}`}>
                  {b.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-henna-400">Total</p>
                  <p className="font-semibold text-henna-800 tabular-nums">{formatPrice(b.totalAmount)}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-henna-400">Advance</p>
                  <p className="font-semibold text-emerald-600 tabular-nums">{formatPrice(b.advancePaid)}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-henna-400">Remaining</p>
                  <p className="font-semibold text-henna-800 tabular-nums">{formatPrice(b.remainingAmount)}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-henna-400">Duration</p>
                  <p className="font-semibold text-henna-800">{b.duration}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <select
                    defaultValue={b.status}
                    className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-cream-300 bg-white text-xs font-semibold text-henna-700 focus:outline-none focus:ring-2 focus:ring-gold-300"
                  >
                    {statusOptions.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-henna-400 pointer-events-none" />
                </div>
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-henna-700 text-cream-100 hover:bg-henna-800">
                  <FileText size={12} /> Invoice
                </button>
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                  <Timer size={12} /> Service Timer
                </button>
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                  <Bell size={12} /> Send Reminder
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {visible.length === 0 && (
          <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center">
            <p className="font-semibold text-henna-800">No bookings here</p>
            <p className="text-sm text-henna-400 mt-1">Try a different filter to see more.</p>
          </div>
        )}
      </div>
    </div>
  );
}
