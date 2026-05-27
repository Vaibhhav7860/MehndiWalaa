'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Calendar, Phone, Wallet, Eye, Inbox, CheckCircle, Star, ArrowRight, AlertCircle, Zap, LifeBuoy, PhoneCall, Lightbulb, Medal, Target, BadgeCheck, Lock, Camera, Sparkles, Crown, Shield, RefreshCcw, Rocket, IndianRupee, CalendarHeart, BellRing } from 'lucide-react';
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
  const [showHelpBanner, setShowHelpBanner] = useState(true);
  // Demo metrics — replace with real conversion stats when wired to backend.
  const yourConversionRate = 20;
  const platformConversionRate = 35;

  // Rising Artist progress (demo data)
  const level = 2;
  const levelTitle = 'Rising Artist';
  const nextLevel = 3;
  const nextLevelTitle = 'Expert';
  const bookingsCompleted = 43;
  const bookingsForNextLevel = 50;
  const bookingsToGo = Math.max(0, bookingsForNextLevel - bookingsCompleted);
  const levelProgress = Math.min(100, Math.round((bookingsCompleted / bookingsForNextLevel) * 100));

  // Monthly income goal (demo data)
  const monthName = new Date().toLocaleString('en-IN', { month: 'long' });
  const incomeAchieved = 45200;
  const incomeTarget = 60000;
  const incomeRemaining = Math.max(0, incomeTarget - incomeAchieved);
  const incomeProgress = Math.min(100, Math.round((incomeAchieved / incomeTarget) * 100));
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysLeftInMonth = Math.max(0, lastDayOfMonth - today.getDate());

  const compactINR = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n >= 1000 ? `₹${(n / 1000).toFixed(1)}K` : `₹${n}`;

  // Subscription / wallet demo data
  const subscription = {
    name: 'Growth Plan — Silver',
    city: 'Mumbai',
    renews: '15 Jun 2026',
    commission: 10,
    pplCommission: 15,
    daysToRenew: 8,
    priorityLeadsUsed: 2,
    priorityLeadsTotal: 5,
    earningsThisCycle: 8500,
    cost: 999,
    commissionSaved: 850,
  };
  const subRoi = subscription.earningsThisCycle + subscription.commissionSaved - subscription.cost;
  const pplWalletBalance = 180;

  const upcomingBookings: { day: number; month: string; client: string; service: string; amount: number; status: 'Confirmed' | 'Advance Pending' }[] = [
    { day: 25, month: 'May', client: 'Anita Desai', service: 'Party Mehndi · Bandra', amount: 4500, status: 'Confirmed' },
    { day: 15, month: 'Jun', client: 'Priya Sharma', service: 'Bridal Mehndi · Andheri', amount: 12000, status: 'Advance Pending' },
    { day: 28, month: 'Oct', client: 'Radha Iyer', service: 'Karva Chauth · Juhu', amount: 3500, status: 'Confirmed' },
  ];

  const rechargePacks: { name: string; subtitle: string; price: number; bonus?: string; recommended?: boolean }[] = [
    { name: 'Trial', subtitle: '~5 leads', price: 500 },
    { name: 'Standard', subtitle: '~12 leads', price: 1000, bonus: '+₹100 bonus', recommended: true },
    { name: 'Festival', subtitle: '~25 leads', price: 2000, bonus: '+₹300 bonus' },
  ];

  const festivals = [
    { icon: '🌙', name: 'Karva Chauth', meta: '158 days away' },
    { icon: '🌸', name: 'Teej', meta: '62 days away' },
    { icon: '💍', name: 'Wedding Season', meta: 'Starting soon' },
  ];

  const funnelMini = [
    { label: 'Profile Views', value: 340 },
    { label: 'Enquiries', value: 24 },
    { label: 'Bookings', value: 8 },
    { label: 'Completed', value: 5 },
  ];
  const funnelSteps = funnelMini.map((step, i) => ({
    ...step,
    conversion: i > 0 ? Math.round((step.value / funnelMini[i - 1].value) * 1000) / 10 : null,
  }));
  const overallConversion = Math.round((funnelMini[funnelMini.length - 1].value / funnelMini[0].value) * 1000) / 10;

  const earningsMini = [28, 32, 30, 38, 42, 45]; // ₹K
  const earningsMonths = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const maxEarning = Math.max(...earningsMini);
  const earningsTotal = earningsMini.reduce((s, v) => s + v, 0);
  const earningsAvg = Math.round(earningsTotal / earningsMini.length);

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

      {/* Subscription Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-henna-700 text-cream-100"
      >
        <span className="pointer-events-none absolute -right-16 -top-16 w-52 h-52 rounded-full bg-cream-100/5" aria-hidden />
        <span className="pointer-events-none absolute -right-24 bottom-[-4rem] w-60 h-60 rounded-full bg-cream-100/5" aria-hidden />

        <div className="relative flex flex-wrap items-center gap-x-5 gap-y-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-cream-100/15 border border-cream-100/20 text-gold-300 flex items-center justify-center">
              <Crown size={20} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-base font-[family-name:var(--font-heading)] !text-cream-100 leading-tight flex items-center gap-2">
                {subscription.name}
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-300/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
                </span>
              </p>
              <p className="text-xs text-cream-200/80 mt-0.5">
                {subscription.city} · Renews {subscription.renews} · Commission {subscription.commission}% (PPL is {subscription.pplCommission}%)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 flex-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full bg-cream-100/15 border border-cream-100/20">
              <Target size={12} className="text-gold-300" /> Priority Leads {subscription.priorityLeadsUsed}/{subscription.priorityLeadsTotal} used
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full bg-cream-100/15 border border-cream-100/20">
              <BadgeCheck size={12} className="text-gold-300" /> Profile Featured
            </span>
            {subscription.daysToRenew <= 10 && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-300/30 text-rose-200">
                ⏰ {subscription.daysToRenew} days to renew
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-base font-bold text-gold-300 font-[family-name:var(--font-heading)] tabular-nums">{formatPrice(subscription.earningsThisCycle)}</p>
              <p className="text-[10px] uppercase tracking-wider text-cream-200/70">Earned this cycle</p>
            </div>
            <Link
              href="/artist-dashboard/membership"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100/15 hover:bg-cream-100/25 border border-cream-100/20 text-cream-100 transition-colors"
            >
              View ROI <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Wallet Low Alert */}
      {pplWalletBalance < 500 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4 border border-amber-200 bg-amber-50 flex flex-col sm:flex-row sm:items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Wallet size={18} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-amber-800 text-sm">Wallet balance low — only {formatPrice(pplWalletBalance)} left</p>
            <p className="text-xs text-amber-700 mt-0.5">You may miss PPL leads if the balance runs out. Recharge to keep going.</p>
          </div>
          <Link
            href="/artist-dashboard/earnings"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white"
          >
            Recharge Now <ArrowRight size={12} />
          </Link>
        </motion.div>
      )}

      {/* Profile Completion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
          <div className="lg:max-w-xs">
            <p className="text-base font-bold text-henna-800 font-[family-name:var(--font-heading)] flex items-center gap-2">
              <Target size={16} className="text-gold-600" /> Complete Your Profile — {artist.profileCompletion}%
            </p>
            <p className="text-xs text-henna-400 mt-1">
              Add portfolio photos, service area, and pricing to attract more bookings.
            </p>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-henna-500">Completed</span>
              <span className="font-semibold text-henna-800">{artist.profileCompletion}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-cream-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${artist.profileCompletion}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
              />
            </div>
          </div>

          <Link
            href="/artist-dashboard/profile"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-henna-700 hover:bg-henna-800 text-cream-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            Complete Profile <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>

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

      {/* Conversion Help Banner */}
      <AnimatePresence>
        {showHelpBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl p-4 sm:p-5 border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white flex items-center justify-center font-bold text-[11px] shadow-sm">
                <LifeBuoy size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-henna-800 text-sm leading-snug">
                  No bookings from your last 5 leads — let us help you turn that around.
                </p>
                <p className="mt-1 text-sm text-henna-600 leading-relaxed">
                  Your conversion rate is <span className="font-semibold text-henna-800">{yourConversionRate}%</span>, while the platform average is <span className="font-semibold text-henna-800">{platformConversionRate}%</span>. That points to something fixable in your profile or response — not lead quality.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-2 bg-henna-700 hover:bg-henna-800 text-cream-100 text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                    <PhoneCall size={14} /> Book a Free 15-min Call
                  </button>
                  <button className="inline-flex items-center gap-2 bg-white hover:bg-cream-50 text-henna-700 text-sm font-semibold px-4 py-2 rounded-xl border border-amber-200 transition-colors">
                    <Lightbulb size={14} /> View Conversion Tips
                  </button>
                  <button
                    onClick={() => setShowHelpBanner(false)}
                    className="text-sm font-semibold text-henna-500 hover:text-henna-700 px-3 py-2 rounded-xl"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Rising Artist & Income Goal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Rising Artist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl p-6 bg-white border border-cream-200"
        >
          <span className="pointer-events-none absolute -right-12 -top-12 w-44 h-44 rounded-full bg-gold-50" aria-hidden />
          <span className="pointer-events-none absolute -right-20 bottom-[-3rem] w-52 h-52 rounded-full bg-gold-50/60" aria-hidden />

          <div className="relative flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-gold-50 text-gold-600 border border-gold-100 flex items-center justify-center">
              <Medal size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg font-[family-name:var(--font-heading)] leading-tight text-henna-800">
                {levelTitle} <span className="text-henna-400 font-medium">— Level {level}</span>
              </h3>
              <p className="text-sm text-henna-500 mt-1">
                {bookingsToGo} more bookings to reach {nextLevelTitle} Level {nextLevel}.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="relative mt-5">
            <div className="h-2 rounded-full bg-cream-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-henna-500">{bookingsCompleted} Bookings</span>
              <span className="text-gold-700 font-semibold">
                {levelProgress}% → Level {nextLevel} ({bookingsForNextLevel} needed)
              </span>
            </div>
          </div>

          {/* Perks */}
          <div className="relative mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              <BadgeCheck size={13} /> Verified Badge
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-cream-100 text-henna-600 border border-cream-200">
              <Lock size={13} /> Contact Visible
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-cream-100 text-henna-600 border border-cream-200">
              <Camera size={13} /> 50 Photos
            </span>
          </div>

          {/* CTA */}
          <Link
            href="/artist-dashboard/membership"
            className="relative mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-henna-700 hover:bg-henna-800 text-cream-100 text-sm font-semibold transition-colors"
          >
            <Sparkles size={14} className="text-gold-300" /> Level Up — Skill Center
          </Link>
        </motion.div>

        {/* Monthly Income Goal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative overflow-hidden rounded-2xl p-6 text-cream-100 bg-henna-700"
        >
          <span className="pointer-events-none absolute -right-12 -top-10 w-44 h-44 rounded-full bg-cream-100/5" aria-hidden />
          <span className="pointer-events-none absolute right-12 bottom-[-3rem] w-44 h-44 rounded-full bg-cream-100/5" aria-hidden />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cream-100/15 border border-cream-100/20 text-gold-300 flex items-center justify-center">
                <Target size={18} />
              </div>
              <div>
                <h3 className="font-bold text-lg font-[family-name:var(--font-heading)] leading-tight !text-cream-100">
                  May Income Goal
                </h3>
                <p className="text-sm text-cream-200/80 mt-0.5">
                  {formatPrice(incomeAchieved)} / {formatPrice(incomeTarget)} target
                </p>
              </div>
            </div>
            <span className="text-3xl font-bold text-gold-400 font-[family-name:var(--font-heading)] tabular-nums">
              {incomeProgress}%
            </span>
          </div>

          {/* Progress */}
          <div className="relative mt-4 h-2.5 rounded-full bg-cream-100/15 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${incomeProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-gold-400 to-gold-500"
            />
          </div>

          {/* Stat tiles */}
          <div className="relative grid grid-cols-3 gap-2 mt-5">
            <div className="rounded-xl bg-cream-100/10 border border-cream-100/15 p-3 text-center">
              <p className="text-base sm:text-lg font-bold leading-tight tabular-nums">{compactINR(incomeAchieved)}</p>
              <p className="text-[11px] uppercase tracking-wider text-cream-200/70 mt-0.5">Achieved</p>
            </div>
            <div className="rounded-xl bg-cream-100/10 border border-cream-100/15 p-3 text-center">
              <p className="text-base sm:text-lg font-bold leading-tight tabular-nums">{compactINR(incomeRemaining)}</p>
              <p className="text-[11px] uppercase tracking-wider text-cream-200/70 mt-0.5">Remaining</p>
            </div>
            <div className="rounded-xl bg-cream-100/10 border border-cream-100/15 p-3 text-center">
              <p className="text-base sm:text-lg font-bold leading-tight">{daysLeftInMonth} days</p>
              <p className="text-[11px] uppercase tracking-wider text-cream-200/70 mt-0.5">Left in {monthName}</p>
            </div>
          </div>

          <div className="relative mt-4 flex items-center gap-2 text-sm text-cream-200/90">
            <Lightbulb size={15} className="text-gold-300" />
            <span>2 more bridal bookings will unlock your goal.</span>
          </div>
        </motion.div>
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

      {/* Upcoming Bookings */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <Calendar size={18} /> Upcoming Bookings
          </h2>
          <Link href="/artist-dashboard/bookings" className="text-sm text-gold-600 flex items-center gap-1">View All <ArrowRight size={14} /></Link>
        </div>
        <div className="space-y-3">
          {upcomingBookings.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-xl border border-cream-200 bg-cream-50/40"
            >
              <div className="w-14 h-14 rounded-xl bg-gold-50 border border-gold-100 text-gold-700 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold leading-none">{b.day}</span>
                <span className="text-[10px] uppercase tracking-wider mt-0.5">{b.month}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-henna-800 text-sm">{b.client}</p>
                <p className="text-xs text-henna-400 truncate">{b.service}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-henna-800 tabular-nums">{formatPrice(b.amount)}</p>
                <span
                  className={`mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    b.status === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}
                >
                  {b.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right-rail: Subscription ROI · Renewal · Boost · PPL Wallet · Festivals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Subscription ROI */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-henna-700 text-cream-100 p-5"
        >
          <span className="pointer-events-none absolute -right-12 -top-10 w-44 h-44 rounded-full bg-cream-100/5" aria-hidden />
          <h3 className="font-bold text-base font-[family-name:var(--font-heading)] !text-cream-100 flex items-center gap-2">
            <IndianRupee size={16} className="text-gold-300" /> Subscription ROI — This Month
          </h3>
          <dl className="mt-3 text-sm divide-y divide-cream-100/15">
            <div className="flex items-center justify-between py-2 text-cream-200/85">
              <dt>Subscription Cost</dt>
              <dd className="text-rose-300 tabular-nums">- {formatPrice(subscription.cost)}</dd>
            </div>
            <div className="flex items-center justify-between py-2 text-cream-200/85">
              <dt>Priority Leads ({subscription.priorityLeadsUsed}/{subscription.priorityLeadsTotal} used)</dt>
              <dd className="!text-cream-100">{subscription.priorityLeadsUsed} allocated</dd>
            </div>
            <div className="flex items-center justify-between py-2 text-cream-200/85">
              <dt>Earnings from bookings</dt>
              <dd className="text-emerald-300 tabular-nums">+ {formatPrice(subscription.earningsThisCycle)}</dd>
            </div>
            <div className="flex items-center justify-between py-2 text-cream-200/85">
              <dt>Commission saved (vs PPL)</dt>
              <dd className="text-emerald-300 tabular-nums">+ {formatPrice(subscription.commissionSaved)}</dd>
            </div>
            <div className="flex items-center justify-between py-3 font-semibold">
              <dt className="!text-cream-100">Net Profit</dt>
              <dd className="text-gold-300 tabular-nums">{formatPrice(subRoi)}</dd>
            </div>
          </dl>
          <p className="text-xs text-cream-200/70 mt-1">A single bridal booking recovers your subscription cost ten times over.</p>
        </motion.div>

        {/* Renewal Loss Framing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl bg-white border border-rose-100 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
              <AlertCircle size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-rose-700 font-[family-name:var(--font-heading)]">
                Subscription expires in {subscription.daysToRenew} days
              </h3>
              <p className="text-xs text-rose-600 mt-0.5">If you don&apos;t renew before {subscription.renews}:</p>
            </div>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-rose-700">
            <li>· Recommended badge will be removed</li>
            <li>· Priority leads stop — only PPL after that</li>
            <li>· Commission rises from {subscription.commission}% to {subscription.pplCommission}%</li>
            <li>· Profile drops from top listings</li>
          </ul>
          <p className="mt-3 text-xs text-henna-500 bg-rose-50 border border-rose-100 rounded-xl p-2.5">
            On a ₹12,000 booking the commission gap alone is ₹600. The {formatPrice(subscription.cost)} subscription pays for itself with one booking.
          </p>
          <Link
            href="/artist-dashboard/membership"
            className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white"
          >
            <RefreshCcw size={14} /> Renew Now — {formatPrice(subscription.cost)}
          </Link>
        </motion.div>

        {/* Boost */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white border border-cream-200 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 border border-gold-100 flex items-center justify-center">
              <Rocket size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-henna-800 font-[family-name:var(--font-heading)]">Boost Your Profile</h3>
              <p className="text-xs text-henna-400">More visibility during wedding season — also increases PPL volume.</p>
            </div>
          </div>
          <div className="mt-4 space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-xl border border-cream-200 bg-cream-50/50">
              <div>
                <p className="text-sm font-semibold text-henna-800">Standard Boost</p>
                <p className="text-[11px] text-henna-400">7 days · Top placement · Sponsored tag</p>
              </div>
              <span className="text-sm font-bold text-emerald-600">FREE</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-cream-200 bg-cream-50/50">
              <div>
                <p className="text-sm font-semibold text-henna-800">Video Boost</p>
                <p className="text-[11px] text-henna-400">7 days · Video auto-preview · Max views</p>
              </div>
              <span className="text-sm font-bold text-henna-800 tabular-nums">₹700</span>
            </div>
          </div>
          <Link
            href="/artist-dashboard/boost"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-henna-800"
          >
            <Zap size={14} /> Activate Free Boost
          </Link>
        </motion.div>

        {/* PPL Wallet recharge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-white border border-cream-200 p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 flex items-center justify-center">
                <Wallet size={18} />
              </div>
              <div>
                <h3 className="font-bold text-base text-henna-800 font-[family-name:var(--font-heading)]">PPL Wallet</h3>
                <p className="text-[11px] text-henna-400">Used for pay-per-lead unlocks</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-amber-600 tabular-nums">{formatPrice(pplWalletBalance)}</p>
              <p className="text-[10px] uppercase tracking-wider text-amber-600">Low balance</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {rechargePacks.map(p => (
              <button
                key={p.name}
                className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl border transition-colors ${
                  p.recommended
                    ? 'border-gold-200 bg-gold-50/60 hover:bg-gold-50'
                    : 'border-cream-200 bg-cream-50/40 hover:bg-cream-50'
                }`}
              >
                <div className="text-left">
                  <p className="text-sm font-semibold text-henna-800 flex items-center gap-2">
                    {p.name} {p.recommended && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gold-100 text-gold-700">Best value</span>}
                  </p>
                  <p className="text-[11px] text-henna-400">{p.subtitle} {p.bonus ? `· ${p.bonus}` : ''}</p>
                </div>
                <span className="text-sm font-bold text-henna-800 tabular-nums">{formatPrice(p.price)}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Festival Demand Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white border border-cream-200 p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-henna-800 font-[family-name:var(--font-heading)] flex items-center gap-2">
              <CalendarHeart size={16} className="text-gold-600" /> Festival Demand Alerts
            </h3>
            <Link href="/artist-dashboard/boost" className="text-sm text-gold-600 flex items-center gap-1">
              Boost for Festival <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {festivals.map((f) => (
              <div key={f.name} className="rounded-xl border border-cream-200 bg-cream-50/50 p-4">
                <p className="text-xl" aria-hidden>{f.icon}</p>
                <p className="font-semibold text-henna-800 mt-1">{f.name}</p>
                <p className="text-xs text-henna-400 mt-0.5">{f.meta}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Funnel + Monthly Earnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Conversion Funnel */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Conversion Funnel</h2>
            <Link href="/artist-dashboard/analytics" className="text-sm text-gold-600 flex items-center gap-1">Full View <ArrowRight size={14} /></Link>
          </div>
          <p className="text-xs text-henna-400 mb-4">
            Overall conversion <span className="font-semibold text-emerald-600">{overallConversion}%</span> · {funnelMini[0].value} views to {funnelMini[funnelMini.length - 1].value} completed
          </p>

          <div className="relative">
            {/* Subtle grid */}
            <div className="absolute inset-0 grid grid-cols-4 -z-0 pointer-events-none" aria-hidden>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="border-l border-cream-100 first:border-l-0" />
              ))}
            </div>

            <div className="relative space-y-3">
              {funnelSteps.map((step, i) => {
                const max = funnelMini[0].value;
                const width = Math.round((step.value / max) * 100);
                const tones = [
                  'from-gold-200 to-gold-300 text-gold-800',
                  'from-gold-300 to-gold-400 text-gold-900',
                  'from-gold-400 to-gold-500 text-cream-100',
                  'from-henna-600 to-henna-700 text-cream-100',
                ];
                return (
                  <div key={step.label} className="relative">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-henna-700 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cream-100 text-henna-600 text-[10px] font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        {step.label}
                      </span>
                      <div className="flex items-center gap-2">
                        {step.conversion !== null && (
                          <span className="text-[10px] font-semibold text-henna-400 tabular-nums">
                            ↓ {step.conversion}%
                          </span>
                        )}
                        <span className="font-bold text-henna-800 tabular-nums">{step.value.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="h-9 rounded-xl bg-cream-100/70 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
                        className={`h-full rounded-xl bg-gradient-to-r ${tones[i]} relative overflow-hidden flex items-center justify-end pr-3 text-[11px] font-bold tabular-nums shadow-sm`}
                      >
                        <span className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/30 to-transparent pointer-events-none" />
                        {width}%
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Monthly Earnings */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Monthly Earnings</h2>
              <p className="text-xs text-henna-400 mt-0.5">
                Total <span className="font-semibold text-henna-700">₹{earningsTotal}K</span> · Avg <span className="font-semibold text-henna-700">₹{earningsAvg}K</span> · Last 6 months
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              <TrendingUp size={11} /> +12%
            </span>
          </div>

          <div className="relative h-44 mt-4">
            {/* Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between" aria-hidden>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="border-t border-cream-100 first:border-t-0" />
              ))}
            </div>
            {/* Y-axis labels */}
            <div className="absolute -left-1 top-0 bottom-0 flex flex-col justify-between text-[10px] text-henna-300 pointer-events-none -translate-x-full pr-2 hidden sm:flex">
              <span>₹{maxEarning}K</span>
              <span>₹{Math.round(maxEarning * 0.66)}K</span>
              <span>₹{Math.round(maxEarning * 0.33)}K</span>
              <span>₹0</span>
            </div>
            {/* Bars */}
            <div className="relative h-full flex items-end gap-2 sm:gap-3">
              {earningsMini.map((v, i) => {
                const h = Math.round((v / maxEarning) * 100);
                const isLatest = i === earningsMini.length - 1;
                return (
                  <div key={earningsMonths[i]} className="flex-1 h-full flex flex-col justify-end items-center group">
                    <span
                      className={`mb-1 text-[10px] font-semibold tabular-nums transition-colors ${
                        isLatest ? 'text-gold-700' : 'text-henna-500 group-hover:text-henna-700'
                      }`}
                    >
                      ₹{v}K
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.7, delay: i * 0.06, ease: [0.32, 0.72, 0, 1] }}
                      className={`w-full rounded-t-xl relative overflow-hidden ${
                        isLatest
                          ? 'bg-gradient-to-t from-gold-500 to-gold-400 ring-2 ring-gold-300/50'
                          : 'bg-gradient-to-t from-henna-700 to-henna-500'
                      } shadow-sm`}
                    >
                      <span className="absolute inset-x-0 top-0 h-2 bg-white/15 pointer-events-none" />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 text-[10px] uppercase tracking-wider text-henna-400 px-1">
            {earningsMonths.map((m, i) => (
              <span key={m} className={`flex-1 text-center ${i === earningsMonths.length - 1 ? 'text-gold-700 font-bold' : ''}`}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Pricing Strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <Lightbulb size={18} />
        </div>
        <p className="flex-1 text-sm text-amber-800 leading-relaxed">
          You appear to be undercharging on Arabic mehndi by about <span className="font-semibold">15%</span>. Mumbai market average is <span className="font-semibold">₹3,500</span>, your rate is <span className="font-semibold">₹2,500</span>.
        </p>
        <Link
          href="/artist-dashboard/ai-pricing"
          className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white whitespace-nowrap"
        >
          Fix My Rates <ArrowRight size={12} />
        </Link>
      </motion.div>

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
