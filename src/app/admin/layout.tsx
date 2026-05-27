'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, Image as ImageIcon, Award, AlertTriangle, Megaphone,
  CreditCard, BarChart3, Store, UserPlus, ArrowLeft, Menu, X,
  UserCheck, UserX, Video, Inbox, FileSearch,
} from 'lucide-react';

type LinkItem = {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  children?: { href: string; label: string }[];
};

const links: LinkItem[] = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  {
    href: '/admin/artists',
    icon: Users,
    label: 'Artists',
    children: [
      { href: '/admin/artists', label: 'Pending Approvals' },
      { href: '/admin/artists/all', label: 'All Artists' },
      { href: '/admin/artists/suspended', label: 'Suspended' },
    ],
  },
  {
    href: '/admin/content',
    icon: ImageIcon,
    label: 'Content',
    children: [
      { href: '/admin/content', label: 'Image Queue' },
      { href: '/admin/content/videos', label: 'Video Queue' },
    ],
  },
  {
    href: '/admin/leads',
    icon: AlertTriangle,
    label: 'Leads',
    children: [
      { href: '/admin/leads', label: 'Fake Lead Reports' },
      { href: '/admin/leads/direct', label: 'Direct Leads' },
      { href: '/admin/leads/assignment-log', label: 'Assignment Log' },
    ],
  },
  { href: '/admin/badges', icon: Award, label: 'Badges' },
  { href: '/admin/campaigns', icon: Megaphone, label: 'Festival Campaigns' },
  { href: '/admin/plans', icon: CreditCard, label: 'Membership Plans' },
  { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/admin/store', icon: Store, label: 'Store Catalog' },
  { href: '/admin/sub-admins', icon: UserPlus, label: 'Sub Admins' },
];

function isActive(pathname: string, href: string, hasChildren: boolean) {
  if (hasChildren) {
    return pathname === href || pathname.startsWith(href + '/');
  }
  return pathname === href;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNav, setMobileNav] = useState(false);

  const flat = links.flatMap(l => (l.children ? [l, ...l.children.map(c => ({ ...c, icon: l.icon }))] : [l]));
  const currentPage = flat.find(l => l.href === pathname);

  return (
    <div className="pt-20 min-h-screen bg-cream-50">
      {/* Mobile nav bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-cream-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-henna-400 hover:text-henna-700"><ArrowLeft size={16} /></Link>
          <span className="text-sm font-semibold text-henna-700">{currentPage?.label || 'Admin Panel'}</span>
        </div>
        <button onClick={() => setMobileNav(!mobileNav)} className="p-2 text-henna-600 hover:bg-cream-50 rounded-lg">
          {mobileNav ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileNav && (
        <div className="lg:hidden fixed inset-0 top-[7.5rem] z-20 bg-black/30" onClick={() => setMobileNav(false)}>
          <div className="bg-white border-b border-cream-200 shadow-lg max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-2 grid grid-cols-1 gap-0.5">
              {links.map(l => (
                <div key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMobileNav(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive(pathname, l.href, !!l.children)
                        ? 'bg-henna-700 text-cream-100 font-semibold'
                        : 'text-henna-600 hover:bg-cream-50'
                    }`}
                  >
                    <l.icon size={15} /> {l.label}
                  </Link>
                  {l.children && isActive(pathname, l.href, true) && (
                    <div className="pl-7 pb-1">
                      {l.children.map(c => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setMobileNav(false)}
                          className={`block px-3 py-2 rounded-lg text-xs transition-colors ${
                            pathname === c.href ? 'text-henna-800 font-semibold' : 'text-henna-500 hover:text-henna-700'
                          }`}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        <aside className="hidden lg:block w-60 flex-shrink-0 border-r border-cream-200 bg-white min-h-screen">
          <div className="sticky top-20 p-3 space-y-0.5 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-henna-400 hover:text-henna-700 mb-2">
              <ArrowLeft size={14} /> Home
            </Link>
            <div className="px-3 py-2 mb-2">
              <p className="text-xs font-semibold text-henna-700 uppercase tracking-wider">Super Admin Panel</p>
            </div>
            {links.map(l => {
              const active = isActive(pathname, l.href, !!l.children);
              return (
                <div key={l.href}>
                  <Link
                    href={l.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active ? 'bg-henna-700 text-cream-100 font-semibold' : 'text-henna-600 hover:bg-cream-50'
                    }`}
                  >
                    <l.icon size={16} /> {l.label}
                  </Link>
                  {l.children && active && (
                    <div className="ml-3 mt-1 mb-1 pl-4 border-l border-cream-200 space-y-0.5">
                      {l.children.map(c => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={`block px-3 py-1.5 rounded-lg text-xs transition-colors ${
                            pathname === c.href
                              ? 'text-henna-800 font-semibold bg-cream-50'
                              : 'text-henna-500 hover:text-henna-700 hover:bg-cream-50'
                          }`}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
}
