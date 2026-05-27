'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, Lock, Clock } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

type EscrowStatus = 'locked' | 'pending';
type TxnType = 'credit' | 'debit' | 'refund';

const escrowHolds: { id: string; title: string; amount: number; status: EscrowStatus }[] = [
  { id: 'es1', title: 'Bridal Mehndi — Ananya Verma', amount: 5000, status: 'locked' },
  { id: 'es2', title: 'Karva Chauth — Rhea Kapoor', amount: 2500, status: 'pending' },
];

const transactions: { id: string; date: string; type: TxnType; description: string; amount: number }[] = [
  { id: 't1', date: '2026-05-20', type: 'debit', description: 'Escrow hold — Bridal booking', amount: -5000 },
  { id: 't2', date: '2026-05-18', type: 'credit', description: 'Wallet top-up via UPI', amount: 10000 },
  { id: 't3', date: '2026-04-15', type: 'credit', description: 'Refund — Cancelled trial', amount: 1500 },
  { id: 't4', date: '2026-04-10', type: 'debit', description: 'Advance payment — Rhea Kapoor', amount: -3000 },
  { id: 't5', date: '2026-03-02', type: 'refund', description: 'Partial refund — Rescheduled', amount: 2000 },
];

const escrowStatusConfig: Record<EscrowStatus, { label: string; bg: string; color: string; icon: typeof Lock }> = {
  locked: { label: 'Locked', bg: 'bg-amber-100', color: 'text-amber-700', icon: Lock },
  pending: { label: 'Pending', bg: 'bg-blue-100', color: 'text-blue-700', icon: Clock },
};

const typeConfig: Record<TxnType, { label: string; bg: string; color: string }> = {
  credit: { label: 'Credit', bg: 'bg-green-100', color: 'text-green-700' },
  debit: { label: 'Debit', bg: 'bg-red-100', color: 'text-red-600' },
  refund: { label: 'Refund', bg: 'bg-yellow-100', color: 'text-yellow-700' },
};

const filters: { key: 'all' | TxnType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'credit', label: 'Credits' },
  { key: 'debit', label: 'Debits' },
  { key: 'refund', label: 'Refunds' },
];

export default function WalletPage() {
  const [filter, setFilter] = useState<'all' | TxnType>('all');
  const walletBalance = 8450;

  const filteredTxns = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  const formatSigned = (amount: number) => {
    const sign = amount > 0 ? '+' : amount < 0 ? '-' : '';
    return `${sign}${formatPrice(Math.abs(amount))}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Wallet &amp; Escrow</h1>
        <p className="text-henna-400 text-sm">Manage balance and secure payments</p>
      </div>

      {/* Wallet Balance card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-henna-700 text-cream-100 p-6 sm:p-8"
      >
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-cream-100/5" />
        <div className="absolute -right-20 bottom-0 w-64 h-64 rounded-full bg-cream-100/5" />
        <div className="relative">
          <div className="flex items-center gap-2 text-cream-200/80 text-sm mb-2">
            <Wallet size={16} /> Wallet Balance
          </div>
          <p className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-5">
            {formatPrice(walletBalance)}
          </p>
          <button className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-henna-800 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors">
            <Plus size={16} /> Add Money
          </button>
        </div>
      </motion.div>

      {/* Escrow Holds */}
      <div>
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3">Escrow Holds</h2>
        <div className="space-y-3">
          {escrowHolds.map((e, i) => {
            const cfg = escrowStatusConfig[e.status];
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 bg-white rounded-2xl border border-cream-200 p-4"
              >
                <div className={`w-10 h-10 rounded-xl ${cfg.bg} ${cfg.color} flex items-center justify-center flex-shrink-0`}>
                  <cfg.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-henna-800 text-sm truncate">{e.title}</p>
                  <p className="text-xs text-henna-400">{formatPrice(e.amount)} held in escrow</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}>
                  {cfg.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Transaction History</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                filter === f.key
                  ? 'bg-henna-700 text-cream-100 border-henna-700'
                  : 'bg-white text-henna-600 border-cream-200 hover:bg-cream-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-henna-400 border-b border-cream-200">
                <th className="text-left font-medium py-2 pr-4">Date</th>
                <th className="text-left font-medium py-2 pr-4">Type</th>
                <th className="text-left font-medium py-2 pr-4">Description</th>
                <th className="text-right font-medium py-2 pl-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map(t => {
                const tcfg = typeConfig[t.type];
                const positive = t.amount > 0;
                return (
                  <tr key={t.id} className="border-b border-cream-100 last:border-0">
                    <td className="py-3 pr-4 text-henna-700">{formatDate(t.date)}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tcfg.bg} ${tcfg.color}`}>
                        {tcfg.label}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-henna-800">{t.description}</td>
                    <td className={`py-3 pl-4 text-right font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
                      {formatSigned(t.amount)}
                    </td>
                  </tr>
                );
              })}
              {filteredTxns.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm text-henna-400">No transactions to show.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="sm:hidden space-y-3">
          {filteredTxns.map(t => {
            const tcfg = typeConfig[t.type];
            const positive = t.amount > 0;
            return (
              <div key={t.id} className="flex items-start justify-between gap-3 p-3 bg-cream-50 rounded-xl">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tcfg.bg} ${tcfg.color}`}>
                      {tcfg.label}
                    </span>
                    <span className="text-[11px] text-henna-400">{formatDate(t.date)}</span>
                  </div>
                  <p className="text-sm text-henna-800 truncate">{t.description}</p>
                </div>
                <p className={`text-sm font-semibold whitespace-nowrap ${positive ? 'text-green-600' : 'text-red-600'}`}>
                  {formatSigned(t.amount)}
                </p>
              </div>
            );
          })}
          {filteredTxns.length === 0 && (
            <p className="py-6 text-center text-sm text-henna-400">No transactions to show.</p>
          )}
        </div>
      </div>
    </div>
  );
}
