'use client';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

type TrialStatus = 'upcoming' | 'confirmed_booking' | 'not_proceeded';

type TrialSession = {
  id: string;
  artistName: string;
  date: string; // ISO
  timeLabel: string;
  location: string;
  status: TrialStatus;
};

const sessions: TrialSession[] = [
  { id: 't1', artistName: 'Kavya Nair', date: '2026-05-30', timeLabel: '11:00 AM', location: 'Indiranagar Studio', status: 'upcoming' },
  { id: 't2', artistName: 'Rhea Kapoor', date: '2026-04-05', timeLabel: '3:00 PM', location: 'South Delhi', status: 'confirmed_booking' },
  { id: 't3', artistName: 'Meera Joshi', date: '2026-02-12', timeLabel: '10:00 AM', location: 'Pune', status: 'not_proceeded' },
];

const statusConfig: Record<TrialStatus | 'in_days', { label: (s: TrialSession, days: number) => string; bg: string; color: string }> = {
  upcoming: { label: (_s, days) => (days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`), bg: 'bg-amber-100', color: 'text-amber-700' },
  confirmed_booking: { label: () => 'Confirmed Booking', bg: 'bg-green-100', color: 'text-green-700' },
  not_proceeded: { label: () => 'Not Proceeded', bg: 'bg-cream-200', color: 'text-henna-500' },
  in_days: { label: () => '', bg: '', color: '' },
};

function formatLongDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function daysFromNow(date: string): number {
  const ms = new Date(date).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

function SessionCard({ s, index }: { s: TrialSession; index: number }) {
  const cfg = statusConfig[s.status];
  const days = s.status === 'upcoming' ? daysFromNow(s.date) : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white rounded-2xl border border-cream-200 p-5 flex items-start justify-between gap-4"
    >
      <div className="min-w-0">
        <h3 className="font-semibold text-henna-800 text-base leading-tight">{s.artistName}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-henna-400">
          <Calendar size={13} />
          {formatLongDate(s.date)}
          <span className="text-henna-300">·</span>
          <Clock size={13} />
          {s.timeLabel}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-henna-500">
          <MapPin size={13} className="text-henna-400" />
          {s.location}
        </p>
      </div>
      <span className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold ${cfg.bg} ${cfg.color}`}>
        {cfg.label(s, days)}
      </span>
    </motion.div>
  );
}

export default function TrialSessionsPage() {
  const upcoming = sessions.filter(s => s.status === 'upcoming');
  const past = sessions.filter(s => s.status !== 'upcoming');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Trial Sessions</h1>
        <p className="text-henna-400 text-sm">Test designs before the big day</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Upcoming</h2>
        {upcoming.length === 0 ? (
          <div className="bg-white rounded-2xl border border-cream-200 p-8 text-center">
            <div className="w-11 h-11 rounded-xl bg-henna-50 text-henna-600 flex items-center justify-center mx-auto mb-3">
              <Sparkles size={18} />
            </div>
            <p className="font-semibold text-henna-800 text-sm">No upcoming trial sessions</p>
            <p className="text-xs text-henna-400 mt-1">Book a trial with your shortlisted artist to test designs.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((s, i) => <SessionCard key={s.id} s={s} index={i} />)}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Past</h2>
        {past.length === 0 ? (
          <div className="bg-white rounded-2xl border border-cream-200 p-8 text-center">
            <p className="text-sm text-henna-400">No past trial sessions yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {past.map((s, i) => <SessionCard key={s.id} s={s} index={i} />)}
          </div>
        )}
      </section>
    </div>
  );
}
