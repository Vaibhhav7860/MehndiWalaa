'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Inbox, Calendar, Image as ImageIcon, User, FileText, Star, Wallet, Crown, Zap, AlertTriangle, Gift, Store, Settings, ArrowLeft, TrendingUp, MessageCircle } from 'lucide-react';

const links = [
  { href: '/artist-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/artist-dashboard/enquiries', icon: Inbox, label: 'Enquiries' },
  { href: '/artist-dashboard/bookings', icon: Calendar, label: 'Bookings' },
  { href: '/artist-dashboard/calendar', icon: Calendar, label: 'Availability' },
  { href: '/artist-dashboard/portfolio', icon: ImageIcon, label: 'Portfolio' },
  { href: '/artist-dashboard/profile', icon: User, label: 'Profile' },
  { href: '/artist-dashboard/invoices', icon: FileText, label: 'Invoices' },
  { href: '/artist-dashboard/reviews', icon: Star, label: 'Reviews' },
  { href: '/artist-dashboard/earnings', icon: Wallet, label: 'Earnings & Wallet' },
  { href: '/artist-dashboard/membership', icon: Crown, label: 'Membership' },
  { href: '/artist-dashboard/boost', icon: Zap, label: 'Boost Profile' },
  { href: '/artist-dashboard/fake-leads', icon: AlertTriangle, label: 'Fake Leads' },
  { href: '/artist-dashboard/referral', icon: Gift, label: 'Referral' },
  { href: '/artist-dashboard/store', icon: Store, label: 'Store' },
  { href: '/artist-dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function ArtistDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      <div className="flex">
        <aside className="hidden lg:block w-60 flex-shrink-0 border-r border-cream-200 bg-white min-h-screen">
          <div className="sticky top-20 p-3 space-y-0.5 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-henna-400 hover:text-henna-700 mb-3">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="px-3 py-2 mb-2">
              <p className="text-xs font-semibold text-henna-400 uppercase tracking-wider">Artist Dashboard</p>
            </div>
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === l.href ? 'bg-henna-700 text-cream-100 font-semibold' : 'text-henna-600 hover:bg-cream-50'
                }`}>
                <l.icon size={16} /> {l.label}
              </Link>
            ))}
          </div>
        </aside>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
}
