'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Zap, CalendarCheck, Wallet, Star, Rocket, MessageSquare, GraduationCap, BadgeIndianRupee } from 'lucide-react';

type NotifCategory = 'lead' | 'booking' | 'payment' | 'system';

type Notif = {
  id: string;
  category: NotifCategory;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  time: string;
  read: boolean;
  tone: 'emerald' | 'gold' | 'rose' | 'cream';
};

const initial: Notif[] = [
  { id: 'n1', category: 'lead', icon: Zap, title: 'New Lead Received', description: 'Priya Sharma sent a Bridal Mehndi enquiry — Andheri West, ₹8,000–12,000 budget.', time: '5 min ago · Lead #MW-2847', read: false, tone: 'emerald' },
  { id: 'n2', category: 'booking', icon: CalendarCheck, title: 'Booking Confirmed', description: 'Anita Desai confirmed her 25 May booking — Party Mehndi, ₹4,500.', time: '2 hours ago', read: false, tone: 'emerald' },
  { id: 'n3', category: 'payment', icon: Wallet, title: 'Wallet Balance Low', description: 'Only ₹180 left — you can unlock just one more lead. Recharge to keep going.', time: '5 hours ago', read: false, tone: 'gold' },
  { id: 'n4', category: 'booking', icon: Star, title: 'New 5-Star Review', description: 'Rekha Gupta wrote: "Beautiful mehndi work — highly recommended!"', time: 'Yesterday at 4:00 PM', read: false, tone: 'emerald' },
  { id: 'n5', category: 'lead', icon: Rocket, title: 'Festival Alert: Karva Chauth', description: 'Demand grows 5x around 28 Oct — activate Boost early to win more leads.', time: 'Yesterday morning', read: false, tone: 'rose' },
  { id: 'n6', category: 'lead', icon: MessageSquare, title: 'Enquiry Reply Pending', description: 'Sunita Joshi has been waiting 2 hours for a reply — respond before the lead expires.', time: '2 days ago', read: true, tone: 'cream' },
  { id: 'n7', category: 'system', icon: GraduationCap, title: 'Module 80% Complete', description: 'Finish the last 20% of "Bridal Mehndi 2026 Trends" to unlock the badge.', time: '3 days ago', read: true, tone: 'cream' },
  { id: 'n8', category: 'payment', icon: BadgeIndianRupee, title: 'Payout Successful', description: '₹13,500 credited to your bank account. UPI: sapna@paytm.', time: '4 days ago', read: true, tone: 'cream' },
];

const filters: { key: 'all' | 'unread' | NotifCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'lead', label: 'Leads' },
  { key: 'booking', label: 'Bookings' },
  { key: 'payment', label: 'Payments' },
  { key: 'system', label: 'System' },
];

const toneClasses: Record<Notif['tone'], { card: string; icon: string }> = {
  emerald: { card: 'bg-emerald-50/60 border-emerald-100', icon: 'bg-emerald-100 text-emerald-700' },
  gold: { card: 'bg-gold-50 border-gold-100', icon: 'bg-gold-100 text-gold-700' },
  rose: { card: 'bg-rose-50 border-rose-100', icon: 'bg-rose-100 text-rose-700' },
  cream: { card: 'bg-white border-cream-200', icon: 'bg-cream-100 text-henna-600' },
};

export default function NotificationsPage() {
  const [items, setItems] = useState<Notif[]>(initial);
  const [filter, setFilter] = useState<typeof filters[number]['key']>('all');

  const visible = useMemo(() => {
    return items.filter(n => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !n.read;
      return n.category === filter;
    });
  }, [items, filter]);

  const counts = useMemo(() => {
    const total = items.length;
    const unread = items.filter(i => !i.read).length;
    return { total, unread };
  }, [items]);

  const markAllRead = () => setItems(prev => prev.map(i => ({ ...i, read: true })));
  const markRead = (id: string) => setItems(prev => prev.map(i => (i.id === id ? { ...i, read: true } : i)));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <Bell size={22} /> Notifications
            <span className="text-sm font-normal text-henna-400">({counts.unread} unread / {counts.total})</span>
          </h1>
          <p className="text-henna-400 text-sm">Catch up on leads, bookings and platform updates</p>
        </div>
        <button
          onClick={markAllRead}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50"
        >
          <CheckCheck size={13} /> Mark all read
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map(f => {
          const active = filter === f.key;
          const count = f.key === 'all'
            ? items.length
            : f.key === 'unread'
              ? counts.unread
              : items.filter(i => i.category === f.key).length;
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
              }`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {visible.map((n, i) => {
            const tone = toneClasses[n.tone];
            return (
              <motion.button
                key={n.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => markRead(n.id)}
                className={`w-full text-left rounded-2xl border ${tone.card} p-4 flex items-start gap-3 hover:bg-cream-50/40 transition-colors ${n.read ? 'opacity-80' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl ${tone.icon} flex items-center justify-center flex-shrink-0`}>
                  <n.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-henna-800">{n.title}</p>
                  <p className="text-xs text-henna-500 mt-0.5 leading-relaxed">{n.description}</p>
                  <p className="text-[11px] text-henna-400 mt-1.5">{n.time}</p>
                </div>
                {!n.read && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-henna-700 text-cream-100">New</span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>

        {visible.length === 0 && (
          <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center">
            <p className="font-semibold text-henna-800">No notifications here</p>
            <p className="text-sm text-henna-400 mt-1">Try a different filter to see more.</p>
          </div>
        )}
      </div>
    </div>
  );
}
