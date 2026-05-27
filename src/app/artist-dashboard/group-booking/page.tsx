'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Trash2, MessageSquare, CheckCircle2, Lightbulb } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

type Member = {
  id: string;
  name: string;
  service: 'Bridal Full' | 'Arabic' | 'Party';
  time: string;
  amount: number;
};

const initialMembers: Member[] = [
  { id: 'm1', name: 'Priya (Bride)', service: 'Bridal Full', time: '10:00 AM', amount: 10000 },
  { id: 'm2', name: 'Seema (Sister-in-law)', service: 'Arabic', time: '12:30 PM', amount: 3500 },
  { id: 'm3', name: 'Mother', service: 'Party', time: '2:00 PM', amount: 2000 },
];

const services: Member['service'][] = ['Bridal Full', 'Arabic', 'Party'];

export default function GroupBookingPage() {
  const [groupName, setGroupName] = useState('Sharma Wedding — 15 June 2026');
  const [location, setLocation] = useState('Andheri West, Mumbai');
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const addMember = () => {
    setMembers(prev => [
      ...prev,
      {
        id: `m${Date.now()}`,
        name: `Member ${prev.length + 1}`,
        service: 'Party',
        time: '11:00 AM',
        amount: 1500,
      },
    ]);
  };

  const removeMember = (id: string) => setMembers(prev => prev.filter(m => m.id !== id));

  const updateMember = (id: string, patch: Partial<Member>) =>
    setMembers(prev => prev.map(m => (m.id === id ? { ...m, ...patch } : m)));

  const subtotal = useMemo(() => members.reduce((s, m) => s + (Number.isFinite(m.amount) ? m.amount : 0), 0), [members]);
  const commission = Math.round(subtotal * 0.1);
  const net = subtotal - commission;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Users size={22} /> Group Booking
        </h1>
        <p className="text-henna-400 text-sm">Manage multiple members in one booking — single invoice, auto pricing</p>
      </div>

      <div className="bg-cream-50 border border-cream-200 rounded-2xl p-4 text-sm text-henna-600">
        Built for weddings and parties. Add a row per member, set their service and price, and confirm in one go.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        {/* Builder */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">New Group Booking</h2>
            <button
              onClick={addMember}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-henna-700 text-cream-100 hover:bg-henna-800"
            >
              <Plus size={13} /> Add Member
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-henna-400 font-medium mb-1">Group / Event</label>
              <input
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-henna-400 font-medium mb-1">Location</label>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {members.map((m, i) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream-50 border border-cream-200 rounded-xl p-3"
              >
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-12 sm:col-span-1 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                  </div>
                  <input
                    value={m.name}
                    onChange={e => updateMember(m.id, { name: e.target.value })}
                    className="col-span-12 sm:col-span-4 text-sm px-3 py-2 rounded-lg border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
                  />
                  <select
                    value={m.service}
                    onChange={e => updateMember(m.id, { service: e.target.value as Member['service'] })}
                    className="col-span-6 sm:col-span-3 text-sm px-3 py-2 rounded-lg border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
                  >
                    {services.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <input
                    value={m.time}
                    onChange={e => updateMember(m.id, { time: e.target.value })}
                    className="col-span-3 sm:col-span-2 text-sm px-3 py-2 rounded-lg border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
                  />
                  <input
                    type="number"
                    value={m.amount}
                    onChange={e => updateMember(m.id, { amount: Number(e.target.value) })}
                    className="col-span-2 sm:col-span-1 text-sm px-3 py-2 rounded-lg border border-cream-300 bg-white tabular-nums focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
                  />
                  <button
                    onClick={() => removeMember(m.id)}
                    aria-label="Remove member"
                    className="col-span-1 w-8 h-8 mx-auto rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-henna-400">Columns: name · service · time · amount (₹)</p>
        </div>

        {/* Summary + tip */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-cream-200 p-5">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3">Group Summary</h2>
            <dl className="text-sm divide-y divide-cream-100">
              <div className="flex items-center justify-between py-2">
                <dt className="text-henna-500">Total Members</dt>
                <dd className="font-semibold text-henna-800">{members.length}</dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="text-henna-500">Subtotal</dt>
                <dd className="font-semibold text-henna-800 tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="text-henna-500">Commission (10%)</dt>
                <dd className="font-semibold text-red-600 tabular-nums">-{formatPrice(commission)}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="font-semibold text-henna-800">Net Payout</dt>
                <dd className="font-bold text-emerald-600 tabular-nums text-base">{formatPrice(net)}</dd>
              </div>
            </dl>
            <div className="mt-3 space-y-2">
              <button className="w-full inline-flex items-center justify-center gap-2 bg-henna-700 hover:bg-henna-800 text-cream-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                <CheckCircle2 size={14} /> Confirm Group Booking
              </button>
              <button className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-henna-800 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                <MessageSquare size={14} /> Send WhatsApp Group Link
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-cream-200 p-5">
            <p className="text-sm font-semibold text-henna-800 flex items-center gap-2">
              <Lightbulb size={14} className="text-gold-500" /> Group Booking Tip
            </p>
            <p className="text-xs text-henna-500 mt-1.5 leading-relaxed">
              Wedding-season group bookings average ₹15,000–25,000. Add a travel charge separately for groups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
