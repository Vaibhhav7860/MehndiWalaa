'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Lock, Zap, ToggleRight } from 'lucide-react';
import { artists } from '@/data/mock';

const artist = artists[0];

type DayStatus = 'available' | 'booked' | 'blocked';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function buildCalendar(year: number, month: number, statusMap: Record<string, DayStatus>) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const cells: { day: number; current: boolean; date: string; status?: DayStatus; isToday?: boolean }[] = [];
  // Prev month tail
  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, current: false, date: '' });
  }
  // Current month
  const today = new Date();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const key = date.toISOString().slice(0, 10);
    const isToday = today.toDateString() === date.toDateString();
    cells.push({ day: d, current: true, date: key, status: statusMap[key], isToday });
  }
  // Next month head to fill the grid (6 rows * 7 = 42)
  while (cells.length < 42) {
    cells.push({ day: cells.length - daysInMonth - startDay + 1, current: false, date: '' });
  }
  return cells;
}

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [emergency, setEmergency] = useState(true);

  // Convert mock availability list into a map.
  const initialStatus: Record<string, DayStatus> = useMemo(() => {
    const map: Record<string, DayStatus> = {};
    artist.availability.forEach(d => {
      map[d.date.slice(0, 10)] = d.status as DayStatus;
    });
    return map;
  }, []);

  const [statusMap, setStatusMap] = useState(initialStatus);

  const cells = useMemo(() => buildCalendar(year, month, statusMap), [year, month, statusMap]);

  const navigate = (delta: number) => {
    const next = new Date(year, month + delta, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };

  const toggleDay = (date: string, current: boolean) => {
    if (!current) return;
    setStatusMap(prev => {
      const cur = prev[date];
      if (cur === 'booked') return prev; // can't change a booked day
      const next: Record<string, DayStatus> = { ...prev };
      next[date] = cur === 'blocked' ? 'available' : 'blocked';
      return next;
    });
  };

  const stats = {
    booked: Object.values(statusMap).filter(s => s === 'booked').length,
    available: Object.values(statusMap).filter(s => s === 'available').length,
    blocked: Object.values(statusMap).filter(s => s === 'blocked').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <CalendarIcon size={22} /> Availability Calendar
          </h1>
          <p className="text-henna-400 text-sm">Click any open date to block or unblock</p>
        </div>
        <button
          onClick={() => setEmergency(v => !v)}
          className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border transition-colors ${
            emergency ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-cream-100 text-henna-600 border-cream-200'
          }`}
        >
          <Zap size={13} /> Emergency Booking · {emergency ? 'On' : 'Off'}
        </button>
      </div>

      {/* Emergency banner */}
      {emergency && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-800 flex items-start gap-3">
          <Zap size={18} className="text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold">Emergency Booking is on.</span> You will receive urgent same-day and next-day requests.
          </p>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-cream-200 p-4 text-center">
          <p className="text-2xl font-bold text-rose-600 tabular-nums">{stats.booked}</p>
          <p className="text-[11px] uppercase tracking-wider text-henna-400 font-medium mt-1">Booked</p>
        </div>
        <div className="bg-white rounded-2xl border border-cream-200 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600 tabular-nums">{stats.available}</p>
          <p className="text-[11px] uppercase tracking-wider text-henna-400 font-medium mt-1">Available</p>
        </div>
        <div className="bg-white rounded-2xl border border-cream-200 p-4 text-center">
          <p className="text-2xl font-bold text-henna-700 tabular-nums">{stats.blocked}</p>
          <p className="text-[11px] uppercase tracking-wider text-henna-400 font-medium mt-1">Blocked</p>
        </div>
      </div>

      {/* Calendar */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-base font-[family-name:var(--font-heading)] text-henna-700">{monthNames[month]} {year}</p>
          <div className="flex items-center gap-1">
            <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-lg bg-cream-100 text-henna-700 hover:bg-cream-50 border border-cream-200 flex items-center justify-center">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => navigate(1)} className="w-8 h-8 rounded-lg bg-cream-100 text-henna-700 hover:bg-cream-50 border border-cream-200 flex items-center justify-center">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-[10px] sm:text-xs font-semibold text-henna-400 py-2 text-center">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {cells.map((c, i) => {
            const base = 'aspect-square rounded-xl flex flex-col items-center justify-center text-xs sm:text-sm font-medium border transition-colors';
            if (!c.current) {
              return <div key={i} className={`${base} bg-cream-50/50 text-cream-300 border-transparent`}>{c.day}</div>;
            }
            const tones: Record<DayStatus | 'open', string> = {
              available: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100',
              booked: 'bg-rose-50 text-rose-700 border-rose-100 cursor-not-allowed',
              blocked: 'bg-cream-100 text-henna-500 border-cream-200 hover:bg-cream-50 line-through',
              open: 'bg-white text-henna-700 border-cream-200 hover:bg-cream-50',
            };
            const tone = tones[c.status ?? 'open'];
            const todayRing = c.isToday ? ' ring-2 ring-gold-300/70' : '';
            return (
              <button
                key={i}
                onClick={() => toggleDay(c.date, c.current)}
                disabled={c.status === 'booked'}
                className={`${base} ${tone}${todayRing}`}
                title={c.status ? c.status[0].toUpperCase() + c.status.slice(1) : 'Open'}
              >
                <span>{c.day}</span>
                {c.status && (
                  <span className="text-[9px] uppercase tracking-wider mt-0.5">
                    {c.status === 'booked' ? '·' : c.status === 'blocked' ? 'blocked' : ''}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap gap-4 pt-4 border-t border-cream-100 text-xs text-henna-500">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-50 border border-emerald-200" /> Available — click to block
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-rose-50 border border-rose-200" /> Booked
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-cream-100 border border-cream-200" /> Blocked — click to unblock
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded ring-2 ring-gold-300/70" /> Today
          </span>
        </div>
      </motion.div>

      {/* Action row */}
      <div className="flex flex-wrap gap-2">
        <button className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-henna-700 text-cream-100 hover:bg-henna-800">
          <Lock size={14} /> Bulk Block Dates
        </button>
        <button className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
          <ToggleRight size={14} /> Toggle Emergency Booking
        </button>
      </div>
    </div>
  );
}
