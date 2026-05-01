'use client';
import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, MapPin, Download, FileText } from 'lucide-react';
import { mockAdminStats } from '@/data/mock';

export default function AnalyticsPage() {
  const s = mockAdminStats;
  const [dateRange, setDateRange] = useState('6m');
  const months = dateRange === '3m' ? ['Apr','May','Jun'] : dateRange === '6m' ? ['Jan','Feb','Mar','Apr','May','Jun'] : ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'];
  const data = dateRange === '3m' ? [1580, 1890, 2100] : dateRange === '6m' ? [820, 1050, 1340, 1580, 1890, 2100] : [420, 510, 620, 700, 780, 820, 1050, 1340, 1580, 1890, 2100, 2350];
  const maxVal = Math.max(...data);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><BarChart3 size={24} /> Platform Analytics</h1>
        <div className="flex items-center gap-2">
          <div className="flex bg-cream-100 rounded-lg p-0.5">
            {[{v:'3m',l:'3M'},{v:'6m',l:'6M'},{v:'12m',l:'1Y'}].map(r => (
              <button key={r.v} onClick={() => setDateRange(r.v)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${dateRange === r.v ? 'bg-henna-700 text-cream-100' : 'text-henna-600 hover:bg-cream-200'}`}>{r.l}</button>
            ))}
          </div>
          <button className="px-3 py-1.5 border border-cream-300 rounded-lg text-xs font-medium text-henna-600 hover:bg-cream-50 flex items-center gap-1"><Download size={12} /> CSV</button>
          <button className="px-3 py-1.5 border border-cream-300 rounded-lg text-xs font-medium text-henna-600 hover:bg-cream-50 flex items-center gap-1"><FileText size={12} /> PDF</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: 'DAU', value: s.dau.toLocaleString(), icon: Users, color: 'text-blue-600' },
          { label: 'MAU', value: s.mau.toLocaleString(), icon: TrendingUp, color: 'text-green-600' },
          { label: 'Conversion', value: `${s.conversionRate}%`, icon: Calendar, color: 'text-purple-600' },
          { label: 'Cities', value: s.topCities.length.toString(), icon: MapPin, color: 'text-gold-600' },
        ].map((m, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-cream-200">
            <m.icon size={20} className={`${m.color} mb-2`} />
            <p className="text-2xl font-bold text-henna-800">{m.value}</p>
            <p className="text-xs text-henna-400">{m.label}</p>
          </div>
        ))}
      </div>

      {(() => {
        const chartW = 700, chartH = 260;
        const padL = 55, padR = 20, padT = 20, padB = 40;
        const w = chartW - padL - padR;
        const h = chartH - padT - padB;
        const minVal = Math.min(...data) * 0.8;
        const yRange = maxVal - minVal || 1;
        const points = data.map((d, i) => ({
          x: padL + (i / (data.length - 1)) * w,
          y: padT + h - ((d - minVal) / yRange) * h,
          val: d,
          label: months[i],
        }));
        const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
        const areaPath = `${linePath} L${points[points.length - 1].x},${padT + h} L${points[0].x},${padT + h} Z`;
        const yTicks = 5;
        const ySteps = Array.from({ length: yTicks + 1 }, (_, i) => {
          const val = minVal + (yRange / yTicks) * i;
          const y = padT + h - (i / yTicks) * h;
          return { val: Math.round(val), y };
        });

        return (
          <div className="bg-white rounded-2xl border border-cream-200 p-6">
            <h3 className="font-semibold text-henna-700 mb-4">Monthly User Growth</h3>
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full min-w-[500px]" style={{ height: 'auto', maxHeight: 280 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#B8960E" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#E8C547" />
                  </linearGradient>
                  <filter id="dotShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#D4AF37" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Horizontal grid lines + Y labels */}
                {ySteps.map((t, i) => (
                  <g key={i}>
                    <line x1={padL} y1={t.y} x2={chartW - padR} y2={t.y} stroke="#F0ECD0" strokeWidth="1" />
                    <text x={padL - 8} y={t.y + 4} textAnchor="end" fontSize="10" fill="#8B2040" fontWeight="500">{t.val.toLocaleString()}</text>
                  </g>
                ))}

                {/* Area fill */}
                <path d={areaPath} fill="url(#lineGrad)" />

                {/* Line */}
                <path d={linePath} fill="none" stroke="url(#strokeGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Data points + labels */}
                {points.map((p, i) => (
                  <g key={i}>
                    {/* Vertical dashed guide */}
                    <line x1={p.x} y1={p.y} x2={p.x} y2={padT + h} stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />

                    {/* Outer glow ring */}
                    <circle cx={p.x} cy={p.y} r="8" fill="#D4AF37" opacity="0.1" />

                    {/* Data dot */}
                    <circle cx={p.x} cy={p.y} r="5" fill="white" stroke="#D4AF37" strokeWidth="2.5" filter="url(#dotShadow)" />

                    {/* Value label above dot */}
                    <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#4B0002">{p.val.toLocaleString()}</text>

                    {/* Month label below axis */}
                    <text x={p.x} y={padT + h + 18} textAnchor="middle" fontSize="11" fill="#8B2040" fontWeight="500">{p.label}</text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        );
      })()}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <h3 className="font-semibold text-henna-700 mb-3">Bookings by Occasion</h3>
          {[{ name: 'Wedding', pct: 45 }, { name: 'Engagement', pct: 20 }, { name: 'Karva Chauth', pct: 15 }, { name: 'Eid', pct: 10 }, { name: 'Other', pct: 10 }].map(o => (
            <div key={o.name} className="flex items-center gap-3 mb-2">
              <span className="w-24 text-sm text-henna-600">{o.name}</span>
              <div className="flex-1 h-3 bg-cream-100 rounded-full overflow-hidden"><div className="h-full bg-henna-600 rounded-full" style={{ width: `${o.pct}%` }} /></div>
              <span className="text-sm font-semibold text-henna-700 w-10 text-right">{o.pct}%</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <h3 className="font-semibold text-henna-700 mb-3">Revenue by City</h3>
          {s.topCities.map(c => (
            <div key={c.city} className="flex items-center gap-3 mb-2">
              <span className="w-24 text-sm text-henna-600">{c.city}</span>
              <div className="flex-1 h-3 bg-cream-100 rounded-full overflow-hidden"><div className="h-full bg-gold-500 rounded-full" style={{ width: `${(c.count / 50) * 100}%` }} /></div>
              <span className="text-sm font-semibold text-henna-700 w-10 text-right">{c.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
