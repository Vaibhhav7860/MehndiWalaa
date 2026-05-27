'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, AlertCircle, Save, Sparkles } from 'lucide-react';
import { artists } from '@/data/mock';
import { DESIGN_STYLES, LANGUAGES } from '@/lib/constants';

const artist = artists[0];

const designOptions = DESIGN_STYLES.map(s => ({
  key: s as string,
  label: s,
  emoji: ((): string => {
    const map: Record<string, string> = {
      'Bridal': '💍',
      'Arabic': '🕌',
      'Rajasthani': '🏰',
      'Mughal': '🎨',
      'Minimalist': '✨',
      'Indo-Western': '🌿',
      'Floral': '🌸',
      'Jaali': '🪷',
      'Moroccan': '🕋',
      'Portrait': '🖼️',
      'Mandala': '🌀',
      'Traditional': '🎀',
    };
    return map[s] ?? '🎨';
  })(),
}));

export default function ProfilePage() {
  const [styles, setStyles] = useState<string[]>([...artist.designStyles]);
  const [langs, setLangs] = useState<string[]>([...artist.languages]);

  const toggle = <T,>(arr: T[], val: T): T[] => (arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
            <User size={22} /> My Profile
          </h1>
          <p className="text-henna-400 text-sm">Keep your profile fresh — admin will re-approve any changes</p>
        </div>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-50 text-gold-700 border border-gold-100 text-xs font-semibold">
          <span className={`w-2 h-2 rounded-full ${artist.profileCompletion >= 90 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          {artist.profileCompletion}% complete
        </span>
      </div>

      {artist.profileCompletion < 100 && (
        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-800 flex items-start gap-3">
          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p>Complete your profile to attract more clients. All changes require admin re-approval.</p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6 space-y-5"
      >
        <p className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Basic Details</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Studio / Artist Name" defaultValue="Sapna Mehendi Arts" />
          <Field label="Phone" defaultValue={artist.phone} disabled />
          <Field label="City" defaultValue={artist.city} />
          <Field label="Locality" defaultValue={artist.locality} />
          <Field label="Experience (years)" type="number" defaultValue={String(artist.experience)} />
          <Field label="Team Size" type="number" defaultValue={String(artist.teamSize)} />
          <Field label="Starting Price (₹)" type="number" defaultValue="2500" hint="Visible to clients on your profile" />
          <Field label="Minimum Rate Lock (₹)" type="number" defaultValue="2500" hint="Filters out clients below this budget" />
        </div>

        <div>
          <Label>Bio</Label>
          <textarea
            defaultValue={artist.bio}
            rows={4}
            className="mt-1 w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
          />
        </div>

        <div>
          <Label>Design Styles</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {designOptions.map(o => {
              const active = styles.includes(o.key);
              return (
                <button
                  key={o.key}
                  onClick={() => setStyles(toggle(styles, o.key))}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                    active
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-white text-henna-600 border-cream-200 hover:bg-cream-50'
                  }`}
                >
                  <span className="mr-1" aria-hidden>{o.emoji}</span>
                  {o.label}
                  {active && ' ✓'}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label>Languages</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {LANGUAGES.map(l => {
              const active = langs.includes(l);
              return (
                <button
                  key={l}
                  onClick={() => setLangs(toggle(langs, l))}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                    active
                      ? 'bg-gold-50 text-gold-700 border-gold-200'
                      : 'bg-white text-henna-600 border-cream-200 hover:bg-cream-50'
                  }`}
                >
                  {l}
                  {active && ' ✓'}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-cream-50 border border-cream-200 rounded-xl p-3 text-xs text-henna-600 flex items-start gap-2">
          <Sparkles size={14} className="text-gold-600 shrink-0 mt-0.5" />
          Adding a strong bio and 5+ design styles can lift profile views by up to 25%.
        </div>

        <button className="inline-flex items-center gap-2 bg-henna-700 hover:bg-henna-800 text-cream-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Save size={14} /> Save & Submit for Approval
        </button>
      </motion.div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold">{children}</label>
  );
}

function Field({
  label,
  defaultValue,
  type = 'text',
  disabled,
  hint,
}: { label: string; defaultValue: string; type?: string; disabled?: boolean; hint?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`mt-1 w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300 ${
          disabled ? 'bg-cream-50 text-henna-400' : ''
        }`}
      />
      {hint && <p className="text-[11px] text-henna-400 mt-1">{hint}</p>}
    </div>
  );
}
