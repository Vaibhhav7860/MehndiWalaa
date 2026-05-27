'use client';
import { motion } from 'framer-motion';
import { Gift, Copy, Share2, Trophy, Sparkles } from 'lucide-react';

const stats = [
  { label: 'Referred', value: '7' },
  { label: 'Approved', value: '5' },
  { label: 'Total Earned', value: '₹2,500' },
  { label: 'City Captain', value: '🏅' },
];

const leaderboard = [
  { rank: '🥇', name: 'Sapna (You) — Andheri', count: 7, accent: 'gold' as const },
  { rank: '🥈', name: 'Meena Arts — Bandra', count: 5, accent: 'cream' as const },
  { rank: '🥉', name: 'Puja Mehndi — Dadar', count: 3, accent: 'cream' as const },
];

const accentClasses: Record<'gold' | 'cream', string> = {
  gold: 'bg-gold-50 border-gold-200',
  cream: 'bg-cream-50 border-cream-200',
};

export default function ReferralPage() {
  const referralLink = 'mehndiwalaa.in/join?ref=SAPNA123';
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Gift size={22} /> Referral Program
        </h1>
        <p className="text-henna-400 text-sm">Invite fellow artists, earn wallet credits when they get approved</p>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-henna-700 text-cream-100 p-6 text-center"
      >
        <span className="pointer-events-none absolute -right-12 -top-12 w-44 h-44 rounded-full bg-cream-100/5" aria-hidden />
        <span className="pointer-events-none absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-cream-100/5" aria-hidden />
        <div className="relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cream-100/15 border border-cream-100/20 text-gold-300 mb-3">
            <Gift size={26} />
          </div>
          <p className="text-2xl font-bold font-[family-name:var(--font-heading)] !text-cream-100">Refer Artists, Earn ₹500 Each</p>
          <p className="text-sm text-cream-200/85 mt-2 max-w-md mx-auto">
            Invite an artist friend. Once they get approved, ₹500 wallet credit is yours and they get a ₹200 welcome bonus.
          </p>
        </div>
      </motion.div>

      {/* Referral link */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-bold mb-2">Your referral link</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 px-4 py-2.5 rounded-xl border border-dashed border-cream-300 bg-cream-50 text-sm font-semibold text-henna-700 truncate">
            {referralLink}
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
              <Copy size={14} /> Copy
            </button>
            <button className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-cream-200 p-4 text-center">
            <p className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-800">{s.value}</p>
            <p className="text-[11px] uppercase tracking-wider text-henna-400 mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3 flex items-center gap-2">
          <Trophy size={16} className="text-gold-600" /> Top Referrers This Month
        </h2>
        <div className="space-y-2">
          {leaderboard.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${accentClasses[row.accent]}`}
            >
              <span className="text-xl" aria-hidden>{row.rank}</span>
              <span className="flex-1 font-semibold text-sm text-henna-800">{row.name}</span>
              <span className="text-sm font-semibold text-henna-700 tabular-nums">{row.count} referrals</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 bg-cream-50 border border-cream-200 rounded-xl p-3 text-xs text-henna-600 flex items-start gap-2">
          <Sparkles size={14} className="text-gold-600 shrink-0 mt-0.5" />
          Top 3 referrers each month get a "City Captain" badge on their profile.
        </div>
      </div>
    </div>
  );
}
