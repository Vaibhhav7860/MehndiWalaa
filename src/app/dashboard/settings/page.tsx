'use client';
import { User, MapPin, Phone, Bell, Shield, LogOut } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Settings</h1>
      <div className="bg-white rounded-2xl border border-cream-200 p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-henna-600 mb-1 block">Full Name</label>
          <input defaultValue="Neha Mehra" className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-henna-600 mb-1 block">Phone Number</label>
          <input defaultValue="+91 99876 54321" disabled className="w-full px-4 py-2.5 border border-cream-200 rounded-xl text-sm bg-cream-50 text-henna-400" />
        </div>
        <div>
          <label className="text-sm font-medium text-henna-600 mb-1 block">City</label>
          <input defaultValue="Delhi" className="w-full px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" />
        </div>
        <div className="flex items-center justify-between py-3 border-t border-cream-100">
          <div className="flex items-center gap-3"><Bell size={18} className="text-henna-400" /><div><p className="text-sm font-medium text-henna-700">Push Notifications</p><p className="text-xs text-henna-400">Receive booking and lead updates</p></div></div>
          <div className="w-10 h-6 bg-gold-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
        </div>
        <div className="flex items-center justify-between py-3 border-t border-cream-100">
          <div className="flex items-center gap-3"><Shield size={18} className="text-henna-400" /><div><p className="text-sm font-medium text-henna-700">WhatsApp Updates</p><p className="text-xs text-henna-400">Get updates on WhatsApp</p></div></div>
          <div className="w-10 h-6 bg-gold-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
        </div>
        <button className="w-full py-3 bg-henna-700 text-cream-100 rounded-xl font-semibold hover:bg-henna-600">Save Changes</button>
      </div>
    </div>
  );
}
