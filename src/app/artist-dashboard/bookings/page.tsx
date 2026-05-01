'use client';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Circle } from 'lucide-react';
import { mockBookings } from '@/data/mock';
import { formatPrice, formatDate } from '@/lib/utils';

export default function ArtistBookingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Manage Bookings</h1>
      <div className="space-y-4">
        {mockBookings.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-cream-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div><h3 className="font-semibold text-henna-800">Booking #{b.id.toUpperCase()}</h3><p className="text-xs text-henna-400">{b.occasion} · {formatDate(b.serviceDate)}</p></div>
              <select defaultValue={b.status} className="px-3 py-1.5 border border-cream-300 rounded-lg text-xs bg-white">
                <option value="enquiry_sent">Enquiry Sent</option><option value="contacted">Contacted</option><option value="booking_confirmed">Confirmed</option>
                <option value="service_in_progress">In Progress</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div><p className="text-xs text-henna-400">Client</p><p className="font-medium text-henna-800">{b.artistName}</p></div>
              <div><p className="text-xs text-henna-400">Amount</p><p className="font-medium text-henna-800">{formatPrice(b.totalAmount)}</p></div>
              <div><p className="text-xs text-henna-400">Advance</p><p className="font-medium text-green-600">{formatPrice(b.advancePaid)}</p></div>
              <div><p className="text-xs text-henna-400">Address</p><p className="font-medium text-henna-800 truncate">{b.address}</p></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
