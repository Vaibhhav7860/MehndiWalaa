'use client';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const fakeLeads = [
  { id: 'fl1', userName: 'Unknown Caller', reason: 'Duplicate Lead', reportedAt: '2026-04-29T10:00:00Z', status: 'pending' as const },
  { id: 'fl2', userName: 'Spam Number', reason: 'Out of Service Area', reportedAt: '2026-04-28T14:00:00Z', status: 'refunded' as const },
  { id: 'fl3', userName: 'Test User', reason: 'Not a genuine enquiry', reportedAt: '2026-04-25T09:00:00Z', status: 'dismissed' as const },
];

export default function FakeLeadsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><AlertTriangle size={24} /> Fake Lead Reports</h1>
      <p className="text-sm text-henna-400">Report fake or spam leads here. Our team reviews within 48 hours. Confirmed fake leads are refunded to your wallet.</p>
      <button className="px-5 py-2.5 bg-henna-700 text-cream-100 rounded-xl text-sm font-semibold hover:bg-henna-600">Report New Fake Lead</button>
      <div className="space-y-3">
        {fakeLeads.map(l => (
          <div key={l.id} className="bg-white rounded-2xl border border-cream-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-henna-800">{l.userName}</p>
              <p className="text-sm text-henna-400">Reason: {l.reason} · {formatDate(l.reportedAt)}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
              l.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              l.status === 'refunded' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {l.status === 'pending' ? <Clock size={12} /> : l.status === 'refunded' ? <CheckCircle size={12} /> : <XCircle size={12} />}
              {l.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
