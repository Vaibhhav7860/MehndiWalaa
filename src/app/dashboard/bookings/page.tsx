'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Circle, XCircle, ArrowRight } from 'lucide-react';
import { mockBookings } from '@/data/mock';
import { formatPrice, formatDate } from '@/lib/utils';

const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
  enquiry_sent: { icon: Circle, color: 'text-blue-500', bg: 'bg-blue-100' },
  contacted: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  booking_confirmed: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
  service_in_progress: { icon: Clock, color: 'text-purple-500', bg: 'bg-purple-100' },
  completed: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100' },
};

const filters: { key: 'all' | keyof typeof statusConfig; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'enquiry_sent', label: 'Enquiry Sent' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'booking_confirmed', label: 'Booking Confirmed' },
  { key: 'service_in_progress', label: 'Service in Progress' },
  { key: 'completed', label: 'Completed' },
];

export default function BookingsPage() {
  const [filter, setFilter] = useState<typeof filters[number]['key']>('all');
  const visibleBookings = filter === 'all' ? mockBookings : mockBookings.filter(b => b.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">My Bookings</h1>

      <div className="flex flex-wrap gap-2">
        {filters.map(f => {
          const count = f.key === 'all' ? mockBookings.length : mockBookings.filter(b => b.status === f.key).length;
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                active
                  ? 'bg-henna-700 text-cream-100 border-henna-700'
                  : 'bg-white text-henna-600 border-cream-200 hover:bg-cream-50'
              }`}
            >
              {f.label}
              <span
                className={`min-w-[1.25rem] px-1.5 rounded-full text-[10px] leading-4 text-center ${
                  active ? 'bg-cream-100/20 text-cream-100' : 'bg-cream-100 text-henna-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {visibleBookings.map((b, i) => (
            <motion.div
              key={b.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-cream-200 p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-henna-800 text-lg">{b.artistName}</h3>
                  <p className="text-sm text-henna-400">{b.occasion} · {formatDate(b.serviceDate)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[b.status]?.bg} ${statusConfig[b.status]?.color}`}>
                  {b.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div><p className="text-xs text-henna-400">Total</p><p className="font-semibold text-henna-800">{formatPrice(b.totalAmount)}</p></div>
                <div><p className="text-xs text-henna-400">Advance</p><p className="font-semibold text-green-600">{formatPrice(b.advancePaid)}</p></div>
                <div><p className="text-xs text-henna-400">Remaining</p><p className="font-semibold text-henna-800">{formatPrice(b.remainingAmount)}</p></div>
                <div><p className="text-xs text-henna-400">Duration</p><p className="font-semibold text-henna-800">{b.duration}</p></div>
              </div>
              {/* Timeline */}
              <div className="border-t border-cream-100 pt-4">
                <p className="text-xs font-semibold text-henna-600 mb-3">Booking Timeline</p>
                <div className="flex gap-2 overflow-x-auto">
                  {b.timeline.map((t, ti) => {
                    const cfg = statusConfig[t.status];
                    return (
                      <div key={ti} className="flex items-center gap-2">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${cfg?.bg} ${cfg?.color}`}>
                          {cfg && <cfg.icon size={12} />}
                          {t.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </div>
                        {ti < b.timeline.length - 1 && <ArrowRight size={12} className="text-cream-400 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {visibleBookings.length === 0 && (
          <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center">
            <div className="w-12 h-12 rounded-xl bg-cream-100 text-henna-400 flex items-center justify-center mx-auto mb-3">
              <Calendar size={20} />
            </div>
            <p className="font-semibold text-henna-800">No bookings in this status</p>
            <p className="text-sm text-henna-400 mt-1">Try a different filter to see more bookings.</p>
          </div>
        )}
      </div>
    </div>
  );
}
