'use client';
import { useState } from 'react';
import Image from 'next/image';
import { GitCompare, Star, MapPin, CheckCircle, Clock, Users, Award } from 'lucide-react';
import { artists } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

export default function ComparePage() {
  const [a1, setA1] = useState(artists[0]);
  const [a2, setA2] = useState(artists[1]);

  const fields = [
    { label: 'Rating', get: (a: typeof artists[0]) => `${a.rating.toFixed(1)} ★` },
    { label: 'Price Range', get: (a: typeof artists[0]) => `${formatPrice(a.priceRange.min)} - ${formatPrice(a.priceRange.max)}` },
    { label: 'Experience', get: (a: typeof artists[0]) => `${a.experience} years` },
    { label: 'Team Size', get: (a: typeof artists[0]) => `${a.teamSize} members` },
    { label: 'Total Bookings', get: (a: typeof artists[0]) => a.totalBookings.toString() },
    { label: 'Response Time', get: (a: typeof artists[0]) => a.responseTime },
    { label: 'Repeat Clients', get: (a: typeof artists[0]) => `${a.repeatClientPercent}%` },
    { label: 'Design Styles', get: (a: typeof artists[0]) => a.designStyles.join(', ') },
    { label: 'Trial Available', get: (a: typeof artists[0]) => a.trialSessionEnabled ? `Yes (${formatPrice(a.trialPrice||0)})` : 'No' },
    { label: 'Emergency', get: (a: typeof artists[0]) => a.isEmergencyAvailable ? 'Available' : 'Not available' },
    { label: 'Verified', get: (a: typeof artists[0]) => a.isVerified ? '✅ Yes' : '❌ No' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><GitCompare size={24} /> Compare Artists</h1>
      <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
        {/* Headers */}
        <div className="grid grid-cols-3 border-b border-cream-200">
          <div className="p-4 bg-cream-50"><span className="text-sm font-medium text-henna-400">Feature</span></div>
          {[a1, a2].map((a, i) => (
            <div key={i} className="p-4 text-center border-l border-cream-200">
              <div className="w-14 h-14 rounded-xl overflow-hidden mx-auto mb-2"><Image src={a.profileImage} alt={a.name} width={56} height={56} className="object-cover" /></div>
              <p className="font-semibold text-henna-800 text-sm">{a.name}</p>
              <p className="text-xs text-henna-400">{a.city}</p>
              <select onChange={e => i === 0 ? setA1(artists.find(x=>x.id===e.target.value)||a1) : setA2(artists.find(x=>x.id===e.target.value)||a2)}
                value={a.id} className="mt-2 text-xs px-2 py-1 border border-cream-300 rounded-lg bg-white">
                {artists.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
              </select>
            </div>
          ))}
        </div>
        {/* Rows */}
        {fields.map((f, i) => (
          <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-cream-50/50' : 'bg-white'}`}>
            <div className="p-3 text-sm font-medium text-henna-600">{f.label}</div>
            <div className="p-3 text-sm text-henna-800 text-center border-l border-cream-100">{f.get(a1)}</div>
            <div className="p-3 text-sm text-henna-800 text-center border-l border-cream-100">{f.get(a2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
