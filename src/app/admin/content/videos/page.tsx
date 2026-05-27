'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, CheckCircle, XCircle, Play, ExternalLink, CheckCheck } from 'lucide-react';

type VideoStatus = 'pending' | 'approved' | 'rejected';

type Item = {
  id: string;
  artist: string;
  url: string;
  thumbnail: string;
  date: string;
  status: VideoStatus;
};

const initial: Item[] = [
  { id: 'v1', artist: 'Ritu Verma', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: '/images/hero-mehndi.png', date: '2026-05-14', status: 'pending' },
  { id: 'v2', artist: 'Meera Singh', url: 'https://www.youtube.com/watch?v=9bZkp7q19f0', thumbnail: '/images/hero-mehndi.png', date: '2026-05-13', status: 'pending' },
  { id: 'v3', artist: 'Nisha Kapoor', url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', thumbnail: '/images/hero-mehndi.png', date: '2026-05-10', status: 'approved' },
  { id: 'v4', artist: 'Aarti Meena', url: 'https://www.youtube.com/watch?v=RgKAFK5djSk', thumbnail: '/images/hero-mehndi.png', date: '2026-05-08', status: 'pending' },
  { id: 'v5', artist: 'Isha Malhotra', url: 'https://www.youtube.com/watch?v=OPf0YbXqDm0', thumbnail: '/images/hero-mehndi.png', date: '2026-05-05', status: 'rejected' },
];

const statusTone: Record<VideoStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-100',
  approved: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  rejected: 'bg-rose-50 text-rose-700 border border-rose-100',
};

export default function VideoQueuePage() {
  const [items, setItems] = useState(initial);
  const pending = items.filter(i => i.status === 'pending');

  const setStatus = (id: string, status: VideoStatus) => setItems(prev => prev.map(i => (i.id === id ? { ...i, status } : i)));
  const approveAll = () => setItems(prev => prev.map(i => (i.status === 'pending' ? { ...i, status: 'approved' } : i)));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <Video size={22} /> Video Queue
          </h1>
          <p className="text-henna-400 text-sm">{pending.length} {pending.length === 1 ? 'video' : 'videos'} pending review</p>
        </div>
        <div className="flex gap-2">
          <button onClick={approveAll} className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">
            <CheckCheck size={14} /> Approve All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl border border-cream-200 overflow-hidden flex flex-col"
          >
            <div className="relative aspect-video bg-henna-900">
              {/* Thumbnail (mock) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.thumbnail} alt="" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-henna-700 flex items-center justify-center shadow-sm">
                  <Play size={18} className="ml-0.5" />
                </div>
              </div>
              <span className={`absolute top-3 right-3 inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${statusTone[v.status]}`}>
                {v.status[0].toUpperCase() + v.status.slice(1)}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <p className="font-semibold text-henna-800 text-sm">{v.artist}</p>
              <p className="text-[11px] text-henna-400 mt-0.5">{v.date}</p>
              <a
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[11px] text-gold-700 hover:underline truncate"
              >
                <ExternalLink size={11} /> {v.url}
              </a>

              {v.status === 'pending' && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setStatus(v.id, 'approved')}
                    className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle size={12} /> Approve
                  </button>
                  <button
                    onClick={() => setStatus(v.id, 'rejected')}
                    className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100"
                  >
                    <XCircle size={12} /> Reject
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
