'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Calendar, MessageCircle, Palette, Star, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { mockBookings } from '@/data/mock';
import { formatPrice, formatDate } from '@/lib/utils';

const statusColors: Record<string, string> = {
  enquiry_sent: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700',
  booking_confirmed: 'bg-green-100 text-green-700', service_in_progress: 'bg-purple-100 text-purple-700',
  completed: 'bg-emerald-100 text-emerald-700', cancelled: 'bg-red-100 text-red-700',
};

export default function DashboardPage() {
  const stats = [
    { icon: Heart, label: 'Shortlisted', value: '3', color: 'bg-red-50 text-red-500', href: '/dashboard/shortlist' },
    { icon: Calendar, label: 'Bookings', value: '3', color: 'bg-blue-50 text-blue-500', href: '/dashboard/bookings' },
    { icon: MessageCircle, label: 'Chats', value: '2', color: 'bg-green-50 text-green-500', href: '/dashboard/chat' },
    { icon: Palette, label: 'Mood Board', value: '2', color: 'bg-purple-50 text-purple-500', href: '/dashboard/mood-board' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">My Dashboard</h1>
        <p className="text-henna-400 text-sm">Welcome back! Here&apos;s your activity overview.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={s.href} className="block bg-white p-4 rounded-2xl border border-cream-200 hover-lift">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}><s.icon size={20} /></div>
              <p className="text-2xl font-bold text-henna-800">{s.value}</p>
              <p className="text-xs text-henna-400">{s.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700">Recent Bookings</h2>
          <Link href="/dashboard/bookings" className="text-sm text-gold-600 flex items-center gap-1">View All <ArrowRight size={14} /></Link>
        </div>
        <div className="space-y-3">
          {mockBookings.map(b => (
            <div key={b.id} className="flex items-center gap-4 p-3 bg-cream-50 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-700 font-bold">{b.artistName[0]}</div>
              <div className="flex-1">
                <p className="font-semibold text-henna-800 text-sm">{b.artistName}</p>
                <p className="text-xs text-henna-400">{b.occasion} · {formatDate(b.serviceDate)}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[b.status]}`}>
                {b.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
              <p className="text-sm font-bold text-henna-700">{formatPrice(b.totalAmount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
