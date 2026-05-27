'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GitCompare, MessageCircle } from 'lucide-react';
import { artists } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

type Artist = typeof artists[number];

export default function ComparePage() {
  const router = useRouter();

  const cities = useMemo(
    () => Array.from(new Set(artists.map(a => a.city))).sort(),
    []
  );

  // Each column has its own location + artist selection.
  const [city1, setCity1] = useState<string>(cities[0] ?? '');
  const [city2, setCity2] = useState<string>(cities[1] ?? cities[0] ?? '');

  const city1Artists = useMemo(() => artists.filter(a => a.city === city1), [city1]);
  const city2Artists = useMemo(() => artists.filter(a => a.city === city2), [city2]);

  const [a1Id, setA1Id] = useState<string>(city1Artists[0]?.id ?? '');
  const [a2Id, setA2Id] = useState<string>(city2Artists[0]?.id ?? '');

  const handleCityChange = (slot: 1 | 2, newCity: string) => {
    const newList = artists.filter(a => a.city === newCity);
    if (slot === 1) {
      setCity1(newCity);
      setA1Id(newList[0]?.id ?? '');
    } else {
      setCity2(newCity);
      setA2Id(newList[0]?.id ?? '');
    }
  };

  const a1 = city1Artists.find(a => a.id === a1Id) ?? city1Artists[0];
  const a2 = city2Artists.find(a => a.id === a2Id) ?? city2Artists[0];

  const fields: { label: string; get: (a: Artist) => string }[] = [
    { label: 'Rating', get: a => `${a.rating.toFixed(1)} ★` },
    { label: 'Price Range', get: a => `${formatPrice(a.priceRange.min)} - ${formatPrice(a.priceRange.max)}` },
    { label: 'Experience', get: a => `${a.experience} years` },
    { label: 'Team Size', get: a => `${a.teamSize} members` },
    { label: 'Total Bookings', get: a => a.totalBookings.toString() },
    { label: 'Response Time', get: a => a.responseTime },
    { label: 'Repeat Clients', get: a => `${a.repeatClientPercent}%` },
    { label: 'Design Styles', get: a => a.designStyles.join(', ') },
    { label: 'Trial Available', get: a => (a.trialSessionEnabled ? `Yes (${formatPrice(a.trialPrice || 0)})` : 'No') },
    { label: 'Emergency', get: a => (a.isEmergencyAvailable ? 'Available' : 'Not available') },
    { label: 'Verified', get: a => (a.isVerified ? '✅ Yes' : '❌ No') },
  ];

  const goToChat = (artistId: string) => {
    router.push(`/dashboard/chat?artist=${artistId}`);
  };

  type Slot = {
    artist: Artist | undefined;
    city: string;
    cityArtists: Artist[];
    onCityChange: (c: string) => void;
    onArtistChange: (id: string) => void;
  };

  const slots: Slot[] = [
    {
      artist: a1,
      city: city1,
      cityArtists: city1Artists,
      onCityChange: c => handleCityChange(1, c),
      onArtistChange: id => setA1Id(id),
    },
    {
      artist: a2,
      city: city2,
      cityArtists: city2Artists,
      onCityChange: c => handleCityChange(2, c),
      onArtistChange: id => setA2Id(id),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2">
          <GitCompare size={24} /> Compare Artists
        </h1>
        <p className="text-henna-400 text-sm">Pick a location for each column, then compare two artists side by side</p>
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-3 border-b border-cream-200">
          <div className="p-4 bg-cream-50">
            <span className="text-sm font-medium text-henna-400">Feature</span>
          </div>
          {slots.map((slot, i) => (
            <div key={i} className="p-4 text-center border-l border-cream-200 space-y-2">
              {/* Per-column location filter */}
              <div className="text-left max-w-[14rem] mx-auto">
                <label className="block text-[10px] uppercase tracking-[0.18em] text-henna-400 font-medium mb-1">
                  Location
                </label>
                <select
                  value={slot.city}
                  onChange={e => slot.onCityChange(e.target.value)}
                  className="w-full text-xs font-medium px-2 py-1.5 border border-cream-200 rounded-lg bg-white text-henna-700 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300"
                >
                  {cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {slot.artist ? (
                <>
                  <div className="w-14 h-14 rounded-xl overflow-hidden mx-auto">
                    <Image src={slot.artist.profileImage} alt={slot.artist.name} width={56} height={56} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-henna-800 text-sm">{slot.artist.name}</p>
                    <p className="text-xs text-henna-400">{slot.artist.city}</p>
                  </div>
                  <select
                    value={slot.artist.id}
                    onChange={e => slot.onArtistChange(e.target.value)}
                    className="text-xs px-2 py-1 border border-cream-300 rounded-lg bg-white max-w-[12rem] truncate"
                  >
                    {slot.cityArtists.map(x => (
                      <option key={x.id} value={x.id}>{x.name}</option>
                    ))}
                  </select>
                </>
              ) : (
                <div className="py-6">
                  <p className="text-xs text-henna-400">No artists in {slot.city}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feature rows */}
        {fields.map((f, i) => (
          <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-cream-50/50' : 'bg-white'}`}>
            <div className="p-3 text-sm font-medium text-henna-600">{f.label}</div>
            <div className="p-3 text-sm text-henna-800 text-center border-l border-cream-100">
              {a1 ? f.get(a1) : '—'}
            </div>
            <div className="p-3 text-sm text-henna-800 text-center border-l border-cream-100">
              {a2 ? f.get(a2) : '—'}
            </div>
          </div>
        ))}

        {/* Enquire Now CTAs */}
        <div className="grid grid-cols-3 border-t border-cream-200 bg-white">
          <div className="p-4" />
          {[a1, a2].map((a, i) => (
            <div key={i} className="p-4 border-l border-cream-100 flex justify-center">
              {a ? (
                <button
                  onClick={() => goToChat(a.id)}
                  className="inline-flex items-center justify-center gap-2 bg-henna-700 hover:bg-henna-800 text-cream-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors w-full max-w-[16rem]"
                >
                  <MessageCircle size={14} /> Enquire Now
                </button>
              ) : (
                <span className="text-xs text-henna-400">No artist selected</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
