'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Shield, Award, Phone, MessageCircle, Heart, Share2, Download, ChevronLeft, ChevronRight, Calendar, Users, Briefcase, Eye, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { artists } from '@/data/mock';
import { formatPrice, formatDate } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function ArtistDetailPage() {
  const { id } = useParams();
  const artist = artists.find(a => a.id === id) || artists[0];
  const { isAuthenticated, openOtpModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'portfolio'|'services'|'reviews'|'about'>('portfolio');
  const [liked, setLiked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const similar = artists.filter(a => a.id !== artist.id && a.city === artist.city).slice(0, 3);
  const handleContact = () => { if (!isAuthenticated) openOtpModal(); };

  const tabs = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'reviews', label: `Reviews (${artist.reviews.length})` },
    { id: 'about', label: 'About' },
  ] as const;

  return (
    <div className="pt-20 pb-24 sm:pb-8 min-h-screen bg-cream-50">
      {/* Cover Image */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <Image src={artist.coverImage} alt={artist.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto flex items-end gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-3 border-white shadow-xl flex-shrink-0">
              <Image src={artist.profileImage} alt={artist.name} width={96} height={96} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 text-white mb-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {artist.isVerified && <span className="px-2 py-0.5 bg-green-500/90 text-[10px] font-bold rounded-full flex items-center gap-1"><CheckCircle size={10} /> Verified</span>}
                {artist.isRecommended && <span className="px-2 py-0.5 bg-gold-500/90 text-[10px] font-bold rounded-full flex items-center gap-1"><Award size={10} /> Recommended</span>}
                {artist.isEmergencyAvailable && <span className="px-2 py-0.5 bg-red-500/90 text-[10px] font-bold rounded-full">⚡ Emergency</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">{artist.name}</h1>
              <p className="text-white/80 text-sm flex items-center gap-1"><MapPin size={14} /> {artist.locality}, {artist.city}</p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button onClick={() => setLiked(!liked)} className="p-2.5 bg-white/20 backdrop-blur rounded-xl hover:bg-white/30">
                <Heart size={20} className={liked ? 'fill-red-400 text-red-400' : 'text-white'} />
              </button>
              <button className="p-2.5 bg-white/20 backdrop-blur rounded-xl hover:bg-white/30"><Share2 size={20} className="text-white" /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trust Signals Bar */}
            <div className="bg-white rounded-2xl p-4 border border-cream-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Star, label: 'Rating', value: artist.rating.toFixed(1), color: 'text-gold-500' },
                { icon: Briefcase, label: 'Bookings', value: artist.totalBookings.toString(), color: 'text-henna-600' },
                { icon: Clock, label: 'Response', value: artist.responseTime, color: 'text-green-600' },
                { icon: Users, label: 'Team Size', value: artist.teamSize.toString(), color: 'text-blue-600' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <s.icon size={20} className={`mx-auto mb-1 ${s.color}`} />
                  <p className="text-sm font-bold text-henna-800">{s.value}</p>
                  <p className="text-xs text-henna-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gold-50 rounded-xl border border-gold-100">
              <Eye size={16} className="text-gold-600" />
              <span className="text-sm text-henna-700"><strong>{artist.weeklyViews}</strong> people viewed this profile this week</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-cream-100 rounded-xl p-1 overflow-x-auto">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${activeTab === t.id ? 'bg-white text-henna-700 shadow-sm' : 'text-henna-400 hover:text-henna-600'}`}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 bg-henna-900">
                  <Image src={artist.portfolio[currentImage]?.url || artist.profileImage} alt="Portfolio" fill className="object-cover" />
                  <button onClick={() => setCurrentImage(Math.max(0, currentImage - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"><ChevronLeft size={20} /></button>
                  <button onClick={() => setCurrentImage(Math.min(artist.portfolio.length - 1, currentImage + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"><ChevronRight size={20} /></button>
                  <span className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 text-white text-xs rounded-full">{currentImage + 1}/{artist.portfolio.length}</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {artist.portfolio.map((img, i) => (
                    <button key={img.id} onClick={() => setCurrentImage(i)}
                      className={`relative h-16 sm:h-20 rounded-lg overflow-hidden border-2 ${i === currentImage ? 'border-gold-500' : 'border-transparent hover:border-cream-300'}`}>
                      <Image src={img.url} alt={img.caption} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {artist.services.map(s => (
                  <div key={s.id} className="bg-white p-5 rounded-2xl border border-cream-200 flex items-center justify-between hover-lift">
                    <div>
                      <h3 className="font-semibold text-henna-800">{s.name}</h3>
                      <p className="text-sm text-henna-400 mt-1">{s.description}</p>
                      <p className="text-xs text-henna-400 mt-1 flex items-center gap-1"><Clock size={12} /> {s.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-henna-700">{formatPrice(s.priceRange.min)} - {formatPrice(s.priceRange.max)}</p>
                      <button onClick={handleContact} className="mt-2 px-4 py-1.5 bg-henna-700 text-cream-100 text-xs rounded-full hover:bg-henna-600">Enquire</button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-cream-200 flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-henna-700">{artist.rating.toFixed(1)}</p>
                    <div className="flex gap-0.5 mt-1">{Array.from({length:5},(_,i)=><Star key={i} size={14} className={i < Math.round(artist.rating) ? 'fill-gold-500 text-gold-500' : 'text-cream-300'} />)}</div>
                    <p className="text-xs text-henna-400 mt-1">{artist.reviews.length} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">{[5,4,3,2,1].map(n => {
                    const count = artist.reviews.filter(r => Math.round(r.rating) === n).length;
                    const pct = artist.reviews.length ? (count / artist.reviews.length) * 100 : 0;
                    return <div key={n} className="flex items-center gap-2 text-xs"><span className="w-3">{n}</span><Star size={10} className="text-gold-500 fill-gold-500" /><div className="flex-1 h-2 bg-cream-100 rounded-full overflow-hidden"><div className="h-full bg-gold-500 rounded-full" style={{width:`${pct}%`}} /></div><span className="text-henna-400 w-6">{count}</span></div>;
                  })}</div>
                </div>
                {artist.reviews.map(r => (
                  <div key={r.id} className="bg-white p-5 rounded-2xl border border-cream-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-sm">{r.userName[0]}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div><p className="font-semibold text-henna-800 text-sm">{r.userName}</p><p className="text-xs text-henna-400">{r.occasion} · {formatDate(r.date)}</p></div>
                          <div className="flex gap-0.5">{Array.from({length:5},(_,i)=><Star key={i} size={12} className={i < Math.round(r.rating) ? 'fill-gold-500 text-gold-500' : 'text-cream-300'} />)}</div>
                        </div>
                        <p className="text-sm text-henna-600 mt-2">{r.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-cream-200">
                  <h3 className="font-semibold text-henna-700 mb-2 font-[family-name:var(--font-heading)]">About {artist.name}</h3>
                  <p className="text-sm text-henna-600">{artist.bio}</p>
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-cream-100">
                    <div><p className="text-xs text-henna-400">Experience</p><p className="font-semibold text-henna-800">{artist.experience} years</p></div>
                    <div><p className="text-xs text-henna-400">Team Size</p><p className="font-semibold text-henna-800">{artist.teamSize} members</p></div>
                    <div><p className="text-xs text-henna-400">Languages</p><p className="font-semibold text-henna-800">{artist.languages.join(', ')}</p></div>
                    <div><p className="text-xs text-henna-400">On Platform Since</p><p className="font-semibold text-henna-800">{formatDate(artist.platformSince)}</p></div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-cream-200">
                  <h3 className="font-semibold text-henna-700 mb-3 font-[family-name:var(--font-heading)]">FAQs</h3>
                  {artist.faqs.map((f, i) => (
                    <div key={i} className="py-3 border-b border-cream-100 last:border-0">
                      <p className="font-medium text-henna-800 text-sm">{f.question}</p>
                      <p className="text-sm text-henna-500 mt-1">{f.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-5 rounded-2xl border border-cream-200">
                  <h3 className="font-semibold text-henna-700 mb-2 font-[family-name:var(--font-heading)]">Cancellation Policy</h3>
                  <p className="text-sm text-henna-600">{artist.cancellationPolicy}</p>
                </div>
              </motion.div>
            )}

            {/* Similar Artists */}
            {similar.length > 0 && (
              <div className="pt-6">
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Similar Artists in {artist.city}</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {similar.map(a => (
                    <Link key={a.id} href={`/artists/${a.id}`} className="bg-white rounded-xl p-3 border border-cream-200 hover-lift flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"><Image src={a.profileImage} alt={a.name} width={56} height={56} className="object-cover w-full h-full" /></div>
                      <div>
                        <p className="font-semibold text-sm text-henna-800">{a.name}</p>
                        <div className="flex items-center gap-1 text-xs text-henna-400"><Star size={10} className="fill-gold-500 text-gold-500" /> {a.rating.toFixed(1)} · {formatPrice(a.priceRange.min)}+</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Price & CTA */}
            <div className="bg-white rounded-2xl p-5 border border-cream-200 sticky top-24">
              <p className="text-sm text-henna-400">Starting from</p>
              <p className="text-3xl font-bold text-henna-700 font-[family-name:var(--font-heading)]">{formatPrice(artist.priceRange.min)}</p>
              <p className="text-xs text-henna-400 mb-4">to {formatPrice(artist.priceRange.max)}</p>

              <button onClick={handleContact} className="w-full py-3 bg-henna-700 text-cream-100 rounded-xl font-semibold hover:bg-henna-600 transition-all flex items-center justify-center gap-2 mb-2">
                <MessageCircle size={18} /> Send Enquiry
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleContact} className="py-2.5 bg-green-50 text-green-700 rounded-xl text-sm font-medium flex items-center justify-center gap-1 hover:bg-green-100">
                  <MessageCircle size={14} /> WhatsApp
                </button>
                <button onClick={handleContact} className="py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium flex items-center justify-center gap-1 hover:bg-blue-100">
                  <Phone size={14} /> Call
                </button>
              </div>

              {artist.trialSessionEnabled && (
                <div className="mt-4 p-3 bg-gold-50 rounded-xl border border-gold-200">
                  <p className="text-sm font-semibold text-henna-700">✨ Trial Session Available</p>
                  <p className="text-xs text-henna-400 mt-0.5">Try before you book · {formatPrice(artist.trialPrice || 0)}</p>
                  <button onClick={handleContact} className="mt-2 w-full py-2 bg-gold-500 text-henna-900 rounded-lg text-sm font-semibold hover:bg-gold-400">Book Trial</button>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button onClick={handleContact} className="flex-1 py-2 text-sm text-henna-600 border border-cream-300 rounded-xl hover:bg-cream-50 flex items-center justify-center gap-1">
                  <Download size={14} /> Visiting Card
                </button>
                <button className="flex-1 py-2 text-sm text-henna-600 border border-cream-300 rounded-xl hover:bg-cream-50 flex items-center justify-center gap-1">
                  <Share2 size={14} /> Share
                </button>
              </div>

              <button className="w-full mt-3 py-2 text-xs text-henna-400 hover:text-henna-600 flex items-center justify-center gap-1">
                <AlertTriangle size={12} /> Report Inaccurate Info
              </button>
            </div>

            {/* Availability Calendar */}
            <div className="bg-white rounded-2xl p-5 border border-cream-200">
              <h3 className="font-semibold text-henna-700 mb-3 font-[family-name:var(--font-heading)] flex items-center gap-2"><Calendar size={18} /> Availability</h3>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['S','M','T','W','T','F','S'].map((d,i) => <span key={i} className="text-xs text-henna-400 font-medium py-1">{d}</span>)}
                {artist.availability.slice(0, 28).map((day, i) => (
                  <div key={i} className={`py-1.5 rounded-lg text-xs font-medium ${
                    day.status === 'available' ? 'bg-green-50 text-green-700' :
                    day.status === 'booked' ? 'bg-red-50 text-red-400' : 'bg-cream-100 text-cream-500'
                  }`}>
                    {new Date(day.date).getDate()}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3 text-xs text-henna-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Available</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> Booked</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cream-400" /> Blocked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-200 p-3 flex gap-2 sm:hidden z-40">
        <button onClick={handleContact} className="flex-1 py-3 bg-henna-700 text-cream-100 rounded-xl font-semibold text-sm flex items-center justify-center gap-1"><MessageCircle size={16} /> Enquiry</button>
        <button onClick={handleContact} className="py-3 px-4 bg-green-50 text-green-700 rounded-xl font-medium text-sm"><MessageCircle size={16} /></button>
        <button onClick={handleContact} className="py-3 px-4 bg-blue-50 text-blue-700 rounded-xl font-medium text-sm"><Phone size={16} /></button>
      </div>
    </div>
  );
}
