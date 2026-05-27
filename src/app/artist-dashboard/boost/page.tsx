'use client';
import { motion } from 'framer-motion';
import { Zap, Gift, Eye, MousePointerClick, MessageSquare, CheckCircle2, MapPin, Video, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

type BoostType = {
  id: string;
  icon: typeof MapPin;
  emoji: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  free?: boolean;
  recommended?: boolean;
  cta: string;
  accent: 'gold' | 'cream' | 'cyan';
};

const boosts: BoostType[] = [
  {
    id: 'standard',
    icon: MapPin,
    emoji: '📍',
    name: 'Standard Boost',
    description: 'Top placement city-wide with a Sponsored tag.',
    duration: '7 days',
    price: 500,
    free: true,
    cta: 'Activate Free',
    accent: 'gold',
  },
  {
    id: 'video',
    icon: Video,
    emoji: '🎥',
    name: 'Video Boost',
    description: 'Auto-preview your portfolio video for highest visibility.',
    duration: '7 days',
    price: 700,
    recommended: true,
    cta: 'Upload Video',
    accent: 'cream',
  },
  {
    id: 'locality',
    icon: MapPin,
    emoji: '🏘️',
    name: 'Locality Boost',
    description: 'Top placement within your locality only — high intent leads.',
    duration: '7 days',
    price: 299,
    cta: 'Activate',
    accent: 'cyan',
  },
];

const accentTone: Record<BoostType['accent'], { iconBg: string; iconColor: string }> = {
  gold: { iconBg: 'bg-gold-50 border-gold-100', iconColor: 'text-gold-600' },
  cream: { iconBg: 'bg-cream-100 border-cream-200', iconColor: 'text-henna-700' },
  cyan: { iconBg: 'bg-cyan-50 border-cyan-100', iconColor: 'text-cyan-700' },
};

const performance = [
  { icon: Eye, label: 'Total Views', value: 340, tone: 'text-emerald-600' },
  { icon: MousePointerClick, label: 'Profile Opens', value: 28, tone: 'text-gold-700' },
  { icon: MessageSquare, label: 'WhatsApp Clicks', value: 12, tone: 'text-blue-600' },
  { icon: CheckCircle2, label: 'Leads Converted', value: 4, tone: 'text-emerald-600' },
];

export default function BoostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Zap size={22} /> Boost Profile
        </h1>
        <p className="text-henna-400 text-sm">Get more visibility, more views and more bookings</p>
      </div>

      {/* Free boost banner */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-sm text-emerald-800 flex items-start gap-3">
        <Gift size={18} className="text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold">Growth plan perk:</span> you have <span className="font-semibold">1 free Standard Boost</span> available this month.
        </p>
      </div>

      {/* Boost types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boosts.map((b, i) => {
          const tone = accentTone[b.accent];
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative bg-white rounded-2xl border border-cream-200 p-5 flex flex-col"
            >
              {b.recommended && (
                <span className="absolute -top-3 left-5 px-2.5 py-0.5 bg-gold-500 text-henna-800 text-[11px] font-bold rounded-full">
                  Recommended
                </span>
              )}
              <div className={`w-11 h-11 rounded-xl border ${tone.iconBg} ${tone.iconColor} flex items-center justify-center mb-3`}>
                <b.icon size={20} />
              </div>
              <p className="font-bold text-henna-800 font-[family-name:var(--font-heading)]">{b.name}</p>
              <p className="text-xs text-henna-500 mt-1 mb-4 leading-relaxed">{b.description}</p>
              <div className="text-xs text-henna-400 mb-3 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cream-300" /> {b.duration}
              </div>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-800 tabular-nums">
                  {formatPrice(b.price)}
                </span>
                {b.free && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    FREE this month
                  </span>
                )}
              </div>
              <button
                className={`mt-auto w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                  b.free
                    ? 'bg-gold-500 hover:bg-gold-600 text-henna-800'
                    : 'bg-henna-700 hover:bg-henna-800 text-cream-100'
                }`}
              >
                <Sparkles size={14} /> {b.cta}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Boost performance */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Boost Performance</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {performance.map((p, i) => (
            <div key={i} className="bg-cream-50 border border-cream-200 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 mx-auto rounded-xl bg-white border border-cream-200 text-henna-700 flex items-center justify-center mb-2">
                <p.icon size={16} />
              </div>
              <p className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${p.tone} tabular-nums`}>{p.value}</p>
              <p className="text-[11px] uppercase tracking-wider text-henna-400 mt-1 font-medium">{p.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Digital presence add-ons (kept from earlier) */}
      <div className="bg-white rounded-2xl border border-cream-200 p-5">
        <h3 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3">Digital Presence Plans</h3>
        <div className="space-y-2.5">
          {[
            { name: 'Google My Business Setup', price: '₹2,999', desc: 'Complete GMB profile setup and optimization' },
            { name: 'Social Media Management', price: '₹4,999/mo', desc: 'Instagram and Facebook management with content creation' },
            { name: 'Personal Website', price: '₹9,999', desc: 'Custom website with portfolio and booking' },
          ].map(p => (
            <div key={p.name} className="flex items-center justify-between gap-3 p-4 rounded-xl bg-cream-50 border border-cream-200">
              <div>
                <p className="font-semibold text-henna-800 text-sm">{p.name}</p>
                <p className="text-xs text-henna-400 mt-0.5">{p.desc}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-henna-700">{p.price}</p>
                <button className="text-xs text-gold-700 hover:underline mt-0.5">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
