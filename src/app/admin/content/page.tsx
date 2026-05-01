'use client';
import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle, XCircle, CheckCheck, Filter } from 'lucide-react';
import { mockContentModeration } from '@/data/mock';

export default function ContentModerationPage() {
  const [items, setItems] = useState(mockContentModeration);
  const pending = items.filter(i => i.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Content Moderation</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold flex items-center gap-1"><CheckCheck size={14} /> Approve All ({pending.length})</button>
          <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold flex items-center gap-1"><XCircle size={14} /> Reject All</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
            <div className="relative h-48"><Image src={item.url} alt={item.category} fill className="object-cover" />
              <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                item.status === 'pending' ? 'bg-yellow-500 text-white' : item.status === 'approved' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>{item.status}</span>
            </div>
            <div className="p-4">
              <p className="font-semibold text-henna-800 text-sm">{item.artistName}</p>
              <p className="text-xs text-henna-400">{item.category} · {new Date(item.submittedAt).toLocaleDateString()}</p>
              {item.status === 'pending' && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => setItems(items.map(i => i.id === item.id ? {...i, status: 'approved'} : i))}
                    className="flex-1 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"><CheckCircle size={12} /> Approve</button>
                  <button onClick={() => setItems(items.map(i => i.id === item.id ? {...i, status: 'rejected'} : i))}
                    className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"><XCircle size={12} /> Reject</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
