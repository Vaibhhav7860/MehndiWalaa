'use client';
import { motion } from 'framer-motion';
import { BarChart3, Eye, TrendingUp, CheckCircle, Wallet } from 'lucide-react';

const metrics = [
  { icon: Eye, label: 'Profile Views', value: '340', delta: '+18%', color: 'bg-blue-50 text-blue-600' },
  { icon: TrendingUp, label: 'View → Enquiry Rate', value: '7.1%', delta: '+5%', color: 'bg-purple-50 text-purple-600' },
  { icon: CheckCircle, label: 'Enquiry → Booking', value: '33%', delta: '+8%', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Wallet, label: 'This Month Earnings', value: '₹45K', delta: '+12%', color: 'bg-gold-50 text-gold-600' },
];

const funnel = [
  { label: 'Profile Views', value: 340, color: 'bg-gold-100', text: 'text-gold-700' },
  { label: 'Enquiries', value: 24, color: 'bg-gold-200', text: 'text-gold-700' },
  { label: 'Quoted', value: 18, color: 'bg-gold-300', text: 'text-gold-800' },
  { label: 'Confirmed Bookings', value: 8, color: 'bg-gold-500', text: 'text-cream-100' },
];

const earnings = [
  { month: 'Dec', value: 28 },
  { month: 'Jan', value: 32 },
  { month: 'Feb', value: 30 },
  { month: 'Mar', value: 38 },
  { month: 'Apr', value: 42 },
  { month: 'May', value: 45 },
];

const benchmarks = [
  { label: 'Your Rating', value: '4.8 ★', percent: 96, hint: 'City avg 4.2 — top 5% performer.', tone: 'emerald' as const },
  { label: 'Response Time', value: '3.2 hrs', percent: 55, hint: 'City avg 2.1 hrs — try replying faster.', tone: 'gold' as const },
  { label: 'Booking Conversion', value: '33%', percent: 78, hint: 'City avg 22% — well ahead.', tone: 'emerald' as const },
  { label: 'Profile Completeness', value: '65%', percent: 65, hint: 'City avg 71% — finish your profile.', tone: 'rose' as const },
];

const toneClasses: Record<'emerald' | 'gold' | 'rose', { fill: string; text: string }> = {
  emerald: { fill: 'bg-emerald-500', text: 'text-emerald-600' },
  gold: { fill: 'bg-gold-500', text: 'text-gold-600' },
  rose: { fill: 'bg-rose-500', text: 'text-rose-600' },
};

// Build a deterministic 28-day heatmap so it doesn't shift on render.
const heatmap = Array.from({ length: 28 }, (_, i) => ({
  day: i,
  intensity: [0, 1, 1, 0, 2, 4, 4, 1, 0, 1, 2, 1, 3, 4, 0, 1, 0, 2, 1, 3, 4, 1, 0, 1, 2, 2, 4, 5][i],
}));

const intensityClass = (i: number) =>
  ['bg-cream-100', 'bg-gold-100', 'bg-gold-200', 'bg-gold-300', 'bg-gold-400', 'bg-gold-500'][i] || 'bg-cream-100';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <BarChart3 size={22} /> Analytics
        </h1>
        <p className="text-henna-400 text-sm">Performance, funnel and benchmarks at a glance</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-cream-200 p-4">
            <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center mb-3`}><m.icon size={18} /></div>
            <p className="text-2xl font-bold text-henna-800">{m.value}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-henna-400">{m.label}</p>
              <span className="text-[11px] font-semibold text-emerald-600">{m.delta}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Conversion Funnel */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Conversion Funnel</h2>
          <div className="space-y-3">
            {funnel.map((step, i) => {
              const max = funnel[0].value;
              const width = Math.round((step.value / max) * 100);
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-henna-700">{step.label}</span>
                    <span className="font-semibold text-henna-800 tabular-nums">{step.value}</span>
                  </div>
                  <div className="h-7 rounded-lg bg-cream-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.08 }}
                      className={`h-full ${step.color} rounded-lg flex items-center justify-end pr-3 text-[11px] font-semibold ${step.text}`}
                    >
                      {width}%
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6-Month Earnings */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">6-Month Earnings</h2>
            <span className="text-[11px] uppercase tracking-wider text-henna-400">in ₹K</span>
          </div>
          <div className="flex items-end gap-3 h-44">
            {earnings.map((e, i) => {
              const max = Math.max(...earnings.map(x => x.value));
              const h = Math.round((e.value / max) * 100);
              const isLatest = i === earnings.length - 1;
              return (
                <div key={e.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-semibold text-henna-600 tabular-nums">₹{e.value}K</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.06 }}
                    className={`w-full rounded-t-xl ${isLatest ? 'bg-gradient-to-t from-gold-500 to-gold-400' : 'bg-gradient-to-t from-henna-700 to-henna-500'}`}
                  />
                  <span className="text-[11px] text-henna-400">{e.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Heatmap */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Peak Booking Heatmap</h2>
            <span className="text-[11px] uppercase tracking-wider text-henna-400">Last 28 days</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-[10px] uppercase tracking-wider text-henna-400">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {heatmap.map((c) => (
              <div key={c.day} className={`aspect-square rounded-md ${intensityClass(c.intensity)}`} />
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-[11px] text-henna-400">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map(i => <div key={i} className={`w-3 h-3 rounded ${intensityClass(i)}`} />)}
            </div>
            <span>More</span>
          </div>
          <p className="mt-4 text-xs text-henna-600 bg-cream-50 border border-cream-200 rounded-xl p-3">
            <span className="font-semibold text-henna-800">Insight:</span> 68% of bookings land on Saturday and Sunday — boost on weekends.
          </p>
        </div>

        {/* Competitor Benchmark */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Competitor Benchmark</h2>
            <span className="text-[11px] uppercase tracking-wider text-henna-400">Mumbai · Anonymised</span>
          </div>
          <div className="space-y-4">
            {benchmarks.map((b, i) => {
              const tone = toneClasses[b.tone];
              return (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-henna-700">{b.label}</span>
                    <span className={`font-semibold ${tone.text}`}>{b.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-cream-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${b.percent}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.06 }}
                      className={`h-full ${tone.fill} rounded-full`}
                    />
                  </div>
                  <p className="text-[11px] text-henna-500 mt-1">{b.hint}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
