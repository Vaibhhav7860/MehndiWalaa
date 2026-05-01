'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Star, Trash2, MessageCircle, Phone } from 'lucide-react';
import { artists } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

export default function ShortlistPage() {
  const shortlisted = artists.filter(a => ['a1','a5','a10'].includes(a.id));
  const [items, setItems] = useState(shortlisted);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">My Shortlist</h1>
        <p className="text-henna-400 text-sm">{items.length} artists shortlisted</p></div>
      <div className="space-y-4">
        {items.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-cream-200 p-4 flex gap-4 hover-lift">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"><Image src={a.profileImage} alt={a.name} width={80} height={80} className="object-cover w-full h-full" /></div>
            <div className="flex-1">
              <Link href={`/artists/${a.id}`} className="font-semibold text-henna-800 hover:text-gold-600">{a.name}</Link>
              <p className="text-sm text-henna-400 flex items-center gap-1"><MapPin size={12} /> {a.locality}, {a.city}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs"><Star size={12} className="fill-gold-500 text-gold-500" /> {a.rating.toFixed(1)}</span>
                <span className="text-xs text-henna-400">{formatPrice(a.priceRange.min)}+</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"><MessageCircle size={16} /></button>
              <button onClick={() => setItems(items.filter(x => x.id !== a.id))} className="p-2 bg-red-50 text-red-400 rounded-lg hover:bg-red-100"><Trash2 size={16} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
