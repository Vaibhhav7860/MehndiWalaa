'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Inbox, Calendar, Image as ImageIcon, User, FileText, Star, Wallet, Crown, Zap, AlertTriangle, Gift, Store, Settings, ArrowLeft, Menu, X, ArrowRight, BarChart3, MessageCircle, GraduationCap, Users, Sparkles, Bot, Bell, Share2, Calculator, LifeBuoy } from 'lucide-react';

const links = [
  { href: '/artist-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/artist-dashboard/enquiries', icon: Inbox, label: 'Enquiries' },
  { href: '/artist-dashboard/bookings', icon: Calendar, label: 'Bookings' },
  { href: '/artist-dashboard/calendar', icon: Calendar, label: 'Availability' },
  { href: '/artist-dashboard/group-booking', icon: Users, label: 'Group Booking' },
  { href: '/artist-dashboard/client-crm', icon: Sparkles, label: 'Client CRM' },
  { href: '/artist-dashboard/portfolio', icon: ImageIcon, label: 'Portfolio' },
  { href: '/artist-dashboard/profile', icon: User, label: 'Profile' },
  { href: '/artist-dashboard/invoices', icon: FileText, label: 'Invoices' },
  { href: '/artist-dashboard/gst-calculator', icon: Calculator, label: 'GST Calculator' },
  { href: '/artist-dashboard/reviews', icon: Star, label: 'Reviews' },
  { href: '/artist-dashboard/earnings', icon: Wallet, label: 'Earnings & Wallet' },
  { href: '/artist-dashboard/ai-pricing', icon: Bot, label: 'AI Pricing' },
  { href: '/artist-dashboard/membership', icon: Crown, label: 'Membership' },
  { href: '/artist-dashboard/boost', icon: Zap, label: 'Boost Profile' },
  { href: '/artist-dashboard/skill-center', icon: GraduationCap, label: 'Skill Center' },
  { href: '/artist-dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/artist-dashboard/social-media', icon: Share2, label: 'Social Media' },
  { href: '/artist-dashboard/chat', icon: MessageCircle, label: 'In-App Chat' },
  { href: '/artist-dashboard/notifications', icon: Bell, label: 'Notifications' },
  { href: '/artist-dashboard/fake-leads', icon: AlertTriangle, label: 'Fake Leads' },
  { href: '/artist-dashboard/referral', icon: Gift, label: 'Referral' },
  { href: '/artist-dashboard/store', icon: Store, label: 'Store' },
  { href: '/artist-dashboard/support', icon: LifeBuoy, label: 'Support' },
  { href: '/artist-dashboard/settings', icon: Settings, label: 'Settings' },
];

// Keep this in sync with the artist's active plan source.
const currentPlan = { name: 'Gold', href: '/artist-dashboard/membership' };

function CurrentPlanCard({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href={currentPlan.href}
      onClick={onClick}
      className="group relative block rounded-2xl p-3 mb-3 overflow-hidden bg-gradient-to-br from-gold-500 to-gold-600 text-white shadow-sm"
    >
      <span className="pointer-events-none absolute -right-6 -top-6 w-20 h-20 rounded-full bg-white/15" aria-hidden />
      <span className="pointer-events-none absolute -right-10 bottom-[-2.5rem] w-24 h-24 rounded-full bg-white/10" aria-hidden />
      <div className="relative flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/80">Current Plan</p>
          <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-sm leading-tight">
            <Crown size={14} className="text-white/90" />
            {currentPlan.name} Plan
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
          Upgrade <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}

export default function ArtistDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNav, setMobileNav] = useState(false);
  const currentPage = links.find(l => l.href === pathname);

  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      {/* Mobile nav bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-cream-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-henna-400 hover:text-henna-700"><ArrowLeft size={16} /></Link>
          <span className="text-sm font-semibold text-henna-700">{currentPage?.label || 'Artist Dashboard'}</span>
        </div>
        <button onClick={() => setMobileNav(!mobileNav)} className="p-2 text-henna-600 hover:bg-cream-50 rounded-lg">
          {mobileNav ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileNav && (
        <div className="lg:hidden fixed inset-0 top-[7.5rem] z-20 bg-black/30" onClick={() => setMobileNav(false)}>
          <div className="bg-white border-b border-cream-200 shadow-lg max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-3">
              <CurrentPlanCard onClick={() => setMobileNav(false)} />
            </div>
            <div className="px-2 pb-2 grid grid-cols-2 gap-1">
              {links.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setMobileNav(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${pathname === l.href ? 'bg-henna-700 text-cream-100 font-semibold' : 'text-henna-600 hover:bg-cream-50'}`}>
                  <l.icon size={15} /> {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        <aside className="hidden lg:block w-60 flex-shrink-0 border-r border-cream-200 bg-white min-h-screen">
          <div className="sticky top-20 p-3 space-y-0.5 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <CurrentPlanCard />
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
