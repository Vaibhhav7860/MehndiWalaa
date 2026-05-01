'use client';
import { UserPlus, Shield, Edit, Trash2, Plus } from 'lucide-react';

const subAdmins = [
  { id: 'sa1', name: 'Rahul Verma', email: 'rahul@mehndiwala.com', role: 'Sub Admin', cities: ['Delhi', 'Lucknow'], status: 'active' },
  { id: 'sa2', name: 'Sneha Gupta', email: 'sneha@mehndiwala.com', role: 'Sub Admin', cities: ['Mumbai', 'Pune'], status: 'active' },
  { id: 'sa3', name: 'Amit Kumar', email: 'amit@mehndiwala.com', role: 'Sub Admin', cities: ['Jaipur'], status: 'inactive' },
];

export default function SubAdminsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><UserPlus size={24} /> Sub Admin Management</h1>
        <button className="px-4 py-2 bg-henna-700 text-cream-100 rounded-full text-sm font-semibold flex items-center gap-1"><Plus size={14} /> Add Sub Admin</button>
      </div>
      <p className="text-sm text-henna-400">Sub admins can approve artists, moderate content, manage badges, and review fake leads. Only Super Admin can manage sub admin accounts and platform settings.</p>
      <div className="space-y-3">
        {subAdmins.map(sa => (
          <div key={sa.id} className="bg-white rounded-2xl border border-cream-200 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-henna-100 flex items-center justify-center text-henna-700 font-bold">{sa.name[0]}</div>
              <div>
                <p className="font-semibold text-henna-800">{sa.name}</p>
                <p className="text-xs text-henna-400">{sa.email} · Cities: {sa.cities.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${sa.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-cream-100 text-henna-400'}`}>{sa.status}</span>
              <button className="p-2 text-henna-400 hover:text-blue-500"><Edit size={16} /></button>
              <button className="p-2 text-henna-400 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
