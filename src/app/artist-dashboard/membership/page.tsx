'use client';
import { Crown, Check, Zap } from 'lucide-react';

const plans = [
  { name: 'Silver', price: '₹999/mo', features: ['10 leads/month', '5% commission', 'Basic analytics', 'Email support'], color: 'border-cream-300', current: false },
  { name: 'Gold', price: '₹2,499/mo', features: ['30 leads/month', '3% commission', 'Priority listing', 'WhatsApp support', 'Profile boost (1 free/month)'], color: 'border-gold-500', current: true },
  { name: 'Platinum', price: '₹4,999/mo', features: ['Unlimited leads', '0% commission', 'Top listing', 'Dedicated manager', 'Free profile boost', 'Festival priority alerts'], color: 'border-henna-700', current: false },
];

export default function MembershipPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><Crown size={24} /> Membership Plans</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {plans.map(p => (
          <div key={p.name} className={`bg-white rounded-2xl border-2 p-6 ${p.color} ${p.current ? 'ring-2 ring-gold-500 relative' : ''}`}>
            {p.current && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gold-500 text-white text-xs font-bold rounded-full">Current Plan</span>}
            <h3 className="text-xl font-bold text-henna-700 font-[family-name:var(--font-heading)]">{p.name}</h3>
            <p className="text-2xl font-bold text-henna-800 mt-2">{p.price}</p>
            <ul className="mt-4 space-y-2">
              {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-henna-600"><Check size={14} className="text-green-500" /> {f}</li>)}
            </ul>
            <button className={`mt-6 w-full py-2.5 rounded-xl font-semibold text-sm ${p.current ? 'bg-cream-100 text-henna-600' : 'bg-henna-700 text-cream-100 hover:bg-henna-600'}`}>
              {p.current ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
