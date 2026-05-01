import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Phone, MessageCircle, ChevronRight, CheckCircle, Award } from 'lucide-react';
import { artists, mockCities } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

type Props = { params: Promise<{ state: string; city: string; locality: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city, locality } = await params;
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const localityName = locality.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `Best Mehndi Artists in ${localityName}, ${cityName} — MehndiWalaa`,
    description: `Find top-rated, verified mehndi artists in ${localityName}, ${cityName}. Browse portfolios, compare prices, and book trusted henna artists for weddings and festivals.`,
  };
}

export default async function SEOLandingPage({ params }: Props) {
  const { state, city, locality } = await params;
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const localityName = locality.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const stateName = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const cityData = mockCities.find(c => c.slug === city) || mockCities[0];
  const cityArtists = artists.filter(a => a.city.toLowerCase() === cityName.toLowerCase()).slice(0, 10);
  const displayArtists = cityArtists.length > 0 ? cityArtists : artists.slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `MehndiWalaa — ${localityName}, ${cityName}`,
    description: `Verified mehndi artists in ${localityName}, ${cityName}`,
    address: { '@type': 'PostalAddress', addressLocality: cityName, addressRegion: stateName, addressCountry: 'IN' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', reviewCount: displayArtists.length * 5 },
  };

  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-henna-400">
            <Link href="/" className="hover:text-gold-600">Home</Link><ChevronRight size={12} />
            <Link href="/artists" className="hover:text-gold-600">Mehndi Artists</Link><ChevronRight size={12} />
            <span>{stateName}</span><ChevronRight size={12} />
            <span>{cityName}</span><ChevronRight size={12} />
            <span className="text-henna-700 font-medium">{localityName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-2">
          Best Mehndi Artists in {localityName}, {cityName}
        </h1>
        <p className="text-henna-400 mb-8">
          Browse {displayArtists.length}+ verified mehndi artists in {localityName}. Average price: {formatPrice(cityData.averagePrice)}
        </p>

        {/* Average Price Section */}
        <div className="bg-white rounded-2xl border border-cream-200 p-6 mb-8">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3">Average Mehndi Price in {cityName}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-cream-50 rounded-xl text-center"><p className="text-xs text-henna-400">Basic / Guest</p><p className="text-xl font-bold text-henna-800">{formatPrice(Math.round(cityData.averagePrice * 0.3))}</p></div>
            <div className="p-4 bg-gold-50 rounded-xl text-center border border-gold-200"><p className="text-xs text-gold-600">Bridal (Average)</p><p className="text-xl font-bold text-henna-800">{formatPrice(cityData.averagePrice)}</p></div>
            <div className="p-4 bg-cream-50 rounded-xl text-center"><p className="text-xs text-henna-400">Premium Bridal</p><p className="text-xl font-bold text-henna-800">{formatPrice(Math.round(cityData.averagePrice * 2))}</p></div>
          </div>
        </div>

        {/* Artist Grid */}
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-4">Top Artists in {localityName}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayArtists.map(a => (
            <div key={a.id} className="bg-white rounded-2xl border border-cream-200 overflow-hidden hover-lift">
              <div className="relative h-48"><Image src={a.profileImage} alt={a.name} fill className="object-cover" />
                <div className="absolute top-3 left-3 flex gap-1">
                  {a.isVerified && <span className="px-2 py-0.5 bg-green-500/90 text-white text-[10px] font-bold rounded-full flex items-center gap-1"><CheckCircle size={10} /> Verified</span>}
                  {a.isRecommended && <span className="px-2 py-0.5 bg-gold-500/90 text-white text-[10px] font-bold rounded-full flex items-center gap-1"><Award size={10} /> Top Rated</span>}
                </div>
              </div>
              <div className="p-4">
                <Link href={`/artists/${a.id}`}><h3 className="font-semibold text-henna-800 text-lg hover:text-gold-600 font-[family-name:var(--font-heading)]">{a.name}</h3></Link>
                <p className="text-sm text-henna-400 flex items-center gap-1"><MapPin size={12} /> {a.locality}, {a.city}</p>
                <div className="flex items-center gap-2 mt-2"><Star size={14} className="fill-gold-500 text-gold-500" /><span className="text-sm font-bold text-henna-700">{a.rating.toFixed(1)}</span><span className="text-xs text-henna-400">({a.reviews.length} reviews)</span></div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-100">
                  <p className="font-bold text-henna-700">{formatPrice(a.priceRange.min)}+</p>
                  <Link href={`/artists/${a.id}`} className="px-4 py-1.5 bg-henna-700 text-cream-100 text-xs rounded-lg font-semibold hover:bg-henna-600">View Profile</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* City Guide */}
        <div className="bg-white rounded-2xl border border-cream-200 p-6">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3">How Mehndi Works in {cityName}</h2>
          <div className="text-sm text-henna-600 space-y-3">
            <p>{cityName} is known for its rich tradition of mehndi art, especially for weddings and festivals. The city has a diverse range of mehndi artists specializing in various styles from traditional Rajasthani to modern Arabic designs.</p>
            <p>Most mehndi artists in {localityName} offer doorstep services and are available for both individual and group bookings. Bridal mehndi sessions typically last 3-5 hours, while guest mehndi takes 30-60 minutes per person.</p>
            <p>We recommend booking your mehndi artist at least 2-3 weeks in advance for bridal mehndi, especially during peak wedding season (October-February). For festivals like Karva Chauth and Eid, early booking is essential.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
