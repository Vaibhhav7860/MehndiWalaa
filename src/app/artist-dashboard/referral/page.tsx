'use client';
import { Gift, Copy, Share2 } from 'lucide-react';

export default function ReferralPage() {
  const referralLink = 'https://mehndiwala.com/ref/PRIYA2026';
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><Gift size={24} /> Referral Program</h1>
      <div className="bg-gradient-to-r from-gold-50 to-cream-100 rounded-2xl border border-gold-200 p-6">
        <h2 className="text-xl font-bold text-henna-700 mb-2">Earn ₹500 per referral! 🎉</h2>
        <p className="text-sm text-henna-500 mb-4">Refer fellow mehndi artists to MehndiWalaa and earn wallet credits when they complete their first booking.</p>
        <div className="flex gap-2">
          <input value={referralLink} readOnly className="flex-1 px-4 py-2.5 bg-white rounded-xl text-sm border border-cream-300" />
          <button className="px-4 py-2.5 bg-henna-700 text-cream-100 rounded-xl text-sm font-medium flex items-center gap-1"><Copy size={14} /> Copy</button>
          <button className="px-4 py-2.5 bg-green-500 text-white rounded-xl text-sm font-medium flex items-center gap-1"><Share2 size={14} /> Share</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h3 className="font-semibold text-henna-700 mb-3">Referral Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-cream-50 rounded-xl"><p className="text-2xl font-bold text-henna-800">5</p><p className="text-xs text-henna-400">Referred</p></div>
          <div className="text-center p-4 bg-cream-50 rounded-xl"><p className="text-2xl font-bold text-green-600">3</p><p className="text-xs text-henna-400">Joined</p></div>
          <div className="text-center p-4 bg-cream-50 rounded-xl"><p className="text-2xl font-bold text-gold-600">₹1,500</p><p className="text-xs text-henna-400">Earned</p></div>
        </div>
      </div>
    </div>
  );
}
