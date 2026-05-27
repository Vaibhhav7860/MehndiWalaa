'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Trash2, Send, Sparkles } from 'lucide-react';

type DesignItem = {
  id: string;
  name: string;
  style: string;
  image: string;
};

const initialDesigns: DesignItem[] = [
  { id: 'd1', name: 'Royal Paisley', style: 'Bridal · Intricate', image: '/images/designs/royal-paisley.png' },
  { id: 'd2', name: 'Mandala Bloom', style: 'Festive · Symmetric', image: '/images/designs/mandala-bloom.png' },
  { id: 'd3', name: 'Arabic Vine', style: 'Minimal · Flowy', image: '/images/designs/arabic-vine.png' },
];

export default function DesignShortlistPage() {
  const [designs, setDesigns] = useState<DesignItem[]>(initialDesigns);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleShare = (d: DesignItem) => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: d.name, text: `Check out this mehndi design: ${d.name}` }).catch(() => {});
    } else {
      showToast(`Link to ${d.name} copied`);
    }
  };

  const handleDelete = (id: string) => {
    setDesigns(prev => prev.filter(d => d.id !== id));
    showToast('Design removed from shortlist');
  };

  const handleShareWithArtist = (d: DesignItem) => {
    showToast(`${d.name} shared with enquired artist`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Design Shortlist</h1>
        <p className="text-henna-400 text-sm">{designs.length} mehndi designs saved · share them with the artists you have enquired</p>
      </div>

      {designs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-cream-200 p-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-henna-50 text-henna-600 flex items-center justify-center mx-auto mb-3">
            <Sparkles size={20} />
          </div>
          <p className="font-semibold text-henna-800">No designs in your shortlist</p>
          <p className="text-sm text-henna-400 mt-1">Browse the gallery and bookmark designs you love.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {designs.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-cream-200 overflow-hidden flex flex-col"
            >
              <div className="group relative aspect-square bg-cream-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-henna-900/60 via-henna-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={() => handleShare(d)}
                    aria-label={`Share ${d.name}`}
                    className="w-9 h-9 rounded-full bg-white/95 backdrop-blur text-henna-700 hover:text-henna-900 hover:bg-white shadow-sm flex items-center justify-center"
                  >
                    <Share2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    aria-label={`Remove ${d.name}`}
                    className="w-9 h-9 rounded-full bg-white/95 backdrop-blur text-red-500 hover:text-red-600 hover:bg-white shadow-sm flex items-center justify-center"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-cream-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <p className="text-base font-semibold leading-tight">{d.name}</p>
                    <p className="text-[11px] uppercase tracking-wider text-cream-200/80">{d.style}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div>
                  <p className="font-semibold text-henna-800">{d.name}</p>
                  <p className="text-xs text-henna-400">{d.style}</p>
                </div>
                <button
                  onClick={() => handleShareWithArtist(d)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-henna-700 hover:bg-henna-800 text-cream-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  <Send size={14} /> Share with Enquired Artist
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-henna-800 text-cream-100 text-sm px-4 py-2.5 rounded-full shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
