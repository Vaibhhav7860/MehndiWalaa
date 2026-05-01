'use client';
import { motion } from 'framer-motion';
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

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">My Bookings</h1>
      <div className="space-y-4">
        {mockBookings.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-cream-200 p-5">
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
      </div>
    </div>
  );
}
