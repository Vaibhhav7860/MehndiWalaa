'use client';
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { artists } from '@/data/mock';

const artist = artists[0];

export default function CalendarPage() {
  const [month] = useState(new Date().getMonth());
  const days = artist.availability.slice(0, 30);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><Calendar size={24} /> Availability Calendar</h1>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="accent-gold-500" /> Emergency Booking</label>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-cream-200 p-6">
        <div className="grid grid-cols-7 gap-2 mb-2 text-center">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <span key={d} className="text-xs font-semibold text-henna-400 py-2">{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, i) => (
            <button key={i} className={`p-3 rounded-xl text-center transition-colors ${
              day.status === 'available' ? 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200' :
              day.status === 'booked' ? 'bg-red-50 text-red-400 border border-red-200 cursor-not-allowed' :
              'bg-cream-100 text-cream-500 border border-cream-200'
            }`}>
              <span className="text-sm font-medium">{new Date(day.date).getDate()}</span>
              <span className="block text-[10px] capitalize mt-0.5">{day.status}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-6 mt-4 pt-4 border-t border-cream-100">
          <span className="flex items-center gap-2 text-xs text-henna-400"><span className="w-3 h-3 rounded bg-green-100 border border-green-300" /> Available — Click to block</span>
          <span className="flex items-center gap-2 text-xs text-henna-400"><span className="w-3 h-3 rounded bg-red-100 border border-red-300" /> Booked</span>
          <span className="flex items-center gap-2 text-xs text-henna-400"><span className="w-3 h-3 rounded bg-cream-100 border border-cream-300" /> Blocked — Click to unblock</span>
        </div>
      </div>
    </div>
  );
}
