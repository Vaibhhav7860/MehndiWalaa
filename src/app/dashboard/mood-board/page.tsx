'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Palette, Plus, Trash2, Share2, Search } from 'lucide-react';
import { OCCASIONS } from '@/lib/constants';

const mockItems = [
  { id: 'mb1', imageUrl: '/images/hero-mehndi.png', occasion: 'Wedding' as const, notes: 'Love this intricate bridal pattern with peacock motif', savedAt: '2026-04-28' },
  { id: 'mb2', imageUrl: '/images/hero-mehndi.png', occasion: 'Engagement' as const, notes: 'Simple and elegant for engagement', savedAt: '2026-04-27' },
  { id: 'mb3', imageUrl: '/images/hero-mehndi.png', occasion: 'Karva Chauth' as const, notes: 'Traditional design for Karva Chauth', savedAt: '2026-04-25' },
  { id: 'mb4', imageUrl: '/images/hero-mehndi.png', occasion: 'Wedding' as const, notes: 'Arabic fusion bridal design', savedAt: '2026-04-22' },
];

export default function MoodBoardPage() {
  const [items, setItems] = useState(mockItems);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? items : items.filter(i => i.occasion === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div><h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><Palette size={24} /> My Mood Board</h1>
          <p className="text-henna-400 text-sm">{items.length} designs saved</p></div>
        <button className="px-4 py-2 bg-henna-700 text-cream-100 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-henna-600"><Plus size={14} /> Add Design</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', ...OCCASIONS.slice(0, 5)].map(o => (
          <button key={o} onClick={() => setFilter(o)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${filter === o ? 'bg-henna-700 text-cream-100' : 'bg-cream-100 text-henna-600 border border-cream-300 hover:bg-cream-200'}`}>{o}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-cream-200 overflow-hidden hover-lift">
            <div className="relative h-48"><Image src={item.imageUrl} alt={item.notes} fill className="object-cover" /></div>
            <div className="p-4">
              <span className="px-2 py-0.5 bg-gold-50 text-gold-600 text-xs rounded-full font-medium">{item.occasion}</span>
              <p className="text-sm text-henna-700 mt-2">{item.notes}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-100">
                <span className="text-xs text-henna-400">{item.savedAt}</span>
                <div className="flex gap-2">
                  <button className="p-1.5 text-henna-400 hover:text-blue-500"><Share2 size={14} /></button>
                  <button className="p-1.5 text-henna-400 hover:text-gold-500"><Search size={14} /></button>
                  <button onClick={() => setItems(items.filter(x => x.id !== item.id))} className="p-1.5 text-henna-400 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
