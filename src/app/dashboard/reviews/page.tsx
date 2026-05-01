'use client';
import { useState } from 'react';
import { Star, Upload, Plus, Image as ImageIcon } from 'lucide-react';
import { mockReviews, mockBookings, artists } from '@/data/mock';
import { formatDate } from '@/lib/utils';

function WriteReviewForm({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [occasion, setOccasion] = useState('Wedding');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div className="bg-white rounded-2xl border border-cream-200 p-8 text-center">
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><Star size={24} className="fill-gold-500 text-gold-500" /></div>
      <h3 className="text-lg font-bold text-henna-700 font-[family-name:var(--font-heading)]">Thank you!</h3>
      <p className="text-sm text-henna-400 mt-1">Your review has been submitted and will appear after verification.</p>
      <button onClick={onClose} className="mt-4 px-6 py-2 bg-henna-700 text-cream-100 rounded-full text-sm font-semibold hover:bg-henna-600">Done</button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-6 space-y-4">
      <h3 className="text-lg font-bold text-henna-700 font-[family-name:var(--font-heading)]">Write a Review</h3>

      <div>
        <label className="text-xs font-medium text-henna-600 mb-1 block">Select Artist *</label>
        <select className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500">
          {mockBookings.filter(b => b.status === 'completed').map(b => (
            <option key={b.id}>{b.artistName}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-henna-600 mb-2 block">Rating *</label>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(s => (
            <button key={s} onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s)} className="p-1">
              <Star size={28} className={`transition-colors ${(hoverRating || rating) >= s ? 'fill-gold-500 text-gold-500' : 'text-cream-300'}`} />
            </button>
          ))}
          {rating > 0 && <span className="ml-2 text-sm text-henna-600 self-center font-medium">{rating}/5</span>}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-henna-600 mb-1 block">Occasion</label>
        <select value={occasion} onChange={e => setOccasion(e.target.value)} className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500">
          {['Wedding', 'Engagement', 'Karva Chauth', 'Eid', 'Festival', 'Party'].map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-henna-600 mb-1 block">Your Review *</label>
        <textarea rows={4} value={text} onChange={e => setText(e.target.value)}
          placeholder="Tell others about your experience — design quality, punctuality, professionalism..."
          className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" />
      </div>

      <div>
        <label className="text-xs font-medium text-henna-600 mb-2 block">Upload Photos (optional)</label>
        <div className="flex gap-2">
          {[1,2,3].map(i => (
            <div key={i} className="w-20 h-20 rounded-xl border-2 border-dashed border-cream-300 flex flex-col items-center justify-center text-henna-400 hover:border-gold-500 hover:text-gold-600 cursor-pointer transition-colors">
              <ImageIcon size={18} /><span className="text-[9px] mt-0.5">Upload</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onClose} className="px-5 py-2.5 border border-cream-300 text-henna-600 rounded-xl text-sm font-medium">Cancel</button>
        <button onClick={() => setSubmitted(true)} disabled={rating === 0 || !text.trim()}
          className="px-6 py-2.5 bg-henna-700 text-cream-100 rounded-xl text-sm font-semibold hover:bg-henna-600 disabled:opacity-40 disabled:cursor-not-allowed">
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false);
  const myReviews = mockReviews.slice(0, 4);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">My Reviews</h1>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-gold-500 text-henna-900 rounded-full text-sm font-semibold flex items-center gap-1 hover:bg-gold-400">
          <Plus size={14} /> Write Review
        </button>
      </div>

      {showForm && <WriteReviewForm onClose={() => setShowForm(false)} />}

      <div className="space-y-4">
        {myReviews.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-cream-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <div><p className="font-semibold text-henna-800">{r.userName}</p><p className="text-xs text-henna-400">{r.occasion} · {formatDate(r.date)}</p></div>
              <div className="flex gap-0.5">{Array.from({length:5},(_,i)=><Star key={i} size={14} className={i < Math.round(r.rating) ? 'fill-gold-500 text-gold-500' : 'text-cream-300'} />)}</div>
            </div>
            <p className="text-sm text-henna-600">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
