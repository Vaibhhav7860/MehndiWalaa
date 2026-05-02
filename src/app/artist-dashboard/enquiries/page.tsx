'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Inbox, Phone, Zap, Clock, CheckCircle, Eye } from 'lucide-react';
import { mockLeads } from '@/data/mock';
import { formatDate } from '@/lib/utils';

export default function EnquiriesPage() {
  const [filter, setFilter] = useState('all');
  const leads = filter === 'all' ? mockLeads : mockLeads.filter(l => l.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Enquiries & Leads</h1>
      <div className="flex gap-2 overflow-x-auto">
        {['all','new','unlocked','contacted','converted'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap ${filter === f ? 'bg-henna-700 text-cream-100' : 'bg-white text-henna-600 border border-cream-300'}`}>{f}</button>
        ))}
      </div>
      <div className="space-y-3">
        {leads.map((l, i) => (
          <motion.div key={l.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`bg-white rounded-2xl border p-5 ${l.isUrgent ? 'border-red-200' : 'border-cream-200'}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${l.isUrgent ? 'bg-red-100 text-red-700' : 'bg-gold-100 text-gold-700'}`}>{l.userName[0]}</div>
                <div>
                  <p className="font-semibold text-henna-800 flex items-center gap-2">{l.userName} {l.isUrgent && <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">URGENT</span>}</p>
                  <p className="text-xs text-henna-400">{l.occasion} · {l.city} · {formatDate(l.createdAt)}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${l.status === 'new' ? 'bg-blue-100 text-blue-700' : l.status === 'unlocked' ? 'bg-green-100 text-green-700' : 'bg-cream-100 text-henna-600'}`}>{l.status}</span>
            </div>
            <p className="text-sm text-henna-600 mb-2">{l.message}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-henna-400 mb-3">
              <span>Budget: <strong className="text-henna-700">{l.budget}</strong></span>
              <span>Event: <strong className="text-henna-700">{formatDate(l.eventDate)}</strong></span>
            </div>
            <div className="flex flex-wrap gap-2">
              {l.status === 'new' ? (
                <button className="px-5 py-2 bg-henna-700 text-cream-100 rounded-xl text-sm font-semibold hover:bg-henna-600 flex items-center gap-1"><Eye size={14} /> Unlock Lead (₹50)</button>
              ) : (
                <>
                  <button className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-medium flex items-center gap-1"><Phone size={14} /> {l.status === 'unlocked' ? l.userPhone : 'Call'}</button>
                  <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium">Mark Contacted</button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
