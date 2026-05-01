'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Image as ImageIcon, Award, AlertTriangle, Megaphone, CreditCard, BarChart3, Store, UserPlus, ArrowLeft, Settings } from 'lucide-react';

const links = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/artists', icon: Users, label: 'Artist Approvals' },
  { href: '/admin/content', icon: ImageIcon, label: 'Content Moderation' },
  { href: '/admin/badges', icon: Award, label: 'Badges' },
  { href: '/admin/leads', icon: AlertTriangle, label: 'Fake Leads' },
  { href: '/admin/campaigns', icon: Megaphone, label: 'Festival Campaigns' },
  { href: '/admin/plans', icon: CreditCard, label: 'Membership Plans' },
  { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/admin/store', icon: Store, label: 'Store Catalog' },
  { href: '/admin/sub-admins', icon: UserPlus, label: 'Sub Admins' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      <div className="flex">
        <aside className="hidden lg:block w-56 flex-shrink-0 border-r border-cream-200 bg-white min-h-screen">
          <div className="sticky top-20 p-3 space-y-0.5">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-henna-400 hover:text-henna-700 mb-2"><ArrowLeft size={14} /> Home</Link>
            <div className="px-3 py-2 mb-2"><p className="text-xs font-semibold text-red-600 uppercase tracking-wider">⚙ Admin Panel</p></div>
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${pathname === l.href ? 'bg-henna-700 text-cream-100 font-semibold' : 'text-henna-600 hover:bg-cream-50'}`}>
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
