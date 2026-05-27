'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Image as ImageIcon, CheckCircle2, XCircle, CheckCheck, ShieldOff, Square, CheckSquare } from 'lucide-react';
import { mockContentModeration } from '@/data/mock';

type Status = 'pending' | 'approved' | 'rejected';

const statusTone: Record<Status, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-100',
  approved: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  rejected: 'bg-rose-50 text-rose-700 border border-rose-100',
};

export default function ContentModerationPage() {
  const [items, setItems] = useState(
    mockContentModeration.map(m => ({ ...m, status: m.status as Status }))
  );
  const [selected, setSelected] = useState<string[]>([]);

  const pending = useMemo(() => items.filter(i => i.status === 'pending'), [items]);
  const allSelected = pending.length > 0 && pending.every(p => selected.includes(p.id));

  const toggleSelect = (id: string) =>
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const selectAll = () => {
    if (allSelected) setSelected([]);
    else setSelected(pending.map(p => p.id));
  };

  const setStatus = (ids: string[], status: Status) =>
    setItems(prev => prev.map(i => (ids.includes(i.id) ? { ...i, status } : i)));

  const approveAll = () => setItems(prev => prev.map(i => (i.status === 'pending' ? { ...i, status: 'approved' } : i)));
  const rejectAll = () => setItems(prev => prev.map(i => (i.status === 'pending' ? { ...i, status: 'rejected' } : i)));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <ImageIcon size={22} /> Image Queue
          </h1>
          <p className="text-henna-400 text-sm">{pending.length} {pending.length === 1 ? 'image' : 'images'} pending approval</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={selectAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50"
          >
            {allSelected ? <CheckSquare size={13} /> : <Square size={13} />}
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
          {selected.length > 0 && (
            <>
              <button
                onClick={() => { setStatus(selected, 'approved'); setSelected([]); }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <CheckCircle2 size={13} /> Approve Selected ({selected.length})
              </button>
              <button
                onClick={() => { setStatus(selected, 'rejected'); setSelected([]); }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100"
              >
                <XCircle size={13} /> Reject Selected
              </button>
            </>
          )}
          <button
            onClick={approveAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <CheckCheck size={13} /> Approve All
          </button>
          <button
            onClick={rejectAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100"
          >
            <ShieldOff size={13} /> Reject All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item, i) => {
          const isSelected = selected.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className={`group bg-white rounded-2xl border overflow-hidden transition-all ${
                isSelected ? 'border-gold-300 ring-2 ring-gold-200' : 'border-cream-200'
              }`}
            >
              <div className="relative aspect-[4/3] bg-cream-100">
                <Image src={item.url} alt={item.category} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-henna-900/40 via-transparent to-transparent" />
                <span className={`absolute top-2 right-2 inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${statusTone[item.status]}`}>
                  {item.status[0].toUpperCase() + item.status.slice(1)}
                </span>
                {item.status === 'pending' && (
                  <button
                    onClick={() => toggleSelect(item.id)}
                    className="absolute top-2 left-2 w-7 h-7 rounded-md bg-white/90 hover:bg-white text-henna-700 flex items-center justify-center"
                    aria-label="Select"
                  >
                    {isSelected ? <CheckSquare size={14} className="text-gold-700" /> : <Square size={14} />}
                  </button>
                )}
                <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cream-100/90 text-henna-700 border border-cream-200">
                  🔒 Watermarked
                </span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-henna-800 text-sm">{item.artistName}</p>
                <p className="text-[11px] text-henna-400 mt-0.5">{new Date(item.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <p className="text-[11px] text-henna-500 mt-0.5">{item.category}</p>

                {item.status === 'pending' && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setStatus([item.id], 'approved')}
                      className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <CheckCircle2 size={12} /> Approve
                    </button>
                    <button
                      onClick={() => setStatus([item.id], 'rejected')}
                      className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100"
                    >
                      <XCircle size={12} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
