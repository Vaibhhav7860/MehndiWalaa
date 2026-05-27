'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarHeart } from 'lucide-react';

type FestivalKey = 'eid' | 'diwali' | 'karva_chauth' | 'navratri' | 'wedding_season' | 'holi';

type Festival = {
  id: string;
  key: FestivalKey;
  name: string;
  emoji: string;
  dateLabel: string;
  artistsAvailable: number;
  slotsLeft: number;
  tags: string[];
};

const festivals: Festival[] = [
  {
    id: 'f1',
    key: 'karva_chauth',
    name: 'Karva Chauth',
    emoji: '🌙',
    dateLabel: '12–13 Oct 2026',
    artistsAvailable: 48,
    slotsLeft: 6,
    tags: ['Traditional', 'Minimal', 'Portrait'],
  },
  {
    id: 'f2',
    key: 'diwali',
    name: 'Diwali',
    emoji: '🪔',
    dateLabel: '1–5 Nov 2026',
    artistsAvailable: 72,
    slotsLeft: 14,
    tags: ['Arabic', 'Indo-Arabic', 'Quick Design'],
  },
  {
    id: 'f3',
    key: 'eid',
    name: 'Eid',
    emoji: '🌛',
    dateLabel: '20–21 Mar 2026',
    artistsAvailable: 56,
    slotsLeft: 9,
    tags: ['Arabic', 'Floral', 'Bridal Trial'],
  },
  {
    id: 'f4',
    key: 'navratri',
    name: 'Navratri',
    emoji: '💃',
    dateLabel: '12–20 Oct 2026',
    artistsAvailable: 40,
    slotsLeft: 22,
    tags: ['Traditional', 'Festive', 'Quick Design'],
  },
  {
    id: 'f5',
    key: 'wedding_season',
    name: 'Wedding Season',
    emoji: '💍',
    dateLabel: 'Nov 2026 – Feb 2027',
    artistsAvailable: 120,
    slotsLeft: 35,
    tags: ['Bridal', 'Royal Paisley', 'Mandala'],
  },
  {
    id: 'f6',
    key: 'holi',
    name: 'Holi',
    emoji: '🎨',
    dateLabel: '3–4 Mar 2026',
    artistsAvailable: 28,
    slotsLeft: 18,
    tags: ['Minimal', 'Floral', 'Quick Design'],
  },
];

const filters: { key: 'all' | FestivalKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'eid', label: 'Eid' },
  { key: 'diwali', label: 'Diwali' },
  { key: 'karva_chauth', label: 'Karva Chauth' },
  { key: 'navratri', label: 'Navratri' },
  { key: 'wedding_season', label: 'Wedding Season' },
  { key: 'holi', label: 'Holi' },
];

export default function FestivalAppointmentsPage() {
  const [filter, setFilter] = useState<'all' | FestivalKey>('all');
  const visible = filter === 'all' ? festivals : festivals.filter(f => f.key === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Festival Appointments</h1>
        <p className="text-henna-400 text-sm">Book early for peak seasons</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map(f => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                active
                  ? 'bg-gold-500 text-henna-800 border-gold-500'
                  : 'bg-white text-henna-600 border-cream-200 hover:bg-cream-50'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-cream-100 text-henna-400 flex items-center justify-center mx-auto mb-3">
            <CalendarHeart size={20} />
          </div>
          <p className="font-semibold text-henna-800">No festivals match this filter</p>
          <p className="text-sm text-henna-400 mt-1">Try selecting another festival to see options.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((f, i) => (
              <motion.div
                key={f.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-cream-200 p-5 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center text-2xl">
                    <span aria-hidden>{f.emoji}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gold-50 text-gold-700">
                    {f.slotsLeft} slots left
                  </span>
                </div>

                <h3 className="font-bold text-henna-800 text-lg leading-tight">{f.name}</h3>
                <p className="text-sm text-henna-400">{f.dateLabel}</p>
                <p className="text-sm text-henna-700 mt-1">
                  <span className="font-semibold text-henna-800">{f.artistsAvailable}</span>
                  <span className="text-henna-400"> artists available</span>
                </p>

                <div className="flex flex-wrap gap-2 mt-3 mb-5">
                  {f.tags.map(t => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cream-100 text-henna-600 border border-cream-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button className="mt-auto w-full bg-henna-700 hover:bg-henna-800 text-cream-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                  Book Now
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
