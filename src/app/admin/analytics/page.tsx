'use client';
import { motion } from 'framer-motion';
import { BarChart3, Users, Activity, ShieldCheck, Sparkles, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';

const kpis = [
  { label: 'DAU', value: '580', delta: 8, up: true },
  { label: 'MAU', value: '3,200', delta: 12, up: true },
  { label: 'OTP Verification Rate', value: '78%', delta: 3, up: true },
  { label: 'Lead → Booking Rate', value: '34%', delta: 2, up: true },
];

const dauMau = [
  { day: 'Mon', dau: 520, mau: 2400 },
  { day: 'Tue', dau: 540, mau: 2600 },
  { day: 'Wed', dau: 600, mau: 2800 },
  { day: 'Thu', dau: 580, mau: 2950 },
  { day: 'Fri', dau: 620, mau: 3000 },
  { day: 'Sat', dau: 640, mau: 3150 },
  { day: 'Sun', dau: 580, mau: 3200 },
];

const registrations = [
  { city: 'Delhi', value: 60 },
  { city: 'Jaipur', value: 42 },
  { city: 'Ahmedabad', value: 38 },
  { city: 'Mumbai', value: 28 },
  { city: 'Surat', value: 18 },
];

const topCities = [
  { city: 'Delhi', value: 60 },
  { city: 'Jaipur', value: 42 },
  { city: 'Ahmedabad', value: 38 },
  { city: 'Mumbai', value: 28 },
  { city: 'Surat', value: 18 },
];

const revenueBreakdown = [
  { month: 'Jan', subscriptions: 80, leads: 60, commissions: 90, boosts: 40 },
  { month: 'Feb', subscriptions: 100, leads: 75, commissions: 110, boosts: 55 },
  { month: 'Mar', subscriptions: 120, leads: 95, commissions: 130, boosts: 70 },
];

const planDistribution = [
  { name: 'Free', value: 35, color: '#9CA3AF' },
  { name: 'Starter', value: 28, color: '#D4AF37' },
  { name: 'Pro', value: 22, color: '#8B2040' },
  { name: 'Premium', value: 15, color: '#4B0002' },
];

const fakeLeadRate = [
  { month: 'Jan', value: 6 },
  { month: 'Feb', value: 5 },
  { month: 'Mar', value: 4 },
  { month: 'Apr', value: 3 },
  { month: 'May', value: 2 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <BarChart3 size={22} /> Analytics
          </h1>
          <p className="text-henna-400 text-sm">Last 30 days · platform health and revenue mix</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200">
          Last 30 days
        </span>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl border border-cream-200 p-4"
          >
            <p className="text-[11px] uppercase tracking-wider text-henna-400 font-semibold flex items-center gap-1">
              {k.label === 'DAU' && <Users size={12} />}
              {k.label === 'MAU' && <Activity size={12} />}
              {k.label === 'OTP Verification Rate' && <ShieldCheck size={12} />}
              {k.label === 'Lead → Booking Rate' && <Sparkles size={12} />}
              {k.label}
            </p>
            <p className="mt-1 text-3xl font-bold text-henna-800 font-[family-name:var(--font-heading)] tabular-nums">{k.value}</p>
            <span className={`mt-1 inline-flex items-center gap-0.5 text-[11px] font-semibold ${k.up ? 'text-emerald-600' : 'text-rose-600'}`}>
              {k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {k.delta}% vs last month
            </span>
          </motion.div>
        ))}
      </div>

      {/* DAU/MAU dual-line + Registrations vertical bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DualLineCard title="DAU / MAU" data={dauMau} />
        <VerticalBarCard
          title="New Artist Registrations"
          subtitle="By city · Last 30 days"
          data={registrations}
          tone="gold"
        />
      </div>

      {/* Top cities horizontal + Revenue stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <HorizontalBarCard title="Top Cities by Artist Count" data={topCities} />
        <StackedBarCard title="Revenue Breakdown" data={revenueBreakdown} />
      </div>

      {/* Subscription donut + fake lead rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DonutCard data={planDistribution} />
        <LineCard title="Fake Lead Rate" subtitle="Reports per 100 leads" data={fakeLeadRate} />
      </div>
    </div>
  );
}

function ChartHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">{title}</h3>
        {subtitle && <p className="text-[11px] uppercase tracking-wider text-henna-400">{subtitle}</p>}
      </div>
      <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
        <Download size={11} /> Export CSV
      </button>
    </div>
  );
}

function DualLineCard({ title, data }: { title: string; data: { day: string; dau: number; mau: number }[] }) {
  const w = 700, h = 220, padL = 50, padR = 20, padT = 20, padB = 30;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const max = Math.max(...data.flatMap(d => [d.dau, d.mau]));
  const yTicks = 4;
  const ySteps = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((max / yTicks) * i));

  const pointsFor = (key: 'dau' | 'mau') => data.map((d, i) => ({
    x: padL + (i / (data.length - 1)) * innerW,
    y: padT + innerH - (d[key] / max) * innerH,
    val: d[key],
  }));

  const dauPath = pointsFor('dau').map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const mauPath = pointsFor('mau').map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-5">
      <ChartHeader title={title} />
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 'auto', maxHeight: 260 }}>
          {/* Y grid */}
          {ySteps.map((v, i) => {
            const y = padT + innerH - (i / yTicks) * innerH;
            return (
              <g key={i}>
                <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="#F0ECD0" strokeWidth="1" />
                <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#8B2040">{v.toLocaleString()}</text>
              </g>
            );
          })}
          {/* X labels */}
          {data.map((d, i) => {
            const x = padL + (i / (data.length - 1)) * innerW;
            return <text key={d.day} x={x} y={h - 8} textAnchor="middle" fontSize="11" fill="#8B2040">{d.day}</text>;
          })}
          {/* MAU line (henna) */}
          <motion.path d={mauPath} fill="none" stroke="#7B1F2B" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
          {pointsFor('mau').map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="white" stroke="#7B1F2B" strokeWidth="2" />
          ))}
          {/* DAU line (gold) */}
          <motion.path d={dauPath} fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.1 }} />
          {pointsFor('dau').map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="white" stroke="#D4AF37" strokeWidth="2" />
          ))}
        </svg>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs">
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gold-500" /> DAU</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-henna-700" /> MAU</span>
      </div>
    </div>
  );
}

function VerticalBarCard({
  title,
  subtitle,
  data,
  tone,
}: {
  title: string;
  subtitle?: string;
  data: { city: string; value: number }[];
  tone: 'gold' | 'henna';
}) {
  const max = Math.max(...data.map(d => d.value));
  const yTicks = 4;
  const ySteps = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((max / yTicks) * i));
  const barClass = tone === 'gold' ? 'from-gold-500 to-gold-300' : 'from-henna-700 to-henna-500';

  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-5">
      <ChartHeader title={title} subtitle={subtitle} />
      <div className="relative h-48 flex">
        <div className="flex flex-col-reverse justify-between text-[10px] text-henna-400 pr-2 py-1 tabular-nums">
          {ySteps.map((s, i) => <span key={i}>{s}</span>)}
        </div>
        <div className="relative flex-1 border-l border-b border-cream-200">
          <div className="absolute inset-0 flex flex-col-reverse justify-between pointer-events-none">
            {ySteps.map((_, i) => <div key={i} className="border-t border-cream-100 first:border-t-transparent" />)}
          </div>
          <div className="relative h-full flex items-end gap-2 px-3 pb-1">
            {data.map((d, i) => {
              const h = Math.round((d.value / max) * 100);
              return (
                <div key={d.city} className="flex-1 h-full flex flex-col items-center justify-end">
                  <span className="text-[10px] font-semibold text-henna-700 tabular-nums mb-1">{d.value}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.7, delay: i * 0.05 }}
                    className={`w-full rounded-t-lg bg-gradient-to-t ${barClass}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-2 text-[11px] text-henna-500 pl-8">
        {data.map(d => <span key={d.city}>{d.city}</span>)}
      </div>
    </div>
  );
}

function HorizontalBarCard({ title, data }: { title: string; data: { city: string; value: number }[] }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-5">
      <ChartHeader title={title} />
      <div className="space-y-3">
        {data.map((d, i) => {
          const pct = Math.round((d.value / max) * 100);
          return (
            <div key={d.city} className="flex items-center gap-3">
              <span className="w-24 text-sm font-medium text-henna-700 truncate">{d.city}</span>
              <div className="flex-1 h-7 rounded-lg bg-cream-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}
                  className="h-full rounded-lg bg-gradient-to-r from-henna-600 to-henna-700 flex items-center justify-end pr-2 text-[10px] font-semibold text-cream-100"
                >
                  {d.value}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StackedBarCard({
  title,
  data,
}: {
  title: string;
  data: { month: string; subscriptions: number; leads: number; commissions: number; boosts: number }[];
}) {
  const segments: { key: keyof Omit<typeof data[number], 'month'>; label: string; color: string }[] = [
    { key: 'subscriptions', label: 'Subscriptions', color: '#7B1F2B' },
    { key: 'leads', label: 'Leads', color: '#D4AF37' },
    { key: 'commissions', label: 'Commissions', color: '#10B981' },
    { key: 'boosts', label: 'Boosts', color: '#A78BFA' },
  ];
  const totals = data.map(d => d.subscriptions + d.leads + d.commissions + d.boosts);
  const max = Math.max(...totals);
  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-5">
      <ChartHeader title={title} subtitle="In ₹K" />
      <div className="flex items-end gap-6 h-48 pb-1 border-b border-cream-200">
        {data.map((d, i) => {
          const total = totals[i];
          const tHeight = Math.round((total / max) * 100);
          return (
            <div key={d.month} className="flex-1 h-full flex flex-col items-center justify-end gap-1">
              <span className="text-[10px] font-semibold text-henna-700 tabular-nums">₹{total}K</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${tHeight}%` }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="w-full rounded-t-lg overflow-hidden flex flex-col-reverse"
              >
                {segments.map(seg => {
                  const segPct = total ? (d[seg.key] / total) * 100 : 0;
                  return <div key={seg.key} style={{ height: `${segPct}%`, background: seg.color }} />;
                })}
              </motion.div>
              <span className="text-[11px] text-henna-500">{d.month}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs">
        {segments.map(s => (
          <span key={s.key} className="inline-flex items-center gap-1.5 text-henna-700">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
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
      <ChartHeader title="Subscription Distribution" />
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
                  cx="80" cy="80" r={radius}
                  fill="none" stroke={d.color} strokeWidth={strokeW}
                  strokeDasharray={dasharray} strokeDashoffset={dashoffset}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: dasharray }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
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

function LineCard({ title, subtitle, data }: { title: string; subtitle?: string; data: { month: string; value: number }[] }) {
  const w = 700, h = 220, padL = 40, padR = 20, padT = 20, padB = 30;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const max = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => ({
    x: padL + (i / (data.length - 1)) * innerW,
    y: padT + innerH - (d.value / max) * innerH,
    val: d.value,
    label: d.month,
  }));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${padT + innerH} L${points[0].x},${padT + innerH} Z`;

  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-5">
      <ChartHeader title={title} subtitle={subtitle} />
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 'auto', maxHeight: 260 }}>
          <defs>
            <linearGradient id="fakeLeadFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const y = padT + innerH * t;
            const v = Math.round(max * (1 - t));
            return (
              <g key={i}>
                <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="#F0ECD0" />
                <text x={padL - 8} y={y + 4} fontSize="10" fill="#8B2040" textAnchor="end">{v}</text>
              </g>
            );
          })}
          <path d={areaPath} fill="url(#fakeLeadFill)" />
          <motion.path d={linePath} fill="none" stroke="#B8960E" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="4" fill="white" stroke="#D4AF37" strokeWidth="2" />
              <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="#4B0002">{p.val}</text>
              <text x={p.x} y={padT + innerH + 18} textAnchor="middle" fontSize="11" fill="#8B2040">{p.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
