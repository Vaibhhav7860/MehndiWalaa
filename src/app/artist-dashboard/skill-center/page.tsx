'use client';
import { motion } from 'framer-motion';
import { GraduationCap, BadgeCheck, Crown, Sparkles, Download, MessageSquare, ShieldCheck, TrendingUp } from 'lucide-react';

type LevelStatus = 'complete' | 'current' | 'locked';

const levels: { icon: string; name: string; range: string; status: LevelStatus; hint: string }[] = [
  { icon: '🌱', name: 'Beginner', range: '0–5 bookings', status: 'complete', hint: 'Completed' },
  { icon: '🌟', name: 'Rising Artist', range: '6–20 bookings', status: 'current', hint: 'Current Level' },
  { icon: '💎', name: 'Expert', range: '21–50 bookings + 4.5★', status: 'locked', hint: '7 more bookings' },
  { icon: '👑', name: 'Master Artist', range: '100+ bookings + 4.8★', status: 'locked', hint: '5% commission · Top badge' },
];

const modules = [
  { icon: '💍', title: 'Bridal Mehndi 2026 Trends', meta: '8 videos · Mughal · Arabic · Indo-fusion', progress: 80, badge: '80% complete', tone: 'emerald' as const },
  { icon: MessageSquare, title: 'Client Communication', meta: '5 videos · Negotiation · Follow-up', progress: 40, badge: '40% complete', tone: 'gold' as const },
  { icon: ShieldCheck, title: 'Hygiene & Safety Standards', meta: '4 videos · Cone sterilization · Allergy testing', progress: 0, badge: 'Start now', tone: 'cream' as const },
  { icon: TrendingUp, title: 'Business Growth Tips', meta: '6 videos · Pricing strategy · Instagram growth', progress: 0, badge: 'Start now', tone: 'cream' as const },
];

const toneClasses: Record<'emerald' | 'gold' | 'cream', { pill: string; bar: string }> = {
  emerald: { pill: 'bg-emerald-50 text-emerald-700 border-emerald-100', bar: 'bg-emerald-500' },
  gold: { pill: 'bg-gold-50 text-gold-700 border-gold-100', bar: 'bg-gold-500' },
  cream: { pill: 'bg-cream-100 text-henna-600 border-cream-200', bar: 'bg-henna-500' },
};

const levelStyles: Record<LevelStatus, string> = {
  complete: 'bg-emerald-50 border-emerald-100 text-emerald-700',
  current: 'bg-gold-50 border-gold-200 text-gold-700 ring-1 ring-gold-300',
  locked: 'bg-cream-50 border-cream-200 text-henna-400',
};

export default function SkillCenterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <GraduationCap size={22} /> Skill Center
        </h1>
        <p className="text-henna-400 text-sm">Level up with curated training and unlock platform perks</p>
      </div>

      {/* Certificate banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-6 bg-henna-700 text-cream-100"
      >
        <span className="pointer-events-none absolute -right-12 -top-10 w-44 h-44 rounded-full bg-cream-100/5" aria-hidden />
        <span className="pointer-events-none absolute -right-20 bottom-[-3rem] w-52 h-52 rounded-full bg-cream-100/5" aria-hidden />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-cream-100/15 border border-cream-100/20 text-gold-300 flex items-center justify-center">
            <Crown size={26} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl font-bold font-[family-name:var(--font-heading)] !text-cream-100">
              Sapna Mehendi Arts — Certified Artist
            </p>
            <p className="text-sm text-cream-200/85 mt-1">
              MehndiWalaa Verified · Rising Artist Level 2 · Next: Expert Level 3
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-cream-100/15 border border-cream-100/20 text-cream-100">
                <BadgeCheck size={12} /> Verified
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-gold-500/20 border border-gold-300/30 text-gold-200">
                🏅 Rising Artist
              </span>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-henna-800 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
            <Download size={14} /> Download Certificate
          </button>
        </div>
      </motion.div>

      {/* Level progress */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Artist Level Progress</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {levels.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border p-4 text-center ${levelStyles[l.status]}`}
            >
              <div className="text-2xl">{l.icon}</div>
              <p className="mt-1 font-semibold text-sm">{l.name}</p>
              <p className="text-[11px] text-henna-400 mt-0.5">{l.range}</p>
              <p className="mt-2 text-[11px] font-semibold">
                {l.status === 'complete' ? '✓ Complete' : l.status === 'current' ? '★ Current Level' : l.hint}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 bg-cream-50 border border-cream-200 rounded-xl p-3 text-xs text-henna-600">
          <span className="font-semibold text-henna-800">Expert Level perks:</span> priority lead placement, 8% commission (vs 10%), Expert badge on listing, dedicated support manager.
        </div>
      </div>

      {/* Modules */}
      <div>
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3">Training Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m, i) => {
            const tone = toneClasses[m.tone];
            const Icon = typeof m.icon === 'string' ? null : m.icon;
            return (
              <motion.button
                key={m.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-left bg-white rounded-2xl border border-cream-200 p-5 hover:bg-cream-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-cream-100 text-henna-700 flex items-center justify-center text-lg">
                    {Icon ? <Icon size={20} /> : <span aria-hidden>{m.icon as string}</span>}
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${tone.pill}`}>{m.badge}</span>
                </div>
                <p className="font-semibold text-henna-800">{m.title}</p>
                <p className="text-xs text-henna-400 mt-1 mb-3">{m.meta}</p>
                <div className="h-1.5 rounded-full bg-cream-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.progress}%` }}
                    transition={{ duration: 0.7, delay: i * 0.06 }}
                    className={`h-full ${tone.bar}`}
                  />
                </div>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-700">
                  <Sparkles size={12} /> {m.progress > 0 ? 'Continue learning' : 'Start now'}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
