'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Copy, FileText, Phone, Lightbulb } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

type GstType = 'exclusive' | 'inclusive';

const gstRates = [
  { value: 0, label: '0% (under ₹20L threshold — no GST)' },
  { value: 5, label: '5% (basic service)' },
  { value: 12, label: '12% (standard service)' },
  { value: 18, label: '18% (premium service)' },
];

function compute(amount: number, rate: number, type: GstType) {
  const safeAmount = Number.isFinite(amount) && amount >= 0 ? amount : 0;
  if (rate === 0) {
    return { base: safeAmount, cgst: 0, sgst: 0, total: 0, final: safeAmount };
  }
  if (type === 'exclusive') {
    const total = (safeAmount * rate) / 100;
    return { base: safeAmount, cgst: total / 2, sgst: total / 2, total, final: safeAmount + total };
  }
  // inclusive: amount already contains GST
  const base = (safeAmount * 100) / (100 + rate);
  const total = safeAmount - base;
  return { base, cgst: total / 2, sgst: total / 2, total, final: safeAmount };
}

const ytdEarnings = 542000;
const threshold = 2000000;
const ytdPercent = Math.min(100, Math.round((ytdEarnings / threshold) * 100));

const steps: { step: number; text: string }[] = [
  { step: 1, text: 'Visit gst.gov.in and click "New Registration".' },
  { step: 2, text: 'Keep PAN, Aadhaar, bank details and business address ready.' },
  { step: 3, text: 'Fill Form GST REG-01 and verify with OTP.' },
  { step: 4, text: 'GSTIN arrives in 7–10 days — add it to your MehndiWalaa profile.' },
];

export default function GSTCalculatorPage() {
  const [amount, setAmount] = useState<number>(10000);
  const [rate, setRate] = useState<number>(12);
  const [type, setType] = useState<GstType>('exclusive');

  const result = useMemo(() => compute(amount, rate, type), [amount, rate, type]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Calculator size={22} /> GST Calculator
        </h1>
        <p className="text-henna-400 text-sm">Calculate GST quickly and stay compliant beyond the ₹20L threshold</p>
      </div>

      <div className="bg-cream-50 border border-cream-200 rounded-2xl p-4 text-sm text-henna-600">
        Mehndi artists earning over <span className="font-semibold text-henna-800">₹20 lakh per year</span> must register for GST. Calculate accurately to keep records clean.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Calculator */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6 space-y-4">
          <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Calculator</h2>

          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold block mb-1">Service Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300 tabular-nums"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold block mb-1">GST Rate</label>
            <select
              value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
            >
              {gstRates.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold block mb-1">Amount Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['exclusive', 'inclusive'] as const).map(t => {
                const active = type === t;
                return (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`text-sm font-semibold px-3 py-2 rounded-xl border transition-colors ${
                      active ? 'bg-henna-700 text-cream-100 border-henna-700' : 'bg-white text-henna-700 border-cream-200 hover:bg-cream-50'
                    }`}
                  >
                    {t === 'exclusive' ? 'Exclusive (add GST)' : 'Inclusive (GST inside)'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-cream-50 border border-cream-200 rounded-2xl p-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-henna-500">Base Amount</span>
              <span className="font-semibold text-henna-800 tabular-nums">{formatPrice(Math.round(result.base))}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-henna-500">CGST ({rate / 2}%)</span>
              <span className="font-semibold text-henna-800 tabular-nums">{formatPrice(Math.round(result.cgst))}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-henna-500">SGST ({rate / 2}%)</span>
              <span className="font-semibold text-henna-800 tabular-nums">{formatPrice(Math.round(result.sgst))}</span>
            </div>
            <div className="flex items-center justify-between border-t border-cream-200 pt-2">
              <span className="text-henna-600">Total GST</span>
              <span className="font-semibold text-henna-800 tabular-nums">{formatPrice(Math.round(result.total))}</span>
            </div>
            <div className="flex items-center justify-between text-base">
              <span className="font-semibold text-henna-800">Charge Client</span>
              <span className="font-bold text-emerald-600 tabular-nums">{formatPrice(Math.round(result.final))}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
              <Copy size={14} /> Copy Breakdown
            </button>
            <button className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-henna-700 text-cream-100 hover:bg-henna-800">
              <FileText size={14} /> Generate GST Invoice
            </button>
          </div>
        </div>

        {/* Tracker + Guide */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-cream-200 p-5">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Annual Earnings Tracker</h2>
            <div className="text-center mt-4">
              <p className="text-[11px] uppercase tracking-wider text-henna-400 font-semibold">GST Threshold Progress</p>
              <p className="text-3xl font-bold font-[family-name:var(--font-heading)] text-emerald-600 mt-1 tabular-nums">{formatPrice(ytdEarnings)}</p>
              <p className="text-xs text-henna-400 mt-0.5">/ {formatPrice(threshold)} threshold (year to date)</p>
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-cream-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ytdPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
              />
            </div>
            <p className="text-xs text-henna-500 mt-2 text-center">{ytdPercent}% complete — currently in safe zone</p>

            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-700">
              <Lightbulb size={13} className="inline -mt-0.5 mr-1.5" />
              At an average of ₹2,000/day you would hit the threshold in about 8 months — start prepping your registration.
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-cream-200 p-5">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">GST Registration Guide</h2>
            <ol className="mt-3 space-y-2.5">
              {steps.map(s => (
                <li key={s.step} className="flex items-start gap-3 text-sm text-henna-700">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-xs flex items-center justify-center">{s.step}</span>
                  <span className="leading-relaxed">{s.text}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
              ⚠ Platform commission GST is handled separately — it gets deducted automatically on invoices.
            </div>
            <button className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-henna-700 text-cream-100 hover:bg-henna-800">
              <Phone size={14} /> Talk to a CA / Tax Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
