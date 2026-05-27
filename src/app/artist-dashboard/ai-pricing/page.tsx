'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Check, MapPin, CalendarHeart, Layers, Plane, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const cities = ['Delhi / NCR', 'Mumbai', 'Jaipur', 'Hyderabad', 'Bangalore', 'Kolkata', 'Lucknow', 'Chandigarh', 'Ahmedabad', 'Pune', 'Tier-2 City'];
const events = ['Bridal Mehndi (Bride)', 'Wedding Guest', 'Karva Chauth', 'Eid / Teej Mehndi', 'Engagement / Roka', 'Baby Shower / Godh Bharai', 'Birthday Party', 'Casual / At Home'];
const complexities: { key: string; label: string }[] = [
  { key: 'simple', label: 'Simple (Flowers, Dots)' },
  { key: 'medium', label: 'Medium (Traditional Patterns)' },
  { key: 'detailed', label: 'Detailed (Full Coverage)' },
  { key: 'bridal_full', label: 'Bridal Full (Hands + Feet)' },
];
const travels = ['Local (same area)', 'Within City (10–30 km)', 'Far (30+ km)', 'Outstation / Another city'];
const addons = ['Arabic Style', 'Glitter / Gems', 'Same-day Booking', 'Multiple Clients (5+)', 'Late Night (10pm+)', 'Premium Henna Cone'];

// Quick demo pricing engine — replace with real model later.
function suggest({
  city,
  event,
  complexity,
  travel,
  addons: picked,
}: {
  city: string;
  event: string;
  complexity: string;
  travel: string;
  addons: string[];
}) {
  const cityMul = city.includes('Mumbai') || city.includes('Delhi') ? 1.2 : city.includes('Tier-2') ? 0.8 : 1;
  const eventBase: Record<string, number> = {
    'Bridal Mehndi (Bride)': 12000,
    'Wedding Guest': 4500,
    'Karva Chauth': 3500,
    'Eid / Teej Mehndi': 3000,
    'Engagement / Roka': 8000,
    'Baby Shower / Godh Bharai': 4500,
    'Birthday Party': 3000,
    'Casual / At Home': 2000,
  };
  const compMul: Record<string, number> = { simple: 0.7, medium: 1, detailed: 1.4, bridal_full: 1.8 };
  const travelAdd: Record<string, number> = { 'Local (same area)': 0, 'Within City (10–30 km)': 500, 'Far (30+ km)': 1200, 'Outstation / Another city': 3000 };
  const addonAdd = picked.length * 600;

  const base = (eventBase[event] || 5000) * (compMul[complexity] || 1) * cityMul + (travelAdd[travel] || 0) + addonAdd;
  const low = Math.round((base * 0.9) / 100) * 100;
  const high = Math.round((base * 1.15) / 100) * 100;
  const recommended = Math.round(base / 100) * 100;
  return { low, high, recommended };
}

export default function AIPricingPage() {
  const [city, setCity] = useState('');
  const [event, setEvent] = useState('');
  const [complexity, setComplexity] = useState('');
  const [travel, setTravel] = useState('Local (same area)');
  const [picked, setPicked] = useState<string[]>([]);
  const [result, setResult] = useState<ReturnType<typeof suggest> | null>(null);

  const togglePick = (a: string) =>
    setPicked(p => (p.includes(a) ? p.filter(x => x !== a) : [...p, a]));

  const ready = city && event && complexity;

  const onSuggest = () => {
    if (!ready) return;
    setResult(suggest({ city, event, complexity, travel, addons: picked }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <Bot size={22} /> AI Pricing
        </h1>
        <p className="text-henna-400 text-sm">Get a market-aligned price suggestion in seconds</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-6 bg-henna-700 text-cream-100"
      >
        <span className="pointer-events-none absolute -right-12 -top-10 w-44 h-44 rounded-full bg-cream-100/5" aria-hidden />
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cream-100/15 border border-cream-100/20 text-gold-300 flex items-center justify-center">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-xl font-bold font-[family-name:var(--font-heading)] !text-cream-100">AI Pricing Suggester</p>
            <p className="text-sm text-cream-200/85">Combines location, event type and complexity to recommend a fair price band.</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Form */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6 space-y-4">
          <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-henna-700">Booking Details</h2>

          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold flex items-center gap-1.5 mb-1">
              <MapPin size={12} /> Location
            </label>
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
            >
              <option value="">Select a city</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold flex items-center gap-1.5 mb-1">
              <CalendarHeart size={12} /> Event Type
            </label>
            <select
              value={event}
              onChange={e => setEvent(e.target.value)}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
            >
              <option value="">Select an event</option>
              {events.map(ev => <option key={ev} value={ev}>{ev}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold flex items-center gap-1.5 mb-1">
              <Layers size={12} /> Design Complexity
            </label>
            <select
              value={complexity}
              onChange={e => setComplexity(e.target.value)}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
            >
              <option value="">Select complexity</option>
              {complexities.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold flex items-center gap-1.5 mb-1">
              <Plane size={12} /> Travel Distance
            </label>
            <select
              value={travel}
              onChange={e => setTravel(e.target.value)}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
            >
              {travels.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold flex items-center gap-1.5 mb-2">
              <Tag size={12} /> Add-ons (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {addons.map(a => {
                const active = picked.includes(a);
                return (
                  <button
                    key={a}
                    onClick={() => togglePick(a)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? 'bg-gold-100 text-gold-700 border-gold-200'
                        : 'bg-white text-henna-600 border-cream-200 hover:bg-cream-50'
                    }`}
                  >
                    {active && <Check size={11} className="inline -mt-0.5 mr-1" />}{a}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={onSuggest}
            disabled={!ready}
            className={`w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl transition-colors ${
              ready ? 'bg-henna-700 hover:bg-henna-800 text-cream-100' : 'bg-cream-100 text-henna-400 cursor-not-allowed'
            }`}
          >
            <Sparkles size={14} className="text-gold-300" /> Get AI Price Suggestion
          </button>
        </div>

        {/* Result */}
        <div className="bg-white rounded-2xl border border-cream-200 p-5 sm:p-6">
          {result ? (
            <div className="space-y-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-henna-400 font-semibold mb-2">Suggested Range</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-[family-name:var(--font-heading)] text-henna-800 tabular-nums">{formatPrice(result.recommended)}</span>
                  <span className="text-sm text-henna-400">recommended</span>
                </div>
                <p className="text-sm text-henna-600 mt-1">
                  Range: <span className="font-semibold text-henna-800">{formatPrice(result.low)}</span> – <span className="font-semibold text-henna-800">{formatPrice(result.high)}</span>
                </p>
              </div>

              <div className="h-2.5 rounded-full bg-cream-100 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600"
                />
                <span className="absolute top-1/2 -translate-y-1/2 left-[55%] w-2.5 h-2.5 rounded-full bg-henna-700 ring-2 ring-white" />
              </div>

              <ul className="space-y-2 text-sm text-henna-700">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                  Based on {city} averages for {event.toLowerCase()}.
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                  Includes {picked.length} add-on{picked.length === 1 ? '' : 's'} and travel adjustment.
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                  Stay within the range to win 33% more bookings on average.
                </li>
              </ul>

              <div className="flex gap-2">
                <button className="flex-1 text-sm font-semibold px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-henna-800">
                  Use This Price
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="text-sm font-semibold px-4 py-2.5 rounded-xl bg-cream-100 text-henna-700 hover:bg-cream-50 border border-cream-200"
                >
                  Reset
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-cream-100 text-henna-600 flex items-center justify-center mb-4">
                <Bot size={26} />
              </div>
              <p className="font-bold text-henna-800 font-[family-name:var(--font-heading)]">AI Ready</p>
              <p className="text-sm text-henna-500 mt-1 max-w-xs">
                Fill in the booking details on the left and tap Get AI Price Suggestion. You will get a market-aligned range in seconds.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
