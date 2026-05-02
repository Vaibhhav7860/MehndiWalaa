'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Heart, Palette, Calendar, MessageCircle, GitCompare, Star, Settings, ArrowLeft, Menu, X } from 'lucide-react';

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
  const [mobileNav, setMobileNav] = useState(false);
  const currentPage = sidebarLinks.find(l => l.href === pathname);

  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      {/* Mobile nav bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-cream-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-henna-400 hover:text-henna-700"><ArrowLeft size={16} /></Link>
          <span className="text-sm font-semibold text-henna-700">{currentPage?.label || 'Dashboard'}</span>
        </div>
        <button onClick={() => setMobileNav(!mobileNav)} className="p-2 text-henna-600 hover:bg-cream-50 rounded-lg">
          {mobileNav ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileNav && (
        <div className="lg:hidden fixed inset-0 top-[7.5rem] z-20 bg-black/30" onClick={() => setMobileNav(false)}>
          <div className="bg-white border-b border-cream-200 shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="p-2 grid grid-cols-2 gap-1">
              {sidebarLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileNav(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${pathname === link.href ? 'bg-henna-700 text-cream-100 font-semibold' : 'text-henna-600 hover:bg-cream-50'}`}>
                  <link.icon size={15} /> {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

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
