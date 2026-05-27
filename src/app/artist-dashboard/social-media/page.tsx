'use client';
import { motion } from 'framer-motion';
import { Share2, Camera, Globe, Film, Video, Calendar, MessageSquare, RefreshCcw, Lightbulb, Sparkles } from 'lucide-react';

type SocialKey = 'instagram' | 'facebook' | 'youtube' | 'shorts';

const socials: { key: SocialKey; icon: React.ComponentType<{ size?: number }>; name: string; followers: string | null; brandClass: string }[] = [
  { key: 'instagram', icon: Camera, name: 'Instagram', followers: '2.4K', brandClass: 'text-pink-600' },
  { key: 'facebook', icon: Globe, name: 'Facebook', followers: '890', brandClass: 'text-blue-600' },
  { key: 'youtube', icon: Film, name: 'YouTube', followers: null, brandClass: 'text-red-600' },
  { key: 'shorts', icon: Video, name: 'YouTube Shorts', followers: null, brandClass: 'text-red-600' },
];

const igStats = [
  { label: 'Profile Visits', value: '1,240', percent: 75 },
  { label: 'Post Reach', value: '8,500', percent: 60 },
  { label: 'DMs / Enquiries', value: '47', percent: 30 },
];

const waTemplates = [
  { icon: '📅', title: 'Booking Confirmation', preview: 'Your [Date] [Service] booking is confirmed! Amount: ₹[Amount].' },
  { icon: '💰', title: 'Payment Reminder', preview: 'Hi! ₹[Amount] advance is pending for your upcoming booking.' },
  { icon: '⭐', title: 'Review Request', preview: 'Hope you loved the mehndi! Could you take 2 minutes to leave a review?' },
  { icon: '🎉', title: 'Festival Offer', preview: 'Karva Chauth special — 10% off if you book this week.' },
];

const conversion = [
  { label: 'Instagram', percent: 60, color: 'bg-pink-500', iconColor: 'text-pink-600' },
  { label: 'WhatsApp', percent: 25, color: 'bg-emerald-500', iconColor: 'text-emerald-600' },
  { label: 'Platform', percent: 15, color: 'bg-henna-700', iconColor: 'text-henna-600' },
];

const ideas = [
  { icon: '🎬', title: 'Bridal Process Reel', body: '60-second reel from application to dry. #BridalMehndi is trending.', tag: 'High Reach', tone: 'emerald' as const },
  { icon: '📸', title: 'Before / After Carousel', body: '4–5 slides — fresh mehndi, 24-hour color, fully dry. Great for saves.', tag: 'Good Engagement', tone: 'gold' as const },
  { icon: '✍️', title: 'Karva Chauth Special Post', body: 'Post 5 days before the festival. Offer an early-bird discount.', tag: 'Festival Timing', tone: 'rose' as const },
];

const ideaTone: Record<'emerald' | 'gold' | 'rose', string> = {
  emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  gold: 'bg-gold-50 text-gold-700 border border-gold-100',
  rose: 'bg-rose-50 text-rose-700 border border-rose-100',
};

export default function SocialMediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Share2 size={22} /> Social Media
        </h1>
        <p className="text-henna-400 text-sm">A strong social presence can grow bridal enquiries up to 3x</p>
      </div>

      {/* Connected accounts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {socials.map((s, i) => {
          const connected = !!s.followers;
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-cream-200 p-4 flex flex-col items-center text-center gap-2"
            >
              <div className={`w-11 h-11 rounded-xl bg-cream-100 ${s.brandClass} flex items-center justify-center`}>
                <s.icon size={20} />
              </div>
              <p className="text-[10px] uppercase tracking-wider text-henna-400 font-bold">{s.name}</p>
              <p className={`text-2xl font-bold font-[family-name:var(--font-heading)] tabular-nums ${connected ? 'text-henna-800' : 'text-henna-300'}`}>
                {s.followers ?? '—'}
              </p>
              <button
                className={`mt-1 inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full ${
                  connected
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-henna-700 text-cream-100 hover:bg-henna-800'
                }`}
              >
                {connected ? '✓ Connected' : '+ Connect'}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Instagram analytics */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
              <Camera size={16} className="text-pink-600" /> Instagram Analytics
            </h2>
            <span className="text-[11px] uppercase tracking-wider text-henna-400">Last 30 days</span>
          </div>
          <div className="space-y-3.5">
            {igStats.map((s, i) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-henna-700">{s.label}</span>
                  <span className="font-semibold text-henna-800 tabular-nums">{s.value}</span>
                </div>
                <div className="h-2 rounded-full bg-cream-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.percent}%` }}
                    transition={{ duration: 0.7, delay: i * 0.05 }}
                    className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-700">
            <Lightbulb size={13} className="inline -mt-0.5 mr-1.5" />
            Bridal-process Reels usually get 3x the reach — try one this week.
          </div>
          <button className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-henna-700 text-cream-100 hover:bg-henna-800">
            <Calendar size={14} /> Schedule a Post
          </button>
        </div>

        {/* WhatsApp templates */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5">
          <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2 mb-1">
            <MessageSquare size={16} className="text-emerald-600" /> WhatsApp Business Templates
          </h2>
          <p className="text-xs text-henna-400 mb-4">One-click messages right from your dashboard</p>
          <div className="space-y-2">
            {waTemplates.map(t => (
              <button
                key={t.title}
                className="w-full text-left bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 hover:bg-emerald-50 transition-colors"
              >
                <p className="text-sm font-semibold text-emerald-700">
                  <span className="mr-2" aria-hidden>{t.icon}</span>{t.title}
                </p>
                <p className="text-[11px] text-emerald-700/80 mt-0.5 truncate">{t.preview}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion strip */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Social → Lead Conversion</h2>
        <div className="space-y-3.5">
          {conversion.map((c, i) => (
            <div key={c.label}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-henna-700">{c.label}</span>
                <span className={`font-semibold ${c.iconColor} tabular-nums`}>{c.percent}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-cream-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.percent}%` }}
                  transition={{ duration: 0.7, delay: i * 0.05 }}
                  className={`h-full ${c.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content ideas */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <Sparkles size={16} className="text-gold-500" /> AI Content Ideas — This Week
          </h2>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-100 text-henna-700 border border-cream-200 hover:bg-cream-50">
            <RefreshCcw size={12} /> Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ideas.map((idea) => (
            <div key={idea.title} className="bg-cream-50 border border-cream-200 rounded-2xl p-4">
              <div className="text-2xl mb-2" aria-hidden>{idea.icon}</div>
              <p className="font-semibold text-henna-800 text-sm">{idea.title}</p>
              <p className="text-xs text-henna-500 mt-1 leading-relaxed">{idea.body}</p>
              <span className={`inline-block mt-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${ideaTone[idea.tone]}`}>{idea.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
