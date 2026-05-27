'use client';
import { motion } from 'framer-motion';
import { Crown, Check, X, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

type Plan = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  features: { text: string; included: boolean }[];
  commission: string;
  current?: boolean;
  popular?: boolean;
  cta: string;
  accent: 'cream' | 'gold' | 'henna';
};

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    emoji: '🆓',
    price: 0,
    features: [
      { text: '5 leads (first month only)', included: true },
      { text: 'Contact hidden', included: false },
      { text: 'No badge', included: false },
      { text: '5 photos', included: true },
      { text: 'Invoice tools', included: false },
    ],
    commission: '15% commission',
    cta: 'Current — Free',
    accent: 'cream',
  },
  {
    id: 'starter',
    name: 'Starter',
    emoji: '🥉',
    price: 499,
    features: [
      { text: '20 leads / month', included: true },
      { text: 'Contact visible', included: true },
      { text: 'Verified badge', included: true },
      { text: '20 photos', included: true },
      { text: 'Invoice tools', included: true },
    ],
    commission: '12% commission',
    cta: 'Choose Starter',
    accent: 'cream',
  },
  {
    id: 'growth',
    name: 'Growth',
    emoji: '🌟',
    price: 999,
    features: [
      { text: '20 leads + 1 free Boost', included: true },
      { text: 'Contact visible', included: true },
      { text: 'Verified badge', included: true },
      { text: '50 photos + 20 videos', included: true },
      { text: 'Negotiation Shield', included: true },
    ],
    commission: '10% commission',
    current: true,
    popular: true,
    cta: 'Your Plan',
    accent: 'gold',
  },
  {
    id: 'pro',
    name: 'Pro Elite',
    emoji: '👑',
    price: 1999,
    features: [
      { text: 'Unlimited leads', included: true },
      { text: 'Top 3 guaranteed', included: true },
      { text: 'Recommended badge', included: true },
      { text: 'Unlimited photos + videos', included: true },
      { text: 'Dedicated manager', included: true },
    ],
    commission: '5% commission only',
    cta: 'Upgrade to Pro Elite',
    accent: 'henna',
  },
];

const accentRing: Record<Plan['accent'], string> = {
  cream: 'border-cream-200',
  gold: 'border-gold-300 ring-2 ring-gold-300/40',
  henna: 'border-henna-200',
};

export default function MembershipPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Crown size={22} /> Membership Plans
        </h1>
        <p className="text-henna-400 text-sm">Pick the plan that fits your booking volume — upgrade anytime</p>
      </div>

      {/* Active plan banner */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-sm text-emerald-800 flex items-start gap-3">
        <Sparkles size={18} className="text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold">Growth Plan is active.</span> Just one bridal booking returns ₹9,001+ net profit — your subscription costs only ₹999.
        </p>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`relative bg-white rounded-2xl border-2 p-6 ${accentRing[p.accent]} ${p.popular ? 'shadow-sm' : ''}`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gold-500 text-henna-800 text-[11px] font-bold rounded-full">
                ⭐ Most Popular
              </span>
            )}
            <p className="text-2xl" aria-hidden>{p.emoji}</p>
            <h3 className="mt-1 font-bold text-lg font-[family-name:var(--font-heading)] text-henna-700">{p.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold font-[family-name:var(--font-heading)] text-henna-800 tabular-nums">{formatPrice(p.price)}</span>
              <span className="text-xs text-henna-400">/month</span>
            </div>

            <ul className="mt-5 space-y-2.5 text-sm">
              {p.features.map((f) => (
                <li key={f.text} className={`flex items-start gap-2 ${f.included ? 'text-henna-700' : 'text-henna-400 line-through'}`}>
                  {f.included ? (
                    <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  ) : (
                    <X size={14} className="text-henna-300 mt-0.5 shrink-0" />
                  )}
                  {f.text}
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm font-semibold text-henna-800 pt-2 border-t border-cream-100 mt-3">
                💸 {p.commission}
              </li>
            </ul>

            <button
              className={`mt-6 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                p.current
                  ? 'bg-gold-100 text-gold-700 border border-gold-200 cursor-default'
                  : p.accent === 'henna'
                    ? 'bg-henna-700 hover:bg-henna-800 text-cream-100'
                    : 'bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50'
              }`}
            >
              {p.cta}
            </button>
          </motion.div>
        ))}
      </div>

      {/* ROI Calculator */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4 flex items-center gap-2">
          <Sparkles size={16} className="text-gold-600" /> ROI Calculator — Growth Plan
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Plan Cost', value: '₹999', tone: 'text-rose-600' },
            { label: '1 Bridal Booking', value: '₹10,000', tone: 'text-emerald-600' },
            { label: 'Net Profit', value: '₹9,001', tone: 'text-emerald-600', highlight: true },
            { label: 'Return', value: '9×', tone: 'text-gold-700', highlight: 'gold' as const },
          ].map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-4 text-center ${
                s.highlight === 'gold'
                  ? 'bg-gold-50 border-gold-100'
                  : s.highlight
                    ? 'bg-emerald-50 border-emerald-100'
                    : 'bg-cream-50 border-cream-200'
              }`}
            >
              <p className="text-[11px] uppercase tracking-wider text-henna-400 font-semibold">{s.label}</p>
              <p className={`text-2xl font-bold font-[family-name:var(--font-heading)] mt-1 ${s.tone} tabular-nums`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
