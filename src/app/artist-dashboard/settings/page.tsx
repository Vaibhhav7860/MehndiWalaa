'use client';
import { Settings, Bell, Shield } from 'lucide-react';

export default function ArtistSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><Settings size={24} /> Settings</h1>
      <div className="bg-white rounded-2xl border border-cream-200 p-6 space-y-5">
        <div className="flex items-center justify-between py-3 border-b border-cream-100">
          <div className="flex items-center gap-3"><Bell size={18} className="text-henna-400" /><div><p className="text-sm font-medium text-henna-700">Lead Notifications</p><p className="text-xs text-henna-400">Get notified for new leads via WhatsApp + Push</p></div></div>
          <div className="w-10 h-6 bg-gold-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-cream-100">
          <div className="flex items-center gap-3"><Shield size={18} className="text-henna-400" /><div><p className="text-sm font-medium text-henna-700">Auto-accept Leads</p><p className="text-xs text-henna-400">Automatically unlock leads under ₹100</p></div></div>
          <div className="w-10 h-6 bg-cream-300 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-cream-100">
          <div className="flex items-center gap-3"><Bell size={18} className="text-henna-400" /><div><p className="text-sm font-medium text-henna-700">Festival Alerts</p><p className="text-xs text-henna-400">Proactive demand alerts before festivals</p></div></div>
          <div className="w-10 h-6 bg-gold-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
        </div>
        <div>
          <h3 className="font-semibold text-henna-700 mb-3">Quick Reply Templates</h3>
          <div className="space-y-2">
            {['Thank you for your enquiry! I\'d love to help with your mehndi. Let me know your preferred date.', 'I\'m available on that date. My bridal mehndi starts from ₹8,000. Would you like to book a trial first?'].map((t, i) => (
              <div key={i} className="p-3 bg-cream-50 rounded-xl text-sm text-henna-600 flex items-center justify-between">
                <p className="flex-1">{t}</p>
                <button className="text-xs text-gold-600 hover:underline ml-2">Edit</button>
              </div>
            ))}
          </div>
          <button className="mt-3 text-sm text-gold-600 hover:underline">+ Add Template</button>
        </div>
      </div>
    </div>
  );
}
