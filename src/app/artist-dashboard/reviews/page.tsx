'use client';
import { Star } from 'lucide-react';
import { artists } from '@/data/mock';
import { formatDate } from '@/lib/utils';

export default function ArtistReviewsPage() {
  const reviews = artists[0].reviews;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">My Reviews</h1>
      <div className="bg-white rounded-2xl border border-cream-200 p-5 flex items-center gap-6 mb-4">
        <div className="text-center"><p className="text-4xl font-bold text-henna-700">{artists[0].rating.toFixed(1)}</p>
          <div className="flex gap-0.5 mt-1">{Array.from({length:5},(_,i)=><Star key={i} size={14} className={i<Math.round(artists[0].rating)?'fill-gold-500 text-gold-500':'text-cream-300'} />)}</div>
          <p className="text-xs text-henna-400 mt-1">{reviews.length} reviews</p></div>
      </div>
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-cream-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <div><p className="font-semibold text-henna-800">{r.userName}</p><p className="text-xs text-henna-400">{r.occasion} · {formatDate(r.date)}</p></div>
              <div className="flex gap-0.5">{Array.from({length:5},(_,i)=><Star key={i} size={12} className={i<Math.round(r.rating)?'fill-gold-500 text-gold-500':'text-cream-300'} />)}</div>
            </div>
            <p className="text-sm text-henna-600">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
