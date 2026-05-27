'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Plus, Edit, KeyRound, Power } from 'lucide-react';

type SubAdmin = {
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  createdOn: string;
  lastLogin: string;
};

const initial: SubAdmin[] = [
  { name: 'Rahul Mehta', email: 'rahul@mehndiwalaa.com', phone: '+91 98100 11223', status: 'Active', createdOn: '2025-03-15', lastLogin: '5/17/2026' },
  { name: 'Sneha Iyer', email: 'sneha@mehndiwalaa.com', phone: '+91 98200 33445', status: 'Active', createdOn: '2025-08-20', lastLogin: '5/16/2026' },
  { name: 'Vikram Singh', email: 'vikram@mehndiwalaa.com', phone: '+91 98300 55667', status: 'Inactive', createdOn: '2024-11-10', lastLogin: '2/28/2026' },
];

const statusTone: Record<SubAdmin['status'], string> = {
  Active: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  Inactive: 'bg-cream-100 text-henna-500 border border-cream-200',
};

export default function SubAdminsPage() {
  const [list, setList] = useState(initial);

  const toggle = (email: string) =>
    setList(prev => prev.map(s => (s.email === email ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s)));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <UserPlus size={22} /> Sub Admin Management
          </h1>
          <p className="text-henna-400 text-sm">Sub admins can approve artists, moderate content and resolve fake leads. Only Super Admin can edit platform settings.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-henna-700 text-cream-100 hover:bg-henna-800">
          <Plus size={14} /> Add Sub Admin
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-50 text-[11px] uppercase tracking-wider text-henna-400 border-b border-cream-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Email</th>
                <th className="text-left py-3 px-4 font-medium">Phone</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Created</th>
                <th className="text-left py-3 px-4 font-medium">Last Login</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s, i) => (
                <motion.tr
                  key={s.email}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-cream-100 last:border-0 hover:bg-cream-50/40"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-henna-100 text-henna-700 flex items-center justify-center font-bold text-sm">{s.name[0]}</div>
                      <span className="font-semibold text-henna-800">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-henna-600 break-all">{s.email}</td>
                  <td className="py-3 px-4 text-henna-600 tabular-nums">{s.phone}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusTone[s.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'Active' ? 'bg-emerald-500' : 'bg-henna-400'}`} />
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-henna-600 tabular-nums">{s.createdOn}</td>
                  <td className="py-3 px-4 text-henna-600 tabular-nums">{s.lastLogin}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                        <Edit size={12} /> Edit
                      </button>
                      <button
                        onClick={() => toggle(s.email)}
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${
                          s.status === 'Active'
                            ? 'bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100'
                        }`}
                      >
                        <Power size={12} /> {s.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
                        <KeyRound size={12} /> Reset
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-cream-100">
          {list.map(s => (
            <div key={s.email} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-henna-100 text-henna-700 flex items-center justify-center font-bold text-sm shrink-0">{s.name[0]}</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-henna-800">{s.name}</p>
                    <p className="text-[11px] text-henna-400 break-all">{s.email}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${statusTone[s.status]}`}>{s.status}</span>
              </div>
              <p className="mt-2 text-xs text-henna-500">{s.phone}</p>
              <p className="text-[11px] text-henna-400 mt-0.5">Created {s.createdOn} · Last login {s.lastLogin}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-cream-100 text-henna-700 border border-cream-200">
                  <Edit size={12} /> Edit
                </button>
                <button
                  onClick={() => toggle(s.email)}
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${
                    s.status === 'Active'
                      ? 'bg-rose-50 text-rose-700 border border-rose-100'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}
                >
                  <Power size={12} /> {s.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-cream-100 text-henna-700 border border-cream-200">
                  <KeyRound size={12} /> Reset
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
