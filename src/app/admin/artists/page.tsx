'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, XCircle, Eye, MapPin, Star, Clock } from 'lucide-react';
import { artists } from '@/data/mock';

const pendingArtists = artists.filter(a => !a.isVerified).concat([
  { ...artists[0], id: 'pending1', name: 'New Artist 1', isVerified: false, profileCompletion: 70 },
  { ...artists[1], id: 'pending2', name: 'New Artist 2', isVerified: false, profileCompletion: 85 },
] as any);

export default function ArtistApprovalsPage() {
  const [list, setList] = useState(pendingArtists);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Artist Approvals</h1>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">{list.length} pending</span>
      </div>
      <div className="space-y-4">
        {list.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-cream-200 p-5">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={a.profileImage} alt={a.name} width={64} height={64} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-henna-800 text-lg">{a.name}</h3>
                <p className="text-sm text-henna-400 flex items-center gap-1"><MapPin size={12} /> {a.locality}, {a.city}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-henna-400">
                  <span><Star size={10} className="inline text-gold-500" /> {a.experience} yrs exp</span>
                  <span>Team: {a.teamSize}</span>
                  <span>Portfolio: {a.portfolio.length} images</span>
                  <span>Profile: {a.profileCompletion}%</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {a.designStyles.slice(0, 4).map(s => <span key={s} className="px-2 py-0.5 bg-cream-100 text-henna-600 text-[10px] rounded-full">{s}</span>)}
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
                <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Eye size={18} /></button>
                <button onClick={() => setList(list.filter(x => x.id !== a.id))} className="flex-1 sm:flex-initial px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 flex items-center justify-center gap-1"><CheckCircle size={14} /> Approve</button>
                <button onClick={() => setList(list.filter(x => x.id !== a.id))} className="flex-1 sm:flex-initial px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 flex items-center justify-center gap-1"><XCircle size={14} /> Reject</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
