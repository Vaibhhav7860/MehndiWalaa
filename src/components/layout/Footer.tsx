import Link from 'next/link';
import { Heart, Camera, Play, Globe, MessageSquare } from 'lucide-react';

const footerLinks = {
  'For Customers': [
    { label: 'Find Artists', href: '/artists' },
    { label: 'Design Inspiration', href: '/#inspiration' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Wedding Mehndi Guide', href: '#' },
  ],
  'For Artists': [
    { label: 'Register as Artist', href: '/artist-register' },
    { label: 'Artist Dashboard', href: '/artist-dashboard' },
    { label: 'Membership Plans', href: '#' },
    { label: 'Boost Your Profile', href: '#' },
  ],
  'Popular Cities': [
    { label: 'Delhi', href: '/mehndi-artist/delhi/delhi/south-delhi' },
    { label: 'Mumbai', href: '/mehndi-artist/maharashtra/mumbai/bandra' },
    { label: 'Jaipur', href: '/mehndi-artist/rajasthan/jaipur/c-scheme' },
    { label: 'Hyderabad', href: '/mehndi-artist/telangana/hyderabad/banjara-hills' },
  ],
  'Company': [
    { label: 'About Us', href: '#' },
    { label: 'Contact Support', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-henna-700 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-gold-500 font-semibold text-sm uppercase tracking-wider mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-cream-300 hover:text-gold-400 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-henna-600 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-[family-name:var(--font-heading)]">
              Mehndi<span className="text-gold-500">Walaa</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            {[Camera, Play, Globe, MessageSquare].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-henna-600 hover:bg-gold-500 flex items-center justify-center transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
          <p className="text-cream-500 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-gold-500" /> in India · © 2026 MehndiWalaa
          </p>
        </div>
      </div>
    </footer>
  );
}
