'use client';
import { Award, CheckCircle, XCircle, Shield } from 'lucide-react';
import { artists } from '@/data/mock';

export default function BadgesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><Award size={24} /> Badge Management</h1>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-2xl p-5 border border-green-200 text-center">
          <CheckCircle size={28} className="text-green-600 mx-auto mb-2" />
          <p className="font-bold text-green-800">Verified Badge</p>
          <p className="text-xs text-green-600 mt-1">Identity & portfolio verified</p>
        </div>
        <div className="bg-gold-50 rounded-2xl p-5 border border-gold-200 text-center">
          <Award size={28} className="text-gold-600 mx-auto mb-2" />
          <p className="font-bold text-gold-800">Recommended Badge</p>
          <p className="text-xs text-gold-600 mt-1">Top-rated by admin</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-5 border border-red-200 text-center">
          <Shield size={28} className="text-red-600 mx-auto mb-2" />
          <p className="font-bold text-red-800">Emergency Badge</p>
          <p className="text-xs text-red-600 mt-1">Available for urgent bookings</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-cream-50 border-b border-cream-200">
            <th className="text-left px-4 py-3 text-henna-600 font-medium">Artist</th>
            <th className="text-center px-4 py-3 text-henna-600 font-medium">Verified</th>
            <th className="text-center px-4 py-3 text-henna-600 font-medium">Recommended</th>
            <th className="text-center px-4 py-3 text-henna-600 font-medium">Emergency</th>
            <th className="text-center px-4 py-3 text-henna-600 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {artists.slice(0, 10).map(a => (
              <tr key={a.id} className="border-b border-cream-100 hover:bg-cream-50">
                <td className="px-4 py-3 font-medium text-henna-800">{a.name} <span className="text-xs text-henna-400">({a.city})</span></td>
                <td className="text-center px-4 py-3">{a.isVerified ? <CheckCircle size={16} className="text-green-500 mx-auto" /> : <XCircle size={16} className="text-cream-400 mx-auto" />}</td>
                <td className="text-center px-4 py-3">{a.isRecommended ? <Award size={16} className="text-gold-500 mx-auto" /> : <XCircle size={16} className="text-cream-400 mx-auto" />}</td>
                <td className="text-center px-4 py-3">{a.isEmergencyAvailable ? <Shield size={16} className="text-red-500 mx-auto" /> : <XCircle size={16} className="text-cream-400 mx-auto" />}</td>
                <td className="text-center px-4 py-3"><button className="text-xs text-gold-600 hover:underline">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
