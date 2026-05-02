'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Filter, Star, Clock, Heart, Phone, MessageCircle, CheckCircle, Award, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { artists } from '@/data/mock';
import { CITIES, DESIGN_STYLES, OCCASIONS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function ArtistsPage() {
  const { isAuthenticated, openOtpModal } = useAuth();
  const [city, setCity] = useState('');
  const [style, setStyle] = useState('');
  const [occasion, setOccasion] = useState('');
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(50000);
  const [trialOnly, setTrialOnly] = useState(false);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let result = [...artists];
    if (city) result = result.filter(a => a.city.toLowerCase() === city.toLowerCase());
    if (style) result = result.filter(a => a.designStyles.includes(style as any));
    if (occasion) result = result.filter(a => a.occasions.includes(occasion as any));
    if (trialOnly) result = result.filter(a => a.trialSessionEnabled);
    if (emergencyOnly) result = result.filter(a => a.isEmergencyAvailable);
    result = result.filter(a => a.priceRange.min >= minBudget && a.priceRange.min <= maxBudget);
    if (searchQuery) result = result.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.city.toLowerCase().includes(searchQuery.toLowerCase()));
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'price_low') result.sort((a, b) => a.priceRange.min - b.priceRange.min);
    else if (sortBy === 'price_high') result.sort((a, b) => b.priceRange.min - a.priceRange.min);
    else if (sortBy === 'bookings') result.sort((a, b) => b.totalBookings - a.totalBookings);
    return result;
  }, [city, style, occasion, minBudget, maxBudget, trialOnly, emergencyOnly, sortBy, searchQuery]);

  const toggleLike = (id: string) => setLiked(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const handleContact = (e: React.MouseEvent) => { e.preventDefault(); if (!isAuthenticated) openOtpModal(); };

  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-henna-700">Find Mehndi Artists</h1>
          <p className="text-henna-400 mt-1">Browse {filtered.length} verified artists across India</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-henna-400" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by artist name or city..."
                className="w-full pl-10 pr-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" />
            </div>
            <select value={city} onChange={e => setCity(e.target.value)} className="px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white">
              <option value="">All Cities</option>
              {CITIES.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white">
              <option value="rating">Sort: Top Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="bookings">Most Booked</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2.5 border border-cream-300 rounded-xl text-sm font-medium text-henna-700 hover:bg-cream-100 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 p-4 bg-cream-50 rounded-xl border border-cream-200">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-henna-600 mb-1 block">Design Style</label>
                  <select value={style} onChange={e => setStyle(e.target.value)} className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm bg-white">
                    <option value="">All Styles</option>
                    {DESIGN_STYLES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-henna-600 mb-1 block">Occasion</label>
                  <select value={occasion} onChange={e => setOccasion(e.target.value)} className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm bg-white">
                    <option value="">All Occasions</option>
                    {OCCASIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-henna-600 mb-1 block">Budget Range</label>
                  <div className="flex gap-2">
                    <input type="number" value={minBudget} onChange={e => setMinBudget(+e.target.value)} placeholder="Min" className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm" />
                    <input type="number" value={maxBudget} onChange={e => setMaxBudget(+e.target.value)} placeholder="Max" className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <label className="flex items-center gap-2 text-sm text-henna-700 cursor-pointer">
                    <input type="checkbox" checked={trialOnly} onChange={e => setTrialOnly(e.target.checked)} className="accent-gold-500" /> Trial Available
                  </label>
                  <label className="flex items-center gap-2 text-sm text-henna-700 cursor-pointer">
                    <input type="checkbox" checked={emergencyOnly} onChange={e => setEmergencyOnly(e.target.checked)} className="accent-gold-500" /> Emergency Booking
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Artist Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-henna-400">No artists found matching your filters.</p>
            <button onClick={() => { setCity(''); setStyle(''); setOccasion(''); setMinBudget(0); setMaxBudget(50000); setTrialOnly(false); setEmergencyOnly(false); }}
              className="mt-4 px-6 py-2 bg-henna-700 text-cream-100 rounded-full text-sm font-medium">Clear Filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((artist, i) => (
              <motion.div key={artist.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="group bg-white rounded-2xl overflow-hidden border border-cream-200 hover-lift">
                <div className="relative h-52 overflow-hidden">
                  <Image src={artist.profileImage} alt={artist.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {artist.isVerified && <span className="px-2 py-1 bg-green-500/90 text-white text-[10px] font-bold rounded-full flex items-center gap-1 backdrop-blur-sm"><CheckCircle size={10} /> Verified</span>}
                    {artist.isRecommended && <span className="px-2 py-1 bg-gold-500/90 text-white text-[10px] font-bold rounded-full flex items-center gap-1 backdrop-blur-sm"><Award size={10} /> Top Rated</span>}
                    {artist.isEmergencyAvailable && <span className="px-2 py-1 bg-red-500/90 text-white text-[10px] font-bold rounded-full backdrop-blur-sm">⚡ Emergency</span>}
                  </div>
                  <button onClick={() => toggleLike(artist.id)} className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white">
                    <Heart size={16} className={liked.has(artist.id) ? 'fill-red-500 text-red-500' : 'text-henna-400'} />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-bold"><Star size={12} className="text-gold-400 fill-gold-400" /> {artist.rating.toFixed(1)} ({artist.reviews.length})</span>
                    <span className="text-white/80 text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg"><Clock size={10} className="inline mr-1" />{artist.responseTime}</span>
                  </div>
                </div>
                <div className="p-4">
                  <Link href={`/artists/${artist.id}`}>
                    <h3 className="font-semibold text-henna-800 text-lg group-hover:text-gold-600 transition-colors font-[family-name:var(--font-heading)]">{artist.name}</h3>
                  </Link>
                  <p className="text-sm text-henna-400 flex items-center gap-1 mt-0.5"><MapPin size={12} /> {artist.locality}, {artist.city}</p>
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {artist.designStyles.slice(0, 3).map(s => <span key={s} className="px-2 py-0.5 bg-cream-100 text-henna-600 text-[11px] rounded-full font-medium">{s}</span>)}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-cream-100">
                    <div><p className="text-xs text-henna-400">Starting from</p><p className="text-lg font-bold text-henna-700">{formatPrice(artist.priceRange.min)}</p></div>
                    <div className="flex gap-1.5">
                      <button onClick={handleContact} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"><MessageCircle size={16} /></button>
                      <button onClick={handleContact} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Phone size={16} /></button>
                      <Link href={`/artists/${artist.id}`} className="px-4 py-2 bg-henna-700 text-cream-100 text-xs font-semibold rounded-lg hover:bg-henna-600">View Profile</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
