'use client';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, CreditCard, AlertCircle, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { artists } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

const artist = artists[0];

const transactions = [
  { id: 't1', type: 'debit' as const, amount: 50, description: 'Lead unlock — Neha Mehra', timestamp: '2026-04-30T09:00:00Z', balance: 2450 },
  { id: 't2', type: 'credit' as const, amount: 1000, description: 'Wallet recharge', timestamp: '2026-04-29T14:00:00Z', balance: 2500 },
  { id: 't3', type: 'debit' as const, amount: 50, description: 'Lead unlock — Roshni Kapoor', timestamp: '2026-04-29T10:00:00Z', balance: 1500 },
  { id: 't4', type: 'credit' as const, amount: 500, description: 'Fake lead refund', timestamp: '2026-04-28T16:00:00Z', balance: 1550 },
  { id: 't5', type: 'debit' as const, amount: 500, description: 'Profile boost — 7 days', timestamp: '2026-04-27T09:00:00Z', balance: 1050 },
];

const commissionRows = [
  { invoice: 'INV-001', client: 'Priya Sharma', advance: 2000, commission: 200, net: 1800 },
  { invoice: 'INV-002', client: 'Anita Desai', advance: 1500, commission: 150, net: 1350 },
  { invoice: 'INV-003', client: 'Rekha Gupta', advance: 2500, commission: 250, net: 2250 },
];

const rechargePacks = [
  { name: 'Trial', price: 500, bonus: 'No bonus', leads: '~5 leads' },
  { name: 'Standard', price: 1000, bonus: '+₹100 bonus', leads: '~12 leads', recommended: true },
  { name: 'Festival', price: 2000, bonus: '+₹300 bonus', leads: '~25 leads' },
  { name: 'Pro', price: 5000, bonus: '+₹1,000 bonus', leads: '~60 leads' },
];

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Wallet size={22} /> Earnings & Wallet
        </h1>
        <p className="text-henna-400 text-sm">Track payouts, commission and recharge your PPL wallet</p>
      </div>

      {/* Big earnings cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-henna-700 text-cream-100 p-6"
        >
          <span className="pointer-events-none absolute -right-12 -top-12 w-44 h-44 rounded-full bg-cream-100/5" aria-hidden />
          <p className="text-[11px] uppercase tracking-wider text-cream-200/80">Total Earnings · This Month</p>
          <p className="mt-1 text-4xl font-bold font-[family-name:var(--font-heading)] !text-cream-100 tabular-nums">{formatPrice(45200)}</p>
          <p className="text-xs text-cream-200/80 mt-1">Based on final invoices</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl bg-white border border-cream-200 p-6"
        >
          <p className="text-[11px] uppercase tracking-wider text-henna-400 font-semibold">Net Payout · After Commission</p>
          <p className="mt-1 text-4xl font-bold font-[family-name:var(--font-heading)] text-emerald-600 tabular-nums">{formatPrice(40680)}</p>
          <p className="text-xs text-henna-500 mt-1">10% Growth plan commission deducted</p>
        </motion.div>
      </div>

      {/* Transparency banner */}
      <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-800 flex items-start gap-3">
        <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold">Transparency promise.</span> Every commission is itemised, no hidden charges. Commission only applies to platform-collected advances.
        </p>
      </div>

      {/* Wallet + summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 border border-gold-100 flex items-center justify-center"><Wallet size={18} /></div>
            <span className="text-sm text-henna-500">Wallet Balance</span>
          </div>
          <p className="text-3xl font-bold text-henna-800 tabular-nums">{formatPrice(artist.walletBalance)}</p>
          {artist.walletBalance < 500 && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-2">
              <AlertCircle size={12} /> Low balance — recharge soon.
            </p>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center"><TrendingUp size={18} /></div>
            <span className="text-sm text-henna-500">Lifetime Earnings</span>
          </div>
          <p className="text-3xl font-bold text-henna-800 tabular-nums">{formatPrice(artist.totalEarnings)}</p>
          <p className="text-xs text-henna-400 mt-1">All-time</p>
        </div>
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center"><CreditCard size={18} /></div>
            <span className="text-sm text-henna-500">Commission Rate</span>
          </div>
          <p className="text-3xl font-bold text-henna-800 tabular-nums">10%</p>
          <p className="text-xs text-henna-400 mt-1">{artist.membershipPlan} plan</p>
        </div>
      </div>

      {/* Commission Breakdown */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Commission Breakdown</h2>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
            <Download size={13} /> Export
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-henna-400 border-b border-cream-200">
                <th className="text-left py-2 pr-4 font-medium">Invoice</th>
                <th className="text-left py-2 pr-4 font-medium">Client</th>
                <th className="text-right py-2 pr-4 font-medium">Advance</th>
                <th className="text-right py-2 pr-4 font-medium">Commission</th>
                <th className="text-right py-2 pr-4 font-medium">Net to Artist</th>
                <th className="text-right py-2 pl-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {commissionRows.map(r => (
                <tr key={r.invoice} className="border-b border-cream-100 last:border-0">
                  <td className="py-3 pr-4 font-semibold text-henna-700">#{r.invoice}</td>
                  <td className="py-3 pr-4 text-henna-700">{r.client}</td>
                  <td className="py-3 pr-4 text-right tabular-nums">{formatPrice(r.advance)}</td>
                  <td className="py-3 pr-4 text-right text-rose-600 tabular-nums">- {formatPrice(r.commission)} (10%)</td>
                  <td className="py-3 pr-4 text-right font-semibold text-emerald-600 tabular-nums">{formatPrice(r.net)}</td>
                  <td className="py-3 pl-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Paid</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="sm:hidden space-y-3">
          {commissionRows.map(r => (
            <div key={r.invoice} className="rounded-xl border border-cream-200 bg-cream-50/40 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-henna-800">#{r.invoice} · {r.client}</span>
                <span className="text-[11px] font-semibold text-emerald-700">Paid</span>
              </div>
              <div className="mt-2 grid grid-cols-3 text-xs">
                <div><p className="text-henna-400">Advance</p><p className="font-semibold tabular-nums">{formatPrice(r.advance)}</p></div>
                <div><p className="text-henna-400">Commission</p><p className="font-semibold text-rose-600 tabular-nums">- {formatPrice(r.commission)}</p></div>
                <div><p className="text-henna-400">Net</p><p className="font-semibold text-emerald-600 tabular-nums">{formatPrice(r.net)}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet recharge */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-1">Recharge Wallet</h2>
        <p className="text-xs text-henna-400 mb-4">Used for unlocking PPL leads and activating boosts</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {rechargePacks.map((p, i) => (
            <motion.button
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`relative rounded-2xl border p-4 text-center transition-colors ${
                p.recommended
                  ? 'border-gold-200 bg-gold-50 hover:bg-gold-100'
                  : 'border-cream-200 bg-cream-50/40 hover:bg-cream-50'
              }`}
            >
              {p.recommended && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gold-500 text-henna-800 text-[10px] font-bold">
                  Best value
                </span>
              )}
              <p className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-800 tabular-nums">{formatPrice(p.price)}</p>
              <p className="text-sm font-semibold text-henna-700 mt-1">{p.name}</p>
              <p className="text-[11px] text-henna-400">{p.bonus}</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">{p.leads}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Transaction History</h2>
        <div className="space-y-2">
          {transactions.map(t => (
            <div key={t.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream-50">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                {t.type === 'credit' ? <ArrowDownRight size={16} className="text-emerald-600" /> : <ArrowUpRight size={16} className="text-rose-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-henna-800 truncate">{t.description}</p>
                <p className="text-xs text-henna-400">{new Date(t.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold tabular-nums ${t.type === 'credit' ? 'text-emerald-600' : 'text-rose-500'}`}>{t.type === 'credit' ? '+' : '-'}{formatPrice(t.amount)}</p>
                <p className="text-[10px] text-henna-400">Bal: {formatPrice(t.balance)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
