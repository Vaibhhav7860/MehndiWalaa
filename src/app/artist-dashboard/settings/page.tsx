'use client';
import { useState } from 'react';
import { Settings, Bell, MessageSquare, CalendarHeart, Wallet, Zap, Sparkles, Globe, Save, Plus } from 'lucide-react';

type ToggleKey = 'whatsapp' | 'festivals' | 'lowWallet' | 'leadAlerts' | 'autoAccept' | 'emergency' | 'trial';

const toggleConfig: Record<ToggleKey, { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; subtitle: string }> = {
  whatsapp: { icon: MessageSquare, title: 'WhatsApp Notifications', subtitle: 'New leads and booking updates on WhatsApp' },
  festivals: { icon: CalendarHeart, title: 'Festival Alerts', subtitle: 'Karva Chauth, Eid, Teej alerts 21 days in advance' },
  lowWallet: { icon: Wallet, title: 'Low Wallet Alert', subtitle: 'Notify when balance drops below ₹500' },
  leadAlerts: { icon: Bell, title: 'Lead Notifications', subtitle: 'Push and WhatsApp alerts for every new lead' },
  autoAccept: { icon: Sparkles, title: 'Auto-accept Leads', subtitle: 'Automatically unlock leads under ₹100' },
  emergency: { icon: Zap, title: 'Emergency Booking', subtitle: 'Accept urgent same-day or next-day bookings' },
  trial: { icon: Sparkles, title: 'Trial Session Available', subtitle: 'Offer a paid trial session to brides' },
};

export default function ArtistSettingsPage() {
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    whatsapp: true,
    festivals: true,
    lowWallet: true,
    leadAlerts: true,
    autoAccept: false,
    emergency: true,
    trial: false,
  });

  const [language, setLanguage] = useState<'Hindi' | 'English' | 'Hinglish'>('English');

  const groups: { title: string; icon: React.ComponentType<{ size?: number; className?: string }>; keys: ToggleKey[] }[] = [
    { title: 'Notifications', icon: Bell, keys: ['leadAlerts', 'whatsapp', 'festivals', 'lowWallet'] },
    { title: 'Booking', icon: CalendarHeart, keys: ['emergency', 'trial', 'autoAccept'] },
  ];

  const Toggle = ({ k }: { k: ToggleKey }) => {
    const cfg = toggleConfig[k];
    const on = toggles[k];
    return (
      <div className="flex items-start justify-between gap-3 py-3 border-t border-cream-100 first:border-t-0">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-cream-100 text-henna-700 border border-cream-200 flex items-center justify-center shrink-0">
            <cfg.icon size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-henna-800">{cfg.title}</p>
            <p className="text-xs text-henna-500 mt-0.5 leading-relaxed">{cfg.subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label={cfg.title}
          onClick={() => setToggles(prev => ({ ...prev, [k]: !on }))}
          className={`shrink-0 w-11 h-6 rounded-full relative transition-colors ${on ? 'bg-gold-500' : 'bg-cream-200'}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${on ? 'right-1' : 'left-1'}`} />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Settings size={22} /> Settings
        </h1>
        <p className="text-henna-400 text-sm">Notifications, booking preferences and platform settings</p>
      </div>

      {/* Grouped toggles */}
      {groups.map(g => (
        <section key={g.title} className="bg-white rounded-2xl border border-cream-200 p-5">
          <h2 className="text-sm font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2 mb-2">
            <g.icon size={14} /> {g.title}
          </h2>
          <div className="divide-y divide-cream-100">
            {g.keys.map(k => <Toggle key={k} k={k} />)}
          </div>
        </section>
      ))}

      {/* Platform */}
      <section className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-sm font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2 mb-3">
          <Globe size={14} /> Platform
        </h2>
        <div className="flex items-center justify-between gap-3 py-2">
          <div>
            <p className="text-sm font-semibold text-henna-800">Dashboard Language</p>
            <p className="text-xs text-henna-500">Pick the language you prefer for your dashboard</p>
          </div>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as typeof language)}
            className="text-sm font-semibold px-3 py-2 rounded-xl border border-cream-300 bg-white text-henna-700 focus:outline-none focus:ring-2 focus:ring-gold-300"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Hinglish</option>
          </select>
        </div>
      </section>

      {/* Quick reply templates */}
      <section className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-sm font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3">Quick Reply Templates</h2>
        <div className="space-y-2">
          {[
            'Thank you for your enquiry! Let me know your preferred date and I will share availability.',
            "I'm available on that date. My bridal mehndi starts from ₹8,000. Would you like to book a trial first?",
          ].map((t, i) => (
            <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-cream-50 border border-cream-200 text-sm text-henna-700">
              <p className="flex-1">{t}</p>
              <button className="text-xs font-semibold text-gold-700 hover:underline">Edit</button>
            </div>
          ))}
        </div>
        <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-700 hover:underline">
          <Plus size={12} /> Add Template
        </button>
      </section>

      <button className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-henna-700 hover:bg-henna-800 text-cream-100">
        <Save size={14} /> Save Settings
      </button>
    </div>
  );
}
