'use client';
import { CreditCard, Edit, Check } from 'lucide-react';

const plans = [
  { name: 'Free', price: '₹0', leads: 5, commission: '15%', features: ['5 free leads on signup', 'Basic profile', 'Standard listing'] },
  { name: 'Silver', price: '₹999/mo', leads: 10, commission: '10%', features: ['10 leads/month', 'Priority listing', 'Basic analytics', 'Email support'] },
  { name: 'Gold', price: '₹2,499/mo', leads: 30, commission: '5%', features: ['30 leads/month', 'Featured listing', 'Full analytics', 'WhatsApp support', '1 free boost/month'] },
  { name: 'Platinum', price: '₹4,999/mo', leads: -1, commission: '0%', features: ['Unlimited leads', 'Top listing', 'Dedicated manager', 'Free boosts', 'Festival priority', 'Custom storefront'] },
];

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><CreditCard size={24} /> Membership Plans</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map(p => (
          <div key={p.name} className="bg-white rounded-2xl border border-cream-200 p-5">
            <h3 className="text-lg font-bold text-henna-700">{p.name}</h3>
            <p className="text-2xl font-bold text-henna-800 mt-1">{p.price}</p>
            <p className="text-xs text-henna-400 mt-1">{p.leads === -1 ? 'Unlimited' : p.leads} leads · {p.commission} commission</p>
            <ul className="mt-4 space-y-1.5">
              {p.features.map(f => <li key={f} className="text-xs text-henna-600 flex items-center gap-1"><Check size={12} className="text-green-500" /> {f}</li>)}
            </ul>
            <button className="mt-4 w-full py-2 border border-cream-300 rounded-lg text-xs font-medium text-henna-600 hover:bg-cream-50 flex items-center justify-center gap-1"><Edit size={12} /> Edit Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
