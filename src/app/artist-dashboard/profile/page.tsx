'use client';
import { User, AlertCircle } from 'lucide-react';
import { artists } from '@/data/mock';
import { DESIGN_STYLES, LANGUAGES } from '@/lib/constants';

const artist = artists[0];

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Edit Profile</h1>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${artist.profileCompletion >= 90 ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-henna-600">{artist.profileCompletion}% Complete</span>
        </div>
      </div>
      {artist.profileCompletion < 100 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-700 flex items-center gap-2">
          <AlertCircle size={16} /> Complete your profile to attract more clients. All changes require admin re-approval.
        </div>
      )}
      <div className="bg-white rounded-2xl border border-cream-200 p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="text-xs font-medium text-henna-600 mb-1 block">Full Name</label><input defaultValue={artist.name} className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" /></div>
          <div><label className="text-xs font-medium text-henna-600 mb-1 block">Phone</label><input defaultValue={artist.phone} className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" /></div>
          <div><label className="text-xs font-medium text-henna-600 mb-1 block">City</label><input defaultValue={artist.city} className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" /></div>
          <div><label className="text-xs font-medium text-henna-600 mb-1 block">Locality</label><input defaultValue={artist.locality} className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" /></div>
          <div><label className="text-xs font-medium text-henna-600 mb-1 block">Experience (years)</label><input type="number" defaultValue={artist.experience} className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" /></div>
          <div><label className="text-xs font-medium text-henna-600 mb-1 block">Team Size</label><input type="number" defaultValue={artist.teamSize} className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm" /></div>
        </div>
        <div><label className="text-xs font-medium text-henna-600 mb-1 block">Bio</label><textarea defaultValue={artist.bio} rows={4} className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" /></div>
        <div><label className="text-xs font-medium text-henna-600 mb-2 block">Design Styles</label>
          <div className="flex flex-wrap gap-2">{DESIGN_STYLES.map(s => (
            <label key={s} className="flex items-center gap-1.5 text-sm"><input type="checkbox" defaultChecked={artist.designStyles.includes(s as any)} className="accent-gold-500" /> {s}</label>
          ))}</div>
        </div>
        <div><label className="text-xs font-medium text-henna-600 mb-2 block">Languages</label>
          <div className="flex flex-wrap gap-2">{LANGUAGES.map(l => (
            <label key={l} className="flex items-center gap-1.5 text-sm"><input type="checkbox" defaultChecked={artist.languages.includes(l)} className="accent-gold-500" /> {l}</label>
          ))}</div>
        </div>
        <button className="px-6 py-3 bg-henna-700 text-cream-100 rounded-xl font-semibold hover:bg-henna-600">Save & Submit for Approval</button>
      </div>
    </div>
  );
}
