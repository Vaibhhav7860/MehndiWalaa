'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Sparkles, User, Clock } from 'lucide-react';

// Demo target — counts down to a fixed upcoming session.
// Swap with the real serviceDate from a booking when wired to backend.
const SERVICE_TARGET = new Date('2026-06-12T10:00:00');

const serviceDetails = {
  artist: 'Ananya Verma',
  service: 'Bridal Mehndi — Full Day',
  address: 'Taj Lands End, Bandra West, Mumbai',
};

type Remaining = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function getRemaining(target: Date): Remaining {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

const pad = (n: number) => n.toString().padStart(2, '0');

export default function ServiceTimerPage() {
  const target = useMemo(() => SERVICE_TARGET, []);
  const [remaining, setRemaining] = useState<Remaining>(() => getRemaining(target));

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units: { label: string; value: number }[] = [
    { label: 'Days', value: remaining.days },
    { label: 'Hours', value: remaining.hours },
    { label: 'Minutes', value: remaining.minutes },
    { label: 'Seconds', value: remaining.seconds },
  ];

  const targetLabel = target.toLocaleString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Service Timer</h1>
        <p className="text-henna-400 text-sm">Countdown to your confirmed session</p>
      </div>

      {/* Countdown card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-8"
      >
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 text-henna-400 text-xs uppercase tracking-[0.2em]">
          <Sparkles size={12} className="text-gold-500" />
          {remaining.done ? 'Session is live' : 'Starts on'}
          {!remaining.done && <span className="text-henna-600 normal-case tracking-normal">· {targetLabel}</span>}
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-2xl border border-cream-200 bg-cream-50/60 flex items-center justify-center">
                  <motion.span
                    key={u.value}
                    initial={{ y: 6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl sm:text-3xl font-bold text-henna-700 font-[family-name:var(--font-heading)] tabular-nums"
                  >
                    {pad(u.value)}
                  </motion.span>
                </div>
                <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-henna-400">{u.label}</p>
              </div>
              {i < units.length - 1 && <span className="text-henna-300 text-xl sm:text-2xl font-light pb-6">:</span>}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Service details card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6"
      >
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Service Details</h2>

        <dl className="divide-y divide-cream-100">
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="flex items-center gap-2 text-sm text-henna-400">
              <User size={14} /> Artist
            </dt>
            <dd className="text-sm font-semibold text-henna-800 text-right">{serviceDetails.artist}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="flex items-center gap-2 text-sm text-henna-400">
              <Clock size={14} /> Service
            </dt>
            <dd className="text-sm font-semibold text-henna-800 text-right">{serviceDetails.service}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 py-3">
            <dt className="flex items-center gap-2 text-sm text-henna-400 pt-0.5">
              <MapPin size={14} /> Address
            </dt>
            <dd className="text-sm font-semibold text-henna-800 text-right max-w-[60%]">{serviceDetails.address}</dd>
          </div>
        </dl>

        <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-green-600">
          <CheckCircle2 size={14} /> Synced with Artist Dashboard
        </div>
      </motion.div>
    </div>
  );
}
