'use client';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Phone, Wallet, Eye, Inbox, CheckCircle, Star, ArrowRight, AlertCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import { artists, mockLeads, mockNotifications } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

const artist = artists[0]; // Mock: current artist is Priya Sharma

export default function ArtistDashboardPage() {
  const metrics = [
    { icon: Inbox, label: 'New Leads', value: '5', change: '+2 today', color: 'bg-blue-50 text-blue-600', href: '/artist-dashboard/enquiries' },
    { icon: Calendar, label: 'Active Bookings', value: '3', change: '1 this week', color: 'bg-green-50 text-green-600', href: '/artist-dashboard/bookings' },
    { icon: CheckCircle, label: 'Completed', value: '340', change: '+12 this month', color: 'bg-emerald-50 text-emerald-600', href: '/artist-dashboard/bookings' },
    { icon: Phone, label: 'Phone Views', value: '89', change: '+23 this week', color: 'bg-purple-50 text-purple-600', href: '#' },
    { icon: Wallet, label: 'Wallet Balance', value: formatPrice(artist.walletBalance), change: '', color: 'bg-gold-50 text-gold-600', href: '/artist-dashboard/earnings' },
    { icon: TrendingUp, label: 'Total Earnings', value: formatPrice(artist.totalEarnings), change: 'This month', color: 'bg-henna-50 text-henna-600', href: '/artist-dashboard/earnings' },
  ];

  const urgentLeads = mockLeads.filter(l => l.isUrgent);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Welcome back, {artist.name.split(' ')[0]}!</h1>
          <p className="text-henna-400 text-sm">Here&apos;s your business overview</p>
        </div>
        <div className="flex items-center gap-2">
          {artist.profileCompletion < 100 && (
            <div className="px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-full text-xs font-medium text-yellow-700 flex items-center gap-1">
              <AlertCircle size={12} /> Profile {artist.profileCompletion}% complete
            </div>
          )}
        </div>
      </div>

      {/* Urgent Lead Alert */}
      {urgentLeads.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center animate-pulse"><Zap size={20} className="text-red-600" /></div>
          <div className="flex-1">
            <p className="font-semibold text-red-800 text-sm">🚨 Urgent Lead — Response needed within 30 minutes!</p>
            <p className="text-xs text-red-600">{urgentLeads[0].userName} needs mehndi in {urgentLeads[0].city} ASAP</p>
          </div>
          <Link href="/artist-dashboard/enquiries" className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700">View Lead</Link>
        </motion.div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={m.href} className="block bg-white p-4 rounded-2xl border border-cream-200 hover-lift">
              <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center mb-3`}><m.icon size={20} /></div>
              <p className="text-2xl font-bold text-henna-800">{m.value}</p>
              <p className="text-xs text-henna-400 mt-0.5">{m.label}</p>
              {m.change && <p className="text-xs text-green-600 mt-1">{m.change}</p>}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Live Leads Feed */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Leads Feed
          </h2>
          <Link href="/artist-dashboard/enquiries" className="text-sm text-gold-600 flex items-center gap-1">View All <ArrowRight size={14} /></Link>
        </div>
        <div className="space-y-3">
          {mockLeads.slice(0, 4).map((lead, i) => (
            <motion.div key={lead.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl border ${lead.isUrgent ? 'border-red-200 bg-red-50/50' : 'border-cream-200 bg-cream-50/50'} flex flex-col sm:flex-row items-start sm:items-center gap-3`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${lead.isUrgent ? 'bg-red-100 text-red-700' : 'bg-gold-100 text-gold-700'}`}>
                {lead.userName[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-henna-800 text-sm">{lead.userName}</p>
                  {lead.isUrgent && <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">URGENT</span>}
                </div>
                <p className="text-xs text-henna-400">{lead.occasion} · {lead.city} · {lead.budget}</p>
              </div>
              <div className="flex gap-2 self-end sm:self-auto">
                {lead.status === 'new' ? (
                  <button className="px-4 py-2 bg-henna-700 text-cream-100 text-xs font-semibold rounded-lg hover:bg-henna-600">Unlock Lead</button>
                ) : (
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg">Unlocked</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Recent Notifications</h2>
        <div className="space-y-2">
          {mockNotifications.slice(0, 4).map(n => (
            <div key={n.id} className={`p-3 rounded-xl text-sm flex items-start gap-3 ${n.isRead ? 'bg-white' : 'bg-gold-50/50'}`}>
              <span className="text-lg">{n.type === 'festival' ? '🎉' : n.type === 'lead' ? '✨' : n.type === 'wallet' ? '💰' : '📌'}</span>
              <div className="flex-1">
                <p className="font-medium text-henna-800">{n.title}</p>
                <p className="text-xs text-henna-400">{n.message}</p>
              </div>
              {!n.isRead && <span className="w-2 h-2 bg-gold-500 rounded-full mt-1.5" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
