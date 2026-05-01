'use client';
import { motion } from 'framer-motion';
import { Users, Image as ImageIcon, TrendingUp, Calendar, DollarSign, Eye, UserCheck, Activity } from 'lucide-react';
import { mockAdminStats } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const s = mockAdminStats;
  const metrics = [
    { icon: Users, label: 'Total Artists', value: s.totalArtists.toString(), color: 'bg-blue-50 text-blue-600' },
    { icon: UserCheck, label: 'Pending Approvals', value: s.pendingApprovals.toString(), color: 'bg-yellow-50 text-yellow-600' },
    { icon: Eye, label: 'Total Users', value: s.totalUsers.toLocaleString(), color: 'bg-green-50 text-green-600' },
    { icon: Calendar, label: 'Total Bookings', value: s.totalBookings.toLocaleString(), color: 'bg-purple-50 text-purple-600' },
    { icon: DollarSign, label: 'Revenue', value: formatPrice(s.totalRevenue), color: 'bg-gold-50 text-gold-600' },
    { icon: Activity, label: 'DAU / MAU', value: `${s.dau} / ${s.mau}`, color: 'bg-henna-50 text-henna-600' },
    { icon: TrendingUp, label: 'Conversion Rate', value: `${s.conversionRate}%`, color: 'bg-emerald-50 text-emerald-600' },
    { icon: ImageIcon, label: 'Pending Content', value: '4', color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Admin Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white p-4 rounded-2xl border border-cream-200 hover-lift">
            <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center mb-3`}><m.icon size={20} /></div>
            <p className="text-xl font-bold text-henna-800">{m.value}</p>
            <p className="text-xs text-henna-400">{m.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Top Cities</h2>
          <div className="space-y-3">
            {s.topCities.map((c, i) => (
              <div key={c.city} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-xs font-bold">{i+1}</span>
                <span className="flex-1 text-sm text-henna-800">{c.city}</span>
                <div className="w-32 h-2 bg-cream-100 rounded-full overflow-hidden"><div className="h-full bg-gold-500 rounded-full" style={{width:`${(c.count/50)*100}%`}} /></div>
                <span className="text-sm font-semibold text-henna-700 w-8 text-right">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Top Artists</h2>
          <div className="space-y-3">
            {s.topArtists.map((a, i) => (
              <div key={a.name} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-henna-100 text-henna-700 flex items-center justify-center text-xs font-bold">{i+1}</span>
                <span className="flex-1 text-sm text-henna-800">{a.name}</span>
                <span className="text-sm font-semibold text-henna-700">{a.bookings} bookings</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
