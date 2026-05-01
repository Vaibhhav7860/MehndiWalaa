'use client';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, CreditCard, AlertCircle } from 'lucide-react';
import { artists } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

const artist = artists[0];
const transactions = [
  { id: 't1', type: 'debit' as const, amount: 50, description: 'Lead Unlock — Neha Mehra', timestamp: '2026-04-30T09:00:00Z', balance: 2450 },
  { id: 't2', type: 'credit' as const, amount: 1000, description: 'Wallet Recharge', timestamp: '2026-04-29T14:00:00Z', balance: 2500 },
  { id: 't3', type: 'debit' as const, amount: 50, description: 'Lead Unlock — Roshni Kapoor', timestamp: '2026-04-29T10:00:00Z', balance: 1500 },
  { id: 't4', type: 'credit' as const, amount: 500, description: 'Fake Lead Refund', timestamp: '2026-04-28T16:00:00Z', balance: 1550 },
  { id: 't5', type: 'debit' as const, amount: 500, description: 'Profile Boost — 7 Days', timestamp: '2026-04-27T09:00:00Z', balance: 1050 },
];

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Earnings & Wallet</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center"><Wallet size={20} className="text-gold-600" /></div><span className="text-sm text-henna-400">Wallet Balance</span></div>
          <p className="text-3xl font-bold text-henna-800">{formatPrice(artist.walletBalance)}</p>
          {artist.walletBalance < 250 && <p className="text-xs text-red-500 flex items-center gap-1 mt-2"><AlertCircle size={12} /> Low balance! Recharge now.</p>}
          <button className="mt-3 w-full py-2.5 bg-gold-500 text-henna-900 rounded-xl font-semibold text-sm hover:bg-gold-400">Recharge Wallet</button>
        </div>
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"><TrendingUp size={20} className="text-green-600" /></div><span className="text-sm text-henna-400">Total Earnings</span></div>
          <p className="text-3xl font-bold text-henna-800">{formatPrice(artist.totalEarnings)}</p>
          <p className="text-xs text-henna-400 mt-1">Lifetime earnings</p>
        </div>
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><CreditCard size={20} className="text-purple-600" /></div><span className="text-sm text-henna-400">Commission Rate</span></div>
          <p className="text-3xl font-bold text-henna-800">10%</p>
          <p className="text-xs text-henna-400 mt-1">{artist.membershipPlan} plan rate</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Transaction History</h2>
        <div className="space-y-2">
          {transactions.map(t => (
            <div key={t.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream-50">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                {t.type === 'credit' ? <ArrowDownRight size={16} className="text-green-600" /> : <ArrowUpRight size={16} className="text-red-500" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-henna-800">{t.description}</p>
                <p className="text-xs text-henna-400">{new Date(t.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${t.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>{t.type === 'credit' ? '+' : '-'}{formatPrice(t.amount)}</p>
                <p className="text-xs text-henna-400">Bal: {formatPrice(t.balance)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
