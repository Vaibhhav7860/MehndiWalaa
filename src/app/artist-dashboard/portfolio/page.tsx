'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Clock, Trash2, Plus } from 'lucide-react';
import { artists } from '@/data/mock';

const artist = artists[0];

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Portfolio Management</h1>
        <button className="px-4 py-2 bg-henna-700 text-cream-100 rounded-full text-sm font-semibold flex items-center gap-1 hover:bg-henna-600"><Upload size={14} /> Upload Images</button>
      </div>
      <p className="text-sm text-henna-400">Manage your portfolio images. All uploads require admin approval before going live.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {artist.portfolio.map((img, i) => (
          <motion.div key={img.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="relative group rounded-xl overflow-hidden border border-cream-200 bg-white">
            <div className="relative h-40"><Image src={img.url} alt={img.caption} fill className="object-cover" /></div>
            <div className="absolute top-2 left-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${img.isApproved ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                {img.isApproved ? '✓ Approved' : '⏳ Pending'}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="p-2 bg-white/90 rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
            </div>
            <div className="p-2"><p className="text-xs text-henna-600 truncate">{img.caption}</p><p className="text-[10px] text-henna-400">{img.category}</p></div>
          </motion.div>
        ))}
        <button className="h-40 rounded-xl border-2 border-dashed border-cream-300 flex flex-col items-center justify-center text-henna-400 hover:border-gold-500 hover:text-gold-600 transition-colors">
          <Plus size={24} /><span className="text-xs mt-1">Add Image</span>
        </button>
      </div>
    </div>
  );
}
