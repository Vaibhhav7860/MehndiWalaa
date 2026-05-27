'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserX, Eye, RotateCcw, Trash2, ShieldAlert } from 'lucide-react';

type Suspension = {
  name: string;
  city: string;
  date: string;
  reason: string;
  by: string;
};

const initial: Suspension[] = [
  { name: 'Pooja Reddy', city: 'Delhi', date: '2026-04-28', reason: 'Multiple fake lead reports confirmed', by: 'Priya Sharma' },
  { name: 'Komal Rathore', city: 'Jaipur', date: '2026-05-01', reason: 'Policy violation — inappropriate portfolio content', by: 'Rahul Mehta' },
];

export default function SuspendedArtistsPage() {
  const [list, setList] = useState(initial);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <UserX size={22} /> Suspended Artists
        </h1>
        <p className="text-henna-400 text-sm">{list.length} suspended {list.length === 1 ? 'account' : 'accounts'}</p>
      </div>

      <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4 flex items-start gap-3 text-sm text-rose-800">
        <ShieldAlert size={18} className="text-rose-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold">Reminder:</span> Suspended accounts cannot log in or receive new leads. Lift the suspension once the issue is resolved, or delete to remove permanently.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-50 text-[11px] uppercase tracking-wider text-henna-400 border-b border-cream-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Artist</th>
                <th className="text-left py-3 px-4 font-medium">City</th>
                <th className="text-left py-3 px-4 font-medium">Suspended On</th>
                <th className="text-left py-3 px-4 font-medium">Reason</th>
                <th className="text-left py-3 px-4 font-medium">By</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s, i) => (
                <motion.tr key={s.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-cream-100 last:border-0 hover:bg-cream-50/40">
                  <td className="py-3 px-4 font-semibold text-henna-800">{s.name}</td>
                  <td className="py-3 px-4 text-henna-600">{s.city}</td>
                  <td className="py-3 px-4 text-henna-600 tabular-nums">{s.date}</td>
                  <td className="py-3 px-4 text-henna-700">{s.reason}</td>
                  <td className="py-3 px-4 text-henna-600">{s.by}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                        <Eye size={12} /> View
                      </button>
                      <button
                        onClick={() => setList(prev => prev.filter(x => x.name !== s.name))}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
                      >
                        <RotateCcw size={12} /> Lift
                      </button>
                      <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100">
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-henna-400">No suspended artists.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-cream-100">
          {list.map(s => (
            <div key={s.name} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-henna-800">{s.name}</p>
                  <p className="text-[11px] text-henna-400">{s.city} · {s.date}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">Suspended</span>
              </div>
              <p className="mt-2 text-sm text-henna-700">{s.reason}</p>
              <p className="text-[11px] text-henna-400 mt-1">By {s.by}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-cream-100 text-henna-700 border border-cream-200">
                  <Eye size={12} /> View
                </button>
                <button
                  onClick={() => setList(prev => prev.filter(x => x.name !== s.name))}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100"
                >
                  <RotateCcw size={12} /> Lift
                </button>
                <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
