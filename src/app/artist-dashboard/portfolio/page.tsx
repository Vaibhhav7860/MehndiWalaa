'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Upload, Trash2, Plus, Video, Image as ImageIcon, Sparkles } from 'lucide-react';
import { artists } from '@/data/mock';

const artist = artists[0];

const planLimit = 50;

export default function PortfolioPage() {
  const uploaded = artist.portfolio.length;
  const pct = Math.round((uploaded / planLimit) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <ImageIcon size={22} /> Portfolio
          </h1>
          <p className="text-henna-400 text-sm">High-quality photos and videos drive 3x more bookings</p>
        </div>
        <button className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-henna-700 text-cream-100 hover:bg-henna-800">
          <Upload size={14} /> Upload Photos
        </button>
      </div>

      {/* Plan usage strip */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold">Growth Plan Usage</p>
            <p className="font-bold text-henna-800 mt-0.5">
              <span className="text-emerald-600 tabular-nums">{uploaded}</span>
              <span className="text-henna-400"> / {planLimit} photos uploaded</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-cream-100 text-henna-600 border border-cream-200">
            <Sparkles size={12} className="text-gold-600" /> Upgrade to Pro Elite for unlimited
          </span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-cream-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.7 }}
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
          />
        </div>
      </div>

      <p className="text-sm text-henna-500">All uploads are reviewed by admin before going live on your profile.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {artist.portfolio.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="group relative rounded-2xl overflow-hidden border border-cream-200 bg-white"
          >
            <div className="relative aspect-square">
              <Image src={img.url} alt={img.caption} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
              img.isApproved ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
            }`}>
              {img.isApproved ? '✓ Approved' : '⏳ Pending'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-henna-900/70 via-henna-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-xs font-semibold text-cream-100 truncate">{img.caption}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-8 h-8 rounded-full bg-white/95 text-rose-500 hover:text-rose-600 hover:bg-white shadow-sm flex items-center justify-center">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="p-3">
              <p className="text-[10px] uppercase tracking-wider text-henna-400">{img.category}</p>
            </div>
          </motion.div>
        ))}

        <button className="aspect-square rounded-2xl border-2 border-dashed border-cream-300 flex flex-col items-center justify-center gap-1.5 text-henna-500 hover:border-gold-400 hover:text-gold-700 hover:bg-cream-50 transition-colors">
          <Plus size={22} />
          <span className="text-xs font-semibold">Add Photo</span>
        </button>
        <button className="aspect-square rounded-2xl border-2 border-dashed border-cream-300 flex flex-col items-center justify-center gap-1.5 text-henna-500 hover:border-rose-300 hover:text-rose-600 hover:bg-cream-50 transition-colors">
          <Video size={22} />
          <span className="text-xs font-semibold">Add Video</span>
        </button>
      </div>
    </div>
  );
}
