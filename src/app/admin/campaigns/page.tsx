'use client';
import { Megaphone, Plus, Calendar, Bell } from 'lucide-react';
import { FESTIVALS } from '@/lib/constants';

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><Megaphone size={24} /> Festival Campaigns</h1>
        <button className="px-4 py-2 bg-henna-700 text-cream-100 rounded-full text-sm font-semibold flex items-center gap-1"><Plus size={14} /> New Campaign</button>
      </div>
      <p className="text-sm text-henna-400">Configure proactive demand alerts 15 days before festivals. Artists receive WhatsApp + push notifications.</p>
      <div className="space-y-3">
        {FESTIVALS.map(f => (
          <div key={f.name} className="bg-white rounded-2xl border border-cream-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center text-2xl">🎉</div>
              <div>
                <p className="font-semibold text-henna-800">{f.name}</p>
                <p className="text-sm text-henna-400 flex items-center gap-1"><Calendar size={12} /> {f.date} · {f.daysUntil} days away</p>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${f.daysUntil <= 15 ? 'bg-green-100 text-green-700' : 'bg-cream-100 text-henna-400'}`}>
                {f.daysUntil <= 15 ? '🔔 Active' : 'Scheduled'}
              </span>
              <button className="text-sm text-gold-600 hover:underline">Configure</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
