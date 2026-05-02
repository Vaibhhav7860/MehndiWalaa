'use client';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronDown, Star, Shield, Clock, Users, Sparkles, ArrowRight, Phone, MessageCircle, Heart, CheckCircle, TrendingUp, Palette, CalendarDays, Award } from 'lucide-react';
import { useState, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { artists } from '@/data/mock';
import { CITIES, DESIGN_STYLES, OCCASIONS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

/* ─── Hero Section ────────────────────────────────────────── */
function HeroSection() {
  const [city, setCity] = useState('');
  const [style, setStyle] = useState('');

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/hero-mehndi.png" alt="Mehndi Art" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-50 text-gold-600 text-sm font-medium rounded-full border border-gold-200 mb-6">
              <Sparkles size={14} /> India&apos;s #1 Mehndi Platform
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4 leading-tight">
            Find Your Perfect{' '}
            <span className="text-gradient-gold">Mehndi Artist</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-henna-500 mb-8 max-w-lg">
            Discover verified mehndi artists near you. Browse portfolios, compare prices, and book with confidence for your special day.
          </motion.p>

          {/* Glassmorphism Search Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="glass rounded-2xl p-5 max-w-xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-500" />
                <select value={city} onChange={e => setCity(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-white/80 border border-cream-300 rounded-xl text-sm text-henna-800 focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none cursor-pointer">
                  <option value="">Select City</option>
                  {CITIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-henna-400 pointer-events-none" />
              </div>
              <div className="flex-1 relative">
                <Palette size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-500" />
                <select value={style} onChange={e => setStyle(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-white/80 border border-cream-300 rounded-xl text-sm text-henna-800 focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none cursor-pointer">
                  <option value="">Design Style</option>
                  {DESIGN_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-henna-400 pointer-events-none" />
              </div>
              <Link href="/artists" className="px-6 py-3 bg-henna-700 text-cream-100 rounded-xl font-semibold hover:bg-henna-600 transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-henna-700/20">
                <Search size={18} /> Search
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-henna-400">
              <span className="flex items-center gap-1"><Shield size={12} className="text-gold-500" /> 142+ Verified Artists</span>
              <span className="flex items-center gap-1"><MapPin size={12} className="text-gold-500" /> 10+ Cities</span>
              <span className="flex items-center gap-1"><Star size={12} className="text-gold-500" /> 4.7 Avg Rating</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Artist Card ─────────────────────────────────────────── */
function ArtistCard({ artist, index }: { artist: typeof artists[0]; index: number }) {
  const { isAuthenticated, openOtpModal } = useAuth();
  const [liked, setLiked] = useState(false);

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) openOtpModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group bg-white rounded-2xl overflow-hidden border border-cream-200 hover-lift"
    >
      <div className="relative h-52 overflow-hidden">
        <Image src={artist.profileImage} alt={artist.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />

        <div className="absolute top-3 left-3 flex gap-1.5">
          {artist.isVerified && (
            <span className="px-2 py-1 bg-green-500/90 text-white text-[10px] font-bold rounded-full flex items-center gap-1 backdrop-blur-sm">
              <CheckCircle size={10} /> Verified
            </span>
          )}
          {artist.isRecommended && (
            <span className="px-2 py-1 bg-gold-500/90 text-white text-[10px] font-bold rounded-full flex items-center gap-1 backdrop-blur-sm">
              <Award size={10} /> Top Rated
            </span>
          )}
          {artist.isEmergencyAvailable && (
            <span className="px-2 py-1 bg-red-500/90 text-white text-[10px] font-bold rounded-full backdrop-blur-sm text-[10px] font-bold">
              ⚡ Emergency
            </span>
          )}
        </div>

        <button onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-henna-400'} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-end justify-between gap-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-lg">
            <Star size={12} className="text-gold-400 fill-gold-400" />
            <span className="text-white text-xs font-bold">{artist.rating.toFixed(1)}</span>
            <span className="text-white/70 text-xs">({artist.reviews.length})</span>
          </div>
          <span className="text-white/80 text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
            <Clock size={10} className="inline mr-1" />{artist.responseTime}
          </span>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/artists/${artist.id}`}>
          <h3 className="font-semibold text-henna-800 text-lg group-hover:text-gold-600 transition-colors font-[family-name:var(--font-heading)]">
            {artist.name}
          </h3>
        </Link>
        <p className="text-sm text-henna-400 flex items-center gap-1 mt-0.5">
          <MapPin size={12} /> {artist.locality}, {artist.city}
        </p>

        <div className="flex flex-wrap gap-1 mt-2.5">
          {artist.designStyles.slice(0, 3).map(s => (
            <span key={s} className="px-2 py-0.5 bg-cream-100 text-henna-600 text-[11px] rounded-full font-medium">{s}</span>
          ))}
          {artist.designStyles.length > 3 && <span className="text-[11px] text-henna-400 px-1">+{artist.designStyles.length - 3}</span>}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-cream-100">
          <div>
            <p className="text-xs text-henna-400">Starting from</p>
            <p className="text-lg font-bold text-henna-700">{formatPrice(artist.priceRange.min)}</p>
          </div>
          <div className="flex gap-1.5">
            <button onClick={handleContact} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors" title="WhatsApp">
              <MessageCircle size={16} />
            </button>
            <button onClick={handleContact} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Call">
              <Phone size={16} />
            </button>
            <Link href={`/artists/${artist.id}`} className="px-4 py-2 bg-henna-700 text-cream-100 text-xs font-semibold rounded-lg hover:bg-henna-600 transition-colors">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Inline Lead Form ────────────────────────────────────── */
function InlineLeadForm() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="col-span-full bg-gradient-to-r from-henna-700 to-henna-800 rounded-2xl p-6 sm:p-8 text-cream-100">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-1">Can&apos;t decide? Let us help!</h3>
          <p className="text-cream-300 text-sm">Send your requirements and we&apos;ll match you with the best artists in your area.</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto">
          <input placeholder="Your phone number" className="w-full sm:flex-1 sm:w-48 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-cream-100 placeholder:text-cream-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" />
          <button className="w-full sm:w-auto px-6 py-3 bg-gold-500 text-henna-900 rounded-xl font-semibold text-sm hover:bg-gold-400 transition-colors whitespace-nowrap">
            Send Enquiry
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── How It Works ────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { icon: Search, title: 'Search & Filter', desc: 'Find artists by city, budget, style, and occasion with smart filters' },
    { icon: Users, title: 'Compare & Shortlist', desc: 'Browse verified portfolios, read reviews, and shortlist your favorites' },
    { icon: CalendarDays, title: 'Book with Confidence', desc: 'Connect via WhatsApp/call, book trial sessions, and confirm your artist' },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mt-2">How MehndiWalaa Works</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="text-center group">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-gold-50 to-cream-100 flex items-center justify-center border border-gold-200 group-hover:shadow-lg group-hover:shadow-gold-100 transition-shadow relative">
                <s.icon size={32} className="text-gold-600" />
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-henna-700 text-cream-100 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-henna-700 mb-2 font-[family-name:var(--font-heading)]">{s.title}</h3>
              <p className="text-sm text-henna-400 max-w-xs mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why MehndiWalaa ─────────────────────────────────────── */
function WhyMehndiWalaa() {
  const features = [
    { icon: Shield, title: 'Verified Artists Only', desc: 'Every portfolio is manually reviewed and approved by our team' },
    { icon: TrendingUp, title: 'Transparent Pricing', desc: 'No hidden charges. See exact price ranges before you enquire' },
    { icon: CalendarDays, title: 'Trial Sessions', desc: 'Book a trial before your big day to ensure the perfect match' },
    { icon: MessageCircle, title: 'WhatsApp Connect', desc: 'Direct WhatsApp communication with artists for quick responses' },
    { icon: Award, title: 'Mehndi-Only Platform', desc: '100% focused on mehndi. Not buried in generic wedding listings' },
    { icon: Clock, title: 'Emergency Booking', desc: 'Need an artist in 24-48 hours? Filter for emergency availability' },
  ];

  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mt-2">Why Brides Trust MehndiWalaa</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-cream-200 hover-lift group">
              <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors">
                <f.icon size={22} className="text-gold-600" />
              </div>
              <h3 className="text-lg font-bold text-henna-700 mb-2 font-[family-name:var(--font-heading)]">{f.title}</h3>
              <p className="text-sm text-henna-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Trending Section ────────────────────────────────────── */
function TrendingSection() {
  const trending = artists.filter(a => a.isRecommended).slice(0, 4);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-10">
          <div>
            <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider flex items-center gap-1"><TrendingUp size={14} /> Trending</span>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mt-2">Trending This Season</h2>
          </div>
          <Link href="/artists" className="hidden sm:flex items-center gap-1 text-sm text-gold-600 font-medium hover:text-gold-500">
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((a, i) => <ArtistCard key={a.id} artist={a} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── Design Inspiration ──────────────────────────────────── */
function DesignInspiration() {
  const categories = [
    { name: 'Bridal', count: 45, color: 'from-henna-700/80 to-henna-800/80' },
    { name: 'Arabic', count: 38, color: 'from-gold-600/80 to-gold-700/80' },
    { name: 'Rajasthani', count: 32, color: 'from-orange-600/80 to-orange-700/80' },
    { name: 'Minimalist', count: 25, color: 'from-rose-500/80 to-rose-600/80' },
    { name: 'Indo-Western', count: 20, color: 'from-purple-600/80 to-purple-700/80' },
    { name: 'Mandala', count: 28, color: 'from-teal-600/80 to-teal-700/80' },
  ];

  return (
    <section id="inspiration" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Get Inspired</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mt-2">Design Inspiration</h2>
          <p className="text-henna-400 mt-2">Explore stunning mehndi designs by category</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href={`/artists?style=${c.name}`} className="block relative h-44 rounded-2xl overflow-hidden group">
                <Image src="/images/hero-mehndi.png" alt={c.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t ${c.color}`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)]">{c.name}</h3>
                  <p className="text-sm opacity-80 mt-1">{c.count} designs · Find Artists →</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Banner ────────────────────────────────────────── */
function StatsBanner() {
  const stats = [
    { value: '142+', label: 'Verified Artists' },
    { value: '12,000+', label: 'Happy Brides' },
    { value: '10+', label: 'Cities' },
    { value: '4.7★', label: 'Average Rating' },
  ];

  return (
    <section className="py-12 bg-henna-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gold-500 font-[family-name:var(--font-heading)]">{s.value}</p>
              <p className="text-cream-300 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Home Page ────────────────────────────────────────────── */
export default function HomePage() {
  const displayArtists = artists.slice(0, 10);

  return (
    <>
      <HeroSection />
      <StatsBanner />

      {/* Artist Listings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-10">
            <div>
              <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Featured Artists</span>
              <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mt-2">Top Mehndi Artists Near You</h2>
            </div>
            <Link href="/artists" className="hidden sm:flex items-center gap-1 text-sm text-gold-600 font-medium hover:text-gold-500">
              View All <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {['All', ...OCCASIONS.slice(0, 6)].map(o => (
              <button key={o} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${o === 'All' ? 'bg-henna-700 text-cream-100' : 'bg-cream-100 text-henna-600 hover:bg-cream-200 border border-cream-300'}`}>
                {o}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArtists.map((a, i) => (
              <Fragment key={a.id}>
                <ArtistCard artist={a} index={i} />
                {i === 4 && <InlineLeadForm />}
              </Fragment>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/artists" className="inline-flex items-center gap-2 px-8 py-3 bg-henna-700 text-cream-100 rounded-full font-semibold hover:bg-henna-600 transition-all hover:shadow-lg">
              Browse All Artists <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <HowItWorks />
      <TrendingSection />
      <DesignInspiration />
      <WhyMehndiWalaa />
    </>
  );
}
