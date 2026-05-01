'use client';
import { Zap, TrendingUp, Eye, Calendar } from 'lucide-react';

export default function BoostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><Zap size={24} /> Boost Profile</h1>
      <div className="bg-gradient-to-r from-gold-50 to-cream-100 rounded-2xl border border-gold-200 p-6">
        <h2 className="text-xl font-bold text-henna-700 mb-2">Get 5x More Visibility! ✨</h2>
        <p className="text-sm text-henna-500 mb-4">Boost your profile to appear at the top of search results and get more leads.</p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/80 rounded-xl p-4 text-center"><Eye size={24} className="text-gold-600 mx-auto mb-2" /><p className="font-bold text-henna-800">5x Views</p><p className="text-xs text-henna-400">More profile visits</p></div>
          <div className="bg-white/80 rounded-xl p-4 text-center"><TrendingUp size={24} className="text-gold-600 mx-auto mb-2" /><p className="font-bold text-henna-800">3x Leads</p><p className="text-xs text-henna-400">More enquiries</p></div>
          <div className="bg-white/80 rounded-xl p-4 text-center"><Calendar size={24} className="text-gold-600 mx-auto mb-2" /><p className="font-bold text-henna-800">7 Days</p><p className="text-xs text-henna-400">Boost duration</p></div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-3 bg-gold-500 text-henna-900 rounded-xl font-bold hover:bg-gold-400">Boost for ₹500</button>
          <p className="text-xs text-henna-400">Charged from wallet balance</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h3 className="font-semibold text-henna-700 mb-3">Digital Presence Plans</h3>
        <div className="space-y-3">
          {[
            { name: 'Google My Business Setup', price: '₹2,999', desc: 'Complete GMB profile setup and optimization' },
            { name: 'Social Media Management', price: '₹4,999/mo', desc: 'Instagram & Facebook management with content creation' },
            { name: 'Personal Website', price: '₹9,999', desc: 'Custom website with portfolio and booking' },
          ].map(p => (
            <div key={p.name} className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
              <div><p className="font-semibold text-henna-800 text-sm">{p.name}</p><p className="text-xs text-henna-400">{p.desc}</p></div>
              <div className="text-right"><p className="font-bold text-henna-700">{p.price}</p><button className="text-xs text-gold-600 hover:underline">Learn More</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
