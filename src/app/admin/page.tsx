'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users, UserCheck, AlertTriangle, UserX, Inbox, Calendar, Flag, BarChart3,
  ArrowUpRight, ArrowDownRight, ImageIcon, ArrowRight, Activity,
} from 'lucide-react';

type Trend = { value: number; direction: 'up' | 'down' };

type KpiCard = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  trend: Trend;
  tone: 'henna' | 'gold' | 'emerald' | 'rose' | 'blue' | 'purple' | 'amber' | 'cream';
};

const tones: Record<KpiCard['tone'], { iconBg: string; iconColor: string }> = {
  henna: { iconBg: 'bg-henna-50 border-henna-100', iconColor: 'text-henna-700' },
  gold: { iconBg: 'bg-gold-50 border-gold-100', iconColor: 'text-gold-700' },
  emerald: { iconBg: 'bg-emerald-50 border-emerald-100', iconColor: 'text-emerald-700' },
  rose: { iconBg: 'bg-rose-50 border-rose-100', iconColor: 'text-rose-700' },
  blue: { iconBg: 'bg-blue-50 border-blue-100', iconColor: 'text-blue-700' },
  purple: { iconBg: 'bg-purple-50 border-purple-100', iconColor: 'text-purple-700' },
  amber: { iconBg: 'bg-amber-50 border-amber-100', iconColor: 'text-amber-700' },
  cream: { iconBg: 'bg-cream-100 border-cream-200', iconColor: 'text-henna-700' },
};

const kpis: KpiCard[] = [
  { icon: Users, label: 'Total Registered Artists', value: '15', trend: { value: 12, direction: 'up' }, tone: 'henna' },
  { icon: UserCheck, label: 'Active Artists', value: '8', trend: { value: 8, direction: 'up' }, tone: 'emerald' },
  { icon: AlertTriangle, label: 'Pending Approvals', value: '5', trend: { value: 5, direction: 'up' }, tone: 'amber' },
  { icon: UserX, label: 'Suspended Artists', value: '2', trend: { value: 2, direction: 'down' }, tone: 'rose' },
  { icon: Users, label: 'Total Users (OTP verified)', value: '12,450', trend: { value: 15, direction: 'up' }, tone: 'blue' },
  { icon: Inbox, label: 'Leads This Month', value: '256', trend: { value: 11, direction: 'up' }, tone: 'gold' },
  { icon: Calendar, label: 'Bookings Confirmed', value: '89', trend: { value: 6, direction: 'up' }, tone: 'purple' },
  { icon: Flag, label: 'Fake Lead Reports (open)', value: '3', trend: { value: 3, direction: 'down' }, tone: 'rose' },
];

// New Artist Registrations - 6 months
const registrations = [
  { month: 'Dec', value: 8 },
  { month: 'Jan', value: 12 },
  { month: 'Feb', value: 14 },
  { month: 'Mar', value: 18 },
  { month: 'Apr', value: 21 },
  { month: 'May', value: 25 },
];

// Lead Volume - 6 months
const leadVolume = [
  { month: 'Dec', value: 110 },
  { month: 'Jan', value: 145 },
  { month: 'Feb', value: 168 },
  { month: 'Mar', value: 200 },
  { month: 'Apr', value: 230 },
  { month: 'May', value: 256 },
];

const planDistribution = [
  { name: 'Free', value: 35, color: '#9CA3AF' },
  { name: 'Starter', value: 28, color: '#D4AF37' },
  { name: 'Professional', value: 22, color: '#8B2040' },
  { name: 'Premium', value: 15, color: '#4B0002' },
];

const recentActivity = [
  { who: 'Priya Sharma', initial: 'P', tone: 'henna' as const, action: 'Approved artist Tanvi Agarwal', when: '2 mins ago' },
  { who: 'Rahul Mehta', initial: 'R', tone: 'gold' as const, action: 'Rejected image from artist a7 portfolio', when: '15 mins ago' },
  { who: 'Priya Sharma', initial: 'P', tone: 'henna' as const, action: 'Issued wallet refund ₹300 to Ritu Verma', when: '45 mins ago' },
  { who: 'Priya Sharma', initial: 'P', tone: 'henna' as const, action: 'Resolved fake lead report FLR-004', when: '2 hours ago' },
  { who: 'Priya Sharma', initial: 'P', tone: 'henna' as const, action: 'Suspended artist Pooja Reddy', when: '5 hours ago' },
  { who: 'Rahul Mehta', initial: 'R', tone: 'gold' as const, action: 'Approved 12 images in bulk moderation', when: '8 hours ago' },
  { who: 'Priya Sharma', initial: 'P', tone: 'henna' as const, action: 'Granted Recommended badge to Isha Malhotra', when: '1 day ago' },
  { who: 'Rahul Mehta', initial: 'R', tone: 'gold' as const, action: 'Scheduled Karva Chauth festival alert', when: '2 days ago' },
];

const avatarTone: Record<'henna' | 'gold', string> = {
  henna: 'bg-henna-700 text-cream-100',
  gold: 'bg-gold-500 text-henna-800',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Dashboard Overview</h1>
        <p className="text-henna-400 text-sm">Platform health and quick actions</p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k, i) => {
          const tone = tones[k.tone];
          const isUp = k.trend.direction === 'up';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl border border-cream-200 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl border ${tone.iconBg} ${tone.iconColor} flex items-center justify-center`}>
                  <k.icon size={18} />
                </div>
                <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                  isUp ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {k.trend.value}%
                </span>
              </div>
              <p className="text-2xl font-bold text-henna-800 font-[family-name:var(--font-heading)] tabular-nums">{k.value}</p>
              <p className="text-[11px] uppercase tracking-wider text-henna-400 mt-1 font-medium">{k.label}</p>
              <p className="text-[10px] text-henna-400 mt-1">vs last month</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link href="/admin/artists/pending" className="group flex items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-colors">
          <div>
            <p className="text-sm font-semibold text-amber-800">Review Pending Approvals (5)</p>
            <p className="text-xs text-amber-700/80 mt-0.5">New artists waiting for verification</p>
          </div>
          <ArrowRight size={16} className="text-amber-700 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <Link href="/admin/leads/fake-reports" className="group flex items-center justify-between gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100 hover:bg-rose-100 transition-colors">
          <div>
            <p className="text-sm font-semibold text-rose-800">Open Fake Lead Queue (3)</p>
            <p className="text-xs text-rose-700/80 mt-0.5">Resolve within 48 hours</p>
          </div>
          <ArrowRight size={16} className="text-rose-700 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <Link href="/admin/content/images" className="group flex items-center justify-between gap-3 p-4 rounded-2xl bg-cream-100 border border-cream-200 hover:bg-cream-50 transition-colors">
          <div>
            <p className="text-sm font-semibold text-henna-800">Moderate Images (47)</p>
            <p className="text-xs text-henna-500 mt-0.5">Approve bulk pending uploads</p>
          </div>
          <ArrowRight size={16} className="text-henna-700 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarChartCard title="New Artist Registrations" subtitle="Last 6 months" data={registrations} tone="gold" />
        <BarChartCard title="Lead Volume" subtitle="Last 6 months" data={leadVolume} tone="henna" />
      </div>

      {/* Plan distribution + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DonutCard data={planDistribution} />

        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <h3 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4 flex items-center gap-2">
            <Activity size={16} /> Recent Activity
          </h3>
          <ol className="relative space-y-3 max-h-[28rem] overflow-y-auto pr-2">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className={`w-8 h-8 rounded-full ${avatarTone[a.tone]} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                  {a.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-henna-800">{a.action}</p>
                  <p className="text-[11px] text-henna-400 mt-0.5">{a.when} · {a.who}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function BarChartCard({
  title,
  subtitle,
  data,
  tone,
}: {
  title: string;
  subtitle: string;
  data: { month: string; value: number }[];
  tone: 'gold' | 'henna';
}) {
  const max = Math.max(...data.map(d => d.value));
  const yTicks = 4;
  const ySteps = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((max / yTicks) * i));

  const barClass =
    tone === 'gold'
      ? 'from-gold-500 to-gold-300'
      : 'from-henna-700 to-henna-500';

  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">{title}</h3>
          <p className="text-[11px] uppercase tracking-wider text-henna-400">{subtitle}</p>
        </div>
        <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
          Export CSV
        </button>
      </div>
      <div className="relative h-48 flex">
        {/* Y axis */}
        <div className="flex flex-col-reverse justify-between text-[10px] text-henna-400 pr-2 py-1 tabular-nums">
          {ySteps.map((s, i) => <span key={i}>{s}</span>)}
        </div>
        {/* Plot */}
        <div className="relative flex-1 border-l border-b border-cream-200">
          {/* Gridlines */}
          <div className="absolute inset-0 flex flex-col-reverse justify-between pointer-events-none">
            {ySteps.map((_, i) => <div key={i} className="border-t border-cream-100 first:border-t-transparent" />)}
          </div>
          <div className="relative h-full flex items-end gap-2 px-3 pb-1">
            {data.map((d, i) => {
              const h = Math.round((d.value / max) * 100);
              return (
                <div key={d.month} className="flex-1 h-full flex flex-col items-center justify-end">
                  <span className="text-[10px] font-semibold text-henna-700 tabular-nums mb-1">{d.value}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: [0.32, 0.72, 0, 1] }}
                    className={`w-full rounded-t-lg bg-gradient-to-t ${barClass}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-2 text-[11px] text-henna-500 pl-8">
        {data.map(d => <span key={d.month}>{d.month}</span>)}
      </div>
    </div>
  );
}

function DonutCard({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = 60;
  const strokeW = 22;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Subscription Plan Distribution</h3>
        <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
          Export CSV
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-44 h-44 shrink-0">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            {data.map((d, i) => {
              const value = (d.value / total) * circumference;
              const dasharray = `${value} ${circumference - value}`;
              const dashoffset = -cumulative;
              cumulative += value;
              return (
                <motion.circle
                  key={d.name}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={d.color}
                  strokeWidth={strokeW}
                  strokeDasharray={dasharray}
                  strokeDashoffset={dashoffset}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: dasharray }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-henna-800 font-[family-name:var(--font-heading)] tabular-nums">{total}</span>
            <span className="text-[10px] uppercase tracking-wider text-henna-400">Artists</span>
          </div>
        </div>
        <ul className="flex-1 w-full space-y-2">
          {data.map(d => {
            const pct = Math.round((d.value / total) * 100);
            return (
              <li key={d.name} className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
                <span className="flex-1 text-sm text-henna-700">{d.name}</span>
                <span className="text-sm font-semibold text-henna-800 tabular-nums">{d.value}</span>
                <span className="text-xs text-henna-400 tabular-nums w-10 text-right">{pct}%</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
