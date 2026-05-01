'use client';
import { AlertTriangle, CheckCircle, XCircle, Clock, Wallet } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const reports = [
  { id: 'fr1', artist: 'Priya Sharma', reporter: 'Unknown', reason: 'Duplicate Lead', reportedAt: '2026-04-30', status: 'pending' as const },
  { id: 'fr2', artist: 'Fatima Khan', reporter: 'Spam Number', reason: 'Out of Service Area', reportedAt: '2026-04-29', status: 'pending' as const },
  { id: 'fr3', artist: 'Ananya Joshi', reporter: 'Test User', reason: 'Not genuine', reportedAt: '2026-04-28', status: 'refunded' as const },
  { id: 'fr4', artist: 'Meera Patel', reporter: 'Bot Account', reason: 'Duplicate Lead', reportedAt: '2026-04-27', status: 'dismissed' as const },
];

export default function AdminLeadsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><AlertTriangle size={24} /> Fake Lead Reports</h1>
      <p className="text-sm text-henna-400">Review fake lead reports within 48 hours. Confirmed fakes are refunded to artist wallet.</p>
      <div className="space-y-3">
        {reports.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-cream-200 p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-henna-800">Report by {r.artist}</p>
              <p className="text-sm text-henna-400">Reporter: {r.reporter} · Reason: {r.reason} · {r.reportedAt}</p>
            </div>
            <div className="flex gap-2">
              {r.status === 'pending' ? (
                <>
                  <button className="px-3 py-1.5 bg-cream-100 text-henna-600 rounded-lg text-xs font-medium">Dismiss</button>
                  <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium">Warn User</button>
                  <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium flex items-center gap-1"><Wallet size={12} /> Refund</button>
                </>
              ) : (
                <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${r.status === 'refunded' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{r.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
