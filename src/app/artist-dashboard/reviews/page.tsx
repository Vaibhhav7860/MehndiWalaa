'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Share2, Send } from 'lucide-react';
import { artists } from '@/data/mock';
import { formatDate } from '@/lib/utils';

const artist = artists[0];

// Demo replies + breakdown — swap to real data when backend is wired.
const replies: Record<string, string> = {};

const breakdown = [
  { stars: 5, count: 17 },
  { stars: 4, count: 5 },
  { stars: 3, count: 1 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

export default function ArtistReviewsPage() {
  const reviews = artist.reviews;
  const total = reviews.length || breakdown.reduce((s, b) => s + b.count, 0);
  const [editing, setEditing] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>(replies);

  const setDraft = (id: string, value: string) => setDrafts(prev => ({ ...prev, [id]: value }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Star size={22} /> My Reviews
        </h1>
        <p className="text-henna-400 text-sm">Reply to reviews, share happy ones, build trust</p>
      </div>

      {/* Score + breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4">
        <div className="bg-white rounded-2xl border border-cream-200 p-6 text-center">
          <p className="text-5xl font-bold font-[family-name:var(--font-heading)] text-henna-700 tabular-nums">{artist.rating.toFixed(1)}</p>
          <div className="flex justify-center gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < Math.round(artist.rating) ? 'fill-gold-500 text-gold-500' : 'text-cream-300'}
              />
            ))}
          </div>
          <p className="text-xs text-henna-400 mt-2">{total} reviews</p>
        </div>

        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <p className="text-sm font-semibold text-henna-800 mb-3">Rating Breakdown</p>
          <div className="space-y-2">
            {breakdown.map(b => {
              const pct = total ? Math.round((b.count / total) * 100) : 0;
              return (
                <div key={b.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 inline-flex items-center gap-0.5 text-amber-500 shrink-0">
                    {Array.from({ length: b.stars }).map((_, si) => <Star key={si} size={10} className="fill-amber-400 text-amber-400" />)}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-cream-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7 }}
                      className="h-full bg-gradient-to-r from-amber-300 to-amber-500"
                    />
                  </div>
                  <span className="w-8 text-right text-henna-500 tabular-nums">{b.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-3">
        {reviews.map((r, idx) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="bg-white rounded-2xl border border-cream-200 p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center font-bold">{r.userName[0]}</div>
                <div>
                  <p className="font-semibold text-henna-800 text-sm">{r.userName}</p>
                  <p className="text-xs text-henna-400">{r.occasion} · {formatDate(r.date)}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < Math.round(r.rating) ? 'fill-gold-500 text-gold-500' : 'text-cream-300'} />
                ))}
              </div>
            </div>
            <p className="text-sm text-henna-700 leading-relaxed">{r.text}</p>

            {drafts[r.id] && editing !== r.id && (
              <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-800">
                <span className="font-semibold">Artist reply:</span> {drafts[r.id]}
              </div>
            )}

            {editing === r.id && (
              <div className="mt-3">
                <textarea
                  value={drafts[r.id] ?? ''}
                  onChange={e => setDraft(r.id, e.target.value)}
                  rows={2}
                  placeholder="Write a public reply..."
                  className="w-full text-sm px-3 py-2 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setEditing(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-henna-700 text-cream-100 hover:bg-henna-800"
                  >
                    <Send size={12} /> Publish Reply
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setEditing(editing === r.id ? null : r.id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50"
              >
                <MessageSquare size={12} /> {drafts[r.id] ? 'Edit Reply' : 'Reply'}
              </button>
              <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                <Share2 size={12} /> Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
