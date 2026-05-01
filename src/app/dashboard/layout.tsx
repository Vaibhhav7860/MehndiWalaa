'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Heart, Palette, Calendar, MessageCircle, GitCompare, Star, Settings, ArrowLeft } from 'lucide-react';

const sidebarLinks = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/shortlist', icon: Heart, label: 'My Shortlist' },
  { href: '/dashboard/mood-board', icon: Palette, label: 'Mood Board' },
  { href: '/dashboard/bookings', icon: Calendar, label: 'My Bookings' },
  { href: '/dashboard/chat', icon: MessageCircle, label: 'Chat' },
  { href: '/dashboard/compare', icon: GitCompare, label: 'Compare Artists' },
  { href: '/dashboard/reviews', icon: Star, label: 'My Reviews' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-cream-200 p-3 space-y-1">
              <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-henna-400 hover:text-henna-700 mb-2">
                <ArrowLeft size={14} /> Back to Home
              </Link>
              {sidebarLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href ? 'bg-henna-700 text-cream-100' : 'text-henna-600 hover:bg-cream-50'
                  }`}>
                  <link.icon size={18} /> {link.label}
                </Link>
              ))}
            </div>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
