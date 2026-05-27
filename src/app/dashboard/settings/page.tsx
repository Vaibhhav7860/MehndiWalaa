'use client';
import { useEffect, useRef, useState } from 'react';
import { Bell, Shield, Camera, Trash2, User, CalendarHeart, Tag, BellRing } from 'lucide-react';

type ToggleKey = 'push' | 'whatsapp' | 'bookingUpdates' | 'festivalReminders' | 'offers';

const toggleMeta: Record<ToggleKey, { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; subtitle: string }> = {
  push: { icon: Bell, title: 'Push Notifications', subtitle: 'Receive booking and lead updates' },
  whatsapp: { icon: Shield, title: 'WhatsApp Updates', subtitle: 'Get updates on WhatsApp' },
  bookingUpdates: { icon: BellRing, title: 'Booking Updates', subtitle: 'Status changes, reminders and timeline events' },
  festivalReminders: { icon: CalendarHeart, title: 'Festival Reminders', subtitle: 'Be the first to book during peak seasons' },
  offers: { icon: Tag, title: 'Offers & Promotions', subtitle: 'Curated discounts from your favourite artists' },
};

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    push: true,
    whatsapp: true,
    bookingUpdates: true,
    festivalReminders: true,
    offers: false,
  });

  // Revoke object URLs on unmount / change to avoid leaks
  useEffect(() => {
    return () => {
      if (avatar && avatar.startsWith('blob:')) URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setAvatar(prev => {
      if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const removeAvatar = () => {
    setAvatar(prev => {
      if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
      return null;
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const Toggle = ({ k }: { k: ToggleKey }) => {
    const meta = toggleMeta[k];
    const on = toggles[k];
    return (
      <div className="flex items-center justify-between py-3 border-t border-cream-100">
        <div className="flex items-center gap-3">
          <meta.icon size={18} className="text-henna-400" />
          <div>
            <p className="text-sm font-medium text-henna-700">{meta.title}</p>
            <p className="text-xs text-henna-400">{meta.subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label={meta.title}
          onClick={() => setToggles(prev => ({ ...prev, [k]: !prev[k] }))}
          className={`w-10 h-6 rounded-full relative transition-colors ${on ? 'bg-gold-500' : 'bg-cream-200'}`}
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${on ? 'right-1' : 'left-1'}`}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Settings</h1>

      <div className="bg-white rounded-2xl border border-cream-200 p-6 space-y-5">
        {/* Profile picture */}
        <div className="flex items-center gap-5 pb-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-cream-100 border border-cream-200 flex items-center justify-center">
              {avatar ? (
                // Local blob preview, plain img is appropriate here
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={28} className="text-henna-300" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload profile picture"
              className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-henna-700 text-cream-100 hover:bg-henna-800 flex items-center justify-center shadow-sm"
            >
              <Camera size={14} />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-henna-800">Profile Picture</p>
            <p className="text-xs text-henna-400">PNG or JPG, recommended 500×500px</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50"
              >
                {avatar ? 'Change Photo' : 'Upload Photo'}
              </button>
              {avatar && (
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full text-red-500 border border-red-100 bg-red-50 hover:bg-red-100"
                >
                  <Trash2 size={12} /> Remove
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={e => handleFile(e.target.files?.[0])}
            />
          </div>
        </div>

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

        <Toggle k="push" />
        <Toggle k="whatsapp" />
        <Toggle k="bookingUpdates" />
        <Toggle k="festivalReminders" />
        <Toggle k="offers" />

        <button className="w-full py-3 bg-henna-700 text-cream-100 rounded-xl font-semibold hover:bg-henna-600">Save Changes</button>
      </div>
    </div>
  );
}
